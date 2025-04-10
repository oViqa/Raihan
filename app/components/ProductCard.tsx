'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiShoppingBag, FiSend } from 'react-icons/fi';
import { Product } from '@/app/lib/database-schema';
import { formatPrice } from '@/app/lib/whatsapp';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890';

  const handleWhatsAppInquiry = () => {
    const message = `Hello, I'm interested in the ${product.name} (ID: ${product.id}). Could you provide more information?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const productUrl = `/products/${product.id}`;
  
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link href={productUrl} className="block relative">
        <div className="aspect-square relative overflow-hidden bg-gray-100">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className={`object-cover transform group-hover:scale-105 transition-transform duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setIsLoading(false)}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <FiShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
          )}
          
          {isLoading && product.image_url && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
        
        {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
            Low Stock
          </span>
        )}
        
        {product.stock_quantity === 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Sold Out
          </span>
        )}
      </Link>
      
      <div className="p-4">
        <Link href={productUrl} className="block">
          <h3 className="text-lg font-medium text-gray-900 mb-1 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-xl font-bold text-gray-900 mb-2">
          {formatPrice(Number(product.price))}
        </p>
        
        <div className="flex justify-between items-center">
          <Link
            href={productUrl}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            View Details
          </Link>
          
          <button
            onClick={handleWhatsAppInquiry}
            className="flex items-center text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md transition-colors"
          >
            <FiSend className="mr-1 h-4 w-4" />
            <span>Inquire</span>
          </button>
          
          <span className="text-sm text-gray-500">
            {product.stock_quantity > 0 
              ? `${product.stock_quantity} in stock` 
              : 'Out of stock'}
          </span>
        </div>
      </div>
    </div>
  );
} 