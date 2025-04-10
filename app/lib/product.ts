import { supabase } from './supabase';
import { Product } from './database-schema';

// Get all products
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  return (data || []) as Product[];
}

// Get product by ID
export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }

  return data as Product | null;
}

// Get products by category
export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', categoryId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching products with category ${categoryId}:`, error);
    throw error;
  }

  return (data || []) as Product[];
}

// Create new product
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

  return data as Product;
}

// Update product
export async function updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'created_at'>>): Promise<Product> {
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

  return data as Product;
}

// Delete product
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

// Update product stock
export async function updateProductStock(id: string, quantity: number): Promise<void> {
  const { error } = await supabase
    .from('products')
    .update({ stock_quantity: quantity })
    .eq('id', id);

  if (error) {
    console.error(`Error updating stock for product with id ${id}:`, error);
    throw error;
  }
}

// Search products by name or description
export async function searchProducts(query: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error searching products with query ${query}:`, error);
    throw error;
  }

  return (data || []) as Product[];
} 