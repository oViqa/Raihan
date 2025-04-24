'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCategories } from '@/app/lib/category';
import { Category } from '@/app/lib/database-schema';
import { FiMenu, FiX } from 'react-icons/fi';
import { GiHerbsBundle } from 'react-icons/gi';
import { FaLeaf } from 'react-icons/fa';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Fetch categories for the nav menu
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCategories();
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // const isActive = (path: string) => {
  //  return pathname === path 
  //    ? 'text-[#4a5a2b] font-bold' 
  //    : 'text-[#6b7f3e] hover:text-[#4a5a2b]';
  //};

  return (
    <nav className="bg-white sticky top-0 z-40 border-b-2 border-[#d3c8ab] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18 py-2">
          {/* Logo and desktop navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="bg-[#6b7f3e] rounded-full p-2">
                <GiHerbsBundle className="h-8 w-8 text-white" />
              </div>
              <div className="ml-3 flex flex-col">
                <span className="text-xl font-bold text-[#4a5a2b]">Coopérative Raihan</span>
                <span className="text-xs text-[#8e846b]">Produits naturels de l'Atlas</span>
              </div>
            </Link>
            
            <div className="hidden md:ml-8 md:flex md:space-x-6">
              <Link 
                href="/" 
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium border-b-2 ${
                  pathname === '/' 
                    ? 'border-[#c17f24] text-[#4a5a2b]' 
                    : 'border-transparent text-[#6b7f3e] hover:text-[#4a5a2b] hover:border-[#d3c8ab]'
                }`}
              >
                Accueil
              </Link>
              
              <Link 
                href="/products" 
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium border-b-2 ${
                  pathname === '/products' || pathname.startsWith('/products/') 
                    ? 'border-[#c17f24] text-[#4a5a2b]' 
                    : 'border-transparent text-[#6b7f3e] hover:text-[#4a5a2b] hover:border-[#d3c8ab]'
                }`}
              >
                <FaLeaf className="mr-1 h-4 w-4" />
                Nos Produits
              </Link>
              
              <Link 
                href="/about" 
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium border-b-2 ${
                  pathname === '/about' 
                    ? 'border-[#c17f24] text-[#4a5a2b]' 
                    : 'border-transparent text-[#6b7f3e] hover:text-[#4a5a2b] hover:border-[#d3c8ab]'
                }`}
              >
                <FaLeaf className="mr-1 h-4 w-4" />
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#6b7f3e] hover:text-[#4a5a2b] hover:bg-[#f0ece2] focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? 'Fermer menu' : 'Ouvrir menu'}</span>
              {isMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/" 
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                pathname === '/' 
                  ? 'border-[#c17f24] text-[#4a5a2b] bg-[#f0ece2]' 
                  : 'border-transparent text-[#6b7f3e] hover:bg-[#f0ece2] hover:border-[#d3c8ab]'
              }`}
            >
              Accueil
            </Link>
            
            <Link 
              href="/products" 
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                pathname === '/products' 
                  ? 'border-[#c17f24] text-[#4a5a2b] bg-[#f0ece2]' 
                  : 'border-transparent text-[#6b7f3e] hover:bg-[#f0ece2] hover:border-[#d3c8ab]'
              }`}
            >
              All Products
            </Link>
            
            {!loading && categories.map((category) => (
              <Link 
                key={category.id}
                href={`/products?category=${category.id}`}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  pathname === '/products' && new URLSearchParams(window.location.search).get('category') === category.id
                    ? 'border-[#c17f24] text-[#4a5a2b] bg-[#f0ece2]' 
                    : 'border-transparent text-[#6b7f3e] hover:bg-[#f0ece2] hover:border-[#d3c8ab]'
                }`}
              >
                {category.name}
              </Link>
            ))}
            
            <Link 
              href="/about" 
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                pathname === '/about' 
                  ? 'border-[#c17f24] text-[#4a5a2b] bg-[#f0ece2]' 
                  : 'border-transparent text-[#6b7f3e] hover:bg-[#f0ece2] hover:border-[#d3c8ab]'
              }`}
            >
              Contact
            </Link>
            
            {/* <Link 
              href="/admin/login" 
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-[#4a5a2b] bg-[#f0ece2] hover:bg-[#d3c8ab]"
            >
              Admin Portal
            </Link> */}
          </div>
        </div>
      )}
    </nav>
  );
} 