export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "cookie_consent";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim();
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID?.trim();

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveConsent(state: ConsentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function pushConsentToGTM(state: ConsentState) {
  if (typeof window === "undefined") return;
  // Consent Mode v2
  window.gtag?.("consent", "update", {
    analytics_storage: state.analytics ? "granted" : "denied",
    ad_storage: state.marketing ? "granted" : "denied",
    ad_user_data: state.marketing ? "granted" : "denied",
    ad_personalization: state.marketing ? "granted" : "denied",
  });
}

export function loadAnalyticsForConsent(state: ConsentState) {
  if (typeof window === "undefined") return;
  if (!state.analytics && !state.marketing) return;

  if (GTM_ID) {
    loadGTM(GTM_ID);
    return;
  }

  if (state.analytics && GA4_ID) {
    loadGA4(GA4_ID);
  }
}

function loadGTM(id: string) {
  if (document.getElementById("gtm-script")) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  const firstScript = document.getElementsByTagName("script")[0];
  const script = document.createElement("script");
  script.id = "gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  firstScript.parentNode?.insertBefore(script, firstScript);
}

function loadGA4(id: string) {
  if (document.getElementById("ga4-script")) return;

  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  script.onload = () => {
    window.gtag?.("js", new Date());
    window.gtag?.("config", id);
  };
  document.head.appendChild(script);
}
