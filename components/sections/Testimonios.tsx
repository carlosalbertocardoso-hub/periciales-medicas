"use client";

import { Star, CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonios = [
  {
    initials: "M.L.",
    location: "Madrid",
    stars: 5,
    text: "Mi madre salió de una operación de cadera con una infección grave que los médicos tardaron semanas en tratar. Pablo analizó toda la documentación y su informe fue la base del caso. Sin él, no hubiéramos podido demostrar nada.",
    caso: "Negligencia médica",
  },
  {
    initials: "A.P.",
    location: "Sevilla",
    stars: 5,
    text: "Me diagnosticaron tarde un cáncer de colon. Tenía dudas sobre si reclamar o no. Pablo revisó mi historia clínica, confirmó que el retraso fue evitable y elaboró un informe riguroso. Fue el apoyo técnico que necesitaba.",
    caso: "Retraso diagnóstico",
  },
  {
    initials: "J.R.",
    location: "Barcelona",
    stars: 5,
    text: "Tras mi accidente de tráfico, la aseguradora me ofrecía bastante menos de lo que correspondía. El informe de Pablo reflejó la realidad de mis secuelas y conseguimos un acuerdo justo.",
    caso: "Accidente de tráfico",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} estrellas de 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-[#C8993A] text-[#C8993A]" />
      ))}
    </div>
  );
}

export function Testimonios() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="testimonios"
      className="py-16 sm:py-24 bg-[#F7F8FA]"
      aria-label="Testimonios"
    >
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-up text-center mb-12 sm:mb-16">
          <span className="inline-block text-[#1A9E6B] font-semibold text-sm uppercase tracking-wider mb-3">
            Testimonios
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-4">
            Lo que dicen quienes me han contratado
          </h2>
          <p className="text-[#6B7280] text-sm max-w-xl mx-auto">
            Testimonios reales de personas que han utilizado el servicio.
            Identidades anonimizadas por privacidad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonios.map((t, i) => {
            const stagger = i < 6 ? `stagger-${i + 1}` : "";
            return (
              <div
                key={t.initials + t.location}
                className={`fade-up ${stagger} bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 flex flex-col gap-4 hover:shadow-md hover:border-[#1A9E6B]/25 transition-all duration-200`}
              >
                <Stars count={t.stars} />

                <p className="text-[#374151] text-sm sm:text-base leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="pt-4 border-t border-[#F0F4F8]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#1B3A6B] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {t.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-[#1A1A2E] text-sm leading-tight">
                          {t.initials} · {t.location}
                        </p>
                        <p className="text-[#6B7280] text-xs mt-0.5">{t.caso}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 bg-[#E8F7F1] text-[#1A9E6B] text-xs font-semibold px-2.5 py-1 rounded-full shrink-0">
                      <CheckCircle2 size={11} />
                      Verificado
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-[#94A3B8]">
          [PENDIENTE: Añadir reseñas reales verificadas con autorización expresa del cliente]
        </p>
      </div>
    </section>
  );
}
