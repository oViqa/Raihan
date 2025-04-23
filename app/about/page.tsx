'use client';

import { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { socialMediaDB, SocialMediaLink } from '@/app/lib/database-schema';

const iconMap: { [key: string]: React.ElementType } = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  tiktok: FaTiktok,
};

export default function AboutPage() {
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
            À Propos de Coopérative Raihan
          </h1>
          
          <div className="prose max-w-none text-[#6b7f3e] mb-12">
            <p className="text-lg text-center leading-relaxed">
              Nous sommes une coopérative spécialisée dans les produits naturels des montagnes de l'Atlas marocain. Nous proposons une gamme variée de produits biologiques et traditionnels de haute qualité.
            </p>
            <p className="text-lg text-center mt-4 leading-relaxed">
              Suivez-nous sur les réseaux sociaux pour découvrir nos produits et nos actualités.
            </p>
          </div>

          {/* Social Media Buttons */}
          <div className="flex justify-center items-center gap-4 mb-8">
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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-8">
                Chargement...
              </div>
            ) : socialLinks.length > 0 ? (
              socialLinks.map((link) => {
                const Icon = iconMap[link.platform.toLowerCase()] || FaFacebook;
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 bg-[#f0ece2] rounded-lg hover:bg-[#d3c8ab] transition-colors"
                  >
                    <Icon className="text-2xl ml-2 text-[#4a5a2b]" />
                    <span className="text-[#4a5a2b] font-medium">
                      {link.platform}
                    </span>
                  </a>
                );
              })
            ) : (
              <div className="col-span-full text-center py-8 text-[#6b7f3e]">
                Les liens des réseaux sociaux seront ajoutés prochainement
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="mt-12 border-t border-[#d3c8ab] pt-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-xl font-bold text-[#4a5a2b] mb-4">
                  Notre Localisation
                </h2>
                <p className="text-[#6b7f3e]">
                  Montagnes de l'Atlas, Maroc
                </p>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-xl font-bold text-[#4a5a2b] mb-4">
                  Contactez-nous
                </h2>
                <p className="text-[#6b7f3e] leading-relaxed">
                  Pour toute question ou commande, contactez-nous sur WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
