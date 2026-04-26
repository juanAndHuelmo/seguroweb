import { useState } from 'react';
import emailjs from '@emailjs/browser';
import '../../styles/QuotationForm.css';

// Inicializar EmailJS (reemplaza con tu PUBLIC KEY)
emailjs.init('FWhla7meyPyV00HZZ');

function QuotationForm({ onClose }) {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', insuranceType: '',
    vehicleModel: '', vehicleYear: '', vehicleType: '',
    homeArea: '', propertyStatus: '',
    commerceType: '', commerceArea: '',
    bikeType: '', bikeValue: '',
    lifeAge: '', isSmoker: '',
    tripDuration: '', tripDestination: '',
    additionalInfo: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const insuranceTypes = [
    { value: 'vehicles', label: 'Vehículos', img: '/Images/Logos/vehiculo.jpg' },
    { value: 'home', label: 'Hogar', img: '/Images/Logos/hogar.jpg' },
    { value: 'commerce', label: 'Comercio', img: '/Images/Logos/Empresa.jpg' },
    { value: 'life', label: 'Vida', img: '/Images/Logos/vida.jpg' },
    { value: 'travel', label: 'Viaje', img: '/Images/Logos/viaje.jpg' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectInsurance = (type) => {
    setFormData(prev => ({ ...prev, insuranceType: type }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Preparar datos según tipo de seguro
      const templateData = {
        to_email: 'huelmojuan96@gmail.com',
        from_name: formData.fullName,
        from_email: formData.email,
        phone: formData.phone,
        insurance_type: formData.insuranceType,
      };

      // Agregar campos específicos según tipo
      if (formData.insuranceType === 'vehicles') {
        templateData.vehicle_model = formData.vehicleModel || 'No especificado';
        templateData.vehicle_year = formData.vehicleYear || 'No especificado';
        templateData.message = formData.additionalInfo || 'Sin detalles adicionales';
      } else if (formData.insuranceType === 'home') {
        templateData.home_area = formData.homeArea || 'No especificado';
        templateData.property_status = formData.propertyStatus || 'No especificado';
        templateData.message = formData.additionalInfo || 'Sin detalles adicionales';
      } else if (formData.insuranceType === 'commerce') {
        templateData.commerce_type = formData.commerceType || 'No especificado';
        templateData.commerce_area = formData.commerceArea || 'No especificado';
        templateData.message = formData.additionalInfo || 'Sin detalles adicionales';
      } else if (formData.insuranceType === 'life') {
        templateData.life_age = formData.lifeAge || 'No especificado';
        templateData.is_smoker = formData.isSmoker || 'No especificado';
        templateData.message = formData.additionalInfo || 'Sin detalles adicionales';
      } else if (formData.insuranceType === 'travel') {
        templateData.trip_duration = formData.tripDuration || 'No especificado';
        templateData.trip_destination = formData.tripDestination || 'No especificado';
        templateData.message = formData.additionalInfo || 'Sin detalles adicionales';
      }

      console.log('📤 Datos a enviar:', templateData);

      // Enviar email con EmailJS
      await emailjs.send(
        'service_qsf0m5b',
        'template_hw7rel8',
        templateData
      );

      setSubmitted(true);
      console.log("✅ Email enviado correctamente");
      
      setTimeout(() => {
        setSubmitted(false);
        if (onClose) onClose();
      }, 2000);
    } catch (err) {
      console.error('❌ Error al enviar:', err);
      setError('Error al enviar el email. Intenta nuevamente.');
      setLoading(false);
    }
  };

  return (
    <div className="quotation-form-container">
      <div className="form-wrapper">

        <header className="form-header">
          <h2>Solicitar Cotización</h2>
          <p>Selecciona el producto que deseas proteger</p>
        </header>

        {/* DOCK SELECTOR */}
        <div className="insurance-dock-container">
          <div className="insurance-dock">
            {insuranceTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                className={`dock-item ${formData.insuranceType === type.value ? 'active' : ''}`}
                onClick={() => selectInsurance(type.value)}
              >
                <span className="dock-tooltip">{type.label}</span>
                <img src={type.img} alt={type.label} className="dock-img" />
              </button>
            ))}
          </div>
        </div>

        {submitted && (
          <div className="success-message fade-in">
            ✅ ¡Solicitud enviada! Nos comunicaremos a la brevedad.
          </div>
        )}

        {error && (
          <div className="error-message fade-in">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="quotation-form">
          {formData.insuranceType && (
            <div className="fade-in">
              <fieldset className="form-section">
                <legend>Información para {insuranceTypes.find(t => t.value === formData.insuranceType)?.label}</legend>
                
                {formData.insuranceType === 'vehicles' && (
                  <div className="form-row">
                    <input type="text" name="vehicleModel" placeholder="Modelo (ej: Toyota Hilux)" value={formData.vehicleModel} onChange={handleChange} required />
                    <input type="number" name="vehicleYear" placeholder="Año" min="1950" max="2026" value={formData.vehicleYear} onChange={handleChange} required />
                  </div>
                )}

                {formData.insuranceType === 'home' && (
                  <div className="form-row">
                    <input type="number" name="homeArea" placeholder="m²" value={formData.homeArea} onChange={handleChange} required />
                    <select name="propertyStatus" value={formData.propertyStatus} onChange={handleChange} required>
                      <option value="">Estado</option>
                      <option value="nueva">Nueva</option>
                      <option value="buena">Buena</option>
                      <option value="regular">Regular</option>
                    </select>
                  </div>
                )}

                {formData.insuranceType === 'commerce' && (
                  <div className="form-row">
                    <input type="text" name="commerceType" placeholder="Tipo de comercio" value={formData.commerceType} onChange={handleChange} required />
                    <input type="number" name="commerceArea" placeholder="Área en m²" value={formData.commerceArea} onChange={handleChange} required />
                  </div>
                )}

                {formData.insuranceType === 'life' && (
                  <div className="form-row">
                    <input type="number" name="lifeAge" placeholder="Edad" min="18" max="100" value={formData.lifeAge} onChange={handleChange} required />
                    <select name="isSmoker" value={formData.isSmoker} onChange={handleChange} required>
                      <option value="">¿Fuma?</option>
                      <option value="si">Sí</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                )}

                {formData.insuranceType === 'travel' && (
                  <div className="form-row">
                    <input type="text" name="tripDestination" placeholder="Destino" value={formData.tripDestination} onChange={handleChange} required />
                    <input type="text" name="tripDuration" placeholder="Duración (ej: 7 días)" value={formData.tripDuration} onChange={handleChange} required />
                  </div>
                )}
              </fieldset>

              <fieldset className="form-section">
                <legend>Datos de Contacto</legend>
                <div className="form-group">
                  <input type="text" name="fullName" placeholder="Nombre completo" onChange={handleChange} required />
                </div>
                <div className="form-row">
                  <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                  <input type="tel" name="phone" placeholder="Celular" onChange={handleChange} required />
                </div>
                <textarea name="additionalInfo" placeholder="Detalles adicionales..." rows="3" onChange={handleChange}></textarea>
              </fieldset>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? '⏳ Enviando...' : 'Enviar Cotización'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default QuotationForm;