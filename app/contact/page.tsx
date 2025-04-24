'use client';

import { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaTiktok, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { socialMediaDB, SocialMediaLink } from '@/app/lib/database-schema';
import SocialMediaButtons from '@/app/components/SocialMediaButtons';

const iconMap: { [key: string]: React.ElementType } = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  tiktok: FaTiktok,
};

export default function ContactPage() {
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSocialLinks() {
      try {
        const links = await socialMediaDB.getAll();
        setSocialLinks(links);
      } catch (error) {
        console.error('Error fetching social links:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSocialLinks();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f5ec] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[#4a5a2b] text-center mb-8">
            Contactez-nous
          </h1>
          
          <div className="prose max-w-none text-[#6b7f3e] mb-12">
            <p className="text-lg text-center leading-relaxed">
              Nous sommes à votre disposition pour répondre à toutes vos questions et vous aider à découvrir nos produits naturels authentiques.
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex flex-col items-center p-6 bg-[#f8f5ec] rounded-lg">
              <FaMapMarkerAlt className="text-4xl text-[#6b7f3e] mb-4" />
              <h3 className="text-lg font-semibold text-[#4a5a2b] mb-2">Notre Adresse</h3>
              <p className="text-[#8e846b] text-center">
                Montagnes de l'Atlas, Maroc
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-[#f8f5ec] rounded-lg">
              <FaPhone className="text-4xl text-[#6b7f3e] mb-4" />
              <h3 className="text-lg font-semibold text-[#4a5a2b] mb-2">Téléphone</h3>
              <p className="text-[#8e846b] text-center">
                +212 675-466385
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-[#f8f5ec] rounded-lg">
              <FaEnvelope className="text-4xl text-[#6b7f3e] mb-4" />
              <h3 className="text-lg font-semibold text-[#4a5a2b] mb-2">Email</h3>
              <p className="text-[#8e846b] text-center">
                contact@cooperative-raihan.com
              </p>
            </div>
          </div>

          {/* Social Media Buttons */}
          <div className="flex flex-col gap-4 mb-8">
            <SocialMediaButtons className="justify-center" />
            
            {/* Instagram Button */}
            <a
              href="https://www.instagram.com/cooperative_raihan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-lg text-white hover:scale-105 transition-transform"
            >
              <FaInstagram className="text-4xl mb-2" />
              <span className="font-medium">Suivez-nous sur Instagram</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/212675466385"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-lg text-white hover:scale-105 transition-transform"
            >
              <FaWhatsapp className="text-4xl mb-2" />
              <span className="font-medium">Contactez-nous sur WhatsApp</span>
            </a>
          </div>

          {/* Business Hours */}
          <div className="mt-12 border-t border-[#d3c8ab] pt-8">
            <h2 className="text-xl font-bold text-[#4a5a2b] text-center mb-6">
              Horaires d'ouverture
            </h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-[#6b7f3e] font-semibold">Lundi - Vendredi</p>
                <p className="text-[#8e846b]">9h00 - 18h00</p>
              </div>
              <div>
                <p className="text-[#6b7f3e] font-semibold">Samedi</p>
                <p className="text-[#8e846b]">10h00 - 16h00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 