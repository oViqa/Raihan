'use client';

import { useEffect, useState } from 'react';
import { useParams} from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingBag, FiArrowLeft, FiPlus, FiMinus, FiCheck } from 'react-icons/fi';
import { FaLeaf, FaHandHoldingMedical, FaRegStar } from 'react-icons/fa6';
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
  const [activeTab, setActiveTab] = useState<'description' | 'benefits'>('description');

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
      <div className="min-h-screen bg-[url('/herbal-pattern.svg')] bg-repeat flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-md border border-[#d3c8ab]/30 relative overflow-hidden transform animate-scaleIn">
          <div className="absolute inset-0 bg-[url('/herbal-pattern.svg')] bg-repeat opacity-20"></div>
          <div className="relative z-10">
            <div className="inline-block">
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-[#6b7f3e]"></div>
                <GiHerbsBundle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#6b7f3e] h-10 w-10" />
              </div>
            </div>
            <p className="mt-6 text-[#4a5a2b] font-medium text-lg">Loading Product...</p>
            <p className="text-[#8e846b] text-sm mt-2">Please wait while we gather product details</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[url('/herbal-pattern.svg')] bg-repeat py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-md p-8 border border-[#d3c8ab]/30">
            <div className="bg-[#f8d7cf] p-6 rounded-lg border-l-4 border-[#b54e32] mb-4">
              <p className="text-[#b54e32] font-medium">{error || 'Product not found'}</p>
            </div>
            <Link href="/products" className="inline-flex items-center text-[#6b7f3e] hover:text-[#4a5a2b] font-medium 
              py-2 px-4 rounded-lg border border-[#6b7f3e]/30 hover:border-[#6b7f3e] transition-colors">
              <FiArrowLeft className="mr-2" /> Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const whatsAppProps = getWhatsAppButtonProps(product, quantity);
  const isOutOfStock = product.stock_quantity === 0;
  const category = getProductCategory(product);

  return (
    <div className="min-h-screen bg-[url('/herbal-pattern.svg')] bg-repeat py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6 bg-white px-6 py-3 rounded-full shadow-sm inline-block border border-[#d3c8ab]/30">
          <Link href="/products" className="inline-flex items-center text-[#6b7f3e] hover:text-[#4a5a2b] font-medium transition-colors">
            <FiArrowLeft className="mr-2" /> Back to Products
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#d3c8ab]/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="relative aspect-square bg-gradient-to-br from-[#f8f5ec] to-white">
              {product.image_url ? (
                <div className="relative h-full w-full overflow-hidden group">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      imageLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                    } group-hover:scale-110`}
                    onLoad={() => setImageLoading(false)}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6b7f3e]"></div>
                    </div>
                  )}
                  
                  {/* Overlay pattern */}
                  <div className="absolute inset-0 bg-[url('/moroccan-pattern.png')] opacity-10 pointer-events-none mix-blend-multiply"></div>
                </div>
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#f8f5ec] to-white">
                  <FiShoppingBag className="h-24 w-24 text-[#8e846b]" />
                </div>
              )}
              
              {/* Origin badge */}
              <div className="absolute bottom-4 left-4 bg-white/90 rounded-full py-2 px-4 backdrop-blur-sm flex items-center space-x-2 shadow-sm">
                <GiAfrica className="text-[#b54e32] h-5 w-5" />
                <span className="text-[#4a5a2b] text-sm font-medium">Authentic Moroccan</span>
              </div>
              
              {/* Category badge */}
              <div className="absolute top-4 left-4 bg-white/90 rounded-full py-2 px-4 backdrop-blur-sm flex items-center space-x-2 shadow-sm">
                {category.icon}
                <span className="text-[#4a5a2b] text-sm font-medium">{category.label}</span>
              </div>
              
              {/* Stock badge */}
              {product.stock_quantity <= 5 && product.stock_quantity > 0 ? (
                <div className="absolute top-4 right-4">
                  <span className="bg-[#c17f24] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    Limited Stock
                  </span>
                </div>
              ) : product.stock_quantity === 0 ? (
                <div className="absolute top-4 right-4">
                  <span className="bg-[#b54e32] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    Out of Stock
                  </span>
                </div>
              ) : null}
            </div>

            {/* Product Details */}
            <div className="p-8 md:p-10 flex flex-col h-full">
              <h1 className="text-3xl font-bold text-[#4a5a2b] mb-3">{product.name}</h1>
              
              <div className="mb-2 flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaRegStar key={star} className="text-[#c17f24] h-4 w-4" />
                ))}
                <span className="text-[#8e846b] text-xs ml-1">Traditional Moroccan Quality</span>
              </div>
              
              <div className="bg-[#f8f5ec] rounded-lg p-4 mb-6 flex items-center justify-between">
                <span className="font-medium text-[#4a5a2b] flex items-center">
                  <FiCheck className="mr-2 h-4 w-4 text-[#6b7f3e]" />
                  {product.stock_quantity > 0 
                    ? `${product.stock_quantity} units in stock` 
                    : 'Currently unavailable'}
                </span>
                
                <span className="text-2xl font-bold text-[#4a5a2b]">
                  {formatPrice(product.price)}
                </span>
              </div>
              
              {/* Tabs */}
              <div className="mb-6">
                <div className="flex border-b border-[#d3c8ab]">
                  <button 
                    className={`py-3 px-4 font-medium text-sm ${
                      activeTab === 'description' 
                        ? 'text-[#4a5a2b] border-b-2 border-[#6b7f3e]' 
                        : 'text-[#8e846b] hover:text-[#4a5a2b]'
                    }`}
                    onClick={() => setActiveTab('description')}
                  >
                    Description
                  </button>
                  <button 
                    className={`py-3 px-4 font-medium text-sm ${
                      activeTab === 'benefits' 
                        ? 'text-[#4a5a2b] border-b-2 border-[#6b7f3e]' 
                        : 'text-[#8e846b] hover:text-[#4a5a2b]'
                    }`}
                    onClick={() => setActiveTab('benefits')}
                  >
                    Benefits
                  </button>
                </div>
                
                <div className="py-4">
                  {activeTab === 'description' ? (
                    <div className="prose prose-sm max-w-none text-[#4a5a2b]">
                      {product.description ? (
                        <p className="leading-relaxed">{product.description}</p>
                      ) : (
                        <p className="text-[#8e846b] italic">No description available for this product.</p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="bg-[#f8f5ec] p-2 rounded-full mr-3">
                          <FaLeaf className="h-4 w-4 text-[#6b7f3e]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#4a5a2b]">100% Natural</h4>
                          <p className="text-sm text-[#8e846b]">Grown without artificial chemicals or pesticides</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-[#f8f5ec] p-2 rounded-full mr-3">
                          <GiHerbsBundle className="h-4 w-4 text-[#6b7f3e]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#4a5a2b]">Traditional Methods</h4>
                          <p className="text-sm text-[#8e846b]">Harvested and processed using time-honored techniques</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-[#f8f5ec] p-2 rounded-full mr-3">
                          <GiAfrica className="h-4 w-4 text-[#b54e32]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#4a5a2b]">Moroccan Origin</h4>
                          <p className="text-sm text-[#8e846b]">Sourced directly from local farmers in Morocco</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Quantity Selector and Purchase */}
              <div className="mt-auto">
                {!isOutOfStock && (
                  <div className="mb-6">
                    <label className="text-sm font-medium mb-2 block text-[#8e846b]">QUANTITY</label>
                    <div className="flex items-center">
                      <button 
                        onClick={decrementQuantity} 
                        disabled={quantity <= 1}
                        className="p-3 border border-[#d3c8ab] rounded-l-lg bg-white hover:bg-[#f8f5ec] disabled:opacity-50 disabled:cursor-not-allowed text-[#6b7f3e] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <FiMinus className="h-4 w-4" />
                      </button>
                      
                      <div className="px-6 py-3 border-t border-b border-[#d3c8ab] text-center min-w-[60px] text-lg font-medium text-[#4a5a2b] bg-white">
                        {quantity}
                      </div>
                      
                      <button 
                        onClick={incrementQuantity} 
                        disabled={quantity >= product.stock_quantity}
                        className="p-3 border border-[#d3c8ab] rounded-r-lg bg-white hover:bg-[#f8f5ec] disabled:opacity-50 disabled:cursor-not-allowed text-[#6b7f3e] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <FiPlus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Purchase Button */}
                <div>
                  {isOutOfStock ? (
                    <div className="p-5 bg-[#f8f5ec] text-[#8e846b] rounded-lg text-center font-medium border border-[#d3c8ab]">
                      Currently Out of Stock
                    </div>
                  ) : (
                    <>
                      <WhatsAppButton 
                        href={whatsAppProps.href}
                        message="Buy via WhatsApp"
                        className="w-full justify-center py-4 text-base font-bold mb-3"
                        size="lg"
                        fullWidth={true}
                      />
                      <p className="text-center text-[#8e846b] text-xs">
                        Secure payment on delivery • Free shipping on orders over $50
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FloatingWhatsAppButton />
    </div>
  );
} 