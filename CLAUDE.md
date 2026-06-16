@AGENTS.md

# Proyecto: Landing page Perito Médico — Dr. Pablo Rodríguez de Tembleque

Landing page de captación de leads para Pablo, médico perito independiente especializado en
negligencias médicas (mala praxis), con cobertura en toda España.

## Stack

- Next.js 16.2.7 — App Router, TypeScript, Turbopack
- Tailwind CSS v4
- react-hook-form + zod (formularios)
- lucide-react (iconos)
- nodemailer + Gmail SMTP (envío de leads — NO se usa Resend)
- Cloudflare Turnstile (anti-spam) — opcional, requiere env vars
- Google Tag Manager / GA4 con Consent Mode v2 + evento `form_submitted`

## Dominio y deploy — ⚠️ IMPORTANTE

- **Dominio real: `pericialesmedicas.es`** (y `www.`).
- **Proyecto Vercel correcto: `periciales-medicas`** (org `carlosalbertocardoso-hubs-projects`).
- Existe OTRO proyecto Vercel llamado `perito-medico-sevilla` que **NO** tiene el dominio
  conectado — es un residuo de un primer `vercel link` mal hecho. **No usarlo.** Si vas a
  tocar env vars o hacer `vercel deploy` manual, comprueba primero con `vercel project ls`
  y `vercel inspect <deployment>` → Aliases, que apunte a `pericialesmedicas.es`.
- El repo tiene integración GitHub → Vercel (`periciales-medicas`), así que un `git push` a
  `master` ya despliega solo. Solo usar `vercel deploy --prod` manual para iterar rápido en
  debugging (igual que se hizo para diagnosticar el fallo de envío de leads).

## Envío de leads (email)

`app/api/contacto/route.ts` usa **Gmail SMTP vía nodemailer**, no Resend (se descartó porque
requería verificar dominio por DNS; Gmail SMTP usa la cuenta propia sin esa fricción).

Env vars necesarias en Vercel (proyecto `periciales-medicas`, Production):
- `GMAIL_USER` = `pablo.rdt.medico@gmail.com`
- `GMAIL_APP_PASSWORD` = contraseña de aplicación de Gmail (16 chars, requiere 2FA activo en
  esa cuenta). Si Gmail devuelve `535 BadCredentials`, casi siempre es: 2FA no realmente
  activo, o la password se generó en una cuenta Google distinta a la del avatar logueado.
- `CONTACT_EMAIL` = destino de los leads (por defecto el propio `GMAIL_USER`).

El endpoint acepta **dos shapes de formulario distintas** (mismo endpoint):
- `FormularioConsulta.tsx` (`/consulta`): telefono, email, descripcion, rgpd.
- `Formulario.tsx` (páginas de servicio, vía `ServicePage`): nombre, apellidos, email,
  tipo_caso, provincia, descripcion, rgpd (sin telefono).

El schema en `route.ts` solo exige `email` + `descripcion` + `rgpd`; el resto es opcional.
**No volver a poner `telefono` como obligatorio** — rompería los leads del segundo formulario.

## Tipografía y paleta

- Headings: EB Garamond
- Body: Lato
- Azul marino: `#1A1A2E` / `#1B3A6B` / `#0F2347`
- Verde acento (CTAs): `#1A9E6B`
- Dorado (credenciales, ornamentos): `#C8993A`
- Fondo claro: `#F7F8FA`

## Estructura de páginas

- `/` — Landing principal
- `/perfil` — Perfil profesional de Pablo
- `/consulta` — Formulario de valoración gratuita
- `/negligencias-medicas`, `/informes-periciales` — Páginas de servicio (activas)
- `/peritaje-accidentes-trafico`, `/accidentes-laborales`, `/valoracion-secuelas`,
  `/valoracion-dano-corporal` — **Despublicadas**: el sitio solo trata mala praxis médica.
  Cada una hace `permanentRedirect("/")` + `robots.ts` las marca disallow. No restaurar
  contenido sin que el cliente lo pida explícitamente.
- `/gracias` — Página de conversión tras envío de formulario (noindex)
- `/aviso-legal`, `/politica-privacidad`, `/politica-cookies` — Legales

## SEO

- JSON-LD: `Person` + `LocalBusiness` van **una sola vez** en `app/layout.tsx` (entidades
  site-wide). `FAQPage` solo en la página donde el FAQ es visible (home, generado desde
  `lib/faq-data.ts` — misma fuente que el componente `FAQ.tsx`, para que el schema nunca se
  desincronice del contenido real). No dupliques Person/LocalBusiness por página.
- Builders reutilizables en `lib/schemas.ts`.
- Enlaces internos: usar siempre `next/link`, no `<a href="/...">` (excepto mailto, wa.me,
  externos, o anclas de la misma página `#contacto`).
- OG image: `public/img/og-image.jpg` (1200×800, ~60KB). Si se regenera, mantener esas
  dimensiones y formato JPG (la foto no tiene transparencia, PNG la infla 20x).

## Variables de entorno necesarias

Ver `.env.example` en la raíz del proyecto.

## Pendientes importantes

- Sustituir `[PENDIENTE]` restante: nº colegiado ya puesto, falta confirmar colegio si cambia.
- Foto profesional de Pablo: **ya integrada** (`public/img/pablo-rodriguez-de-tembleque.webp`).
- URL de cita telemática Doctoralia (bloque comentado en `FormularioConsulta.tsx`).
- Testimonios reales autorizados (`Testimonios.tsx` con placeholder, sin montar).
- Fase 4: páginas locales (`/perito-medico-madrid`, `/perito-medico-barcelona`, etc.) — no
  iniciado, evaluar si tiene sentido dado que el servicio ya es 100% telemático/nacional.
- Fase 5: estructura de blog — no iniciado.

## Superpowers

Usar la skill `using-superpowers` al inicio de cada conversación. Antes de cualquier acción, verificar si aplica una skill.

Skills clave para este proyecto:

- `humanizer` — siempre que se escriba o edite texto de contenido
- `frontend-design` — siempre que se cree o rediseñe un componente, sección o página
- `react-best-practices` — al escribir o revisar componentes React/Next.js (waterfalls, bundle size, re-renders, SSR)
- `karpathy-guidelines` — antes de escribir, revisar o refactorizar código (evita sobrecomplicar, define criterios de éxito verificables)
- `systematic-debugging` — cuando algo no funcione como se espera
- `brainstorming` — antes de diseñar una nueva feature o sección
- `commit` — antes de crear un commit
- `requesting-code-review` / `create-pr` — antes de abrir un pull request
