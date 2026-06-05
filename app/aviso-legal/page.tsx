import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Aviso Legal | Perito Médico",
  robots: { index: false, follow: false },
};

export default function AvisoLegal() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#1a1a2e] mb-8">Aviso Legal</h1>

        <div className="space-y-8 text-[#334155]">
          <section>
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">
              1. Datos identificativos
            </h2>
            <p className="leading-relaxed">
              En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la
              Sociedad de la Información y de Comercio Electrónico (LSSICE), se
              facilitan los datos del titular de este sitio web:
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              <li><strong>Nombre:</strong> Pablo [PENDIENTE APELLIDO]</li>
              <li><strong>NIF:</strong> [PENDIENTE]</li>
              <li><strong>Dirección:</strong> [PENDIENTE]</li>
              <li><strong>Email:</strong> [PENDIENTE]</li>
              <li><strong>Teléfono:</strong> [PENDIENTE]</li>
              <li><strong>Colegio de Médicos:</strong> [PENDIENTE] · Nº colegiado: [PENDIENTE]</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">
              2. Objeto y ámbito de aplicación
            </h2>
            <p className="leading-relaxed text-sm">
              El presente Aviso Legal regula el acceso y uso del sitio web{" "}
              <strong>[PENDIENTE DOMINIO]</strong> (en adelante, «el Sitio»). El
              acceso al Sitio implica la aceptación plena de las presentes
              condiciones. Si no está de acuerdo con ellas, deberá abstenerse de
              utilizarlo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">
              3. Propiedad intelectual e industrial
            </h2>
            <p className="leading-relaxed text-sm">
              Los contenidos, textos, imágenes, logotipos y demás elementos del
              Sitio son propiedad del titular o cuenta con licencia de uso. Queda
              prohibida su reproducción, distribución o modificación sin
              autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">
              4. Responsabilidad
            </h2>
            <p className="leading-relaxed text-sm">
              El titular del Sitio no se responsabiliza de los daños derivados del
              uso del mismo ni de los errores en los contenidos, sin perjuicio de
              las responsabilidades que le puedan corresponder conforme a la
              legislación vigente. La información publicada tiene carácter
              orientativo y no constituye asesoramiento legal, médico o pericial
              individualizado.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">
              5. Legislación aplicable y jurisdicción
            </h2>
            <p className="leading-relaxed text-sm">
              Este Aviso Legal se rige por la legislación española. Para la
              resolución de cualquier controversia, las partes se someten a los
              juzgados y tribunales de [PENDIENTE localidad], con renuncia expresa
              a cualquier otro fuero que pudiera corresponderles.
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
