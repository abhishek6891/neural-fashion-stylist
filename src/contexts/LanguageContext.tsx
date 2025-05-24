
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
  },
  ta: {
    welcome: "வரவேற்கிறோம்",
    discover: "கண்டுபிடி",
    aiStylist: "AI ஸ்டைலிஸ்ட்",
    tailors: "தையல்காரர்கள்",
    about: "பற்றி",
    login: "உள்நுழை",
    signup: "பதிவு செய்",
    profile: "சுயவிவரம்",
    bookNow: "இப்போது புக் செய்",
    chat: "அரட்டை",
    viewProfile: "சுயவிவரத்தைப் பார்",
    height: "உயரம்",
    weight: "எடை",
    age: "வயது",
    chest: "மார்பு",
    waist: "இடுப்பு",
    hip: "இடுப்பு",
    experience: "அனுபவம்",
    specialization: "சிறப்பு",
    location: "இடம்"
  },
  te: {
    welcome: "స్వాగతం",
    discover: "కనుగొనండి",
    aiStylist: "AI స్టైలిస్ట్",
    tailors: "దర్జీలు",
    about: "గురించి",
    login: "లాగిన్",
    signup: "సైన్ అప్",
    profile: "ప్రొఫైల్",
    bookNow: "ఇప్పుడే బుక్ చేయండి",
    chat: "చాట్",
    viewProfile: "ప్రొఫైల్ చూడండి",
    height: "ఎత్తు",
    weight: "బరువు",
    age: "వయస్సు",
    chest: "ఛాతీ",
    waist: "నడుము",
    hip: "తుంటి",
    experience: "అనుభవం",
    specialization: "ప్రత్యేకత",
    location: "స్థానం"
  },
  mr: {
    welcome: "स्वागत",
    discover: "शोधा",
    aiStylist: "AI स्टायलिस्ट",
    tailors: "शिंपी",
    about: "बद्दल",
    login: "लॉगिन",
    signup: "साइन अप",
    profile: "प्रोफाइल",
    bookNow: "आता बुक करा",
    chat: "चॅट",
    viewProfile: "प्रोफाइल पहा",
    height: "उंची",
    weight: "वजन",
    age: "वय",
    chest: "छाती",
    waist: "कंबर",
    hip: "नितंब",
    experience: "अनुभव",
    specialization: "विशेषता",
    location: "स्थान"
  },
  bn: {
    welcome: "স্বাগতম",
    discover: "আবিষ্কার",
    aiStylist: "AI স্টাইলিস্ট",
    tailors: "দর্জি",
    about: "সম্পর্কে",
    login: "লগইন",
    signup: "সাইন আপ",
    profile: "প্রোফাইল",
    bookNow: "এখনই বুক করুন",
    chat: "চ্যাট",
    viewProfile: "প্রোফাইল দেখুন",
    height: "উচ্চতা",
    weight: "ওজন",
    age: "বয়স",
    chest: "বুক",
    waist: "কোমর",
    hip: "নিতম্ব",
    experience: "অভিজ্ঞতা",
    specialization: "বিশেষত্ব",
    location: "অবস্থান"
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
