import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAudio } from '../contexts/AudioContext';

const LanguageToggle: React.FC = () => {
  const { language, mode, setLanguage, toggleMode } = useLanguage();
  const { speak } = useAudio();

  const handleLanguageClick = (newLanguage: 'simplified' | 'traditional' | 'cantonese') => {
    setLanguage(newLanguage);
    
    const languageTexts = {
      simplified: '已切换到简体中文',
      traditional: '已切換到繁體中文',
      cantonese: '已切換到粵語'
    };
    
    speak(languageTexts[newLanguage]);
  };

  const handleModeToggle = () => {
    toggleMode();
    speak(mode === 'normal' ? '已切换到老年模式' : '已切换到普通模式');
  };

  return (
    <div className="absolute top-4 right-4 flex items-center">
      <button 
        className={`language-btn ${language === 'simplified' ? 'active' : ''}`}
        onClick={() => handleLanguageClick('simplified')}
      >
        简体中文
      </button>
      <button 
        className={`language-btn ${language === 'traditional' ? 'active' : ''}`}
        onClick={() => handleLanguageClick('traditional')}
      >
        繁體中文
      </button>
      <button 
        className={`language-btn ${language === 'cantonese' ? 'active' : ''}`}
        onClick={() => handleLanguageClick('cantonese')}
      >
        粤语
      </button>
      <button 
        className={`language-btn ${mode === 'elder' ? 'active' : ''}`}
        onClick={handleModeToggle}
      >
        老年模式
      </button>
    </div>
  );
};

export default LanguageToggle;