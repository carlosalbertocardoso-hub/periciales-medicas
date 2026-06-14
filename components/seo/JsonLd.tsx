export function JsonLd() {
  const baseUrl = "https://pericialmedica.com";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Pablo Rodríguez de Tembleque Relaño",
    jobTitle: "Médico Perito",
    description:
      "Médico especialista en mala praxis médica asistencial. Informes periciales independientes con validez judicial en toda España.",
    url: baseUrl,
    telephone: "+34601539180",
    email: "pablo.rdt.medico@gmail.com",
    areaServed: {
      "@type": "Country",
      name: "España",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      description: "Médico colegiado nº [PENDIENTE] – Colegio de Médicos de Córdoba",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Dr. Rodríguez de Tembleque – Médico Perito",
    description:
      "Especialista en mala praxis médica asistencial. Informes periciales independientes con validez judicial en toda España.",
    url: baseUrl,
    telephone: "+34601539180",
    email: "pablo.rdt.medico@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "C/San Juan de la Cruz, 21",
      addressLocality: "Córdoba",
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
      opens: "09:00",
      closes: "20:00",
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
          text: "Sí. Atiendo casos en toda España por videoconsulta, sin necesidad de desplazamientos.",
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
