import '../../styles/WhatsAppButton.css';

function WhatsAppButton() {
  const phoneNumber = '+598922290092';
  const message = 'Hola, quiero más información sobre cotizar un seguro.';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      aria-label="Chat por WhatsApp"
      title="¡Contáctanos por WhatsApp!"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <circle cx="9" cy="10" r="1" fill="white"/>
        <circle cx="12" cy="10" r="1" fill="white"/>
        <circle cx="15" cy="10" r="1" fill="white"/>
      </svg>
    </a>
  );
}

export default WhatsAppButton;
