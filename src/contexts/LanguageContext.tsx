import React, { createContext, useState, useContext, ReactNode } from 'react';

type LanguageType = 'simplified' | 'traditional' | 'cantonese';
type ModeType = 'normal' | 'elder';

type LanguageContextType = {
  language: LanguageType;
  mode: ModeType;
  setLanguage: (language: LanguageType) => void;
  toggleMode: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'simplified',
  mode: 'normal',
  setLanguage: () => {},
  toggleMode: () => {}
});

export const useLanguage = () => useContext(LanguageContext);

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageType>('simplified');
  const [mode, setMode] = useState<ModeType>('normal');

  const toggleMode = () => {
    setMode(mode === 'normal' ? 'elder' : 'normal');
  };

  return (
    <LanguageContext.Provider value={{ language, mode, setLanguage, toggleMode }}>
      {children}
    </LanguageContext.Provider>
  );
};