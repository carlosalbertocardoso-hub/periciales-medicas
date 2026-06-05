import { Phone, ArrowRight, ShieldCheck, Star } from "lucide-react";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden pt-16 sm:pt-20"
      style={{ background: "linear-gradient(150deg, #0A1A35 0%, #0F2347 40%, #1B3A6B 100%)" }}
      aria-label="Sección principal"
    >
      {/* Patrón de fondo sutil: líneas diagonales finas */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5'%3E%3Cpath d='M0 60L60 0M-10 10L10 -10M50 70L70 50'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Halo de luz superior derecho */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at top right, rgba(45,90,160,0.35) 0%, transparent 70%)",
        }}
      />

      {/* Sello decorativo — elemento gráfico de autoridad */}
      <div
        className="absolute right-[3%] top-1/2 -translate-y-1/2 w-80 h-80 lg:w-[420px] lg:h-[420px] opacity-[0.055] pointer-events-none select-none hidden lg:block"
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Círculo exterior */}
          <circle cx="100" cy="100" r="94" stroke="white" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="86" stroke="white" strokeWidth="0.5" />
          {/* Cruz médica central */}
          <path d="M88 68 H112 V88 H132 V112 H112 V132 H88 V112 H68 V88 H88 Z" stroke="white" strokeWidth="1.5" fill="none" />
          {/* Texto circular simulado: puntos en arco */}
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i * 10 - 90) * (Math.PI / 180);
            const r = 78;
            const x = 100 + r * Math.cos(angle);
            const y = 100 + r * Math.sin(angle);
            return <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.2 : 0.6} fill="white" />;
          })}
          {/* Líneas radiales en esquinas */}
          <line x1="100" y1="6" x2="100" y2="18" stroke="white" strokeWidth="1.5" />
          <line x1="100" y1="182" x2="100" y2="194" stroke="white" strokeWidth="1.5" />
          <line x1="6" y1="100" x2="18" y2="100" stroke="white" strokeWidth="1.5" />
          <line x1="182" y1="100" x2="194" y2="100" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: copy ── */}
          <div>
            {/* Badge con dorado */}
            <div className="inline-flex items-center gap-2.5 mb-8">
              <span className="block w-6 h-px bg-[#C8993A]" />
              <span className="text-[#C8993A] text-xs font-semibold tracking-[0.18em] uppercase">
                Perito Médico Especialista · Toda España
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.1] mb-7" style={{ fontFamily: "var(--font-heading), Georgia, serif" }}>
              Si sospechas que un médico
              <br />
              <em className="not-italic text-white/90" style={{ borderBottom: "2px solid #1A9E6B", paddingBottom: "1px" }}>
                se equivocó contigo,
              </em>
              <br />
              <span className="text-white/70 font-light text-3xl sm:text-4xl lg:text-[2.5rem]">
                necesitas saberlo con certeza
              </span>
            </h1>

            <p className="text-white/65 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              Analizo tu historia clínica, evalúo si la atención que recibiste
              se ajustó a la lex artis y emito un informe pericial independiente
              con validez legal. Sin vínculos con hospitales ni aseguradoras.
            </p>

            {/* Trust micro-strip con dorado */}
            <div className="flex flex-wrap gap-x-7 gap-y-2.5 mb-10 pb-10 border-b border-white/10">
              {[
                "Especialista en mala praxis médica",
                "Ratificación judicial",
                "Consulta inicial gratuita",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2 text-sm text-white/75">
                  <span className="w-4 h-px bg-[#C8993A] shrink-0" />
                  {item}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2.5 bg-[#1A9E6B] hover:bg-[#158A5C] text-white font-bold px-8 py-4 rounded-xl text-base shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200"
              >
                Solicitar valoración gratuita
                <ArrowRight size={17} />
              </a>
              <a
                href="tel:[PENDIENTE]"
                className="inline-flex items-center justify-center gap-2.5 bg-white/8 hover:bg-white/15 text-white/90 font-semibold px-6 py-4 rounded-xl text-base border border-white/20 hover:border-white/40 transition-all duration-200"
              >
                <Phone size={16} />
                Llamar ahora
              </a>
            </div>

            {/* Social proof strip */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["M", "J", "A", "R"].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-[#1B3A6B] border-2 border-white/20 flex items-center justify-center text-white text-xs font-bold"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div className="h-8 w-px bg-white/15" />
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} className="fill-[#C8993A] text-[#C8993A]" />
                  ))}
                </div>
                <p className="text-white/50 text-xs tracking-wide">
                  Valorado por pacientes en toda España
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: card de razones (editorial) ── */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Línea decorativa lateral */}
              <div className="absolute left-0 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-[#C8993A]/40 to-transparent" />

              <div className="pl-8 space-y-8">
                <div className="mb-2">
                  <span className="text-[#C8993A] text-xs font-semibold tracking-[0.18em] uppercase block mb-3">
                    Lo que necesitas saber
                  </span>
                  <h2 className="text-white/90 font-bold text-xl leading-snug" style={{ fontFamily: "var(--font-heading), Georgia, serif" }}>
                    El hospital tiene su versión.
                    <br />Tú mereces la tuya.
                  </h2>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      num: "I",
                      text: "Probar una negligencia médica requiere un médico que entienda la lex artis y sepa trasladarlo a términos legales.",
                    },
                    {
                      num: "II",
                      text: "La sanidad pública y privada tienen obligación de responder por sus errores. El problema es demostrarlo.",
                    },
                    {
                      num: "III",
                      text: "Un informe pericial independiente es la diferencia entre tener un caso y poder ganarlo.",
                    },
                  ].map((item) => (
                    <div key={item.num} className="flex gap-5 items-start">
                      <span
                        className="shrink-0 text-[#C8993A] leading-none w-7"
                        style={{ fontFamily: "var(--font-heading), Georgia, serif", fontSize: "1.5rem", fontWeight: 300 }}
                      >
                        {item.num}
                      </span>
                      <p className="text-white/60 text-sm leading-relaxed pt-0.5">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10">
                  <a
                    href="#contacto"
                    className="inline-flex items-center gap-2 text-[#1A9E6B] hover:text-white text-sm font-semibold transition-colors duration-200 group"
                  >
                    Analiza tu caso gratuitamente
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                  <p className="text-white/35 text-xs mt-2">Sin compromiso. Respuesta en menos de 24h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 56L1440 56L1440 0C1200 36 960 56 720 56C480 56 240 36 0 0L0 56Z"
            fill="#F7F8FA"
          />
        </svg>
      </div>
    </section>
  );
}
