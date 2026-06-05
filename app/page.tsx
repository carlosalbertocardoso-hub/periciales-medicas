import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Hero } from "@/components/sections/Hero";
import { TrustStats } from "@/components/sections/TrustStats";
import { ProblemaSolucion } from "@/components/sections/ProblemaSolucion";
import { Servicios } from "@/components/sections/Servicios";
import { SobrePablo } from "@/components/sections/SobrePablo";
import { Proceso } from "@/components/sections/Proceso";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { Testimonios } from "@/components/sections/Testimonios";
import { Formulario } from "@/components/sections/Formulario";
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
        <SobrePablo />
        <Proceso />
        <TrustSignals />
        <Testimonios />
        <Formulario />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
