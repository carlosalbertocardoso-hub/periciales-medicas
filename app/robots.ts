import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://pericialesmedicas.es";

  const disallow = [
    "/api/",
    "/aviso-legal",
    "/politica-privacidad",
    "/politica-cookies",
    "/peritaje-accidentes-trafico",
    "/accidentes-laborales",
    "/valoracion-secuelas",
    "/valoracion-dano-corporal",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // Crawlers de IA/GEO (AI Overviews, ChatGPT, Claude): mismo criterio de
      // disallow que el resto, permitiendo explícitamente el contenido público.
      { userAgent: "GPTBot", allow: "/", disallow },
      { userAgent: "Google-Extended", allow: "/", disallow },
      { userAgent: "CCBot", allow: "/", disallow },
      { userAgent: "Claude-Web", allow: "/", disallow },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
