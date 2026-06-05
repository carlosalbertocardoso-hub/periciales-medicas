export function JsonLd() {
  const baseUrl = "https://[PENDIENTE DOMINIO]";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Pablo [PENDIENTE APELLIDO]",
    jobTitle: "Perito Médico",
    description:
      "Médico colegiado especializado en valoración del daño corporal y peritaje médico-legal en toda España.",
    url: baseUrl,
    telephone: "[PENDIENTE]",
    email: "[PENDIENTE]",
    areaServed: {
      "@type": "Country",
      name: "España",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      description: "Médico colegiado nº [PENDIENTE]",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Pablo [PENDIENTE] – Perito Médico",
    description:
      "Informes periciales médicos independientes para la valoración del daño corporal, accidentes de tráfico, accidentes laborales y negligencias médicas en toda España.",
    url: baseUrl,
    telephone: "[PENDIENTE]",
    email: "[PENDIENTE]",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sevilla",
      addressRegion: "Andalucía",
      addressCountry: "ES",
    },
    areaServed: {
      "@type": "Country",
      name: "España",
    },
    priceRange: "Consultar",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "[PENDIENTE]",
      closes: "[PENDIENTE]",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Qué es un perito médico y para qué sirve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Un perito médico es un médico especializado en valoración del daño corporal que emite informes periciales con validez legal para procedimientos judiciales, extrajudiciales o negociaciones con aseguradoras.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuándo necesito contratar un perito médico independiente?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cuando hayas sufrido lesiones en un accidente de tráfico o laboral, una posible negligencia médica, o cuando la indemnización ofrecida no se corresponda con la gravedad real de tus lesiones y/o secuelas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Podéis atender casos de toda España?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Atendemos casos en toda España, con valoración presencial o por videoconsulta según la naturaleza del caso.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuál es el coste del informe pericial?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El presupuesto depende del tipo de caso y complejidad. Puedes enviar tu documentación a través del formulario de contacto para recibir una valoración inicial.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: baseUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
