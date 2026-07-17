import { z } from "zod";

export { MAX_FILE_SIZE, MAX_FILES } from "./upload-limits";

// Campos comunes a los dos formularios del sitio:
// - FormularioConsulta (/consulta): telefono, email, descripcion, rgpd
// - Formulario (páginas de servicio): nombre, apellidos, email, tipo_caso, provincia, descripcion, rgpd
// email + descripcion + rgpd son obligatorios; el resto es opcional según el formulario de origen.
export const contactoSchema = z.object({
  nombre: z.string().max(80).optional(),
  apellidos: z.string().max(100).optional(),
  telefono: z.string().min(9).max(20).optional(),
  email: z.string().trim().email(),
  tipo_caso: z.string().max(120).optional(),
  provincia: z.string().max(120).optional(),
  descripcion: z.string().min(20).max(2000),
  rgpd: z.union([z.literal("true"), z.literal(true)]),
  turnstileToken: z.string().optional(),
});

export const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
