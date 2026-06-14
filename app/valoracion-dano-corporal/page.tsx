import { permanentRedirect } from "next/navigation";

// Página despublicada: el sitio se enfoca solo en mala praxis médica.
// Redirige a la portada (308). Para republicar, restaurar desde el historial.
export default function Page() {
  permanentRedirect("/");
}
