import { createContext, useEffect, useState } from 'react';
import { getApiUrl } from '../config/adminApi';
import { APP_CONFIG } from '../config/appConfig';

export const SiteContentContext = createContext();

const DEFAULT_SECTION_STYLES = {
  services: {
    background: '#f5f5f7',
    cardBackground: '#ffffff',
    title: '#1d1d1f',
    text: '#1d1d1f',
    buttonBackground: '#064e3b',
    buttonText: '#ffffff',
    dockBackground: '#1d1d1f',
  },
  whyUs: {
    background: '#f5f5f7',
    title: '#1d1d1f',
    itemBackground: '#ffffff',
    itemText: '#1d1d1f',
  },
  about: {
    backgroundStart: '#064e3b',
    backgroundEnd: '#2d5016',
    title: '#ffffff',
    text: '#d1d5db',
    accent: '#10b981',
    cardBackground: '#ffffff',
    buttonBackground: '#ffffff',
    buttonText: '#064e3b',
  },
  brokers: {
    backgroundStart: '#064e3b',
    backgroundEnd: '#2d5016',
    title: '#ffffff',
    subtitle: '#10b981',
    cardBackground: '#ffffff',
    phone: '#064e3b',
  },
  footer: {
    background: '#ffffff',
    title: '#064e3b',
    text: '#1d1d1f',
    link: '#064e3b',
    socialBackground: '#f5f5f7',
  },
  whatsapp: {
    background: '#25d366',
    icon: '#ffffff',
  },
  forms: {
    background: '#f2f2f7',
    wrapper: '#ffffff',
    title: '#1d1d1f',
    buttonBackground: '#064e3b',
    buttonText: '#ffffff',
  },
};

export const DEFAULT_SITE_CONTENT = {
  styles: DEFAULT_SECTION_STYLES,
  services: [
    {
      title: 'Vehículos',
      icon: '/Images/Logos/vehiculo.jpg',
      imagen: '/Images/fondovehiculo.jpg',
      description: 'Cotice la cobertura para su vehículo con los mejores beneficios y respaldo.',
      colors: {},
    },
    {
      title: 'Hogar',
      icon: '/Images/Logos/hogar.jpg',
      imagen: '/Images/fondohogar.jpg',
      description: 'Proteja su casa y sus bienes contra todo riesgo con planes a medida.',
      colors: {},
    },
    {
      title: 'Comercio',
      icon: '/Images/Logos/Empresa.jpg',
      imagen: '/Images/fondocomercio.jpg',
      description: 'Acceda a un combinado de coberturas para proteger su negocio e inversión.',
      colors: {},
    },
    {
      title: 'Vida',
      icon: '/Images/Logos/vida.jpg',
      imagen: '/Images/fondovida.jpg',
      description: 'La tranquilidad de saber que el futuro de los suyos está siempre protegido.',
      colors: {},
    },
    {
      title: 'Viaje',
      icon: '/Images/Logos/viaje.jpg',
      imagen: '/Images/fondoviaje.jpg',
      description: 'Viaje seguro al exterior con la asistencia médica y respaldo internacional.',
      colors: {},
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
        colors: {},
      },
      {
        title: 'Personal Profesional',
        description: 'Expertos certificados con trayectoria sólida en el mercado.',
        colors: {},
      },
      {
        title: 'Mayor Seguridad',
        description: 'Respaldo total de las compañías líderes a nivel mundial.',
        colors: {},
      },
      {
        title: 'Planes Accesibles',
        description: 'Optimizamos tus costos sin sacrificar ni un ápice de cobertura.',
        colors: {},
      },
    ],
    ctaText: 'Solicitar Cotización',
  },
  brokers: {
    title: 'Nuestras Aseguradoras',
    subtitle: 'Trabajamos con compañías líderes para ofrecerte la mejor cobertura, precio y respaldo.',
    items: [
      { name: 'SURA', image: '/Images/Logos/Brokers/sura.svg', ...APP_CONFIG.claimsContacts.sura },
      { name: 'Berkley', image: '/Images/Logos/Brokers/berkley.jpeg', ...APP_CONFIG.claimsContacts.berkley },
      { name: 'PORTO', image: '/Images/Logos/Brokers/porto.webp', ...APP_CONFIG.claimsContacts.porto },
      { name: 'Surco', image: '/Images/Logos/Brokers/surco.png', ...APP_CONFIG.claimsContacts.surco },
      { name: 'Barbuss', image: '/Images/Logos/Brokers/barbuss.jpeg', ...APP_CONFIG.claimsContacts.barbuss },
      { name: 'BSE', image: '/Images/Logos/Brokers/bse.png', ...APP_CONFIG.claimsContacts.bse },
    ],
  },
  footer: {
    email: APP_CONFIG.contact.email,
    phone: APP_CONFIG.contact.phone,
    schedule: APP_CONFIG.contact.schedule,
    about:
      'Huelmo Seguros se dedica a proteger a las personas, familias y empresas ante riesgos imprevistos que puedan afectar su bienestar financiero y calidad de vida.',
    instagram: 'https://www.instagram.com/huelmoseguros',
    facebook: 'https://www.facebook.com/huelmoseguros',
    linkedin: 'https://linkedin.com',
  },
  whatsapp: {
    phone: APP_CONFIG.whatsapp.phone,
    message: APP_CONFIG.whatsapp.message,
  },
};

const STORAGE_KEY = 'siteContent';

function mergeContent(savedContent) {
  const savedStyles = savedContent?.styles || {};
  const mergedStyles = Object.keys(DEFAULT_SECTION_STYLES).reduce((styles, key) => ({
    ...styles,
    [key]: { ...DEFAULT_SECTION_STYLES[key], ...savedStyles[key] },
  }), {});

  const mergeItems = (defaultItems, savedItems) => {
    if (!Array.isArray(savedItems)) return defaultItems;
    return savedItems.map((item, index) => ({
      ...(defaultItems[index] || {}),
      ...item,
      colors: { ...(defaultItems[index]?.colors || {}), ...(item.colors || {}) },
    }));
  };

  return {
    ...DEFAULT_SITE_CONTENT,
    ...savedContent,
    styles: mergedStyles,
    whyUs: { ...DEFAULT_SITE_CONTENT.whyUs, ...savedContent?.whyUs },
    about: {
      ...DEFAULT_SITE_CONTENT.about,
      ...savedContent?.about,
      features: mergeItems(DEFAULT_SITE_CONTENT.about.features, savedContent?.about?.features),
    },
    brokers: {
      ...DEFAULT_SITE_CONTENT.brokers,
      ...savedContent?.brokers,
      items: mergeItems(DEFAULT_SITE_CONTENT.brokers.items, savedContent?.brokers?.items),
    },
    footer: { ...DEFAULT_SITE_CONTENT.footer, ...savedContent?.footer },
    whatsapp: { ...DEFAULT_SITE_CONTENT.whatsapp, ...savedContent?.whatsapp },
    services: mergeItems(DEFAULT_SITE_CONTENT.services, savedContent?.services),
  };
}

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? mergeContent(JSON.parse(saved)) : DEFAULT_SITE_CONTENT;
  });

  useEffect(() => {
    const loadPublishedSettings = async () => {
      try {
        const response = await fetch(getApiUrl('/api/settings'));
        if (!response.ok) return;

        const settings = await response.json();
        if (settings.content && Object.keys(settings.content).length > 0) {
          setContent(mergeContent(settings.content));
        }
      } catch (error) {
        // Si la API no está disponible, usamos el contenido local.
      }
    };

    loadPublishedSettings();
  }, []);

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
