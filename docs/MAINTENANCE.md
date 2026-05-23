# Mantenimiento

## Flujo De Trabajo

1. Levantar backend:

```bash
npm run admin
```

2. Levantar frontend:

```bash
npm start
```

3. Entrar al admin:

```text
http://localhost:3000/admin
```

4. Editar contenido.
5. Presionar `Guardar`.
6. Verificar en la web publica.

## Limpieza De Datos Locales

El navegador guarda una copia local del contenido.

Para resetear:

1. Abrir DevTools.
2. Application.
3. Local Storage.
4. Borrar:

```text
siteContent
selectedTheme
customColors
customThemes
adminToken
```

## Archivos Que No Se Versionan

Estos archivos se generan en runtime:

```text
admin-backend/db.json
admin-backend/site-settings.json
admin-backend/uploads/
admin-api/data/
build/
```

## Antes De Subir Cambios

Ejecutar:

```bash
npm test -- --watchAll=false
npm run build
node --check admin-backend/server.js
```

## Cambiar Textos Editables

Los textos base estan en:

```text
src/Context/SiteContentContext.js
```

El admin edita esos mismos datos y los publica en la API.

## Cambiar Colores Base

Los temas base estan en:

```text
src/Context/ThemeContext.js
```

## Agregar Un Nuevo Campo Editable

1. Agregar el valor base en `SiteContentContext.js`.
2. Leer ese valor en el componente publico.
3. Agregar un input en `AdminWorkspace.jsx`.
4. Probar que el cambio se ve en preview.
5. Guardar y revisar `/api/settings`.

## Backup Manual

En produccion, respaldar periodicamente:

```text
site-settings.json
uploads/
```

Si usas Render Persistent Disk, descargar o copiar estos datos antes de cambios grandes.
