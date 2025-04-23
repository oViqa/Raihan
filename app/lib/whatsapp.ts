import { Product } from './database-schema';

// Default WhatsApp phone number - replace with your business number
const DEFAULT_PHONE = '1234567890';

// We'll keep the formatPrice function for internal backend use
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

/**
 * Creates a WhatsApp link for product inquiry
 * @param product The product to create a link for
 * @returns WhatsApp URL with prefilled message
 */
export const createWhatsAppLink = (product: Product) => {
  // Get the WhatsApp phone number from environment or use default
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || DEFAULT_PHONE;
  
  // Create the message with details about the product - keeping product ID for reference
  // We won't mention price or quantity in the message shown to users
  const message = encodeURIComponent(
    `Hello, I would like to inquire about *${product.name}*.\n\n` +
    `Product ID: ${product.id}\n\n` +
    `Please provide more information about this product. I'm interested in learning more about its details, availability, and how I can purchase it.`
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
    message: `Inquire via WhatsApp`,
  };
}; 