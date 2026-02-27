import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types';
import { translations } from '../i18n';
import { Translations } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // 1. Lazy initialization: Pehle local storage check karega, agar wahan kuch nahi hai toh 'en' set karega.
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('app-language');
    // Ensure casting to 'Language' type. Agar aur languages hain toh yahan validation bhi laga sakte hain.
    return (savedLanguage as Language) || 'en';
  });
  
  // 2. useEffect: Jab bhi language change ho, DOM ke sath-sath local storage bhi update karega.
  useEffect(() => {
    localStorage.setItem('app-language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);
  
  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    isRTL: language === 'ar',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}