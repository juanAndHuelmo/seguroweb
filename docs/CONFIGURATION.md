# Configuración

La configuración central del frontend está en:

```text
src/config/appConfig.js
```

Ese archivo define valores por defecto para contacto, teléfonos, endpoints, integraciones y mensajes de error. Para producción o desarrollo, preferí cambiar variables de entorno en `.env` o `.env.development.local`.

## Contacto

```env
REACT_APP_CONTACT_EMAIL=phuelmoseguros@gmail.com
REACT_APP_CONTACT_PHONE=+598 92 290 092
REACT_APP_CONTACT_SCHEDULE=Lunes a viernes 9:00 - 17:00
REACT_APP_WHATSAPP_PHONE=+598922290092
REACT_APP_WHATSAPP_MESSAGE=Hola, quiero más información sobre cotizar un seguro.
```

Estos valores alimentan footer, WhatsApp y defaults del contenido editable.

## Endpoint Admin/API

```env
REACT_APP_ADMIN_API_URL=https://api.huelmoseguros.com.uy
```

En desarrollo local, si el puerto `4000` está ocupado:

```env
REACT_APP_ADMIN_API_URL=http://localhost:4001
```

Después de cambiar una variable `REACT_APP_*`, reiniciá el frontend (`npm start`) o redeployá la app.

## EmailJS

```env
REACT_APP_EMAILJS_PUBLIC_KEY=...
REACT_APP_EMAILJS_SERVICE_ID=...
REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID=...
REACT_APP_EMAILJS_QUOTE_TEMPLATE_ID=...
REACT_APP_EMAILJS_TO_EMAIL=recepcion@dominio.com
REACT_APP_EMAILJS_FROM_EMAIL=web@dominio.com
REACT_APP_EMAILJS_FROM_NAME=Huelmo Seguros Web
```

Para cambiar el mail de recepción, cambiá `REACT_APP_EMAILJS_TO_EMAIL`.

Para cambiar el remitente configurado en las plantillas, cambiá `REACT_APP_EMAILJS_FROM_EMAIL` y `REACT_APP_EMAILJS_FROM_NAME`.

En EmailJS, las plantillas deben usar estas variables:

```text
to_email
reply_to
sender_email
sender_name
from_name
from_email
phone
message
g-recaptcha-response
```

Si EmailJS no permite cambiar el destinatario desde variable, actualizá el destinatario dentro del template o del servicio en el panel de EmailJS.

## reCAPTCHA

```env
REACT_APP_RECAPTCHA_SITE_KEY=...
```

La clave secreta de reCAPTCHA no debe estar en el frontend. Si más adelante se valida CAPTCHA desde backend, esa clave va como variable privada del servidor.

## Errores

Los textos de error visibles están en `APP_CONFIG.errors` dentro de `src/config/appConfig.js`.

## Teléfonos de siniestro

Los teléfonos base por aseguradora están en `APP_CONFIG.claimsContacts`. También se pueden editar desde el panel admin en la sección Aseguradoras.
