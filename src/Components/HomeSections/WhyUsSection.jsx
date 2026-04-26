function WhyUsSection() {
  const items = [
    'Cotización rápida',
    'Asesores especializados',
    'Amplia variedad',
    'Acompañamiento en siniestros',
    'Trato humano'
  ];

  return (
    <section className="why-us-section">
      <h2>¿Por qué elegirnos?</h2>
      {items.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
    </section>
  );
}

export default WhyUsSection;