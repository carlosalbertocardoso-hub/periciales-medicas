import type { Metadata } from "next";
import { EB_Garamond, Lato } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/analytics/Analytics";
import { CookieBanner } from "@/components/analytics/CookieBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPersonSchema, buildLocalBusinessSchema } from "@/lib/schemas";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <noscript>
          <style>{`.fade-up,.fade-in{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <Analytics />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
