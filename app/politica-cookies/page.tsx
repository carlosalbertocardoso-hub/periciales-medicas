import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Política de Cookies | Perito Médico",
  robots: { index: false, follow: false },
};

export default function PoliticaCookies() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#1a1a2e] mb-8">
          Política de Cookies
        </h1>

        <div className="space-y-8 text-[#334155]">
          <section>
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">
              1. ¿Qué son las cookies?
            </h2>
            <p className="text-sm leading-relaxed">
              Las cookies son pequeños archivos de texto que se almacenan en tu
              dispositivo cuando visitas un sitio web. Se utilizan para que el
              sitio funcione correctamente, para analizar el tráfico y para
              recordar tus preferencias.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">
              2. Cookies que utilizamos
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#f8fafc]">
                    <th className="text-left px-3 py-2 border border-[#e2e8f0] font-semibold text-[#1a1a2e]">
                      Cookie
                    </th>
                    <th className="text-left px-3 py-2 border border-[#e2e8f0] font-semibold text-[#1a1a2e]">
                      Tipo
                    </th>
                    <th className="text-left px-3 py-2 border border-[#e2e8f0] font-semibold text-[#1a1a2e]">
                      Finalidad
                    </th>
                    <th className="text-left px-3 py-2 border border-[#e2e8f0] font-semibold text-[#1a1a2e]">
                      Duración
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border border-[#e2e8f0]">
                      _session
                    </td>
                    <td className="px-3 py-2 border border-[#e2e8f0]">
                      Técnica esencial
                    </td>
                    <td className="px-3 py-2 border border-[#e2e8f0]">
                      Funcionamiento básico del sitio
                    </td>
                    <td className="px-3 py-2 border border-[#e2e8f0]">
                      Sesión
                    </td>
                  </tr>
                  <tr className="bg-[#f8fafc]">
                    <td className="px-3 py-2 border border-[#e2e8f0]">
                      _ga, _ga_*
                    </td>
                    <td className="px-3 py-2 border border-[#e2e8f0]">
                      Analítica (terceros)
                    </td>
                    <td className="px-3 py-2 border border-[#e2e8f0]">
                      Google Analytics 4 — análisis de tráfico
                    </td>
                    <td className="px-3 py-2 border border-[#e2e8f0]">
                      2 años
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border border-[#e2e8f0]">
                      _fbp
                    </td>
                    <td className="px-3 py-2 border border-[#e2e8f0]">
                      Marketing (terceros)
                    </td>
                    <td className="px-3 py-2 border border-[#e2e8f0]">
                      Meta Pixel — seguimiento de conversiones
                    </td>
                    <td className="px-3 py-2 border border-[#e2e8f0]">
                      90 días
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-xs text-[#94a3b8]">
              Las cookies de analítica y marketing solo se activan si otorgas tu
              consentimiento mediante el banner de cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">
              3. Cómo gestionar las cookies
            </h2>
            <p className="text-sm leading-relaxed">
              Puedes aceptar, rechazar o configurar las cookies en el momento de
              tu primera visita mediante el banner de consentimiento. También
              puedes eliminarlas o bloquearlas desde la configuración de tu
              navegador:
            </p>
            <ul className="mt-2 space-y-1 text-sm list-disc list-inside text-[#64748b]">
              <li>
                <strong>Chrome:</strong> Ajustes → Privacidad y seguridad → Cookies
              </li>
              <li>
                <strong>Firefox:</strong> Ajustes → Privacidad y seguridad
              </li>
              <li>
                <strong>Safari:</strong> Preferencias → Privacidad
              </li>
              <li>
                <strong>Edge:</strong> Configuración → Cookies y permisos del
                sitio
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">
              4. Base legal
            </h2>
            <p className="text-sm leading-relaxed">
              El uso de cookies técnicas se basa en el interés legítimo para el
              funcionamiento del sitio. Las cookies de analítica y marketing
              requieren tu consentimiento previo conforme al RGPD y la LSSI.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">
              5. Contacto
            </h2>
            <p className="text-sm leading-relaxed">
              Para cualquier consulta sobre el uso de cookies, contacta en{" "}
              <a
                href="mailto:pablo.rdt.medico@gmail.com"
                className="text-[#1e3a5f] underline"
              >
                pablo.rdt.medico@gmail.com
              </a>
              .
            </p>
          </section>

          <p className="text-xs text-[#94a3b8] pt-4 border-t border-[#e2e8f0]">
            Última actualización: junio de 2025
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
