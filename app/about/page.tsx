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
            حول تعاونية ريحان
          </h1>
          
          <div className="prose max-w-none text-[#6b7f3e] mb-12">
            <p className="text-lg text-center leading-relaxed">
              نحن تعاونية متخصصة في المنتجات الطبيعية من جبال الأطلس المغربية. نقدم مجموعة متنوعة من المنتجات العضوية والتقليدية عالية الجودة.
            </p>
            <p className="text-lg text-center mt-4 leading-relaxed">
              تابعونا على وسائل التواصل الاجتماعي لمعرفة المزيد عن منتجاتنا وأخبارنا.
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
              <span className="font-medium">تابعونا على انستغرام</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/212675466385" // Replace with your actual WhatsApp number
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-lg text-white hover:scale-105 transition-transform"
            >
              <FaWhatsapp className="text-4xl mb-2" />
              <span className="font-medium">تواصل معنا على واتساب</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-8">
                جاري التحميل...
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
                      {/* Translate platform names */}
                      {link.platform === 'Facebook' ? 'فيسبوك' :
                       link.platform === 'Instagram' ? 'انستغرام' :
                       link.platform === 'Twitter' ? 'تويتر' :
                       link.platform === 'LinkedIn' ? 'لينكد إن' :
                       link.platform === 'YouTube' ? 'يوتيوب' :
                       link.platform === 'TikTok' ? 'تيك توك' :
                       link.platform}
                    </span>
                  </a>
                );
              })
            ) : (
              <div className="col-span-full text-center py-8 text-[#6b7f3e]">
                سيتم إضافة روابط مواقع التواصل الاجتماعي قريباً
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="mt-12 border-t border-[#d3c8ab] pt-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center md:text-right">
                <h2 className="text-xl font-bold text-[#4a5a2b] mb-4">
                  موقعنا
                </h2>
                <p className="text-[#6b7f3e]">
                  جبال الأطلس، المغرب
                </p>
              </div>
              <div className="text-center md:text-right">
                <h2 className="text-xl font-bold text-[#4a5a2b] mb-4">
                  تواصل معنا
                </h2>
                <p className="text-[#6b7f3e] leading-relaxed">
                  للاستفسارات والطلبات، يمكنكم التواصل معنا عبر واتساب
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
