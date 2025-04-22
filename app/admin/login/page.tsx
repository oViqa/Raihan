'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/app/lib/admin';
import Link from 'next/link';
import RaihanLogo from '@/app/components/admin/RaihanLogo';
import { FaLeaf, FaLock, FaEnvelope } from 'react-icons/fa';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const admin = await adminLogin(email, password);
      
      if (admin) {
        // Store admin info in session storage (simple approach for this case)
        sessionStorage.setItem('adminAuth', JSON.stringify({ 
          id: admin.id,
          email: admin.email,
          isLoggedIn: true
        }));
        
        // Redirect to admin dashboard
        router.push('/admin/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f5ec] py-12 px-4 sm:px-6 lg:px-8 moroccan-pattern-light">
      <div className="max-w-md w-full">
        <div className="moroccan-card p-8 shadow-lg">
          <div className="flex justify-center mb-6">
            <RaihanLogo size="lg" />
          </div>
          
          <h2 className="text-center text-2xl font-bold text-[#4a5a2b] mb-6">
            Admin Portal
          </h2>
          
          {error && (
            <div className="mb-6 bg-[#f8d7cf] p-4 rounded-md border-l-4 border-[#b54e32]">
              <div className="text-sm text-[#b54e32] font-medium">{error}</div>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-[#4a5a2b] font-semibold mb-2 flex items-center">
                  <FaEnvelope className="text-[#6b7f3e] mr-2 h-4 w-4" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full py-3 px-4 border border-[#d3c8ab] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6b7f3e] focus:border-transparent transition-all"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-[#4a5a2b] font-semibold mb-2 flex items-center">
                  <FaLock className="text-[#6b7f3e] mr-2 h-4 w-4" />
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full py-3 px-4 border border-[#d3c8ab] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6b7f3e] focus:border-transparent transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#6b7f3e] hover:bg-[#4a5a2b] text-white font-medium py-3 px-4 rounded-md transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none disabled:shadow-none flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  'Sign in to Admin'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 pt-6 border-t border-[#d3c8ab] text-center">
            <Link 
              href="/" 
              className="text-[#6b7f3e] hover:text-[#4a5a2b] text-sm flex items-center justify-center"
            >
              <FaLeaf className="mr-2 h-3 w-3" />
              Return to Homepage
            </Link>
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs text-[#8e846b]">
          © {new Date().getFullYear()} Raihan - Authentic Moroccan Herbs
        </div>
      </div>
    </div>
  );
} 