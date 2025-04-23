'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProducts } from '@/app/lib/product';
import { getCategories } from '@/app/lib/category';
import { Product, Category } from '@/app/lib/database-schema';
import ProductCard from '@/app/components/ProductCard';
import FloatingWhatsAppButton from '@/app/components/FloatingWhatsAppButton';
import { FaSearch, FaLeaf, FaFilter, FaTimes, FaArrowRight, FaChevronRight } from 'react-icons/fa';
import { GiHerbsBundle, GiMortar, GiSeedling } from 'react-icons/gi';
import { FiArrowRight, FiSliders } from 'react-icons/fi';

// Loading component for Suspense fallback
function ProductsLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/herbal-pattern.svg')] bg-repeat">
      <div className="text-center bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-[#d3c8ab]/40 relative overflow-hidden transform transition-all duration-500 max-w-sm mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8f5ec]/80 to-white opacity-50"></div>
        <div className="relative z-10">
          <div className="inline-block">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 md:h-24 w-16 md:w-24 border-t-4 border-b-4 border-[#6b7f3e]"></div>
              <GiMortar className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#6b7f3e] h-8 md:h-12 w-8 md:w-12" />
            </div>
          </div>
          <p className="mt-6 md:mt-8 text-[#4a5a2b] font-semibold text-lg md:text-xl">Discovering Nature's Treasures</p>
          <p className="text-[#8e846b] mt-2 text-sm md:text-base">Loading our curated collection of authentic Moroccan herbs...</p>
        </div>
      </div>
    </div>
  );
}

// Client component that uses useSearchParams
function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  
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
        // Delay page loaded animation for a better effect
        setTimeout(() => setPageLoaded(true), 100);
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
    // Close mobile filters if open
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
    return category ? category.name : 'All Products';
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSearch('');
    window.history.pushState({}, '', '/products');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[url('/herbal-pattern.svg')] bg-repeat">
        <div className="text-center bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-[#d3c8ab]/40 relative overflow-hidden transform transition-all duration-500 max-w-sm mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f8f5ec]/80 to-white opacity-50"></div>
          <div className="relative z-10">
            <div className="inline-block">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 md:h-24 w-16 md:w-24 border-t-4 border-b-4 border-[#6b7f3e]"></div>
                <GiMortar className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#6b7f3e] h-8 md:h-12 w-8 md:w-12" />
              </div>
            </div>
            <p className="mt-6 md:mt-8 text-[#4a5a2b] font-semibold text-lg md:text-xl">Discovering Nature's Treasures</p>
            <p className="text-[#8e846b] mt-2 text-sm md:text-base">Loading our curated collection of authentic Moroccan herbs...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-[url('/herbal-pattern.svg')] bg-repeat py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-md p-8 border border-[#d3c8ab]/30">
            <div className="bg-[#f8d7cf] p-6 rounded-lg border-l-4 border-[#b54e32] mb-4">
              <p className="text-[#b54e32] font-medium">{error}</p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#6b7f3e] text-white rounded-lg hover:bg-[#4a5a2b] transition-colors shadow-sm hover:shadow"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/herbal-pattern.svg')] bg-repeat">
      {/* Modern Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#f8f5ec] via-white to-[#f8f5ec] border-b border-[#d3c8ab]/40">
        <div className="absolute inset-0 bg-[url('/herb-banner.svg')] bg-no-repeat bg-cover mix-blend-multiply opacity-70"></div>
        <div className="container mx-auto px-4 py-10 md:py-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className={`text-3xl md:text-5xl font-bold text-[#4a5a2b] mb-4 tracking-tight transform transition-all duration-700 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              {selectedCategory ? getCategoryName(selectedCategory) : 'Natural Moroccan Herbs'}
            </h1>
            <p className={`text-[#8e846b] mb-6 max-w-2xl mx-auto transform transition-all duration-700 delay-100 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              Herbes marocaines classées selon leur origine locale, portant les marques ancestrales du patrimoine marocain
            </p>
            
            {/* Search Form */}
            <form 
              onSubmit={handleSearchSubmit} 
              className={`max-w-lg mx-auto relative transition-all duration-700 delay-200 transform ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search by name or ingredients..."
                  className="w-full bg-white rounded-full py-3 md:py-4 pl-5 md:pl-6 pr-14 text-[#4a5a2b] focus:outline-none border border-[#d3c8ab]/50 shadow-sm focus:ring-2 focus:ring-[#6b7f3e]/30 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-[#6b7f3e] text-white p-2.5 md:p-3 rounded-full hover:bg-[#4a5a2b] transition-colors shadow-sm"
                  aria-label="Search products"
                >
                  <FaSearch className="h-4 w-4" />
                </button>
              </div>
              
              {search && (
              <button
                  type="button" 
                  onClick={() => setSearch('')}
                  className="absolute right-14 top-1/2 transform -translate-y-1/2 text-[#8e846b] hover:text-[#4a5a2b] transition-colors"
                  aria-label="Clear search"
                >
                  <FaTimes className="h-4 w-4" />
              </button>
              )}
            </form>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 hidden lg:block opacity-10">
          <GiSeedling className="h-32 w-32 text-[#6b7f3e]" />
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden lg:block opacity-10">
          <GiHerbsBundle className="h-32 w-32 text-[#6b7f3e]" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-6">
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full flex items-center justify-between bg-white py-4 px-5 rounded-xl shadow-sm border border-[#d3c8ab]/40 hover:border-[#6b7f3e]/60 transition-all"
          >
            <div className="flex items-center">
              <FiSliders className="mr-3 text-[#6b7f3e]" />
              <span className="font-medium text-[#4a5a2b]">Filter Products</span>
            </div>
            {selectedCategory && (
              <span className="bg-[#f0ece2] text-[#8e846b] px-3 py-1.5 rounded-full text-xs font-medium">
                {getCategoryName(selectedCategory)}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Sidebar Filters */}
          <div className={`${showMobileFilters ? 'fixed inset-0 z-50 bg-black/30 backdrop-blur-sm' : 'hidden'} md:relative md:block md:col-span-1 transition-all duration-300 ${pageLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <div className={`${showMobileFilters ? 'absolute left-0 top-0 h-full w-[85%] max-w-[320px] overflow-auto pb-20' : ''} md:sticky md:top-4 md:w-auto md:h-auto md:overflow-visible md:pb-0`}>
              {showMobileFilters && (
                <div className="flex items-center justify-between p-4 bg-[#f8f5ec] md:hidden">
                  <h2 className="font-bold text-[#4a5a2b] text-lg">Filters</h2>
                  <button 
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 rounded-full bg-white text-[#4a5a2b]"
                  >
                    <FaTimes className="h-4 w-4" />
                  </button>
                </div>
              )}
            
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#d3c8ab]/40 sticky top-4">
                <div className="p-5 border-b border-[#d3c8ab]/40 bg-gradient-to-r from-[#f8f5ec] to-white flex justify-between items-center">
                  <div className="flex items-center">
                    <FaLeaf className="h-4 w-4 text-[#6b7f3e] mr-2" />
                    <h2 className="font-semibold text-[#4a5a2b]">Categories</h2>
                  </div>
                  {(selectedCategory || search) && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-[#b54e32] hover:text-[#923f28] font-medium flex items-center group"
                    >
                      <FaTimes className="h-3 w-3 mr-1 group-hover:rotate-90 transition-transform" />
                      Clear
                    </button>
                  )}
                </div>
                
                <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
                  <div className={`flex items-center p-3 rounded-lg hover:bg-[#f8f5ec] transition-colors cursor-pointer ${selectedCategory === '' ? 'bg-[#f8f5ec]' : ''}`} 
                    onClick={() => handleCategoryChange('')}>
                    <input
                      id="category-all"
                      type="radio"
                      name="category"
                      checked={selectedCategory === ''}
                      onChange={() => handleCategoryChange('')}
                      className="h-4 w-4 text-[#6b7f3e] border-[#d3c8ab] focus:ring-[#6b7f3e]"
                    />
                    <label htmlFor="category-all" className="ml-3 text-[#4a5a2b] font-medium cursor-pointer flex-1">
                      All Products
                    </label>
                    <span className="bg-[#f0ece2] text-[#8e846b] px-3 py-1 rounded-full text-xs">
                      {products.length}
                    </span>
                  </div>

                  {categories.map(category => {
                    const count = products.filter(p => p.category === category.id).length;
                    if (count === 0) return null;
                    
                    return (
                      <div 
                        key={category.id} 
                        className={`flex items-center p-3 rounded-lg hover:bg-[#f8f5ec] transition-all cursor-pointer ${
                          selectedCategory === category.id ? 'bg-[#f8f5ec] shadow-sm' : ''
                        }`}
                        onClick={() => handleCategoryChange(category.id)}
                      >
                        <input
                          id={`category-${category.id}`}
                          type="radio"
                          name="category"
                          checked={selectedCategory === category.id}
                          onChange={() => handleCategoryChange(category.id)}
                          className="h-4 w-4 text-[#6b7f3e] border-[#d3c8ab] focus:ring-[#6b7f3e]"
                        />
                        <label htmlFor={`category-${category.id}`} className="ml-3 text-[#4a5a2b] font-medium cursor-pointer flex-1">
                          {category.name}
                        </label>
                        <span className="bg-[#f0ece2] text-[#8e846b] px-3 py-1 rounded-full text-xs">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Promotional Card - Moroccan Tradition */}
              <div className="mt-6 bg-gradient-to-br from-[#4a5a2b] to-[#5d6e33] text-white rounded-xl shadow-sm overflow-hidden p-5 md:block transform transition-opacity duration-500 delay-300">
                <div className="relative">
                  <div className="absolute -top-6 -right-6">
                    <div className="bg-white/10 rounded-full h-20 w-20 flex items-center justify-center">
                      <GiMortar className="h-8 w-8 opacity-60" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-3">Moroccan Tradition</h3>
                    <p className="text-sm opacity-90 mb-4 leading-relaxed">
                      Découvrez des produits récoltés et traités selon des techniques ancestrales transmises de génération en génération.
                    </p>
                    <a href="/about" className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors group">
                      Our Story <FaChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Close area for mobile */}
            {showMobileFilters && (
              <div 
                className="absolute inset-0 -z-10 md:hidden" 
                onClick={() => setShowMobileFilters(false)}
              ></div>
            )}
          </div>
          
          {/* Product Grid */}
          <div className="md:col-span-3 lg:col-span-4">
            {/* Results indicator */}
            <div className="mb-6 bg-white px-5 py-4 rounded-xl shadow-sm border border-[#d3c8ab]/40 flex items-center justify-between flex-wrap gap-2 transition-all duration-500 delay-100">
              <div>
                <span className="text-[#6b7f3e] font-bold">{filteredProducts.length}</span> 
                <span className="text-[#4a5a2b] font-medium ml-1">
                  {filteredProducts.length === 1 ? 'product' : 'products'} found
                </span>
                {(selectedCategory || search) && (
                  <span className="ml-2 text-sm text-[#8e846b] hidden sm:inline">
                    {selectedCategory && <span>in {getCategoryName(selectedCategory)}</span>}
                    {search && <span>{selectedCategory ? ' matching ' : 'matching '} "{search}"</span>}
                  </span>
                )}
              </div>
              
              {(selectedCategory || search) && (
                <button
                  onClick={clearFilters}
                  className="text-[#b54e32] hover:text-[#923f28] text-sm font-medium flex items-center group bg-white px-3 py-1.5 rounded-lg border border-[#d3c8ab]/40"
                >
                  <FaTimes className="h-3 w-3 mr-2 group-hover:rotate-90 transition-transform" />
                  Clear Filters
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-[#d3c8ab]/40 transition-all duration-500 delay-200">
                <div className="bg-[#f8f5ec] p-4 rounded-full inline-flex items-center justify-center mb-4">
                  <GiHerbsBundle className="h-12 w-12 text-[#6b7f3e]" />
                </div>
                <h3 className="text-xl font-bold text-[#4a5a2b] mb-2">لم يتم العثور على منتجات</h3>
                <p className="text-[#8e846b] text-base mb-6 max-w-md mx-auto">
                  لم نتمكن من العثور على منتجات تطابق معاييرك. جرب تعديل مرشحاتك أو مصفوفات البحث.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-[#6b7f3e] text-white py-3 px-6 rounded-lg hover:bg-[#4a5a2b] transition-colors text-sm font-medium shadow-sm hover:shadow"
                >
                  Show All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="transform transition-all duration-500"
                    style={{
                      transitionDelay: `${Math.min(index * 50, 600)}ms`,
                      transform: pageLoaded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                      opacity: pageLoaded ? 1 : 0
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Floating WhatsApp Button */}
      <FloatingWhatsAppButton />
    </div>
  );
}

// Main component
export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsContent />
    </Suspense>
  );
} 