"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Cookie, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getConsent, saveConsent, pushConsentToGTM, loadAnalyticsForConsent, type ConsentState } from "@/lib/consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [prefs, setPrefs] = useState<ConsentState>({ analytics: false, marketing: false });

  useEffect(() => {
    const stored = getConsent();
    if (!stored) {
      // Pequeño delay para no bloquear LCP
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
    pushConsentToGTM(stored);
    loadAnalyticsForConsent(stored);
  }, []);

  function acceptAll() {
    const state = { analytics: true, marketing: true };
    saveConsent(state);
    pushConsentToGTM(state);
    loadAnalyticsForConsent(state);
    setVisible(false);
  }

  function rejectAll() {
    const state = { analytics: false, marketing: false };
    saveConsent(state);
    pushConsentToGTM(state);
    setVisible(false);
  }

  function saveCustom() {
    saveConsent(prefs);
    pushConsentToGTM(prefs);
    loadAnalyticsForConsent(prefs);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Preferencias de cookies"
      className={cn(
        "fixed bottom-24 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-[100]",
        "bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] p-5"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Cookie size={18} className="text-[#1A9E6B] shrink-0" />
          <h2 className="font-bold text-[#1A1A2E] text-sm">Usamos cookies</h2>
        </div>
        <button
          onClick={rejectAll}
          className="text-[#94A3B8] hover:text-[#64748B] transition-colors cursor-pointer"
          aria-label="Rechazar y cerrar"
        >
          <X size={16} />
        </button>
      </div>

      <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
        Utilizamos cookies propias y de terceros para analizar el tráfico y mostrar
        publicidad personalizada. Puedes aceptar todas, rechazarlas o configurarlas.{" "}
        <Link href="/politica-cookies" className="text-[#1B3A6B] underline underline-offset-2 hover:text-[#2D5AA0]">
          Más información
        </Link>
      </p>

      {/* Preferencias expandibles */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs text-[#1B3A6B] font-semibold hover:text-[#2D5AA0] transition-colors cursor-pointer"
          aria-expanded={expanded}
        >
          <ChevronDown
            size={14}
            className={cn("transition-transform duration-200", expanded && "rotate-180")}
            aria-hidden="true"
          />
          Personalizar
        </button>

        <div className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          expanded ? "max-h-40 mt-3" : "max-h-0"
        )}>
          <div className="space-y-2.5">
            {/* Técnicas — siempre activas */}
            <label className="flex items-center justify-between gap-3 text-xs text-[#374151]">
              <div>
                <span className="font-semibold">Cookies técnicas</span>
                <span className="text-[#9CA3AF] ml-1">(necesarias)</span>
              </div>
              <input type="checkbox" checked disabled className="accent-[#1A9E6B] cursor-not-allowed" />
            </label>

            {/* Analítica */}
            <label className="flex items-center justify-between gap-3 text-xs text-[#374151] cursor-pointer">
              <div>
                <span className="font-semibold">Analítica</span>
                <span className="text-[#9CA3AF] ml-1">(Google Analytics)</span>
              </div>
              <input
                type="checkbox"
                checked={prefs.analytics}
                onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                className="accent-[#1A9E6B] cursor-pointer"
              />
            </label>

            {/* Marketing */}
            <label className="flex items-center justify-between gap-3 text-xs text-[#374151] cursor-pointer">
              <div>
                <span className="font-semibold">Marketing</span>
                <span className="text-[#9CA3AF] ml-1">(Google Ads, Meta)</span>
              </div>
              <input
                type="checkbox"
                checked={prefs.marketing}
                onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))}
                className="accent-[#1A9E6B] cursor-pointer"
              />
            </label>

            <button
              onClick={saveCustom}
              className="w-full mt-1 py-2 rounded-lg border border-[#1B3A6B] text-[#1B3A6B] text-xs font-semibold hover:bg-[#EEF2F8] transition-colors cursor-pointer"
            >
              Guardar preferencias
            </button>
          </div>
        </div>
      </div>

      {/* Botones principales */}
      <div className="flex gap-2">
        <button
          onClick={rejectAll}
          className="flex-1 py-2.5 rounded-xl border border-[#E5E7EB] text-[#6B7280] text-xs font-semibold hover:bg-[#F7F8FA] transition-colors cursor-pointer"
        >
          Rechazar
        </button>
        <button
          onClick={acceptAll}
          className="flex-1 py-2.5 rounded-xl bg-[#1A9E6B] hover:bg-[#158A5C] text-white text-xs font-bold transition-colors cursor-pointer"
        >
          Aceptar todas
        </button>
      </div>
    </div>
  );
}
