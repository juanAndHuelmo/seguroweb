import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        phone: '',
        email: '',
        queryType: '',
        message: ''
    });
    const [captchaValue, setCaptchaValue] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let newErrors = {};
        
        if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
        if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
        if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido';
        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Formato de email inválido';
        }
        if (!formData.queryType) newErrors.queryType = 'Selecciona un tipo de consulta';
        if (!formData.message.trim()) newErrors.message = 'La consulta es requerida';
        if (!captchaValue) newErrors.captcha = 'Completa el CAPTCHA';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Replace with your EmailJS service ID, template ID, and public key
        emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            {
                from_name: `${formData.name} ${formData.lastName}`,
                from_email: formData.email,
                phone: formData.phone,
                query_type: formData.queryType,
                message: formData.message
            },
            'YOUR_PUBLIC_KEY'
        ).then((result) => {
            alert('Mensaje enviado exitosamente!');
            setFormData({ name: '', lastName: '', phone: '', email: '', queryType: '', message: '' });
            setCaptchaValue(null);
            setErrors({});
        }, (error) => {
            alert('Error al enviar el mensaje. Inténtalo de nuevo.');
        });
    };

    const formStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
    };

    const fieldStyle = {
        marginBottom: '15px'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold'
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px'
    };

    const selectStyle = {
        ...inputStyle,
        height: '36px'
    };

    const textareaStyle = {
        ...inputStyle,
        minHeight: '100px',
        resize: 'vertical'
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px'
    };

    const errorStyle = {
        color: 'red',
        fontSize: '12px',
        marginTop: '5px'
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Formulario de Contacto</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={fieldStyle}>
                    <label style={labelStyle}>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                    {errors.name && <div style={errorStyle}>{errors.name}</div>}
                </div>
                
                <div style={fieldStyle}>
                    <label style={labelStyle}>Apellido:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                    {errors.lastName && <div style={errorStyle}>{errors.lastName}</div>}
                </div>
                
                <div style={fieldStyle}>
                    <label style={labelStyle}>Teléfono:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                    {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
                </div>
                
                <div style={fieldStyle}>
                    <label style={labelStyle}>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                    {errors.email && <div style={errorStyle}>{errors.email}</div>}
                </div>
                
                <div style={fieldStyle}>
                    <label style={labelStyle}>Tipo de Consulta:</label>
                    <select
                        name="queryType"
                        value={formData.queryType}
                        onChange={handleChange}
                        style={selectStyle}
                        required
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="cotizar">Cotizar</option>
                        <option value="reclamo">Reclamo</option>
                        <option value="sugerencia">Sugerencia</option>
                        <option value="otro">Otro</option>
                    </select>
                    {errors.queryType && <div style={errorStyle}>{errors.queryType}</div>}
                </div>
                
                <div style={fieldStyle}>
                    <label style={labelStyle}>Consulta:</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        style={textareaStyle}
                        placeholder="Describe tu consulta aquí..."
                        required
                    />
                    {errors.message && <div style={errorStyle}>{errors.message}</div>}
                </div>
                
                <div style={fieldStyle}>
                    <ReCAPTCHA
                        sitekey="YOUR_RECAPTCHA_SITE_KEY"
                        onChange={handleCaptchaChange}
                    />
                    {errors.captcha && <div style={errorStyle}>{errors.captcha}</div>}
                </div>
                
                <button type="submit" style={buttonStyle}>Enviar</button>
            </form>
        </div>
    );
};

export default Contact;