// Única fuente de verdad para los límites de adjuntos -- server (route.ts) y
// los 2 formularios de cliente (Formulario.tsx, FormularioConsulta.tsx)
// importan de aquí. Antes cada uno tenía su propia constante local y se
// desincronizaron (hallazgo real de la auditoría, code-reviewer task 85:
// 15MB vs 10MB vs sin validar en servidor).
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB por archivo
export const MAX_FILES = 5;
export const MAX_TOTAL_RAW_ATTACHMENT_BYTES = 15 * 1024 * 1024; // 15 MiB total. Gmail SMTP rechaza mensajes MIME > 25 MB; adjuntos en Base64 (~1.37x overhead) + headers. 15 MiB crudo -> ~22.5 MB MIME, bajo límite transporte.

/**
 * Valida que la suma total de tamaños de archivos no supere el límite.
 * Ignora valores no finitos o negativos. Lista vacía -> true.
 */
export function isTotalUploadWithinLimit(sizes: number[]): boolean {
  const total = sizes.reduce((sum, size) => {
    if (Number.isFinite(size) && size >= 0) {
      return sum + size;
    }
    return sum;
  }, 0);
  return total <= MAX_TOTAL_RAW_ATTACHMENT_BYTES;
}
