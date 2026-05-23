# Deploy Y Produccion

Guia para publicar la web y el backend admin.

## Arquitectura Recomendada

Usar dos servicios:

- Frontend React: Static Site.
- Backend admin: Web Service Node.

Dominios sugeridos:

- Web: `https://www.tudominio.com`
- API: `https://api.tudominio.com`

## Backend

Servicio: Node Web Service.

Build command:

```bash
npm install
```

Start command:

```bash
node admin-backend/server.js
```

Variables:

```bash
ADMIN_PASSWORD=una_clave_segura
ADMIN_SECRET=un_texto_largo_random
ADMIN_ALLOWED_ORIGIN=https://www.tudominio.com
PUBLIC_API_URL=https://api.tudominio.com
ADMIN_DATA_DIR=/var/data
UPLOADS_DIR=/var/data/uploads
MAX_UPLOAD_BYTES=5242880
```

## Disco Persistente

El backend guarda:

- `site-settings.json`: contenido y colores publicados.
- `uploads/`: imagenes subidas desde admin.

En Render u otro hosting con filesystem efimero, montar un disco persistente:

```text
Mount path: /var/data
```

Sin disco persistente, las imagenes y cambios pueden perderse al redeploy o restart.

## Frontend

Servicio: Static Site.

Build command:

```bash
npm install && npm run build
```

Publish directory:

```bash
build
```

Variable:

```bash
REACT_APP_ADMIN_API_URL=https://api.tudominio.com
```

Importante: en Create React App esta variable se fija en tiempo de build. Si cambia, hay que redeployar el frontend.

## Dominio Y HTTPS

Si usas Render:

1. Crear backend y agregar dominio `api.tudominio.com`.
2. Crear frontend y agregar dominio `www.tudominio.com`.
3. En el DNS del dominio, cargar los registros indicados por Render.
4. Esperar verificacion.
5. Render emite HTTPS automaticamente.

No deberias comprar certificado SSL aparte si el proveedor ya da TLS administrado.

## Checklist Antes De Publicar

- Cambiar `ADMIN_PASSWORD`.
- Cambiar `ADMIN_SECRET`.
- Configurar `ADMIN_ALLOWED_ORIGIN` con la URL final de la web.
- Configurar `PUBLIC_API_URL` con la URL final de la API.
- Configurar disco persistente para `/var/data`.
- Configurar `REACT_APP_ADMIN_API_URL` en frontend.
- Configurar EmailJS.
- Configurar reCAPTCHA con el dominio final.
- Probar login en `/admin`.
- Subir una imagen desde admin y abrir su URL `/uploads/...`.
- Editar texto, guardar y verificar desde una ventana anonima.

## Problemas Comunes

### Las imagenes se ven rotas

Revisar:

- Que `PUBLIC_API_URL` sea la URL publica real del backend.
- Que `/uploads/<archivo>` abra en navegador.
- Que el backend tenga disco persistente.
- Que el frontend tenga `REACT_APP_ADMIN_API_URL` correcto y haya sido redeployado.

### Guardar no cambia la web publica

Revisar:

- Que el admin muestre "Cambios guardados y publicados".
- Que `/api/settings` devuelva contenido actualizado.
- Que no haya error CORS.
- Que `ADMIN_ALLOWED_ORIGIN` coincida con la web.

### CAPTCHA no funciona

Revisar:

- Dominio cargado en Google reCAPTCHA.
- reCAPTCHA v2 activado.
- Verificacion activada en EmailJS para el template usado.

### Backend duerme

En planes gratuitos algunos servicios duermen. Para produccion usar un plan pago que no suspenda el backend.

## Variables Locales Sugeridas

`.env.development.local`:

```bash
REACT_APP_ADMIN_API_URL=http://localhost:4000
```

Terminal backend local:

```bash
ADMIN_PASSWORD=admin123 \
ADMIN_SECRET=dev-secret \
ADMIN_ALLOWED_ORIGIN=http://localhost:3000 \
PUBLIC_API_URL=http://localhost:4000 \
npm run admin
```
