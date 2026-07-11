// Única fuente de verdad para los límites de adjuntos -- server (route.ts) y
// los 2 formularios de cliente (Formulario.tsx, FormularioConsulta.tsx)
// importan de aquí. Antes cada uno tenía su propia constante local y se
// desincronizaron (hallazgo real de la auditoría, code-reviewer task 85:
// 15MB vs 10MB vs sin validar en servidor).
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB por archivo
export const MAX_FILES = 5;
