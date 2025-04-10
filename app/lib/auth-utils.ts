'use client';

// Type definition for admin authentication state
export type AdminAuth = {
  id: string;
  email: string;
  isLoggedIn: boolean;
};

// Check if admin is logged in on client side
export function isAdminLoggedIn(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    const auth = sessionStorage.getItem('adminAuth');
    if (!auth) return false;
    
    const adminAuth = JSON.parse(auth) as AdminAuth;
    return adminAuth.isLoggedIn === true;
  } catch (error) {
    console.error('Error checking admin auth status:', error);
    return false;
  }
}

// Get admin data from session storage
export function getAdminData(): AdminAuth | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const auth = sessionStorage.getItem('adminAuth');
    if (!auth) return null;
    
    return JSON.parse(auth) as AdminAuth;
  } catch (error) {
    console.error('Error getting admin auth data:', error);
    return null;
  }
}

// Log out the admin
export function logoutAdmin(): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  sessionStorage.removeItem('adminAuth');
} 