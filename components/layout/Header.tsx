/* eslint-disable @next/next/no-html-link-for-pages */
import { Menu, X } from "lucide-react";

export function Header() {
  const navLinks = [
    { href: "/#servicios", label: "Negligencias médicas" },
    { href: "/perfil", label: "Acerca de mí" },
    { href: "/#faq", label: "FAQ" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 shadow-sm backdrop-blur-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="/" className="flex flex-col leading-tight group">
            <span className="font-bold text-[#1B3A6B] text-base sm:text-lg tracking-tight">
              Dr. <span className="text-[#C8993A]">Rodríguez de Tembleque</span>
            </span>
            <span className="text-xs text-[#6B7280] font-medium">
              Médico Perito · Toda España
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#6B7280] hover:text-[#1B3A6B] transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/consulta"
              className="hidden sm:inline-flex items-center gap-2 bg-[#1A9E6B] hover:bg-[#158A5C] text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm"
            >
              Viabilidad gratuita
            </a>
            <details className="group md:hidden">
              <summary
                className="list-none p-2 text-[#1B3A6B] hover:bg-[#EEF2F8] rounded-lg transition-colors cursor-pointer [&::-webkit-details-marker]:hidden"
                aria-label="Abrir menú"
              >
                <Menu size={22} className="group-open:hidden" />
                <X size={22} className="hidden group-open:block" />
              </summary>
              <div
                id="mobile-menu"
                className="fixed left-0 right-0 top-16 bg-white border-t border-[#E5E7EB] shadow-lg sm:top-20"
              >
                <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Menú móvil">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="py-3 px-2 text-[#1B3A6B] font-medium border-b border-[#F0F4F8] last:border-0 hover:text-[#2D5AA0] transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href="/consulta"
                    className="mt-3 flex items-center justify-center gap-2 bg-[#1A9E6B] hover:bg-[#158A5C] text-white px-4 py-3 rounded-lg font-bold transition-colors cursor-pointer"
                  >
                    Viabilidad gratuita
                  </a>
                </nav>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
