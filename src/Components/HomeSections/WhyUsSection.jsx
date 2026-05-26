import { useSiteContent } from '../../Hooks/useSiteContent';
import styled from 'styled-components';

const Section = styled.section`
  background: ${props => props.$colors.background};
  color: ${props => props.$colors.itemText};
  display: grid;
  gap: 16px;
  justify-items: center;

  h2 {
    color: ${props => props.$colors.title};
  }
`;

const Item = styled.div`
  width: min(100%, 620px);
  background: ${props => props.$colors.itemBackground};
  color: ${props => props.$colors.itemText};
  border-radius: 8px;
  padding: 16px 18px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
`;

function WhyUsSection() {
  const { content } = useSiteContent();
  const colors = content.styles?.whyUs || {};

  return (
    <Section className="why-us-section" $colors={colors}>
      <h2>{content.whyUs.title}</h2>
      {content.whyUs.items.map((item, i) => (
        <Item key={i} $colors={colors}>{item}</Item>
      ))}
    </Section>
  );
}

export default WhyUsSection;
