# Google Tag Manager (GTM) + Analytics + Search Console Setup

Guía completa para configurar Google Tag Manager, vincular Google Analytics 4 y Google Search Console en el proyecto.

## 1. Crear/Acceder a Google Tag Manager

### 1.1 Crear cuenta GTM
1. Ir a [Google Tag Manager](https://tagmanager.google.com/)
2. Click en **"Crear cuenta"**
3. Nombre de la cuenta: `Periciales Médicas`
4. País: `España`
5. Click **"Crear"**
6. Contenedor Name: `pericialesmedicas.es`
7. Elegir plataforma: **Web**
8. Click **"Crear"**

### 1.2 Obtener GTM ID
1. Acepta los términos de servicio
2. Verás el **GTM ID** en formato `GTM-XXXXXXX`
3. **Copia este ID** — lo necesitarás para las variables de entorno

## 2. Configurar variables de entorno en Vercel

1. Ve al dashboard de Vercel: [Vercel Projects](https://vercel.com/dashboard/projects)
2. Selecciona el proyecto **`periciales-medicas`** (NO el deprecated `perito-medico-sevilla`)
3. Settings → Environment Variables
4. Añade o actualiza estas variables (solo Production si quieres):

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX        # Tu ID de GTM copiado arriba
NEXT_PUBLIC_GSC_VERIFICATION=google1234567890abcdef  # Obtendrás esto del paso 4
```

5. Guarda los cambios
6. **Redeploy** manualmente o espera al próximo push a `master`

## 3. Conectar Google Analytics 4 en GTM

### 3.1 Crear propiedad GA4 (si no existe)
1. Ir a [Google Analytics](https://analytics.google.com/)
2. Click **"Administración"** → **"Crear propiedad"**
3. Nombre: `Periciales Médicas`
4. Reportería zona horaria: `Europa/Madrid`
5. Moneda: `EUR`
6. Click **"Crear propiedad"**
7. Selecciona industria relevante (ej. Servicios Profesionales)
8. Talla empresa: Tu preferencia
9. Usa: GA4
10. Click **"Crear"**
11. Copia el **Measurement ID** (formato `G-XXXXXXXXXX`)

### 3.2 Añadir GA4 a GTM
1. Vuelve a [Google Tag Manager](https://tagmanager.google.com/)
2. Selecciona tu contenedor `pericialesmedicas.es`
3. Left sidebar → **"Tags"** → **"Nuevo"**
4. Name: `GA4 - Page View`
5. Tag Configuration → Google Analytics: GA4 Configuration
6. Measurement ID: Pega el `G-XXXXXXXXXX` de Analytics
7. Click **"Crear"**
8. Triggering: All Pages
9. Click **"Guardar"**

### 3.3 Configurar eventos custom en GTM (form_submitted)
1. GTM → Tags → Nuevo
2. Name: `GA4 - Form Submission`
3. Tag Configuration → Google Analytics: GA4 Event
4. Measurement ID: `G-XXXXXXXXXX` (el mismo de antes)
5. Event Name: `form_submitted`
6. **Event Parameters** (Expandir "Más"):
   - `form_name` = `{{form_name}}` (variable)
   - `email` = `{{email}}` (variable)
   - `form_type` = `{{form_type}}` (variable)
7. Click **"Crear"**
8. Triggering: Custom Event → Event name = `form_submitted`
9. Click **"Guardar"**

### 3.4 Crear variables en GTM para capturar datos del dataLayer
1. GTM → Variables → Nuevo
2. Name: `form_name`
3. Variable Configuration → Data Layer Variable
4. Variable Name: `form_name`
5. Click **"Guardar"** (x3 para email, form_type)

### 3.5 Publicar cambios en GTM
1. Click **"PUBLICAR"** (arriba a la derecha)
2. Descripción: `Conectar GA4 y eventos form_submitted`
3. Click **"Publicar"**

## 4. Vincular Google Search Console

### 4.1 Verificar dominio en Google Search Console
1. Ir a [Google Search Console](https://search.google.com/search-console)
2. Click **"Agregar propiedad"**
3. Type: **URL prefix**
4. URL: `https://pericialesmedicas.es`
5. Click **"Continuar"**
6. Verification method: **HTML tag** (or otro método que prefieras)
7. Si usas HTML tag:
   - Copia el `content` del atributo `meta name="google-site-verification"`
   - Ese valor va en `NEXT_PUBLIC_GSC_VERIFICATION` en Vercel
   - El código ya está en `app/layout.tsx` usando esa variable
8. Pégalo en `.env.example` y en Vercel
9. Click **"Verificar"** en GSC

### 4.2 Vincular GSC con Google Analytics
1. Google Analytics → Administración → Configuración de propiedad
2. En el footer, verás **"Google Search Console linking"**
3. Click **"Vincular"**
4. Selecciona tu propiedad GSC (`pericialesmedicas.es`)
5. Click **"Siguiente"** → **"Vincular"**

## 5. Verificación y testing

### 5.1 Comprobar que GTM se carga
1. Ir a `https://pericialesmedicas.es`
2. Abre DevTools (F12)
3. **Console** → escribe `dataLayer`
4. Deberías ver un array con eventos de consentimiento

### 5.2 Probar evento form_submitted
1. Rellenar un formulario (Consulta o Contacto)
2. Submeter
3. DevTools → Network → busca petición a GTM (sí, puedes verla)
4. Google Analytics (GA4) → Realtime → deberías ver el evento `form_submitted` en los últimos 30 segundos

### 5.3 Comprobar Search Console
1. Google Search Console → coverage
2. Sitewide stats aparecerán después de 24-48 horas
3. Puedes mandar URL manualmente con **"Inspeccionar URL"** para acelerar indexación

## 6. Monitoreo continuo

### 6.1 En Google Analytics
- **Realtime** → Ver tráfico en vivo y eventos
- **Reports** → Engagement → Events → `form_submitted`
- **Reports** → Acquisition → Traffic sources (viene de Search Console automáticamente)

### 6.2 En Google Search Console
- **Performance** → Ver impresiones y CTR en búsqueda de Google
- **Coverage** → Asegurar todas las páginas indexadas
- **Enhancements** → Validar markup (JSON-LD que ya tienes)

## 7. Troubleshooting

### GTM no carga
- Verifica `NEXT_PUBLIC_GTM_ID` está correcto en Vercel (sin espacios)
- `npm run dev` localmente: verifica en DevTools → Network → busca `gtm.js`
- Comprobar que el sitio está en modo de consentimiento (el banner de cookies)

### Evento form_submitted no aparece en GA4
- Verifica que `trackFormSubmission()` se ejecuta después de envío exitoso
- Comprobar que GTM está cargado (`dataLayer` en console)
- Puede haber delay de hasta 24-48h para el primer evento (después es casi inmediato)

### Google Search Console no ve tráfico
- Comprobar que GSC está vinculado a GA4 (paso 4.2)
- Esperar 48 horas después de verificar el dominio
- Si la URL es `pericialesmedicas.es`, asegúrate de que el sitio redirige `www.` y `http://` a `https://pericialesmedicas.es` (Vercel lo hace automáticamente)

## 8. Próximos pasos (opcional)

- **Goals/Conversions**: En GA4, marcar `form_submitted` como conversion
- **Audiences**: Crear segmentos de usuarios que han enviado formulario
- **Ads**: Si planeas publicidad, vincular GA4 con Google Ads desde aquí
- **Informes**: Crear dashboards personalizados con métricas clave (leads por página, provincias, etc.)

---

**Nota**: Todos los cambios en GTM requieren **"Publicar"** explícitamente. No afectan al sitio hasta publicar.
