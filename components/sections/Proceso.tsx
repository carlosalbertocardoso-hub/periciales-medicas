"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const pasos = [
  {
    num: "01",
    title: "Envía tu caso",
    description:
      "Rellena el formulario de contacto o escríbeme por email. Adjunta la documentación médica disponible para que pueda hacer una valoración inicial.",
  },
  {
    num: "02",
    title: "Análisis y valoración",
    description:
      "Reviso la documentación clínica con criterio médico-legal y, si el caso lo requiere, realizo la exploración por videoconsulta para valorar el daño.",
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
        <div className="fade-up mb-10 sm:mb-12">
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

        {/* Imagen editorial */}
        <div className="fade-up mb-12 sm:mb-16">
          <div className="relative aspect-16/10 sm:aspect-21/9 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
            <Image
              src="/img/proceso-informe.webp"
              alt="Elaboración de un informe médico-pericial sobre documentación clínica"
              fill
              sizes="(min-width: 1024px) 72rem, 100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-linear-to-r from-[#0F2347]/70 via-[#0F2347]/15 to-transparent"
              aria-hidden="true"
            />
          </div>
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
            href="/consulta"
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-[#1A9E6B] hover:bg-[#158A5C] text-white font-bold px-8 py-4 rounded-xl text-base shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200"
          >
            Enviar mi caso
            <ArrowRight size={17} />
          </a>
          <p className="mt-4 text-white/45 text-sm">
            Solo por email o formulario · Respuesta en menos de 24h
          </p>
        </div>
      </div>
    </section>
  );
}
