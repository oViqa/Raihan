'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProducts } from '@/app/lib/product';
import { getCategories } from '@/app/lib/category';
import { Product, Category } from '@/app/lib/database-schema';
import ProductCard from '@/app/components/ProductCard';
import FloatingWhatsAppButton from '@/app/components/FloatingWhatsAppButton';
import { FaSearch, FaFilter, FaTimes, FaLeaf } from 'react-icons/fa';
import { GiHerbsBundle, GiMortar, GiAfrica } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const productGridRef = useRef<HTMLDivElement>(null);
  
  // Get category filter from URL if exists
  const categoryParam = searchParams.get('category');
  
  // Get search query from URL if exists
  const searchQuery = searchParams.get('search') || '';
  
  // State for filter
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || '');
  const [search, setSearch] = useState<string>(searchQuery);
  
  // Fetch products and categories on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  // Apply filters whenever products, selected category, or search changes
  useEffect(() => {
    if (products.length === 0) {
      setFilteredProducts([]);
      return;
    }
    
    let filtered = [...products];
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply search filter
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        (product.description && product.description.toLowerCase().includes(searchLower))
      );
    }
    
    setFilteredProducts(filtered);
  }, [products, selectedCategory, search]);
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    
    // Update URL without refreshing page
    const url = new URL(window.location.href);
    if (categoryId) {
      url.searchParams.set('category', categoryId);
    } else {
      url.searchParams.delete('category');
    }
    
    window.history.pushState({}, '', url);
    
    // Scroll to product grid on mobile after filter change
    if (window.innerWidth < 768 && productGridRef.current) {
      setTimeout(() => {
        productGridRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    
    // Close mobile filters after selection
    setShowMobileFilters(false);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL without refreshing page
    const url = new URL(window.location.href);
    if (search.trim()) {
      url.searchParams.set('search', search);
    } else {
      url.searchParams.delete('search');
    }
    
    window.history.pushState({}, '', url);
  };
  
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'All Categories';
  };
  
  const clearFilters = () => {
    setSelectedCategory('');
    setSearch('');
    window.history.pushState({}, '', '/products');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f5ec]">
        <div className="animate-pulse mb-6">
          <GiMortar className="h-16 w-16 text-[#6b7f3e]" />
        </div>
        <h2 className="text-2xl font-bold text-[#4a5a2b] mb-2">Discovering Treasures</h2>
        <p className="text-[#8e846b]">Loading authentic Moroccan products...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-[#f8d7cf] p-6 rounded-md border-l-4 border-[#b54e32]">
          <p className="text-[#b54e32] font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-3 text-[#6b7f3e] hover:text-[#4a5a2b] font-medium"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-[#f8f5ec]">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden bg-[#4a5a2b]">
        <div className="absolute inset-0 z-0">
          <div className={`transition-opacity duration-1000 ${heroImageLoaded ? 'opacity-60' : 'opacity-0'}`}>
            <Image 
              src="/images/moroccan-products-hero.jpg"
              alt="Authentic Moroccan Products"
              fill
              priority
              className="object-cover"
              onLoad={() => setHeroImageLoaded(true)}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#4a5a2b]/60 via-transparent to-[#4a5a2b]/80"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <GiHerbsBundle className="h-16 w-16 text-white mb-4" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {selectedCategory ? getCategoryName(selectedCategory) : 'Moroccan Treasures'}
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Hand-harvested natural products from the heart of Morocco, crafted with centuries of traditional knowledge
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search products by name or ingredients..."
                  className="w-full bg-white/90 backdrop-blur-sm border-2 border-[#d3c8ab] rounded-full py-3 px-6 pr-12 text-[#4a5a2b] placeholder-[#8e846b] focus:outline-none focus:ring-2 focus:ring-[#6b7f3e] focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-4 p-1 rounded-full bg-[#6b7f3e] text-white hover:bg-[#4a5a2b] transition-colors"
                >
                  <FaSearch className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
            <path 
              fill="#f8f5ec" 
              fillOpacity="1" 
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        {/* Active Filters Display */}
        {(selectedCategory || search) && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-white rounded-lg shadow-md flex items-center justify-between flex-wrap gap-2"
          >
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-[#8e846b] font-medium">Active filters:</span>
              
              {selectedCategory && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#6b7f3e]/10 text-[#4a5a2b] border border-[#6b7f3e]/20">
                  {getCategoryName(selectedCategory)}
                  <button 
                    onClick={() => handleCategoryChange('')}
                    className="ml-1.5 text-[#6b7f3e] hover:text-[#4a5a2b]"
                  >
                    <FaTimes className="h-3 w-3" />
                  </button>
                </span>
              )}
              
              {search && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#6b7f3e]/10 text-[#4a5a2b] border border-[#6b7f3e]/20">
                  Search: {search}
                  <button 
                    onClick={() => {
                      setSearch('');
                      const url = new URL(window.location.href);
                      url.searchParams.delete('search');
                      window.history.pushState({}, '', url);
                    }}
                    className="ml-1.5 text-[#6b7f3e] hover:text-[#4a5a2b]"
                  >
                    <FaTimes className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
            
            <button
              onClick={clearFilters}
              className="text-sm text-[#6b7f3e] hover:text-[#4a5a2b] font-medium underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-16">
          {/* Mobile Filters Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full flex items-center justify-center gap-2 bg-white p-3 rounded-lg shadow-sm border border-[#d3c8ab] text-[#4a5a2b] font-medium"
            >
              <FaFilter className="h-4 w-4 text-[#6b7f3e]" />
              {showMobileFilters ? 'Hide Filters' : 'Show Filters & Categories'}
            </button>
          </div>
          
          {/* Sidebar Filters */}
          <div className={`lg:col-span-1 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-4 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-[#6b7f3e] text-white">
                <div className="flex items-center">
                  <FaLeaf className="h-5 w-5 mr-2" />
                  <h2 className="text-lg font-semibold">Categories</h2>
                </div>
              </div>
              
              <div className="p-4 divide-y divide-[#d3c8ab]">
                <div className="py-2">
                  <button
                    onClick={() => handleCategoryChange('')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === '' 
                        ? 'bg-[#6b7f3e]/10 text-[#4a5a2b] font-medium' 
                        : 'hover:bg-[#f0ece2] text-[#8e846b]'
                    }`}
                  >
                    All Products
                  </button>
                </div>

                {categories.map(category => (
                  <div key={category.id} className="py-2">
                    <button
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === category.id 
                          ? 'bg-[#6b7f3e]/10 text-[#4a5a2b] font-medium' 
                          : 'hover:bg-[#f0ece2] text-[#8e846b]'
                      }`}
                    >
                      {category.name}
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-[#f0ece2] border-t border-[#d3c8ab]">
                <div className="flex items-center gap-2 text-[#8e846b] text-sm">
                  <GiAfrica className="h-4 w-4 text-[#b54e32]" />
                  <span>All products are authentically Moroccan</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div ref={productGridRef} className="lg:col-span-3">
            {/* Results count */}
            <div className="mb-6 bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
              <p className="text-[#4a5a2b] font-medium">
                <span className="text-[#6b7f3e] font-bold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveView('grid')}
                  className={`p-1.5 rounded ${activeView === 'grid' ? 'bg-[#6b7f3e]/10 text-[#6b7f3e]' : 'text-[#8e846b] hover:text-[#6b7f3e]'}`}
                  aria-label="Grid view"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setActiveView('list')}
                  className={`p-1.5 rounded ${activeView === 'list' ? 'bg-[#6b7f3e]/10 text-[#6b7f3e]' : 'text-[#8e846b] hover:text-[#6b7f3e]'}`}
                  aria-label="List view"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {filteredProducts.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-lg shadow-md p-10 text-center"
                >
                  <GiHerbsBundle className="mx-auto h-16 w-16 text-[#d3c8ab] mb-4" />
                  <h3 className="text-xl font-semibold text-[#4a5a2b] mb-2">No products found</h3>
                  <p className="text-[#8e846b] mb-6 max-w-md mx-auto">
                    We couldn't find any products matching your current filters. Try adjusting your search or browse all our categories.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center px-4 py-2 bg-[#6b7f3e] text-white rounded-md hover:bg-[#4a5a2b] transition-colors"
                  >
                    <FaTimes className="mr-2 h-4 w-4" />
                    Clear filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={activeView === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: index * 0.05 }
                      }}
                      className={activeView === 'list' ? 'w-full' : ''}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Moroccan Tradition Section */}
        <div className="my-16 py-12 bg-white rounded-lg shadow-md">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-8">
              <GiMortar className="mx-auto h-12 w-12 text-[#6b7f3e] mb-4" />
              <h2 className="text-3xl font-bold text-[#4a5a2b] mb-2">Moroccan Tradition & Heritage</h2>
              <div className="h-1 w-24 bg-[#d3c8ab] mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[#f0ece2] p-4 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                  <GiHerbsBundle className="h-10 w-10 text-[#6b7f3e]" />
                </div>
                <h3 className="text-xl font-semibold text-[#4a5a2b] mb-2">Natural Ingredients</h3>
                <p className="text-[#8e846b]">
                  Every product is made with 100% natural ingredients, harvested responsibly from the Moroccan landscape.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#f0ece2] p-4 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                  <GiMortar className="h-10 w-10 text-[#6b7f3e]" />
                </div>
                <h3 className="text-xl font-semibold text-[#4a5a2b] mb-2">Traditional Methods</h3>
                <p className="text-[#8e846b]">
                  Our artisans use centuries-old techniques passed down through generations of skilled craftspeople.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#f0ece2] p-4 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                  <GiAfrica className="h-10 w-10 text-[#6b7f3e]" />
                </div>
                <h3 className="text-xl font-semibold text-[#4a5a2b] mb-2">Direct from Morocco</h3>
                <p className="text-[#8e846b]">
                  We work directly with local families and cooperatives, ensuring fair trade and authentic Moroccan quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FloatingWhatsAppButton />
    </div>
  );
}