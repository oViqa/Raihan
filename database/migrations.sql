-- Migration: Create Categories Table
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT
);

-- Migration: Create Products Table
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  image_url TEXT,
  category UUID REFERENCES categories(id),
  stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migration: Create Index on Products Category
CREATE INDEX idx_products_category ON products(category);

-- Migration: Create Admins Table (with plain text password)
CREATE TABLE admins (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Migration: Since we're not using authentication for admins, we'll use a simpler approach
-- for Row Level Security that doesn't rely on JWT claims

-- Migration: Enable Row Level Security on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Migration: Create RLS Policies for Products
-- Anyone can view products
CREATE POLICY "Products are viewable by everyone" 
ON products FOR SELECT 
USING (true);

-- Anyone can manage products (since we're not using auth)
CREATE POLICY "Anyone can manage products" 
ON products FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update products" 
ON products FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete products" 
ON products FOR DELETE USING (true);

-- Migration: Create RLS Policies for Categories
-- Anyone can view categories
CREATE POLICY "Categories are viewable by everyone" 
ON categories FOR SELECT 
USING (true);

-- Anyone can manage categories (since we're not using auth)
CREATE POLICY "Anyone can manage categories" 
ON categories FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update categories" 
ON categories FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete categories" 
ON categories FOR DELETE USING (true);

-- Migration: Create RLS Policies for Admins
-- Anyone can view admins list
CREATE POLICY "Anyone can view admins" 
ON admins FOR SELECT
USING (true);

-- Anyone can manage admins (since we're not using auth)
CREATE POLICY "Anyone can manage admins" 
ON admins FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update admins" 
ON admins FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete admins" 
ON admins FOR DELETE USING (true);

-- Migration: Create storage bucket for product images
-- Note: This requires the storage extension to be enabled
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Set up storage bucket permissions (public access)
CREATE POLICY "Product images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Allow uploads to product-images bucket
CREATE POLICY "Anyone can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

-- Allow updates to product-images bucket
CREATE POLICY "Anyone can update product images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images');

-- Allow deletes from product-images bucket
CREATE POLICY "Anyone can delete product images"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');

/* -- Migration: Insert some default categories for testing
INSERT INTO categories (name, description) VALUES
('Huiles essentielles', 'زيوت أساسية'),
('Huiles végétales', 'زيوت نباتية'),
('Plantes sèches', 'نباتات جافة'),
('Hydrolats', 'ماء الزهور'),
('Sels de bain', 'أملاح الاستحمام'),
('Shampoings', 'شامبوهات'),
('Savon noir', 'الصابون الأسود'),
('Argiles', 'الطين');
*/
-- Migration: Insert a default admin account
INSERT INTO admins (email, password) VALUES
('admin@example.com', 'admin123'); 


-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Set up storage bucket permissions (public access)
CREATE POLICY "Product images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Allow uploads to product-images bucket
CREATE POLICY "Anyone can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

-- Allow updates to product-images bucket
CREATE POLICY "Anyone can update product images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images');

-- Allow deletes from product-images bucket
CREATE POLICY "Anyone can delete product images"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');

UPDATE categories SET 
  name = 'زيوت أساسية' WHERE name = 'Huiles essentielles';
UPDATE categories SET 
  name = 'زيوت نباتية' WHERE name = 'Huiles végétales';
UPDATE categories SET 
  name = 'نباتات جافة' WHERE name = 'Plantes sèches';
UPDATE categories SET 
  name = 'ماء الزهور' WHERE name = 'Hydrolats';
UPDATE categories SET 
  name = 'أملاح الاستحمام' WHERE name = 'Sels de bain';
UPDATE categories SET 
  name = 'شامبوهات' WHERE name = 'Shampoings';
UPDATE categories SET 
  name = 'الصابون الأسود' WHERE name = 'Savon noir';
UPDATE categories SET 
  name = 'الطين' WHERE name = 'Argiles';