import type { Metadata } from "next";
import { HardHat } from "lucide-react";
import { ServicePage, type ServicePageData } from "@/components/templates/ServicePage";

export const metadata: Metadata = {
  title: "Perito Médico Accidentes Laborales | Valoración Independiente del Daño",
  description:
    "Perito médico independiente para accidentes de trabajo en España. Valoración de lesiones, incapacidad y secuelas. Reclamación frente a mutuas y aseguradoras. Contacto por email o formulario.",
  alternates: { canonical: "https://[PENDIENTE DOMINIO]/accidentes-laborales" },
  openGraph: {
    title: "Perito Médico Accidentes Laborales | Valoración Independiente",
    description: "Valoración médica independiente de lesiones por accidente laboral. Informe pericial para reclamación frente a mutuas y aseguradoras.",
    url: "https://[PENDIENTE DOMINIO]/accidentes-laborales",
  },
};

const data: ServicePageData = {
  slug: "accidentes-laborales",
  title: "Perito Médico para Accidentes Laborales",
  metaTitle: "Perito Médico Accidentes Laborales | Valoración Independiente del Daño",
  metaDesc: "Perito médico independiente para accidentes de trabajo en España. Valoración de lesiones, incapacidad y secuelas. Contacto por email o formulario.",
  badge: "Accidentes laborales",
  icon: HardHat,
  heroSubtitle:
    "Un accidente de trabajo puede afectar tu capacidad laboral de por vida. La valoración médica independiente garantiza que ni la mutua ni la empresa condicionen el resultado.",
  heroPoints: [
    "Valoración de incapacidad temporal y permanente",
    "Independencia total frente a mutuas y empresas",
    "Informe válido para INSS, juzgados y mutuas",
    "Toda España, presencial o videoconsulta",
  ],
  intro:
    "Un accidente laboral abre reclamaciones en varios frentes: prestaciones de la Seguridad Social, recargo por falta de medidas de seguridad e indemnizaciones civiles adicionales. En todos ellos, la valoración médica pericial independiente es la base técnica para defender tus derechos.",
  sections: [
    {
      heading: "¿Qué es un accidente laboral según la ley española?",
      body: "El accidente de trabajo es toda lesión corporal que sufre el trabajador con ocasión o por consecuencia del trabajo. También se incluyen los accidentes in itinere (en el trayecto al trabajo o de vuelta), los ocurridos en misión y las enfermedades contraídas como consecuencia directa del trabajo. La calificación como accidente laboral determina las prestaciones a las que tiene derecho el trabajador.",
    },
    {
      heading: "Papel del perito médico en accidentes de trabajo",
      body: "El perito médico analiza las lesiones producidas, su relación causal con el accidente, el grado de incapacidad funcional y las secuelas permanentes. Su informe es decisivo cuando hay discrepancia con la valoración de la mutua o del INSS, o cuando se reclama una indemnización adicional por daños frente al empresario o su aseguradora.",
    },
    {
      heading: "¿Cuándo necesito un perito médico en un accidente laboral?",
      body: "Cuando la mutua te da el alta y no estás recuperado. Cuando el INSS reconoce un grado de incapacidad inferior al real. Cuando la oferta de indemnización de la empresa o su aseguradora no refleja el alcance real de las lesiones. También cuando se tramita un recargo de prestaciones por infracción de medidas de seguridad.",
    },
    {
      heading: "Recargo de prestaciones y responsabilidad civil adicional",
      body: "Si el accidente se produjo por incumplimiento de medidas de seguridad, el trabajador tiene derecho a un recargo del 30% al 50% sobre las prestaciones de la Seguridad Social. Puede existir además responsabilidad civil del empresario, reclamable por separado. En ambos casos, el informe pericial médico acredita el daño y su cuantificación.",
    },
  ],
  checklist: [
    "Análisis de la historia clínica laboral y de urgencias",
    "Valoración de lesiones temporales e incapacidad",
    "Cuantificación de secuelas permanentes",
    "Evaluación del grado de incapacidad funcional",
    "Informe válido ante el INSS, mutua y juzgado social",
    "Ratificación en juicio si es necesario",
  ],
  relatedLinks: [
    { href: "/valoracion-secuelas", label: "Valoración de secuelas" },
    { href: "/valoracion-dano-corporal", label: "Valoración del daño corporal" },
    { href: "/informes-periciales", label: "Informes periciales médicos" },
    { href: "/peritaje-accidentes-trafico", label: "Accidentes de tráfico" },
    { href: "/negligencias-medicas", label: "Negligencias médicas" },
  ],
  faqs: [
    {
      q: "¿Puedo impugnar el alta médica que me ha dado la mutua?",
      a: "Sí. Si consideras que no estás en condiciones de reincorporarte al trabajo, puedes impugnar el alta ante el INSS y en vía judicial. Un informe pericial independiente que acredite que las lesiones no están resueltas es la base técnica de esa impugnación.",
    },
    {
      q: "¿Qué diferencia hay entre la incapacidad laboral de la Seguridad Social y la valoración pericial?",
      a: "La Seguridad Social evalúa la incapacidad para trabajar según criterios administrativos propios. La valoración pericial independiente evalúa el daño real, incluyendo secuelas funcionales, estéticas y psicológicas, que pueden ser base de una indemnización adicional en vía civil independientemente de la prestación reconocida.",
    },
    {
      q: "¿El informe pericial es útil también para el recargo de prestaciones?",
      a: "Sí. El recargo de prestaciones por infracción de medidas de seguridad se tramita ante la Inspección de Trabajo y ante el INSS. Un informe pericial que acredite la gravedad de las lesiones y su relación con el incumplimiento de la normativa refuerza significativamente la reclamación.",
    },
    {
      q: "¿Puedo reclamar aunque hayan pasado varios meses desde el accidente?",
      a: "Los plazos de prescripción para reclamar indemnizaciones adicionales son de 1 año en vía penal y hasta 4 años en vía civil. Para impugnar el alta médica de la mutua los plazos son más breves. Consulta tu caso lo antes posible.",
    },
  ],
};

export default function Page() {
  return <ServicePage data={data} />;
}
