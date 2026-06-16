import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustStats } from "@/components/sections/TrustStats";
import { ProblemaSolucion } from "@/components/sections/ProblemaSolucion";
import { Servicios } from "@/components/sections/Servicios";
import { Proceso } from "@/components/sections/Proceso";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { FAQ } from "@/components/sections/FAQ";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildFAQSchema } from "@/lib/schemas";
import { faqs } from "@/lib/faq-data";
import { StickyCtaMobile } from "@/components/ui/StickyCtaMobile";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const faqSchema = buildFAQSchema(faqs);

  return (
    <>
      <JsonLd data={faqSchema} />
      <Header />
      <main id="main-content">
        <Hero />
        <TrustStats />
        <ProblemaSolucion />
        <Servicios />
        <Proceso />
        <TrustSignals />
        <FAQ />

        {/* CTA final hacia /consulta */}
        <section className="relative py-20 sm:py-28 overflow-hidden bg-[#0F2347]" aria-label="Llamada a la acción">
          <Image
            src="/img/medicina-derecho.webp"
            alt=""
            fill
            aria-hidden="true"
            sizes="100vw"
            className="object-cover object-right"
          />
          <div
            className="absolute inset-0 bg-linear-to-r from-[#0A1A35] via-[#0F2347]/95 to-[#0F2347]/65"
            aria-hidden="true"
          />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-heading), Georgia, serif" }}
            >
              Viabilidad inicial gratuita
            </h2>
            <p className="text-white/65 text-lg mb-8 max-w-xl mx-auto">
              Adjunta tu documentación médica y recibirás respuesta en menos de{" "}
              <strong className="text-white">24 horas laborables</strong>.
            </p>
            <a
              href="/consulta"
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2.5 bg-[#1A9E6B] hover:bg-[#158A5C] text-white font-bold px-10 py-4 rounded-xl text-base shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200"
            >
              Solicitar viabilidad gratuita
              <ArrowRight size={17} />
            </a>
          </div>
        </section>
        {/* Separador para que la barra fija no tape el footer en mobile */}
        <div className="lg:hidden h-20" aria-hidden="true" />
      </main>
      <Footer />
      <StickyCtaMobile />
    </>
  );
}
