import { useState } from 'react';
import emailjs from '@emailjs/browser';
import styled, { keyframes, css } from 'styled-components';

// Inicializar EmailJS
emailjs.init('FWhla7meyPyV00HZZ');

/* ===== ANIMACIONES ===== */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* ===== ESTILOS RESPONSIVE (Styled Components) ===== */
const FormContainer = styled.div`
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  background: white;
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;

  @media (max-width: 600px) {
    border-radius: 24px;
  }
`;

const FormWrapper = styled.div`
  padding: 40px;
  @media (max-width: 600px) {
    padding: 25px 20px;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
  h2 { font-size: 2rem; color: #1d1d1f; margin-bottom: 8px; font-weight: 700; }
  p { color: #86868b; font-size: 1.1rem; }
`;

const DockContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 30px;
  overflow-x: auto;
  padding: 10px 5px;
  
  /* Scroll suave para mobile */
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 600px) {
    justify-content: flex-start;
  }
`;

const DockItem = styled.button`
  width: 55px;
  height: 65px;
  border-radius: 16px;
  border: 2px solid ${props => props.active ? '#064e3b' : 'transparent'};
  background: ${props => props.active ? '#f5f5f7' : 'white'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  padding: 0;
  overflow: hidden;
  position: relative;

  img { width: 100%; height: 100%; object-fit: cover; opacity: ${props => props.active ? 1 : 0.6}; }
  
  &:hover { transform: scale(1.05); }
  
  ${props => props.active && css`
    transform: scale(1.1);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  `}
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 15px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* Una sola columna en mobile */
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid #d2d2d7;
  font-size: 16px; /* Evita zoom molesto en iOS */
  transition: border 0.2s;
  &:focus { border-color: #064e3b; outline: none; }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid #d2d2d7;
  font-size: 16px;
  background: white;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #064e3b;
  color: white;
  border: none;
  padding: 18px;
  border-radius: 14px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 20px;

  &:hover { background: #10b981; }
  &:disabled { background: #d2d2d7; cursor: not-allowed; }
`;

/* ===== COMPONENTE ===== */
function QuotationForm({ onClose }) {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', insuranceType: 'vehicles',
    vehicleModel: '', vehicleYear: '', homeArea: '', propertyStatus: '',
    commerceType: '', commerceArea: '', lifeAge: '', isSmoker: '',
    tripDuration: '', tripDestination: '', additionalInfo: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const insuranceTypes = [
    { value: 'vehicles', label: 'Vehículos', img: process.env.PUBLIC_URL + '/Images/Logos/vehiculo.jpg' },
    { value: 'home', label: 'Hogar', img: process.env.PUBLIC_URL + '/Images/Logos/hogar.jpg' },
    { value: 'commerce', label: 'Comercio', img: process.env.PUBLIC_URL + '/Images/Logos/Empresa.jpg' },
    { value: 'life', label: 'Vida', img: process.env.PUBLIC_URL + '/Images/Logos/vida.jpg' },
    { value: 'travel', label: 'Viaje', img: process.env.PUBLIC_URL + '/Images/Logos/viaje.jpg' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const templateData = {
        to_email: 'huelmojuan96@gmail.com',
        from_name: formData.fullName,
        from_email: formData.email,
        phone: formData.phone,
        insurance_type: formData.insuranceType,
        message: formData.additionalInfo || 'Sin detalles adicionales',
        // Concatenar info técnica para el email
        technical_details: `
          ${formData.vehicleModel ? 'Modelo: ' + formData.vehicleModel : ''}
          ${formData.vehicleYear ? 'Año: ' + formData.vehicleYear : ''}
          ${formData.homeArea ? 'Área: ' + formData.homeArea + 'm2' : ''}
          ${formData.tripDestination ? 'Destino: ' + formData.tripDestination : ''}
        `
      };

      await emailjs.send('service_qsf0m5b', 'template_hw7rel8', templateData);
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        if (onClose) onClose();
      }, 2500);
    } catch (err) {
      setError('Ocurrió un error. Intenta nuevamente.');
      setLoading(false);
    }
  };

  return (
    <FormContainer onClick={(e) => e.stopPropagation()}>
      <FormWrapper>
        <Header>
          <h2>Cotización</h2>
          <p>Protege lo que más quieres hoy</p>
        </Header>

        <DockContainer>
          {insuranceTypes.map((type) => (
            <DockItem 
              key={type.value} 
              active={formData.insuranceType === type.value}
              onClick={() => setFormData({...formData, insuranceType: type.value})}
            >
              <img src={type.img} alt={type.label} />
            </DockItem>
          ))}
        </DockContainer>

        {submitted ? (
          <div style={{textAlign: 'center', padding: '40px', color: '#064e3b', fontWeight: 'bold'}}>
            ✅ ¡Enviado con éxito! Te contactaremos pronto.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="fade-in">
            {/* Campos Dinámicos según tipo */}
            <FormGrid>
              {formData.insuranceType === 'vehicles' && (
                <>
                  <StyledInput type="text" name="vehicleModel" placeholder="Modelo" onChange={handleChange} required />
                  <StyledInput type="number" name="vehicleYear" placeholder="Año" onChange={handleChange} required />
                </>
              )}
              {formData.insuranceType === 'home' && (
                <>
                  <StyledInput type="number" name="homeArea" placeholder="m² de la propiedad" onChange={handleChange} required />
                  <StyledSelect name="propertyStatus" onChange={handleChange} required>
                    <option value="">Estado</option>
                    <option value="Nueva">Nueva</option>
                    <option value="Usada">Usada</option>
                  </StyledSelect>
                </>
              )}
              {formData.insuranceType === 'travel' && (
                <>
                  <StyledInput type="text" name="tripDestination" placeholder="Destino" onChange={handleChange} required />
                  <StyledInput type="text" name="tripDuration" placeholder="Días de viaje" onChange={handleChange} required />
                </>
              )}
              {/* Otros tipos se pueden agregar siguiendo el mismo patrón */}
            </FormGrid>

            {/* Campos fijos de contacto */}
            <div style={{marginTop: '20px'}}>
              <StyledInput style={{marginBottom: '15px'}} type="text" name="fullName" placeholder="Nombre completo" onChange={handleChange} required />
              <FormGrid>
                <StyledInput type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
                <StyledInput type="tel" name="phone" placeholder="Celular" onChange={handleChange} required />
              </FormGrid>
              <textarea 
                style={{width: '100%', borderRadius: '12px', padding: '15px', border: '1px solid #d2d2d7', marginTop: '15px', fontSize: '16px', minHeight: '80px'}}
                name="additionalInfo" 
                placeholder="Notas adicionales..." 
                onChange={handleChange}
              />
            </div>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Solicitud'}
            </SubmitButton>
            {error && <p style={{color: 'red', textAlign: 'center', marginTop: '10px'}}>{error}</p>}
          </form>
        )}
      </FormWrapper>
    </FormContainer>
  );
}

export default QuotationForm;