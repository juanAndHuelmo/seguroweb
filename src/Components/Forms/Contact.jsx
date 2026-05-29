import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";
import "../../styles/QuotationForm.css";
import { APP_CONFIG } from "../../config/appConfig";
import { useSiteContent } from "../../Hooks/useSiteContent";

emailjs.init(APP_CONFIG.integrations.emailjs.publicKey);

function Contact({ onClose }) {
  const { content } = useSiteContent();
  const colors = content.styles?.forms || {};
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    birthDate: "",
    queryType: "",
    message: "",
  });

  const [captchaValue, setCaptchaValue] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    setErrors((prev) => ({
      ...prev,
      captcha: "",
    }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return String(phone || '').replace(/\D/g, '').length >= 8;
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = APP_CONFIG.errors.requiredName;
    if (!formData.lastName.trim()) newErrors.lastName = APP_CONFIG.errors.requiredLastName;
    if (!validatePhone(formData.phone)) newErrors.phone = 'Ingresá un teléfono válido';
    if (!formData.birthDate) newErrors.birthDate = 'Fecha de nacimiento requerida';

    if (!formData.email.trim()) {
      newErrors.email = APP_CONFIG.errors.requiredEmail;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = APP_CONFIG.errors.invalidEmail;
    }

    if (!formData.queryType) newErrors.queryType = APP_CONFIG.errors.requiredQueryType;
    if (!formData.message.trim()) newErrors.message = APP_CONFIG.errors.requiredMessage;
    if (!captchaValue) newErrors.captcha = APP_CONFIG.errors.requiredCaptcha;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrorMsg("");

    try {
      await emailjs.send(
        APP_CONFIG.integrations.emailjs.serviceId,
        APP_CONFIG.integrations.emailjs.contactTemplateId,
        {
          to_email: APP_CONFIG.integrations.emailjs.toEmail,
          reply_to: formData.email,
          sender_email: APP_CONFIG.integrations.emailjs.fromEmail,
          sender_name: APP_CONFIG.integrations.emailjs.fromName,
          from_name: `${formData.name} ${formData.lastName}`,
          from_email: formData.email,
          phone: formData.phone,
          birth_date: formData.birthDate,
          query_type: formData.queryType,
          message: [
            'Nueva consulta recibida desde la web.',
            '',
            `Nombre: ${formData.name} ${formData.lastName}`,
            `Email: ${formData.email}`,
            `Teléfono: ${formData.phone}`,
            `Fecha de nacimiento: ${formData.birthDate}`,
            `Tipo de consulta: ${formData.queryType}`,
            '',
            'Mensaje:',
            formData.message,
          ].join('\n'),
          "g-recaptcha-response": captchaValue,
        }
      );

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        if (onClose) onClose();
      }, 2500);

      setFormData({
        name: "",
        lastName: "",
        phone: "",
        email: "",
        birthDate: "",
        queryType: "",
        message: "",
      });

      setCaptchaValue(null);
    } catch (error) {
      const detail = error?.text || error?.message || '';
      console.error("Error al enviar:", error);
      setErrorMsg(detail ? `${APP_CONFIG.errors.contactSendFailed} ${detail}` : APP_CONFIG.errors.contactSendFailed);
    }

    setLoading(false);
  };

  return (
    <div
      className="quotation-form-container"
      style={{
        '--form-bg': colors.background,
        '--form-wrapper': colors.wrapper,
        '--form-title': colors.title,
        '--form-button-bg': colors.buttonBackground,
        '--form-button-text': colors.buttonText,
      }}
    >
      <div className="form-wrapper">
        <header className="form-header">
          <h2>Contacto</h2>
          <p>Envíanos tu consulta</p>
        </header>

        {submitted && (
          <div className="success-message fade-in">
            Mensaje enviado correctamente. Te contactaremos a la brevedad.
          </div>
        )}

        {errorMsg && (
          <div className="error-message fade-in">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="quotation-form">
          <fieldset className="form-section">
            <legend>Datos Personales</legend>

            <div className="form-row">
              <div className="form-field">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <small className="field-error">{errors.name}</small>}
              </div>

              <div className="form-field">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Apellido"
                  value={formData.lastName}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.lastName)}
                />
                {errors.lastName && <small className="field-error">{errors.lastName}</small>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Celular"
                  value={formData.phone}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && <small className="field-error">{errors.phone}</small>}
              </div>

              <div className="form-field">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <small className="field-error">{errors.email}</small>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  aria-label="Fecha de nacimiento"
                  aria-invalid={Boolean(errors.birthDate)}
                />
                {errors.birthDate && <small className="field-error">{errors.birthDate}</small>}
              </div>
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend>Consulta</legend>

            <div className="form-group">
              <select
                name="queryType"
                value={formData.queryType}
                onChange={handleChange}
                aria-invalid={Boolean(errors.queryType)}
              >
                <option value="">Tipo de consulta</option>
                <option value="cotizacion">Cotización</option>
                <option value="reclamo">Reclamo</option>
                <option value="sugerencia">Sugerencia</option>
                <option value="otro">Otro</option>
              </select>
              {errors.queryType && <small className="field-error">{errors.queryType}</small>}
            </div>

            <textarea
              name="message"
              rows="4"
              placeholder="Escribe tu mensaje..."
              value={formData.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message && <small className="field-error">{errors.message}</small>}
          </fieldset>

          <div className="captcha-field">
            <ReCAPTCHA
              sitekey={APP_CONFIG.integrations.recaptcha.siteKey}
              onChange={handleCaptchaChange}
            />
            {errors.captcha && (
              <small className="field-error">{errors.captcha}</small>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Enviando..." : "Enviar Consulta"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
