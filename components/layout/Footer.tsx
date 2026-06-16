import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

const serviciosLinks = [
  { href: "/#servicios", label: "Mala praxis médica" },
  { href: "/perfil", label: "Acerca de mí" },
  { href: "/consulta", label: "Solicitar viabilidad gratuita" },
  { href: "/#faq", label: "Preguntas frecuentes" },
];

const legalLinks = [
  { href: "/aviso-legal", label: "Aviso Legal" },
  { href: "/politica-privacidad", label: "Política de Privacidad" },
  { href: "/politica-cookies", label: "Política de Cookies" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F2347] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── Brand ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-xl mb-1">
              Dr. <span className="text-[#C8993A]">Rodríguez de Tembleque</span>
            </h3>
            <p className="text-white/50 text-sm mb-4">Médico Perito · Toda España</p>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Especialista en mala praxis médica asistencial. Informes periciales
              independientes con validez judicial en toda España.
            </p>
            <p className="text-white/35 text-xs leading-relaxed">
              Nº Colegiado: <span className="text-white/55">14/07919</span><br />
              Colegio de Médicos de Córdoba
            </p>
          </div>

          {/* ── Servicios ── */}
          <div>
            <h4 className="font-semibold text-sm mb-5 text-white/80 uppercase tracking-wider">
              Servicios
            </h4>
            <ul className="space-y-2.5">
              {serviciosLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Legal ── */}
          <div>
            <h4 className="font-semibold text-sm mb-5 text-white/80 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contacto ── */}
          <div>
            <h4 className="font-semibold text-sm mb-5 text-white/80 uppercase tracking-wider">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:pablo.rdt.medico@gmail.com"
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                >
                  <Mail size={13} className="text-[#1A9E6B] shrink-0" />
                  pablo.rdt.medico@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/50">
                <MapPin size={13} className="text-[#1A9E6B] shrink-0 mt-0.5" />
                <span>Toda España<br />(videoconsulta)</span>
              </li>
            </ul>

            <Link
              href="/consulta"
              className="mt-6 inline-flex items-center gap-2 bg-[#1A9E6B] hover:bg-[#158A5C] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
            >
              Viabilidad gratuita
            </Link>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© {currentYear} Pablo Rodríguez de Tembleque Relaño · Médico Perito Colegiado · Toda España</p>
          <p>La información de esta web es de carácter general y no sustituye el asesoramiento profesional.</p>
        </div>
      </div>
    </footer>
  );
}
