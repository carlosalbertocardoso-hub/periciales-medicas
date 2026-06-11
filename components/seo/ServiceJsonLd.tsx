interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
  faqs: { q: string; a: string }[];
}

export function ServiceJsonLd({ name, description, url, faqs }: ServiceJsonLdProps) {
  const baseUrl = "https://pericialmedica.com";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: `${baseUrl}${url}`,
    provider: {
      "@type": "Person",
      name: "Pablo Rodriguez de Tembleque Relaño",
      jobTitle: "Perito Médico",
      url: baseUrl,
    },
    areaServed: { "@type": "Country", name: "España" },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${baseUrl}${url}`,
      availableLanguage: "Spanish",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Servicios", item: `${baseUrl}/#servicios` },
      { "@type": "ListItem", position: 3, name, item: `${baseUrl}${url}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
