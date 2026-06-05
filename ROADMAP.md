# ROADMAP — Perito Médico España

---

## FASE 0 — Investigación y Preparación ✅ COMPLETADA

- [x] Keyword research nacional (40+ keywords)
- [x] Análisis de competidores
- [x] Arquitectura SEO definida
- [x] Stack técnico seleccionado
- [x] Documentos de validación creados

---

## FASE 1 — Landing page base (MVP) ✅ EN PRODUCCIÓN

**Objetivo:** Captar primeros leads. Validar el canal.

### Técnico
- [x] Proyecto Next.js 15 (App Router + TypeScript)
- [x] Tailwind CSS v4 + Inter font
- [x] Paleta de colores y diseño mobile-first
- [x] Componentes: Header, Footer, WhatsApp flotante
- [x] Secciones: Hero, Problema/Solución, Sobre Pablo, Servicios, Proceso, TrustSignals, Testimonios, Formulario, FAQ
- [x] Formulario con validación Zod + RGPD
- [x] API route `/api/contacto`
- [x] Schema.org: Person, MedicalBusiness, FAQPage, BreadcrumbList
- [x] Sitemap + robots.txt automáticos
- [x] Página Política de Privacidad
- [ ] **Página Aviso Legal** ← pendiente
- [ ] **Página Política de Cookies** ← pendiente
- [ ] **Security headers** en next.config.ts ← pendiente

### Contenido / Datos
- [ ] Sustituir todos los `[PENDIENTE]` con datos reales de Pablo
- [ ] Foto profesional de alta calidad
- [ ] Favicon y og-image (1200×630px)
- [ ] Testimonios reales autorizados

### Integraciones
- [ ] Servicio de email (Resend recomendado) en API route
- [ ] Almacenamiento de leads (Supabase o equivalente)
- [ ] Dominio definitivo configurado en Vercel

### Validación pre-lanzamiento
- [ ] Lighthouse: LCP < 2.5s, CLS < 0.1, Accesibilidad > 90
- [ ] Test formulario end-to-end
- [ ] Test móvil (iOS Safari + Android Chrome)
- [ ] Revisión legal Aviso Legal + Política de Privacidad
- [ ] Google Search Console verificado

---

## FASE 2 — Optimización y Conversión (semanas 4–8)

**Objetivo:** Mejorar tasa de conversión. Activar tráfico de pago.

### Analítica
- [ ] Google Analytics 4 (evento: form_submit, whatsapp_click, cta_click)
- [ ] Google Tag Manager
- [ ] Google Search Console
- [ ] Heatmap básico (Hotjar o Microsoft Clarity — gratuito)

### Campañas de pago
- [ ] Google Ads: campaña transaccional nacional
- [ ] Google Ads: campaña local (Sevilla + 3–5 provincias prioritarias)
- [ ] Meta Ads: Lead Ads test con presupuesto mínimo
- [ ] UTM tracking configurado en todos los canales

### Técnico
- [ ] Consent Mode v2 (banner de cookies conforme RGPD)
- [ ] Protección anti-spam en formulario (Cloudflare Turnstile — gratuito)
- [ ] Página de agradecimiento tras envío (para pixel de conversión)
- [ ] Meta Conversions API (server-side tracking)

### Contenido
- [ ] Añadir 3–5 reseñas reales verificadas
- [ ] Casos de éxito anonimizados (si disponibles)
- [ ] Mejorar sección "Sobre Pablo" con foto real y bio definitiva

---

## FASE 3 — Páginas de Especialidad (semana 8–16)

**Objetivo:** Captar tráfico SEO long-tail por tipo de caso.

- [ ] `/peritaje-accidentes-trafico`
- [ ] `/valoracion-dano-corporal`
- [ ] `/negligencias-medicas`
- [ ] `/accidentes-laborales`
- [ ] `/valoracion-secuelas`
- [ ] `/informes-periciales`

Cada página incluye:
- Contenido específico (800–1200 palabras)
- Schema.org `Service`
- Formulario de captación
- FAQ específica
- Internal links a página principal y otras especialidades

---

## FASE 4 — Páginas Locales (semana 16–24)

**Objetivo:** Captar tráfico local en las principales ciudades.

Prioridad según volumen de búsqueda:
1. `/perito-medico-madrid`
2. `/perito-medico-barcelona`
3. `/perito-medico-sevilla`
4. `/perito-medico-malaga`
5. `/perito-medico-valencia`
6. `/perito-medico-bilbao`
7. `/perito-medico-zaragoza`
8. `/perito-medico-murcia`

---

## FASE 5 — Blog y Contenido SEO (semana 24+)

**Objetivo:** Captar tráfico TOFU/MOFU informacional. Reforzar E-E-A-T con contenido de autor firmado por Pablo.

### Principios de contenido YMYL + E-E-A-T (obligatorios en todo el contenido)

- **Autoría visible:** Cada artículo y página firmada por Pablo con foto, nº de colegiado, formación y fecha de revisión ("Revisado por Dr. Pablo [Apellido] — [Fecha]").
- **Disclaimer:** "Esta información es de carácter general y no sustituye el asesoramiento profesional individualizado."
- **Fuentes citadas** cuando se mencionen datos estadísticos o legales.
- **Schema.org obligatorio:** `FAQPage` en páginas con FAQ, `Article` con `author` en blog, `ProfessionalService` en landing.
- **Actualización:** Revisión de contenido cada 6 meses como mínimo.

### Keyword strategy

| Tipo | Keywords |
|------|----------|
| Principal | perito médico España, peritaje médico |
| Secundarias altas | perito médico judicial, informe pericial médico, valoración daño corporal, perito accidente tráfico, negligencia médica perito |
| Long-tail | qué es un perito médico en accidente de tráfico, cuánto tarda un informe pericial médico, perito médico online España |
| Variaciones naturales | peritaje médico judicial, médico perito, médico forense privado |

### Artículos prioritarios (informacional — TOFU)

1. "Qué es un perito médico y para qué sirve" ← [keyword: perito médico qué es]
2. "Diferencia entre perito de parte y perito judicial en España"
3. "Cómo elegir un perito médico de confianza: 7 claves"
4. "Plazos para reclamar indemnización por accidente de tráfico"
5. "¿Qué es la valoración del daño corporal?"
6. "Negligencias médicas más frecuentes: cómo demostrarlas con un perito"

### Artículos comerciales (MOFU)

1. "Proceso completo para obtener un informe pericial médico"
2. "¿Cuánto cuesta un perito médico independiente? (guía de precios orientativos)"
3. "¿Es necesario ratificar el informe pericial en juicio?"
4. "Ventajas de contratar un perito médico independiente frente al de la aseguradora"

### Artículos de tráfico orgánico (long-tail)

1. "Baremo de tráfico: cómo se calcula la indemnización por lesiones"
2. "Cómo reclamar una indemnización por accidente de tráfico en España"
3. "Plazos para reclamar después de un accidente de tráfico"

### Formato estándar de artículo

- Longitud: 1.800–3.500 palabras
- Estructura: Introducción empática → pasos/tabla visual → sección E-E-A-T del autor → FAQ con schema → CTA claro
- Imágenes: WebP optimizadas, lazy loading
- Internal links: hacia landing y páginas satélite relacionadas

### Calendario orientativo

| Semanas | Acciones |
|---------|----------|
| 1–4 | Landing optimizada + 4–5 páginas satélite principales |
| 5–8 | Artículos 1–5 del blog |
| 9–16 | Artículos 6–10 + páginas locales prioritarias |
| 16–24 | Artículos 11–13 + optimización interna (enlaces entre páginas) |
| 24+ | 2 artículos nuevos/mes + revisión trimestral de E-E-A-T |

---

## FASE 6 — Automatizaciones y Escalabilidad (semana 32+)

- [ ] CRM básico para gestión de leads (Notion o Pipedrive)
- [ ] Secuencia de email automatizada post-lead
- [ ] WhatsApp Business API (mensajes automáticos)
- [ ] Dashboard de métricas (conversión por canal, coste por lead)
- [ ] Programa de afiliados / red de abogados asociados

---

## KPIs a medir desde el día 1

| KPI | Objetivo Fase 1 | Objetivo Fase 2 |
|-----|-----------------|-----------------|
| Tasa de conversión formulario | > 3% | > 6% |
| Leads/mes | > 10 | > 40 |
| Coste por lead (pago) | < 30€ | < 20€ |
| LCP (Lighthouse) | < 2.5s | < 2s |
| Posición "perito médico España" | Top 50 | Top 20 |
| Posición "perito médico Sevilla" | Top 10 | Top 5 |

---

## Estimación de inversión inicial

| Concepto | Coste estimado | Notas |
|----------|---------------|-------|
| Dominio (.es o .com) | 10–15€/año | — |
| Vercel Pro (si escala) | 20€/mes | Free tier suficiente para empezar |
| Resend (email leads) | 0€ (hasta 3k/mes) | Plan gratuito suficiente para Fase 1 |
| Supabase (leads DB) | 0€ (Free tier) | 500MB, suficiente para Fase 1–2 |
| Google Ads (test) | 300–500€/mes | Para validar el canal |
| Meta Ads (test) | 100–200€/mes | Para validar el canal |
| Total mes 1–2 | ~450–750€ | Sin diseño ni desarrollo adicional |
