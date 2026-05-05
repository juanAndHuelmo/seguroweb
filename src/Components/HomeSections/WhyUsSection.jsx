import { useAppConfig } from '../../Context/AppConfigContext';

function WhyUsSection() {
  const { config } = useAppConfig();

  return (
    <section className="why-us-section">
      <h2>{config.whyUs.title}</h2>
      {config.whyUs.items.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
    </section>
  );
}

export default WhyUsSection;
