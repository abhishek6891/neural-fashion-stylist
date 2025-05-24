
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    welcome: "Welcome",
    discover: "Discover",
    aiStylist: "AI Stylist",
    tailors: "Tailors",
    about: "About",
    login: "Login",
    signup: "Sign Up",
    profile: "Profile",
    bookNow: "Book Now",
    chat: "Chat",
    viewProfile: "View Profile",
    height: "Height",
    weight: "Weight",
    age: "Age",
    chest: "Chest",
    waist: "Waist",
    hip: "Hip",
    experience: "Experience",
    specialization: "Specialization",
    location: "Location"
  },
  hi: {
    welcome: "स्वागत",
    discover: "खोजें",
    aiStylist: "AI स्टाइलिस्ट",
    tailors: "दर्जी",
    about: "के बारे में",
    login: "लॉगिन",
    signup: "साइन अप",
    profile: "प्रोफ़ाइल",
    bookNow: "अभी बुक करें",
    chat: "चैट",
    viewProfile: "प्रोफ़ाइल देखें",
    height: "ऊंचाई",
    weight: "वजन",
    age: "उम्र",
    chest: "छाती",
    waist: "कमर",
    hip: "कूल्हा",
    experience: "अनुभव",
    specialization: "विशेषज्ञता",
    location: "स्थान"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
  };

  const t = (key: string) => {
    const translation = translations[currentLanguage as keyof typeof translations];
    return translation?.[key as keyof typeof translation] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
