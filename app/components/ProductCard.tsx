'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiShoppingBag, FiSend, FiExternalLink } from 'react-icons/fi';
import { FaLeaf, FaHandHoldingMedical } from 'react-icons/fa6';
import { GiHoneycomb } from 'react-icons/gi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBottleDroplet } from '@fortawesome/free-solid-svg-icons';
import { Product } from '@/app/lib/database-schema';
import { createWhatsAppLink } from '@/app/lib/whatsapp';

interface ProductCardProps {
  product: Product;
}

// Helper function to get the appropriate icon for product categories
const getProductIcon = (product: Product) => {
  const categoryMap: {[key: string]: React.ReactNode} = {
    'أعشاب': <FaLeaf className="h-12 w-12 text-[#6b7f3e]" />,
    'عسل': <GiHoneycomb className="h-12 w-12 text-[#c17f24]" />,
    'طب': <FontAwesomeIcon icon={faBottleDroplet} className="h-12 w-12 text-[#b54e32]" />,
  };
  
  // Try to guess the category from the product name or description
  const productText = `${product.name} ${product.description || ''}`.toLowerCase();
  
  if (productText.includes('herb') || productText.includes('spice') || productText.includes('tea')) {
    return categoryMap['أعشاب'];
  } else if (productText.includes('honey') || productText.includes('syrup')) {
    return categoryMap['عسل'];
  } else if (productText.includes('oil') || productText.includes('extract') || productText.includes('medicinal')) {
    return categoryMap['طب'];
  }
  
  // Default icon
  return <FiShoppingBag className="h-12 w-12 text-gray-400" />;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppInquiry = () => {
    window.open(createWhatsAppLink(product), '_blank');
  };

  const productUrl = `/products/${product.id}`;
  const productIcon = getProductIcon(product);
  
  return (
    <div 
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-[#d3c8ab]/30 hover:border-[#6b7f3e]/50 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={productUrl} className="block relative overflow-hidden">
        <div className="aspect-square relative bg-[#f8f5ec]">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-500 ${
                isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
              } ${isHovered ? 'scale-110' : 'scale-100'}`}
              onLoad={() => setIsLoading(false)}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#f0ece2] to-white">
              {productIcon}
            </div>
          )}
          
          {isLoading && product.image_url && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#6b7f3e]"></div>
            </div>
          )}
          
          {/* Decorative pattern overlay */}
          <div className="absolute inset-0 bg-[url('/moroccan-pattern.png')] opacity-5 pointer-events-none mix-blend-multiply"></div>
          
          {/* View details overlay */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <span className="bg-white/90 text-[#4a5a2b] px-3 py-2 rounded-full font-medium text-sm flex items-center backdrop-blur-sm">
              View Details <FiExternalLink className="ml-1.5 h-3.5 w-3.5" />
            </span>
          </div>
        </div>
        
        {/* Origin badge */}
        <span className="absolute bottom-3 left-3 bg-white/90 text-[#4a5a2b] text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm flex items-center">
          <FaLeaf className="w-3 h-3 mr-1 text-[#6b7f3e]" />
          Moroccan Origin
        </span>
      </Link>
      
      <div className="p-5 flex flex-col flex-1">
        <Link href={productUrl} className="block mb-auto">
          <h3 className="text-lg font-semibold text-[#4a5a2b] mb-1.5 line-clamp-2 hover:text-[#6b7f3e] transition-colors">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="text-[#8e846b] text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
          )}
        </Link>
        
        <div className="mt-auto space-y-2">
          <button
            onClick={handleWhatsAppInquiry}
            className="w-full flex items-center justify-center text-sm bg-[#6b7f3e] hover:bg-[#4a5a2b] text-white px-4 py-3 rounded-lg transition-all shadow-sm hover:shadow focus:ring-2 focus:ring-[#6b7f3e]/50 focus:outline-none"
            aria-label={`Inquire about ${product.name} on WhatsApp`}
          >
            <FiSend className="mr-2 h-4 w-4" />
            <span>Demander sur WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
} 