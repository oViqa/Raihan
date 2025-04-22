'use client';

// Type definition for admin authentication state
export type AdminAuth = {
  id: string;
  email: string;
  isLoggedIn: boolean;
};

// Helper functions for admin authentication

// Check if admin is logged in
export function isAdminLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('adminToken');
  const email = localStorage.getItem('adminEmail');
  
  return !!token && !!email;
}

// Get admin data from localStorage
export function getAdminData(): { email: string; token: string } | null {
  if (typeof window === 'undefined') return null;
  
  const token = localStorage.getItem('adminToken');
  const email = localStorage.getItem('adminEmail');
  
  if (!token || !email) return null;
  
  return { email, token };
}

// Logout admin
export function logoutAdmin(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminEmail');
} 