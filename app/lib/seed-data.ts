import { Product } from './database-schema';

export const seedProducts: Omit<Product, 'id' | 'created_at'>[] = [
  {
    name: 'Huile essentielle de Lavande',
    description: 'Huile essentielle pure de lavande, 100% naturelle',
    price: 15.99,
    image_url: '/images/products/lavender.jpg',
    category: 'Huiles essentielles',
    stock_quantity: 50
  },
  {
    name: 'Huile d\'Argan',
    description: 'Huile d\'argan pure, pressée à froid',
    price: 25.99,
    image_url: '/images/products/argan.jpg',
    category: 'Huiles végétales',
    stock_quantity: 30
  },
  {
    name: 'Thé à la Menthe',
    description: 'Thé vert marocain avec menthe fraîche',
    price: 8.99,
    image_url: '/images/products/mint-tea.jpg',
    category: 'Plantes sèches',
    stock_quantity: 100
  },
  {
    name: 'Eau de Rose',
    description: 'Hydrolat de rose pure',
    price: 12.99,
    image_url: '/images/products/rose-water.jpg',
    category: 'Hydrolats',
    stock_quantity: 40
  },
  {
    name: 'Sel de Bain aux Fleurs',
    description: 'Sel de bain aux fleurs séchées',
    price: 18.99,
    image_url: '/images/products/bath-salt.jpg',
    category: 'Sels de bain',
    stock_quantity: 25
  }
]; 