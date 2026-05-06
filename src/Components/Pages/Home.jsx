import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Secciones
import ServicesSection from '../HomeSections/ServicesSection';
import WhyUsSection from '../HomeSections/WhyUsSection';
import Brokers from './Brokers';
import QuotationForm from '../Forms/QuotationForm';

// --- Animaciones ---
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// --- Temas macOS Light ---
const theme = {
  bg: 'var(--color-light)',
  white: '#FFFFFF',
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  accent: 'var(--color-accent)',
  textMain: 'var(--color-dark)',
};

const HomePageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${theme.bg};
  color: ${theme.textMain};
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  animation: ${fadeIn} 0.8s ease-in-out;

  /* Estilo unificado para las secciones dentro del Home */
  section {
    padding: 80px 20px;
    max-width: 1200px;
    margin: 0 auto;
    
    /* Forzamos que las cabeceras de las secciones se vean bien en fondo claro */
    h2 {
      color: ${theme.textMain};
      font-weight: 700;
      letter-spacing: -0.02em;
    }
  }
`;

// Contenedor especial para resaltar secciones con el verde que te gusta
const HighlightedSection = styled.div`
  background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%);
  color: white;
  border-radius: 40px; // Bordes muy redondeados tipo iPhone
  margin: 20px;
  padding: 40px 0;
  box-shadow: 0 20px 40px color-mix(in srgb, ${theme.primary} 25%, transparent);

  /* Ajuste para que las secciones internas se vean blancas sobre el verde */
  h2, p, h3 {
    color: white !important;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  display: flex;
  align-items: center;
  z-index: 10000;
  justify-content: center;`;

const ModalContainer = styled.div`
  width: 100%;
  max-width: 700px;
  position: relative;
  background: ${theme.white};
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0,0,0,0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0,0,0,0.05);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;

  &:hover {
    background: rgba(0,0,0,0.1);
  }
`;

function Home() {
  const [showQuotationForm, setShowQuotationForm] = useState(false);

  const toggleModal = () => setShowQuotationForm(!showQuotationForm);

  useEffect(() => {
    document.body.style.overflow = showQuotationForm ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [showQuotationForm]);

  return (
    <HomePageWrapper>
      {/* 1. Sección de Servicios en blanco (Limpio) */}
      <ServicesSection openQuote={toggleModal} />
      
      {/* 2. Sección de Brokers o Beneficios en VERDE (Resalte) */}
      <HighlightedSection>
        <Brokers />
      </HighlightedSection>

      {/* 3. Por qué nosotros en blanco */}
      <WhyUsSection /> 

      {/* MODAL */}
      {showQuotationForm && (
        <ModalOverlay onClick={toggleModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={toggleModal}>&times;</CloseButton>
            <QuotationForm onClose={toggleModal} />
          </ModalContainer>
        </ModalOverlay>
      )}
    </HomePageWrapper>
  );
}

export default Home;
