import { describe, it, expect } from "vitest";
import {
  buildPersonSchema,
  buildLocalBusinessSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
  buildServiceSchema,
} from "./schemas";

describe("buildPersonSchema", () => {
  const schema = buildPersonSchema();

  it("tiene el @type correcto para rich results", () => {
    expect(schema["@type"]).toBe("Person");
  });

  it("teléfono coincide con el real del sitio (+34 601 53 91 80)", () => {
    // Mismo número que WhatsAppButton.tsx y las páginas legales -- si alguien
    // lo cambia aquí sin cambiar los otros sitios, este test no lo detecta
    // solo, pero al menos fija cuál es el valor correcto conocido.
    expect(schema.telephone).toBe("+34601539180");
  });

  it("cita el nº de colegiado real (14/07919, Colegio de Córdoba)", () => {
    expect(schema.hasCredential.description).toContain("14/07919");
    expect(schema.hasCredential.description).toContain("Córdoba");
  });
});

describe("buildLocalBusinessSchema", () => {
  const schema = buildLocalBusinessSchema();

  it("usa MedicalBusiness, no LocalBusiness genérico", () => {
    expect(schema["@type"]).toBe("MedicalBusiness");
  });

  it("enlaza al Person vía @id (parentOrganization)", () => {
    expect(schema.parentOrganization["@id"]).toBe("https://pericialesmedicas.es/#person");
  });
});

describe("buildFAQSchema", () => {
  it("mapea cada FAQ a un Question/Answer válido", () => {
    const schema = buildFAQSchema([{ q: "¿Pregunta?", a: "Respuesta." }]);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(1);
    expect(schema.mainEntity[0].name).toBe("¿Pregunta?");
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe("Respuesta.");
  });

  it("con 0 FAQs no rompe, devuelve mainEntity vacío", () => {
    expect(buildFAQSchema([]).mainEntity).toHaveLength(0);
  });
});

describe("buildBreadcrumbSchema", () => {
  it("asigna position empezando en 1, en el orden recibido", () => {
    const schema = buildBreadcrumbSchema([
      { name: "Inicio", url: "https://pericialesmedicas.es" },
      { name: "Perfil profesional", url: "https://pericialesmedicas.es/perfil" },
    ]);
    expect(schema.itemListElement.map((i) => i.position)).toEqual([1, 2]);
    expect(schema.itemListElement[1].name).toBe("Perfil profesional");
  });
});

describe("buildServiceSchema", () => {
  it("construye la URL absoluta a partir de la ruta relativa", () => {
    const schema = buildServiceSchema({
      name: "Informes periciales",
      description: "desc",
      url: "/informes-periciales",
    });
    expect(schema.url).toBe("https://pericialesmedicas.es/informes-periciales");
    expect(schema.provider["@id"]).toBe("https://pericialesmedicas.es/#person");
  });
});
