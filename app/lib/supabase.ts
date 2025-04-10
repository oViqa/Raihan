import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

// These env vars need to be defined in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

let supabase: ReturnType<typeof createClient>;

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
  supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

// Helper to get the user session
export const getSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

// Helper to get the user
export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}; 