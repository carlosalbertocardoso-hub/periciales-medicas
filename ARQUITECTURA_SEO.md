# ARQUITECTURA SEO — Perito Médico España

---

## 1. ESTRUCTURA DE URLs

### Fase 1 — Landing principal (ahora)
```
/                          ← Página principal (keyword: "perito médico España")
/politica-privacidad       ← Legal RGPD
/aviso-legal               ← Legal obligatorio
/politica-cookies          ← Legal cookies
```

### Fase 2 — Páginas por especialidad
```
/peritaje-accidentes-trafico          ← "perito médico accidente tráfico"
/valoracion-dano-corporal             ← "valoración daño corporal"
/negligencias-medicas                 ← "perito médico negligencia médica"
/accidentes-laborales                 ← "perito médico accidente laboral"
/valoracion-secuelas                  ← "valoración secuelas"
/informes-periciales                  ← "informe pericial médico"
```

### Fase 3 — Páginas locales (ciudad)
```
/perito-medico-sevilla
/perito-medico-madrid
/perito-medico-barcelona
/perito-medico-malaga
/perito-medico-valencia
/perito-medico-bilbao
/perito-medico-zaragoza
/perito-medico-murcia
```

### Fase 4 — Blog / Contenido
```
/blog
/blog/que-es-un-perito-medico
/blog/como-reclamar-accidente-trafico-espana
/blog/cuanto-cobra-perito-medico
/blog/diferencia-perito-medico-medico-aseguradora
/blog/baremo-lesiones-trafico-actualizado
/blog/plazos-reclamacion-accidente
```

---

## 2. TÍTULO Y DESCRIPCIÓN (Página principal)

**Title tag (< 60 caracteres):**
```
Perito Médico en España | Informe Pericial Independiente
```

**Meta description (< 155 caracteres):**
```
Perito médico independiente para valoración de lesiones, accidentes de tráfico, laborales y negligencias médicas en toda España. Consulta inicial gratuita.
```

**H1 principal:**
```
Informe pericial médico independiente para defender tus derechos
```

---

## 3. SCHEMA.ORG IMPLEMENTADOS

| Schema | Página | Estado |
|--------|--------|--------|
| `Person` | `/` | ✅ Implementado |
| `MedicalBusiness` / `ProfessionalService` | `/` | ✅ Implementado |
| `FAQPage` | `/` | ✅ Implementado |
| `BreadcrumbList` | `/` | ✅ Implementado |
| `Article` | `/blog/*` | ⏳ Fase 4 |
| `Review` | `/` | ⏳ Pendiente reseñas reales |
| `LocalBusiness` por ciudad | `/perito-medico-[ciudad]` | ⏳ Fase 3 |

---

## 4. INTERNAL LINKING

```
Página principal
├── Hero CTA → #contacto
├── Servicios → /peritaje-accidentes-trafico (Fase 2)
├── FAQ → /blog (Fase 4)
├── Footer → /aviso-legal, /politica-privacidad, /politica-cookies
└── Trust Signals → Google Business Profile (externo)

Páginas de especialidad (Fase 2)
├── → Página principal (breadcrumb)
├── → Formulario (#contacto de principal o formulario embebido)
└── → Otras especialidades relacionadas
```

---

## 5. CORE WEB VITALS — OBJETIVOS

| Métrica | Objetivo | Estado actual |
|---------|----------|---------------|
| LCP (Largest Contentful Paint) | < 2.5s | ✅ Next.js + Vercel |
| INP (Interaction to Next Paint) | < 200ms | ✅ Mínimo JS en servidor |
| CLS (Cumulative Layout Shift) | < 0.1 | ✅ Font display swap |
| TTFB (Time to First Byte) | < 800ms | ✅ SSG + Vercel Edge |

**Optimizaciones implementadas:**
- `Inter` font con `display: swap` y `subsets: ['latin']`
- Imágenes con `next/image` (WebP automático)
- Componentes de servidor por defecto (solo `"use client"` donde necesario)
- Build estático para la landing (SSG)

**Optimizaciones pendientes:**
- Añadir `next/image` para la foto de Pablo (reemplaza placeholder)
- Implementar `loading="lazy"` en testimonios/servicios
- Verificar con Lighthouse antes de lanzar

---

## 6. SITEMAP Y ROBOTS

```
/sitemap.xml → generado automáticamente por app/sitemap.ts
/robots.txt  → generado automáticamente por app/robots.ts
```

**Reglas robots.txt actuales:**
```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://[DOMINIO]/sitemap.xml
```

---

## 7. CANONICAL Y HREFLANG

- Canonical en `layout.tsx` → `alternates.canonical`
- Hreflang no necesario (solo ES por ahora)
- Confirmar dominio definitivo para activar canonicals

---

## 8. GOOGLE ADS — ESTRUCTURA DE CAMPAÑAS (Referencia)

### Campaña 1: Búsqueda Nacional — Transaccional
- Ad Group 1: "perito médico" / "peritaje médico"
- Ad Group 2: "accidente tráfico perito médico"
- Ad Group 3: "negligencia médica perito"
- Ad Group 4: "accidente laboral perito médico"

### Campaña 2: Búsqueda Local — Por provincia
- Ad Group por ciudad (Madrid, Barcelona, Sevilla, Valencia, Málaga…)

### Campaña 3: Display Remarketing
- Audiencias: visitantes web últimos 30 días que no convirtieron

**Landing page para Ads:** La página principal `/` con UTM tracking.
**Conversión:** Envío de formulario + clic en WhatsApp.

---

## 9. META ADS — ESTRUCTURA (Referencia)

### Audiencias
- Intereses: Accidentes de tráfico, seguros, reclamaciones legales
- Custom Audiences: Tráfico web (pixel) + lista de leads
- Lookalike: 1-2% similar a conversiones

### Formatos recomendados
- Lead Ads (formulario nativo Meta) — para captar sin fricción
- Traffic Ads → landing page con UTM

**Conversión server-side:** Importante para saltarse iOS 14+ limitaciones.
→ Implementar Meta Conversions API en `/api/contacto/route.ts` (Fase 2).

---

## 10. SEGUIMIENTO DE POSICIONES — KEYWORDS A MONITORIZAR

Configurar en Google Search Console y herramienta SEO (Semrush/Ahrefs):
1. perito médico España
2. perito médico independiente
3. informe pericial médico
4. contratar perito médico
5. perito médico accidente tráfico
6. perito médico negligencia médica
7. valoración daño corporal
8. perito médico Sevilla (posición local)

---

## 11. ESTRUCTURA DE CARPETAS — Next.js App Router

```
perito-medico-sevilla/
├── app/
│   │
│   │   # ─── FASE 1: Core ───────────────────────────────────────────
│   ├── layout.tsx                  ← Root layout: fuentes, metadata base, providers
│   ├── page.tsx                    ← / (landing principal)
│   ├── not-found.tsx               ← Página 404 personalizada
│   ├── sitemap.ts                  ← /sitemap.xml (generado automáticamente)
│   ├── robots.ts                   ← /robots.txt (generado automáticamente)
│   │
│   ├── politica-privacidad/
│   │   └── page.tsx                ← /politica-privacidad
│   ├── aviso-legal/
│   │   └── page.tsx                ← /aviso-legal
│   ├── politica-cookies/
│   │   └── page.tsx                ← /politica-cookies
│   ├── gracias/
│   │   └── page.tsx                ← /gracias (página post-formulario, pixel conversión)
│   │
│   ├── api/
│   │   └── contacto/
│   │       └── route.ts            ← POST /api/contacto (Resend + Supabase)
│   │
│   │   # ─── FASE 2: Especialidades ──────────────────────────────────
│   ├── peritaje-accidentes-trafico/
│   │   └── page.tsx                ← /peritaje-accidentes-trafico
│   ├── valoracion-dano-corporal/
│   │   └── page.tsx                ← /valoracion-dano-corporal
│   ├── negligencias-medicas/
│   │   └── page.tsx                ← /negligencias-medicas
│   ├── accidentes-laborales/
│   │   └── page.tsx                ← /accidentes-laborales
│   ├── valoracion-secuelas/
│   │   └── page.tsx                ← /valoracion-secuelas
│   ├── informes-periciales/
│   │   └── page.tsx                ← /informes-periciales
│   │
│   │   # ─── FASE 3: SEO Local ───────────────────────────────────────
│   ├── perito-medico-madrid/
│   │   └── page.tsx                ← /perito-medico-madrid
│   ├── perito-medico-barcelona/
│   │   └── page.tsx                ← /perito-medico-barcelona
│   ├── perito-medico-sevilla/
│   │   └── page.tsx                ← /perito-medico-sevilla
│   ├── perito-medico-malaga/
│   │   └── page.tsx                ← /perito-medico-malaga
│   ├── perito-medico-valencia/
│   │   └── page.tsx                ← /perito-medico-valencia
│   ├── perito-medico-bilbao/
│   │   └── page.tsx                ← /perito-medico-bilbao
│   ├── perito-medico-zaragoza/
│   │   └── page.tsx                ← /perito-medico-zaragoza
│   ├── perito-medico-murcia/
│   │   └── page.tsx                ← /perito-medico-murcia
│   │
│   │   # ─── FASE 4: Blog ────────────────────────────────────────────
│   └── blog/
│       ├── page.tsx                ← /blog (índice de artículos)
│       └── [slug]/
│           └── page.tsx            ← /blog/[slug] (artículo individual)
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppButton.tsx
│   │
│   ├── sections/                   ← Secciones de la landing principal
│   │   ├── Hero.tsx
│   │   ├── Problema.tsx
│   │   ├── Servicios.tsx
│   │   ├── SobrePablo.tsx
│   │   ├── Proceso.tsx
│   │   ├── TrustSignals.tsx
│   │   ├── Testimonios.tsx
│   │   ├── FAQ.tsx
│   │   └── Formulario.tsx
│   │
│   ├── specialty/                  ← Plantillas reutilizables (Fase 2)
│   │   ├── SpecialtyHero.tsx       ← Hero adaptable por especialidad
│   │   ├── SpecialtyFAQ.tsx        ← FAQ específica por especialidad
│   │   └── SpecialtyForm.tsx       ← Formulario embebido
│   │
│   ├── local/                      ← Plantillas reutilizables (Fase 3)
│   │   ├── LocalHero.tsx           ← Hero con ciudad parametrizada
│   │   └── LocalSchema.tsx         ← LocalBusiness schema por ciudad
│   │
│   └── ui/                         ← Átomos/moléculas reutilizables
│       ├── Button.tsx
│       ├── Badge.tsx
│       └── SchemaOrg.tsx           ← Componente genérico para JSON-LD
│
├── lib/
│   ├── schemas/                    ← JSON-LD builders
│   │   ├── person.ts               ← Schema Person (Pablo)
│   │   ├── medicalBusiness.ts      ← Schema MedicalBusiness / ProfessionalService
│   │   ├── localBusiness.ts        ← Schema LocalBusiness por ciudad
│   │   ├── faqPage.ts              ← Schema FAQPage
│   │   └── article.ts              ← Schema Article (blog)
│   │
│   ├── cities.ts                   ← Data: lista de ciudades con datos SEO
│   ├── specialties.ts              ← Data: lista de especialidades con datos SEO
│   └── blog.ts                     ← Helpers para leer posts del blog (Fase 4)
│
├── content/
│   └── blog/                       ← Artículos en MDX o JSON (Fase 4)
│       ├── que-es-un-perito-medico.mdx
│       └── ...
│
├── public/
│   ├── pablo-foto.jpg              ← Foto profesional de Pablo
│   ├── og-image.jpg                ← Open Graph 1200×630px
│   ├── favicon.ico
│   └── logo.svg
│
├── next.config.ts                  ← Security headers + image config (✅ hecho)
├── tsconfig.json                   ← Paths alias @/* (✅ hecho)
└── postcss.config.mjs              ← Tailwind CSS v4 (✅ hecho)
```

### Notas de implementación

- **Páginas de especialidad y locales comparten plantilla:** El 80% del layout es idéntico. Se parametrizan vía props o `generateMetadata` dinámico, no duplicando JSX.
- **Blog (Fase 4):** Usar MDX con `next-mdx-remote` o archivos `.mdx` en `/content/blog/`. La ruta dinámica `[slug]` genera páginas estáticas en build (`generateStaticParams`).
- **Schema builders en `lib/schemas/`:** Funciones puras que devuelven el objeto JSON-LD. El componente `SchemaOrg.tsx` lo serializa con `<script type="application/ld+json">`. Sin dependencias externas.
- **`lib/cities.ts` y `lib/specialties.ts`:** Arrays tipados con `{ slug, ciudad, keyword, description, schema }`. Permiten generar `sitemap.ts` y las páginas locales/satélite sin repetición.
- **`"use client"` solo donde sea estrictamente necesario:** Formulario (estado + validación Zod), WhatsAppButton (click event). Todo lo demás son Server Components.
- **Páginas legales (Fase 1 pendientes):** `/aviso-legal` y `/politica-cookies` son páginas estáticas sencillas. Sin interactividad, sin `"use client"`.
- **`/gracias`:** Página destino post-envío de formulario. Aquí se disparan los pixels de conversión (Google Ads + Meta). Importante para medir ROI de campañas de pago.

---

## 12. ON-PAGE SEO — ESTÁNDARES POR TIPO DE PÁGINA

### Checklist obligatorio en cada página

| Elemento | Estándar | Notas |
|----------|----------|-------|
| Title tag | 50–60 caracteres, keyword al inicio | `Perito Médico Judicial en España \| Informes Periciales Nacionales` |
| Meta description | 150–160 caracteres con CTA | `Informe pericial médico independiente para...` |
| URL | Corta, sin stop words, con guiones | `/peritaje-accidentes-trafico` |
| H1 | Una sola vez, con keyword principal | Nunca repetir el title tag literal |
| Headings | Jerarquía lógica H2 → H3 | Sin saltar niveles |
| Imágenes | `alt` optimizado + `next/image` | Formato WebP, lazy loading |
| CTA | Visible above the fold + final de página | Enlaza a `#contacto` o formulario embebido |
| Internal links | Mínimo 2–3 contextuales por página | Hacia landing y satélites relacionadas |
| Autoría | Bio de Pablo con foto, nº colegiado y fecha revisión | Obligatorio en blog y páginas satélite |
| Disclaimer | Texto estándar al final | Ver plantilla en sección 13 |

### Longitud de contenido mínima

| Tipo de página | Palabras mínimas |
|----------------|-----------------|
| Landing principal | 800–1.200 |
| Páginas satélite | 1.500–2.500 |
| Páginas locales | 800–1.200 |
| Artículos de blog | 2.000–3.500 |

---

## 13. DATOS ESTRUCTURADOS — MAPA COMPLETO

| Schema | Páginas | Estado |
|--------|---------|--------|
| `ProfessionalService` + `MedicalBusiness` | Todas | ✅ Landing implementado |
| `Person` | Landing + páginas satélite | ✅ Landing implementado |
| `FAQPage` | Landing + páginas satélite + blog con FAQ | ✅ Landing implementado |
| `BreadcrumbList` | Todas excepto landing | ✅ Landing implementado |
| `Article` | `/blog/[slug]` | ⏳ Fase 4 |
| `Review` | Landing (cuando haya reseñas reales) | ⏳ Pendiente datos Pablo |
| `LocalBusiness` | `/perito-medico-[ciudad]` | ⏳ Fase 3 |

**Validación obligatoria antes de publicar:** [Google Rich Results Test](https://search.google.com/test/rich-results)

**Disclaimer estándar** (copiar en todas las páginas de contenido):
> "La información publicada en esta página tiene carácter general e informativo. No sustituye el asesoramiento profesional individualizado. Para una valoración de su caso concreto, contacte directamente con el perito médico."

---

## 14. TECHNICAL SEO — CHECKLIST DE LANZAMIENTO

### Implementado ✅
- Security headers en `next.config.ts` (HSTS, CSP, X-Frame-Options…)
- `sitemap.xml` dinámico via `app/sitemap.ts`
- `robots.txt` via `app/robots.ts` (bloqueo de `/api/`)
- Canonical tags via `alternates.canonical` en `generateMetadata`
- SSL gestionado por Vercel
- Imágenes con `next/image` (WebP/AVIF automático)
- Server Components por defecto (mínimo JS al cliente)

### Pendiente antes de lanzar ⏳
- [ ] Canonical con dominio definitivo (actualizar en `layout.tsx`)
- [ ] `og:image` real (1200×630px) en `/public/og-image.jpg`
- [ ] Favicon multi-resolución
- [ ] Lighthouse móvil > 90 en las 4 métricas
- [ ] Structured Data validado con Rich Results Test
- [ ] Google Search Console: propiedad verificada + sitemap enviado
- [ ] Consent Mode v2 (banner cookies) antes de activar GA4/GTM
- [ ] `<meta name="robots" content="noindex">` retirado en producción

### Core Web Vitals — objetivos

| Métrica | Objetivo | Riesgo |
|---------|----------|--------|
| LCP | < 2.5s | Foto de Pablo sin optimizar → usar `priority` en `next/image` |
| INP | < 200ms | Formulario con Zod → validación debounced |
| CLS | < 0.1 | Fuentes con `display: swap` ya configurado |
| TTFB | < 800ms | SSG en Vercel Edge, bajo riesgo |

---

## 15. ESTRATEGIA DE ENLAZADO INTERNO (SILO)

```
Landing (/)
├── → /peritaje-accidentes-trafico    (sección Servicios)
├── → /valoracion-dano-corporal        (sección Servicios)
├── → /negligencias-medicas            (sección Servicios)
├── → /accidentes-laborales            (sección Servicios)
├── → /informes-periciales             (sección Servicios)
├── → /blog                            (sección FAQ / CTA blog)
└── → /aviso-legal, /politica-privacidad, /politica-cookies (Footer)

Páginas satélite (/peritaje-*, /valoracion-*, etc.)
├── → / (breadcrumb + CTA principal)
├── → Otras especialidades relacionadas (internal links contextuales)
└── → /blog/[artículo relacionado]

Páginas locales (/perito-medico-[ciudad])
├── → / (breadcrumb)
└── → Especialidad más relevante para esa ciudad

Blog (/blog/[slug])
├── → / (CTA final de artículo)
├── → Página satélite temáticamente relacionada
└── → Otros artículos del blog (related posts)
```

**Principio:** Toda la autoridad de enlace converge en `/`. Las páginas satélite son el segundo nivel de concentración. El blog distribuye tráfico TOFU hacia páginas con intención comercial.

---

## 16. PLAN DE ESCALABILIDAD

| Fase | Periodo | Entregables |
|------|---------|-------------|
| 1 — Lanzamiento | Semanas 1–4 | Landing + 5–6 páginas satélite + 5 artículos blog |
| 2 — Local + Contenido | Meses 2–6 | 8–10 páginas locales + 10–15 artículos blog |
| 3 — Autoridad | Meses 6–12 | Evergreen actualizado + guías descargables (lead magnet) + vídeos YouTube (backlinks) |

**Señales de escalado a Fase 3:** Posición Top 10 en keyword principal + > 500 visitas orgánicas/mes + > 30 leads/mes orgánicos.

---

## 17. HERRAMIENTAS

| Herramienta | Uso | Coste |
|-------------|-----|-------|
| Google Search Console | Posiciones, indexación, errores | Gratuito |
| Google Analytics 4 + GTM | Tráfico, conversiones, eventos | Gratuito |
| Microsoft Clarity | Heatmaps, grabaciones de sesión | Gratuito |
| Ahrefs / Semrush | Keyword tracking, backlinks, competencia | ~100€/mes |
| Screaming Frog | Auditorías técnicas crawl | Gratuito hasta 500 URLs |
| Google Rich Results Test | Validar structured data | Gratuito |
| PageSpeed Insights | Core Web Vitals en producción | Gratuito |

---

## NOTAS FINALES

- Todo el contenido debe reforzar el **E-E-A-T** de Pablo: foto profesional, nº de colegiado, formación, casos anonimizados y fecha de última revisión visible en cada página.
- Evitar thin content. Cada URL debe justificar su existencia con valor real para el usuario.
- Monitorizar el impacto de las actualizaciones **Helpful Content** de Google cada trimestre.
- **Próximo paso inmediato:** Completar `PENDIENTES_VALIDACION.md` con los datos reales de Pablo (colegiado, foto, testimonios, servicios exactos) para desbloquear la publicación de la landing.

---

*Documento listo para implementación — Junio 2026*
