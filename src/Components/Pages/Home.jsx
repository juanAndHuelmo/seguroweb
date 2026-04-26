import { useState, useEffect } from 'react';
import '../../styles/Pages.css';

// Importaciones corregidas: Salimos de Pages (..), entramos en HomeSections
import ServicesSection from '../HomeSections/ServicesSection';
import WhyUsSection from '../HomeSections/WhyUsSection';
import HeroSection from '../HomeSections/HeroSection';

// El formulario está en Components/Forms
import QuotationForm from '../Forms/QuotationForm';
import Brokers from './Brokers';

function Home() {
  const [showQuotationForm, setShowQuotationForm] = useState(false);

  const toggleModal = () => setShowQuotationForm(!showQuotationForm);

  // Controlar scroll del body cuando el modal está abierto
  useEffect(() => {
    if (showQuotationForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showQuotationForm]);

  return (
    <div className="page-container">
      {/* MODAL DE COTIZACIÓN - FUERA DEL HOME PARA NO OSCURECERSE */}
      {showQuotationForm && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={toggleModal}>&times;</button>
            <QuotationForm onClose={toggleModal} />
          </div>
        </div>
      )}

      <div className={`home-page ${showQuotationForm ? 'modal-open' : ''}`}>
      {/* SECCIONES DEL HOME */}
      <ServicesSection openQuote={toggleModal} />
      <Brokers />
       <WhyUsSection /> 
      {/* <HeroSection openQuote={toggleModal} /> */}
 
 {/*     <EmergencySection />
      <FAQSection />
      <CTASection openQuote={toggleModal} />
      */}
      </div>
    </div>
  );
}

export default Home;