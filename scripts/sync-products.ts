import { createClient } from '@supabase/supabase-js';
import { seedProducts } from '../app/lib/seed-data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function syncProducts() {
  try {
    // First, get all existing products
    const { data: existingProducts, error: fetchError } = await supabase
      .from('products')
      .select('*');

    if (fetchError) {
      throw fetchError;
    }

    // Create a map of existing products by name
    const existingProductsMap = new Map(
      existingProducts?.map(p => [p.name, p]) || []
    );

    // Insert or update products
    for (const product of seedProducts) {
      const existingProduct = existingProductsMap.get(product.name);

      if (existingProduct) {
        // Update existing product
        const { error: updateError } = await supabase
          .from('products')
          .update(product)
          .eq('id', existingProduct.id);

        if (updateError) {
          console.error(`Error updating product ${product.name}:`, updateError);
        } else {
          console.log(`Updated product: ${product.name}`);
        }
      } else {
        // Insert new product
        const { error: insertError } = await supabase
          .from('products')
          .insert(product);

        if (insertError) {
          console.error(`Error inserting product ${product.name}:`, insertError);
        } else {
          console.log(`Inserted new product: ${product.name}`);
        }
      }
    }

    console.log('Product sync completed successfully!');
  } catch (error) {
    console.error('Error syncing products:', error);
  }
}

// Run the sync
syncProducts(); 