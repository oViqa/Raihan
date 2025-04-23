"use client"

import { useState, useEffect } from "react"
import { FaWhatsapp } from "react-icons/fa"
import { IoClose } from "react-icons/io5"

interface FloatingWhatsAppButtonProps {
  phoneNumber?: string
  message?: string
}

const FloatingWhatsAppButton = ({
  phoneNumber = "675466385", // Default phone number (replace with your actual number)
  message = "Hello! I am interested in your products.",
}: FloatingWhatsAppButtonProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  
  // Show button after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY > 300)
      
      // Hide tooltip after 5 seconds if button is visible
      if (scrollY > 300) {
        setShowTooltip(true)
        const timer = setTimeout(() => {
          setShowTooltip(false)
        }, 5000)
        
        return () => clearTimeout(timer)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const handleWhatsAppClick = () => {
    // Create WhatsApp URL with phone number and encoded message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    // Open in new tab
    window.open(whatsappUrl, "_blank")
  }

  const closeTooltip = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowTooltip(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Tooltip */}
      {showTooltip && (
        <div className="mb-3 bg-white rounded-lg shadow-lg p-3 max-w-[200px] relative animate-fade-in">
          <button 
            onClick={closeTooltip}
            className="absolute -top-2 -right-2 bg-[#f0ece2] rounded-full p-1 text-[#4a5a2b] hover:bg-[#d3c8ab]"
            aria-label="Close tooltip"
          >
            <IoClose size={12} />
          </button>
          <p className="text-sm text-[#4a5a2b]">
          Questions sur nos produits ? Contactez-nous sur WhatsApp !
          </p>
        </div>
      )}
      
      {/* Button */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        className={`
          bg-[#6b7f3e] text-white p-4 rounded-full shadow-lg 
          hover:bg-[#4a5a2b] transition-all duration-300
          flex items-center justify-center
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'} 
          transform transition-all duration-500
          hover:scale-110 active:scale-95
        `}
        aria-label="تواصل معنا على واتساب"
      >
        <FaWhatsapp className={`text-2xl ${isButtonHovered ? 'animate-pulse' : ''}`} />
      </button>
    </div>
  )
}

export default FloatingWhatsAppButton
