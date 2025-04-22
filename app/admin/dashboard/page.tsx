'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProducts } from '@/app/lib/product';
import { getCategories } from '@/app/lib/category';
import { getAdmins } from '@/app/lib/admin';
import { GiHerbsBundle, GiPlantRoots, GiMortar } from 'react-icons/gi';
import { FaLeaf, FaBoxOpen, FaTags, FaUserShield, FaPlus, FaStore, FaShippingFast } from 'react-icons/fa';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    productCount: 0,
    categoryCount: 0,
    adminCount: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [products, categories, admins] = await Promise.all([
          getProducts(),
          getCategories(),
          getAdmins(),
        ]);

        setStats({
          productCount: products.length,
          categoryCount: categories.length,
          adminCount: admins.length,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center">
          <GiHerbsBundle className="text-[#6b7f3e] h-12 w-12 animate-pulse mb-4" />
          <p className="text-[#4a5a2b] font-semibold">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-8">
        <GiPlantRoots className="h-8 w-8 text-[#6b7f3e] mr-3" />
        <h1 className="text-3xl font-bold text-[#4a5a2b] moroccan-heading">Dashboard Overview</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Products Card */}
        <div className="moroccan-card transition-all hover:shadow-lg transform hover:-translate-y-1">
          <div className="px-6 py-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-[#6b7f3e] rounded-full p-3">
                <FaBoxOpen className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-[#8e846b] truncate">Total Products</dt>
                  <dd>
                    <div className="text-2xl font-bold text-[#4a5a2b]">{stats.productCount}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-[#f8f5ec] px-6 py-4 border-t border-[#d3c8ab]">
            <div className="text-sm">
              <Link href="/admin/dashboard/products" className="font-medium text-[#6b7f3e] hover:text-[#4a5a2b] flex items-center">
                <span>View all products</span>
                <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Categories Card */}
        <div className="moroccan-card transition-all hover:shadow-lg transform hover:-translate-y-1">
          <div className="px-6 py-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-[#c17f24] rounded-full p-3">
                <FaTags className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-[#8e846b] truncate">Total Categories</dt>
                  <dd>
                    <div className="text-2xl font-bold text-[#4a5a2b]">{stats.categoryCount}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-[#f8f5ec] px-6 py-4 border-t border-[#d3c8ab]">
            <div className="text-sm">
              <Link href="/admin/dashboard/categories" className="font-medium text-[#6b7f3e] hover:text-[#4a5a2b] flex items-center">
                <span>View all categories</span>
                <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Admins Card */}
        <div className="moroccan-card transition-all hover:shadow-lg transform hover:-translate-y-1">
          <div className="px-6 py-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-[#b54e32] rounded-full p-3">
                <FaUserShield className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-[#8e846b] truncate">Admin Accounts</dt>
                  <dd>
                    <div className="text-2xl font-bold text-[#4a5a2b]">{stats.adminCount}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-[#f8f5ec] px-6 py-4 border-t border-[#d3c8ab]">
            <div className="text-sm">
              <span className="font-medium text-[#8e846b] flex items-center">
                Manage admin accounts
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="moroccan-card mb-8">
        <div className="px-6 py-5">
          <div className="flex items-center mb-2">
            <GiMortar className="h-5 w-5 text-[#c17f24] mr-2" />
            <h3 className="text-lg font-bold text-[#4a5a2b]">
              Quick Actions
            </h3>
          </div>
          <p className="text-sm text-[#8e846b]">
            Common tasks you might want to perform
          </p>
        </div>
        <div className="border-t border-[#d3c8ab] bg-[#f8f5ec]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            <Link 
              href="/admin/dashboard/products/new" 
              className="flex items-center justify-center px-4 py-3 border border-[#d3c8ab] rounded-md shadow-sm text-sm font-medium text-white bg-[#6b7f3e] hover:bg-[#4a5a2b] transition-colors"
            >
              <FaPlus className="mr-2 h-4 w-4" />
              Add New Product
            </Link>
            <Link 
              href="/admin/dashboard/categories/new" 
              className="flex items-center justify-center px-4 py-3 border border-[#d3c8ab] rounded-md shadow-sm text-sm font-medium text-white bg-[#c17f24] hover:bg-[#95611c] transition-colors"
            >
              <FaPlus className="mr-2 h-4 w-4" />
              Add New Category
            </Link>
            <Link 
              href="/" 
              className="flex items-center justify-center px-4 py-3 border border-[#d3c8ab] rounded-md shadow-sm text-sm font-medium text-[#4a5a2b] bg-white hover:bg-[#f0ece2] transition-colors"
            >
              <FaStore className="mr-2 h-4 w-4" />
              View Website
            </Link>
          </div>
        </div>
      </div>
      
      {/* Recent Activity Section (Placeholder) */}
      <div className="moroccan-card">
        <div className="px-6 py-5">
          <div className="flex items-center mb-2">
            <FaLeaf className="h-5 w-5 text-[#6b7f3e] mr-2" />
            <h3 className="text-lg font-bold text-[#4a5a2b]">
              Store Overview
            </h3>
          </div>
          <p className="text-sm text-[#8e846b]">
            At a glance information about your Moroccan herbs store
          </p>
        </div>
        <div className="border-t border-[#d3c8ab]">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div>
                <h4 className="text-md font-semibold text-[#4a5a2b] mb-4 flex items-center">
                  <FaShippingFast className="h-4 w-4 mr-2 text-[#6b7f3e]" />
                  Inventory Management
                </h4>
                <div className="space-y-4">
                  <div className="bg-[#f8f5ec] p-4 rounded-md border border-[#d3c8ab]">
                    <h5 className="font-medium text-[#4a5a2b] mb-2">Low Stock Items</h5>
                    <p className="text-sm text-[#8e846b]">
                      Check your inventory for products that are running low on stock. 
                    </p>
                    <Link 
                      href="/admin/dashboard/products" 
                      className="mt-2 inline-flex text-[#6b7f3e] hover:text-[#4a5a2b] text-sm font-medium"
                    >
                      Manage inventory →
                    </Link>
                  </div>
                  
                  <div className="bg-[#f8f5ec] p-4 rounded-md border border-[#d3c8ab]">
                    <h5 className="font-medium text-[#4a5a2b] mb-2">Product Images</h5>
                    <p className="text-sm text-[#8e846b]">
                      Ensure all products have high-quality images to showcase your authentic herbs.
                    </p>
                    <Link 
                      href="/admin/dashboard/products" 
                      className="mt-2 inline-flex text-[#6b7f3e] hover:text-[#4a5a2b] text-sm font-medium"
                    >
                      Review products →
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Right column */}
              <div>
                <h4 className="text-md font-semibold text-[#4a5a2b] mb-4 flex items-center">
                  <GiHerbsBundle className="h-4 w-4 mr-2 text-[#c17f24]" />
                  Store Management
                </h4>
                <div className="space-y-4">
                  <div className="bg-[#f8f5ec] p-4 rounded-md border border-[#d3c8ab]">
                    <h5 className="font-medium text-[#4a5a2b] mb-2">Update Product Descriptions</h5>
                    <p className="text-sm text-[#8e846b]">
                      Enhance product descriptions with information about traditional uses and benefits.
                    </p>
                    <Link 
                      href="/admin/dashboard/products" 
                      className="mt-2 inline-flex text-[#6b7f3e] hover:text-[#4a5a2b] text-sm font-medium"
                    >
                      Edit products →
                    </Link>
                  </div>
                  
                  <div className="bg-[#f8f5ec] p-4 rounded-md border border-[#d3c8ab]">
                    <h5 className="font-medium text-[#4a5a2b] mb-2">Organize Categories</h5>
                    <p className="text-sm text-[#8e846b]">
                      Create and manage categories to better organize your Moroccan herb products.
                    </p>
                    <Link 
                      href="/admin/dashboard/categories" 
                      className="mt-2 inline-flex text-[#6b7f3e] hover:text-[#4a5a2b] text-sm font-medium"
                    >
                      Manage categories →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}