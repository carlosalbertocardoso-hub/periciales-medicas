# CRO — Formulario, estructura de página y CTAs — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mover el formulario a la posición 6 de la página, añadir un bloque puente de objeciones antes de él, y conectar el enlace ghost del hero con el chatbot mediante un custom DOM event.

**Architecture:** 4 cambios independientes que se pueden aplicar en orden sin dependencias cruzadas: (1) nuevo componente BloquePuente, (2) reordenar page.tsx, (3) actualizar Hero con enlace ghost + evento DOM, (4) actualizar ChatbotGuiado para escuchar el evento.

**Tech Stack:** Next.js 16 App Router · TypeScript · Tailwind CSS v4 · lucide-react

---

## File map

| Fichero | Acción |
|---|---|
| `components/sections/BloquePuente.tsx` | Crear — nuevo componente puente de objeciones |
| `app/page.tsx` | Modificar — reordenar secciones, añadir `<BloquePuente />` |
| `components/sections/Hero.tsx` | Modificar — añadir enlace ghost que dispara evento DOM |
| `components/ui/ChatbotGuiado.tsx` | Modificar — escuchar evento `open-chatbot` en `useEffect` |

---

## Task 1: Crear BloquePuente

**Files:**
- Create: `components/sections/BloquePuente.tsx`

- [ ] **Paso 1: Crear el componente**

Crear `components/sections/BloquePuente.tsx` con este contenido exacto:

```tsx
import { FileText, Lock, Clock, ArrowRight } from "lucide-react";

const objeciones = [
  {
    icon: FileText,
    text: "No necesitas tener toda la documentación ahora — con lo que tengas es suficiente para empezar.",
  },
  {
    icon: Lock,
    text: "Todo lo que compartes es estrictamente confidencial y no se cede a terceros.",
  },
  {
    icon: Clock,
    text: "Respondo en menos de 24 horas por email. Sin llamadas, sin compromisos.",
  },
];

export function BloquePuente() {
  return (
    <section
      className="py-12 sm:py-16 bg-white border-y border-[#E5E7EB]"
      aria-label="Preguntas frecuentes antes del contacto"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A2E] mb-2">
          ¿No estás seguro de si tu caso tiene base?
        </h2>
        <p className="text-[#6B7280] text-sm mb-8">
          Estas son las dudas más comunes antes de enviar un caso.
        </p>

        <ul className="flex flex-col sm:flex-row gap-6 justify-center mb-10 text-left">
          {objeciones.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex-1 flex gap-3 items-start bg-[#F7F8FA] rounded-xl p-5 border border-[#E5E7EB]"
            >
              <div className="w-8 h-8 rounded-lg bg-[#EEF2F8] flex items-center justify-center shrink-0">
                <Icon size={16} className="text-[#1B3A6B]" />
              </div>
              <p className="text-[#374151] text-sm leading-relaxed">{text}</p>
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          className="inline-flex items-center gap-2 text-[#1A9E6B] font-semibold text-sm hover:text-[#158A5C] transition-colors group"
        >
          Enviar mi caso
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Paso 2: Verificar en browser**

El dev server ya está corriendo en `http://localhost:3000`. El componente no aparece todavía porque no está importado — eso se hace en el Task 2. Este paso es solo confirmar que el fichero no tiene errores de TypeScript:

```powershell
cd "c:\Users\ccard\Proyectos\Periciales Médicas\perito-medico-sevilla"
npx tsc --noEmit 2>&1 | Select-String "BloquePuente"
```

Resultado esperado: sin output (sin errores).

- [ ] **Paso 3: Commit**

```powershell
git add components/sections/BloquePuente.tsx
git commit -m "feat: add BloquePuente objection-handling section"
```

---

## Task 2: Reordenar page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Paso 1: Reemplazar el contenido de `app/page.tsx`**

Sustituir el contenido completo por:

```tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatbotGuiado } from "@/components/ui/ChatbotGuiado";
import { Hero } from "@/components/sections/Hero";
import { TrustStats } from "@/components/sections/TrustStats";
import { ProblemaSolucion } from "@/components/sections/ProblemaSolucion";
import { Servicios } from "@/components/sections/Servicios";
import { BloquePuente } from "@/components/sections/BloquePuente";
import { Formulario } from "@/components/sections/Formulario";
import { SobrePablo } from "@/components/sections/SobrePablo";
import { Proceso } from "@/components/sections/Proceso";
import { Testimonios } from "@/components/sections/Testimonios";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { FAQ } from "@/components/sections/FAQ";
import { JsonLd } from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="main-content">
        <Hero />
        <TrustStats />
        <ProblemaSolucion />
        <Servicios />
        <BloquePuente />
        <Formulario />
        <SobrePablo />
        <Proceso />
        <Testimonios />
        <TrustSignals />
        <FAQ />
      </main>
      <Footer />
      <ChatbotGuiado />
    </>
  );
}
```

- [ ] **Paso 2: Verificar en browser**

Abrir `http://localhost:3000` y hacer scroll. Comprobar que:
- El bloque de 3 cards (objeciones) aparece después de Servicios
- El formulario aparece inmediatamente después del bloque puente
- La sección "Sobre Pablo" aparece después del formulario

- [ ] **Paso 3: Commit**

```powershell
git add app/page.tsx
git commit -m "feat: move Formulario to position 6, add BloquePuente before it"
```

---

## Task 3: Enlace ghost en Hero + evento DOM

**Files:**
- Modify: `components/sections/Hero.tsx`

El hero es un Server Component (sin `"use client"`). El enlace ghost necesita disparar `window.dispatchEvent(new CustomEvent('open-chatbot'))`. Para eso se necesita un pequeño Client Component inline — un botón que maneje el click.

- [ ] **Paso 1: Sustituir el bloque CTAs del Hero**

En `components/sections/Hero.tsx`, localizar el bloque:

```tsx
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2.5 bg-[#1A9E6B] hover:bg-[#158A5C] text-white font-bold px-8 py-4 rounded-xl text-base shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200"
              >
                Enviar mi caso
                <ArrowRight size={17} />
              </a>
            </div>
```

Reemplazarlo por:

```tsx
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2.5 bg-[#1A9E6B] hover:bg-[#158A5C] text-white font-bold px-8 py-4 rounded-xl text-base shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200"
              >
                Enviar mi caso
                <ArrowRight size={17} />
              </a>
              <OpenChatbotLink />
            </div>
```

- [ ] **Paso 2: Añadir el Client Component `OpenChatbotLink` al mismo fichero**

Al inicio de `components/sections/Hero.tsx`, añadir la directiva `"use client"` NO es posible porque afectaría al componente entero. En su lugar, crear el subcomponente en un fichero separado:

Crear `components/ui/OpenChatbotLink.tsx`:

```tsx
"use client";

export function OpenChatbotLink() {
  function handleClick() {
    window.dispatchEvent(new CustomEvent("open-chatbot"));
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-white/65 hover:text-white text-sm font-medium underline underline-offset-4 decoration-white/30 hover:decoration-white/70 transition-all duration-200 cursor-pointer"
    >
      ¿Necesito un perito?
    </button>
  );
}
```

- [ ] **Paso 3: Importar `OpenChatbotLink` en Hero.tsx**

Añadir al inicio de `components/sections/Hero.tsx`:

```tsx
import { OpenChatbotLink } from "@/components/ui/OpenChatbotLink";
```

- [ ] **Paso 4: Verificar en browser**

Abrir `http://localhost:3000`. En el hero debe aparecer:
- Botón verde "Enviar mi caso →"
- Enlace texto "¿Necesito un perito?" a su derecha (desktop) o debajo (mobile)

Hacer clic en "¿Necesito un perito?" — el chatbot NO se abre todavía (el listener se añade en Task 4). No es un error.

- [ ] **Paso 5: Commit**

```powershell
git add components/sections/Hero.tsx components/ui/OpenChatbotLink.tsx
git commit -m "feat: add ghost CTA to hero that fires open-chatbot DOM event"
```

---

## Task 4: ChatbotGuiado escucha el evento DOM

**Files:**
- Modify: `components/ui/ChatbotGuiado.tsx`

- [ ] **Paso 1: Añadir el listener en el useEffect de ChatbotGuiado**

En `components/ui/ChatbotGuiado.tsx`, localizar el `useEffect` existente:

```tsx
  useEffect(() => {
    if (open && history.length === 0) {
      setHistory([{ role: "bot", text: FLOW.start.message }]);
      setNodeId("start");
      setStack([]);
    }
  }, [open, history.length]);
```

Añadir un segundo `useEffect` justo debajo:

```tsx
  useEffect(() => {
    function handleOpenEvent() {
      setOpen(true);
    }
    window.addEventListener("open-chatbot", handleOpenEvent);
    return () => window.removeEventListener("open-chatbot", handleOpenEvent);
  }, []);
```

- [ ] **Paso 2: Verificar en browser**

Abrir `http://localhost:3000`. Hacer clic en "¿Necesito un perito?" en el hero. El chatbot debe abrirse inmediatamente mostrando el mensaje inicial.

Verificar también que el botón flotante "¿Necesito un perito?" del pie de página sigue funcionando.

- [ ] **Paso 3: Commit**

```powershell
git add components/ui/ChatbotGuiado.tsx
git commit -m "feat: ChatbotGuiado opens on open-chatbot DOM event from hero"
```

---

## Verificación final

- [ ] Abrir `http://localhost:3000` en desktop y mobile
- [ ] Confirmar que el formulario aparece antes del 50% del scroll total de la página
- [ ] Confirmar que no hay más de un CTA primario (verde) visible simultáneamente
- [ ] Confirmar que el bloque puente muestra las 3 cards de objeciones
- [ ] Confirmar que "¿Necesito un perito?" en el hero abre el chatbot
- [ ] Confirmar que el botón flotante del chatbot sigue funcionando
- [ ] Confirmar que `npx tsc --noEmit` no devuelve errores
