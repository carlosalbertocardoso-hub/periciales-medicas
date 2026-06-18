# GTM Setup — Tu Checklist

Pasos que **TÚ** debes hacer en cuentas Google. Lo que está en ✅ ya está hecho en el código.

---

## ✅ Código (YA HECHO)

- [x] Instalado `@next/third-parties`
- [x] GoogleTagManager integrado en `components/analytics/Analytics.tsx`
- [x] Consent Mode v2 configurado (respeta banner de cookies)
- [x] `lib/gtm-events.ts` con funciones de tracking
- [x] Formularios rastrean `form_submitted` event
- [x] `.env.example` actualizado con variables necesarias
- [x] Script de verificación (`npm run verify:gtm`)
- [x] Build pasa sin errores

---

## ⚠️ TU TURNO — Pasos manuales en Google

### PASO 1️⃣: Crear cuenta en Google Tag Manager
**Tiempo: ~5 min**

1. Ve a [Google Tag Manager](https://tagmanager.google.com/)
2. Click **"Crear cuenta"**
3. Nombre: `Periciales Médicas`
4. País: `España`
5. Contenedor: `pericialesmedicas.es`
6. Plataforma: **Web**
7. Acepta términos
8. **Copia el GTM ID** que aparece (formato `GTM-XXXXXXX`)

👉 **Guarda este GTM ID — lo necesitarás en 5 minutos**

---

### PASO 2️⃣: Configurar variables en Vercel
**Tiempo: ~3 min**

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard/projects)
2. Click proyecto **`periciales-medicas`** (NOT el deprecated `perito-medico-sevilla`)
3. Settings → Environment Variables
4. Añade nueva variable:
   ```
   Name:  NEXT_PUBLIC_GTM_ID
   Value: GTM-XXXXXXX  (el que copiaste arriba)
   ```
5. Environments: Marca **Production** (y Development si quieres testear localmente)
6. **Save**
7. Espera a que Redeploy termine (o push a master para triggear deploy)

✅ GTM ya está funcionando en producción.

---

### PASO 3️⃣: Conectar Google Analytics 4 (GA4)
**Tiempo: ~10 min**

#### 3A. Crear propiedad GA4

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Admin → **"Crear propiedad"**
3. Nombre: `Periciales Médicas`
4. Reportería timezone: `Europa/Madrid`
5. Moneda: `EUR`
6. Industria: Ej. Servicios Profesionales
7. **Create**
8. **Copia el Measurement ID** (formato `G-XXXXXXXXXX`)

#### 3B. Conectar GA4 a GTM

1. Vuelve a [Google Tag Manager](https://tagmanager.google.com/)
2. Selecciona tu contenedor `pericialesmedicas.es`
3. **Tags** → **Nuevo** → Name: `GA4 - Config`
4. Tag Config:
   - Tipo: **Google Analytics: GA4 Configuration**
   - Measurement ID: `G-XXXXXXXXXX` (pégalo aquí)
5. Triggering: **All Pages**
6. **Save**
7. Click **"PUBLICAR"** (arriba derecha)
   - Descripción: `Conectar GA4`
   - **Publicar**

✅ GA4 ya carga automáticamente en todas las páginas.

---

### PASO 4️⃣: Configurar evento `form_submitted` en GTM
**Tiempo: ~5 min**

1. GTM → **Tags** → **Nuevo** → Name: `GA4 - Form Submission`
2. Tag Config:
   - Tipo: **Google Analytics: GA4 Event**
   - Measurement ID: `G-XXXXXXXXXX` (el mismo de antes)
   - Event Name: `form_submitted`
3. Event Parameters:
   - Click **"Más"** para expandir
   - `form_name` → `{{form_name}}`
   - `email` → `{{email}}`
   - `form_type` → `{{form_type}}`
4. Triggering: **Custom Event**
   - Event name: `form_submitted`
5. **Save**
6. **PUBLICAR** (con descripción: `Trackear submissions`)

✅ Cada envío de formulario se registra en GA4.

---

### PASO 5️⃣: Verificar en Google Search Console
**Tiempo: ~10 min**

#### 5A. Verificar dominio

1. Ve a [Google Search Console](https://search.google.com/search-console)
2. **"Agregar propiedad"**
3. Type: **URL prefix**
4. URL: `https://pericialesmedicas.es`
5. **Continuar**
6. Verification method: **HTML tag** (recomendado)
7. Copia el `content` del tag meta (es un texto largo)

#### 5B. Pegar verificación en Vercel

1. Vercel → Environment Variables
2. Añade:
   ```
   Name:  NEXT_PUBLIC_GSC_VERIFICATION
   Value: [el content que copiaste]
   ```
3. **Save**
4. **Redeploy** o espera al próximo push

#### 5C. Confirmar en GSC

1. Vuelve a GSC
2. Click **"Verificar"**
3. ✅ Debería decir "Propiedad verificada"

---

### PASO 6️⃣: Vincular GSC con GA4
**Tiempo: ~3 min**

1. Google Analytics → Admin → Propiedad Settings
2. Scroll abajo → **"Google Search Console linking"**
3. Click **"Vincular"**
4. Selecciona `pericialesmedicas.es`
5. **Vincular**

✅ Ahora GA4 recibe datos de búsqueda orgánica desde GSC.

---

## 🧪 Verificar que todo funciona

### Test 1: ¿GTM cargó?

```bash
npm run dev
```

1. Open `http://localhost:3000`
2. F12 → Console
3. Type: `dataLayer`
4. Deberías ver un array con eventos

### Test 2: ¿Form submission se registra?

1. Ir a `/consulta` o `/negligencias-medicas`
2. Rellenar formulario
3. Submit
4. Console: `dataLayer[dataLayer.length - 1]`
5. Deberías ver:
   ```js
   {
     event: 'form_submitted',
     form_name: 'consulta',
     email: '...',
     form_type: 'consulta',
     timestamp: 123456789
   }
   ```

### Test 3: ¿GA4 lo ve?

1. Google Analytics → Realtime
2. Espera 30 segundos
3. Deberías ver visita en vivo + el evento `form_submitted`

---

## ⏰ Timeline

- **Day 0 (HOY)**: Pasos 1-3 (~15 min)
- **Day 1**: Pasos 4-6 (~20 min)
- **Day 2-3**: Esperar a que GSC indexe y GA4 tenga datos
- **Day 4+**: Dashboards disponibles, puedes empezar a optimizar

---

## 🆘 Problemas?

| Problema | Solución |
|----------|----------|
| GTM ID no funciona | Verifica formato `GTM-XXXXX`, copia-pega sin espacios |
| GA4 no ve eventos | Espera 24h (GTM tarda), o verifica Console para `dataLayer` events |
| GSC dice "no verificado" | Redeploy en Vercel después de añadir `NEXT_PUBLIC_GSC_VERIFICATION` |
| Search Console vacío | Normal después de verificar. Tardará 48h en indexar. |

---

## 📚 Documentación completa

Ver [GTM-SETUP.md](./GTM-SETUP.md) para detalles técnicos, troubleshooting avanzado y screenshots.

---

**¿Necesitas ayuda?** Ejecuta:
```bash
npm run verify:gtm
```

Te dirá si algo está mal en la configuración local.
