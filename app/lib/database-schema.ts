import { supabase } from './supabase';

// Product type definition
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;       // Internal use only - not displayed in UI
  image_url: string | null;
  category: string;
  stock_quantity: number; // Internal use only - not displayed in UI
  created_at: string;
};

// Category type definition
export type Category = {
  id: string;
  name: string;
  description: string | null;
};

// Admin type definition
export type Admin = {
  id: string;
  email: string;
  password: string; // Note: storing as plain text as requested
};

// SocialMediaLink type definition
export type SocialMediaLink = {
  id: string;
  platform: string;
  url: string;
  icon: string;
  created_at: string;
};

// Database functions for products
export const productDB = {
  async getAll(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async getByCategory(categoryId: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', categoryId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async create(product: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Omit<Product, 'id' | 'created_at'>>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async updateStock(id: string, quantity: number): Promise<void> {
    const { error } = await supabase
      .from('products')
      .update({ stock_quantity: quantity })
      .eq('id', id);

    if (error) throw error;
  }
};

// Database functions for categories
export const categoryDB = {
  async getAll(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(category: Omit<Category, 'id'>): Promise<Category> {
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Omit<Category, 'id'>>): Promise<Category> {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// Database functions for admins
export const adminDB = {
  async getAll(): Promise<Admin[]> {
    const { data, error } = await supabase
      .from('admins')
      .select('*');

    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Admin | null> {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async getByEmail(email: string): Promise<Admin | null> {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned" error
    return data || null;
  },

  async create(admin: Omit<Admin, 'id'>): Promise<Admin> {
    const { data, error } = await supabase
      .from('admins')
      .insert(admin)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Omit<Admin, 'id'>>): Promise<Admin> {
    const { data, error } = await supabase
      .from('admins')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('admins')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Simple admin login without authentication
  async login(email: string, password: string): Promise<Admin | null> {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .eq('password', password) // Plain text password comparison
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  }
};

export const socialMediaDB = {
  async getAll(): Promise<SocialMediaLink[]> {
    const { data, error } = await supabase
      .from('social_media_links')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }
}; 