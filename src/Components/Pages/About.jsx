import '../../styles/Pages.css';

function About() {
  const features = [
    { icon: '👤', title: 'Atención Personalizada', description: 'Servicio dedicado a tus necesidades' },
    { icon: '👨‍💼', title: 'Personal Profesional', description: 'Expertos en seguros' },
    { icon: '🔒', title: 'Mayor Seguridad', description: 'Protección confiable' },
    { icon: '💰', title: 'Planes Accesibles', description: 'Opciones para todos' },
  ];

  return (
    <div className="page-container">
      <section className="hero">
        <h1>Nosotros</h1>
        <p className="subtitle">Corredores de seguros con experiencia</p>
      </section>

      <section className="about-section">
        <div className="about-content">
          <h2>Nuestra Historia</h2>
          <p>Tenemos más de 10 años de experiencia en el asesoramiento de seguros.</p>
          <p>Nuestro compromiso ha sido siempre ofrecer productos de calidad, con las mejores compañías aseguradoras del mercado, asegurando un excelente nivel de nuestros servicios.</p>
        </div>

        <div className="features-grid">
          <h2>Nuestros Beneficios</h2>
          <div className="features">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
