const baseUrl = "https://pericialesmedicas.es";

export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
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
      description: "Médico colegiado nº 14/07919 – Colegio de Médicos de Córdoba",
    },
  };
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${baseUrl}/#localbusiness`,
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
    parentOrganization: { "@id": `${baseUrl}/#person` },
  };
}

export function buildFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildServiceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: `${baseUrl}${url}`,
    provider: { "@id": `${baseUrl}/#person` },
    areaServed: { "@type": "Country", name: "España" },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${baseUrl}${url}`,
      availableLanguage: "Spanish",
    },
  };
}
