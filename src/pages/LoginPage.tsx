import React, { useState, useEffect } from 'react';
import { Moon } from 'lucide-react';
import LoginModal from '../components/LoginModal';
import LanguageToggle from '../components/LanguageToggle';
import AudioButton from '../components/AudioButton';
import { useAudio } from '../contexts/AudioContext';
import { useLanguage } from '../contexts/LanguageContext';

const LoginPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { speak } = useAudio();
  const { mode } = useLanguage();
  
  const welcomeMessage = "欢迎来到望月AI，我是月儿，有我在，你不再孤单。";
  
  useEffect(() => {
    // Speak the welcome message when the page loads
    speak(welcomeMessage);
  }, [speak, welcomeMessage]);
  
  const handleEnterClick = () => {
    setIsModalOpen(true);
  };
  
  return (
    <div className={`moonlight-bg min-h-screen flex flex-col items-center justify-center p-4 ${mode === 'elder' ? 'elder-mode' : ''}`}>
      <LanguageToggle />
      
      <div className="mb-8 text-amber-500">
        <Moon size={mode === 'elder' ? 96 : 64} strokeWidth={1.5} />
      </div>
      
      <div className="text-center mb-12 flex items-center">
        <h1 className="welcome-text text-3xl md:text-4xl font-bold mb-2">
          {welcomeMessage}
        </h1>
        <AudioButton text={welcomeMessage} />
      </div>
      
      <div className="space-y-6 w-full max-w-xs">
        <button 
          onClick={handleEnterClick}
          className="btn-primary w-full"
        >
          进入望月AI
        </button>
        
        <button 
          disabled
          className="btn-secondary w-full"
        >
          注册账号
        </button>
      </div>
      
      <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default LoginPage;