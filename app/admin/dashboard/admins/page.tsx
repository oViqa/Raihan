'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash, FaPlus, FaSpinner } from 'react-icons/fa';
import { adminDB } from '@/app/lib/database-schema';
import { isAdminLoggedIn } from '@/app/lib/auth-utils';

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Array<{id: string, email: string, password: string}>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if admin is logged in
    if (!isAdminLoggedIn()) {
      router.push('/admin/login');
      return;
    }
    
    fetchAdmins();
  }, [router]);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const adminsData = await adminDB.getAll();
      setAdmins(adminsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching admins:', err);
      setError('Failed to load admin accounts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    if (!confirm('Are you sure you want to delete this admin account?')) {
      return;
    }
    
    try {
      await adminDB.delete(id);
      // Refresh the list
      await fetchAdmins();
    } catch (err) {
      console.error('Error deleting admin:', err);
      setError('Failed to delete admin account. Please try again.');
    }
  };

  const handleAddAdmin = () => {
    router.push('/admin/dashboard/admins/add');
  };

  const handleEditAdmin = (id: string) => {
    router.push(`/admin/dashboard/admins/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin h-8 w-8 text-[#6b7f3e]" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#4a5a2b]">Admin Accounts</h1>
        <button
          onClick={handleAddAdmin}
          className="bg-[#6b7f3e] hover:bg-[#4a5a2b] text-white px-4 py-2 rounded-md flex items-center transition-colors"
        >
          <FaPlus className="mr-2" />
          Add New Admin
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Password
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admins.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No admin accounts found.
                </td>
              </tr>
            ) : (
              admins.map((admin) => (
                <tr key={admin.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {admin.password}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditAdmin(admin.id)}
                      className="text-[#6b7f3e] hover:text-[#4a5a2b] mr-4"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteAdmin(admin.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 