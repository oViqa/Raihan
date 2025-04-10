'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import ProductCard from '../components/ProductCard';

// Sample product data
const PRODUCTS = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'electronics',
    price: 79.99,
    image: 'https://placehold.co/300x300/e2e8f0/1e40af?text=Headphones',
    description: 'High-quality wireless headphones with noise cancellation.'
  },
  {
    id: 2,
    name: 'Smart Watch',
    category: 'electronics',
    price: 199.99,
    image: 'https://placehold.co/300x300/e2e8f0/1e40af?text=SmartWatch',
    description: 'Track your fitness and stay connected with this smart watch.'
  },
  {
    id: 3,
    name: 'Men\'s T-Shirt',
    category: 'fashion',
    price: 24.99,
    image: 'https://placehold.co/300x300/e2e8f0/1e40af?text=T-Shirt',
    description: 'Comfortable cotton t-shirt for everyday wear.'
  },
  {
    id: 4,
    name: 'Women\'s Dress',
    category: 'fashion',
    price: 49.99,
    image: 'https://placehold.co/300x300/e2e8f0/1e40af?text=Dress',
    description: 'Elegant dress perfect for any occasion.'
  },
  {
    id: 5,
    name: 'Table Lamp',
    category: 'home decor',
    price: 34.99,
    image: 'https://placehold.co/300x300/e2e8f0/1e40af?text=Lamp',
    description: 'Modern table lamp to brighten up your living space.'
  },
  {
    id: 6,
    name: 'Throw Pillows (Set of 2)',
    category: 'home decor',
    price: 29.99,
    image: 'https://placehold.co/300x300/e2e8f0/1e40af?text=Pillows',
    description: 'Decorative throw pillows to enhance your home decor.'
  },
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  
  // Filter products based on selected category
  const filteredProducts = selectedCategory 
    ? PRODUCTS.filter(product => product.category === selectedCategory)
    : PRODUCTS;

  const categories = ['all', 'electronics', 'fashion', 'home decor'];
  
  // Function to handle WhatsApp inquiry
  const inquireViaWhatsApp = (product: typeof PRODUCTS[0]) => {
    const message = `Hello, I'm interested in the ${product.name} priced at $${product.price}. Could you provide more information?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/1234567890?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
        
        {/* Category Filter */}
        <div className="mb-8 flex justify-center">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'all' ? null : category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === (category === 'all' ? null : category) 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onInquire={inquireViaWhatsApp} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No products found in this category.</p>
          </div>
        )}
        
        {/* Back to Home Link */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-blue-600 hover:underline font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 