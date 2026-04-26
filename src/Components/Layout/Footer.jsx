import React from "react";
import "../styles/Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Contacto</h3>
                    <p>📧 <strong>Email:</strong> info@huelmo.com.uy</p>
                    <p>📞 <strong>Teléfono:</strong> +598 92 290 092</p>
                    <p>⏰ <strong>Horario:</strong> Lunes a viernes 9:00 - 17:00</p>
                </div>

                <div className="footer-section">
                    <h3>Sobre Nosotros</h3>
                    <p>Huelmo Seguros se dedica a proteger a las personas, familias y empresas ante riesgos imprevistos que puedan afectar su bienestar financiero y calidad de vida.</p>
                </div>

                <div className="footer-section">
                    <h3>Enlaces Rápidos</h3>
                    <ul>
                        <li><a href="#home">Inicio</a></li>
                        <li><a href="#about">Nosotros</a></li>
                        <li><a href="#services">Servicios</a></li>
                        <li><a href="#brokers">Corredores</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Síguenos</h3>
                    <div className="social-links">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">📷</a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">👍</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">💼</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Huelmo Seguros - Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}