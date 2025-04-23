'use client';

import { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaTiktok } from 'react-icons/fa';
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
            <p className="text-lg text-center">
              Découvrez nos produits naturels des montagnes de l'Atlas et suivez-nous sur les réseaux sociaux.
            </p>
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
                    <Icon className="text-2xl mr-2 text-[#4a5a2b]" />
                    <span className="text-[#4a5a2b] font-medium">
                      {link.platform}
                    </span>
                  </a>
                );
              })
            ) : (
              <div className="col-span-full text-center py-8 text-[#6b7f3e]">
                Nos réseaux sociaux seront bientôt disponibles.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
