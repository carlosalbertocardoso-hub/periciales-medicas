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
  title: "Perito Médico en España | Valoración del Daño Corporal – Pablo [PENDIENTE APELLIDO]",
  description:
    "Informe pericial médico independiente en toda España. Valoración de lesiones, accidentes de tráfico, laborales y negligencias médicas.",
  keywords: [
    "perito médico España",
    "peritaje médico independiente",
    "valoración daño corporal",
    "informe pericial médico",
    "perito accidente tráfico",
    "perito negligencia médica",
    "valoración secuelas",
    "médico perito judicial",
    "perito médico Sevilla",
    "perito médico Madrid",
    "perito médico Barcelona",
  ],
  authors: [{ name: "Pablo [PENDIENTE APELLIDO]" }],
  creator: "Pablo [PENDIENTE APELLIDO]",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://[PENDIENTE DOMINIO]",
    siteName: "Perito Médico España",
    title: "Perito Médico en España | Valoración del Daño Corporal Independiente",
    description:
      "Informe pericial médico independiente en toda España. Valoración de lesiones, accidentes de tráfico, laborales y negligencias médicas.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Perito Médico España – Pablo [PENDIENTE APELLIDO]",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Perito Médico en España | Valoración del Daño Corporal",
    description:
      "Informe pericial médico independiente en toda España. Valoración de lesiones, accidentes de tráfico y daño corporal.",
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
    canonical: "https://[PENDIENTE DOMINIO]",
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
