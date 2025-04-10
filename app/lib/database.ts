import { supabase } from './supabase';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  created_at: string;
  // Add more fields as needed
};

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  return data || [];
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }

  return data;
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error);
    throw error;
  }

  return data;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating product with id ${id}:`, error);
    throw error;
  }

  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
} 