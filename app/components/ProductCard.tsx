'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiShoppingBag, FiSend } from 'react-icons/fi';
import { FaLeaf, FaHandHoldingMedical } from 'react-icons/fa6';
import { GiHoneycomb } from 'react-icons/gi';
import { Product } from '@/app/lib/database-schema';
import { formatPrice, createWhatsAppLink } from '@/app/lib/whatsapp';

interface ProductCardProps {
  product: Product;
}

// Helper function to get the appropriate icon for product categories
const getProductIcon = (product: Product) => {
  const categoryMap: {[key: string]: React.ReactNode} = {
    'herbs': <FaLeaf className="h-12 w-12 text-[#6b7f3e]" />,
    'honey': <GiHoneycomb className="h-12 w-12 text-[#c17f24]" />,
    'medicine': <FaHandHoldingMedical className="h-12 w-12 text-[#b54e32]" />,
  };
  
  // Try to guess the category from the product name or description
  const productText = `${product.name} ${product.description || ''}`.toLowerCase();
  
  if (productText.includes('herb') || productText.includes('spice') || productText.includes('tea')) {
    return categoryMap['herbs'];
  } else if (productText.includes('honey') || productText.includes('syrup')) {
    return categoryMap['honey'];
  } else if (productText.includes('oil') || productText.includes('extract') || productText.includes('medicinal')) {
    return categoryMap['medicine'];
  }
  
  // Default icon
  return <FiShoppingBag className="h-12 w-12 text-gray-400" />;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleWhatsAppInquiry = () => {
    window.open(createWhatsAppLink(product), '_blank');
  };

  const productUrl = `/products/${product.id}`;
  const productIcon = getProductIcon(product);
  
  return (
    <div className="moroccan-card group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={productUrl} className="block relative">
        <div className="aspect-square relative overflow-hidden bg-[#f8f5ec]">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className={`object-cover transform group-hover:scale-105 transition-transform duration-500 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setIsLoading(false)}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[#f0ece2]">
              {productIcon}
            </div>
          )}
          
          {isLoading && product.image_url && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#6b7f3e]"></div>
            </div>
          )}
          
          {/* Decorative pattern overlay */}
          <div className="absolute inset-0 bg-[url('/moroccan-pattern.png')] opacity-5 pointer-events-none"></div>
        </div>
        
        {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
          <span className="absolute top-2 right-2 bg-[#c17f24] text-white text-xs font-bold px-2 py-1 rounded-sm">
            Limited Supply
          </span>
        )}
        
        {product.stock_quantity === 0 && (
          <span className="absolute top-2 right-2 bg-[#b54e32] text-white text-xs font-bold px-2 py-1 rounded-sm">
            Out of Stock
          </span>
        )}
        
        {/* Origin badge */}
        <span className="absolute bottom-2 left-2 bg-white/80 text-[#4a5a2b] text-xs font-bold px-2 py-1 rounded-sm backdrop-blur-sm">
          Moroccan Origin
        </span>
      </Link>
      
      <div className="p-4">
        <Link href={productUrl} className="block">
          <h3 className="text-lg font-medium text-[#4a5a2b] mb-1 hover:text-[#6b7f3e] transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-xl font-bold text-[#c17f24] mb-2">
          {formatPrice(Number(product.price))}
        </p>
        
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <Link
            href={productUrl}
            className="text-sm font-medium text-[#6b7f3e] hover:text-[#4a5a2b] transition-colors"
          >
            View Details
          </Link>
          
          <button
            onClick={handleWhatsAppInquiry}
            className="flex items-center text-sm bg-[#6b7f3e] hover:bg-[#4a5a2b] text-white px-3 py-2 rounded-md transition-all shadow-sm hover:shadow"
            disabled={product.stock_quantity === 0}
          >
            <FiSend className="mr-1 h-4 w-4" />
            <span>Buy Now</span>
          </button>
          
          <div className="w-full mt-2 text-xs text-[#8e846b] flex items-center">
            <FaLeaf className="mr-1 h-3 w-3 text-[#6b7f3e]" />
            <span>
              {product.stock_quantity > 0 
                ? `${product.stock_quantity} units available` 
                : 'Currently unavailable'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 