import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '../data/contact';
import { trackWhatsAppClick } from '../utils/analytics';

// Persistent floating WhatsApp CTA. In the Israeli market this is one of the
// highest-converting elements — a visitor is one tap away from a conversation
// from anywhere on the site. Sits above the cookie banner's bottom strip.
const WhatsAppButton: React.FC = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick('floating-button')}
      aria-label="דברו איתי בוואטסאפ"
      title="דברו איתי בוואטסאפ"
      style={{ position: 'fixed', bottom: '1.5rem', left: '1.5rem', zIndex: 9998 }}
      className="flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300"
    >
      <span className="flex items-center justify-center" style={{ width: '3.5rem', height: '3.5rem' }}>
        <MessageCircle className="h-7 w-7" fill="currentColor" strokeWidth={1.5} />
      </span>
    </a>
  );
};

export default WhatsAppButton;
