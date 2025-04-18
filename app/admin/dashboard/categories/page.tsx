'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCategories, deleteCategory } from '@/app/lib/category';
import { Category } from '@/app/lib/database-schema';

type SortField = 'name';
type SortOrder = 'asc' | 'desc';

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  // Search and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField] = useState<SortField>('name'); // Fixed: removed unused setSortField
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        setFilteredCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Apply search and sorting
  useEffect(() => {
    let result = [...categories];
    
    // Apply search
    if (searchQuery.trim()) {
      result = result.filter(category => 
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (category.description && category.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortField === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      }
      return 0;
    });
    
    setFilteredCategories(result);
  }, [categories, searchQuery, sortField, sortOrder]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    setDeleteId(id);
    
    try {
      await deleteCategory(id);
      setCategories(categories.filter(category => category.id !== id));
    } catch (err) {
      console.error('Error deleting category:', err);
      setError('Failed to delete category. It might be in use by products.');
    } finally {
      setDeleteId(null);
    }
  };

  const handleSort = () => {
    // For categories, we only sort by name
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const getSortIcon = () => {
    return sortOrder === 'asc' 
      ? <span className="ml-1">↑</span> 
      : <span className="ml-1">↓</span>;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-xl font-semibold">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-red-700 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories Management</h1>
        <Link 
          href="/admin/dashboard/categories/new"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Category
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex">
          <div className="flex-grow">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Categories
            </label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or description"
              className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="ml-4 flex items-end">
            <button
              onClick={() => {
                setSearchQuery('');
                setSortOrder('asc');
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <div className="bg-yellow-50 p-4 rounded-md">
          <p className="text-yellow-700">
            {categories.length === 0 
              ? 'No categories found. Create your first category to get started.' 
              : 'No categories match your search. Try a different search term.'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    onClick={handleSort}
                    className="flex items-center font-medium focus:outline-none"
                  >
                    Name {getSortIcon()}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {category.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {category.description || <span className="text-gray-400 italic">No description</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      href={`/admin/dashboard/categories/edit/${category.id}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(category.id)}
                      disabled={deleteId === category.id}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      {deleteId === category.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}