import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

/**
 * Barra de acción fija en la parte inferior, solo en mobile/tablet.
 * Mantiene el CTA principal siempre a la vista en la página de captación.
 */
export function StickyCtaMobile() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 flex items-center gap-3 border-t border-[#E5E7EB] bg-white/95 backdrop-blur-sm px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(15,35,71,0.08)]">
      <a
        href="https://wa.me/34601539180"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#1FA855] hover:bg-[#25D366]/20 transition-colors"
      >
        <MessageCircle size={22} />
      </a>
      <Link
        href="/consulta"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1A9E6B] hover:bg-[#158A5C] text-white font-bold py-3.5 text-[0.95rem] shadow-sm active:scale-[0.98] transition-all duration-200"
      >
        Viabilidad gratuita
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}
