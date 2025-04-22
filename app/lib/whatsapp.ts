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
 * Creates a WhatsApp link for a product purchase
 * @param product The product to create a link for
 * @param quantity Optional quantity of product
 * @returns WhatsApp URL with prefilled message
 */
export const createWhatsAppLink = (product: Product, quantity: number = 1) => {
  // Get the WhatsApp phone number from environment or use default
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || DEFAULT_PHONE;
  
  // Create the message with details about the product
  // We'll keep price in the message for admin/backend but it won't be displayed in UI
  const message = encodeURIComponent(
    `Hello, I would like to order ${quantity} ${quantity > 1 ? 'units' : 'unit'} of *${product.name}*.\n\n` +
    `Product ID: ${product.id}\n` +
    `Price: ${formatPrice(Number(product.price))}\n` +
    `Quantity: ${quantity}\n\n` +
    `Please let me know about delivery options and payment methods.`
  );
  
  return `https://wa.me/${phone}?text=${message}`;
};

/**
 * Creates a WhatsApp button component props
 * @param product The product to create button props for
 * @param quantity Optional quantity of product
 * @returns Button props including href and message
 */
export const getWhatsAppButtonProps = (product: Product, quantity: number = 1) => {
  return {
    href: createWhatsAppLink(product, quantity),
    message: `Buy via WhatsApp`,
  };
}; 