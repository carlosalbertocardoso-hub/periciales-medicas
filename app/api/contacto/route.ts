import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

// Campos comunes a los dos formularios del sitio:
// - FormularioConsulta (/consulta): telefono, email, descripcion, rgpd
// - Formulario (páginas de servicio): nombre, apellidos, email, tipo_caso, provincia, descripcion, rgpd
// email + descripcion + rgpd son obligatorios; el resto es opcional según el formulario de origen.
const schema = z.object({
  nombre: z.string().max(80).optional(),
  apellidos: z.string().max(100).optional(),
  telefono: z.string().min(9).max(20).optional(),
  email: z.string().email(),
  tipo_caso: z.string().max(120).optional(),
  provincia: z.string().max(120).optional(),
  descripcion: z.string().min(20).max(2000),
  rgpd: z.union([z.literal("true"), z.literal(true)]),
  turnstileToken: z.string().optional(),
});

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token, remoteip: ip }),
  });
  const data = await res.json();
  return data.success === true;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB por archivo, igual que el límite mostrado en el frontend
const MAX_FILES = 5;

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const raw = Object.fromEntries(
      [...formData.entries()].filter(([, v]) => typeof v === "string")
    );
    const data = schema.parse(raw);

    const docs = (formData.getAll("docs") as File[]).filter((f) => f && f.size > 0);

    if (docs.length > MAX_FILES) {
      return NextResponse.json({ error: `Máximo ${MAX_FILES} documentos adjuntos` }, { status: 400 });
    }
    const oversized = docs.find((f) => f.size > MAX_FILE_SIZE);
    if (oversized) {
      return NextResponse.json(
        { error: `El archivo "${oversized.name}" supera el límite de 10 MB` },
        { status: 400 }
      );
    }

    if (process.env.TURNSTILE_SECRET_KEY) {
      const ip = req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for") ?? "";
      const valid = await verifyTurnstile(data.turnstileToken ?? "", ip);
      if (!valid) {
        return NextResponse.json({ error: "Verificación de seguridad fallida" }, { status: 400 });
      }
    }

    // ─── Envío de email (Gmail SMTP vía nodemailer) ────────────────────────────
    // Requiere en variables de entorno:
    //   GMAIL_USER       → pablo.rdt.medico@gmail.com
    //   GMAIL_APP_PASSWORD → contraseña de aplicación de Gmail (16 caracteres, sin espacios)
    //   CONTACT_EMAIL    → destino de los leads (por defecto, el propio GMAIL_USER)
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    const to = process.env.CONTACT_EMAIL ?? user;

    if (user && pass && to) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user, pass },
      });

      const nombreCompleto = [data.nombre, data.apellidos].filter(Boolean).join(" ");
      const filas: [string, string | undefined][] = [
        ["Nombre", nombreCompleto || undefined],
        ["Teléfono", data.telefono],
        ["Email", data.email],
        ["Tipo de caso", data.tipo_caso],
        ["Provincia", data.provincia],
      ];

      const filasHtml = filas
        .filter(([, v]) => v)
        .map(
          ([k, v]) =>
            `<p style="margin:4px 0"><strong>${k}:</strong> ${escapeHtml(String(v))}</p>`
        )
        .join("");

      const attachments = await Promise.all(
        docs.map(async (f) => ({
          filename: f.name,
          content: Buffer.from(await f.arrayBuffer()),
        }))
      );

      await transporter.sendMail({
        from: `"Web Periciales Médicas" <${user}>`,
        to,
        replyTo: data.email,
        subject: `Nuevo caso pericial${nombreCompleto ? ` — ${nombreCompleto}` : ""}`,
        html: `
          <h2 style="font-family:Georgia,serif;color:#0F2347">Nuevo caso recibido desde la web</h2>
          ${filasHtml}
          <p style="margin:12px 0 4px"><strong>Descripción:</strong></p>
          <p style="white-space:pre-wrap;background:#F7F8FA;padding:12px;border-radius:8px">${escapeHtml(
            data.descripcion
          )}</p>
          <p style="margin-top:12px"><strong>Documentos adjuntos:</strong> ${attachments.length}</p>
        `,
        attachments,
      });
    } else {
      // Sin credenciales (entorno local/dev): registrar para no perder el lead.
      console.warn(
        "[Contacto] GMAIL_USER/GMAIL_APP_PASSWORD no configurados — email NO enviado:",
        { telefono: data.telefono, email: data.email, documentos: docs.length }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: err.issues },
        { status: 400 }
      );
    }
    console.error("[Contacto] Error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
