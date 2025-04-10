'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCategories } from '@/app/lib/category';
import { Category } from '@/app/lib/database-schema';
import { FiMenu, FiX, FiShoppingBag } from 'react-icons/fi';

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

  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600';
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <FiShoppingBag className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Raihan Store</span>
            </Link>
            
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link 
                href="/" 
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  pathname === '/' ? 'border-blue-500 text-gray-900' : 'border-transparent hover:border-gray-300'
                }`}
              >
                Home
              </Link>
              
              <Link 
                href="/products" 
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  pathname === '/products' || pathname.startsWith('/products/') 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                All Products
              </Link>
              
              {!loading && categories.slice(0, 3).map((category) => (
                <Link 
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                    pathname === `/products` && new URLSearchParams(window.location.search).get('category') === category.id
                      ? 'border-blue-500 text-gray-900' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Admin link (desktop) */}
          <div className="hidden md:flex md:items-center">
            <Link 
              href="/admin/login" 
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link 
            href="/" 
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              pathname === '/' 
                ? 'border-blue-500 text-blue-700 bg-blue-50' 
                : 'border-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            Home
          </Link>
          
          <Link 
            href="/products" 
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              pathname === '/products' 
                ? 'border-blue-500 text-blue-700 bg-blue-50' 
                : 'border-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            All Products
          </Link>
          
          {!loading && categories.map((category) => (
            <Link 
              key={category.id}
              href={`/products?category=${category.id}`}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300"
            >
              {category.name}
            </Link>
          ))}
          
          <Link 
            href="/admin/login" 
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300"
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </nav>
  );
} 