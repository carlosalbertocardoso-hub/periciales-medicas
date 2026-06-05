"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Mail, MapPin, AlertCircle, Lock, Paperclip, X, FileText } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB por archivo
const MAX_FILES = 5;
const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const schema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(80),
  apellidos: z.string().min(2, "Los apellidos deben tener al menos 2 caracteres").max(100),
  email: z.string().email("Introduce un email válido"),
  tipo_caso: z.string().min(1, "Selecciona el tipo de caso"),
  provincia: z.string().min(2, "Indica tu provincia o comunidad autónoma"),
  descripcion: z.string().min(20, "Describe brevemente tu caso (mínimo 20 caracteres)").max(1000),
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

interface AttachedFile {
  file: File;
  id: string;
  error?: string;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function Formulario() {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const newFiles: AttachedFile[] = files.map((file) => {
      let error: string | undefined;
      if (!ACCEPTED_TYPES.includes(file.type)) {
        error = "Formato no admitido";
      } else if (file.size > MAX_FILE_SIZE) {
        error = "Supera el límite de 10 MB";
      }
      return { file, id: `${file.name}-${Date.now()}-${Math.random()}`, error };
    });

    setAttachedFiles((prev) => {
      const combined = [...prev, ...newFiles];
      return combined.slice(0, MAX_FILES);
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeFile(id: string) {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id));
  }

  const onSubmit = async (data: FormData) => {
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setServerError("Por favor, completa la verificación de seguridad.");
      return;
    }

    const validFiles = attachedFiles.filter((f) => !f.error);
    setSending(true);
    setServerError(null);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => formData.append(k, String(v)));
      if (turnstileToken) formData.append("turnstileToken", turnstileToken);
      validFiles.forEach((af) => formData.append("docs", af.file));

      const res = await fetch("/api/contacto", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Error al enviar el formulario");
      }

      reset();
      setAttachedFiles([]);
      router.push("/gracias");
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Ha ocurrido un error. Por favor, inténtalo de nuevo."
      );
    } finally {
      setSending(false);
    }
  };

  const hasFileErrors = attachedFiles.some((f) => f.error);

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
            Envía tu caso
          </h2>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">
            Rellena el formulario y adjunta la documentación disponible. Te respondo por email en menos de{" "}
            <strong className="text-white">24 horas</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* ── Info lateral ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <h3 className="font-bold text-white text-lg">Contacto directo</h3>

            <a
              href="mailto:[PENDIENTE]"
              className="flex items-center gap-4 p-4 bg-white/8 hover:bg-white/14 border border-white/15 rounded-xl transition-colors group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1A9E6B]/20 flex items-center justify-center text-[#1A9E6B] shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-white/55 text-xs font-medium">Email directo</p>
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

            {/* Documentación sugerida */}
            <div className="p-5 bg-white/6 border border-white/12 rounded-xl">
              <p className="text-white/80 text-sm font-semibold mb-3">Documentación útil para tu caso</p>
              <ul className="space-y-2">
                {[
                  "Historia clínica / informes médicos",
                  "Partes de accidente o atestados",
                  "Resoluciones de mutua o aseguradora",
                  "Sentencias o escritos judiciales",
                ].map((doc) => (
                  <li key={doc} className="flex items-start gap-2 text-white/55 text-xs">
                    <FileText size={12} className="text-[#1A9E6B] shrink-0 mt-0.5" />
                    {doc}
                  </li>
                ))}
              </ul>
              <p className="text-white/35 text-xs mt-3">
                Formatos admitidos: PDF, JPG, PNG, Word · Máx. 10 MB por archivo
              </p>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white/6 border border-white/10 rounded-xl">
              <Lock size={15} className="text-[#1A9E6B] shrink-0 mt-0.5" />
              <p className="text-white/55 text-xs leading-relaxed">
                La información y documentación que compartas se usa exclusivamente para evaluar
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

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">
                  Email <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@email.com"
                  {...register("email")}
                  className={fieldClass(!!errors.email)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-1 text-xs text-red-500">
                    {errors.email.message}
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

              {/* Descripción del caso */}
              <div>
                <label htmlFor="descripcion" className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">
                  Describe brevemente tu caso <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="descripcion"
                  rows={4}
                  placeholder="¿Qué ocurrió? ¿Cuándo? ¿Qué documentación tienes disponible? Cualquier detalle relevante ayuda a valorar mejor tu situación."
                  {...register("descripcion")}
                  className={`${fieldClass(!!errors.descripcion)} resize-none`}
                  aria-invalid={!!errors.descripcion}
                  aria-describedby={errors.descripcion ? "desc-error" : undefined}
                />
                {errors.descripcion && (
                  <p id="desc-error" role="alert" className="mt-1 text-xs text-red-500">
                    {errors.descripcion.message}
                  </p>
                )}
              </div>

              {/* Adjuntar documentación */}
              <div>
                <p className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">
                  Adjuntar documentación{" "}
                  <span className="text-[#9CA3AF] font-normal">(opcional, máx. {MAX_FILES} archivos)</span>
                </p>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={attachedFiles.length >= MAX_FILES}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[#D1D5DB] hover:border-[#1A9E6B] rounded-lg px-4 py-4 text-sm text-[#6B7280] hover:text-[#1A9E6B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Paperclip size={16} />
                  {attachedFiles.length >= MAX_FILES
                    ? "Límite de archivos alcanzado"
                    : "Haz clic para adjuntar documentos"}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  aria-label="Adjuntar documentación"
                />

                {attachedFiles.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {attachedFiles.map((af) => (
                      <li
                        key={af.id}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs border ${
                          af.error
                            ? "bg-red-50 border-red-200 text-red-700"
                            : "bg-[#F0F9F5] border-[#1A9E6B]/20 text-[#374151]"
                        }`}
                      >
                        <FileText size={13} className="shrink-0" />
                        <span className="flex-1 truncate font-medium">{af.file.name}</span>
                        <span className="shrink-0 text-[#9CA3AF]">{formatBytes(af.file.size)}</span>
                        {af.error && <span className="shrink-0 text-red-600">{af.error}</span>}
                        <button
                          type="button"
                          onClick={() => removeFile(af.id)}
                          className="shrink-0 hover:text-red-600 transition-colors cursor-pointer"
                          aria-label={`Eliminar ${af.file.name}`}
                        >
                          <X size={13} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {hasFileErrors && (
                  <p className="mt-2 text-xs text-red-500">
                    Los archivos con error no se enviarán. Elimínalos o sustitúyelos.
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
                    . Consiento el tratamiento de mis datos y documentación para gestionar mi caso.{" "}
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

              {/* Turnstile */}
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
                    <span>Enviar caso</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-[#9CA3AF] flex items-center justify-center gap-1.5">
                <Lock size={11} />
                Solo email o formulario · Respuesta en menos de 24h
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
