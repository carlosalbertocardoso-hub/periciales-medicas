import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FormularioConsulta } from "@/components/sections/FormularioConsulta";
import { JsonLd } from "@/components/seo/JsonLd";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Valoración Gratuita de Negligencia Médica | Consulta Online",
  description:
    "Solicita tu valoración inicial gratuita. Adjunta tu documentación médica (menos de 30 folios) y recibirás respuesta en menos de 24 horas laborables.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://[PENDIENTE DOMINIO]/consulta" },
};

const requisitos = [
  "Descripción del caso y expectativa / pretensión",
  "Documentación médica (menos de 30 folios)",
  "Teléfono móvil de contacto",
  "Dirección de correo electrónico",
];

export default function ConsultaPage() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="main-content" className="pt-16 sm:pt-20">
        {/* Cabecera de página */}
        <div
          className="py-14 sm:py-20"
          style={{ background: "linear-gradient(150deg, #0A1A35 0%, #0F2347 40%, #1B3A6B 100%)" }}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block bg-[#1A9E6B]/20 text-[#1A9E6B] text-xs font-semibold tracking-[0.18em] uppercase px-4 py-1.5 rounded-full mb-5">
              Valoración inicial gratuita
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
              style={{ fontFamily: "var(--font-heading), Georgia, serif" }}
            >
              ¿Crees que sufriste
              <br />
              una negligencia médica?
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Envía tu caso. Te respondo en menos de{" "}
              <strong className="text-white">24 horas laborables</strong> con
              una valoración inicial gratuita sobre la viabilidad de tu
              situación.
            </p>

            <div className="inline-flex flex-col sm:flex-row gap-3 sm:gap-6 text-left">
              {requisitos.map((r) => (
                <div key={r} className="flex items-start gap-2 text-white/70 text-sm">
                  <CheckCircle2 size={15} className="text-[#1A9E6B] shrink-0 mt-0.5" />
                  {r}
                </div>
              ))}
            </div>
          </div>
        </div>

        <FormularioConsulta />
      </main>
      <Footer />
    </>
  );
}
