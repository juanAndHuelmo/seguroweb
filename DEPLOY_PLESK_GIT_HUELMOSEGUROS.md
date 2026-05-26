# Deploy Plesk Git - Huelmo Seguros

Dominios finales:

- Frontend: `https://huelmoseguros.com.uy`
- Alias frontend: `https://www.huelmoseguros.com.uy`
- API: `https://api.huelmoseguros.com.uy`

## 1. Detección del Proyecto

Frontend:

- Tecnología detectada: React con Create React App.
- Script de producción: `npm run build`
- Carpeta de salida: `build`
- No es Vite. Por eso la variable efectiva para el build es `REACT_APP_ADMIN_API_URL`, no `VITE_API_URL`.

API:

- Tecnología detectada: Node.js puro con módulo `http`.
- No es .NET / ASP.NET Core.
- No usa Express.
- Archivo principal: `admin-backend/server.js`
- Health check: `/api/health`

## 2. Estructura Recomendada

El proyecto puede publicarse como monorepo con dos Git Repository en Plesk:

```text
repo/
  package.json
  package-lock.json
  public/
    web.config
  src/
  build/                  generado, no subir

  admin-backend/
    package.json
    server.js
    web.config
    data/                 producción, no subir
```

Publicación recomendada:

```text
huelmoseguros.com.uy      -> frontend/build
www.huelmoseguros.com.uy  -> alias del frontend
api.huelmoseguros.com.uy  -> admin-backend
```

Branch recomendado: `main`.

También se puede separar en dos repositorios, uno para frontend y otro para API. Para este proyecto no es obligatorio; el monorepo está bien.

## 3. Variables de Entorno Frontend

Como el frontend es Create React App, Plesk debe compilar con:

```env
REACT_APP_ADMIN_API_URL=https://api.huelmoseguros.com.uy
```

También se dejó soporte para:

```env
REACT_APP_API_URL=https://api.huelmoseguros.com.uy
```

`VITE_API_URL` no lo consume Create React App. Se documenta solo porque aplicaría si el proyecto se migra a Vite:

```env
VITE_API_URL=https://api.huelmoseguros.com.uy
```

Variables completas sugeridas:

```env
REACT_APP_ADMIN_API_URL=https://api.huelmoseguros.com.uy
REACT_APP_API_URL=https://api.huelmoseguros.com.uy
REACT_APP_CONTACT_EMAIL=phuelmoseguros@gmail.com
REACT_APP_CONTACT_PHONE=+598 92 290 092
REACT_APP_CONTACT_SCHEDULE=Lunes a viernes 9:00 - 17:00
REACT_APP_WHATSAPP_PHONE=+598922290092
REACT_APP_EMAILJS_PUBLIC_KEY=...
REACT_APP_EMAILJS_SERVICE_ID=...
REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID=...
REACT_APP_EMAILJS_QUOTE_TEMPLATE_ID=...
REACT_APP_EMAILJS_TO_EMAIL=recepcion@huelmoseguros.com.uy
REACT_APP_EMAILJS_FROM_EMAIL=web@huelmoseguros.com.uy
REACT_APP_EMAILJS_FROM_NAME=Huelmo Seguros Web
REACT_APP_RECAPTCHA_SITE_KEY=...
```

Archivo de ejemplo:

```text
.env.production.example
```

No subir `.env` reales con claves al repositorio.

## 4. Build del Frontend

Comandos de producción:

```bash
npm install
npm run build
```

Salida esperada:

```text
build/
```

El proyecto tiene `"homepage": "."`, adecuado para servir assets desde la raíz del dominio.

## 5. web.config Frontend

Existe:

```text
public/web.config
```

Create React App lo copia automáticamente a:

```text
build/web.config
```

Ese archivo configura fallback a `index.html` para IIS/Plesk. Sirve para evitar 404 al refrescar rutas internas si se agregan rutas reales en el futuro.

## 6. Publicar Frontend en Plesk

En el dominio `huelmoseguros.com.uy`:

1. Ir a **Git Repository**.
2. Conectar el repositorio.
3. Usar branch `main`.
4. Configurar deploy automático si se desea.
5. Comandos posteriores al pull:

```bash
npm install
npm run build
```

Carpeta a publicar:

```text
build
```

Si Plesk permite cambiar Document Root, apuntar a la carpeta `build`.

Si Plesk no permite apuntar directamente a `build`, copiar el contenido de `build` hacia `httpdocs`.

Comando típico en Windows:

```bat
npm install
npm run build
xcopy build\* httpdocs\ /E /Y /I
```

## 7. Variables de Entorno API

Configurar en Plesk para `api.huelmoseguros.com.uy`:

```env
NODE_ENV=production
PORT=4000
ADMIN_PASSWORD=REEMPLAZAR_PASSWORD_ADMIN
ADMIN_SECRET=REEMPLAZAR_SECRET_LARGO_RANDOM
ADMIN_ALLOWED_ORIGIN=https://huelmoseguros.com.uy,https://www.huelmoseguros.com.uy
PUBLIC_API_URL=https://api.huelmoseguros.com.uy
ADMIN_DATA_DIR=./data
UPLOADS_DIR=./data/uploads
MAX_UPLOAD_BYTES=5242880
```

Archivo de ejemplo:

```text
admin-backend/.env.production.example
```

No subir valores reales de `ADMIN_PASSWORD` ni `ADMIN_SECRET`.

## 8. Publicar API en Plesk

Crear subdominio:

```text
api.huelmoseguros.com.uy
```

En Plesk:

1. Activar hosting para el subdominio.
2. Activar Node.js si el plan lo permite.
3. Conectar Git Repository al mismo repo.
4. Branch: `main`.
5. Application root:

```text
admin-backend
```

6. Startup file:

```text
server.js
```

7. Comandos posteriores al pull:

```bash
cd admin-backend
npm install --omit=dev
```

La API no requiere `dotnet restore` ni `dotnet publish`, porque no es .NET.

Si Plesk usa IIS con iisnode, se dejó:

```text
admin-backend/web.config
```

Si Plesk tiene módulo Node propio, usar la configuración Node.js del panel.

## 9. CORS

La API ya permite configurar múltiples orígenes:

```env
ADMIN_ALLOWED_ORIGIN=https://huelmoseguros.com.uy,https://www.huelmoseguros.com.uy
```

No usar `*` en producción salvo prueba puntual.

## 10. SSL

En Plesk emitir certificados Let's Encrypt para:

```text
huelmoseguros.com.uy
www.huelmoseguros.com.uy
api.huelmoseguros.com.uy
```

Activar redirección HTTP a HTTPS para dominio principal y API.

El frontend debe consumir siempre:

```text
https://api.huelmoseguros.com.uy
```

## 11. Archivos que NO se deben subir

Cubiertos por `.gitignore`:

```text
node_modules/
build/
.env
.env.local
.env.production.local
admin-backend/data/
admin-backend/db.json
admin-backend/site-settings.json
admin-backend/uploads/
```

Datos persistentes de producción:

```text
admin-backend/data/
```

Esa carpeta debe existir en producción y conservarse entre deploys.

## 12. Assets, Imágenes y Favicon

Assets revisados:

- Imágenes públicas bajo `public/Images/...`
- Logo de navbar: `public/Images/logo.png`
- Favicon SVG: `public/favicon.svg`
- Manifest: `public/manifest.json`
- Apple icon: `public/logo192.png`

En hosting Linux la mayúscula importa; en Windows normalmente no, pero conviene respetar nombres exactos. Las rutas actuales usan `/Images/...` y coinciden con la carpeta `public/Images`.

## 13. Checklist Antes de Producción

- `npm run build` termina correctamente.
- `build/web.config` existe.
- No hay llamadas de producción a `localhost`.
- `REACT_APP_ADMIN_API_URL=https://api.huelmoseguros.com.uy`.
- SSL activo para dominio, `www` y `api`.
- API responde en `/api/health`.
- CORS permite dominio y alias `www`.
- `ADMIN_PASSWORD` y `ADMIN_SECRET` configurados en Plesk.
- `PUBLIC_API_URL=https://api.huelmoseguros.com.uy`.
- Carpeta persistente `admin-backend/data` creada.
- EmailJS y reCAPTCHA tienen claves de producción.

## 14. Pruebas

Frontend:

```text
https://huelmoseguros.com.uy
https://www.huelmoseguros.com.uy
https://huelmoseguros.com.uy/admin
```

API:

```text
https://api.huelmoseguros.com.uy/api/health
https://api.huelmoseguros.com.uy/api/settings
```

Desde DevTools > Network:

- Verificar que no aparezca `localhost`.
- Verificar que la API llamada sea `api.huelmoseguros.com.uy`.
- Verificar que imágenes y favicon carguen con 200.

## 15. Errores Comunes

### Imágenes que no cargan

- Revisar mayúsculas/minúsculas: `Images` no es lo mismo que `images`.
- Confirmar que los archivos estén dentro de `public/Images`.
- Confirmar que el build publicado incluya la carpeta `Images`.

### Rutas con 404 al refrescar

- Confirmar que `build/web.config` esté en el Document Root.
- Confirmar que IIS URL Rewrite esté disponible en Plesk.

### Error CORS

- Revisar `ADMIN_ALLOWED_ORIGIN`.
- Incluir ambos:

```env
https://huelmoseguros.com.uy,https://www.huelmoseguros.com.uy
```

- Reiniciar la API.

### API caída

- Probar `/api/health`.
- Revisar logs de Node.js en Plesk.
- Confirmar startup file `server.js`.
- Confirmar Application root `admin-backend`.
- Confirmar variables `ADMIN_PASSWORD`, `ADMIN_SECRET`, `PUBLIC_API_URL`.

### appsettings incorrecto

No aplica: la API no es .NET y no usa `appsettings.json`.

### localhost en producción

- Cambiar variables antes del build.
- Rehacer:

```bash
npm run build
```

- Volver a publicar `build`.

### Uploads con URL incorrecta

Configurar en API:

```env
PUBLIC_API_URL=https://api.huelmoseguros.com.uy
```

Reiniciar API.

## 16. Alternativa si no hay Node.js en Plesk

Mantener:

```text
https://huelmoseguros.com.uy
```

en Plesk para el frontend.

Publicar API en VPS/Render/Railway/Azure y apuntar:

```text
api.huelmoseguros.com.uy
```

a ese servicio mediante DNS.

Usar `/api` dentro del mismo dominio solo si Plesk permite ejecutar Node detrás de IIS en esa ruta. Si IIS solo sirve estáticos, `/api` no sirve para esta API.
