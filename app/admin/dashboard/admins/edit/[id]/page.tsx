'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FaEnvelope, FaLock, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import { adminDB } from '@/app/lib/database-schema';
import { isAdminLoggedIn, getAdminData } from '@/app/lib/auth-utils';

export default function EditAdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOwnAccount, setIsOwnAccount] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    // Check if admin is logged in
    if (!isAdminLoggedIn()) {
      router.push('/admin/login');
      return;
    }
    
    fetchAdmin();
  }, [router, id]);

  const fetchAdmin = async () => {
    setIsLoading(true);
    try {
      const admin = await adminDB.getById(id);
      if (!admin) {
        setError('Admin not found');
        return;
      }
      
      setEmail(admin.email);
      setPassword(admin.password);
      setConfirmPassword(admin.password);
      
      // Check if this is the current logged-in admin's account
      const currentAdmin = getAdminData();
      if (currentAdmin && currentAdmin.email === admin.email) {
        setIsOwnAccount(true);
      }
      
    } catch (err) {
      console.error('Error fetching admin:', err);
      setError('Failed to load admin data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSaving(true);

    try {
      // Update admin details
      await adminDB.update(id, {
        email,
        password
      });

      // If this is the admin's own account, update the localStorage
      if (isOwnAccount) {
        localStorage.setItem('adminEmail', email);
      }

      // Return to admin list
      router.push('/admin/dashboard/admins');
    } catch (err) {
      console.error('Error updating admin:', err);
      setError('Failed to update admin account. The email might already be in use.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin h-8 w-8 text-[#6b7f3e]" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => router.push('/admin/dashboard/admins')}
          className="text-[#4a5a2b] hover:text-[#6b7f3e] flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          Back to Admin List
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-[#4a5a2b] mb-6">
          {isOwnAccount ? 'Edit Your Account' : 'Edit Admin Account'}
        </h1>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {isOwnAccount && (
          <div className="bg-blue-50 text-blue-700 p-4 rounded-md mb-6">
            You are editing your own account. Any changes will affect your current login session.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6b7f3e] focus:border-transparent"
                placeholder="Email address"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6b7f3e] focus:border-transparent"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6b7f3e] focus:border-transparent"
                placeholder="Confirm password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-2 px-4 bg-[#4a5a2b] hover:bg-[#6b7f3e] text-white rounded-md transition-colors flex items-center justify-center"
          >
            {isSaving ? (
              <>
                <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 