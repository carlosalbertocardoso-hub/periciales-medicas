"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#servicios", label: "Servicios" },
    { href: "#proceso", label: "Cómo funciona" },
    { href: "#sobre-pablo", label: "Sobre Pablo" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white shadow-sm"
          : "bg-white/95 backdrop-blur-sm"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="/" className="flex flex-col leading-tight group">
            <span className="font-bold text-[#1B3A6B] text-base sm:text-lg tracking-tight">
              Pablo <span className="text-[#C8993A]">[PENDIENTE]</span>
            </span>
            <span className="text-xs text-[#6B7280] font-medium">
              Perito Médico · Toda España
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
              href="#contacto"
              className="hidden sm:inline-flex items-center gap-2 bg-[#1A9E6B] hover:bg-[#158A5C] text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm"
            >
              Enviar caso
            </a>
            <button
              className="md:hidden p-2 text-[#1B3A6B] hover:bg-[#EEF2F8] rounded-lg transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu con animación */}
      <div
        id="mobile-menu"
        className={cn(
          "md:hidden bg-white border-t border-[#E5E7EB] shadow-lg overflow-hidden transition-all duration-300 ease-out",
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Menú móvil">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 px-2 text-[#1B3A6B] font-medium border-b border-[#F0F4F8] last:border-0 hover:text-[#2D5AA0] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setMobileOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 bg-[#1A9E6B] hover:bg-[#158A5C] text-white px-4 py-3 rounded-lg font-bold transition-colors cursor-pointer"
          >
            Enviar mi caso
          </a>
        </nav>
      </div>
    </header>
  );
}
