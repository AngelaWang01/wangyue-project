import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';
import AudioButton from './AudioButton';

type PageHeaderProps = {
  title: string;
};

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  const { speak } = useAudio();

  const handleHomeClick = () => {
    speak('返回主页');
    navigate('/home');
  };

  return (
    <header className="bg-amber-50 py-4 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <AudioButton text={title} />
      </div>
      <button
        onClick={handleHomeClick}
        className="flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 
                 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
        aria-label="返回主页"
      >
        <Home size={24} />
        <span className="text-lg">返回主页</span>
      </button>
    </header>
  );
};

export default PageHeader;