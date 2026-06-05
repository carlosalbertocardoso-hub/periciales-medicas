"use client";

import { Car, HardHat, Stethoscope, FileText, Scale, Activity, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const servicios = [
  {
    icon: Stethoscope,
    title: "Negligencias médicas",
    description:
      "Analizo si el médico o centro sanitario actuó conforme a la lex artis. Diagnostico mal, cirugía incorrecta, retraso diagnóstico, falta de consentimiento informado. Informe con validez judicial.",
    href: "/negligencias-medicas",
  },
  {
    icon: Car,
    title: "Accidentes de tráfico",
    description:
      "Valoración de lesiones y secuelas derivadas de colisiones. Informe independiente ajustado al Baremo de Tráfico vigente.",
    href: "/peritaje-accidentes-trafico",
  },
  {
    icon: HardHat,
    title: "Accidentes laborales",
    description:
      "Peritaje de lesiones ocurridas en el entorno de trabajo o in itinere, con análisis de la incapacidad y sus consecuencias.",
    href: "/accidentes-laborales",
  },
  {
    icon: Activity,
    title: "Valoración de secuelas",
    description:
      "Cuantificación objetiva de secuelas permanentes mediante criterios médico-legales para su reconocimiento y compensación.",
    href: "/valoracion-secuelas",
  },
  {
    icon: FileText,
    title: "Informes periciales",
    description:
      "Informes médico-legales con rigor técnico y claridad expositiva, redactados para ser defendibles en juicio.",
    href: "/informes-periciales",
  },
  {
    icon: Scale,
    title: "Ratificación judicial",
    description:
      "Comparecencia ante jueces y tribunales para defender el contenido del informe emitido.",
    href: "#contacto",
  },
];

export function Servicios() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="servicios"
      className="py-16 sm:py-24 bg-white"
      aria-label="Servicios"
    >
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-up mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <div className="section-rule text-[#C8993A] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
              Áreas de actuación
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] leading-tight" style={{ fontFamily: "var(--font-heading), Georgia, serif", letterSpacing: "-0.02em" }}>
              ¿En qué puedo
              <br className="hidden sm:block" /> ayudarte?
            </h2>
          </div>
          <p className="text-[#6B7280] text-base leading-relaxed max-w-xs sm:text-right">
            Especializado en negligencias médicas. También atiendo accidentes de
            tráfico, laborales y valoración de daño corporal.
          </p>
        </div>

        {/* Grid asimétrico: 2 col grande + 4 col pequeñas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicios.map((s, i) => {
            const Icon = s.icon;
            const stagger = i < 6 ? `stagger-${i + 1}` : "";
            const isFeatured = i === 0;
            return (
              <a
                key={s.title}
                href={s.href}
                className={`fade-up ${stagger} group relative flex flex-col cursor-pointer transition-all duration-300 ${
                  isFeatured
                    ? "sm:col-span-2 lg:col-span-1 bg-[#0F2347] hover:bg-[#0A1A35] border border-[#1B3A6B] hover:border-[#C8993A]/40 rounded-2xl p-7 shadow-lg hover:shadow-xl"
                    : "bg-white hover:bg-[#F7F8FA] border border-[#E5E7EB] hover:border-[#1B3A6B]/30 rounded-2xl p-6 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Número ordinal decorativo */}
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
                <div className={`mt-5 flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase transition-all duration-300 ${
                  isFeatured
                    ? "text-[#1A9E6B] group-hover:gap-2.5"
                    : "text-[#1B3A6B]/50 group-hover:text-[#1A9E6B] group-hover:gap-2.5"
                }`}>
                  Ver más <ArrowRight size={12} />
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-12 text-center fade-up">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2.5 bg-[#1A9E6B] hover:bg-[#158A5C] text-white font-bold px-8 py-4 rounded-xl text-base shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200"
          >
            Consultar mi caso
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
