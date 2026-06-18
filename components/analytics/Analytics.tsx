import Script from "next/script";

export function Analytics() {
  return (
    <>
      {/* Consent Mode v2 — denegado por defecto hasta que el usuario acepte */}
      <Script id="consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500,
          });
        `}
      </Script>
    </>
  );
}
