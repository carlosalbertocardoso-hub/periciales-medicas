import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://[PENDIENTE DOMINIO]";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/aviso-legal", "/politica-privacidad", "/politica-cookies"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
