import '../../styles/WhatsAppButton.css';
import { useSiteContent } from '../../Hooks/useSiteContent';
import { FaWhatsapp } from 'react-icons/fa';

function WhatsAppButton() {
  const { content } = useSiteContent();
  const phoneNumber = content.whatsapp.phone;
  const message = content.whatsapp.message;
  const colors = content.styles?.whatsapp || {};
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      style={{
        '--whatsapp-bg': colors.background,
        '--whatsapp-icon': colors.icon,
      }}
      aria-label="Chat por WhatsApp"
      title="¡Contáctanos por WhatsApp!"
    >
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
}

export default WhatsAppButton;
