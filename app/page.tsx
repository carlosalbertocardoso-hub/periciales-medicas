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
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <JsonLd />
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
        <section className="py-16 sm:py-20 bg-[#0F2347]" aria-label="Llamada a la acción">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-heading), Georgia, serif" }}
            >
              Valoración inicial gratuita
            </h2>
            <p className="text-white/65 text-lg mb-8 max-w-xl mx-auto">
              Adjunta tu documentación médica (menos de 30 folios) y recibirás
              respuesta en menos de{" "}
              <strong className="text-white">24 horas laborables</strong>.
            </p>
            <a
              href="/consulta"
              className="inline-flex items-center gap-2.5 bg-[#1A9E6B] hover:bg-[#158A5C] text-white font-bold px-10 py-4 rounded-xl text-base shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200"
            >
              Solicitar valoración gratuita
              <ArrowRight size={17} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
