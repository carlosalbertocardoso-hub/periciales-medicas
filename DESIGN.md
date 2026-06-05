# DESIGN SYSTEM — Perito Médico España

**Referencia visual:** TaxDown.es  
**Adaptación:** Servicio profesional individual (Dr. Pablo), sector médico-legal YMYL  
**Principio rector:** Autoridad médica + accesibilidad humana. Ni clínica fría ni despacho intimidante.

---

## 1. PALETA DE COLORES

### Colores principales

```css
/* Azul marino — confianza, autoridad médica, seriedad */
--color-primary:       #1B3A6B;   /* Fondo hero, CTAs principales */
--color-primary-dark:  #0F2347;   /* Hover de botones, footer */
--color-primary-light: #2D5AA0;   /* Acentos, iconos activos */

/* Blanco / gris claro — limpieza, espacio, legibilidad */
--color-bg:            #FFFFFF;
--color-bg-alt:        #F7F8FA;   /* Secciones alternadas (como TaxDown beige) */
--color-bg-subtle:     #EEF2F8;   /* Cards, formularios */

/* Acento verde — confianza, validación, CTA secundario */
--color-accent:        #1A9E6B;   /* Checkmarks, badges "verificado", CTA hover */
--color-accent-light:  #E8F7F1;   /* Fondo de badges/chips verdes */

/* Texto */
--color-text:          #1A1A2E;   /* Cuerpo principal */
--color-text-muted:    #6B7280;   /* Subtítulos, disclaimers */
--color-text-inverse:  #FFFFFF;   /* Sobre fondos oscuros */
```

### Uso por sección

| Sección | Fondo | Texto | Notas |
|---------|-------|-------|-------|
| Navbar | `#FFFFFF` | `--color-text` | Sombra sutil en scroll |
| Hero | `--color-primary` | `--color-text-inverse` | Gradiente sutil dark→primary |
| Problema/Solución | `--color-bg-alt` | `--color-text` | Fondo crema alternado |
| Servicios | `--color-bg` | `--color-text` | Cards con borde sutil |
| Sobre Pablo | `--color-bg-alt` | `--color-text` | Foto protagonista |
| Proceso | `--color-primary` | `--color-text-inverse` | Números grandes en contraste |
| Trust Signals | `--color-bg` | `--color-text` | Logos en gris neutro |
| Testimonios | `--color-bg-alt` | `--color-text` | Cards blancas sobre fondo crema |
| FAQ | `--color-bg` | `--color-text` | Acordeón limpio |
| Formulario | `--color-bg-subtle` | `--color-text` | Contenedor con sombra |
| Footer | `--color-primary-dark` | `--color-text-inverse` | |

---

## 2. TIPOGRAFÍA

**Fuente principal:** `Inter` (ya configurada en el proyecto)  
Fallback: `system-ui, -apple-system, sans-serif`

```css
/* Escala tipográfica */
--text-xs:   0.75rem;    /* 12px — disclaimers, footnotes */
--text-sm:   0.875rem;   /* 14px — labels, badges */
--text-base: 1rem;       /* 16px — cuerpo */
--text-lg:   1.125rem;   /* 18px — subtítulos, intro */
--text-xl:   1.25rem;    /* 20px — H3 */
--text-2xl:  1.5rem;     /* 24px — H2 sección */
--text-3xl:  1.875rem;   /* 30px — H2 hero sección */
--text-4xl:  2.25rem;    /* 36px — H1 sección */
--text-5xl:  3rem;       /* 48px — H1 hero desktop */

/* Pesos */
--font-regular:    400;
--font-medium:     500;
--font-semibold:   600;
--font-bold:       700;
--font-extrabold:  800;

/* Line height */
--leading-tight:  1.2;   /* Titulares grandes */
--leading-normal: 1.5;   /* Cuerpo */
--leading-relaxed:1.7;   /* Párrafos largos */
```

### Jerarquía visual en práctica

```
H1 Hero:      5xl / extrabold / leading-tight / color-text-inverse
H1 Sección:   4xl / bold / leading-tight / color-text
H2:           2xl–3xl / semibold / leading-tight / color-text
H3:           xl / semibold / color-text
Body:         base / regular / leading-relaxed / color-text
Muted:        sm / regular / color-text-muted
Badge/Label:  xs–sm / medium / uppercase tracking-wide
```

---

## 3. COMPONENTES UI

### Botones

```
Primario (CTA principal):
  bg: --color-accent (#1A9E6B)
  text: white
  border-radius: 8px
  padding: 14px 28px
  font: semibold / base
  hover: bg más oscuro (#158A5C)
  shadow: 0 4px 14px rgba(26, 158, 107, 0.3)

Secundario (ghost):
  bg: transparent
  border: 2px solid white (sobre fondo oscuro) o primary (sobre fondo claro)
  text: white / primary
  border-radius: 8px
  padding: 12px 26px
  hover: bg con opacidad 10%

Texto / Link:
  Subrayado solo en hover
  color: --color-primary-light
```

### Cards (servicios, especialidades)

```
bg: white
border: 1px solid #E5E7EB
border-radius: 12px
padding: 28px 24px
shadow: 0 2px 8px rgba(0,0,0,0.06)
hover: shadow más pronunciada + border color-primary-light
  transition: 200ms ease

Estructura interna:
  Icono (32px, color-primary-light) — arriba a la izquierda
  H3 (semibold) — 12px debajo del icono
  Párrafo muted — 8px debajo del H3
  Link "Saber más →" — al final, color-accent
```

### Testimonio card

```
bg: white
border-radius: 12px
padding: 24px
shadow: 0 2px 12px rgba(0,0,0,0.08)

Estructura:
  ★★★★★ (color: #F59E0B, tamaño: sm)
  Cita en comillas — body / leading-relaxed
  Separador hr sutil
  Foto redonda (40px) + Nombre (semibold) + Caso (muted, xs)
  Badge "Verificado ✓" (bg: accent-light, text: accent, xs, rounded-full)
```

### Badge / Chip de confianza

```
bg: --color-accent-light (#E8F7F1)
text: --color-accent (#1A9E6B)
border-radius: 999px (pill)
padding: 4px 12px
font: xs / medium
icon: ✓ o icono svg 14px
```

### Formulario de contacto

```
Contenedor:
  bg: white
  border-radius: 16px
  padding: 40px
  shadow: 0 8px 32px rgba(0,0,0,0.10)
  max-width: 560px

Inputs:
  border: 1px solid #D1D5DB
  border-radius: 8px
  padding: 12px 16px
  font: base
  focus: border-color primary + ring 2px accent/20%
  error: border-color #EF4444 + mensaje xs rojo

Label:
  sm / medium / color-text — encima del input (no placeholder como label)

Submit button:
  Ancho completo (w-full)
  Primario verde
  Texto: "Solicitar valoración gratuita →"
```

### Acordeón FAQ

```
Pregunta:
  padding: 20px 0
  border-bottom: 1px solid #E5E7EB
  font: base / semibold
  icono: + / − a la derecha (animado, 200ms)
  cursor: pointer

Respuesta (expandida):
  padding: 0 0 20px 0
  font: base / regular / leading-relaxed / color-text-muted
  animación: height 0 → auto, opacity 0 → 1, 250ms ease
```

---

## 4. SPACING Y LAYOUT

```css
/* Espaciado de secciones (vertical) */
--section-padding-y: 80px;          /* Desktop */
--section-padding-y-mobile: 48px;   /* Mobile */

/* Contenedor máximo */
--container-max: 1200px;
--container-px: 24px;               /* Padding lateral */

/* Grid de cards */
--grid-gap: 24px;
/* Desktop: 3 columnas | Tablet: 2 | Mobile: 1 */
```

---

## 5. ESTRUCTURA DE SECCIONES (Orden de la landing)

Replicando el flujo de conversión de TaxDown, adaptado al peritaje médico:

```
1. NAVBAR
   Logo (izquierda) | Links de navegación + "Llamar ahora" + "Solicitar informe" (derecha)
   Sticky con sombra al hacer scroll
   Mobile: hamburger menu

2. HERO
   Fondo: --color-primary (azul marino)
   Columna izquierda (60%):
     Badge chip: "Perito médico colegiado · España"
     H1: "Tu informe pericial médico, sin errores y en todo el territorio nacional"
     Subtítulo: Beneficio claro en 1-2 líneas
     CTA primario: "Solicitar valoración gratuita →" (verde)
     CTA secundario: "Llamar ahora" (ghost blanco)
     Trust strip: ★★★★★ "[N] casos resueltos" · "Colegiado nº XXXX" · "Cobertura nacional"
   Columna derecha (40%):
     Foto profesional de Pablo (con sombra/marco sutil)

3. LOGOS / TRUST BAR
   Fondo: --color-bg-alt
   "Reconocido por" + logos en gris: Colegios médicos, asociaciones periciales, medios
   (Si no hay logos reales aún: omitir o usar "Perito de parte en más de X tribunales")

4. PROBLEMA / SOLUCIÓN
   Fondo: --color-bg
   H2: "¿Tu seguro no te ofrece lo que mereces?"
   Grid 2 columnas: Problema (izquierda, icono rojo) → Solución con perito (derecha, icono verde)

5. SERVICIOS (Especialidades)
   Fondo: --color-bg-alt
   H2 centrado: "¿En qué te puedo ayudar?"
   Grid 3 columnas de cards (accidentes tráfico, daño corporal, negligencias, laboral, secuelas, informes)

6. SOBRE PABLO (E-E-A-T)
   Fondo: --color-bg
   Dos columnas: Foto grande (izquierda) + texto (derecha)
   Incluye: nº colegiado, formación, años de experiencia, número de casos
   Checklist con ✓: credenciales clave

7. PROCESO (Cómo funciona)
   Fondo: --color-primary (azul marino)
   Texto blanco
   3 pasos numerados (01, 02, 03) en grid horizontal
   01 Contacto → 02 Valoración → 03 Informe entregado

8. TESTIMONIOS
   Fondo: --color-bg-alt
   H2 centrado: "[N] pacientes defienden sus derechos"
   Carrusel horizontal de cards (3 visibles en desktop)
   Badge "Verificado ✓" en cada card

9. TRUST SIGNALS / ESTADÍSTICAS
   Fondo: --color-bg
   Fila de 4 estadísticas grandes: casos resueltos, años experiencia, cobertura, valoración media
   Tipografía: número en 4xl/bold/primary + label en sm/muted

10. FAQ
    Fondo: --color-bg-alt
    H2: "Preguntas frecuentes"
    Acordeón, máx 8 preguntas
    CTA al final: "¿No encuentras tu respuesta? Contáctame →"

11. FORMULARIO (CTA final)
    Fondo: --color-primary
    Texto blanco alrededor del formulario
    Tarjeta blanca central con formulario
    H2: "Solicita tu valoración gratuita"
    Campos: Nombre, Teléfono, Email, Tipo de caso (select), Mensaje (textarea)
    Submit: "Enviar solicitud →" (verde, ancho completo)
    Texto de confianza: "🔒 Tus datos están protegidos · RGPD · Sin compromiso"

12. FOOTER
    Fondo: --color-primary-dark
    Texto blanco
    Columnas: Logo + tagline | Servicios | Legal | Contacto
    Links legales: Aviso legal · Política de privacidad · Política de cookies
    Copyright: "© 2026 Pablo [Apellido] · Perito Médico Colegiado"
```

---

## 6. ICONOGRAFÍA

- **Estilo:** Outline (trazo 1.5–2px), sin relleno, redondeados
- **Librería recomendada:** `lucide-react` (ya disponible en el ecosistema Next.js)
- **Tamaños:** 20px (inline), 28px (cards), 40px (secciones destacadas)
- **Color:** `--color-primary-light` sobre fondos claros · `white` sobre fondos oscuros

### Iconos por sección

| Servicio | Icono Lucide |
|----------|-------------|
| Accidentes tráfico | `Car` |
| Daño corporal | `HeartPulse` |
| Negligencias médicas | `Stethoscope` |
| Accidentes laborales | `HardHat` |
| Valoración secuelas | `ClipboardList` |
| Informes periciales | `FileText` |

---

## 7. IMÁGENES Y MEDIA

- **Foto de Pablo:** Protagonista en hero (columna derecha) y sección "Sobre Pablo". Formato: traje o bata blanca, fondo neutro, expresión cercana pero profesional. Formato WebP, min 800px de ancho.
- **OG Image:** 1200×630px. Fondo azul marino. Logo + nombre + tagline en blanco. Foto de Pablo a la derecha.
- **Favicon:** Iniciales "PM" o escudo médico estilizado, sobre fondo azul marino.
- **Formatos:** Todo `next/image` con `formats: ['image/avif', 'image/webp']` (ya en `next.config.ts`).
- **Alt text:** Siempre descriptivo y con keyword cuando sea natural. Nunca vacío.

---

## 8. ANIMACIONES Y TRANSICIONES

Mínimas, funcionales. Nada que distraiga en contexto YMYL.

```css
/* Transición estándar para hover */
transition: all 200ms ease;

/* Entrada de sección (scroll) */
/* Usar Intersection Observer — fade-in + slide-up 20px */
animation: fadeInUp 400ms ease forwards;

/* Acordeón FAQ */
transition: height 250ms ease, opacity 250ms ease;

/* NO usar: parallax, rotaciones, efectos 3D */
/* Respetar prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

---

## 9. RESPONSIVE (Mobile-First)

```
Mobile (< 640px):
  - Hero: columna única, foto debajo del texto
  - Cards: 1 columna
  - Proceso: vertical (01 → 02 → 03 apilados)
  - Formulario: padding reducido, inputs full-width
  - Nav: hamburger menu

Tablet (640px–1024px):
  - Cards: 2 columnas
  - Hero: columna única o 55/45

Desktop (> 1024px):
  - Cards: 3 columnas
  - Hero: 60/40
  - Proceso: 3 columnas horizontales
```

---

## 10. DIFERENCIAS CLAVE RESPECTO A TAXDOWN

| TaxDown | Perito Médico Pablo |
|---------|---------------------|
| Verde esmeralda como primario | Azul marino como primario (autoridad médica) |
| Producto SaaS escalable | Profesional individual — foto de Pablo siempre visible |
| Hero con mockup de app | Hero con foto real del perito |
| "Empieza gratis" | "Solicitar valoración gratuita" |
| Perfil de usuario (carrusel) | Tipos de caso (cards de especialidad) |
| Calculadora interactiva | Formulario de contacto directo |
| Logos de medios generalistas | Credenciales de colegio médico + tribunales |
| Tono: tech + fiscal | Tono: médico + cercano + jurídico |

---

*Referencia: TaxDown.es · Adaptación YMYL médico-legal · Junio 2026*
