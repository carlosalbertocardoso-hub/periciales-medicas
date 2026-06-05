# PENDIENTES DE VALIDACIÓN

> Todos los `[PENDIENTE]` en el código deben sustituirse con los datos reales confirmados por Pablo **antes de publicar**.

---

## 2.1 Identidad profesional

| Campo | Estado | Notas |
|-------|--------|-------|
| Nombre completo y apellidos | ⏳ PENDIENTE | Para `<title>`, Schema.org y firma del informe |
| Denominación comercial / marca | ⏳ PENDIENTE | ¿Nombre propio o clínica/empresa? |
| Fotografía profesional alta calidad | ⏳ PENDIENTE | Mínimo 800×1000px, fondo neutro, formato WebP/JPG |
| Logotipo (si existe) | ⏳ PENDIENTE | SVG preferible, o PNG con fondo transparente |
| Número de colegiado | ⏳ PENDIENTE | Para Schema.org y pie de página |
| Colegio de Médicos | ⏳ PENDIENTE | Con qué colegio/provincia está colegiado |
| Especialidad médica | ⏳ PENDIENTE | Medicina Legal, Forense, Traumatología… |
| Formación y títulos acreditables | ⏳ PENDIENTE | Solo lo que se pueda demostrar |
| Años de experiencia en peritaje | ⏳ PENDIENTE | Número exacto, no aproximado |
| Número de informes realizados (si acreditable) | ⏳ PENDIENTE | Solo si existe registro |
| Experiencia judicial / tribunales | ⏳ PENDIENTE | Tipos de tribunales, ámbito |

---

## 2.2 Contacto

| Campo | Estado | Notas |
|-------|--------|-------|
| Teléfono principal | ⏳ PENDIENTE | Formato: +34 6XX XXX XXX |
| WhatsApp (¿mismo número?) | ⏳ PENDIENTE | Confirmar si es el mismo |
| Email de contacto | ⏳ PENDIENTE | Preferiblemente con dominio propio |
| Dirección física (si aplica) | ⏳ PENDIENTE | Para Schema.org LocalBusiness |
| URL definitiva / dominio | ⏳ PENDIENTE | Para canonical, OG, sitemap, Schema.org |
| Horario de atención | ⏳ PENDIENTE | Para Schema.org y footer |
| Google Business Profile | ⏳ PENDIENTE | Para reseñas y SEO local |
| Redes sociales activas | ⏳ PENDIENTE | LinkedIn mínimo recomendado |

---

## 2.3 Condiciones comerciales

| Campo | Estado | Notas |
|-------|--------|-------|
| ¿Consulta inicial gratuita? | ⏳ PENDIENTE | Confirmar política real |
| Plazo real de entrega del informe | ⏳ PENDIENTE | Para reemplazar `[X] días` en el código |
| Rango de precios orientativo | ⏳ PENDIENTE | Opcional; si se publica debe ser exacto |
| Modalidades de pago | ⏳ PENDIENTE | Transferencia, tarjeta, etc. |
| Política de ratificación judicial | ⏳ PENDIENTE | ¿Incluida? ¿Precio aparte? |
| Cobertura geográfica real | ⏳ PENDIENTE | ¿Toda España? ¿Con desplazamiento o solo videoconsulta fuera de Andalucía? |

**PROHIBIDO publicar sin confirmación legal explícita:**
- "Solo cobramos si ganas"
- "Resultados garantizados"
- "Máxima indemnización"
- Cualquier cifra o porcentaje de éxito

---

## 2.4 Material visual

| Material | Estado | Notas |
|----------|--------|-------|
| Foto principal del profesional | ⏳ PENDIENTE | Para sección "Sobre Pablo" |
| Foto secundaria / entorno | ⏳ PENDIENTE | Despacho, biblioteca médica, etc. |
| Imagen OG (1200×630px) | ⏳ PENDIENTE | Para open graph / redes sociales |
| Favicon (32×32 y 192×192) | ⏳ PENDIENTE | Formato .ico y .png |
| Acreditaciones digitalizadas | ⏳ PENDIENTE | Colegiación, títulos, certificados |
| Reseñas con autorización | ⏳ PENDIENTE | Texto + nombre/iniciales + autorización escrita RGPD |
| Casos de éxito anonimizados | ⏳ PENDIENTE | Solo si existen y están anonimizados conforme RGPD |

---

## 2.5 Aspectos legales y RGPD

| Elemento | Estado | Notas |
|----------|--------|-------|
| NIF / CIF del responsable | ⏳ PENDIENTE | Para el Aviso Legal |
| Datos del Registro Mercantil (si es empresa) | ⏳ PENDIENTE | Si aplica |
| Datos exactos del responsable de tratamiento | ⏳ PENDIENTE | Para Política de Privacidad |
| ¿Usa herramientas de analítica? (GA4, etc.) | ⏳ PENDIENTE | Afecta al banner de cookies |
| ¿Usa Meta Pixel o Google Ads? | ⏳ PENDIENTE | Requiere cookies de terceros y consentimiento |

---

## 2.6 Integraciones técnicas

| Integración | Estado | Notas |
|-------------|--------|-------|
| Servicio de envío de emails | ⏳ PENDIENTE | Resend (recomendado), Brevo o SMTP propio |
| CRM o base de datos de leads | ⏳ PENDIENTE | Supabase (ya preparado en arquitectura) |
| Google Analytics 4 | ⏳ PENDIENTE | Measurement ID: G-XXXXXXXX |
| Google Tag Manager | ⏳ PENDIENTE | ID: GTM-XXXXXXX |
| Google Search Console | ⏳ PENDIENTE | Verificación del dominio |
| Google Business Profile | ⏳ PENDIENTE | Crear o reclamar ficha |
| Número de WhatsApp Business | ⏳ PENDIENTE | Para el botón flotante |
| Dominio Vercel / DNS | ⏳ PENDIENTE | Apuntar dominio al proyecto |

---

## Checklist de publicación

- [ ] Todos los `[PENDIENTE]` sustituidos
- [ ] Foto profesional añadida
- [ ] Favicon y og-image configurados
- [ ] Dominio definitivo en `layout.tsx`, `JsonLd.tsx`, `sitemap.ts`
- [ ] API de contacto conectada a servicio de email real
- [ ] Leads almacenados en base de datos
- [ ] Aviso Legal y Política de Privacidad revisados por asesor legal
- [ ] Banner de cookies implementado si hay analítica de terceros
- [ ] Google Search Console verificado
- [ ] Core Web Vitals validados (LCP < 2.5s, INP < 200ms)
- [ ] Test en móvil real (iOS + Android)
- [ ] Prueba de envío del formulario end-to-end
