import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/app/lib/product';
import { getCategories } from '@/app/lib/category';
import ProductCard from '@/app/components/ProductCard';
import FloatingWhatsAppButton from '@/app/components/FloatingWhatsAppButton';
import { formatPrice } from '@/app/lib/whatsapp';
import { FaLeaf, FaShippingFast, FaHandsHelping } from 'react-icons/fa';
import { GiHerbsBundle, GiMortar, GiMountainRoad } from 'react-icons/gi';
import FeaturedProductsSlider from '@/app/components/Productsslider';

export default async function Home() {
  // Fetch featured products (most recent 6 products)
  const products = await getProducts();
  const featuredProducts = products.slice(0, 6);
  
  // Fetch categories
  const categories = await getCategories();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-[url('/images/moroccan-herbs-bg.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00000099] to-[#00000066] moroccan-pattern"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center items-center text-center">
          <GiHerbsBundle className="text-[#c17f24] h-20 w-20 mb-6 animate-pulse" />
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white moroccan-heading">
            Coopérative Raihan
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-[#f0ece2] max-w-2xl">
            Discover authentic natural products harvested by generations of local farmers from the Atlas Mountains of Morocco
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/products" 
              className="btn-primary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Explore Our Collection
            </Link>
            <Link 
              href="/about" 
              className="bg-transparent text-white border-2 border-[#c17f24] px-8 py-4 rounded-md font-medium hover:bg-[#c17f2420] transition-all duration-300 text-lg"
            >
              Our Heritage
            </Link>
          </div>
        </div>
      </section>
      {/* Slider for Featured Products */}
      <section className="py-20 bg-[#f8f5ec]">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center mb-3">
              <FaLeaf className="h-6 w-6 text-[#6b7f3e] mr-2" />
              <h2 className="text-4xl font-bold text-[#4a5a2b] moroccan-heading">
                Nos Produits
              </h2>
            </div>
            <p className="text-[#8e846b] text-xl max-w-3xl mx-auto mt-3">
              Handpicked treasures from Morocco's finest harvests
            </p>
          </div>
          <FeaturedProductsSlider featuredProducts={featuredProducts} />
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center text-[#6b7f3e] hover:text-[#4a5a2b] font-medium text-lg group"
            >
              View All Products
              <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center mb-3">
              <GiMortar className="h-6 w-6 text-[#c17f24] mr-2" />
              <h2 className="text-4xl font-bold text-[#4a5a2b] moroccan-heading">
                Explore Our Collections
              </h2>
            </div>
            <p className="text-[#8e846b] text-xl max-w-3xl mx-auto mt-3">
              Curated categories of Morocco's finest natural offerings
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="moroccan-card group p-8 text-center transform hover:-translate-y-2 transition-all duration-500 hover:shadow-xl overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-[#4a5a2b] mb-3 group-hover:text-[#6b7f3e] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-[#8e846b] mb-4">
                    {category.description || `Authentic ${category.name.toLowerCase()} from the Atlas Mountains`}
                  </p>
                  <span className="inline-block text-[#c17f24] font-medium group-hover:translate-x-2 transition-transform">
                    Discover →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      

      {/* Footer */}
      <footer className="bg-[#323232] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <GiHerbsBundle className="h-8 w-8 text-[#6b7f3e] mr-2" />
              <h3 className="text-2xl font-bold">Raihan</h3>
            </div>
            <p className="mb-4 text-[#d3c8ab]">Natural treasures from the Atlas Mountains</p>
            <p className="text-[#8e846b]">© {new Date().getFullYear()} Raihan. All rights reserved.</p>
            <div className="mt-6 space-x-4">
              <Link 
                href="/products"
                className="text-[#d3c8ab] hover:text-white text-sm"
              >
                Nos Produits
              </Link>
              <span className="text-[#8e846b]">|</span>
              <Link 
                href="/about"
                className="text-[#d3c8ab] hover:text-white text-sm"
              >
                Our Story
              </Link>
              <span className="text-[#8e846b]">|</span>
              <Link 
                href="/admin/login"
                className="text-[#d3c8ab] hover:text-white text-sm"
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
