const asset = path => `/seguroweb${path}`;

module.exports = {
  brand: {
    name: 'Huelmo Seguros',
    logo: asset('/Images/logo.png'),
  },
  nav: [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Nosotros' },
    { id: 'brokers', label: 'Aseguradoras' },
    { id: 'contact', label: 'Contacto' },
  ],
  whatsapp: {
    phone: '+598922290092',
    message: 'Hola, quiero más información sobre cotizar un seguro.',
    title: '¡Contáctanos por WhatsApp!',
    ariaLabel: 'Chat por WhatsApp',
  },
  services: {
    ctaLabel: 'Solicitar Cotización',
    items: [
      { title: 'Vehículos', icon: asset('/Images/Logos/vehiculo.jpg'), image: asset('/Images/fondovehiculo.jpg'), description: 'Cotice la cobertura para su vehículo con los mejores beneficios y respaldo.' },
      { title: 'Hogar', icon: asset('/Images/Logos/hogar.jpg'), image: asset('/Images/fondohogar.jpg'), description: 'Proteja su casa y sus bienes contra todo riesgo con planes a medida.' },
      { title: 'Comercio', icon: asset('/Images/Logos/Empresa.jpg'), image: asset('/Images/fondocomercio.jpg'), description: 'Acceda a un combinado de coberturas para proteger su negocio e inversión.' },
      { title: 'Vida', icon: asset('/Images/Logos/vida.jpg'), image: asset('/Images/fondovida.jpg'), description: 'La tranquilidad de saber que el futuro de los suyos está siempre protegido.' },
      { title: 'Viaje', icon: asset('/Images/Logos/viaje.jpg'), image: asset('/Images/fondoviaje.jpg'), description: 'Viaje seguro al exterior con la asistencia médica y respaldo internacional.' },
    ],
  },
  whyUs: {
    title: '¿Por qué elegirnos?',
    items: ['Cotización rápida', 'Asesores especializados', 'Amplia variedad', 'Acompañamiento en siniestros', 'Trato humano'],
  },
  faq: {
    title: 'Coberturas',
    items: [
      { q: 'SOA', a: 'Cobertura obligatoria básica.' },
      { q: 'Todo Riesgo', a: 'Cobertura total.' },
    ],
  },
  brokers: {
    title: 'Nuestras Aseguradoras',
    subtitle: 'Trabajamos con compañías líderes para ofrecerte la mejor cobertura, precio y respaldo.',
    items: [
      { name: 'SURA', image: asset('/Images/Logos/Brokers/sura.svg') },
      { name: 'Berkley', image: asset('/Images/Logos/Brokers/berkley.jpeg') },
      { name: 'PORTO', image: asset('/Images/Logos/Brokers/porto.webp') },
      { name: 'Surco', image: asset('/Images/Logos/Brokers/surco.png') },
      { name: 'Barbuss', image: asset('/Images/Logos/Brokers/barbuss.jpeg') },
      { name: 'BSE', image: asset('/Images/Logos/Brokers/bse.png') },
    ],
  },
  about: {
    title: 'Nosotros',
    subtitle: 'Llevamos más de una década protegiendo lo que más te importa.',
    historyTitle: 'Nuestra Historia',
    paragraphs: [
      'Desde Montevideo, hemos transformado la manera en que nuestros clientes gestionan sus riesgos, combinando tecnología y calidez humana.',
      'Nuestro enfoque no es simplemente vender pólizas; es diseñar escudos a medida que te permitan vivir y trabajar con total libertad.',
    ],
    ctaLabel: 'Solicitar Cotización',
    features: [
      { icon: 'user', title: 'Atención Personalizada', description: 'Asesoramiento uno a uno adaptado a tu realidad específica.' },
      { icon: 'briefcase', title: 'Personal Profesional', description: 'Expertos certificados con trayectoria sólida en el mercado.' },
      { icon: 'shield', title: 'Mayor Seguridad', description: 'Respaldo total de las compañías líderes a nivel mundial.' },
      { icon: 'safety', title: 'Planes Accesibles', description: 'Optimizamos tus costos sin sacrificar ni un ápice de cobertura.' },
    ],
  },
  footer: {
    contactTitle: 'Contacto',
    email: 'phuelmoseguros@gmail.com',
    phone: '+598 92 290 092',
    hours: 'Lunes a viernes 9:00 - 17:00',
    aboutTitle: 'Sobre Nosotros',
    aboutText: 'Huelmo Seguros se dedica a proteger a las personas, familias y empresas ante riesgos imprevistos que puedan afectar su bienestar financiero y calidad de vida.',
    linksTitle: 'Enlaces Rápidos',
    links: [
      { label: 'Inicio', href: '#home' },
      { label: 'Nosotros', href: '#about' },
      { label: 'Servicios', href: '#services' },
      { label: 'Corredores', href: '#brokers' },
    ],
    socials: {
      instagram: 'https://www.instagram.com/huelmoseguros',
      facebook: 'https://www.facebook.com/huelmoseguros',
      linkedin: 'https://linkedin.com',
    },
    copyright: 'Todos los derechos reservados.',
  },
  contact: {
    title: 'Contacto',
    subtitle: 'Envíanos tu consulta',
    successMessage: 'Mensaje enviado correctamente.',
    errorMessage: 'Error al enviar el mensaje.',
    submitLabel: 'Enviar Consulta',
    loadingLabel: 'Enviando...',
    queryTypes: [
      { value: 'cotizacion', label: 'Cotización' },
      { value: 'reclamo', label: 'Reclamo' },
      { value: 'sugerencia', label: 'Sugerencia' },
      { value: 'otro', label: 'Otro' },
    ],
    emailjs: {
      publicKey: 'FWhla7meyPyV00HZZ',
      serviceId: 'service_qsf0m5b',
      templateId: 'template_qjor7vt',
    },
    recaptchaSiteKey: '6LcYososAAAAANiGCDq90Exc3GTVzzoDgF2CnBSE',
  },
  quotation: {
    emailjs: {
      publicKey: 'FWhla7meyPyV00HZZ',
      serviceId: 'service_qsf0m5b',
      templateId: 'template_hw7rel8',
    },
    departments: ['Montevideo', 'Canelones', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo', 'Rivera', 'Salto', 'Paysandú', 'San José', 'Florida', 'Durazno', 'Flores', 'Soriano', 'Colonia', 'Artigas', 'Lavalleja', 'Río Negro', 'Tacuarembó'],
    tabs: [
      { value: 'vehicles', label: 'Vehículos', image: asset('/Images/Logos/vehiculo.jpg') },
      { value: 'home', label: 'Hogar', image: asset('/Images/Logos/hogar.jpg') },
      { value: 'commerce', label: 'Comercio', image: asset('/Images/Logos/Empresa.jpg') },
      { value: 'life', label: 'Vida', image: asset('/Images/Logos/vida.jpg') },
      { value: 'travel', label: 'Viaje', image: asset('/Images/Logos/viaje.jpg') },
    ],
    vehicleCoverages: ['Responsabilidad Civil', 'Terceros Completo', 'Todo Riesgo'],
    homeTypes: ['Casa', 'Apartamento'],
    homeUses: ['Permanente', 'Temporada'],
    homeConstructionTypes: ['Sólida (Planchada)', 'Liviana (Isopanel/Chapa)'],
    homeCoverages: ['Incendio', 'Incendio y Hurto', 'Todo Riesgo Hogar'],
    commerceSecurityOptions: ['Alarma', 'Rejas', 'Cámaras', 'Alarma + Rejas'],
    lifeCoverageOptions: ['USD 50.000', 'USD 100.000', 'Más de USD 200.000'],
  },
};
