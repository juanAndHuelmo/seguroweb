import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useSiteContent } from '../../Hooks/useSiteContent';
import { APP_CONFIG } from '../../config/appConfig';
import SmartImage from '../Common/SmartImage';

/* ===== ANIMACIONES ===== */
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-300px * var(--broker-count))); } 
`;

/* ===== ESTILOS ===== */

const SectionWrapper = styled.section`
  padding: 100px 0;
  text-align: center;
  background: linear-gradient(135deg, ${props => props.$colors.backgroundStart} 0%, ${props => props.$colors.backgroundEnd} 100%);
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
    background: linear-gradient(180deg, ${props => props.$colors.title} 0%, ${props => props.$colors.subtitle} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: ${props => props.$colors.subtitle};
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
  width: calc(300px * var(--broker-total));
  animation: ${scroll} 35s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const LogoCard = styled.div`
  width: 270px;
  min-height: 170px;
  margin: 0 15px;
  /* Glassmorphism: Fondo semitransparente con desenfoque */
  backdrop-filter: blur(12px);
  background: ${props => props.$itemColors.cardBackground || props.$colors.cardBackground};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  padding: 22px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled(SmartImage)`
  max-width: 85%;
  height: 58px;

  ${LogoCard}:hover & {
    /* Al pasar el mouse, recuperan color original para destacar */
    filter: brightness(1) invert(0) opacity(1);
  }
`;

const ClaimsInfo = styled.div`
  color: var(--color-dark);
  text-align: center;

  span {
    display: block;
    color: #667085;
    font-size: 0.74rem;
    line-height: 1.3;
    margin-bottom: 6px;
  }

  a {
    color: ${props => props.$itemColors.phone || props.$colors.phone};
    font-size: 1rem;
    font-weight: 800;
    text-decoration: none;
  }

  a:hover {
    color: var(--color-secondary);
  }
`;

/* ===== COMPONENTE ===== */

const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  return process.env.PUBLIC_URL + path;
};

const normalizeName = (name = '') => name.toLowerCase().trim();

const getClaimsInfo = (broker) => {
  const fallback = APP_CONFIG.claimsContacts[normalizeName(broker.name)] || {};
  return {
    claimsPhone: broker.claimsPhone || fallback.claimsPhone,
    claimsDetail: broker.claimsDetail || fallback.claimsDetail || 'Siniestros',
  };
};

const getTelHref = (phone = '') => `tel:${phone.replace(/\D/g, '')}`;

function Brokers() {
  const { content } = useSiteContent();
  const brokers = content.brokers.items;
  const colors = content.styles?.brokers || {};

  const fullList = [...brokers, ...brokers];

  return (
    <SectionWrapper $colors={colors}>
      <Header $colors={colors}>
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
          {fullList.map((broker, index) => {
            const claimsInfo = getClaimsInfo(broker);

            return (
              <LogoCard key={`${broker.name}-${index}`} $colors={colors} $itemColors={broker.colors || {}}>
                <Image src={getAssetUrl(broker.image)} alt={broker.name} fit="contain" />
                {claimsInfo.claimsPhone && (
                  <ClaimsInfo $colors={colors} $itemColors={broker.colors || {}}>
                    <span>{claimsInfo.claimsDetail}</span>
                    <a href={getTelHref(claimsInfo.claimsPhone)}>
                      {claimsInfo.claimsPhone}
                    </a>
                  </ClaimsInfo>
                )}
              </LogoCard>
            );
          })}
        </MarqueeTrack>
      </MarqueeContainer>
    </SectionWrapper>
  );
}

export default Brokers;
