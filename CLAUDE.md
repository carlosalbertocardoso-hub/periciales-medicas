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
- Google Tag Manager `GTM-KMJ6W8VF` (parametrizable vía `NEXT_PUBLIC_GTM_ID`, fallback al valor
  actual) / GA4 con Consent Mode v2 + evento `form_submitted`. GTM diferido hasta la primera
  interacción real (o 4s de fallback) — mejora LCP/TBT, ver `app/layout.tsx`.

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

Schema zod + `escapeHtml` viven en `lib/contacto-schema.ts` (extraídos de `route.ts` para poder
testearlos, mismo comportamiento). `MAX_FILE_SIZE`/`MAX_FILES` viven en `lib/upload-limits.ts` —
**fuente única**, la importan `route.ts` y los 2 formularios de cliente. Antes cada uno tenía su
propia constante local y se desincronizó de verdad (15MB vs 10MB vs sin validar en servidor,
hallazgo real de auditoría 2026-07-11) — no volver a duplicarla.

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
- Enlaces internos en contenido estático de la landing/layout: se permite `<a href="/...">`
  para evitar hidratar `next/link` y reducir TBT. Usar `next/link` solo cuando el componente
  ya sea cliente o la navegación client-side aporte valor claro.
- OG image: `public/img/og-image.jpg` (1200×800, ~60KB). Si se regenera, mantener esas
  dimensiones y formato JPG (la foto no tiene transparencia, PNG la infla 20x).

## Rendimiento / hidratación

- Server Components por defecto. No añadir `"use client"` a secciones estáticas solo por
  animaciones, iconos, CTAs o enlaces.
- `useScrollReveal` ya no se usa en la landing: `.fade-up` y `.fade-in` son visibles por
  defecto para evitar `IntersectionObserver` + hidratación en contenido estático.
- `FAQ.tsx` usa `<details>` nativo, sin estado React.
- `Header.tsx` usa `<details>` nativo para el menú móvil; no reintroducir listener global de
  scroll salvo necesidad clara.
- `CookieBanner.tsx` es un Server Component con HTML + script mínimo inline. No convertirlo de
  nuevo a React cliente salvo que se acepte el coste en TBT.
- `OpenChatbotLink.tsx` sí debe seguir siendo cliente: dispara `open-chatbot` y forma parte del
  flujo explicativo del chatbot. No sustituirlo por enlace normal.

## Variables de entorno necesarias

Ver `.env.example` en la raíz del proyecto.

## Consent Mode v2 — arquitectura (jun-2026)

Implementado en `app/layout.tsx` con 3 scripts inline en `<head>`, en este orden:

1. **`consent-default`** — define `window.dataLayer` + `window.gtag`, luego:
   - `gtag('consent','default', { ...denied, wait_for_update:2000, region:[30 países EEE+UK] })` — denegado solo dentro EEE
   - `gtag('consent','default', { analytics_storage:'granted', ad_storage:'denied', ... })` — granted para el resto del mundo (EEUU, Latam, Asia…)

2. **`consent-restore`** — lee `localStorage('cookie_consent')` y dispara `gtag('consent','update',...)` ANTES de que GTM cargue. Crítico para visitantes que ya aceptaron — sin esto GTM arrancaba con estado denegado aunque el usuario hubiera consentido.

3. **`gtm-init`** — carga GTM async. Cuando llega, procesa el dataLayer en orden (consent-default → consent-restore → gtm.start).

`CookieBanner.tsx` es Server Component con script inline. Para visitantes nuevos muestra el banner tras 3.5s. Al aceptar/rechazar llama a `gtag('consent','update',...)` y guarda en localStorage.

**⚠️ NO mover `consent-restore` después de `gtm-init`** — rompería el timing y Google volvería a ver 0% consent rate.

**Measurement ID — resuelto (2026-07-12).** `G-08L95BZJEP` es el correcto (confirmado inspeccionando
el contenedor GTM real vía API, no solo el código). El ID `G-G249FLJM9M` que estaba hardcodeado en
`send_to` de ambos formularios era el error — ya unificado a `G-08L95BZJEP`. Además, el propio
contenedor GTM tenía **un segundo tag "Google tag" huérfano** apuntando a una tercera ID
(`G-QGG9PV3FHG`) que disparaba en el mismo trigger que el correcto — duplicaba todas las
sesiones/pageviews en una propiedad distinta sin que nadie lo supiera. Tag borrado y versión
publicada en GTM (2026-07-12). Si vuelve a aparecer un tag "Google tag" sin el ID en el nombre en
el contenedor, es sospechoso — comprobar sus parámetros antes de asumir que es inocuo.

**Analítica real confirmada (2026-07-12, vía `analytics-reporter`/GA4 Data API):** ~5-6
sesiones/semana, 0 conversiones (`form_submitted`) registradas en GA4 hasta la fecha. No implica
que el formulario no funcione (el envío es por Gmail SMTP, independiente de GA4) — implica que el
tráfico real es todavía mínimo. `leads_mes` (brief) queda en 0 hasta que haya más tráfico o se
confirme algún envío real por otra vía (revisar bandeja de Gmail).

## Testing

`npm test` → Vitest, 22 tests (`lib/contacto-schema.test.ts`, `lib/schemas.test.ts`). Sin
framework hasta 2026-07-11 — cubren: validación del schema de contacto (los 2 formularios),
`escapeHtml`, límites de archivo (`lib/upload-limits.ts`), y los builders JSON-LD (regresión
directa sobre teléfono/nº colegiado reales — si alguien cambia esos datos sin querer, el test
lo detecta). Añadir test nuevo cuando se toque cualquiera de esos archivos.

## Seguridad

`npm audit` limpio de altas/críticas (2026-07-12) — `nodemailer` actualizado a `^9.0.3` (era
vulnerable a SSRF/lectura arbitraria, CVSS 7.5, GHSA-p6gq-j5cr-w38f). Queda 1 moderada
(`postcss` vía `next@16.2.7`, transitiva) sin fix disponible sin breaking change — revisar en
próximas actualizaciones de Next. CSP en `next.config.ts` incluye `challenges.cloudflare.com`
(Turnstile) — si se añade otro servicio third-party con iframe/script propio, hay que añadirlo
ahí también o se rompe silenciosamente en producción.

## Señales GEO/IA

`public/llms.txt` + `public/llms-full.txt` (2026-07-11) — contenido real del FAQ/perfil, sin
datos inventados. `robots.ts` permite explícitamente `GPTBot`, `Google-Extended`, `CCBot`,
`Claude-Web`. Mantener `llms-full.txt` sincronizado si cambian las FAQs (`lib/faq-data.ts`) o
los datos de credenciales/experiencia.

## Pendientes importantes

- URL de cita telemática Doctoralia (bloque comentado en `FormularioConsulta.tsx`).
- Testimonios reales autorizados (`Testimonios.tsx` con placeholder, sin montar).
- Fase 4: páginas locales (`/perito-medico-madrid`, `/perito-medico-barcelona`, etc.) — no
  iniciado, evaluar si tiene sentido dado que el servicio ya es 100% telemático/nacional.
- Fase 5: estructura de blog — no iniciado.
- Contraste de color insuficiente en CTA verde (`#1A9E6B` sobre blanco/claro) — hallazgo real de
  Lighthouse, decisión de marca pendiente (tocar el acento afecta a todo el sitio).

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
