@AGENTS.md

# Proyecto: Landing page Perito Médico Pablo

Landing page de captación de leads para Pablo, perito médico independiente que ofrece servicios en toda España.

## Stack

- Next.js 16.2.7 — App Router, TypeScript, Turbopack
- Tailwind CSS v4
- react-hook-form + zod (formulario de contacto)
- lucide-react (iconos)
- Resend (envío de emails) — pendiente de integrar
- Supabase (almacenamiento de leads) — pendiente de integrar
- Cloudflare Turnstile (anti-spam) — opcional, requiere env vars
- Google Tag Manager / GA4 con Consent Mode v2

## Tipografía y paleta

- Headings: EB Garamond
- Body: Lato
- Azul marino: `#1A1A2E` / `#1B3A6B` / `#0F2347`
- Verde acento (CTAs): `#1A9E6B`
- Dorado (credenciales, ornamentos): `#C8993A`
- Fondo claro: `#F7F8FA`

## Estructura de páginas

- `/` — Landing principal
- `/peritaje-accidentes-trafico` — Página de especialidad
- `/negligencias-medicas` — Página de especialidad
- `/accidentes-laborales` — Página de especialidad
- `/valoracion-secuelas` — Página de especialidad
- `/valoracion-dano-corporal` — Página de especialidad
- `/informes-periciales` — Página de especialidad
- `/gracias` — Página de conversión tras envío de formulario (noindex)
- `/aviso-legal`, `/politica-privacidad`, `/politica-cookies` — Legales

## Variables de entorno necesarias

Ver `.env.example` en la raíz del proyecto.

## Pendientes importantes

- Sustituir todos los `[PENDIENTE]` con datos reales de Pablo (nombre completo, nº colegiado, teléfono, dominio, foto)
- Integrar Resend para envío de emails de leads
- Integrar Supabase para almacenar leads
- Fase 4: páginas locales (`/perito-medico-madrid`, `/perito-medico-barcelona`, etc.)
- Fase 5: estructura de blog

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
