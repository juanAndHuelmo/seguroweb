# Huelmo Seguros Web

Sitio web administrable para Huelmo Seguros. Incluye una web publica en React, un panel admin visual y un backend Node simple para autenticacion, guardado de contenido e imagenes.

## Stack

- React con Create React App
- Styled Components
- EmailJS para envio de formularios
- Google reCAPTCHA v2 en formularios
- Backend Node sin framework en `admin-backend/server.js`
- Persistencia por archivos JSON y carpeta de uploads

## Estructura Principal

```text
admin-backend/
  server.js                 API de admin, settings e imagenes

src/
  App.js                    Entrada principal y deteccion de /admin
  Components/
    AdminPanel/
      AdminWorkspace.jsx    Panel admin actual
    Forms/                  Contacto y cotizacion
    HomeSections/           Secciones de home
    Layout/                 NavBar, Footer, WhatsApp
    Pages/                  Home, About, Brokers
  Context/
    SiteContentContext.js   Contenido editable
    ThemeContext.js         Colores editables
  Hooks/
    useSiteContent.js
    useTheme.js
  config/
    adminApi.js             URL de API admin
```

## Comandos Locales

Instalar dependencias:

```bash
npm install
```

Levantar frontend:

```bash
npm start
```

Levantar backend admin:

```bash
npm run admin
```

Tests:

```bash
npm test -- --watchAll=false
```

Build de produccion:

```bash
npm run build
```

## URLs Locales

- Web: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`
- API: `http://localhost:4000`

Si la app esta servida con subruta, tambien puede funcionar como:

- `http://localhost:3000/seguroweb/admin`

## Variables De Entorno

Frontend:

```bash
REACT_APP_ADMIN_API_URL=http://localhost:4000
```

Backend:

```bash
ADMIN_PASSWORD=admin123
ADMIN_SECRET=change-this-secret
ADMIN_ALLOWED_ORIGIN=http://localhost:3000
PUBLIC_API_URL=http://localhost:4000
ADMIN_DATA_DIR=./admin-backend
UPLOADS_DIR=./admin-backend/uploads
MAX_UPLOAD_BYTES=5242880
```

En produccion, cambiar `ADMIN_PASSWORD` y `ADMIN_SECRET`.

## Admin

El panel admin permite editar:

- Servicios: titulo, descripcion, icono e imagen de fondo.
- Beneficios.
- Nosotros.
- Aseguradoras y logos.
- Contacto/footer.
- WhatsApp.
- Colores principales.

Los cambios se ven en el preview en vivo. Para publicarlos, presionar `Guardar`.

## Imagenes

El admin permite:

- Pegar URL externa.
- Usar ruta interna como `/Images/Logos/vehiculo.jpg`.
- Subir archivo desde la computadora.

Las imagenes subidas van al backend:

```text
/uploads/<archivo>
```

En produccion, esa carpeta debe estar en un disco persistente. Ver [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Formularios

- `Contact.jsx` envia consultas con EmailJS y reCAPTCHA.
- `QuotationForm.jsx` envia solicitudes de cotizacion con EmailJS y reCAPTCHA.

Configurar las claves de EmailJS y reCAPTCHA antes de publicar.

## Documentacion Adicional

- [Deploy y produccion](docs/DEPLOYMENT.md)
- [API admin](docs/API.md)
- [Mantenimiento](docs/MAINTENANCE.md)
