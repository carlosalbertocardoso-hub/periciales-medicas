"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "10+", label: "Años de experiencia", sub: "como perito judicial" },
  { value: "50+", label: "Casos periciales", sub: "valorados" },
  { value: "España", label: "Ámbito nacional", sub: "por videoconsulta" },
  { value: "24 h", label: "Respuesta", sub: "en días laborables" },
];

export function TrustStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      observer.unobserve(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-label="Estadísticas de confianza"
      className="bg-white border-b border-[#E5E7EB]"
    >
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center fade-up"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease-out ${i * 0.08}s, transform 0.5s ease-out ${i * 0.08}s`,
              }}
            >
              <p className="text-3xl sm:text-4xl font-extrabold text-[#1B3A6B] mb-1">
                {s.value}
              </p>
              <p className="text-sm sm:text-base font-semibold text-[#1A1A2E] mb-0.5">
                {s.label}
              </p>
              <p className="text-xs text-[#6B7280]">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
