import { NextResponse } from 'next/server';
import { adminDB } from '@/app/lib/database-schema';

// This is a simple mock implementation. 
// In a real application, you would use a database and proper authentication
const ADMIN_CREDENTIALS = {
  email: 'admin@raihan.com',
  password: 'admin123'
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    console.log(`Attempting login for: ${email}`);
    
    // Use the adminDB.login function to authenticate
    const admin = await adminDB.login(email, password);
    
    if (admin) {
      // Generate a simple token
      const token = Buffer.from(`${admin.id}-${Date.now()}`).toString('base64');
      
      console.log(`Login successful for: ${email}`);
      
      return NextResponse.json({
        message: 'Login successful',
        token,
        admin: {
          id: admin.id,
          email: admin.email
        }
      });
    } else {
      console.log(`Login failed for: ${email}`);
      
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
} 