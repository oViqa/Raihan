'use client';

import { useEffect, useState } from 'react';
import { useParams} from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingBag, FiArrowLeft, FiPlus, FiMinus } from 'react-icons/fi';
import { FaLeaf, FaHandHoldingMedical } from 'react-icons/fa6';
import { GiHoneycomb, GiHerbsBundle, GiAfrica } from 'react-icons/gi';
import { getProductById } from '@/app/lib/product';
import { Product } from '@/app/lib/database-schema';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import { formatPrice, getWhatsAppButtonProps } from '@/app/lib/whatsapp';
import FloatingWhatsAppButton from '@/app/components/FloatingWhatsAppButton';

// Helper function to get a fitting icon for the product
const getProductCategory = (product: Product): {icon: React.ReactNode, label: string} => {
  const productText = `${product.name} ${product.description || ''}`.toLowerCase();
  
  if (productText.includes('herb') || productText.includes('spice') || productText.includes('tea')) {
    return {
      icon: <FaLeaf className="h-6 w-6 text-[#6b7f3e]" />,
      label: 'Herbs & Spices'
    };
  } else if (productText.includes('honey') || productText.includes('syrup')) {
    return {
      icon: <GiHoneycomb className="h-6 w-6 text-[#c17f24]" />,
      label: 'Honey & Sweets'
    };
  } else if (productText.includes('oil') || productText.includes('extract') || productText.includes('medicinal')) {
    return {
      icon: <FaHandHoldingMedical className="h-6 w-6 text-[#b54e32]" />,
      label: 'Medicinal Products'
    };
  }
  
  return {
    icon: <GiHerbsBundle className="h-6 w-6 text-[#6b7f3e]" />,
    label: 'Natural Products'
  };
};

export default function ProductDetailPage() {
  const params = useParams();
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
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6b7f3e]"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-[#f8d7cf] p-6 rounded-md border-l-4 border-[#b54e32]">
          <p className="text-[#b54e32] font-medium">{error || 'Product not found'}</p>
          <Link href="/products" className="mt-3 inline-flex items-center text-[#6b7f3e] hover:text-[#4a5a2b] font-medium">
            <FiArrowLeft className="mr-2" /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const whatsAppProps = getWhatsAppButtonProps(product, quantity);
  const isOutOfStock = product.stock_quantity === 0;
  const category = getProductCategory(product);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-6">
        <Link href="/products" className="inline-flex items-center text-[#6b7f3e] hover:text-[#4a5a2b] font-medium transition-colors">
          <FiArrowLeft className="mr-2" /> Back to Products
        </Link>
      </div>

      <div className="moroccan-card overflow-hidden bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square bg-[#f8f5ec]">
            {product.image_url ? (
              <div className="relative h-full w-full">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className={`object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
                  onLoad={() => setImageLoading(false)}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#6b7f3e]"></div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-[#f0ece2]">
                <FiShoppingBag className="h-24 w-24 text-[#8e846b]" />
              </div>
            )}
            
            {/* Origin badge */}
            <div className="absolute bottom-4 left-4 bg-white/90 rounded-md py-2 px-4 backdrop-blur-sm flex items-center space-x-2">
              <GiAfrica className="text-[#b54e32] h-5 w-5" />
              <span className="text-[#4a5a2b] text-sm font-medium">Authentic Moroccan Product</span>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-8">
            <div className="flex items-center space-x-2 mb-2">
              {category.icon}
              <span className="text-sm font-medium text-[#8e846b]">{category.label}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-[#4a5a2b] mb-4">{product.name}</h1>
            
            <div className="bg-[#f0ece2] px-4 py-3 rounded-md mb-6 flex items-center justify-between">
              <span className="font-medium text-[#4a5a2b]">
                {product.stock_quantity > 0 
                  ? `${product.stock_quantity} units available` 
                  : 'Currently unavailable'}
              </span>
              
              {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                <span className="text-[#b54e32] font-medium bg-[#f8d7cf] px-2 py-1 rounded-sm text-sm">
                  Limited Supply
                </span>
              )}
            </div>
            
            {product.description && (
              <div className="mb-8 bg-white border border-[#d3c8ab] rounded-md p-4">
                <h3 className="text-lg font-medium mb-2 text-[#4a5a2b] flex items-center">
                  <GiHerbsBundle className="mr-2 h-5 w-5 text-[#6b7f3e]" />
                  About this product
                </h3>
                <p className="text-[#323232] leading-relaxed">{product.description}</p>
              </div>
            )}
            
            {/* Quantity Selector */}
            {!isOutOfStock && (
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-3 text-[#4a5a2b]">Select Quantity</h3>
                <div className="flex items-center">
                  <button 
                    onClick={decrementQuantity} 
                    disabled={quantity <= 1}
                    className="p-2 border border-[#d3c8ab] rounded-l-md bg-white hover:bg-[#f0ece2] disabled:opacity-50 disabled:cursor-not-allowed text-[#6b7f3e]"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus className="h-5 w-5" />
                  </button>
                  
                  <div className="px-6 py-2 border-t border-b border-[#d3c8ab] text-center min-w-[60px] text-lg font-medium text-[#4a5a2b]">
                    {quantity}
                  </div>
                  
                  <button 
                    onClick={incrementQuantity} 
                    disabled={quantity >= product.stock_quantity}
                    className="p-2 border border-[#d3c8ab] rounded-r-md bg-white hover:bg-[#f0ece2] disabled:opacity-50 disabled:cursor-not-allowed text-[#6b7f3e]"
                    aria-label="Increase quantity"
                  >
                    <FiPlus className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Purchase Button */}
            <div className="mt-6">
              {isOutOfStock ? (
                <div className="p-4 bg-[#f0ece2] text-[#8e846b] rounded-md text-center font-medium border border-[#d3c8ab]">
                  Currently Out of Stock
                </div>
              ) : (
                <>
                  <WhatsAppButton 
                    href={whatsAppProps.href}
                    message="Buy via WhatsApp"
                    className="w-full justify-center py-4 text-base font-bold mb-3"
                  />
                  <p className="text-center text-[#8e846b] text-sm">
                    Direct delivery from our Moroccan farmers to your doorstep
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Product benefits section */}
        {!isOutOfStock && (
          <div className="bg-[#f8f5ec] p-6 border-t border-[#d3c8ab] mt-6">
            <h3 className="text-xl font-bold text-[#4a5a2b] mb-4">Benefits of Moroccan {category.label}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3">
                <div className="bg-white p-2 rounded-full">
                  <FaLeaf className="h-5 w-5 text-[#6b7f3e]" />
                </div>
                <div>
                  <h4 className="font-medium text-[#4a5a2b]">100% Natural</h4>
                  <p className="text-sm text-[#8e846b]">Grown without artificial chemicals or pesticides</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-white p-2 rounded-full">
                  <GiHerbsBundle className="h-5 w-5 text-[#6b7f3e]" />
                </div>
                <div>
                  <h4 className="font-medium text-[#4a5a2b]">Traditional Methods</h4>
                  <p className="text-sm text-[#8e846b]">Harvested and processed using time-honored techniques</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-white p-2 rounded-full">
                  <GiAfrica className="h-5 w-5 text-[#b54e32]" />
                </div>
                <div>
                  <h4 className="font-medium text-[#4a5a2b]">Moroccan Origin</h4>
                  <p className="text-sm text-[#8e846b]">Sourced directly from local farmers in Morocco</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <FloatingWhatsAppButton />
    </div>
  );
} 