import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/app/lib/product';
import { getCategories } from '@/app/lib/category';
import ProductCard from '@/app/components/ProductCard';
import FloatingWhatsAppButton from '@/app/components/FloatingWhatsAppButton';
import { formatPrice } from '@/app/lib/whatsapp';

export default async function Home() {
  // Fetch featured products (most recent 6 products)
  const products = await getProducts();
  const featuredProducts = products.slice(0, 6);
  
  // Fetch categories
  const categories = await getCategories();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Raihan Store</h1>
          <p className="text-xl md:text-2xl mb-8">Quality products at affordable prices</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/products" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Browse Products
            </Link>
            <Link 
              href="/admin/login" 
              className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Admin Access
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link 
              href="/products" 
              className="mt-3 md:mt-0 text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Products &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full bg-white p-10 rounded-lg text-center">
                <p className="text-lg text-gray-600">No products available yet.</p>
                <Link 
                  href="/admin/dashboard/products/new"
                  className="mt-4 inline-block text-blue-600 font-medium hover:text-blue-700"
                >
                  Add your first product
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="bg-gray-100 rounded-lg p-6 text-center transform hover:scale-105 transition-transform hover:shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-700 text-sm">
                  {category.description || `Browse our ${category.name.toLowerCase()} collection`}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Browse Products</h3>
              <p className="text-gray-600">Explore our collection of products online</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Contact via WhatsApp</h3>
              <p className="text-gray-600">Reach out to us for any product inquiries</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Complete Your Purchase</h3>
              <p className="text-gray-600">Finalize your order through WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Shop?</h2>
          <p className="text-xl mb-8">Contact us on WhatsApp to place your order</p>
          <a 
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '1234567890'}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors inline-flex items-center"
          >
            <span className="mr-2">Contact on WhatsApp</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Raihan Store</h3>
            <p className="mb-4">Quality products at affordable prices</p>
            <p className="text-gray-400">© {new Date().getFullYear()} Raihan. All rights reserved.</p>
            <div className="mt-4">
              <Link 
                href="/admin/login"
                className="text-gray-400 hover:text-white text-sm"
              >
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </footer>
      
      <FloatingWhatsAppButton />
    </div>
  );
}
