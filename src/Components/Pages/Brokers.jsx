import React from 'react';
import styled from 'styled-components';
import '../../styles/Pages.css';

/* ===== ESTILOS ===== */

const Container = styled.div`
  padding: 20px;
`;

const BrokersSection = styled.section`
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(16px);
  border-radius: 28px;
  padding: 2rem;
  box-shadow: 0 12px 35px rgba(0,0,0,0.08);
  overflow: hidden;
`;

const Title = styled.h1`
  text-align: center;
  color: #0f5132;
  margin-bottom: 0.7rem;
`;

const IntroParagraph = styled.p`
  text-align: center;
  color: #5a6b61;
  max-width: 700px;
  margin: 0 auto 2rem;
`;

const SliderWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const SliderTrack = styled.div`
  display: flex;
  gap: 18px;
  width: max-content;
  animation: scroll 24s linear infinite;

  &:hover {
    animation-play-state: paused;
  }

  @keyframes scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
`;

const BrokerCard = styled.div`
  min-width: 220px;
  height: 120px;
  background: white;
  border-radius: 22px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0,0,0,0.07);
  transition: 0.25s ease;

  &:hover {
    transform: translateY(-6px) scale(1.03);
  }
`;

const ProductImage = styled.img`
  max-width: 160px;
  max-height: 70px;
  object-fit: contain;
`;

/* ===== COMPONENTE ===== */

function Brokers() {
  const base = process.env.PUBLIC_URL;

const brokers = [
    { name: 'SURA', image: process.env.PUBLIC_URL + 'Images/Logos/Brokers/sura.svg' },
    { name: 'Berkley', image: process.env.PUBLIC_URL + 'Images/Logos/Brokers/berkley.jpeg' },
    { name: 'PORTO', image: process.env.PUBLIC_URL + 'Images/Logos/Brokers/porto.webp' },
    { name: 'Surco', image: process.env.PUBLIC_URL + 'Images/Logos/Brokers/surco.png' },
    { name: 'Barbuss', image: process.env.PUBLIC_URL + 'Images/Logos/Brokers/barbuss.jpeg' },
    { name: 'BSE', image: process.env.PUBLIC_URL + 'Images/Logos/Brokers/bse.png' },
  ];
  const sliderItems = [...brokers, ...brokers];

  return (
    <Container>
      <BrokersSection>
        <Title>Aseguradoras</Title>

        <IntroParagraph>
          Trabajamos con compañías líderes para ofrecerte la mejor cobertura,
          precio y respaldo.
        </IntroParagraph>

        <SliderWrapper>
          <SliderTrack>
            {sliderItems.map((broker, index) => (
              <BrokerCard key={index}>
                <ProductImage
                  src={broker.image}
                  alt={broker.name}
                />
              </BrokerCard>
            ))}
          </SliderTrack>
        </SliderWrapper>
      </BrokersSection>
    </Container>
  );
}

export default Brokers;