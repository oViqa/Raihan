import { Product } from './database-schema';

// Default WhatsApp phone number - replace with your business number
const DEFAULT_PHONE = '1234567890';

/**
 * Formats a product price
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

/**
 * Creates a WhatsApp link for a product
 * @param product The product to create a link for
 * @returns WhatsApp link with pre-filled message
 */
export const createWhatsAppLink = (product: Product): string => {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || DEFAULT_PHONE;
  const productPrice = formatPrice(Number(product.price));
  
  // Create message text
  const message = encodeURIComponent(
    `Hello! I'm interested in purchasing "${product.name}" for ${productPrice}. Is it available?`
  );
  
  return `https://wa.me/${phone}?text=${message}`;
};

/**
 * Creates a WhatsApp button component props
 * @param product The product to create button props for
 * @returns Button props including href and message
 */
export const getWhatsAppButtonProps = (product: Product) => {
  return {
    href: createWhatsAppLink(product),
    message: `Buy on WhatsApp (${formatPrice(Number(product.price))})`,
  };
}; 