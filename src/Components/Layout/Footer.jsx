import React from "react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { useSiteContent } from "../../Hooks/useSiteContent";
import "../styles/Footer.css";

export default function Footer() {
    const { content } = useSiteContent();
    const { footer } = content;

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Contacto</h3>
                    <p><strong>Email:</strong> {footer.email}</p>
                    <p><strong>Teléfono:</strong> {footer.phone}</p>
                    <p><strong>Horario:</strong> {footer.schedule}</p>
                </div>

                <div className="footer-section">
                    <h3>Sobre Nosotros</h3>
                    <p>{footer.about}</p>
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
                
                    <div className="social-links">
                        <a
                            href={footer.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Instagram"
                        >
                            <FaInstagram />
                        </a>

                        <a
                            href={footer.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Facebook"
                        >
                            <FaFacebookF />
                        </a>

                        <a
                            href={footer.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="LinkedIn"
                        >
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>
                    © {new Date().getFullYear()} Huelmo Seguros - Todos los
                    derechos reservados.
                </p>
            </div>
        </footer>
    );
}
