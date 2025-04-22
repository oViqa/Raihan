'use client';

import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppButtonProps {
  href: string;
  message?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export default function WhatsAppButton({ 
  href, 
  message = "Contact on WhatsApp",
  className = "",
  variant = "primary",
  size = "md",
  fullWidth = false
}: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Size classes
  const sizeClasses = {
    sm: "text-xs px-3 py-2",
    md: "text-sm px-4 py-3",
    lg: "text-base px-5 py-4"
  };
  
  // Variant classes
  const variantClasses = {
    primary: "bg-[#6b7f3e] hover:bg-[#4a5a2b] text-white shadow-sm hover:shadow",
    secondary: "bg-[#4a5a2b] hover:bg-[#374121] text-white shadow-sm hover:shadow",
    outline: "bg-transparent border-2 border-[#6b7f3e] text-[#6b7f3e] hover:bg-[#6b7f3e]/10"
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center justify-center 
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        ${fullWidth ? 'w-full' : ''}
        rounded-lg font-medium 
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-[#6b7f3e]/50
        transform hover:-translate-y-1 active:translate-y-0
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Open WhatsApp: ${message}`}
    >
      <FaWhatsapp className={`
        ${size === 'sm' ? 'text-base' : size === 'md' ? 'text-lg' : 'text-xl'} 
        mr-2 
        ${isHovered ? 'animate-pulse' : ''}
      `} />
      <span>{message}</span>
    </a>
  );
} 