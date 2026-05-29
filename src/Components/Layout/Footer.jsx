import React from "react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { useSiteContent } from "../../Hooks/useSiteContent";
import "../styles/Footer.css";

const huelmoLabsLogo = process.env.PUBLIC_URL + "/Images/huelmo-labs-logo.png";

export default function Footer() {
    const { content } = useSiteContent();
    const { footer } = content;
    const colors = content.styles?.footer || {};

    return (
        <footer
            className="footer"
            style={{
                '--footer-bg': colors.background,
                '--footer-title': colors.title,
                '--footer-text': colors.text,
                '--footer-link': colors.link,
                '--footer-social-bg': colors.socialBackground,
            }}
        >
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

                <div className="footer-section footer-made-by">
                    <h3>Hecho por</h3>
                    <a
                        className="huelmo-labs-brand"
                        href="https://huelmolabs.com.uy"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Hecho por Huelmo Labs"
                    >
                        <img src={huelmoLabsLogo} alt="Huelmo Labs" />
                        <span>Huelmo Labs</span>
                    </a>
                </div>

                <div className="footer-section footer-social-section">
                    <h3>Seguinos</h3>
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
