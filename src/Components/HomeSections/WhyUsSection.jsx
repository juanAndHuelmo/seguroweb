import { useSiteContent } from '../../Hooks/useSiteContent';

function WhyUsSection() {
  const { content } = useSiteContent();

  return (
    <section className="why-us-section">
      <h2>{content.whyUs.title}</h2>
      {content.whyUs.items.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
    </section>
  );
}

export default WhyUsSection;
