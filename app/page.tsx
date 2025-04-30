'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProducts } from '@/app/lib/product';
import { getCategories } from '@/app/lib/category';
import FloatingWhatsAppButton from '@/app/components/FloatingWhatsAppButton';
import { FaLeaf } from 'react-icons/fa';
import { GiHerbsBundle, GiMortar } from 'react-icons/gi';
import FeaturedProductsSlider from '@/app/components/Productsslider';
import { Product, Category } from './lib/database-schema';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const productsData = await getProducts();
        const categoriesData = await getCategories();
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Get the 6 most recent products for the featured slider
  const featuredProducts = products.slice(0, 6);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6b7f3e]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen bg-[url('https://img.freepik.com/photos-premium/composition-produit-cosmetique-bio-naturel-illustration-ai-generative_118124-13187.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center items-center text-center">
          <GiHerbsBundle className="text-[#c17f24] h-20 w-20 mb-6 animate-pulse" />
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white moroccan-heading slow-green-pulse">
            Coopérative Raihan
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-[#f0ece2] max-w-2xl">
            Découvrez des produits naturels authentiques récoltés par des générations d'agriculteurs locaux des montagnes de l'Atlas au Maroc
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/products"
              className="btn-primary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Explorer la Collection
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
          Trésors sélectionnés à la main des meilleures récoltes du Maroc
        </p>
        </div>
        <FeaturedProductsSlider featuredProducts={featuredProducts} />
        <div className="text-center mt-12">
        <Link
          href="/products"
          className="inline-flex items-center text-[#6b7f3e] hover:text-[#4a5a2b] font-medium text-lg group"
        >
          Voir tous les produits
          <span className={`transform group-hover:translate-x-2 transition-transform`}>→</span>
        </Link>
        </div>
      </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5 bg-[url('/moroccan-pattern.png')] bg-repeat"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-16 text-center">
            <div className="inline-block bg-[#f8f5ec] rounded-full p-3 mb-4 shadow-md">
              <GiMortar className="h-8 w-8 text-[#c17f24]" />
            </div>
            <h2 className="text-4xl font-bold text-[#4a5a2b] moroccan-heading">
              Explorer les Collections
            </h2>
            <p className="text-[#8e846b] text-xl max-w-3xl mx-auto mt-4">
              Catégories sélectionnées des meilleures offres naturelles du Maroc
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#6b7f3e] to-[#c17f24] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              // Select different icons for different categories
              const getCategoryIcon = (index: number) => {
                const icons = [
                  <FaLeaf key="leaf" className="h-10 w-10 text-[#6b7f3e]" />,
                  <GiHerbsBundle key="herbs" className="h-10 w-10 text-[#c17f24]" />,
                  <GiMortar key="mortar" className="h-10 w-10 text-[#b54e32]" />
                ];
                return icons[index % icons.length];
              };
              
              // Add alternating background colors for visual interest
              const getBgColor = (index: number) => {
                const colors = ["from-[#f8f5ec] to-white", "from-[#f0ece2] to-white"];
                return colors[index % colors.length];
              };
              
              return (
                <Link
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl border border-[#d3c8ab]/30 transition-all duration-500"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${getBgColor(index)} opacity-70`}></div>
                  <div className="absolute inset-0 bg-[url('/moroccan-pattern.png')] opacity-5"></div>
                  
                  <div className="p-8 relative z-10 flex flex-col items-center text-center h-full">
                    <div className="bg-white/80 rounded-full p-5 shadow-md mb-5 backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-500">
                      {getCategoryIcon(index)}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-[#4a5a2b] mb-3 group-hover:text-[#6b7f3e] transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-[#8e846b] mb-6 flex-grow">
                      {category.description || `Authentique ${category.name.toLowerCase()} des montagnes de l'Atlas`}
                    </p>
                    
                    <span className="inline-flex items-center justify-center bg-white/80 text-[#c17f24] font-medium py-2 px-4 rounded-full shadow-sm backdrop-blur-sm group-hover:bg-[#6b7f3e] group-hover:text-white transition-all duration-300">
                      Découvrir <span className={`transform group-hover:translate-x-1 transition-transform`}>→</span>
                    </span>
                  </div>
                  
                  {/* Bottom decorative border */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6b7f3e] via-[#c17f24] to-[#b54e32]"></div>
                </Link>
              );
            })}
          </div>
          
          {/* Add a "View All Categories" link if there are many categories */}
          {categories.length > 3 && (
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-[#f8f5ec] hover:bg-[#6b7f3e] text-[#6b7f3e] hover:text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors border border-[#d3c8ab]/50"
              >
                Voir toutes les catégories
                <span className={``}>→</span>
              </Link>
            </div>
          )}
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
            <p className="mb-4 text-[#d3c8ab]">
              Trésors naturels des montagnes de l'Atlas
            </p>
            <p className="text-[#8e846b]">© {new Date().getFullYear()} Raihan. Tous droits réservés.</p>
            <div className="mt-6 space-x-4">
              <Link
                href="/products"
                className="text-[#d3c8ab] hover:text-white text-sm"
              >
                Produits
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <FloatingWhatsAppButton />
    </div>
  );
} 