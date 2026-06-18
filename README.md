# Perito Médico — Dr. Pablo Rodríguez de Tembleque

Landing page de captación de leads para Pablo, médico perito independiente especializado en negligencias médicas (mala praxis), con cobertura en toda España.

Dominio: **https://pericialesmedicas.es**

## Stack

- **Next.js 16.2.7** — App Router, TypeScript, Turbopack
- **Tailwind CSS v4**
- **react-hook-form + zod** — validación de los formularios
- **lucide-react** — iconos
- **nodemailer + Gmail SMTP** — envío de emails de leads
- **Cloudflare Turnstile** — protección anti-spam del formulario
- **Google Tag Manager / GA4** — analítica con Consent Mode v2

## Arrancar en local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Copia `.env.example` a `.env.local` y rellena las variables necesarias antes de probar el formulario o la analítica. Sin `GMAIL_USER`/`GMAIL_APP_PASSWORD`, el endpoint de contacto registra el lead en consola pero no envía email (no rompe el flujo).

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `NEXT_PUBLIC_GTM_ID` | ID de Google Tag Manager |
| `NEXT_PUBLIC_GA4_ID` | ID de GA4 (solo si no usas GTM) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Clave pública Cloudflare Turnstile |
| `TURNSTILE_SECRET_KEY` | Clave privada Cloudflare Turnstile |
| `GMAIL_USER` | Cuenta Gmail emisora (`pablo.rdt.medico@gmail.com`) |
| `GMAIL_APP_PASSWORD` | Contraseña de aplicación de Gmail (16 chars, requiere 2FA) |
| `CONTACT_EMAIL` | Email donde llegan los leads (por defecto, `GMAIL_USER`) |

## Estructura del proyecto

```text
app/
  page.tsx                        # Landing principal
  layout.tsx                      # Layout global (fuentes, JSON-LD site-wide, analytics, cookie banner)
  globals.css                     # Variables CSS, tipografía, animaciones
  perfil/page.tsx                 # Perfil profesional de Pablo
  consulta/page.tsx               # Formulario de valoración gratuita
  gracias/page.tsx                # Página de conversión (noindex)
  negligencias-medicas/           # Página de servicio (activa)
  informes-periciales/            # Página de servicio (activa)
  peritaje-accidentes-trafico/    # Despublicada -> redirect a "/"
  accidentes-laborales/           # Despublicada -> redirect a "/"
  valoracion-secuelas/            # Despublicada -> redirect a "/"
  valoracion-dano-corporal/       # Despublicada -> redirect a "/"
  aviso-legal/                    # Legal
  politica-privacidad/            # Legal
  politica-cookies/               # Legal
  api/contacto/route.ts           # Endpoint de los formularios (nodemailer + Gmail SMTP)
  sitemap.ts                      # Sitemap programático
  robots.ts                       # Robots programático

components/
  layout/         # Header, Footer
  sections/       # Hero, Servicios, TrustSignals, Proceso, SobrePablo, FAQ, Formulario, FormularioConsulta...
  templates/       # ServicePage, ServiceFAQ (páginas de servicio)
  analytics/      # Analytics (Consent Mode v2), CookieBanner sin React cliente
  seo/            # JsonLd (renderer genérico), ServiceJsonLd
  ui/             # StickyCtaMobile, ChatbotGuiado, WhatsAppButton, etc.

hooks/
  useScrollReveal.ts   # Legacy/no usado en la landing: evitarlo en secciones estáticas

lib/
  schemas.ts       # Builders de JSON-LD (Person, LocalBusiness, FAQ, Breadcrumb, Service)
  faq-data.ts      # Fuente única de las FAQs (usada por FAQ.tsx y el schema FAQPage)
  utils.ts        # cn() y helpers
```

## Rendimiento

La landing está optimizada para minimizar hidratación:

- Las secciones estáticas son Server Components.
- El FAQ usa `<details>` nativo.
- El menú móvil del header usa `<details>` nativo.
- El banner de cookies se renderiza como HTML + script mínimo, no como componente React cliente.
- En la landing/layout se usan `<a href="/...">` para navegación estática cuando evita cargar
  `next/link`.
- `OpenChatbotLink` se mantiene como componente cliente porque abre el chatbot explicativo.

## Pendientes

- [ ] URL de cita telemática Doctoralia (bloque comentado en `FormularioConsulta.tsx`)
- [ ] Testimonios reales autorizados (`Testimonios.tsx` con placeholder, sin montar)
- [ ] Fase 4: páginas locales (`/perito-medico-madrid`, `/perito-medico-barcelona`...) — evaluar si tiene sentido siendo servicio 100% telemático
- [ ] Fase 5: estructura de blog

## Deploy

En [Vercel](https://vercel.com), proyecto **`periciales-medicas`** (org `carlosalbertocardoso-hubs-projects`) — es el único conectado al dominio `pericialesmedicas.es`. El repo tiene integración GitHub: cada push a `master` despliega solo.

⚠️ Si usas la CLI de Vercel (`vercel link`, `vercel deploy`), comprueba con `vercel project ls` que apuntas a `periciales-medicas` y no a otro proyecto con nombre parecido — un proyecto sin el dominio conectado no sirve de nada aunque el deploy salga "Ready".
