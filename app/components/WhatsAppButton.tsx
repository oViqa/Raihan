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
      className={`inline-flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-medium ${className}`}
    >
      <FaWhatsapp className="mr-2 text-lg" />
      <span>{message}</span>
    </a>
  );
} 