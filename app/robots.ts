import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://pericialmedica.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/aviso-legal",
          "/politica-privacidad",
          "/politica-cookies",
          "/peritaje-accidentes-trafico",
          "/accidentes-laborales",
          "/valoracion-secuelas",
          "/valoracion-dano-corporal",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
