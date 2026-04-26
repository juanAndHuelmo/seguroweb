function FAQSection() {
  const faq = [
    { q: 'SOA', a: 'Cobertura obligatoria básica.' },
    { q: 'Todo Riesgo', a: 'Cobertura total.' }
  ];

  return (
    <section className="faq-section">
      <h2>Coberturas</h2>
      {faq.map((item, i) => (
        <details key={i}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </section>
  );
}

export default FAQSection;