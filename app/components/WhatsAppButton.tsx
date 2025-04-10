'use client';

import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppButtonProps {
  href: string;
  message?: string;
  className?: string;
}

export default function WhatsAppButton({ 
  href, 
  message = "Contact on WhatsApp",
  className = ""
}: WhatsAppButtonProps) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center px-4 py-3 bg-[#6b7f3e] text-white rounded-md hover:bg-[#4a5a2b] transition-all font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 ${className}`}
    >
      <FaWhatsapp className="mr-2 text-lg" />
      <span>{message}</span>
    </a>
  );
} 