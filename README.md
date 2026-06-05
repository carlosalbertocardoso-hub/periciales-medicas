# Perito Médico Pablo — Landing page

Landing page de captación de leads para Pablo, perito médico independiente con cobertura en toda España.

## Stack

- **Next.js 16.2.7** — App Router, TypeScript, Turbopack
- **Tailwind CSS v4**
- **react-hook-form + zod** — validación del formulario de contacto
- **lucide-react** — iconos
- **Resend** — envío de emails de leads (pendiente)
- **Supabase** — almacenamiento de leads (pendiente)
- **Cloudflare Turnstile** — protección anti-spam del formulario
- **Google Tag Manager / GA4** — analítica con Consent Mode v2

## Arrancar en local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Copia `.env.example` a `.env.local` y rellena las variables necesarias antes de probar el formulario o la analítica.

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `NEXT_PUBLIC_GTM_ID` | ID de Google Tag Manager |
| `NEXT_PUBLIC_GA4_ID` | ID de GA4 (solo si no usas GTM) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Clave pública Cloudflare Turnstile |
| `TURNSTILE_SECRET_KEY` | Clave privada Cloudflare Turnstile |
| `RESEND_API_KEY` | API key de Resend |
| `CONTACT_EMAIL` | Email donde llegan los leads |
| `SUPABASE_URL` | URL del proyecto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key de Supabase |

## Estructura del proyecto

```text
app/
  page.tsx                        # Landing principal
  layout.tsx                      # Layout global (fuentes, analytics, cookie banner)
  globals.css                     # Variables CSS, tipografía, animaciones
  gracias/page.tsx                # Página de conversión (noindex)
  peritaje-accidentes-trafico/    # Página de especialidad
  negligencias-medicas/           # Página de especialidad
  accidentes-laborales/           # Página de especialidad
  valoracion-secuelas/            # Página de especialidad
  valoracion-dano-corporal/       # Página de especialidad
  informes-periciales/            # Página de especialidad
  aviso-legal/                    # Legal
  politica-privacidad/            # Legal
  politica-cookies/               # Legal
  api/contacto/route.ts           # Endpoint del formulario de contacto
  sitemap.ts                      # Sitemap automático

components/
  layout/         # Header, Footer
  sections/       # Hero, Servicios, TrustSignals, Proceso, SobrePablo, FAQ...
  templates/      # ServicePage, ServiceFAQ (páginas de especialidad)
  analytics/      # Analytics (GTM/GA4), CookieBanner
  seo/            # JsonLd schemas
  ui/             # WhatsAppButton, componentes reutilizables

hooks/
  useScrollReveal.ts   # Animaciones scroll-triggered con IntersectionObserver

lib/
  consent.ts     # Utilidades Consent Mode v2
  utils.ts       # cn() y helpers
```

## Pendientes

- [ ] Sustituir todos los `[PENDIENTE]` con datos reales de Pablo
- [ ] Foto profesional de Pablo
- [ ] Integrar Resend (envío de emails)
- [ ] Integrar Supabase (almacenamiento de leads)
- [ ] Dominio definitivo (reemplazar `[PENDIENTE DOMINIO]` en metadata y schemas)
- [ ] Fase 4: páginas locales (`/perito-medico-madrid`, `/perito-medico-barcelona`...)
- [ ] Fase 5: estructura de blog

## Deploy

Recomendado en [Vercel](https://vercel.com). Conectar el repositorio y añadir las variables de entorno en el panel del proyecto.
