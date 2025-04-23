'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts, deleteProduct } from '@/app/lib/product';
import { FaEdit, FaPlus, FaTrash, FaSearch } from 'react-icons/fa';
import { GiHerbsBundle } from 'react-icons/gi';
import { Product } from '@/app/lib/database-schema';

export default function ProductsManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const productsData = await getProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Filter products based on search term
  useEffect(() => {
    if (products.length === 0) {
      setFilteredProducts([]);
      return;
    }

    if (!search.trim()) {
      setFilteredProducts(products);
      return;
    }

    const searchLower = search.toLowerCase();
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchLower) || 
      (product.description && product.description.toLowerCase().includes(searchLower))
    );
    
    setFilteredProducts(filtered);
  }, [products, search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    
    try {
      setIsDeleting(true);
      await deleteProduct(deleteId);
      setProducts(prevProducts => prevProducts.filter(p => p.id !== deleteId));
      setShowConfirmModal(false);
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product');
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
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
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <GiHerbsBundle className="h-7 w-7 text-[#6b7f3e] mr-2" />
          <h1 className="text-2xl font-bold text-[#4a5a2b]">Manage Products</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-[#d3c8ab] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6b7f3e] focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8e846b]" />
          </div>
          
          <Link
            href="/admin/dashboard/products/new"
            className="flex items-center justify-center bg-[#6b7f3e] text-white px-4 py-2 rounded-md hover:bg-[#4a5a2b] transition-colors"
          >
            <FaPlus className="mr-2" />
            Add New Product
          </Link>
        </div>
      </div>
      
      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#d3c8ab]">
            <thead className="bg-[#f0ece2]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#4a5a2b] uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#4a5a2b] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#d3c8ab]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-6 py-10 text-center text-[#8e846b]">
                    {products.length === 0 ? (
                      <>
                        <GiHerbsBundle className="h-12 w-12 text-[#d3c8ab] mx-auto mb-3" />
                        <p className="text-lg mb-2">No products found</p>
                        <Link 
                          href="/admin/dashboard/products/new"
                          className="text-[#6b7f3e] hover:text-[#4a5a2b] font-medium"
                        >
                          Add your first product
                        </Link>
                      </>
                    ) : (
                      <p>No products match your search criteria</p>
                    )}
                  </td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-[#f8f5ec] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 mr-3 bg-[#f0ece2] rounded-md overflow-hidden">
                          {product.image_url ? (
                            <Image 
                              src={product.image_url} 
                              alt={product.name}
                              width={40}
                              height={40}
                              className="h-10 w-10 object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 flex items-center justify-center bg-[#f0ece2]">
                              <GiHerbsBundle className="h-6 w-6 text-[#8e846b]" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-[#4a5a2b]">{product.name}</div>
                          <div className="text-xs text-[#8e846b] max-w-xs truncate">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <Link
                          href={`/admin/dashboard/products/edit/${product.id}`}
                          className="text-[#6b7f3e] hover:text-[#4a5a2b]"
                        >
                          <FaEdit className="h-5 w-5" title="Edit Product" />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(product.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash className="h-5 w-5" title="Delete Product" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 border border-[#d3c8ab] transform transition-all duration-300 animate-scaleIn moroccan-pattern-light relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6b7f3e] via-[#c17f24] to-[#b54e32]"></div>
            
            <div className="flex items-center mb-6">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <FaTrash className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-[#4a5a2b]">Confirm Deletion</h3>
            </div>
            
            <p className="text-[#8e846b] mb-6">
              Are you sure you want to delete this product? This action <span className="font-bold text-[#b54e32]">cannot be undone</span>.
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-[#8e846b]">
                <GiHerbsBundle className="h-4 w-4 text-[#6b7f3e] mr-1" />
                <span>Deleted products cannot be recovered</span>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6 pt-4 border-t border-[#d3c8ab]">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-5 py-2.5 border border-[#d3c8ab] rounded-md text-[#4a5a2b] font-medium hover:bg-[#f8f5ec] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6b7f3e] focus:ring-opacity-50"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <FaTrash className="h-4 w-4 mr-2" />
                    Delete Product
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}