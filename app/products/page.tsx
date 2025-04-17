'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProducts } from '@/app/lib/product';
import { getCategories } from '@/app/lib/category';
import { Product, Category } from '@/app/lib/database-schema';
import ProductCard from '@/app/components/ProductCard';
import FloatingWhatsAppButton from '@/app/components/FloatingWhatsAppButton';
import { FaLeaf, FaSearch } from 'react-icons/fa';
import { GiHerbsBundle, GiMortar } from 'react-icons/gi';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  
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
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6b7f3e]"></div>
        </div>
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
    <div className="container mx-auto px-4 py-12 moroccan-pattern">
      {/* Page Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-2">
          <GiHerbsBundle className="h-8 w-8 text-[#6b7f3e] mr-2" />
          <h1 className="text-3xl font-bold text-[#4a5a2b]">
            {selectedCategory ? getCategoryName(selectedCategory) : 'Authentic Moroccan Products'}
          </h1>
        </div>
        <p className="text-[#8e846b] mb-4">
          Hand-harvested by local farmers using traditional methods passed down through generations
        </p>
        <div className="h-1 w-40 bg-[#d3c8ab] mx-auto rounded-full"></div>
      </div>
      
      {/* Filters and Search */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <div className="moroccan-card p-6">
            <div className="flex items-center mb-4">
              <FaLeaf className="h-5 w-5 text-[#6b7f3e] mr-2" />
              <h2 className="text-lg font-semibold text-[#4a5a2b]">Shop by Category</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  id="category-all"
                  type="radio"
                  name="category"
                  checked={selectedCategory === ''}
                  onChange={() => handleCategoryChange('')}
                  className="h-4 w-4 text-[#6b7f3e] focus:ring-[#6b7f3e]"
                />
                <label htmlFor="category-all" className="ml-3 text-sm text-[#4a5a2b] font-medium">
                  All Products
                </label>
              </div>
              
              {categories.map(category => (
                <div key={category.id} className="flex items-center">
                  <input
                    id={`category-${category.id}`}
                    type="radio"
                    name="category"
                    checked={selectedCategory === category.id}
                    onChange={() => handleCategoryChange(category.id)}
                    className="h-4 w-4 text-[#6b7f3e] focus:ring-[#6b7f3e]"
                  />
                  <label htmlFor={`category-${category.id}`} className="ml-3 text-sm text-[#4a5a2b] font-medium">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Search Box */}
          <div className="moroccan-card p-6 mt-4">
            <div className="flex items-center mb-4">
              <FaSearch className="h-4 w-4 text-[#6b7f3e] mr-2" />
              <h2 className="text-lg font-semibold text-[#4a5a2b]">Find Products</h2>
            </div>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search by name or ingredients..."
                  className="w-full border border-[#d3c8ab] rounded-md py-2 px-3 text-[#4a5a2b] leading-tight focus:outline-none focus:ring-2 focus:ring-[#6b7f3e] focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#8e846b] hover:text-[#6b7f3e]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Product Grid */}
        <div className="lg:col-span-3">
          {/* Results indicator */}
          <div className="mb-5 bg-[#f0ece2] px-4 py-3 rounded-md flex items-center justify-between">
            <p className="text-[#4a5a2b] font-medium">
              <span className="text-[#c17f24] font-bold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
            
            {(selectedCategory || search) && (
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSearch('');
                  window.history.pushState({}, '', '/products');
                }}
                className="text-sm text-[#6b7f3e] hover:text-[#4a5a2b] font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="moroccan-card p-10 text-center">
              <GiHerbsBundle className="h-16 w-16 text-[#d3c8ab] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#4a5a2b] mb-2">No products found</h3>
              <p className="text-[#8e846b] mb-4">Try adjusting your search or filter to find what you're looking for.</p>
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSearch('');
                  window.history.pushState({}, '', '/products');
                }}
                className="px-4 py-2 bg-[#6b7f3e] text-white rounded-md hover:bg-[#4a5a2b] transition-colors"
              >
                View all products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <FloatingWhatsAppButton />
    </div>
  );
} 