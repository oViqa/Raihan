# Supabase Setup Guide

This project uses Supabase for authentication and database functionality. Follow these steps to set up your Supabase project and connect it to this application.

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and sign up or log in
2. Create a new project
3. Note down your project URL and anon/public key (available in Project Settings > API)

## 2. Configure Environment Variables

1. Create a `.env.local` file in the root of your project
2. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 3. Set Up Database Tables

### Products Table

Create a `products` table with the following columns:

- `id` (uuid, primary key)
- `name` (text, not null)
- `description` (text)
- `price` (decimal, not null)
- `image_url` (text)
- `created_at` (timestamp with timezone, default: now())

SQL:
```sql
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 4. Configure Authentication

1. In the Supabase dashboard, go to Authentication > Providers
2. Enable Email provider (or any other providers you want to use)
3. Customize email templates and settings as needed
4. For production, set up your custom domain

## 5. Row Level Security (RLS) Policies

Set up Row Level Security policies to control access to your data:

### Products Table (Basic Example)

```sql
-- Enable RLS on the products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access to all products
CREATE POLICY "Products are viewable by everyone" 
ON products FOR SELECT 
USING (true);

-- Only allow authenticated users to insert products
CREATE POLICY "Users can insert their own products" 
ON products FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() IS NOT NULL);

-- Only allow users to update their own products (if you add a user_id column)
CREATE POLICY "Users can update their own products" 
ON products FOR UPDATE 
USING (auth.uid() = user_id);
```

## 6. Testing

1. Run your Next.js application: `npm run dev`
2. Test authentication by signing up/signing in
3. Test database operations by creating and retrieving products

## Helpful Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js with Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Authentication with Supabase](https://supabase.com/docs/guides/auth)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security) 