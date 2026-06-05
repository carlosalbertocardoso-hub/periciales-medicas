import type { Metadata } from "next";
import { Stethoscope } from "lucide-react";
import { ServicePage, type ServicePageData } from "@/components/templates/ServicePage";

export const metadata: Metadata = {
  title: "Perito Médico Negligencias Médicas | Informe Pericial Independiente",
  description:
    "Perito médico independiente para negligencias médicas en España. Análisis de la lex artis, errores de diagnóstico, tratamiento y seguimiento. Consulta gratuita.",
  alternates: { canonical: "https://[PENDIENTE DOMINIO]/negligencias-medicas" },
  openGraph: {
    title: "Perito Médico Negligencias Médicas | Informe Independiente",
    description: "Valoración médica independiente de posibles negligencias médicas. Análisis de la lex artis y el daño derivado. Informe pericial con validez legal.",
    url: "https://[PENDIENTE DOMINIO]/negligencias-medicas",
  },
};

const data: ServicePageData = {
  slug: "negligencias-medicas",
  title: "Perito Médico para Negligencias Médicas",
  metaTitle: "Perito Médico Negligencias Médicas | Informe Pericial Independiente",
  metaDesc: "Perito médico independiente para negligencias médicas en España. Análisis de la lex artis y el daño derivado. Consulta gratuita.",
  badge: "Negligencias médicas",
  icon: Stethoscope,
  heroSubtitle:
    "Si sospechas que el médico o el centro sanitario cometió un error, necesitas a alguien que pueda demostrarlo o descartarlo con criterio técnico. Analizo tu historia clínica, evalúo la lex artis y emito un informe independiente sin ningún vínculo con el sistema sanitario reclamado.",
  heroPoints: [
    "Análisis técnico de la lex artis médica",
    "Errores de diagnóstico, tratamiento y seguimiento",
    "Informe válido para reclamación judicial",
    "Toda España, consulta confidencial",
  ],
  intro:
    "Una negligencia médica es el incumplimiento de la lex artis, el conjunto de normas y técnicas que rigen la práctica médica correcta. Para demostrarlo ante un tribunal se necesita un perito independiente que analice la historia clínica, los protocolos seguidos y el daño causado al paciente.",
  sections: [
    {
      heading: "¿Qué se considera negligencia médica?",
      body: "Un resultado adverso no implica necesariamente mala praxis: la medicina no garantiza la curación. Para que exista responsabilidad médica deben concurrir tres elementos: una actuación por debajo del estándar exigible (la lex artis), un daño real y una relación de causalidad entre ambos. Los errores más frecuentes son diagnósticos tardíos o erróneos, procedimientos incorrectos, ausencia de consentimiento informado y complicaciones que una actuación diligente habría evitado.",
    },
    {
      heading: "Qué analiza el informe pericial médico",
      body: "El perito revisa la historia clínica completa, los protocolos aplicados, la literatura científica vigente y los registros de enfermería. Evalúa si la actuación médica se ajustó a los estándares exigibles en ese momento y contexto, si hubo un error con consecuencias reales y cuánto daño se derivó de él. Cuando procede, cuantifica las secuelas físicas, psicológicas y el daño moral.",
    },
    {
      heading: "¿Cuándo debo solicitar una valoración?",
      body: "Si sospechas que el daño que sufriste no era el resultado esperable de tu patología sino de una mala praxis, pide una consulta inicial. Cuanto antes, mejor se preservan las pruebas. Los plazos de prescripción son de 1 año en vía penal y 4 años en vía civil, y no se pueden recuperar una vez vencidos.",
    },
    {
      heading: "Proceso de reclamación por negligencia médica",
      body: "La reclamación puede seguir vía extrajudicial (reclamación patrimonial a la administración si es sanidad pública, o a la aseguradora si es privada) o vía judicial civil o penal. En ambas vías el informe pericial médico independiente es la prueba técnica central. El perito puede ratificarlo ante el tribunal si el proceso lo requiere.",
    },
  ],
  checklist: [
    "Revisión exhaustiva de la historia clínica",
    "Análisis de la lex artis y protocolos aplicados",
    "Evaluación del consentimiento informado",
    "Relación de causalidad entre actuación y daño",
    "Cuantificación de secuelas físicas y psicológicas",
    "Ratificación ante tribunal si procede",
  ],
  relatedLinks: [
    { href: "/valoracion-secuelas", label: "Valoración de secuelas" },
    { href: "/informes-periciales", label: "Informes periciales médicos" },
    { href: "/valoracion-dano-corporal", label: "Valoración del daño corporal" },
    { href: "/peritaje-accidentes-trafico", label: "Accidentes de tráfico" },
    { href: "/accidentes-laborales", label: "Accidentes laborales" },
  ],
  faqs: [
    {
      q: "¿Cómo sé si lo que me ocurrió fue una negligencia médica?",
      a: "No siempre es evidente. Un resultado adverso no implica necesariamente mala praxis. La forma de saberlo es mediante una valoración pericial que analice si la actuación médica fue la correcta. En la consulta inicial, sin compromiso, analizamos los hechos y te orientamos.",
    },
    {
      q: "¿Puedo reclamar aunque haya pasado mucho tiempo desde la intervención?",
      a: "Depende de los plazos de prescripción. En vía civil son 4 años desde que conociste el daño. En vía penal, 1 año. Es importante actuar pronto. Si tienes dudas sobre si ha prescrito, consúltanos.",
    },
    {
      q: "¿El informe pericial de parte tiene validez si la sanidad era pública?",
      a: "Sí. En reclamaciones frente a la sanidad pública (vía responsabilidad patrimonial de la Administración) el informe pericial privado es igualmente válido y necesario para sustentar técnicamente la reclamación.",
    },
    {
      q: "¿Es necesario tener abogado para reclamar por negligencia médica?",
      a: "Para la vía judicial sí es necesario abogado y procurador. Para la vía extrajudicial no es obligatorio, aunque sí recomendable. El informe pericial es el documento técnico que fundamenta la reclamación; el abogado lo utiliza en el procedimiento legal.",
    },
  ],
};

export default function Page() {
  return <ServicePage data={data} />;
}
