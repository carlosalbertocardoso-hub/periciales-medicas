const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "";
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID?.trim() ?? "";

export function CookieBanner() {
  const script = `
    (() => {
      const STORAGE_KEY = "cookie_consent";
      const GTM_ID = ${JSON.stringify(GTM_ID)};
      const GA4_ID = ${JSON.stringify(GA4_ID)};
      const banner = document.getElementById("cookie-banner");
      if (!banner) return;

      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };

      function readConsent() {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          return raw ? JSON.parse(raw) : null;
        } catch {
          return null;
        }
      }

      function updateConsent(state) {
        window.gtag("consent", "update", {
          analytics_storage: state.analytics ? "granted" : "denied",
          ad_storage: state.marketing ? "granted" : "denied",
          ad_user_data: state.marketing ? "granted" : "denied",
          ad_personalization: state.marketing ? "granted" : "denied",
        });
      }

      function loadGA4(id) {
        if (!id || document.getElementById("ga4-script")) return;
        const script = document.createElement("script");
        script.id = "ga4-script";
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
        script.onload = () => {
          window.gtag("js", new Date());
          window.gtag("config", id);
        };
        document.head.appendChild(script);
      }

      function loadAnalytics(state) {
        if (!GTM_ID && state.analytics) loadGA4(GA4_ID);
      }

      function save(state) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        updateConsent(state);
        loadAnalytics(state);
        banner.hidden = true;
      }

      const stored = readConsent();
      if (stored) {
        updateConsent(stored);
        loadAnalytics(stored);
      } else {
        window.setTimeout(() => {
          banner.hidden = false;
        }, 3500);
      }

      document.getElementById("cookie-accept")?.addEventListener("click", () => {
        save({ analytics: true, marketing: true });
      });
      document.getElementById("cookie-reject")?.addEventListener("click", () => {
        save({ analytics: false, marketing: false });
      });
      document.getElementById("cookie-close")?.addEventListener("click", () => {
        save({ analytics: false, marketing: false });
      });
      document.getElementById("cookie-save")?.addEventListener("click", () => {
        save({
          analytics: document.getElementById("cookie-analytics")?.checked === true,
          marketing: document.getElementById("cookie-marketing")?.checked === true,
        });
      });
    })();
  `;

  return (
    <>
      <div
        id="cookie-banner"
        hidden
        role="dialog"
        aria-modal="true"
        aria-label="Preferencias de cookies"
        className="fixed bottom-24 left-4 right-4 z-[100] rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-2xl sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-md"
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1A9E6B]/10 text-xs font-bold text-[#1A9E6B]">
              C
            </span>
            <h2 className="text-sm font-bold text-[#1A1A2E]">Usamos cookies</h2>
          </div>
          <button
            id="cookie-close"
            type="button"
            className="cursor-pointer text-sm font-bold text-[#94A3B8] transition-colors hover:text-[#64748B]"
            aria-label="Rechazar y cerrar"
          >
            X
          </button>
        </div>

        <p className="mb-4 text-xs leading-relaxed text-[#6B7280]">
          Utilizamos cookies propias y de terceros para analizar el tráfico y mostrar
          publicidad personalizada. Puedes aceptar todas, rechazarlas o configurarlas.{" "}
          <a href="/politica-cookies" className="text-[#1B3A6B] underline underline-offset-2 hover:text-[#2D5AA0]">
            Más información
          </a>
        </p>

        <details className="mb-4">
          <summary className="cursor-pointer list-none text-xs font-semibold text-[#1B3A6B] transition-colors hover:text-[#2D5AA0] [&::-webkit-details-marker]:hidden">
            Personalizar
          </summary>
          <div className="mt-3 space-y-2.5">
            <label className="flex items-center justify-between gap-3 text-xs text-[#374151]">
              <span>
                <span className="font-semibold">Cookies técnicas</span>
                <span className="ml-1 text-[#9CA3AF]">(necesarias)</span>
              </span>
              <input type="checkbox" checked disabled className="cursor-not-allowed accent-[#1A9E6B]" />
            </label>

            <label className="flex cursor-pointer items-center justify-between gap-3 text-xs text-[#374151]">
              <span>
                <span className="font-semibold">Analítica</span>
                <span className="ml-1 text-[#9CA3AF]">(Google Analytics)</span>
              </span>
              <input id="cookie-analytics" type="checkbox" className="cursor-pointer accent-[#1A9E6B]" />
            </label>

            <label className="flex cursor-pointer items-center justify-between gap-3 text-xs text-[#374151]">
              <span>
                <span className="font-semibold">Marketing</span>
                <span className="ml-1 text-[#9CA3AF]">(Google Ads, Meta)</span>
              </span>
              <input id="cookie-marketing" type="checkbox" className="cursor-pointer accent-[#1A9E6B]" />
            </label>

            <button
              id="cookie-save"
              type="button"
              className="mt-1 w-full cursor-pointer rounded-lg border border-[#1B3A6B] py-2 text-xs font-semibold text-[#1B3A6B] transition-colors hover:bg-[#EEF2F8]"
            >
              Guardar preferencias
            </button>
          </div>
        </details>

        <div className="flex gap-2">
          <button
            id="cookie-reject"
            type="button"
            className="flex-1 cursor-pointer rounded-xl border border-[#E5E7EB] py-2.5 text-xs font-semibold text-[#6B7280] transition-colors hover:bg-[#F7F8FA]"
          >
            Rechazar
          </button>
          <button
            id="cookie-accept"
            type="button"
            className="flex-1 cursor-pointer rounded-xl bg-[#1A9E6B] py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#158A5C]"
          >
            Aceptar todas
          </button>
        </div>
      </div>
      <script id="cookie-consent-runtime" dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
