# CRO — Formulario, estructura de página y CTAs

**Fecha:** 2026-06-05
**Proyecto:** Landing page Perito Médico Pablo
**Objetivo:** Reducir friction entre el primer CTA y el formulario, mejorar jerarquía visual y aumentar tasa de envío.

---

## Problema actual

- El formulario está en posición 9 de 10 secciones (~8 pantallas de scroll desde el hero).
- El CTA del hero lleva al formulario pero el usuario tiene que scrollar toda la página antes de llegar.
- No hay ningún elemento que resuelva objeciones antes de pedir la acción.
- El sticky header tiene un botón de teléfono que ya no existe y un CTA con copy incorrecto.

---

## Estructura de página (decisión B)

Nuevo orden de secciones en `app/page.tsx`:

```
1. Hero
2. TrustStats
3. ProblemaSolucion
4. Servicios
5. BloquePuente          ← nuevo componente
6. Formulario            ← sube desde posición 9
7. SobrePablo
8. Proceso
9. Testimonios
10. FAQ                  ← CTA al final de FAQ
```

**Razonamiento:** El usuario entiende el valor (secciones 1–4) antes de que se le pida actuar, pero sin esperar demasiado. `SobrePablo`, `Proceso` y `Testimonios` quedan después del formulario como refuerzo para quien no convirtió en el primer pase.

---

## Nuevo componente: BloquePuente

Sección ligera (sin ID de navegación) entre `Servicios` y `Formulario`. Fondo blanco o gris muy claro. Contenido:

**Titular:** "¿No estás seguro de si tu caso tiene base?"

**3 bullets que eliminan objeciones:**
1. 📄 "No necesitas tener toda la documentación ahora — con lo que tengas es suficiente para empezar."
2. 🔒 "Todo lo que compartes es estrictamente confidencial y no se cede a terceros."
3. ⏱ "Respondo en menos de 24 horas por email. Sin llamadas, sin compromisos."

**Micro-CTA al pie:** enlace texto "→ Enviar mi caso" que hace scroll al formulario.

Este bloque no tiene sección propia en el nav. Es un puente visual, no una sección de contenido.

---

## Hero CTAs (decisión A)

### CTA principal
- **Texto:** "Enviar mi caso →"
- **Estilo:** botón verde `#1A9E6B`, mismo que ahora
- **Destino:** `#contacto`

### Micro-acción secundaria
- **Texto:** "¿Necesito un perito?"
- **Estilo:** enlace ghost (sin borde, sin fondo), color `#1A9E6B` o `text-white/70`
- **Acción:** abre el `ChatbotGuiado` programáticamente (el chatbot necesita exponer una función `open()` o estado externo)
- **Posición:** a la derecha o debajo del botón principal, mismo nivel visual

### Eliminar del hero
- El bloque de "razones editoriales" de la columna derecha desktop puede quedarse, pero su CTA interno ("Envía tu documentación") también apunta a `#contacto`, no necesita cambio.

---

## Sticky header (decisión A)

### Cambios
- **Eliminar:** número de teléfono (ya eliminado en sesión anterior)
- **CTA único:** botón verde "Enviar mi caso →" → `#contacto`
- **Mobile:** mismo botón en el menú desplegable, eliminado el botón de llamada

No hay segundo botón ni píldora informativa. Jerarquía única: un solo punto de entrada visible.

---

## CTA al pie de FAQ

La sección FAQ ya tiene un CTA "Escríbeme directamente" → `#contacto`. Mantener tal cual, es correcto.

---

## ChatbotGuiado — integración con hero

El enlace ghost del hero necesita abrir el chatbot sin que el usuario haga clic en el botón flotante. Dos opciones de implementación:

**Opción 1 (recomendada):** Elevar el estado `open` del chatbot a un contexto React o Zustand store, y exponer un método `openChatbot()` que el hero pueda llamar.

**Opción 2:** Usar un custom event del DOM (`window.dispatchEvent(new CustomEvent('open-chatbot'))`), que el chatbot escucha con `useEffect`. Sin dependencia de estado compartido, más simple.

Se elige **Opción 2** por simplicidad — no hay otros consumidores del estado del chatbot.

---

## Cambios de ficheros afectados

| Fichero | Cambio |
|---|---|
| `app/page.tsx` | Reordenar secciones, añadir `<BloquePuente />` |
| `components/sections/BloquePuente.tsx` | Crear nuevo componente |
| `components/sections/Hero.tsx` | Añadir enlace ghost, conectar a evento DOM |
| `components/ui/ChatbotGuiado.tsx` | Escuchar evento `open-chatbot` para abrirse |
| `components/layout/Header.tsx` | Limpiar CTA (ya hecho), verificar copy |

---

## Criterios de éxito

- El formulario aparece antes del scroll 50% de la página en desktop.
- No hay más de un CTA primario visible simultáneamente en cualquier viewport.
- El bloque puente responde visualmente las 3 objeciones sin añadir más de una pantalla de contenido.
- El chatbot se abre al pulsar el enlace ghost del hero.
