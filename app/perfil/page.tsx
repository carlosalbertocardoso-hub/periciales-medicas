import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SobrePablo } from "@/components/sections/SobrePablo";
import { StickyCtaMobile } from "@/components/ui/StickyCtaMobile";
import { Mail, MessageCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Perito Médico Especialista en Negligencias | Perfil Profesional",
  description:
    "Médico especialista en valoración de mala praxis médica asistencial. Informes periciales independientes con validez judicial para toda España.",
  alternates: { canonical: "/perfil" },
  openGraph: {
    title: "Perito Médico Especialista en Negligencias | Perfil Profesional",
    description:
      "Médico especialista en valoración de mala praxis médica asistencial. Informes periciales independientes con validez judicial para toda España.",
    url: "/perfil",
  },
};

export default function PerfilPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16 sm:pt-20">
        <SobrePablo />

        {/* Contacto directo */}
        <section className="py-16 bg-white" aria-label="Contacto directo">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-[#C8993A] text-xs font-semibold tracking-[0.18em] uppercase block mb-4">
              Contacto
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1A1A2E] mb-8"
              style={{ fontFamily: "var(--font-heading), Georgia, serif" }}
            >
              Contacto directo
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href="mailto:pablo.rdt.medico@gmail.com"
                className="flex items-center justify-center gap-3 bg-[#F7F8FA] hover:bg-[#EEF2F8] border border-[#E5E7EB] hover:border-[#1B3A6B]/30 rounded-xl px-6 py-4 text-[#1A1A2E] font-semibold text-sm transition-all duration-200"
              >
                <Mail size={18} className="text-[#1A9E6B]" />
                pablo.rdt.medico@gmail.com
              </a>
              <a
                href="https://wa.me/34601539180"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#F7F8FA] hover:bg-[#EEF2F8] border border-[#E5E7EB] hover:border-[#1B3A6B]/30 rounded-xl px-6 py-4 text-[#1A1A2E] font-semibold text-sm transition-all duration-200"
              >
                <MessageCircle size={18} className="text-[#1A9E6B]" />
                WhatsApp (solo mensajes)
              </a>
            </div>

            <a
              href="/consulta"
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2.5 bg-[#1A9E6B] hover:bg-[#158A5C] text-white font-bold px-8 py-4 rounded-xl text-base shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200"
            >
              Solicitar viabilidad gratuita
              <ArrowRight size={17} />
            </a>
            <p className="mt-3 text-sm text-[#6B7280]">
              Respuesta en menos de 24 horas laborables
            </p>
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
