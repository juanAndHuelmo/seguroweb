# Backend

API para administrar configuración, login de admin y subida de imágenes.

## Configuración

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Por defecto corre en `http://localhost:4000`.

## Endpoints principales

- `GET /api/config`: configuración pública del sitio.
- `GET /api/admin/status`: indica si ya existe admin.
- `POST /api/auth/setup`: crea la contraseña inicial.
- `POST /api/auth/login`: devuelve token JWT.
- `PUT /api/config`: guarda configuración, requiere token.
- `POST /api/uploads`: sube imágenes, requiere token.

En producción cambiá `JWT_SECRET` en `.env`.
