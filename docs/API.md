# API Admin

Backend ubicado en `admin-backend/server.js`.

## Autenticacion

### `POST /api/auth/login`

Body:

```json
{
  "password": "admin123"
}
```

Respuesta:

```json
{
  "token": "..."
}
```

### `GET /api/auth/me`

Headers:

```text
Authorization: Bearer <token>
```

Devuelve si la sesion es valida.

## Settings

### `GET /api/settings`

Devuelve contenido, tema y templates guardados.

Respuesta inicial:

```json
{
  "content": {},
  "theme": {},
  "customThemes": {},
  "updatedAt": null
}
```

### `PUT /api/settings`

Headers:

```text
Authorization: Bearer <token>
Content-Type: application/json
```

Body:

```json
{
  "content": {},
  "theme": {},
  "customThemes": {}
}
```

Guarda en `site-settings.json`.

## Imagenes

### `POST /api/media/upload`

Headers:

```text
Authorization: Bearer <token>
```

Body: `multipart/form-data`

Campo:

```text
file
```

Formatos permitidos:

- JPG
- PNG
- WEBP
- GIF
- SVG

Tamano maximo por defecto:

```text
5 MB
```

Respuesta:

```json
{
  "url": "https://api.tudominio.com/uploads/archivo.png",
  "filename": "archivo.png"
}
```

### `GET /uploads/<archivo>`

Sirve imagenes subidas.

## Seguridad Actual

- Token firmado con HMAC.
- Expiracion: 8 horas.
- Upload protegido por token.
- Settings `PUT` protegido por token.
- CORS configurable por `ADMIN_ALLOWED_ORIGIN`.

## Variables Backend

```bash
ADMIN_PASSWORD=...
ADMIN_SECRET=...
ADMIN_ALLOWED_ORIGIN=...
PUBLIC_API_URL=...
ADMIN_DATA_DIR=...
UPLOADS_DIR=...
MAX_UPLOAD_BYTES=...
```
