import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2, Phone, ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Solicitud recibida | Perito Médico",
  description: "Hemos recibido tu consulta. Te responderemos en menos de 24 horas.",
  robots: { index: false, follow: false },
};

export default function Gracias() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-4 py-24"
        style={{ background: "linear-gradient(135deg, #F7F8FA 0%, #EEF2F8 100%)" }}
      >
        {/* Pixel de conversión — se dispara solo cuando se llega a esta página */}
        {/* GTM/GA4 lo recoge automáticamente como page_view de /gracias */}

        <div className="max-w-lg w-full text-center">
          {/* Icono */}
          <div className="w-20 h-20 rounded-full bg-[#E8F7F1] flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-[#1A9E6B]" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A2E] mb-3">
            ¡Consulta recibida!
          </h1>
          <p className="text-[#6B7280] text-lg mb-8 leading-relaxed">
            Gracias por ponerte en contacto. Te responderé personalmente en{" "}
            <strong className="text-[#1A1A2E]">menos de 24 horas</strong> al
            teléfono que has indicado.
          </p>

          {/* Pasos siguientes */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 mb-8 text-left shadow-sm">
            <h2 className="font-bold text-[#1A1A2E] text-sm uppercase tracking-wider mb-4">
              ¿Qué ocurre ahora?
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: Clock,
                  title: "Revisaré tu caso",
                  text: "Analizaré la información que has compartido para preparar la orientación inicial.",
                },
                {
                  icon: Phone,
                  title: "Me pondré en contacto contigo",
                  text: "Te llamaré en menos de 24 horas para comentar tu situación sin compromiso.",
                },
                {
                  icon: CheckCircle2,
                  title: "Consulta inicial gratuita",
                  text: "Te daré una primera orientación sobre si tiene sentido un informe pericial en tu caso.",
                },
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-[#E8F7F1] flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-[#1A9E6B]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1A1A2E] text-sm">{step.title}</p>
                      <p className="text-[#6B7280] text-xs leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA secundario */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#1A9E6B] hover:bg-[#158A5C] text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Volver al inicio
              <ArrowRight size={15} />
            </a>
            <a
              href="tel:[PENDIENTE]"
              className="inline-flex items-center justify-center gap-2 border border-[#1B3A6B] text-[#1B3A6B] font-semibold px-6 py-3 rounded-xl text-sm hover:bg-[#EEF2F8] transition-colors"
            >
              <Phone size={15} />
              Llamar ahora
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
