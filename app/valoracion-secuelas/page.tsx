import type { Metadata } from "next";
import { Activity } from "lucide-react";
import { ServicePage, type ServicePageData } from "@/components/templates/ServicePage";

export const metadata: Metadata = {
  title: "Valoración de Secuelas | Perito Médico Independiente España",
  description:
    "Valoración médica independiente de secuelas permanentes por accidente o enfermedad en toda España. Cuantificación según baremos oficiales para indemnización justa. Consulta gratuita.",
  alternates: { canonical: "https://[PENDIENTE DOMINIO]/valoracion-secuelas" },
  openGraph: {
    title: "Valoración de Secuelas | Perito Médico Independiente",
    description: "Cuantificación objetiva de secuelas permanentes mediante criterios médico-legales. Informe pericial para indemnización justa.",
    url: "https://[PENDIENTE DOMINIO]/valoracion-secuelas",
  },
};

const data: ServicePageData = {
  slug: "valoracion-secuelas",
  title: "Valoración de Secuelas Permanentes",
  metaTitle: "Valoración de Secuelas | Perito Médico Independiente España",
  metaDesc: "Valoración médica independiente de secuelas permanentes en toda España. Cuantificación según baremos para indemnización justa. Consulta gratuita.",
  badge: "Valoración de secuelas",
  icon: Activity,
  heroSubtitle:
    "Las secuelas permanentes condicionan tu vida a largo plazo. Su valoración correcta determina el importe de la indemnización que te corresponde, y una infravaloración temprana es difícil de corregir después.",
  heroPoints: [
    "Cuantificación según baremos médico-legales vigentes",
    "Secuelas funcionales, estéticas y psicológicas",
    "Informe válido para cualquier procedimiento legal",
    "Toda España, presencial o videoconsulta",
  ],
  intro:
    "Una secuela es la lesión o alteración funcional permanente que persiste tras la estabilización médica. Valorarla correctamente requiere conocimiento médico especializado y dominio de los baremos legales. Una infravaloración puede suponer una pérdida económica importante que, una vez firmado el finiquito, es muy difícil de recuperar.",
  sections: [
    {
      heading: "¿Qué son las secuelas y cómo se valoran?",
      body: "Las secuelas son las consecuencias permanentes de una lesión, una vez que el estado de salud se ha estabilizado y no cabe esperar mejoría con tratamiento. Se valoran mediante baremos específicos: el Baremo de Tráfico para accidentes de circulación, o el sistema de la Seguridad Social para contingencias laborales. Cada baremo asigna puntos según la naturaleza y gravedad funcional de la secuela.",
    },
    {
      heading: "Tipos de secuelas que se valoran",
      body: "Las secuelas pueden ser orgánicas y funcionales (limitación de movilidad, dolor crónico, déficits neurológicos), psicológicas (trastorno de estrés postraumático, ansiedad, depresión reactiva) o estéticas (cicatrices, deformidades). También existe el perjuicio de calidad de vida cuando el accidente impide actividades que la persona realizaba antes. Cada tipo tiene su valoración específica en los baremos.",
    },
    {
      heading: "Por qué conviene valorarlas antes de firmar",
      body: "Muchas personas aceptan la valoración de la aseguradora sin saber que hay secuelas no diagnosticadas o infravaloradas. Una vez firmado el finiquito, la reclamación se cierra. Un informe pericial independiente antes de firmar cualquier acuerdo es la única forma de evitar esa pérdida.",
    },
    {
      heading: "Secuelas psicológicas: el daño que no se ve",
      body: "El daño psicológico derivado de un accidente (fobia a conducir, trastornos del sueño, estrés postraumático) es tan real como el físico y tiene reconocimiento explícito en los baremos. Aun así, con frecuencia no se diagnostica ni se valora. El perito médico puede derivar para evaluación psicológica especializada e incorporar ese daño al informe.",
    },
  ],
  checklist: [
    "Exploración clínica completa de todas las secuelas",
    "Aplicación de los baremos médico-legales vigentes",
    "Valoración de secuelas físicas, estéticas y psicológicas",
    "Documentación del perjuicio de calidad de vida",
    "Informe pericial con validez legal plena",
    "Ratificación en juicio o negociación extrajudicial",
  ],
  relatedLinks: [
    { href: "/peritaje-accidentes-trafico", label: "Accidentes de tráfico" },
    { href: "/accidentes-laborales", label: "Accidentes laborales" },
    { href: "/valoracion-dano-corporal", label: "Valoración del daño corporal" },
    { href: "/negligencias-medicas", label: "Negligencias médicas" },
    { href: "/informes-periciales", label: "Informes periciales médicos" },
  ],
  faqs: [
    {
      q: "¿Cuándo se pueden valorar las secuelas definitivamente?",
      a: "Las secuelas se valoran una vez alcanzada la estabilización lesional, es decir, cuando el estado de salud ya no va a mejorar significativamente con más tratamiento. En la práctica, suele ser tras el alta médica definitiva, aunque en casos graves puede tardar más de un año.",
    },
    {
      q: "¿Qué diferencia hay entre los puntos del baremo y el importe de la indemnización?",
      a: "El baremo asigna puntos a cada secuela. Esos puntos se convierten en euros según tablas que varían con la edad de la víctima y se actualizan anualmente. La conversión es técnica y es precisamente donde pueden darse diferencias importantes entre la oferta de la aseguradora y lo que realmente corresponde.",
    },
    {
      q: "¿Se pueden valorar secuelas de hace años?",
      a: "Sí, siempre que no hayan prescrito los plazos de reclamación y se conserve documentación médica del accidente o enfermedad que los originó. La valoración es posible aunque haya tiempo transcurrido, aunque es más sencilla cuando se cuenta con documentación reciente.",
    },
    {
      q: "¿Las secuelas psicológicas tienen el mismo valor legal que las físicas?",
      a: "Sí. Los baremos reconocen explícitamente el daño psicológico. El Baremo de Tráfico, por ejemplo, incluye el trastorno de estrés postraumático y otros daños psíquicos como secuelas valorables con puntuación propia.",
    },
  ],
};

export default function Page() {
  return <ServicePage data={data} />;
}
