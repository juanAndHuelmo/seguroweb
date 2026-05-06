import React, { useCallback, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSiteContent } from '../../Hooks/useSiteContent';

/* ===== CONFIG ===== */
const AUTO_PLAY_INTERVAL = 4000;

/* ===== ESTILOS ===== */

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  gap: 40px;
  background-color: var(--color-light);
`;

const MainCard = styled.div`
  position: relative;
  width: 100%;
  max-width: 1050px;
  height: 520px;
  border-radius: 40px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;

  opacity: ${props => (props.active ? 1 : 0)};
  transform: ${props => (props.active ? 'scale(1)' : 'scale(1.05)')};

  transition: opacity 0.8s ease, transform 1.2s ease;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.25);
  backdrop-filter: blur(6px);
  z-index: 1;
`;

const GlassContent = styled.div`
  position: relative;
  z-index: 2;

  background: rgba(255,255,255,0.4);
  backdrop-filter: blur(20px);

  width: 90%;
  max-width: 450px;
  padding: 40px;
  border-radius: 40px;
  text-align: center;

  border: 1px solid rgba(255,255,255,0.8);

  transition: all 0.4s ease;

  .icon-container {
    width: 110px;
    height: 110px;
    margin: 0 auto 25px;
    border-radius: 25px;
    overflow: hidden;
    background: white;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  h2 {
    font-size: 2.4rem;
    margin-bottom: 12px;
  }

  p {
    margin-bottom: 30px;
  }
`;

const GreenButton = styled.button`
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 16px 40px;
  border-radius: 20px;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const DarkDock = styled.div`
  display: flex;
  gap: 12px;
  padding: 14px;
  background: var(--color-dark);
  border-radius: 28px;
`;

const DockItem = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  overflow: hidden;
  padding: 0;
  background: #fff;

  opacity: ${props => (props.active ? 1 : 0.5)};
  transform: ${props => (props.active ? 'scale(1.2) translateY(-8px)' : 'scale(1)')};

  box-shadow: ${props =>
    props.active
      ? '0 10px 20px rgba(0,0,0,0.3)'
      : '0 4px 10px rgba(0,0,0,0.1)'};

  transition: all 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/* ===== COMPONENT ===== */

const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  return process.env.PUBLIC_URL + path;
};

function ServicesSection({ openQuote }) {
  const { content } = useSiteContent();
  const services = content.services;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);

  const intervalRef = useRef(null);

  const activeIndex = hoverIndex !== null ? hoverIndex : currentIndex;

  const nextService = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % services.length);
  }, [services.length]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    intervalRef.current = setInterval(nextService, AUTO_PLAY_INTERVAL);
  }, [nextService, stopAutoPlay]);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  return (
    <SectionWrapper>
      <MainCard
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
      >

        {services.map((s, i) => (
          <BackgroundLayer
            key={i}
            bg={getAssetUrl(s.imagen)}
            active={i === activeIndex}
          />
        ))}

        <BackgroundOverlay />

        <GlassContent>
          <div className="icon-container">
            <img src={getAssetUrl(services[activeIndex].icon)} alt="" />
          </div>
          <h2>{services[activeIndex].title}</h2>
          <p>{services[activeIndex].description}</p>
          <GreenButton onClick={openQuote}>
            Solicitar Cotización
          </GreenButton>
        </GlassContent>

      </MainCard>

      <DarkDock>
        {services.map((s, i) => (
          <DockItem
            key={i}
            active={i === activeIndex}
            onClick={() => {
              setCurrentIndex(i);
              setHoverIndex(null);
            }}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <img src={getAssetUrl(s.icon)} alt={s.title} />
          </DockItem>
        ))}
      </DarkDock>
    </SectionWrapper>
  );
}

export default ServicesSection;
