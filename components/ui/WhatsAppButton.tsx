"use client";

import { MessageCircle } from "lucide-react";

const WA_NUMBER = "[PENDIENTE]"; // e.g. "34600000000"
const WA_MESSAGE = encodeURIComponent(
  "Hola, me gustaría solicitar información sobre una valoración médico-pericial."
);

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#1ebe57] active:scale-95 transition-all duration-200 group"
    >
      <MessageCircle size={22} className="shrink-0" />
      <span className="text-sm font-semibold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
        WhatsApp
      </span>
    </a>
  );
}
