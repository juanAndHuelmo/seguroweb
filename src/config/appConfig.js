const developmentApiUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '';
const productionApiUrl = 'https://api.huelmoseguros.com.uy';

export const APP_CONFIG = {
  endpoints: {
    adminApiUrl:
      process.env.REACT_APP_API_URL ||
      process.env.REACT_APP_ADMIN_API_URL ||
      developmentApiUrl ||
      productionApiUrl,
  },

  contact: {
    email: process.env.REACT_APP_CONTACT_EMAIL || 'phuelmoseguros@gmail.com',
    phone: process.env.REACT_APP_CONTACT_PHONE || '+598 92 290 092',
    schedule: process.env.REACT_APP_CONTACT_SCHEDULE || 'Lunes a viernes 9:00 - 17:00',
  },

  whatsapp: {
    phone: process.env.REACT_APP_WHATSAPP_PHONE || '+598922290092',
    message:
      process.env.REACT_APP_WHATSAPP_MESSAGE ||
      'Hola, quiero más información sobre cotizar un seguro.',
  },

  claimsContacts: {
    sura: { claimsPhone: '0800 8120', claimsDetail: 'Siniestros y asistencias 24 hs' },
    berkley: { claimsPhone: '0800 8542', claimsDetail: 'Siniestros 24 hs' },
    porto: { claimsPhone: '2487 8616', claimsDetail: 'Porto Asistencia 24 hs' },
    surco: { claimsPhone: '0800 1320', claimsDetail: 'Automotor y propiedad' },
    barbuss: { claimsPhone: '0800 2777', claimsDetail: 'Denuncia inmediata' },
    bse: { claimsPhone: '1994', claimsDetail: 'Denuncia de siniestros' },
  },

  integrations: {
    emailjs: {
      publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'FWhla7meyPyV00HZZ',
      serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_qsf0m5b',
      contactTemplateId:
        process.env.REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID || 'template_qjor7vt',
      quoteTemplateId:
        process.env.REACT_APP_EMAILJS_QUOTE_TEMPLATE_ID || 'template_hw7rel8',
      toEmail: process.env.REACT_APP_EMAILJS_TO_EMAIL || 'phuelmoseguros@gmail.com',
      fromEmail:
        process.env.REACT_APP_EMAILJS_FROM_EMAIL || 'phuelmoseguros@gmail.com',
      fromName: process.env.REACT_APP_EMAILJS_FROM_NAME || 'Huelmo Seguros Web',
    },
    recaptcha: {
      siteKey:
        process.env.REACT_APP_RECAPTCHA_SITE_KEY ||
        '6LcYososAAAAANiGCDq90Exc3GTVzzoDgF2CnBSE',
    },
  },

  errors: {
    requiredName: 'Nombre requerido',
    requiredLastName: 'Apellido requerido',
    requiredPhone: 'Teléfono requerido',
    requiredEmail: 'Email requerido',
    invalidEmail: 'Email inválido',
    requiredQueryType: 'Selecciona una opción',
    requiredMessage: 'Escribe tu consulta',
    requiredCaptcha: 'Completa el CAPTCHA',
    contactSendFailed: 'Error al enviar el mensaje.',
    quoteIncomplete: 'Completá los datos requeridos',
    quoteCaptcha: 'Completá el CAPTCHA antes de enviar.',
    quoteSuccess: 'Solicitud enviada correctamente.',
    quoteSendFailed: 'Error al enviar. Intentá nuevamente.',
  },
};
