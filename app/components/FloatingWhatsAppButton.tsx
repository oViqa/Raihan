"use client"

import { FaWhatsapp } from "react-icons/fa"

interface FloatingWhatsAppButtonProps {
  phoneNumber?: string
  message?: string
}

const FloatingWhatsAppButton = ({
  phoneNumber = "1234567890", // Default phone number (replace with your actual number)
  message = "Hello! I am interested in your products.",
}: FloatingWhatsAppButtonProps) => {
  const handleWhatsAppClick = () => {
    // Create WhatsApp URL with phone number and encoded message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    // Open in new tab
    window.open(whatsappUrl, "_blank")
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors z-50 flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="text-2xl" />
    </button>
  )
}

export default FloatingWhatsAppButton
