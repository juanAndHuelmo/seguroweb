# Despliegue simple en Plesk Windows

Este proyecto tiene el frontend Create React App en la raiz del repositorio actual. Los scripts usan esa raiz como frontend. Si algun dia se mueve a `/frontend`, ejecutar con `FRONTEND_DIR=/ruta/frontend`.

## URLs actuales

- Frontend: `https://huelmoseguros.com.uy`
- API: `https://api.huelmoseguros.com.uy`
- API health: `https://api.huelmoseguros.com.uy/api/health`

## Frontend por ZIP

1. Configurar variables antes de compilar:

```bash
cp .env.production.example .env.production
```

2. Editar `.env.production`:

```txt
REACT_APP_API_URL=https://api.huelmoseguros.com.uy
REACT_APP_RECAPTCHA_SITE_KEY=xxxx
REACT_APP_EMAILJS_SERVICE_ID=xxxx
REACT_APP_EMAILJS_TEMPLATE_ID=xxxx
REACT_APP_EMAILJS_PUBLIC_KEY=xxxx
```

3. Generar ZIP:

```bash
bash deploy/scripts/zip-front.sh
```

4. Subir `frontend-build.zip` por File Manager de Plesk al document root del dominio temporal o real.
5. Extraerlo en la raiz del sitio.
6. Verificar que `index.html` quede directo en la raiz, no dentro de una carpeta `build`.

Las variables `REACT_APP_` quedan embebidas en el build. Si cambia `REACT_APP_API_URL`, hay que recompilar y volver a desplegar.

## Frontend por Git del build

Este flujo crea un Git separado dentro de `build`. No es el Git principal del proyecto.

```bash
PLESK_FRONT_REPO_URL="https://usuario@dominio/plesk-git/musing-hopper.git" bash deploy/scripts/deploy-front-git.sh
```

En Plesk:

- Seleccionar branch `main`.
- Usar deploy automatico o manual.
- El repositorio de Plesk recibira solo los archivos compilados: `index.html`, `static/`, assets y `web.config`.

## API por ZIP

1. Generar ZIP:

```bash
bash deploy/scripts/zip-api.sh
```

2. Subir `api-publish.zip` a `/apin.huelmolabs.com.uy`.
3. Extraerlo en la raiz del subdominio.
4. Verificar que queden en la raiz:

```txt
server.js
package.json
package-lock.json
.env
data/
uploads/
site-settings.json
```

5. Crear `.env` en la raiz de la API en Plesk:

```txt
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://huelmoseguros.com.uy
RECAPTCHA_SECRET_KEY=
EMAILJS_PRIVATE_KEY=
JWT_SECRET=un_secreto_largo
ADMIN_USER=admin
ADMIN_PASSWORD=una_clave_segura
UPLOADS_DIR=uploads
DATA_DIR=data
PUBLIC_API_URL=https://api.huelmoseguros.com.uy
```

6. En Plesk Node.js configurar:

```txt
Node.js Version: 18+
Application Root: /apin.huelmolabs.com.uy
Application Startup File: server.js
Application Mode: production
```

7. Tocar **NPM install**.
8. Tocar **Restart App**.
9. Probar:

```txt
https://apin.huelmolabs.com.uy/api/health
```

## Variables backend

Las variables backend van en `.env` en la raiz de la API en Plesk, o en Node.js Settings si Plesk lo permite. Si se cambia una variable backend, reiniciar la app.

CORS permite:

- `FRONTEND_URL`
- `http://localhost:3000`
- `https://musing-hopper.161-0-125-69.plesk.page`
- `https://huelmoseguros.com.uy`
- `https://www.huelmoseguros.com.uy`

## Checklist final

- El front abre.
- `/api/health` responde.
- CORS permite el dominio del front.
- SSL activo en front y API.
- `REACT_APP_API_URL` apunta a HTTPS.
- Node.js usa `server.js`.
- `npm install` fue ejecutado en Plesk.
- La app Node fue reiniciada.
- No se subieron `.env` reales.
- No se subio `node_modules`.
- `uploads` y `data` tienen permiso de escritura si la API guarda archivos.

## Errores comunes

- Front muestra pantalla vieja: recompilar y volver a subir el ZIP o hacer push del build.
- Rutas internas dan 404: confirmar que `web.config` esta junto a `index.html`.
- CORS: confirmar `FRONTEND_URL` y reiniciar la API.
- API no arranca: revisar que `Application Startup File` sea `server.js`.
- Cambie la URL de API y no impacta: en React hay que recompilar el frontend.
