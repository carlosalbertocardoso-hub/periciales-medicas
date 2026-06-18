import Image from "next/image";
import { ShieldCheck, MapPin, Clock, Users, FileCheck, MessageSquare } from "lucide-react";

const signals = [
  {
    icon: ShieldCheck,
    title: "Médico colegiado",
    description: "Ejercicio legal y ético bajo la supervisión del Colegio de Médicos.",
  },
  {
    icon: FileCheck,
    title: "Informe con validez legal",
    description: "Conforme a criterios médico-legales y admitido en procedimientos judiciales.",
  },
  {
    icon: MapPin,
    title: "Toda España",
    description: "Atención íntegramente por videoconsulta, en cualquier provincia.",
  },
  {
    icon: Clock,
    title: "Plazos razonables",
    description: "Entrega del informe en los plazos acordados desde la valoración.",
  },
  {
    icon: Users,
    title: "Trato personalizado",
    description: "Sin intermediarios. Contacto directo con el perito desde el primer momento.",
  },
  {
    icon: MessageSquare,
    title: "Proceso claro y guiado",
    description: "Te explicamos paso a paso qué documentación necesitas y cómo abrir tu caso.",
  },
];

export function TrustSignals() {
  return (
    <section
      id="confianza"
      className="py-16 sm:py-24 bg-white"
      aria-label="Por qué confiar"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-up mb-14 sm:mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="section-rule text-[#C8993A] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
              Por qué elegirme
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] leading-tight mb-5" style={{ fontFamily: "var(--font-heading), Georgia, serif", letterSpacing: "-0.02em" }}>
              Rigor, independencia
              <br className="hidden sm:block" />
              <span className="text-[#1B3A6B]/50"> y cercanía</span>
            </h2>
            <p className="text-[#6B7280] text-base leading-relaxed max-w-md">
              Informe pericial objetivo, comprensible y útil para defender
              tus derechos ante cualquier tribunal.
            </p>
          </div>

          <div className="relative">
            <div
              className="absolute -bottom-4 -left-4 w-full h-full rounded-2xl border border-[#1A9E6B]/20"
              aria-hidden="true"
            />
            <div className="relative aspect-3/2 rounded-2xl overflow-hidden shadow-xl ring-1 ring-[#1A1A2E]/5">
              <Image
                src="/img/confianza-informes.webp"
                alt="Médico perito revisando un informe clínico en su despacho"
                fill
                sizes="(min-width: 1024px) 36rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Layout: 2 items en fila con divisor, 3 filas */}
        <div className="divide-y divide-[#E5E7EB]">
          {[
            signals.slice(0, 2),
            signals.slice(2, 4),
            signals.slice(4, 6),
          ].map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E7EB]">
              {row.map((s, i) => {
                const Icon = s.icon;
                const globalIndex = rowIndex * 2 + i + 1;
                const stagger = globalIndex <= 6 ? `stagger-${globalIndex}` : "";
                return (
                  <div
                    key={s.title}
                    className={`fade-up ${stagger} group flex gap-5 items-start py-8 px-0 sm:px-8 first:sm:pl-0 last:sm:pr-0 hover:bg-transparent transition-all duration-200`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#EEF2F8] group-hover:bg-[#1B3A6B] flex items-center justify-center text-[#1B3A6B] group-hover:text-white shrink-0 transition-colors duration-300">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A1A2E] text-base mb-1.5" style={{ fontFamily: "var(--font-heading), Georgia, serif" }}>
                        {s.title}
                      </h3>
                      <p className="text-[#6B7280] text-sm leading-relaxed">{s.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
