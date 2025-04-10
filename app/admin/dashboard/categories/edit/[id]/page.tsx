'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CategoryForm from '@/app/components/admin/CategoryForm';
import { getCategoryById } from '@/app/lib/category';
import { Category } from '@/app/lib/database-schema';

export default function EditCategoryPage() {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id as string;

  useEffect(() => {
    async function fetchCategory() {
      try {
        const categoryData = await getCategoryById(categoryId);
        
        if (!categoryData) {
          setError('Category not found');
          return;
        }
        
        setCategory(categoryData);
      } catch (err) {
        console.error('Error fetching category:', err);
        setError('Failed to load category');
      } finally {
        setLoading(false);
      }
    }

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-xl font-semibold">Loading category data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
        <button 
          onClick={() => router.back()}
          className="mt-2 text-indigo-600 hover:text-indigo-800"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Category</h1>
      {category && <CategoryForm initialData={category} isEditing={true} />}
    </div>
  );
} 