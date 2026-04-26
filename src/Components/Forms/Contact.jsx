import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";
import "../../styles/QuotationForm.css";

emailjs.init("FWhla7meyPyV00HZZ");

function Contact({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
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

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Nombre requerido";
    if (!formData.lastName.trim()) newErrors.lastName = "Apellido requerido";
    if (!formData.phone.trim()) newErrors.phone = "Teléfono requerido";

    if (!formData.email.trim()) {
      newErrors.email = "Email requerido";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.queryType) newErrors.queryType = "Selecciona una opción";
    if (!formData.message.trim()) newErrors.message = "Escribe tu consulta";
    if (!captchaValue) newErrors.captcha = "Completa el CAPTCHA";

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
        "service_qsf0m5b",
        "template_qjor7vt",
        {
          from_name: `${formData.name} ${formData.lastName}`,
          from_email: formData.email,
          phone: formData.phone,
          query_type: formData.queryType,
          message: formData.message,
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
        queryType: "",
        message: "",
      });

      setCaptchaValue(null);
    } catch (error) {
      setErrorMsg("Error al enviar el mensaje.");
    }

    setLoading(false);
  };

  return (
    <div className="quotation-form-container">
      <div className="form-wrapper">
        <header className="form-header">
          <h2>Contacto</h2>
          <p>Envíanos tu consulta</p>
        </header>

        {submitted && (
          <div className="success-message fade-in">
            ✅ Mensaje enviado correctamente.
          </div>
        )}

        {errorMsg && (
          <div className="error-message fade-in">
            ❌ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="quotation-form">
          <fieldset className="form-section">
            <legend>Datos Personales</legend>

            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="text"
                name="lastName"
                placeholder="Apellido"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <input
                type="tel"
                name="phone"
                placeholder="Celular"
                value={formData.phone}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend>Consulta</legend>

            <div className="form-group">
              <select
                name="queryType"
                value={formData.queryType}
                onChange={handleChange}
              >
                <option value="">Tipo de consulta</option>
                <option value="cotizacion">Cotización</option>
                <option value="reclamo">Reclamo</option>
                <option value="sugerencia">Sugerencia</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <textarea
              name="message"
              rows="4"
              placeholder="Escribe tu mensaje..."
              value={formData.message}
              onChange={handleChange}
            />
          </fieldset>

          <div style={{ marginBottom: "1rem" }}>
            <ReCAPTCHA
              sitekey="6LcYososAAAAANiGCDq90Exc3GTVzzoDgF2CnBSE"
              onChange={handleCaptchaChange}
            />
            {errors.captcha && (
              <small style={{ color: "red" }}>{errors.captcha}</small>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "⏳ Enviando..." : "Enviar Consulta"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;