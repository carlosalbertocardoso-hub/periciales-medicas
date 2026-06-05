import type { Metadata } from "next";
import { Car } from "lucide-react";
import { ServicePage, type ServicePageData } from "@/components/templates/ServicePage";

export const metadata: Metadata = {
  title: "Perito Médico Accidentes de Tráfico | Informe Pericial Independiente",
  description:
    "Perito médico independiente para accidentes de tráfico en toda España. Valoración del daño corporal, lesiones y secuelas ajustadas al Baremo de Tráfico. Consulta gratuita.",
  alternates: { canonical: "https://[PENDIENTE DOMINIO]/peritaje-accidentes-trafico" },
  openGraph: {
    title: "Perito Médico Accidentes de Tráfico | Informe Independiente",
    description: "Valoración médica independiente de lesiones y secuelas por accidente de tráfico. Informe pericial con validez legal en toda España.",
    url: "https://[PENDIENTE DOMINIO]/peritaje-accidentes-trafico",
  },
};

const data: ServicePageData = {
  slug: "peritaje-accidentes-trafico",
  title: "Perito Médico para Accidentes de Tráfico",
  metaTitle: "Perito Médico Accidentes de Tráfico | Informe Pericial Independiente",
  metaDesc: "Perito médico independiente para accidentes de tráfico en toda España. Valoración del daño corporal ajustada al Baremo. Consulta gratuita.",
  badge: "Accidentes de tráfico",
  icon: Car,
  heroSubtitle:
    "La aseguradora ya tiene a su médico trabajando en tu caso. Un informe pericial independiente puede ser la diferencia entre una indemnización justa y aceptar lo que te ofrecen.",
  heroPoints: [
    "Valoración ajustada al Baremo de Tráfico vigente",
    "Informe válido para negociación y juicio",
    "Toda España, presencial o videoconsulta",
    "Consulta inicial gratuita",
  ],
  intro:
    "Después de un accidente de tráfico, la aseguradora ya tiene a su médico trabajando. Un perito independiente evalúa tus lesiones y secuelas sin ningún vínculo con las compañías de seguros.",
  sections: [
    {
      heading: "¿Por qué necesitas un perito médico en un accidente de tráfico?",
      body: "El sistema de valoración de daños en accidentes de tráfico en España se rige por el Baremo de Tráfico (Real Decreto Legislativo 8/2004, reformado en 2016). El baremo asigna puntos a lesiones temporales, secuelas permanentes y daños morales. La aplicación correcta es técnica y tiene consecuencias económicas directas: unos pocos puntos de diferencia pueden suponer miles de euros en la indemnización.",
    },
    {
      heading: "Qué valora el perito médico en estos casos",
      body: "El informe analiza el período de incapacidad temporal (días impeditivos y no impeditivos), las secuelas permanentes con su puntuación baremos, el perjuicio estético, las lesiones psicológicas derivadas del accidente y la relación de causalidad entre el siniestro y el daño. También revisamos la documentación médica para detectar lesiones no diagnosticadas o infravaloradas.",
    },
    {
      heading: "¿Cuándo debo contratar un perito médico independiente?",
      body: "Lo antes posible tras el alta médica, y siempre antes de firmar cualquier acuerdo con la aseguradora. Una vez firmado el finiquito, reclamar más es muy difícil. Si ya tienes una oferta que no te convence, un segundo informe puede cuestionarla técnicamente. Si el caso va a juicio, el informe pericial es la prueba médica sobre la que descansa la reclamación.",
    },
    {
      heading: "El proceso: de la consulta al informe",
      body: "Empieza con una consulta inicial gratuita para valorar tu caso. Si procede, realizamos la exploración clínica y revisamos la documentación médica disponible. Entregamos el informe en el plazo acordado. Si el proceso llega a juicio oral, ratificamos el informe ante el tribunal como perito de parte.",
    },
  ],
  checklist: [
    "Análisis completo de documentación médica",
    "Exploración clínica presencial o por videoconsulta",
    "Valoración según el Baremo de Tráfico vigente",
    "Informe pericial con validez legal plena",
    "Cuantificación de días impeditivos y secuelas",
    "Ratificación judicial si el caso llega a juicio",
  ],
  relatedLinks: [
    { href: "/valoracion-secuelas", label: "Valoración de secuelas" },
    { href: "/valoracion-dano-corporal", label: "Valoración del daño corporal" },
    { href: "/informes-periciales", label: "Informes periciales médicos" },
    { href: "/accidentes-laborales", label: "Accidentes laborales" },
    { href: "/negligencias-medicas", label: "Negligencias médicas" },
  ],
  faqs: [
    {
      q: "¿Puedo solicitar un perito médico si ya he aceptado la oferta de la aseguradora?",
      a: "Si ya has firmado la aceptación de la oferta o el finiquito, la reclamación es muy complicada. Por eso es fundamental obtener el informe pericial antes de firmar cualquier documento. Si no has firmado todavía, estás a tiempo de actuar.",
    },
    {
      q: "¿El informe pericial de parte tiene el mismo valor que el de la aseguradora?",
      a: "Sí. Ambos son informes periciales de parte y tienen el mismo valor legal ante un tribunal. El juez valorará su contenido técnico y la solidez de los argumentos. Un buen informe independiente frecuentemente rebate las conclusiones del médico de la aseguradora.",
    },
    {
      q: "¿Qué ocurre si hay secuelas que no aparecen en mi historial médico?",
      a: "Es uno de los casos más habituales. La exploración clínica independiente puede detectar secuelas funcionales no recogidas en el historial. El perito médico las documenta, las relaciona con el accidente y las incorpora al informe con el sustento técnico necesario.",
    },
    {
      q: "¿Cuánto tarda el informe pericial de un accidente de tráfico?",
      a: "El plazo habitual es de 7 a 15 días hábiles desde la exploración, dependiendo de la complejidad del caso y la documentación disponible. En casos urgentes podemos acelerar el proceso.",
    },
  ],
};

export default function Page() {
  return <ServicePage data={data} />;
}
