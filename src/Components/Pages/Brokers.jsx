import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useSiteContent } from '../../Hooks/useSiteContent';

/* ===== ANIMACIONES ===== */
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-260px * var(--broker-count))); } 
`;

/* ===== ESTILOS ===== */

const SectionWrapper = styled.section`
  padding: 100px 0;
  text-align: center;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
`;

const Header = styled.div`
  margin-bottom: 60px;
  padding: 0 20px;

  h2 {
    font-size: clamp(2.2rem, 5vw, 3rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
    /* Gradiente de texto igual al About */
    background: linear-gradient(180deg, #fff 0%, var(--color-accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: var(--color-accent);
    font-size: 1.2rem;
    font-weight: 300;
    max-width: 700px;
    margin: 0 auto;
    opacity: 0.9;
  }
`;

const MarqueeContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 40px 0;

  /* Degradados laterales para desvanecimiento suave */
  &::before,
  &::after {
    content: "";
    height: 100%;
    position: absolute;
    width: 200px;
    z-index: 2;
    pointer-events: none;
  }

  &::before {
    left: 0;
    top: 0;
    background: linear-gradient(to right, var(--color-primary) 10%, transparent 100%);
  }

  &::after {
    right: 0;
    top: 0;
    background: linear-gradient(to left, var(--color-secondary) 10%, transparent 100%);
  }
`;

const MarqueeTrack = styled.div`
  display: flex;
  width: calc(260px * var(--broker-total));
  animation: ${scroll} 35s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const LogoCard = styled.div`
  width: 230px;
  height: 110px;
  margin: 0 15px;
  /* Glassmorphism: Fondo semitransparente con desenfoque */
  backdrop-filter: blur(12px);
  background: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  padding: 25px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled.img`
  max-width: 85%;
  max-height: 65%;
  object-fit: contain;

  ${LogoCard}:hover & {
    /* Al pasar el mouse, recuperan color original para destacar */
    filter: brightness(1) invert(0) opacity(1);
  }
`;

/* ===== COMPONENTE ===== */

const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  return process.env.PUBLIC_URL + path;
};

function Brokers() {
  const { content } = useSiteContent();
  const brokers = content.brokers.items;

  const fullList = [...brokers, ...brokers];

  return (
    <SectionWrapper>
      <Header>
        <h2>{content.brokers.title}</h2>
        <p>{content.brokers.subtitle}</p>
      </Header>

      <MarqueeContainer>
        <MarqueeTrack
          style={{
            '--broker-count': brokers.length,
            '--broker-total': fullList.length,
          }}
        >
          {fullList.map((broker, index) => (
            <LogoCard key={index}>
              <Image src={getAssetUrl(broker.image)} alt={broker.name} />
            </LogoCard>
          ))}
        </MarqueeTrack>
      </MarqueeContainer>
    </SectionWrapper>
  );
}

export default Brokers;
