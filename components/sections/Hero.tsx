import Image from "next/image";
import { ArrowRight, ShieldCheck, FileCheck, Scale } from "lucide-react";
import { OpenChatbotLink } from "@/components/ui/OpenChatbotLink";

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center lg:items-stretch">

          {/* ── Left: copy ── */}
          <div>
            {/* Badge con dorado */}
            <div className="inline-flex items-center gap-2.5 mb-6 sm:mb-8">
              <span className="block w-6 h-px bg-[#C8993A] shrink-0" />
              <span className="text-[#C8993A] text-[0.7rem] sm:text-xs font-semibold tracking-[0.16em] sm:tracking-[0.18em] uppercase">
                Médico Perito Especialista · Toda España
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.1] mb-7" style={{ fontFamily: "var(--font-heading), Georgia, serif" }}>
              Si sospechas que un médico{" "}
              <br className="hidden sm:block" />
              <em className="not-italic text-white/90" style={{ borderBottom: "2px solid #1A9E6B", paddingBottom: "1px" }}>
                se equivocó contigo,
              </em>
              <br />
              <span className="text-white/70 font-light text-3xl sm:text-4xl lg:text-[2.5rem]">
                necesitas saberlo con certeza
              </span>
            </h1>

            <p className="text-white/65 text-base sm:text-lg leading-relaxed mb-7 max-w-lg">
              Analizo tu historia clínica, evalúo si la atención que recibiste
              se ajustó a la lex artis y emito un informe pericial independiente
              con validez legal. Sin vínculos con hospitales ni aseguradoras.
            </p>

            {/* Trust micro-strip con dorado */}
            <div className="flex flex-wrap gap-x-7 gap-y-2.5 mb-8 pb-8 sm:mb-10 sm:pb-10 border-b border-white/10">
              {[
                "Especialista en mala praxis médica",
                "Ratificación judicial",
                "Estudio preliminar gratuito",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2 text-sm text-white/75">
                  <span className="w-4 h-px bg-[#C8993A] shrink-0" />
                  {item}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href="/consulta"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 bg-[#1A9E6B] hover:bg-[#158A5C] text-white font-bold px-8 py-4 rounded-xl text-base shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200"
              >
                Viabilidad gratuita
                <ArrowRight size={17} />
              </a>
              <div className="text-center sm:text-left">
                <OpenChatbotLink />
              </div>
            </div>
            <p className="text-white/45 text-sm mt-3 text-center sm:text-left">
              Respuesta en menos de 24 h laborables · Sin compromiso
            </p>

            {/* Imagen — solo mobile/tablet */}
            <div className="lg:hidden mt-9 relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src="/img/hero-perito.webp"
                alt="Médico perito analizando una historia clínica junto a pruebas diagnósticas"
                width={1448}
                height={1086}
                priority
                sizes="(max-width: 1023px) 100vw, 0px"
                className="w-full h-auto"
              />
              <div
                className="absolute inset-0 bg-linear-to-t from-[#0A1A35]/55 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Prueba social — datos verificables */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-2.5">
                <FileCheck size={18} className="text-[#C8993A] shrink-0" />
                <p className="text-white/70 text-sm">
                  <span className="font-bold text-white">+50</span> informes periciales emitidos
                </p>
              </div>
              <div className="hidden sm:block h-8 w-px bg-white/15" />
              <div className="flex items-center gap-2.5">
                <Scale size={18} className="text-[#C8993A] shrink-0" />
                <p className="text-white/70 text-sm">
                  <span className="font-bold text-white">+10</span> años como perito judicial
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: imagen editorial ── */}
          <div className="hidden lg:flex">
            <div className="relative w-full">
              {/* Marco dorado desplazado */}
              <div
                className="absolute -top-4 -right-4 w-full h-full rounded-2xl border border-[#C8993A]/30"
                aria-hidden="true"
              />
              <div className="relative h-full min-h-105 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <Image
                  src="/img/hero-perito.webp"
                  alt="Médico perito analizando una historia clínica junto a pruebas diagnósticas"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-linear-to-t from-[#0A1A35]/55 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Badge credencial flotante */}
              <div className="absolute -bottom-6 left-6 right-10 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl px-5 py-4 flex items-center gap-3.5">
                <span className="w-10 h-10 rounded-lg bg-[#1A9E6B]/15 text-[#1A9E6B] flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} />
                </span>
                <p className="text-[#1A1A2E] text-sm font-semibold leading-snug">
                  Informe con validez judicial.
                  <br />
                  <span className="text-[#6B7280] font-normal">
                    Sin vínculo con hospitales ni aseguradoras.
                  </span>
                </p>
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
