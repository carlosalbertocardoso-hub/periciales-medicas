import type { Metadata } from "next";
import { EB_Garamond, Lato } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/analytics/CookieBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPersonSchema, buildLocalBusinessSchema } from "@/lib/schemas";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// El contenedor de producción se fija aquí para impedir que una variable de
// entorno antigua vuelva a inyectar otro GTM distinto al auditado.
const GTM_ID = "GTM-KMJ6W8VF";

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pericialesmedicas.es"),
  title: "Médico Perito en España | Negligencias Médicas – Dr. Rodríguez de Tembleque",
  description:
    "Perito médico especialista en mala praxis médica asistencial. Informes periciales independientes con validez judicial en toda España. Valoración inicial gratuita.",
  keywords: [
    "perito médico España",
    "negligencia médica informe pericial",
    "mala praxis médica",
    "perito médico independiente",
    "informe pericial médico",
    "perito negligencia médica",
    "médico perito judicial",
    "valoración mala praxis",
    "perito médico Córdoba",
    "perito médico Sevilla",
  ],
  authors: [{ name: "Pablo Rodríguez de Tembleque Relaño" }],
  creator: "Pablo Rodríguez de Tembleque Relaño",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://pericialesmedicas.es",
    siteName: "Médico Perito España – Dr. Rodríguez de Tembleque",
    title: "Médico Perito Especialista en Negligencias Médicas | Toda España",
    description:
      "Médico perito especialista en mala praxis médica asistencial. Informes periciales independientes con validez judicial en toda España.",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 800,
        alt: "Médico perito especialista en negligencias médicas – Dr. Rodríguez de Tembleque",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Perito Médico Especialista en Negligencias Médicas | Toda España",
    description:
      "Perito médico especialista en mala praxis médica asistencial. Valoración inicial gratuita con respuesta en menos de 24 horas.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://pericialesmedicas.es",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = buildPersonSchema();
  const localBusinessSchema = buildLocalBusinessSchema();

  return (
    <html lang="es" className={`${ebGaramond.variable} ${lato.variable} h-full scroll-smooth`}>
      <head>
        <JsonLd data={[personSchema, localBusinessSchema]} />
        {/* Preconnect: cuando GTM/GA4 arranquen (diferido más abajo), el
            handshake TLS con estos dominios ya está caliente -- reduce la
            latencia real de esas peticiones, no solo percibida. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <script
          id="consent-default"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:2000,region:['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB']});gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});`,
          }}
        />
        <script
          id="consent-restore"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=JSON.parse(localStorage.getItem('cookie_consent'));if(s)gtag('consent','update',{analytics_storage:s.analytics?'granted':'denied',ad_storage:s.marketing?'granted':'denied',ad_user_data:s.marketing?'granted':'denied',ad_personalization:s.marketing?'granted':'denied'});}catch(e){}})();`,
          }}
        />
        {/* GTM diferido hasta la primera interacción real (o 4s de fallback
            para visitantes pasivos) -- GTM/GA4 no son críticos para el
            primer render y hoy dominan LCP/TBT/tiempo de arranque de JS
            (Lighthouse real: ~180KB entre gtm.js+gtag.js, 40-51% sin usar en
            el primer render). Los eventos empujados a dataLayer antes de que
            GTM cargue (consent-default/consent-restore de arriba, o
            form_submitted si el usuario envía el form muy rápido) se
            encolan solos -- GTM los procesa en orden en cuanto arranca, no
            se pierde nada. NO afecta el timing consent-default/
            consent-restore -> gtm.js documentado arriba: esos dos scripts
            siguen corriendo inmediatos, solo se retrasa la inyección del
            propio gtm.js. */}
        <script
          id="gtm-init"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){function load(){if(w.__gtmLoaded)return;w.__gtmLoaded=true;w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);}['mousemove','touchstart','scroll','keydown'].forEach(function(ev){w.addEventListener(ev,load,{once:true,passive:true});});setTimeout(load,4000);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0" width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <noscript>
          <style>{`.fade-up,.fade-in{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
