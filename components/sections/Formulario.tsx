"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Phone, Mail, MapPin, AlertCircle, Lock } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

const schema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(80, "Nombre demasiado largo"),
  apellidos: z.string().min(2, "Los apellidos deben tener al menos 2 caracteres").max(100, "Apellidos demasiado largos"),
  telefono: z.string().regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{8,14}$/, "Introduce un teléfono válido"),
  tipo_caso: z.string().min(1, "Selecciona el tipo de caso"),
  provincia: z.string().min(2, "Indica tu provincia o comunidad autónoma"),
  mensaje: z.string().max(500, "El mensaje no puede superar los 500 caracteres").optional(),
  rgpd: z.boolean().refine((v) => v === true, "Debes aceptar la política de privacidad"),
});

type FormData = z.infer<typeof schema>;

const casos = [
  "Accidente de tráfico",
  "Accidente laboral",
  "Negligencia médica",
  "Valoración de secuelas",
  "Responsabilidad civil",
  "Informe pericial para juicio",
  "Otro",
];

const baseInput =
  "w-full border rounded-lg px-4 py-3 text-sm text-[#1A1A2E] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 transition bg-white";

function fieldClass(hasError: boolean) {
  return hasError
    ? `${baseInput} border-red-300 focus:ring-red-400`
    : `${baseInput} border-[#D1D5DB] focus:ring-[#1A9E6B] focus:border-transparent`;
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export function Formulario() {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setServerError("Por favor, completa la verificación de seguridad.");
      return;
    }
    setSending(true);
    setServerError(null);
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Error al enviar el formulario");
      }
      reset();
      router.push("/gracias");
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Ha ocurrido un error. Por favor, inténtalo de nuevo."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contacto"
      className="py-16 sm:py-24"
      style={{ background: "linear-gradient(135deg, #0F2347 0%, #1B3A6B 100%)" }}
      aria-label="Formulario de contacto"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-[#1A9E6B] font-semibold text-sm uppercase tracking-wider mb-3">
            Contacto
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Cuéntame tu caso
          </h2>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">
            Solicita tu consulta inicial gratuita. Te respondo en menos de{" "}
            <strong className="text-white">24 horas</strong>. Sin compromiso.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* ── Contact info ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <h3 className="font-bold text-white text-lg">Otras formas de contactar</h3>

            <a
              href="tel:[PENDIENTE]"
              className="flex items-center gap-4 p-4 bg-white/8 hover:bg-white/14 border border-white/15 rounded-xl transition-colors group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1A9E6B]/20 flex items-center justify-center text-[#1A9E6B] shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-white/55 text-xs font-medium">Teléfono / WhatsApp</p>
                <p className="font-semibold text-white text-sm">[PENDIENTE]</p>
              </div>
            </a>

            <a
              href="mailto:[PENDIENTE]"
              className="flex items-center gap-4 p-4 bg-white/8 hover:bg-white/14 border border-white/15 rounded-xl transition-colors group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1A9E6B]/20 flex items-center justify-center text-[#1A9E6B] shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-white/55 text-xs font-medium">Email</p>
                <p className="font-semibold text-white text-sm">[PENDIENTE]</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 bg-white/8 border border-white/15 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-[#1A9E6B]/20 flex items-center justify-center text-[#1A9E6B] shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-white/55 text-xs font-medium">Ámbito</p>
                <p className="font-semibold text-white text-sm">Toda España</p>
                <p className="text-white/45 text-xs">Presencial o videoconsulta</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white/6 border border-white/10 rounded-xl">
              <Lock size={15} className="text-[#1A9E6B] shrink-0 mt-0.5" />
              <p className="text-white/55 text-xs leading-relaxed">
                La información que compartas se usa exclusivamente para evaluar
                y gestionar tu caso. No se cede a terceros.
              </p>
            </div>
          </div>

          {/* ── Form ── */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-5"
              aria-label="Formulario de contacto"
            >
                {/* Nombre + Apellidos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">
                      Nombre <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      autoComplete="given-name"
                      placeholder="Tu nombre"
                      {...register("nombre")}
                      className={fieldClass(!!errors.nombre)}
                      aria-invalid={!!errors.nombre}
                      aria-describedby={errors.nombre ? "nombre-error" : undefined}
                    />
                    {errors.nombre && (
                      <p id="nombre-error" role="alert" className="mt-1 text-xs text-red-500">
                        {errors.nombre.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="apellidos" className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">
                      Apellidos <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="apellidos"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Tus apellidos"
                      {...register("apellidos")}
                      className={fieldClass(!!errors.apellidos)}
                      aria-invalid={!!errors.apellidos}
                      aria-describedby={errors.apellidos ? "apellidos-error" : undefined}
                    />
                    {errors.apellidos && (
                      <p id="apellidos-error" role="alert" className="mt-1 text-xs text-red-500">
                        {errors.apellidos.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Teléfono */}
                <div>
                  <label htmlFor="telefono" className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">
                    Teléfono <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    autoComplete="tel"
                    placeholder="600 000 000"
                    {...register("telefono")}
                    className={fieldClass(!!errors.telefono)}
                    aria-invalid={!!errors.telefono}
                    aria-describedby={errors.telefono ? "telefono-error" : undefined}
                  />
                  {errors.telefono && (
                    <p id="telefono-error" role="alert" className="mt-1 text-xs text-red-500">
                      {errors.telefono.message}
                    </p>
                  )}
                </div>

                {/* Tipo de caso + Provincia */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="tipo_caso" className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">
                      Tipo de caso <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="tipo_caso"
                      {...register("tipo_caso")}
                      className={`${fieldClass(!!errors.tipo_caso)} appearance-none`}
                      aria-invalid={!!errors.tipo_caso}
                      aria-describedby={errors.tipo_caso ? "tipo-error" : undefined}
                    >
                      <option value="">Selecciona...</option>
                      {casos.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {errors.tipo_caso && (
                      <p id="tipo-error" role="alert" className="mt-1 text-xs text-red-500">
                        {errors.tipo_caso.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="provincia" className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">
                      Provincia / CCAA <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="provincia"
                      type="text"
                      placeholder="Ej. Sevilla, Madrid…"
                      {...register("provincia")}
                      className={fieldClass(!!errors.provincia)}
                      aria-invalid={!!errors.provincia}
                      aria-describedby={errors.provincia ? "provincia-error" : undefined}
                    />
                    {errors.provincia && (
                      <p id="provincia-error" role="alert" className="mt-1 text-xs text-red-500">
                        {errors.provincia.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">
                    Cuéntame brevemente tu caso{" "}
                    <span className="text-[#9CA3AF] font-normal">(opcional)</span>
                  </label>
                  <textarea
                    id="mensaje"
                    rows={4}
                    placeholder="Describe brevemente lo ocurrido, la fecha aproximada y cualquier dato relevante…"
                    {...register("mensaje")}
                    className={`${fieldClass(!!errors.mensaje)} resize-none`}
                    aria-invalid={!!errors.mensaje}
                    aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
                  />
                  {errors.mensaje && (
                    <p id="mensaje-error" role="alert" className="mt-1 text-xs text-red-500">
                      {errors.mensaje.message}
                    </p>
                  )}
                </div>

                {/* RGPD */}
                <div>
                  <label className="flex gap-3 items-start cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("rgpd")}
                      className="mt-0.5 w-4 h-4 accent-[#1A9E6B] shrink-0 cursor-pointer"
                      aria-invalid={!!errors.rgpd}
                      aria-describedby={errors.rgpd ? "rgpd-error" : undefined}
                    />
                    <span className="text-xs text-[#6B7280] leading-relaxed">
                      He leído y acepto la{" "}
                      <a
                        href="/politica-privacidad"
                        className="text-[#1B3A6B] font-semibold underline underline-offset-1 hover:text-[#2D5AA0]"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Política de Privacidad
                      </a>
                      . Consiento el tratamiento de mis datos para gestionar mi consulta.{" "}
                      <span className="text-red-500" aria-hidden="true">*</span>
                    </span>
                  </label>
                  {errors.rgpd && (
                    <p id="rgpd-error" role="alert" className="mt-1 text-xs text-red-500 pl-7">
                      {errors.rgpd.message}
                    </p>
                  )}
                </div>

                {/* Server error */}
                {serverError && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm"
                  >
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    {serverError}
                  </div>
                )}

                {/* Turnstile anti-spam — solo se muestra si hay site key configurada */}
                {TURNSTILE_SITE_KEY && (
                  <Turnstile
                    siteKey={TURNSTILE_SITE_KEY}
                    onSuccess={setTurnstileToken}
                    options={{ theme: "light", language: "es" }}
                  />
                )}

                <button
                  type="submit"
                  disabled={sending || (!!TURNSTILE_SITE_KEY && !turnstileToken)}
                  className="w-full flex items-center justify-center gap-2 bg-[#1A9E6B] hover:bg-[#158A5C] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold px-6 py-4 rounded-xl text-base transition-all duration-200 active:scale-[0.98] shadow-sm hover:shadow-md cursor-pointer"
                  aria-busy={sending}
                >
                  {sending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                      <span>Enviando…</span>
                    </>
                  ) : (
                    <>
                      <Send size={17} aria-hidden="true" />
                      <span>Enviar solicitud gratuita</span>
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-[#9CA3AF] flex items-center justify-center gap-1.5">
                  <Lock size={11} />
                  Consulta gratuita · Sin compromiso · Respuesta en menos de 24h
                </p>
              </form>
          </div>
        </div>
      </div>
    </section>
  );
}
