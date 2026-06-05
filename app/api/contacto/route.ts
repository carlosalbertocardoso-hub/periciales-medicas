import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  nombre: z.string().min(2).max(80),
  apellidos: z.string().min(2).max(100),
  telefono: z.string().regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{8,14}$/),
  tipo_caso: z.string().min(1),
  provincia: z.string().min(2),
  mensaje: z.string().max(500).optional(),
  rgpd: z.literal(true),
  turnstileToken: z.string().optional(),
});

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // sin clave configurada, se omite la verificación

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
    const body = await req.json();
    const data = schema.parse(body);

    // Verificar Turnstile si está configurado
    if (process.env.TURNSTILE_SECRET_KEY) {
      const ip = req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for") ?? "";
      const valid = await verifyTurnstile(data.turnstileToken ?? "", ip);
      if (!valid) {
        return NextResponse.json({ error: "Verificación de seguridad fallida" }, { status: 400 });
      }
    }

    // ─── Integración de email (Resend) ────────────────────────────────────────
    // Para activar: npm install resend
    // Añadir RESEND_API_KEY y CONTACT_EMAIL a las variables de entorno de Vercel
    //
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "noreply@[DOMINIO]",
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `Nuevo lead: ${data.tipo_caso} – ${data.nombre} ${data.apellidos}`,
    //   html: `
    //     <h2>Nuevo lead de la web</h2>
    //     <p><strong>Nombre:</strong> ${data.nombre} ${data.apellidos}</p>
    //     <p><strong>Teléfono:</strong> ${data.telefono}</p>
    //     <p><strong>Tipo de caso:</strong> ${data.tipo_caso}</p>
    //     <p><strong>Provincia:</strong> ${data.provincia}</p>
    //     <p><strong>Mensaje:</strong> ${data.mensaje ?? "—"}</p>
    //   `,
    // });
    // ─────────────────────────────────────────────────────────────────────────

    // ─── Almacenamiento en Supabase ───────────────────────────────────────────
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
    //   telefono: data.telefono,
    //   tipo_caso: data.tipo_caso,
    //   provincia: data.provincia,
    //   mensaje: data.mensaje,
    //   created_at: new Date().toISOString(),
    // });
    // ─────────────────────────────────────────────────────────────────────────

    // Log mientras no hay integración real
    console.info("[Contacto] Nuevo lead:", {
      nombre: `${data.nombre} ${data.apellidos}`,
      telefono: data.telefono,
      tipo_caso: data.tipo_caso,
      provincia: data.provincia,
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
