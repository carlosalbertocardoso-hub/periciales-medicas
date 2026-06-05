"use client";

import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const pasos = [
  {
    num: "01",
    title: "Contacto inicial",
    description:
      "Contacta por teléfono, WhatsApp o formulario. Sin compromiso. Cuéntame brevemente tu caso y te oriento de forma gratuita.",
  },
  {
    num: "02",
    title: "Análisis y valoración",
    description:
      "Revisamos la documentación disponible y realizo la exploración clínica, presencial o por videoconsulta, para valorar tus lesiones y secuelas.",
  },
  {
    num: "03",
    title: "Informe y defensa",
    description:
      "Redacto el informe pericial con validez legal plena y, si el proceso llega a juicio, lo ratifico ante el tribunal.",
  },
];

export function Proceso() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="proceso"
      className="py-16 sm:py-24"
      style={{ background: "linear-gradient(135deg, #0F2347 0%, #1B3A6B 100%)" }}
      aria-label="Cómo funciona"
    >
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-up mb-14 sm:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-6 h-px bg-[#C8993A]" />
            <span className="text-[#C8993A] text-xs font-semibold tracking-[0.18em] uppercase">
              Cómo funciona
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-heading), Georgia, serif", letterSpacing: "-0.02em" }}>
            De la consulta
            <br />
            <span className="text-white/50 font-light">al informe pericial</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {pasos.map((paso, i) => {
            const stagger = `stagger-${i + 1}`;
            const numerosRomanos = ["I", "II", "III"];
            return (
              <div key={paso.num} className={`fade-up ${stagger} group flex flex-col py-8 lg:py-0 lg:px-10 first:lg:pl-0 last:lg:pr-0`}>
                {/* Número romano grande */}
                <div
                  className="text-[5rem] leading-none font-light text-[#C8993A]/25 group-hover:text-[#C8993A]/40 mb-4 transition-colors duration-300 select-none"
                  style={{ fontFamily: "var(--font-heading), Georgia, serif" }}
                  aria-hidden="true"
                >
                  {numerosRomanos[i]}
                </div>

                <h3 className="font-bold text-white text-lg mb-3" style={{ fontFamily: "var(--font-heading), Georgia, serif" }}>
                  {paso.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed flex-1">
                  {paso.description}
                </p>

                {/* Conector visual solo en desktop */}
                {i < pasos.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 w-4 h-px bg-white/20" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center fade-up stagger-4">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 bg-[#1A9E6B] hover:bg-[#158A5C] text-white font-bold px-8 py-4 rounded-xl text-base shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200"
          >
            Empezar ahora
            <ArrowRight size={17} />
          </a>
          <p className="mt-4 text-white/45 text-sm">
            Consulta inicial gratuita · Sin compromiso · Respuesta en menos de 24h
          </p>
        </div>
      </div>
    </section>
  );
}
