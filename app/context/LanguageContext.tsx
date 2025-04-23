'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const defaultTranslations = {
  // Home page
  'explore_collections': {
    fr: 'Explorez Nos Collections',
    ar: 'استكشف مجموعاتنا'
  },
  'our_products': {
    fr: 'Nos Produits',
    ar: 'منتجاتنا'
  },
  'discover': {
    fr: 'Découvrir',
    ar: 'اكتشف'
  },
  'all_products': {
    fr: 'Tous les produits',
    ar: 'جميع المنتجات'
  },
  'explore_collection': {
    fr: 'Explorez Notre Collection',
    ar: 'استكشف مجموعتنا'
  },
  'authentic_moroccan': {
    fr: 'Authentique produits Marocains',
    ar: 'منتجات مغربية أصيلة'
  },
  // Navigation
  'home': {
    fr: 'Accueil',
    ar: 'الرئيسية'
  },
  'products': {
    fr: 'Nos Produits',
    ar: 'منتجاتنا'
  },
  // General
  'inquire': {
    fr: 'Demander via WhatsApp',
    ar: 'استفسر عبر واتساب'
  }
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');
  
  useEffect(() => {
    // Get language from localStorage on client side
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'ar')) {
      setLanguageState(savedLanguage);
    }
    
    // Apply RTL or LTR direction to the document
    if (savedLanguage === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'fr';
    }
  }, []);
  
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Apply RTL or LTR direction to the document
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'fr';
    }
  };
  
  // Translation function
  const t = (key: string): string => {
    const translation = defaultTranslations[key as keyof typeof defaultTranslations];
    if (!translation) return key; // Return the key if translation not found
    return translation[language] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === null) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 