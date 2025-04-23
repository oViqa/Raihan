'use client';

import { GiMortar } from 'react-icons/gi';
import { FaLeaf } from 'react-icons/fa';

interface RaihanLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'simple' | 'circle';
  className?: string;
}

export default function RaihanLogo({ 
  size = 'md', 
  variant = 'default',
  className = ''
}: RaihanLogoProps) {
  
  // Size mapping for the main container
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  };
  
  // Size mapping for the inner elements
  const innerSizes = {
    sm: { main: 'h-6 w-6', small: 'h-3 w-3' },
    md: { main: 'h-8 w-8', small: 'h-4 w-4' },
    lg: { main: 'h-10 w-10', small: 'h-5 w-5' },
    xl: { main: 'h-12 w-12', small: 'h-6 w-6' }
  };
  
  // Simple version - just a mortar icon
  if (variant === 'simple') {
    return (
      <div className={`relative ${sizeClasses[size]} ${className}`}>
        <GiMortar className={`text-[#6b7f3e] ${innerSizes[size].main}`} />
      </div>
    );
  }
  
  // Circle version - elegant circle with mortar icon
  if (variant === 'circle') {
    return (
      <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden border border-[#d3c8ab] bg-white flex items-center justify-center ${className}`}>
        <GiMortar className={`text-[#6b7f3e] ${innerSizes[size].main}`} />
      </div>
    );
  }
  
  // Default version - Horizontal logo with text
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`bg-[#6b7f3e] rounded-full p-2 ${size === 'sm' ? 'mr-2' : 'mr-3'}`}>
        <GiMortar className={`text-white ${innerSizes[size].small}`} />
      </div>
      <div className={`font-bold ${
        size === 'sm' ? 'text-lg' : 
        size === 'md' ? 'text-xl' : 
        size === 'lg' ? 'text-2xl' : 'text-3xl'
      }`}>
        <span className="text-[#4a5a2b]">ريحان</span>
        <span className="text-[#6b7f3e] ml-1">Admin</span>
      </div>
    </div>
  );
} 