import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Formulario } from "@/components/sections/Formulario";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { ServiceFAQ } from "@/components/templates/ServiceFAQ";

export interface ServicePageData {
  slug: string;
  title: string;         // H1
  metaTitle: string;
  metaDesc: string;
  badge: string;         // chip superior
  heroSubtitle: string;
  heroPoints: string[];  // 3-4 puntos clave hero
  icon: LucideIcon;
  intro: string;         // párrafo introductorio (1-2 frases)
  sections: {            // secciones de contenido
    heading: string;
    body: string;
  }[];
  checklist: string[];   // lista de lo que incluye el servicio
  relatedLinks: { href: string; label: string }[];
  faqs: { q: string; a: string }[];
}

export function ServicePage({ data }: { data: ServicePageData }) {
  const Icon = data.icon;

  return (
    <>
      <ServiceJsonLd
        name={data.title}
        description={data.metaDesc}
        url={`/${data.slug}`}
        faqs={data.faqs}
      />
      <Header />

      <main id="main-content">
        {/* ── Hero ── */}
        <section
          className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0F2347 0%, #1B3A6B 60%, #2D5AA0 100%)" }}
          aria-label="Cabecera"
        >
          <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")` }}
          />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-white/40 text-xs mb-6">
              <a href="/" className="hover:text-white/70 transition-colors">Inicio</a>
              <ChevronRight size={12} />
              <a href="/#servicios" className="hover:text-white/70 transition-colors">Servicios</a>
              <ChevronRight size={12} />
              <span className="text-white/60">{data.badge}</span>
            </nav>

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 px-4 py-2 rounded-full text-xs font-semibold mb-6">
              <Icon size={13} className="text-[#1A9E6B]" />
              {data.badge}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              {data.title}
            </h1>
            <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
              {data.heroSubtitle}
            </p>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
              {data.heroPoints.map((pt) => (
                <li key={pt} className="flex items-center gap-1.5 text-sm text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1A9E6B] shrink-0" />
                  {pt}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 bg-[#1A9E6B] hover:bg-[#158A5C] text-white font-bold px-8 py-4 rounded-xl text-base shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200"
              >
                Solicitar consulta gratuita
                <ArrowRight size={17} />
              </a>
              <a
                href="tel:[PENDIENTE]"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-4 rounded-xl text-base border border-white/25 transition-all duration-200"
              >
                Llamar ahora
              </a>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
            <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
              <path d="M0 40L1440 40L1440 0C1200 26 960 40 720 40C480 40 240 26 0 0L0 40Z" fill="#F7F8FA" />
            </svg>
          </div>
        </section>

        {/* ── Contenido principal ── */}
        <section className="py-14 sm:py-20 bg-[#F7F8FA]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

              {/* Artículo */}
              <article className="lg:col-span-2 prose prose-slate max-w-none">
                <p className="text-[#374151] text-lg leading-relaxed mb-8 not-prose">
                  {data.intro}
                </p>

                {data.sections.map((s) => (
                  <div key={s.heading} className="mb-8 not-prose">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A2E] mb-3">{s.heading}</h2>
                    <p className="text-[#6B7280] leading-relaxed">{s.body}</p>
                  </div>
                ))}
              </article>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Qué incluye */}
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
                  <h3 className="font-bold text-[#1A1A2E] text-base mb-4">
                    ¿Qué incluye este servicio?
                  </h3>
                  <ul className="space-y-3">
                    {data.checklist.map((item) => (
                      <li key={item} className="flex gap-2.5 items-start text-sm text-[#374151]">
                        <CheckCircle2 size={15} className="text-[#1A9E6B] shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA lateral */}
                <div className="bg-[#1B3A6B] rounded-2xl p-6 text-white">
                  <p className="font-bold text-lg mb-2">Consulta inicial gratuita</p>
                  <p className="text-white/65 text-sm mb-5 leading-relaxed">
                    Sin compromiso. Te orientamos sobre si tiene sentido un informe pericial en tu caso.
                  </p>
                  <a
                    href="#contacto"
                    className="flex items-center justify-center gap-2 bg-[#1A9E6B] hover:bg-[#158A5C] text-white font-bold py-3 rounded-xl text-sm transition-colors"
                  >
                    Solicitar ahora
                    <ArrowRight size={14} />
                  </a>
                  <p className="text-center text-white/40 text-xs mt-3">Respuesta en menos de 24h</p>
                </div>

                {/* Otros servicios */}
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
                  <h3 className="font-bold text-[#1A1A2E] text-sm mb-4 uppercase tracking-wider">
                    Otros servicios
                  </h3>
                  <ul className="space-y-2">
                    {data.relatedLinks.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1B3A6B] transition-colors group"
                        >
                          <ChevronRight size={13} className="text-[#1A9E6B] shrink-0" />
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ── FAQ específica ── */}
        <ServiceFAQ faqs={data.faqs} />

        {/* ── Formulario ── */}
        <Formulario />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
