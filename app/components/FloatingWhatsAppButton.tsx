'use client';

import { FaWhatsapp, FaLeaf } from 'react-icons/fa';

export default function FloatingWhatsAppButton() {
  // Default WhatsApp number, should be replaced with your business number
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '1234567890';
  
  // Create a general store inquiry message
  const generalInquiryMessage = encodeURIComponent(
    "Hello! I'm interested in your natural Moroccan products. Could you tell me more about your herbs, honey, and other traditional offerings?"
  );
  
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${generalInquiryMessage}`;

  return (
    <a 
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#6b7f3e] text-white rounded-full p-4 shadow-lg hover:bg-[#4a5a2b] transition-all z-50 flex items-center justify-center group hover:scale-105"
      aria-label="Contact us on WhatsApp"
    >
      <div className="flex items-center">
        <FaWhatsapp className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out md:ml-2 text-sm font-medium whitespace-nowrap">
          Ask about our herbs
        </span>
      </div>
      <FaLeaf className="absolute -top-2 -right-1 text-[#c17f24] transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
} 