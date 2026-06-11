import type { Metadata } from "next";
import { EB_Garamond, Lato } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/analytics/Analytics";
import { CookieBanner } from "@/components/analytics/CookieBanner";

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
  title: "Perito Médico en España | Negligencias Médicas – Pablo Rodriguez de Tembleque Relaño",
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
  authors: [{ name: "Pablo Rodriguez de Tembleque Relaño" }],
  creator: "Pablo Rodriguez de Tembleque Relaño",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://pericialmedica.com",
    siteName: "Perito Médico España – Pablo Rodriguez de Tembleque",
    title: "Perito Médico Especialista en Negligencias Médicas | Toda España",
    description:
      "Perito médico especialista en mala praxis médica asistencial. Informes periciales independientes con validez judicial en toda España.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Perito Médico España – Pablo Rodriguez de Tembleque Relaño",
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
    canonical: "https://pericialmedica.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${ebGaramond.variable} ${lato.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col antialiased">
        <Analytics />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
