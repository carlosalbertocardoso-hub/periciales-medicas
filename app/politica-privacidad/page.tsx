import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Política de Privacidad | Perito Médico",
  robots: { index: false, follow: false },
};

export default function PoliticaPrivacidad() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#1a1a2e] mb-8">
          Política de Privacidad
        </h1>

        <div className="prose prose-slate max-w-none space-y-6 text-[#334155]">
          <section>
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">
              1. Responsable del tratamiento
            </h2>
            <p>
              <strong>Identidad:</strong> Pablo Rodriguez de Tembleque Relaño<br />
              <strong>Dirección:</strong> C/San Juan de la Cruz, 21, Córdoba<br />
              <strong>Email:</strong> pablo.rdt@pericialmedica.com<br />
              <strong>Teléfono:</strong> [PENDIENTE]
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">
              2. Finalidad del tratamiento
            </h2>
            <p>
              Los datos personales recogidos a través del formulario de contacto
              se tratan con la única finalidad de atender y gestionar tu solicitud
              de información o consulta sobre servicios periciales médicos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">
              3. Legitimación
            </h2>
            <p>
              El tratamiento se basa en el consentimiento expreso que otorgas al
              marcar la casilla correspondiente en el formulario de contacto, de
              conformidad con el artículo 6.1.a del RGPD.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">
              4. Conservación de datos
            </h2>
            <p>
              Los datos se conservarán durante el tiempo necesario para atender tu
              solicitud y, en su caso, durante el tiempo legalmente exigido.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">
              5. Cesión de datos
            </h2>
            <p>
              No se cederán datos a terceros salvo obligación legal. No se realizan
              transferencias internacionales de datos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">
              6. Tus derechos
            </h2>
            <p>
              Puedes ejercer tus derechos de acceso, rectificación, supresión,
              limitación, portabilidad y oposición dirigiéndote a{" "}
              <a href="mailto:pablo.rdt@pericialmedica.com" className="text-[#1e3a5f] underline">
                pablo.rdt@pericialmedica.com
              </a>
              . También tienes derecho a presentar una reclamación ante la Agencia
              Española de Protección de Datos (aepd.es).
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
