import { supabase } from './supabase';
import { Category } from './database-schema';

// Get all categories
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }

  return (data || []) as Category[];
}

// Get category by ID
export async function getCategoryById(id: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error(`Error fetching category with id ${id}:`, error);
    throw error;
  }

  return data as Category | null;
}

// Create new category
export async function createCategory(name: string, description?: string): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .insert({ name, description })
    .select()
    .single();

  if (error) {
    console.error('Error creating category:', error);
    throw error;
  }

  return data as Category;
}

// Update category
export async function updateCategory(id: string, updates: Partial<Omit<Category, 'id'>>): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating category with id ${id}:`, error);
    throw error;
  }

  return data as Category;
}

// Delete category
export async function deleteCategory(id: string): Promise<void> {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting category with id ${id}:`, error);
    throw error;
  }
} 