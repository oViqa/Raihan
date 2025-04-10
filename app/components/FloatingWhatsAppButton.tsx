'use client';

import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingWhatsAppButton() {
  // Default WhatsApp number, should be replaced with your business number
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '1234567890';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <a 
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors z-50"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="w-6 h-6" />
    </a>
  );
} 