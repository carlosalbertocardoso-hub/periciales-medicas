import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatbotGuiado } from "@/components/ui/ChatbotGuiado";
import { Hero } from "@/components/sections/Hero";
import { TrustStats } from "@/components/sections/TrustStats";
import { ProblemaSolucion } from "@/components/sections/ProblemaSolucion";
import { Servicios } from "@/components/sections/Servicios";
import { BloquePuente } from "@/components/sections/BloquePuente";
import { Formulario } from "@/components/sections/Formulario";
import { SobrePablo } from "@/components/sections/SobrePablo";
import { Proceso } from "@/components/sections/Proceso";
import { Testimonios } from "@/components/sections/Testimonios";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { FAQ } from "@/components/sections/FAQ";
import { JsonLd } from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="main-content">
        <Hero />
        <TrustStats />
        <ProblemaSolucion />
        <Servicios />
        <BloquePuente />
        <Formulario />
        <SobrePablo />
        <Proceso />
        <Testimonios />
        <TrustSignals />
        <FAQ />
      </main>
      <Footer />
      <ChatbotGuiado />
    </>
  );
}
