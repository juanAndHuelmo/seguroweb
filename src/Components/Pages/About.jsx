import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import QuotationForm from '../Forms/QuotationForm';
import { useSiteContent } from '../../Hooks/useSiteContent';
import { FiUser, FiShield } from 'react-icons/fi';
import { LuBriefcase } from 'react-icons/lu';
import { MdSafetyCheck } from 'react-icons/md';

// --- Animaciones ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const modalScale = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(-20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

// --- Temas y Estilos ---
const theme = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  accent: 'var(--color-accent)',
  glassWhite: 'rgba(255, 255, 255, 0.08)',
  textGray: '#d1d5db',
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%);
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  padding: 100px 24px;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const Hero = styled.section`
  text-align: center;
  margin-bottom: 80px;

  h1 {
    font-size: clamp(2.5rem, 10vw, 4.5rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    margin-bottom: 16px;
    background: linear-gradient(180deg, #fff 0%, var(--color-accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: clamp(1.1rem, 3vw, 1.4rem);
    color: var(--color-accent);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.5;
    opacity: 0.8;
  }
`;

const ContentGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 4fr 6fr; 
  gap: 80px;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
`;

const HistoryCard = styled.div`
  text-align: left;

  h2 {
    font-size: 2.2rem;
    margin-bottom: 24px;
    color: var(--color-accent);
    letter-spacing: -0.02em;
  }

  p {
    line-height: 1.8;
    font-size: 1.15rem;
    color: ${theme.textGray};
    margin-bottom: 24px;
    font-weight: 300;
  }

  @media (max-width: 768px) {
    text-align: center;
    h2 { font-size: 1.8rem; }
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: ${theme.glassWhite};
  backdrop-filter: blur(10px);
  padding: 40px 30px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .icon-box {
    background: color-mix(in srgb, var(--color-accent) 20%, transparent);
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    margin-bottom: 24px;
    color: var(--color-accent);
    font-size: 2rem;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 12px;
    font-weight: 700;
  }

  p {
    font-size: 0.95rem;
    color: ${theme.textGray};
    line-height: 1.6;
  }
`;

const FooterCTA = styled.div`
  text-align: center;
  margin-top: 80px;
`;

const CTAButton = styled.button`
  background: white;
  color: ${theme.primary};
  border: none;
  padding: 20px 50px;
  font-size: 1.15rem;
  font-weight: 700;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: scale(1.05) translateY(-5px);
    background: ${theme.accent};
    color: white;
    box-shadow: 0 20px 45px rgba(16, 185, 129, 0.4);
  }
`;

// --- Estilos del Modal ---
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 90%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 600px;
  background: transparent;
  position: relative;
  animation: ${modalScale} 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
`;

/* ===== COMPONENTE PRINCIPAL ===== */

function About() {
  const { content } = useSiteContent();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para cerrar el modal
  const closeModal = () => setIsModalOpen(false);
  // Función para abrir el modal
  const openModal = () => setIsModalOpen(true);

  const icons = [<FiUser />, <LuBriefcase />, <FiShield />, <MdSafetyCheck />];

  return (
    <PageContainer>
      <Hero>
        <h1>{content.about.title}</h1>
        <p className="subtitle">{content.about.subtitle}</p>
      </Hero>

      <ContentGrid>
        <HistoryCard>
          <h2>{content.about.historyTitle}</h2>
          {content.about.historyParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </HistoryCard>

        <FeaturesGrid>
          {content.about.features.map((feature, index) => (
            <FeatureCard key={index}>
              <div className="icon-box">{icons[index] || <FiShield />}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </ContentGrid>

      <FooterCTA>
        <CTAButton onClick={openModal}>{content.about.ctaText}</CTAButton>
      </FooterCTA>

      {/* LÓGICA DEL MODAL */}
      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <QuotationForm onClose={closeModal} />
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
}

export default About;
