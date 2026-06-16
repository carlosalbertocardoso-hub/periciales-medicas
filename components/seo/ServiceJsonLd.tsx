import { JsonLd } from "@/components/seo/JsonLd";
import { buildServiceSchema, buildBreadcrumbSchema, buildFAQSchema } from "@/lib/schemas";

const baseUrl = "https://pericialesmedicas.es";

interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
  faqs: { q: string; a: string }[];
}

export function ServiceJsonLd({ name, description, url, faqs }: ServiceJsonLdProps) {
  const serviceSchema = buildServiceSchema({ name, description, url });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Inicio", url: baseUrl },
    { name: "Servicios", url: `${baseUrl}/#servicios` },
    { name, url: `${baseUrl}${url}` },
  ]);

  const faqSchema = buildFAQSchema(faqs);

  return <JsonLd data={[serviceSchema, breadcrumbSchema, faqSchema]} />;
}
