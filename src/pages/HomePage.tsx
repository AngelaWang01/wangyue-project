import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Moon, Globe, MessageCircle, Compass, Pill } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAudio } from '../contexts/AudioContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';
import AudioButton from '../components/AudioButton';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { speak } = useAudio();
  const { mode } = useLanguage();
  const navigate = useNavigate();
  
  const welcomeMessage = `${user.username}您好，需要什么帮忙吗？请点击下面按钮。`;
  
  useEffect(() => {
    if (user.isAuthenticated) {
      speak(welcomeMessage);
    }
  }, [user.isAuthenticated, speak, welcomeMessage]);
  
  if (!user.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      label: '英文翻译',
      description: '帮您翻译日常对话，方便您在医院、银行和商店等场所交流。',
      path: '/translation'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      label: '陪我说说话',
      description: '和月儿聊聊天，分享您的心情和故事。',
      path: '/chat'
    },
    {
      icon: <Compass className="w-8 h-8" />,
      label: '生活小助手',
      description: '为您提供医疗、交通、社区活动和紧急联系等生活指南。',
      path: '/guidance'
    },
    {
      icon: <Pill className="w-8 h-8" />,
      label: '吃药提醒与说明',
      description: '帮您解读处方，设置服药提醒。',
      path: '/medication'
    }
  ];
  
  return (
    <div className={`moonlight-bg min-h-screen flex flex-col items-center p-8 ${mode === 'elder' ? 'elder-mode' : ''}`}>
      <LanguageToggle />
      
      <div className="mt-8 mb-4 text-amber-500 animate-pulse">
        <Moon size={mode === 'elder' ? 72 : 48} strokeWidth={1.5} />
      </div>
      
      <div className="text-center mb-12 flex items-center justify-center gap-2">
        <h1 className="welcome-text text-2xl md:text-3xl font-bold">
          {welcomeMessage}
        </h1>
        <AudioButton text={welcomeMessage} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {features.map((feature, index) => (
          <button
            key={index}
            className="feature-button flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg 
                     hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={() => {
              speak(feature.description);
              navigate(feature.path);
            }}
          >
            <div className="text-amber-500 mb-4">
              {feature.icon}
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-2">{feature.label}</h2>
            <p className="text-gray-600 text-center text-sm md:text-base">
              {feature.description}
            </p>
            <AudioButton text={feature.description} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;