import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { ServicePage, type ServicePageData } from "@/components/templates/ServicePage";

export const metadata: Metadata = {
  title: "Informes Periciales Médicos | Perito Médico Independiente España",
  description:
    "Elaboración de informes periciales médicos con validez legal en toda España. Rigor científico, claridad expositiva y ratificación judicial. Contacto por email o formulario.",
  alternates: { canonical: "/informes-periciales" },
  openGraph: {
    title: "Informes Periciales Médicos | Perito Médico Independiente",
    description: "Informes periciales médicos con validez legal en toda España. Elaborados por perito médico colegiado con experiencia en ratificación judicial.",
    url: "/informes-periciales",
  },
};

const data: ServicePageData = {
  slug: "informes-periciales",
  title: "Informes Periciales Médicos",
  metaTitle: "Informes Periciales Médicos | Perito Médico Independiente España",
  metaDesc: "Elaboración de informes periciales médicos con validez legal en toda España. Rigor científico y ratificación judicial. Contacto por email o formulario.",
  badge: "Informes periciales",
  icon: FileText,
  heroSubtitle:
    "Un informe pericial médico es el documento técnico que acredita y cuantifica el daño ante jueces, tribunales y aseguradoras. Su rigor determina el resultado de la reclamación.",
  heroPoints: [
    "Elaborado por médico colegiado con experiencia pericial",
    "Estructura y contenido exigidos por los tribunales",
    "Lenguaje técnico comprensible para el juez",
    "Defensa del informe en sede judicial",
  ],
  intro:
    "El informe pericial médico es el documento técnico mediante el cual el perito comunica sus conclusiones al tribunal o a las partes en un conflicto. Su estructura y claridad determinan cómo lo valora el juez.",
  sections: [
    {
      heading: "¿Qué debe contener un informe pericial médico?",
      body: "Un informe pericial médico completo incluye: identificación del perito y sus credenciales, objeto del informe y encargo recibido, metodología empleada, antecedentes del caso y documentación analizada, exploración clínica y hallazgos, razonamiento técnico, conclusiones motivadas y firma con número de colegiado. Esta estructura garantiza su admisibilidad ante cualquier tribunal español.",
    },
    {
      heading: "Tipos de informes periciales médicos que elaboramos",
      body: "Elaboramos informes para accidentes de tráfico, accidentes laborales, negligencias médicas, valoración de secuelas, responsabilidad civil, seguros de vida y accidentes, incapacidades laborales, procesos de familia con daño físico relevante y cualquier otro supuesto que requiera valoración médica pericial.",
    },
    {
      heading: "La ratificación judicial",
      body: "En los procesos judiciales, el perito puede ser llamado a ratificar su informe en la vista oral y a responder las preguntas de las partes y el juez. Un perito que domina el contenido de su informe y sabe defenderlo con rigor tiene un impacto directo en el resultado del proceso.",
    },
    {
      heading: "Informe pericial vs. informe médico: diferencias",
      body: "Un informe médico lo emite el médico tratante y describe la evolución clínica del paciente. Un informe pericial lo emite un perito independiente con metodología forense, aplicando baremos legales y con orientación hacia las conclusiones que el proceso judicial requiere. No son intercambiables: los tribunales exigen el informe pericial.",
    },
  ],
  checklist: [
    "Estructura conforme a los requisitos procesales",
    "Revisión de toda la documentación médica disponible",
    "Exploración clínica cuando el caso lo requiere",
    "Conclusiones técnicas claras y motivadas",
    "Firma de médico colegiado con número de colegiado",
    "Ratificación ante el tribunal si el proceso lo requiere",
  ],
  relatedLinks: [
    { href: "/negligencias-medicas", label: "Negligencias médicas" },
  ],
  faqs: [
    {
      q: "¿Puede mi médico de cabecera hacer el informe pericial?",
      a: "Tu médico de cabecera puede emitir un informe clínico, pero no un informe pericial en sentido técnico. El informe pericial requiere metodología forense, conocimiento de los baremos legales, independencia respecto al paciente y estructura específica para ser admitido y valorado por los tribunales.",
    },
    {
      q: "¿Cuánto tarda en elaborarse el informe?",
      a: "El plazo habitual es de 7 a 15 días hábiles desde la realización de la exploración y la recepción de toda la documentación. En casos urgentes podemos acelerar el proceso. El plazo exacto se acuerda al inicio del encargo.",
    },
    {
      q: "¿El informe pericial sirve también para negociación extrajudicial?",
      a: "Sí, y es muy frecuente. Un buen informe pericial es una herramienta de negociación muy eficaz: con él sobre la mesa, muchas aseguradoras prefieren llegar a un acuerdo mejor que arriesgarse a un juicio con prueba pericial sólida de la otra parte.",
    },
    {
      q: "¿Qué ocurre si la otra parte también tiene su propio informe pericial?",
      a: "En ese caso el juez tiene dos informes contradictorios y debe valorar cuál es más riguroso y convincente. La calidad del informe (su metodología, la solidez del razonamiento y la capacidad del perito para defenderlo en la ratificación) es decisiva.",
    },
  ],
};

export default function Page() {
  return <ServicePage data={data} />;
}
