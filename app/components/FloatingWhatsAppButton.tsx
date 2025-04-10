'use client';

import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingWhatsAppButton() {
  // Default WhatsApp number, should be replaced with your business number
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '1234567890';
  
  // Create a general store inquiry message
  const generalInquiryMessage = encodeURIComponent(
    "Hello! I'm browsing your online store and would like to ask about your products and services. Could you provide more information?"
  );
  
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${generalInquiryMessage}`;

  return (
    <a 
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors z-50 flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="w-6 h-6" />
      <span className="hidden md:inline md:ml-2 text-sm font-medium">Chat with us</span>
    </a>
  );
} 