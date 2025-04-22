'use client';

import { GiHerbsBundle, GiMortar, GiSpicePot } from 'react-icons/gi';
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
    sm: { main: 'h-8 w-8', secondary: 'h-5 w-5', accent: 'h-3 w-3', small: 'h-2 w-2' },
    md: { main: 'h-12 w-12', secondary: 'h-8 w-8', accent: 'h-4 w-4', small: 'h-3 w-3' },
    lg: { main: 'h-16 w-16', secondary: 'h-10 w-10', accent: 'h-5 w-5', small: 'h-4 w-4' },
    xl: { main: 'h-20 w-20', secondary: 'h-12 w-12', accent: 'h-6 w-6', small: 'h-5 w-5' }
  };
  
  // Simple version - just the herb bundle with minimal styling
  if (variant === 'simple') {
    return (
      <div className={`relative ${sizeClasses[size]} ${className}`}>
        <GiHerbsBundle className={`text-[#6b7f3e] ${innerSizes[size].main}`} />
      </div>
    );
  }
  
  // Circle version - the rounded logo with background
  if (variant === 'circle') {
    return (
      <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden border-2 border-[#d3c8ab] shadow-md bg-gradient-to-br from-[#f8f5ec] to-[#e9e2d0] ${className}`}>
        <div className="absolute inset-0 opacity-10 bg-[url('/images/moroccan-pattern.png')]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <GiHerbsBundle className={`absolute text-[#6b7f3e] ${innerSizes[size].main}`} />
            <GiMortar className={`absolute text-[#c17f24] ${innerSizes[size].secondary} -bottom-1 -right-1 transform rotate-12`} />
            <FaLeaf className={`absolute text-[#4a5a2b] ${innerSizes[size].accent} top-1 -left-1 transform -rotate-12`} />
            <FaLeaf className={`absolute text-[#8e846b] ${innerSizes[size].small} top-2 left-2 transform rotate-45`} />
          </div>
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-[#c17f2420] pointer-events-none"></div>
      </div>
    );
  }
  
  // Default version - Horizontal logo with text
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`relative ${size === 'sm' ? 'mr-2' : 'mr-3'}`}>
        <div className="relative">
          <GiHerbsBundle className={`text-[#6b7f3e] ${innerSizes[size].secondary}`} />
          <FaLeaf className={`absolute text-[#c17f24] ${innerSizes[size].small} top-0 right-0 transform rotate-45`} />
        </div>
      </div>
      <div className={`font-bold ${
        size === 'sm' ? 'text-lg' : 
        size === 'md' ? 'text-xl' : 
        size === 'lg' ? 'text-2xl' : 'text-3xl'
      } text-[#4a5a2b]`}>
        <span className="mr-1">Raihan</span>
        <span className="text-[#6b7f3e]">Admin</span>
      </div>
    </div>
  );
} 