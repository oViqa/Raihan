'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAdminLoggedIn, getAdminData, logoutAdmin } from '@/app/lib/auth-utils';
import Link from 'next/link';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if admin is logged in
    if (!isAdminLoggedIn()) {
      router.push('/admin/login');
      return;
    }

    const adminData = getAdminData();
    if (adminData) {
      setAdminEmail(adminData.email);
    }
    
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    logoutAdmin();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Dashboard Header */}
      <nav className="bg-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-white font-bold text-xl">Admin Dashboard</span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="/admin/dashboard"
                    className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Overview
                  </Link>
                  <Link
                    href="/admin/dashboard/products"
                    className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Products
                  </Link>
                  <Link
                    href="/admin/dashboard/categories"
                    className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Categories
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-200 mr-4">{adminEmail}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
} 