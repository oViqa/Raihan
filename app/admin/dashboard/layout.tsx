'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAdminLoggedIn, getAdminData, logoutAdmin } from '@/app/lib/auth-utils';
import Link from 'next/link';
import { GiHerbsBundle, GiMortar, GiPlantRoots } from 'react-icons/gi';
import { FaLeaf, FaStore, FaSignOutAlt, FaList, FaBoxOpen, FaTags } from 'react-icons/fa';
import RaihanLogo from '@/app/components/admin/RaihanLogo';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const path = typeof window !== 'undefined' ? window.location.pathname : '';

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f5ec]">
        <div className="flex flex-col items-center">
          <div className="animate-pulse mb-4">
            <RaihanLogo variant="circle" size="lg" />
          </div>
          <p className="text-[#4a5a2b] font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5ec] flex flex-col">
      {/* Admin Dashboard Header */}
      <nav className="bg-[#4a5a2b] border-b border-[#d3c8ab] relative shadow-md">
        <div className="absolute inset-0 opacity-5 bg-[url('/images/moroccan-pattern.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="mr-3 md:hidden text-white p-1 rounded-md hover:bg-[#6b7f3e] transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link href="/admin/dashboard" className="flex items-center">
                <RaihanLogo 
                  size="sm" 
                  className="text-white" 
                />
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center bg-[#3a4821] rounded-full py-1 px-3 mr-4">
                <FaLeaf className="text-[#d3c8ab] h-4 w-4 mr-2" />
                <span className="text-[#f0ece2] text-sm">{adminEmail}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-[#b54e32] hover:bg-[#923f28] text-white px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={`bg-white border-r border-[#d3c8ab] transition-all duration-300 shadow-lg ${
            isSidebarOpen ? 'w-64' : 'w-0 md:w-20'
          } overflow-hidden`}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-[#d3c8ab] flex justify-center">
              <RaihanLogo variant="circle" size="lg" />
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-2 px-3">
                <li>
                  <Link 
                    href="/admin/dashboard" 
                    className={`flex items-center px-3 py-3 rounded-md transition-colors ${
                      path === '/admin/dashboard' 
                        ? 'bg-[#6b7f3e] text-white' 
                        : 'text-[#4a5a2b] hover:bg-[#f0ece2]'
                    }`}
                  >
                    <FaStore className={`${isSidebarOpen ? 'mr-3' : 'mx-auto'} h-5 w-5`} />
                    {isSidebarOpen && <span>Dashboard</span>}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/admin/dashboard/products" 
                    className={`flex items-center px-3 py-3 rounded-md transition-colors ${
                      path.includes('/admin/dashboard/products') 
                        ? 'bg-[#6b7f3e] text-white' 
                        : 'text-[#4a5a2b] hover:bg-[#f0ece2]'
                    }`}
                  >
                    <FaBoxOpen className={`${isSidebarOpen ? 'mr-3' : 'mx-auto'} h-5 w-5`} />
                    {isSidebarOpen && <span>Products</span>}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/admin/dashboard/categories" 
                    className={`flex items-center px-3 py-3 rounded-md transition-colors ${
                      path.includes('/admin/dashboard/categories') 
                        ? 'bg-[#6b7f3e] text-white' 
                        : 'text-[#4a5a2b] hover:bg-[#f0ece2]'
                    }`}
                  >
                    <FaTags className={`${isSidebarOpen ? 'mr-3' : 'mx-auto'} h-5 w-5`} />
                    {isSidebarOpen && <span>Categories</span>}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="p-4 border-t border-[#d3c8ab]">
              <Link 
                href="/"
                className="flex items-center text-[#4a5a2b] hover:text-[#6b7f3e] transition-colors"
              >
                <FaLeaf className={`${isSidebarOpen ? 'mr-3' : 'mx-auto'} h-5 w-5`} />
                {isSidebarOpen && <span>View Store</span>}
              </Link>
            </div>
            
            {/* Pattern decoration at the bottom */}
            <div className="relative h-24 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-[url('/images/moroccan-pattern.png')] bg-repeat-x"></div>
              </div>
              {isSidebarOpen && (
                <div className="absolute bottom-5 left-0 right-0 text-center text-[#8e846b] text-xs">
                  Raihan Admin Portal
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#f8f5ec] relative">
          <div className="moroccan-pattern-light min-h-full">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 