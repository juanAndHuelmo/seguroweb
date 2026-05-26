# Deploy en Plesk con Git Repository

Dominio objetivo:

- Frontend: `https://huelmoseguros.com.uy`
- API: `https://api.huelmoseguros.com.uy`

Prioridad recomendada: usar subdominio para la API. Evitá publicar la API dentro de `/api` salvo que el hosting no permita Node.js en subdominios.

## Detección del proyecto

Frontend:

- Tipo: React con Create React App.
- Comando de instalación: `npm install`
- Comando de build: `npm run build`
- Carpeta generada: `build`
- Base URL: dominio raíz. El proyecto usa `"homepage": "."`, válido para publicar en `huelmoseguros.com.uy` y también tolerante si Plesk sirve desde carpeta.

API:

- Tipo: Node.js puro con `http`, no Express y no .NET.
- Archivo de inicio: `admin-backend/server.js`
- Package de API: `admin-backend/package.json`
- Health check: `https://api.huelmoseguros.com.uy/api/health`

## Estructura recomendada

Usar el mismo repositorio con dos despliegues Git en Plesk:

```text
repo/
  package.json                 Frontend CRA
  public/
    web.config                 Fallback IIS para React
  src/
  build/                       Generado por npm run build, no se sube

  admin-backend/
    package.json               API Node
    server.js
    web.config                 Solo si Plesk/IIS usa iisnode
    data/                      Producción, no subir al repo
```

Publicaciones:

```text
huelmoseguros.com.uy      -> contenido generado de build/
api.huelmoseguros.com.uy  -> admin-backend/
```

Branch recomendado: `main`.

## Variables de producción

Frontend, configurar antes de `npm run build`:

```env
REACT_APP_ADMIN_API_URL=https://api.huelmoseguros.com.uy
REACT_APP_EMAILJS_PUBLIC_KEY=...
REACT_APP_EMAILJS_SERVICE_ID=...
REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID=...
REACT_APP_EMAILJS_QUOTE_TEMPLATE_ID=...
REACT_APP_EMAILJS_TO_EMAIL=recepcion@huelmoseguros.com.uy
REACT_APP_EMAILJS_FROM_EMAIL=web@huelmoseguros.com.uy
REACT_APP_EMAILJS_FROM_NAME=Huelmo Seguros Web
REACT_APP_RECAPTCHA_SITE_KEY=...
```

Ejemplo completo: `.env.production.example`.

API, configurar en Plesk como variables de entorno o archivo fuera del repo:

```env
NODE_ENV=production
PORT=4000
ADMIN_PASSWORD=...
ADMIN_SECRET=...
ADMIN_ALLOWED_ORIGIN=https://huelmoseguros.com.uy,https://www.huelmoseguros.com.uy
PUBLIC_API_URL=https://api.huelmoseguros.com.uy
ADMIN_DATA_DIR=./data
UPLOADS_DIR=./data/uploads
MAX_UPLOAD_BYTES=5242880
```

Ejemplo completo: `admin-backend/.env.production.example`.

No subir secretos reales al repositorio.

## Frontend en Plesk

En Plesk, para el dominio `huelmoseguros.com.uy`:

1. Ir a **Git Repository**.
2. Conectar el repositorio.
3. Usar branch `main`.
4. Configurar deploy automático después de pull si está disponible.
5. Ejecutar después del pull:

```bash
npm install
npm run build
```

La carpeta publicada debe ser:

```text
build
```

Si Plesk permite cambiar el **Document Root**, apuntarlo a:

```text
/httpdocs/build
```

Si Plesk no permite apuntar Document Root a `build`, usar `httpdocs` como destino final y copiar el contenido de `build` hacia `httpdocs` después del build.

Comando típico en Windows/Plesk:

```bat
npm install
npm run build
xcopy build\* httpdocs\ /E /Y /I
```

Si el Git Repository ya despliega directamente dentro de `httpdocs`, evitá borrar el repo completo. En ese caso conviene usar una carpeta intermedia para el repo y copiar solo `build`.

## Fallback de rutas React

El proyecto no usa React Router clásico; navega por estado interno. Igual se agregó:

```text
public/web.config
```

Create React App copia ese archivo a `build/web.config`. En IIS/Plesk evita 404 al refrescar rutas si más adelante se agregan rutas reales.

## API en subdominio

Crear en Plesk:

```text
api.huelmoseguros.com.uy
```

Luego:

1. Activar hosting para el subdominio.
2. Activar soporte Node.js si el plan de HostingMontevideo/Plesk lo permite.
3. Conectar Git Repository al mismo repo.
4. Usar branch `main`.
5. Configurar la raíz de la aplicación Node en:

```text
admin-backend
```

6. Archivo de inicio:

```text
server.js
```

7. Comandos después del pull:

```bash
cd admin-backend
npm install --omit=dev
```

La API no tiene dependencias externas hoy, pero `npm install --omit=dev` deja el flujo listo si se agregan dependencias en el futuro.

Configurar variables de entorno en Plesk según la sección anterior.

Probar:

```text
https://api.huelmoseguros.com.uy/api/health
https://api.huelmoseguros.com.uy/api/settings
```

## Si Plesk no permite Node.js

Prioridad sigue siendo subdominio. Si el plan Windows no permite Node.js:

Opción recomendada:

- Frontend en Plesk: `https://huelmoseguros.com.uy`
- API en Render/Railway/VPS: `https://api.huelmoseguros.com.uy`
- Crear DNS `CNAME` o proxy para `api.huelmoseguros.com.uy`.

Opción menos recomendable:

- Publicar API bajo `/api` solo si Plesk permite ejecutar Node detrás de IIS en la misma suscripción.
- Requeriría reglas de rewrite separadas para no mandar `/api/*` al `index.html`.
- Habría que cambiar:

```env
REACT_APP_ADMIN_API_URL=https://huelmoseguros.com.uy/api
PUBLIC_API_URL=https://huelmoseguros.com.uy/api
```

No usar `/api` si IIS solo sirve archivos estáticos.

## SSL

En Plesk:

1. Ir a `huelmoseguros.com.uy`.
2. Emitir certificado Let's Encrypt.
3. Incluir `www.huelmoseguros.com.uy`.
4. Activar redirección HTTP a HTTPS.
5. Repetir para `api.huelmoseguros.com.uy`.

El frontend debe llamar siempre:

```text
https://api.huelmoseguros.com.uy
```

No mezclar HTTPS frontend con API HTTP.

## CORS

La API acepta múltiples orígenes por coma:

```env
ADMIN_ALLOWED_ORIGIN=https://huelmoseguros.com.uy,https://www.huelmoseguros.com.uy
```

No usar `*` en producción salvo prueba temporal.

## Archivos y secretos

No subir:

```text
node_modules/
build/
admin-backend/data/
admin-backend/db.json
admin-backend/site-settings.json
admin-backend/uploads/
.env
.env.local
.env.production.local
```

Ya están cubiertos por `.gitignore`.

Los archivos `admin-backend/db.json`, `site-settings.json` y `uploads` son datos runtime. En producción deben vivir en una carpeta persistente, por ejemplo:

```text
admin-backend/data
```

## Actualizar el sitio con Git

Frontend:

```bash
git pull origin main
npm install
npm run build
```

Después publicar `build`.

API:

```bash
git pull origin main
cd admin-backend
npm install --omit=dev
```

Reiniciar la aplicación Node desde Plesk.

## Pruebas finales

Frontend:

```text
https://huelmoseguros.com.uy
https://huelmoseguros.com.uy/admin
```

API:

```text
https://api.huelmoseguros.com.uy/api/health
https://api.huelmoseguros.com.uy/api/settings
```

Desde el navegador:

1. Abrir DevTools.
2. Ir a Network.
3. Confirmar que no existan llamadas a `localhost`.
4. Confirmar que `/api/settings` responde desde `api.huelmoseguros.com.uy`.
5. Confirmar que imágenes en `/Images/...` cargan con mayúsculas correctas.

## Errores comunes

### La web carga pero `/admin` da 404 al refrescar

Confirmar que `build/web.config` esté publicado en el Document Root y que IIS Rewrite esté disponible.

### El frontend llama a localhost

El build se hizo con variables incorrectas. Configurar:

```env
REACT_APP_ADMIN_API_URL=https://api.huelmoseguros.com.uy
```

Luego volver a ejecutar `npm run build`.

### Error CORS

Revisar en la API:

```env
ADMIN_ALLOWED_ORIGIN=https://huelmoseguros.com.uy,https://www.huelmoseguros.com.uy
```

Reiniciar la API.

### Uploads devuelven URLs localhost

Configurar:

```env
PUBLIC_API_URL=https://api.huelmoseguros.com.uy
```

Reiniciar la API.

### API no inicia en Plesk

Confirmar:

- Soporte Node.js activo en Plesk.
- Node >= 18.
- Application root: `admin-backend`.
- Startup file: `server.js`.
- Variables `ADMIN_PASSWORD` y `ADMIN_SECRET`.
- Logs de Node/IIS en Plesk.

### Plan Windows no soporta Node.js

Usar Plesk solo para frontend y publicar API en un servicio externo o VPS. Apuntar `api.huelmoseguros.com.uy` a ese servicio.
