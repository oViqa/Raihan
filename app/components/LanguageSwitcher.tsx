'use client';

import { useState } from 'react';
import { FaGlobe } from 'react-icons/fa';
import { useLanguage } from '@/app/context/LanguageContext';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (newLanguage: 'fr' | 'ar') => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium text-[#6b7f3e] hover:text-[#4a5a2b] hover:bg-[#f0ece2] transition-colors border border-[#d3c8ab]/50"
        aria-expanded={isOpen}
      >
        <FaGlobe className="mr-1" />
        <span className="uppercase">{language}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg py-1 w-32 z-50 border border-[#d3c8ab]/50">
          <button
            onClick={() => changeLanguage('fr')}
            className={`block w-full text-left px-4 py-2 text-sm ${
              language === 'fr'
                ? 'bg-[#f8f5ec] text-[#4a5a2b] font-medium'
                : 'text-[#6b7f3e] hover:bg-[#f8f5ec]'
            }`}
          >
            Français
          </button>
          <button
            onClick={() => changeLanguage('ar')}
            className={`block w-full text-left px-4 py-2 text-sm ${
              language === 'ar'
                ? 'bg-[#f8f5ec] text-[#4a5a2b] font-medium'
                : 'text-[#6b7f3e] hover:bg-[#f8f5ec]'
            }`}
            style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}
          >
            العربية
          </button>
        </div>
      )}
    </div>
  );
} 