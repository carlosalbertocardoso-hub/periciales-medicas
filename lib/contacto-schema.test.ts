import { describe, it, expect } from "vitest";
import { contactoSchema, escapeHtml, MAX_FILE_SIZE, MAX_FILES } from "./contacto-schema";

describe("contactoSchema", () => {
  const basePayload = {
    email: "paciente@example.com",
    descripcion: "Una descripción de al menos veinte caracteres.",
    rgpd: "true" as const,
  };

  it("acepta el payload mínimo válido (email + descripción + rgpd)", () => {
    expect(() => contactoSchema.parse(basePayload)).not.toThrow();
  });

  it("acepta el payload completo del formulario de /consulta (con teléfono)", () => {
    expect(() =>
      contactoSchema.parse({ ...basePayload, telefono: "600111222" })
    ).not.toThrow();
  });

  it("acepta el payload completo del formulario de páginas de servicio (sin teléfono)", () => {
    expect(() =>
      contactoSchema.parse({
        ...basePayload,
        nombre: "Ana",
        apellidos: "García",
        tipo_caso: "Negligencia médica",
        provincia: "Sevilla",
      })
    ).not.toThrow();
  });

  it("rechaza email inválido", () => {
    expect(() => contactoSchema.parse({ ...basePayload, email: "no-es-un-email" })).toThrow();
  });

  it("rechaza descripción demasiado corta (< 20 caracteres)", () => {
    expect(() => contactoSchema.parse({ ...basePayload, descripcion: "muy corta" })).toThrow();
  });

  it("rechaza descripción que excede el máximo (> 2000 caracteres)", () => {
    expect(() =>
      contactoSchema.parse({ ...basePayload, descripcion: "x".repeat(2001) })
    ).toThrow();
  });

  it("rechaza nombre que excede el máximo (> 80 caracteres)", () => {
    expect(() =>
      contactoSchema.parse({ ...basePayload, nombre: "x".repeat(81) })
    ).toThrow();
  });

  it("rechaza apellidos que exceden el máximo (> 100 caracteres)", () => {
    expect(() =>
      contactoSchema.parse({ ...basePayload, apellidos: "x".repeat(101) })
    ).toThrow();
  });

  it("rechaza tipo_caso que excede el máximo (> 120 caracteres)", () => {
    expect(() =>
      contactoSchema.parse({ ...basePayload, tipo_caso: "x".repeat(121) })
    ).toThrow();
  });

  it("rechaza provincia que excede el máximo (> 120 caracteres)", () => {
    expect(() =>
      contactoSchema.parse({ ...basePayload, provincia: "x".repeat(121) })
    ).toThrow();
  });

  it("rechaza rgpd ausente o false — el usuario debe aceptar explícitamente", () => {
    expect(() => contactoSchema.parse({ ...basePayload, rgpd: undefined })).toThrow();
    expect(() => contactoSchema.parse({ ...basePayload, rgpd: false })).toThrow();
  });

  it("acepta rgpd como boolean true (formData de servidor lo normaliza distinto que el cliente)", () => {
    expect(() => contactoSchema.parse({ ...basePayload, rgpd: true })).not.toThrow();
  });

  it("rechaza teléfono demasiado corto cuando se proporciona (< 9 caracteres)", () => {
    expect(() => contactoSchema.parse({ ...basePayload, telefono: "12345" })).toThrow();
  });

  it("teléfono es opcional — no lo exige si no viene", () => {
    expect(() => contactoSchema.parse(basePayload)).not.toThrow();
  });

  it("email con espacios exteriores se trimea pero se valida correctamente", () => {
    const result = contactoSchema.parse({ ...basePayload, email: "  a@b.com  " });
    expect(result.email).toBe("a@b.com");
  });

  it("email válido sin espacios no se ve afectado por trim", () => {
    const result = contactoSchema.parse({ ...basePayload, email: "paciente@example.com" });
    expect(result.email).toBe("paciente@example.com");
  });

  it("email con espacios internos sigue siendo rechazado", () => {
    expect(() => contactoSchema.parse({ ...basePayload, email: "a @b.com" })).toThrow();
    expect(() => contactoSchema.parse({ ...basePayload, email: "a@ b.com" })).toThrow();
  });

  it("entrada formada solo por espacios es rechazada", () => {
    expect(() => contactoSchema.parse({ ...basePayload, email: "   " })).toThrow();
  });
});

describe("escapeHtml", () => {
  it("escapa los 4 caracteres peligrosos para HTML", () => {
    expect(escapeHtml(`<script>alert("x")</script> & co`)).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; co"
    );
  });

  it("no modifica texto sin caracteres especiales", () => {
    expect(escapeHtml("Descripción normal del caso, sin nada raro.")).toBe(
      "Descripción normal del caso, sin nada raro."
    );
  });
});

describe("límites de adjuntos (lib/upload-limits.ts, fuente única)", () => {
  // Regresión directa del hallazgo real de la auditoría (code-reviewer, task
  // 85): FormularioConsulta.tsx tenía 15MB, Formulario.tsx tenía 10MB, y el
  // servidor no validaba nada -- los 3 puntos ahora importan de la misma
  // constante (lib/upload-limits.ts), así que no pueden volver a
  // desincronizarse; este test guarda el valor concreto, no la igualdad.
  it("MAX_FILE_SIZE es 10 MB", () => {
    expect(MAX_FILE_SIZE).toBe(10 * 1024 * 1024);
  });

  it("MAX_FILES es 5", () => {
    expect(MAX_FILES).toBe(5);
  });
});
