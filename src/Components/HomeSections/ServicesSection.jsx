import { useEffect, useState } from 'react';
import '../../styles/Pages.css';

const services = [
  {
    image: 'Images/Logos/vehiculo.jpg',
    imageback: 'Images/Logos/vehiculo.jpg',
    title: 'Vehículos',
    description: 'Solicite cotización para la cobertura de su vehículo. Protéjase por reclamos de terceros, incendio, robo y daños propios.',
  },
  {
    image: 'Images/Logos/hogar.jpg',
    imageback: 'Images/Logos/hogar.jpg',
    title: 'Hogar',
    description: 'Cotice las coberturas más completas y flexibles para proteger su hogar contra incendio, robos y otros daños.',
  },
  {
    image: 'Images/Logos/Empresa.jpg',
    imageback: 'Images/Logos/Empresa.jpg',
    title: 'Comercio',
    description: 'Acceda a un combinado de coberturas. Mantenga su negocio protegido ante incendio, robo, reclamo de terceros y otros riesgos.',
  },
  {
    image: 'Images/Logos/vida.jpg',
    imageback: 'Images/fondovida.jpg',
    title: 'Vida',
    description: 'Protéjase y proteja a los suyos contratando: Accidente personal, vida y/o ahorro.',
  },
  {
    image: 'Images/Logos/viaje.jpg',
    imageback: 'Images/Logos/viaje.jpg',
    title: 'Viaje',
    description: 'Disfruta de tu viaje al exterior con la mayor tranquilidad.',
  },
];

function ServicesSection({ openQuote }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  // Auto-reproducción del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 3000); // 3 segundos para que el usuario pueda leer mejor

    return () => clearInterval(interval);
  }, []);

  // Lógica de Swipe (Gestos táctiles)
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  
  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    if (distance > 50) { // Swipe Izquierda (Siguiente)
      setCurrentIndex((prev) => (prev + 1) % services.length);
    } else if (distance < -50) { // Swipe Derecha (Anterior)
      setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
    }
  };

  return (
    <section className="services-section">
      <div className="carousel-container">
        <div 
          className="carousel-slide"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Fondo con desenfoque opcional */}
          <div className="carousel-background">
            <img src={services[currentIndex].imageback} alt="" />
          </div>

          <div className="carousel-content">
            <div className="carousel-image">
              <img src={services[currentIndex].image} alt={services[currentIndex].title} />
            </div>
            <h2>{services[currentIndex].title}</h2>
            <p>{services[currentIndex].description}</p>
            <button className="request-quote" onClick={openQuote}>
              Solicitar Cotización
            </button>
          </div>
        </div>
      </div>

      {/* Dock de Thumbnails estilo macOS */}
      <div className="carousel-thumbnails">
        {services.map((service, index) => (
          <button
            key={index}
            className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="thumbnail-title">{service.title}</span>
            <img src={service.image} alt={service.title} />
          </button>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;