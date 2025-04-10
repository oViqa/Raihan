import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Create a Supabase client configured for middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          req.cookies.set({
            name,
            value,
            ...options,
          });
          res.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          req.cookies.delete({
            name,
            ...options,
          });
          res.cookies.delete({
            name,
            ...options,
          });
        },
      },
    }
  );
  
  // Refresh session if expired
  await supabase.auth.getSession();
  
  return res;
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    // Apply to all routes except static files, api routes, _next routes, etc.
    '/((?!_next/static|_next/image|favicon.ico|images/|api/).*)',
  ],
}; 