import React from "react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import "../styles/Footer.css";
import { useAppConfig } from "../../Context/AppConfigContext";

export default function Footer() {
    const { config } = useAppConfig();
    const footer = config.footer;

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>{footer.contactTitle}</h3>
                    <p><strong>Email:</strong> {footer.email}</p>
                    <p><strong>Teléfono:</strong> {footer.phone}</p>
                    <p><strong>Horario:</strong> {footer.hours}</p>
                </div>

                <div className="footer-section">
                    <h3>{footer.aboutTitle}</h3>
                    <p>{footer.aboutText}</p>
                </div>

                <div className="footer-section">
                    <h3>{footer.linksTitle}</h3>
                    <ul>
                        {footer.links.map(link => (
                            <li key={link.href}><a href={link.href}>{link.label}</a></li>
                        ))}
                    </ul>
                </div>

                <div className="footer-section">
                
                    <div className="social-links">
                        <a
                            href={footer.socials.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Instagram"
                        >
                            <FaInstagram />
                        </a>

                        <a
                            href={footer.socials.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Facebook"
                        >
                            <FaFacebookF />
                        </a>

                        <a
                            href={footer.socials.linkedin}
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
                    © {new Date().getFullYear()} {config.brand.name} - {footer.copyright}
                </p>
            </div>
        </footer>
    );
}
