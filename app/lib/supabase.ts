import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

// These env vars need to be defined in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Log warning for missing environment variables but don't crash
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Authentication and database features may not work properly.');
}

// Initialize supabase client with any type to avoid TypeScript errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let supabase: any;

// Create Supabase client
if (typeof window === 'undefined') {
  // Server-side: use createClient
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    }
  });
} else {
  // Client-side: use browser client
  try {
    supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    // Fallback to regular client if browser client fails
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
}

export { supabase };

// Helper to get the user session
export const getSession = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};

// Helper to get the user
export const getUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}; 