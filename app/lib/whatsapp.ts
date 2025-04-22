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
 * Creates a WhatsApp link for a product purchase
 * @param product The product to create a link for
 * @param quantity Optional quantity of product (defaults to 1)
 * @returns WhatsApp link with pre-filled purchase message
 */
export const createWhatsAppLink = (product: Product, quantity: number = 1): string => {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || DEFAULT_PHONE;
  const productPrice = formatPrice(Number(product.price));
  const totalPrice = formatPrice(Number(product.price) * quantity);
  
  // Create a more detailed purchase message
  const message = [
    `🛒 *PURCHASE REQUEST*`,
    ``,
    `*Product:* ${product.name}`,
    `*Price:* ${productPrice}`,
    `*Quantity:* ${quantity}`,
    `*Total:* ${totalPrice}`,
  ];
  
  // Add description if available
  if (product.description) {
    message.push(``, `*Description:* ${product.description.substring(0, 100)}${product.description.length > 100 ? '...' : ''}`);
  }
  
  // Add delivery information request
  message.push(
    ``,
    `Please provide the following information to complete your order:`,
    `1. Full Name`,
    `2. Delivery Address`,
    `3. Phone Number`,
    `4. Preferred Delivery Date/Time`,
    ``,
    `Thank you for shopping with us!`
  );
  
  return `https://wa.me/${phone}?text=${encodeURIComponent(message.join('\n'))}`;
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
    message: `Buy on WhatsApp (${formatPrice(Number(product.price))})`,
  };
}; 