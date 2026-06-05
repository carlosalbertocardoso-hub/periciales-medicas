import { Phone, Mail, MapPin } from "lucide-react";

const serviciosLinks = [
  { href: "/peritaje-accidentes-trafico", label: "Accidentes de tráfico" },
  { href: "/valoracion-dano-corporal", label: "Daño corporal" },
  { href: "/negligencias-medicas", label: "Negligencias médicas" },
  { href: "/accidentes-laborales", label: "Accidentes laborales" },
  { href: "/valoracion-secuelas", label: "Valoración de secuelas" },
  { href: "/informes-periciales", label: "Informes periciales" },
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
              Pablo <span className="text-[#C8993A]">[PENDIENTE]</span>
            </h3>
            <p className="text-white/50 text-sm mb-4">Perito Médico · Toda España</p>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Informes periciales médicos independientes para la valoración del
              daño corporal en toda España.
            </p>
            <p className="text-white/35 text-xs leading-relaxed">
              Nº Colegiado: <span className="text-white/55">[PENDIENTE]</span><br />
              Colegio de Médicos de [PENDIENTE]
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
                  <a
                    href={l.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
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
                  <a
                    href={l.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
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
                  href="tel:[PENDIENTE]"
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                >
                  <Phone size={13} className="text-[#1A9E6B] shrink-0" />
                  [PENDIENTE teléfono]
                </a>
              </li>
              <li>
                <a
                  href="mailto:[PENDIENTE]"
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                >
                  <Mail size={13} className="text-[#1A9E6B] shrink-0" />
                  [PENDIENTE email]
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/50">
                <MapPin size={13} className="text-[#1A9E6B] shrink-0 mt-0.5" />
                <span>Toda España<br />(presencial o videoconsulta)</span>
              </li>
            </ul>

            <a
              href="#contacto"
              className="mt-6 inline-flex items-center gap-2 bg-[#1A9E6B] hover:bg-[#158A5C] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
            >
              Consulta gratuita
            </a>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© {currentYear} Pablo [PENDIENTE] · Perito Médico Colegiado · Toda España</p>
          <p>La información de esta web es de carácter general y no sustituye el asesoramiento profesional.</p>
        </div>
      </div>
    </footer>
  );
}
