import { supabase } from './supabase';
import { Admin } from './database-schema';

// Simple admin login without authentication
export async function adminLogin(email: string, password: string): Promise<Admin | null> {
  // Note: This is a direct text comparison with the password stored in the database
  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .eq('email', email)
    .eq('password', password) // Plain text password comparison
    .single();

  if (error && error.code !== 'PGRST116') { 
    console.error('Admin login error:', error);
    throw error;
  }
  
  return data as Admin | null;
}

// Check if user is an admin by email/password
export async function isAdmin(email: string, password: string): Promise<boolean> {
  const admin = await adminLogin(email, password);
  return admin !== null;
}

// Get all admins
export async function getAdmins(): Promise<Admin[]> {
  const { data, error } = await supabase
    .from('admins')
    .select('*');

  if (error) {
    console.error('Error fetching admins:', error);
    throw error;
  }

  return (data || []) as Admin[];
}

// Create new admin
export async function createAdmin(email: string, password: string): Promise<Admin> {
  const { data, error } = await supabase
    .from('admins')
    .insert({ email, password })
    .select()
    .single();

  if (error) {
    console.error('Error creating admin:', error);
    throw error;
  }

  return data as Admin;
}

// Update admin
export async function updateAdmin(id: string, email?: string, password?: string): Promise<Admin> {
  const updates: Partial<Admin> = {};
  if (email) updates.email = email;
  if (password) updates.password = password;

  const { data, error } = await supabase
    .from('admins')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating admin:', error);
    throw error;
  }

  return data as Admin;
}

// Delete admin
export async function deleteAdmin(id: string): Promise<void> {
  const { error } = await supabase
    .from('admins')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting admin:', error);
    throw error;
  }
} 