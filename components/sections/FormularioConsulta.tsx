"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Mail, MessageCircle, AlertCircle, Lock, Paperclip, X, FileText, Clock, ShieldCheck } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB por archivo
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
  telefono: z
    .string()
    .min(9, "Introduce un teléfono móvil válido")
    .max(20)
    .regex(/^[+\d\s\-()]{9,20}$/, "Formato de teléfono no válido"),
  email: z.string().email("Introduce un email válido"),
  descripcion: z
    .string()
    .min(20, "Describe tu caso (mínimo 20 caracteres)")
    .max(2000),
  rgpd: z
    .boolean()
    .refine((v) => v === true, "Debes aceptar la política de privacidad"),
});

type FormData = z.infer<typeof schema>;

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

export function FormularioConsulta() {
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
        error = "Supera el límite de 15 MB";
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
        err instanceof Error
          ? err.message
          : "Ha ocurrido un error. Por favor, inténtalo de nuevo."
      );
    } finally {
      setSending(false);
    }
  };

  const hasFileErrors = attachedFiles.some((f) => f.error);

  return (
    <section
      className="py-16 sm:py-24 bg-[#F7F8FA]"
      aria-label="Formulario de consulta"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Info lateral */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <h2 className="font-bold text-[#1A1A2E] text-lg">
              También puedes contactar directamente
            </h2>

            <a
              href="mailto:pablo.rdt.medico@gmail.com"
              className="flex items-center gap-4 p-4 bg-white hover:bg-[#F0F9F5] border border-[#E5E7EB] hover:border-[#1A9E6B]/30 rounded-xl transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1A9E6B]/10 flex items-center justify-center text-[#1A9E6B] shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-[#6B7280] text-xs font-medium">Email</p>
                <p className="font-semibold text-[#1A1A2E] text-sm">pablo.rdt.medico@gmail.com</p>
              </div>
            </a>

            <a
              href="https://wa.me/34601539180"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-white hover:bg-[#F0F9F5] border border-[#E5E7EB] hover:border-[#1A9E6B]/30 rounded-xl transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1A9E6B]/10 flex items-center justify-center text-[#1A9E6B] shrink-0">
                <MessageCircle size={18} />
              </div>
              <div>
                <p className="text-[#6B7280] text-xs font-medium">WhatsApp (solo mensajes)</p>
                <p className="font-semibold text-[#1A1A2E] text-sm">601 53 91 80</p>
              </div>
            </a>

            {/* Cita telemática — pendiente de URL de Doctoralia.
                Restaurar este bloque cuando Pablo facilite el enlace:
                <a href="URL_DOCTORALIA" target="_blank" rel="noopener noreferrer" ...>
                  ... Pedir cita telemática ...
                </a>
            */}

            {/* Documentación útil */}
            <div className="p-5 bg-white border border-[#E5E7EB] rounded-xl">
              <p className="text-[#1A1A2E] text-sm font-semibold mb-3">
                Documentación a adjuntar
              </p>
              <ul className="space-y-2">
                {[
                  "Historia clínica e informes médicos",
                  "Reclamaciones ya realizadas",
                  "Cualquier documento relacionado con el caso",
                ].map((doc) => (
                  <li key={doc} className="flex items-start gap-2 text-[#6B7280] text-xs">
                    <FileText size={12} className="text-[#1A9E6B] shrink-0 mt-0.5" />
                    {doc}
                  </li>
                ))}
              </ul>
              <p className="text-[#9CA3AF] text-xs mt-3">
                PDF, JPG, PNG, Word · Máx. 15 MB por archivo
              </p>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white border border-[#E5E7EB] rounded-xl">
              <Lock size={15} className="text-[#1A9E6B] shrink-0 mt-0.5" />
              <p className="text-[#6B7280] text-xs leading-relaxed">
                Tu información y documentación se usan exclusivamente para
                valorar tu caso. No se cede a terceros.
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6 sm:p-8 space-y-5"
              aria-label="Formulario de valoración gratuita"
            >
              <div>
                <h3 className="font-bold text-[#1A1A2E] text-lg mb-1"
                  style={{ fontFamily: "var(--font-heading), Georgia, serif" }}>
                  Solicitar viabilidad gratuita
                </h3>
                <p className="text-[#6B7280] text-sm">
                  Rellena el formulario y adjunta la documentación disponible.
                  Respondo en menos de{" "}
                  <strong className="text-[#1A1A2E]">24 horas laborables</strong>.
                </p>
              </div>

              {/* Teléfono */}
              <div>
                <label
                  htmlFor="telefono"
                  className="block text-sm font-semibold text-[#1A1A2E] mb-1.5"
                >
                  Teléfono móvil{" "}
                  <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="telefono"
                  type="tel"
                  autoComplete="tel"
                  placeholder="600 000 000"
                  {...register("telefono")}
                  className={fieldClass(!!errors.telefono)}
                  aria-invalid={!!errors.telefono}
                  aria-describedby={errors.telefono ? "tel-error" : undefined}
                />
                {errors.telefono && (
                  <p id="tel-error" role="alert" className="mt-1 text-xs text-red-500">
                    {errors.telefono.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[#1A1A2E] mb-1.5"
                >
                  Email{" "}
                  <span className="text-red-500" aria-hidden="true">*</span>
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

              {/* Descripción */}
              <div>
                <label
                  htmlFor="descripcion"
                  className="block text-sm font-semibold text-[#1A1A2E] mb-1.5"
                >
                  Describe tu caso y expectativa{" "}
                  <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="descripcion"
                  rows={5}
                  placeholder="¿Qué ocurrió? ¿Cuándo? ¿Qué resultado esperas? Cuanta más información aportes, mejor podrás ser valorado."
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
                  Adjuntar documentación médica{" "}
                  <span className="text-[#9CA3AF] font-normal">
                    (opcional, hasta {MAX_FILES} archivos)
                  </span>
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
                  aria-label="Adjuntar documentación médica"
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
                        <span className="shrink-0 text-[#9CA3AF]">
                          {formatBytes(af.file.size)}
                        </span>
                        {af.error && (
                          <span className="shrink-0 text-red-600">{af.error}</span>
                        )}
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
                    . Consiento el tratamiento de mis datos para gestionar mi
                    caso.{" "}
                    <span className="text-red-500" aria-hidden="true">*</span>
                  </span>
                </label>
                {errors.rgpd && (
                  <p
                    id="rgpd-error"
                    role="alert"
                    className="mt-1 text-xs text-red-500 pl-7"
                  >
                    {errors.rgpd.message}
                  </p>
                )}
              </div>

              {serverError && (
                <div
                  role="alert"
                  className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm"
                >
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  {serverError}
                </div>
              )}

              {TURNSTILE_SITE_KEY && (
                <Turnstile
                  siteKey={TURNSTILE_SITE_KEY}
                  onSuccess={setTurnstileToken}
                  options={{ theme: "light", language: "es" }}
                />
              )}

              {/* Badges de confianza */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-[#6B7280]">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-[#1A9E6B]" /> Datos protegidos (RGPD)
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={13} className="text-[#1A9E6B]" /> Respuesta en 24 h laborables
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Lock size={13} className="text-[#1A9E6B]" /> Sin compromiso
                </span>
              </div>

              <button
                type="submit"
                disabled={sending || (!!TURNSTILE_SITE_KEY && !turnstileToken)}
                className="w-full flex items-center justify-center gap-2 bg-[#1A9E6B] hover:bg-[#158A5C] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold px-6 py-4 rounded-xl text-base transition-all duration-200 active:scale-[0.98] shadow-sm hover:shadow-md cursor-pointer"
                aria-busy={sending}
              >
                {sending ? (
                  <>
                    <span
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                      aria-hidden="true"
                    />
                    <span>Enviando…</span>
                  </>
                ) : (
                  <>
                    <Send size={17} aria-hidden="true" />
                    <span>Solicitar viabilidad gratuita</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-[#9CA3AF]">
                Tu caso lo revisa directamente el médico perito, sin intermediarios.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
