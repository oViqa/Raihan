import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

/**
 * Upload a product image to Supabase storage
 * @param file - File to upload
 * @returns URL of the uploaded image
 */
export async function uploadProductImage(file: File): Promise<string> {
  try {
    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `products/${fileName}`;
    
    // Upload file to Supabase storage
    const { error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    if (error) {
      throw error;
    }
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);
      
    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
}

/**
 * Delete a product image from Supabase storage
 * @param imageUrl - URL of the image to delete
 */
export async function deleteProductImage(imageUrl: string): Promise<void> {
  try {
    // Extract the file path from the URL
    const baseUrl = supabase.storage.from('product-images').getPublicUrl('').data.publicUrl;
    const filePath = imageUrl.replace(baseUrl, '');
    
    // Delete the file
    const { error } = await supabase.storage
      .from('product-images')
      .remove([filePath]);
      
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw, just log - deleting the product should proceed even if image deletion fails
  }
} 