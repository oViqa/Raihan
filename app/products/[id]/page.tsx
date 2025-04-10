'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingBag, FiArrowLeft, FiPlus, FiMinus } from 'react-icons/fi';
import { getProductById } from '@/app/lib/product';
import { Product } from '@/app/lib/database-schema';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import { formatPrice, getWhatsAppButtonProps } from '@/app/lib/whatsapp';
import FloatingWhatsAppButton from '@/app/components/FloatingWhatsAppButton';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      if (!params.id) {
        setError('Product ID is missing');
        setLoading(false);
        return;
      }

      try {
        const productData = await getProductById(params.id as string);
        
        if (!productData) {
          setError('Product not found');
        } else {
          setProduct(productData);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    }
    
    fetchProduct();
  }, [params.id]);

  const incrementQuantity = () => {
    if (product && quantity < product.stock_quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">{error || 'Product not found'}</p>
          <Link href="/products" className="mt-2 text-blue-600 hover:underline inline-flex items-center">
            <FiArrowLeft className="mr-1" /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const whatsAppProps = getWhatsAppButtonProps(product, quantity);
  const isOutOfStock = product.stock_quantity === 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <FiArrowLeft className="mr-1" /> Back to Products
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-100">
            {product.image_url ? (
              <div className="relative h-full w-full">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className={`object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                  onLoad={() => setImageLoading(false)}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <FiShoppingBag className="h-24 w-24 text-gray-400" />
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <p className="text-2xl font-bold text-gray-900 mb-4">
              {formatPrice(Number(product.price))}
            </p>
            
            <div className="bg-gray-100 px-4 py-2 rounded-md mb-4">
              <span className="font-medium">
                {product.stock_quantity > 0 
                  ? `${product.stock_quantity} in stock` 
                  : 'Out of stock'}
              </span>
              
              {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                <span className="ml-2 text-orange-500 font-medium">
                  (Low Stock)
                </span>
              )}
            </div>
            
            {product.description && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>
            )}
            
            {/* Quantity Selector */}
            {!isOutOfStock && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Quantity</h3>
                <div className="flex items-center">
                  <button 
                    onClick={decrementQuantity} 
                    disabled={quantity <= 1}
                    className="p-2 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus className="h-4 w-4" />
                  </button>
                  
                  <div className="px-4 py-2 border-t border-b border-gray-300 text-center min-w-[50px]">
                    {quantity}
                  </div>
                  
                  <button 
                    onClick={incrementQuantity} 
                    disabled={quantity >= product.stock_quantity}
                    className="p-2 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Increase quantity"
                  >
                    <FiPlus className="h-4 w-4" />
                  </button>
                  
                  {quantity > 1 && (
                    <div className="ml-4 text-gray-700 font-medium">
                      Total: {formatPrice(Number(product.price) * quantity)}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Purchase Button */}
            <div className="mt-6">
              {isOutOfStock ? (
                <div className="p-3 bg-gray-200 text-gray-600 rounded-md text-center font-medium">
                  Out of Stock
                </div>
              ) : (
                <WhatsAppButton 
                  href={whatsAppProps.href}
                  message={whatsAppProps.message}
                  className="w-full justify-center py-3 text-base"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      
      <FloatingWhatsAppButton />
    </div>
  );
} 