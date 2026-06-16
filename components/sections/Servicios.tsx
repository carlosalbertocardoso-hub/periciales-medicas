"use client";

import Link from "next/link";
import { Stethoscope, Search, FileText, Scale, AlertTriangle, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const tiposMalaPraxis = [
  {
    icon: AlertTriangle,
    title: "Error de diagnóstico",
    description:
      "Diagnóstico tardío, erróneo u omitido. Analizo si el médico siguió el protocolo correcto y si el error causó un daño real al paciente.",
  },
  {
    icon: Stethoscope,
    title: "Mala praxis quirúrgica",
    description:
      "Cirugía incorrecta, complicaciones evitables, errores de técnica o indicación quirúrgica incorrecta. Evaluación independiente del caso.",
  },
  {
    icon: Search,
    title: "Retraso diagnóstico",
    description:
      "Demoras injustificadas en el diagnóstico que agravan la evolución. Determino si el retraso fue evitable y qué consecuencias tuvo.",
  },
  {
    icon: FileText,
    title: "Falta de consentimiento informado",
    description:
      "El paciente tiene derecho a ser informado de riesgos y alternativas. La ausencia de consentimiento válido es causa de responsabilidad médica.",
  },
  {
    icon: Scale,
    title: "Responsabilidad sanitaria",
    description:
      "Analizo la responsabilidad del médico, del centro sanitario o de ambos, tanto en sanidad pública como privada.",
  },
];

export function Servicios() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="servicios"
      className="py-16 sm:py-24 bg-white"
      aria-label="Tipos de mala praxis médica"
    >
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-up mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <div className="section-rule text-[#C8993A] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
              Mala praxis médica
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] leading-tight" style={{ fontFamily: "var(--font-heading), Georgia, serif", letterSpacing: "-0.02em" }}>
              ¿Qué tipo de
              <br className="hidden sm:block" /> negligencia valoro?
            </h2>
          </div>
          <p className="text-[#6B7280] text-base leading-relaxed max-w-xs sm:text-right">
            Especializado en mala praxis médica asistencial.
            Estudio preliminar gratuito en menos de 24 horas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tiposMalaPraxis.map((s, i) => {
            const Icon = s.icon;
            const stagger = i < 6 ? `stagger-${i + 1}` : "";
            const isFeatured = i === 0;
            return (
              <div
                key={s.title}
                className={`fade-up ${stagger} group relative flex flex-col transition-all duration-300 ${
                  isFeatured
                    ? "sm:col-span-2 lg:col-span-1 bg-[#0F2347] border border-[#1B3A6B] hover:border-[#C8993A]/40 rounded-2xl p-7 shadow-lg hover:shadow-xl"
                    : "bg-white hover:bg-[#F7F8FA] border border-[#E5E7EB] hover:border-[#1B3A6B]/30 rounded-2xl p-6 shadow-sm hover:shadow-md"
                }`}
              >
                <span
                  className={`absolute top-5 right-6 font-bold tabular-nums select-none pointer-events-none transition-opacity duration-300 ${
                    isFeatured ? "text-white/10 text-5xl group-hover:text-white/15" : "text-[#1A1A2E]/5 text-5xl group-hover:text-[#1A1A2E]/8"
                  }`}
                  style={{ fontFamily: "var(--font-heading), Georgia, serif", fontWeight: 300 }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${
                  isFeatured
                    ? "bg-[#1A9E6B]/20 text-[#1A9E6B] group-hover:bg-[#1A9E6B]/30"
                    : "bg-[#EEF2F8] text-[#1B3A6B] group-hover:bg-[#1B3A6B] group-hover:text-white"
                }`}>
                  <Icon size={22} />
                </div>

                <h3 className={`font-bold text-base mb-2.5 transition-colors duration-300 ${
                  isFeatured ? "text-white" : "text-[#1A1A2E]"
                }`} style={{ fontFamily: "var(--font-heading), Georgia, serif", letterSpacing: "-0.01em" }}>
                  {s.title}
                </h3>
                <p className={`text-sm leading-relaxed transition-colors duration-300 flex-1 ${
                  isFeatured ? "text-white/55" : "text-[#6B7280]"
                }`}>
                  {s.description}
                </p>
              </div>
            );
          })}

          {/* Tarjeta-CTA: rellena el grid y capta casos fuera de las categorías */}
          <Link
            href="/consulta"
            className="fade-up stagger-6 group flex flex-col justify-center rounded-2xl p-6 border-2 border-dashed border-[#1A9E6B]/40 hover:border-[#1A9E6B] bg-[#1A9E6B]/[0.03] hover:bg-[#1A9E6B]/[0.06] transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-[#1A9E6B]/15 text-[#1A9E6B] flex items-center justify-center mb-5 group-hover:bg-[#1A9E6B] group-hover:text-white transition-colors duration-300">
              <ArrowRight size={22} />
            </div>
            <h3 className="font-bold text-base mb-2.5 text-[#1A1A2E]" style={{ fontFamily: "var(--font-heading), Georgia, serif", letterSpacing: "-0.01em" }}>
              ¿Tu caso es diferente?
            </h3>
            <p className="text-sm leading-relaxed text-[#6B7280]">
              Cuéntame qué ocurrió. Si hay indicios de mala praxis, te lo confirmo
              en el estudio preliminar gratuito.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[#1A9E6B] font-semibold text-sm">
              Solicitar viabilidad
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </Link>
        </div>

        <div className="mt-12 text-center fade-up">
          <Link
            href="/consulta"
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2.5 bg-[#1A9E6B] hover:bg-[#158A5C] text-white font-bold px-8 py-4 rounded-xl text-base shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200"
          >
            Solicitar viabilidad gratuita
            <ArrowRight size={16} />
          </Link>
          <p className="mt-3 text-sm text-[#6B7280]">Respuesta en menos de 24 horas laborables</p>
        </div>
      </div>
    </section>
  );
}
