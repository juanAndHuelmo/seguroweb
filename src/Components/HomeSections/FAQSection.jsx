import { useAppConfig } from '../../Context/AppConfigContext';

function FAQSection() {
  const { config } = useAppConfig();

  return (
    <section className="faq-section">
      <h2>{config.faq.title}</h2>
      {config.faq.items.map((item, i) => (
        <details key={i}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </section>
  );
}

export default FAQSection;
