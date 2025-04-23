'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Product, Category } from '@/app/lib/database-schema';
import { getCategories } from '@/app/lib/category';
import { createProduct, updateProduct } from '@/app/lib/product';
import { uploadProductImage } from '@/app/lib/storage';
import Image from 'next/image';
import { GiHerbsBundle, GiMortar } from 'react-icons/gi';
import { FaLeaf, FaImage, FaUpload } from 'react-icons/fa';

interface ProductFormProps {
  initialData?: Partial<Product>;
  isEditing?: boolean;
}

export default function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image_url || null);
  const [isDragging, setIsDragging] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Product>>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    category: initialData?.category || '',
    stock_quantity: initialData?.stock_quantity || 0,
    image_url: initialData?.image_url || null,
  });

  // Fetch categories on component mount
  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        
        // Set default category if none selected and categories exist
        if (!formData.category && categoriesData.length > 0) {
          setFormData(prev => ({ ...prev, category: categoriesData[0].id }));
        }
      } catch (err) {
        console.error('Error loading categories:', err);
        setError('Failed to load categories');
      }
    }
    
    loadCategories();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric inputs (not used for visible fields anymore but keeping the logic)
    if (name === 'price' || name === 'stock_quantity') {
      const numValue = parseFloat(value);
      setFormData(prev => ({ ...prev, [name]: isNaN(numValue) ? 0 : numValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImageFile(file);
      
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Upload image if a new one is selected
      let imageUrl = formData.image_url;
      if (imageFile) {
        imageUrl = await uploadProductImage(imageFile);
      }
      
      const productData = {
        ...formData,
        image_url: imageUrl,
      };
      
      if (isEditing && initialData?.id) {
        // Update existing product
        await updateProduct(initialData.id, productData);
      } else {
        // Create new product
        await createProduct(productData as Omit<Product, 'id' | 'created_at'>);
      }
      
      // Redirect back to products list
      router.push('/admin/dashboard/products');
      router.refresh();
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="moroccan-pattern-light">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 border border-[#d3c8ab]">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-[#f8f5ec] p-3 rounded-full mr-3">
            {isEditing ? (
              <GiMortar className="text-[#c17f24] h-8 w-8" />
            ) : (
              <GiHerbsBundle className="text-[#6b7f3e] h-8 w-8" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-[#4a5a2b]">
            {isEditing ? 'Update Product' : 'Create New Product'}
          </h2>
        </div>
        
        {error && (
          <div className="mb-6 bg-[#f8d7cf] p-4 rounded-md border-l-4 border-[#b54e32]">
            <p className="text-[#b54e32] font-medium">{error}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-[#4a5a2b] font-semibold mb-2 flex items-center">
                <FaLeaf className="text-[#6b7f3e] mr-2 h-4 w-4" />
                Product Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter product name"
                className="w-full py-3 px-4 border border-[#d3c8ab] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6b7f3e] focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-[#4a5a2b] font-semibold mb-2 flex items-center">
                <FaLeaf className="text-[#6b7f3e] mr-2 h-4 w-4" />
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                rows={5}
                placeholder="Describe your product (ingredients, benefits, etc.)"
                className="w-full py-3 px-4 border border-[#d3c8ab] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6b7f3e] focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-[#4a5a2b] font-semibold mb-2 flex items-center">
                <FaLeaf className="text-[#6b7f3e] mr-2 h-4 w-4" />
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category || ''}
                onChange={handleInputChange}
                required
                className="w-full py-3 px-4 border border-[#d3c8ab] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6b7f3e] focus:border-transparent transition-all"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Right Column - Image Upload */}
          <div>
            <label className="block text-[#4a5a2b] font-semibold mb-2 flex items-center">
              <FaImage className="text-[#6b7f3e] mr-2 h-4 w-4" />
              Product Image
            </label>
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center transition-all cursor-pointer h-72 ${
                isDragging 
                  ? 'border-[#6b7f3e] bg-[#6b7f3e10]' 
                  : imagePreview 
                    ? 'border-[#d3c8ab] bg-[#f8f5ec]' 
                    : 'border-[#d3c8ab] hover:border-[#6b7f3e] hover:bg-[#f8f5ec]'
              }`}
            >
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <img 
                    src={imagePreview}
                    alt="Product preview" 
                    className="object-contain w-full h-full rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setImageFile(null);
                      if (initialData?.image_url) {
                        setFormData(prev => ({ ...prev, image_url: null }));
                      }
                    }}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <FaUpload className="h-12 w-12 text-[#d3c8ab] mb-4" />
                  <p className="text-[#8e846b] mb-2 text-center">
                    Drag & drop your product image here or click to browse
                  </p>
                  <p className="text-xs text-[#8e846b] text-center mb-4">
                    Recommended: 800x800px or larger, JPG or PNG format
                  </p>
                  <label className="cursor-pointer bg-[#6b7f3e] hover:bg-[#4a5a2b] text-white py-2 px-4 rounded-md transition-colors">
                    Select Image
                    <input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </>
              )}
            </div>
            
            {imagePreview && (
              <div className="mt-4 flex justify-center">
                <label className="cursor-pointer bg-[#6b7f3e] hover:bg-[#4a5a2b] text-white py-2 px-4 rounded-md transition-colors inline-flex items-center">
                  <FaUpload className="mr-2 h-4 w-4" />
                  Change Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-[#f8f5ec] rounded-md border border-[#d3c8ab]">
              <h3 className="font-medium text-[#4a5a2b] mb-2 flex items-center">
                <GiHerbsBundle className="text-[#6b7f3e] mr-2 h-4 w-4" />
                Tips for Great Product Photos
              </h3>
              <ul className="text-sm text-[#8e846b] space-y-1">
                <li className="flex items-start">
                  <span className="text-[#c17f24] mr-2">•</span>
                  Use natural lighting to highlight the product's authentic colors
                </li>
                <li className="flex items-start">
                  <span className="text-[#c17f24] mr-2">•</span>
                  Include the product packaging in your photo when applicable
                </li>
                <li className="flex items-start">
                  <span className="text-[#c17f24] mr-2">•</span>
                  Show size/scale when relevant to help customers understand the product
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-[#d3c8ab] flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-white border border-[#d3c8ab] text-[#4a5a2b] font-medium py-3 px-6 rounded-md hover:bg-[#f8f5ec] transition-colors"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="bg-[#6b7f3e] hover:bg-[#4a5a2b] text-white font-medium py-3 px-8 rounded-md transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none disabled:shadow-none flex items-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                {isEditing ? 'Update Product' : 'Create Product'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 