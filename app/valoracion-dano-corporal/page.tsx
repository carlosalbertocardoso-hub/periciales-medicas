import type { Metadata } from "next";
import { Scale } from "lucide-react";
import { ServicePage, type ServicePageData } from "@/components/templates/ServicePage";

export const metadata: Metadata = {
  title: "Valoración del Daño Corporal | Perito Médico Independiente España",
  description:
    "Valoración médico-legal del daño corporal en toda España. Evaluación objetiva de lesiones, incapacidades y secuelas para procedimientos judiciales y extrajudiciales. Consulta gratuita.",
  alternates: { canonical: "https://[PENDIENTE DOMINIO]/valoracion-dano-corporal" },
  openGraph: {
    title: "Valoración del Daño Corporal | Perito Médico Independiente",
    description: "Evaluación médico-legal objetiva del daño corporal para procedimientos judiciales y negociación con aseguradoras. Toda España.",
    url: "https://[PENDIENTE DOMINIO]/valoracion-dano-corporal",
  },
};

const data: ServicePageData = {
  slug: "valoracion-dano-corporal",
  title: "Valoración del Daño Corporal",
  metaTitle: "Valoración del Daño Corporal | Perito Médico Independiente España",
  metaDesc: "Valoración médico-legal del daño corporal en toda España. Evaluación objetiva de lesiones e incapacidades. Consulta gratuita.",
  badge: "Daño corporal",
  icon: Scale,
  heroSubtitle:
    "La valoración del daño corporal determina el alcance real de tus lesiones y su impacto en tu vida. Es la base técnica de cualquier reclamación por lesiones personales.",
  heroPoints: [
    "Metodología médico-legal con validez judicial",
    "Lesiones temporales, secuelas y daño moral",
    "Informe ajustado a los baremos vigentes",
    "Toda España, presencial o videoconsulta",
  ],
  intro:
    "La valoración del daño corporal evalúa de forma sistemática las consecuencias de una lesión sobre la persona: desde el período de curación hasta las secuelas permanentes y el impacto en la calidad de vida. Sobre ella se calcula cualquier indemnización por lesiones personales.",
  sections: [
    {
      heading: "¿Qué comprende la valoración del daño corporal?",
      body: "La valoración incluye el daño emergente (gastos médicos, rehabilitación, adaptaciones), el lucro cesante (pérdida de ingresos durante la incapacidad), el daño moral (sufrimiento, pérdida de calidad de vida), las lesiones temporales (días impeditivos y no impeditivos hasta la estabilización) y las secuelas permanentes. Cada componente se evalúa con criterios médico-legales específicos.",
    },
    {
      heading: "¿Cuándo se aplica la valoración del daño corporal?",
      body: "Se aplica en accidentes de tráfico, accidentes laborales, negligencias médicas, lesiones deportivas con responsabilidad de terceros y agresiones físicas. También en procedimientos de divorcio cuando existe maltrato físico documentado. En cualquier situación en que una persona sufre lesiones por las que puede reclamar una indemnización.",
    },
    {
      heading: "El método: exploración clínica y documentación",
      body: "El perito combina la exploración clínica directa con el análisis de toda la documentación médica disponible: urgencias, partes de lesiones, informes de especialistas, pruebas de imagen, informes de rehabilitación e informes psicológicos. El resultado es una imagen completa y objetiva del daño real sufrido.",
    },
    {
      heading: "Diferencia entre la valoración de la aseguradora y la independiente",
      body: "Los médicos de las aseguradoras trabajan para la compañía y tienen incentivos para minimizar la valoración. Un perito independiente trabaja para ti, sin ningún vínculo con la aseguradora, y su informe refleja exclusivamente la realidad médica del caso. Esta diferencia puede traducirse en miles de euros de indemnización.",
    },
  ],
  checklist: [
    "Exploración clínica completa y documentada",
    "Análisis de toda la documentación médica",
    "Valoración de lesiones temporales y permanentes",
    "Cuantificación del daño moral y la calidad de vida",
    "Aplicación de baremos médico-legales vigentes",
    "Informe con validez en cualquier procedimiento legal",
  ],
  relatedLinks: [
    { href: "/peritaje-accidentes-trafico", label: "Accidentes de tráfico" },
    { href: "/valoracion-secuelas", label: "Valoración de secuelas" },
    { href: "/negligencias-medicas", label: "Negligencias médicas" },
    { href: "/accidentes-laborales", label: "Accidentes laborales" },
    { href: "/informes-periciales", label: "Informes periciales médicos" },
  ],
  faqs: [
    {
      q: "¿Es lo mismo valoración del daño corporal que informe de lesiones?",
      a: "No exactamente. Un informe de lesiones describe las lesiones desde el punto de vista clínico. La valoración del daño corporal va más allá: cuantifica el daño, aplica los baremos legales y establece el nexo causal necesario para la reclamación. Es un informe pericial completo, no solo un informe médico.",
    },
    {
      q: "¿Necesito que me vea el perito en persona?",
      a: "Para una valoración completa, la exploración física directa es lo ideal. No obstante, en casos donde las secuelas son principalmente documentales o psicológicas, puede realizarse por videoconsulta. Lo valoramos caso a caso en la consulta inicial.",
    },
    {
      q: "¿Puedo solicitar la valoración aunque tenga el seguro médico de la aseguradora contraria cubriendo los gastos?",
      a: "Sí. El hecho de que la aseguradora contraria esté pagando tus gastos médicos no te impide contratar un perito médico independiente para valorar el daño. Son cuestiones separadas.",
    },
    {
      q: "¿Qué documentación debo aportar para la valoración?",
      a: "Todos los documentos médicos relacionados con el accidente o lesión: informe de urgencias, informes de hospitalización, pruebas diagnósticas (radiografías, RMN, TAC), informes de seguimiento, partes de alta médica e informes de rehabilitación. Si no tienes alguno, podemos ayudarte a solicitarlos.",
    },
  ],
};

export default function Page() {
  return <ServicePage data={data} />;
}
