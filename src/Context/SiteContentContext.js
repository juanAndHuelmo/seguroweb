import { createContext, useEffect, useState } from 'react';

export const SiteContentContext = createContext();

export const DEFAULT_SITE_CONTENT = {
  services: [
    {
      title: 'Vehículos',
      icon: '/Images/Logos/vehiculo.jpg',
      imagen: '/Images/fondovehiculo.jpg',
      description: 'Cotice la cobertura para su vehículo con los mejores beneficios y respaldo.',
    },
    {
      title: 'Hogar',
      icon: '/Images/Logos/hogar.jpg',
      imagen: '/Images/fondohogar.jpg',
      description: 'Proteja su casa y sus bienes contra todo riesgo con planes a medida.',
    },
    {
      title: 'Comercio',
      icon: '/Images/Logos/Empresa.jpg',
      imagen: '/Images/fondocomercio.jpg',
      description: 'Acceda a un combinado de coberturas para proteger su negocio e inversión.',
    },
    {
      title: 'Vida',
      icon: '/Images/Logos/vida.jpg',
      imagen: '/Images/fondovida.jpg',
      description: 'La tranquilidad de saber que el futuro de los suyos está siempre protegido.',
    },
    {
      title: 'Viaje',
      icon: '/Images/Logos/viaje.jpg',
      imagen: '/Images/fondoviaje.jpg',
      description: 'Viaje seguro al exterior con la asistencia médica y respaldo internacional.',
    },
  ],
  whyUs: {
    title: '¿Por qué elegirnos?',
    items: [
      'Cotización rápida',
      'Asesores especializados',
      'Amplia variedad',
      'Acompañamiento en siniestros',
      'Trato humano',
    ],
  },
  about: {
    title: 'Nosotros',
    subtitle: 'Llevamos más de una década protegiendo lo que más valorás.',
    historyTitle: 'Nuestra Historia',
    historyParagraphs: [
      'Desde Montevideo, hemos transformado la manera en que nuestros clientes gestionan sus riesgos, combinando tecnología y calidez humana.',
      'Nuestro enfoque no es simplemente vender pólizas; es diseñar escudos a medida que te permitan vivir y trabajar con total libertad.',
    ],
    features: [
      {
        title: 'Atención Personalizada',
        description: 'Asesoramiento uno a uno adaptado a tu realidad específica.',
      },
      {
        title: 'Personal Profesional',
        description: 'Expertos certificados con trayectoria sólida en el mercado.',
      },
      {
        title: 'Mayor Seguridad',
        description: 'Respaldo total de las compañías líderes a nivel mundial.',
      },
      {
        title: 'Planes Accesibles',
        description: 'Optimizamos tus costos sin sacrificar ni un ápice de cobertura.',
      },
    ],
    ctaText: 'Solicitar Cotización',
  },
  brokers: {
    title: 'Nuestras Aseguradoras',
    subtitle: 'Trabajamos con compañías líderes para ofrecerte la mejor cobertura, precio y respaldo.',
    items: [
      { name: 'SURA', image: '/Images/Logos/Brokers/sura.svg' },
      { name: 'Berkley', image: '/Images/Logos/Brokers/berkley.jpeg' },
      { name: 'PORTO', image: '/Images/Logos/Brokers/porto.webp' },
      { name: 'Surco', image: '/Images/Logos/Brokers/surco.png' },
      { name: 'Barbuss', image: '/Images/Logos/Brokers/barbuss.jpeg' },
      { name: 'BSE', image: '/Images/Logos/Brokers/bse.png' },
    ],
  },
  footer: {
    email: 'phuelmoseguros@gmail.com',
    phone: '+598 92 290 092',
    schedule: 'Lunes a viernes 9:00 - 17:00',
    about:
      'Huelmo Seguros se dedica a proteger a las personas, familias y empresas ante riesgos imprevistos que puedan afectar su bienestar financiero y calidad de vida.',
    instagram: 'https://www.instagram.com/huelmoseguros',
    facebook: 'https://www.facebook.com/huelmoseguros',
    linkedin: 'https://linkedin.com',
  },
  whatsapp: {
    phone: '+598922290092',
    message: 'Hola, quiero más información sobre cotizar un seguro.',
  },
};

const STORAGE_KEY = 'siteContent';

function mergeContent(savedContent) {
  return {
    ...DEFAULT_SITE_CONTENT,
    ...savedContent,
    whyUs: { ...DEFAULT_SITE_CONTENT.whyUs, ...savedContent?.whyUs },
    about: { ...DEFAULT_SITE_CONTENT.about, ...savedContent?.about },
    brokers: { ...DEFAULT_SITE_CONTENT.brokers, ...savedContent?.brokers },
    footer: { ...DEFAULT_SITE_CONTENT.footer, ...savedContent?.footer },
    whatsapp: { ...DEFAULT_SITE_CONTENT.whatsapp, ...savedContent?.whatsapp },
    services: savedContent?.services || DEFAULT_SITE_CONTENT.services,
  };
}

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? mergeContent(JSON.parse(saved)) : DEFAULT_SITE_CONTENT;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  const updateContent = (section, value) => {
    setContent((current) => ({
      ...current,
      [section]: value,
    }));
  };

  const resetContent = () => {
    setContent(DEFAULT_SITE_CONTENT);
  };

  return (
    <SiteContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </SiteContentContext.Provider>
  );
}
