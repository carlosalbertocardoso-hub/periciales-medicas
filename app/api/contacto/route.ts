import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  nombre: z.string().min(2).max(80),
  apellidos: z.string().min(2).max(100),
  email: z.string().email(),
  tipo_caso: z.string().min(1),
  provincia: z.string().min(2),
  descripcion: z.string().min(20).max(1000),
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

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const raw = Object.fromEntries(
      [...formData.entries()].filter(([, v]) => typeof v === "string")
    );
    const data = schema.parse(raw);

    const docs = formData.getAll("docs") as File[];

    if (process.env.TURNSTILE_SECRET_KEY) {
      const ip = req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for") ?? "";
      const valid = await verifyTurnstile(data.turnstileToken ?? "", ip);
      if (!valid) {
        return NextResponse.json({ error: "Verificación de seguridad fallida" }, { status: 400 });
      }
    }

    // ─── Integración de email (Resend) ─────────────────────────────────────────
    // Para activar: npm install resend
    // Añadir RESEND_API_KEY y CONTACT_EMAIL a las variables de entorno de Vercel
    //
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // const attachments = await Promise.all(docs.map(async (f) => ({
    //   filename: f.name,
    //   content: Buffer.from(await f.arrayBuffer()),
    // })));
    // await resend.emails.send({
    //   from: "noreply@[DOMINIO]",
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `Nuevo caso: ${data.tipo_caso} – ${data.nombre} ${data.apellidos}`,
    //   html: `
    //     <h2>Nuevo caso recibido</h2>
    //     <p><strong>Nombre:</strong> ${data.nombre} ${data.apellidos}</p>
    //     <p><strong>Email:</strong> ${data.email}</p>
    //     <p><strong>Tipo de caso:</strong> ${data.tipo_caso}</p>
    //     <p><strong>Provincia:</strong> ${data.provincia}</p>
    //     <p><strong>Descripción:</strong> ${data.descripcion}</p>
    //     <p><strong>Documentos adjuntos:</strong> ${docs.length}</p>
    //   `,
    //   attachments,
    // });
    // ───────────────────────────────────────────────────────────────────────────

    // ─── Almacenamiento en Supabase ────────────────────────────────────────────
    // Para activar: npm install @supabase/supabase-js
    // Añadir SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY a las variables de entorno
    //
    // import { createClient } from "@supabase/supabase-js";
    // const supabase = createClient(
    //   process.env.SUPABASE_URL!,
    //   process.env.SUPABASE_SERVICE_ROLE_KEY!
    // );
    // await supabase.from("leads").insert({
    //   nombre: data.nombre,
    //   apellidos: data.apellidos,
    //   email: data.email,
    //   tipo_caso: data.tipo_caso,
    //   provincia: data.provincia,
    //   descripcion: data.descripcion,
    //   num_documentos: docs.length,
    //   created_at: new Date().toISOString(),
    // });
    // ───────────────────────────────────────────────────────────────────────────

    console.info("[Contacto] Nuevo caso:", {
      nombre: `${data.nombre} ${data.apellidos}`,
      email: data.email,
      tipo_caso: data.tipo_caso,
      provincia: data.provincia,
      documentos: docs.length,
    });

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
