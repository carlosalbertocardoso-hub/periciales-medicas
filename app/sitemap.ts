import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://[PENDIENTE DOMINIO]";

  const servicios = [
    "/peritaje-accidentes-trafico",
    "/negligencias-medicas",
    "/accidentes-laborales",
    "/valoracion-secuelas",
    "/valoracion-dano-corporal",
    "/informes-periciales",
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // Páginas de especialidad (Fase 3)
    ...servicios.map((slug) => ({
      url: `${baseUrl}${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Páginas legales
    {
      url: `${baseUrl}/aviso-legal`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-privacidad`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-cookies`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ];
}
