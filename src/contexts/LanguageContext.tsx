import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr'; // Add more languages as needed

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: 'en', // Default language
  setLanguage: () => {},
});

interface LanguageProviderProps {
  children: ReactNode; // Properly type the children prop
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
