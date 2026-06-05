export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "cookie_consent";

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
