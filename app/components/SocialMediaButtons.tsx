'use client';

import { FaFacebook, FaTiktok, FaYoutube } from 'react-icons/fa';

interface SocialMediaButtonsProps {
  className?: string;
}

export default function SocialMediaButtons({ className = '' }: SocialMediaButtonsProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      {/* Facebook Button */}
      <a
        href="https://www.facebook.com/cooperative.raihan"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center p-6 bg-gradient-to-br from-[#1877F2] to-[#0D6EFD] rounded-lg text-white hover:scale-105 transition-transform"
      >
        <FaFacebook className="text-4xl mb-2" />
        <span className="font-medium">Suivez-nous sur Facebook</span>
      </a>

      {/* TikTok Button */}
      <a
        href="https://www.tiktok.com/@cooperative.raihan"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center p-6 bg-gradient-to-br from-[#000000] to-[#25F4EE] rounded-lg text-white hover:scale-105 transition-transform"
      >
        <FaTiktok className="text-4xl mb-2" />
        <span className="font-medium">Suivez-nous sur TikTok</span>
      </a>

      {/* YouTube Button */}
      <a
        href="https://www.youtube.com/@cooperative.raihan"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center p-6 bg-gradient-to-br from-[#FF0000] to-[#CC0000] rounded-lg text-white hover:scale-105 transition-transform"
      >
        <FaYoutube className="text-4xl mb-2" />
        <span className="font-medium">Suivez-nous sur YouTube</span>
      </a>
    </div>
  );
} 