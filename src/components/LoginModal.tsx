import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAudio } from '../contexts/AudioContext';
import { useLanguage } from '../contexts/LanguageContext';
import AudioButton from './AudioButton';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('李爷爷');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { speak } = useAudio();
  const { mode } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      speak('请输入您的用户名和密码。');
    }
  }, [isOpen, speak]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(username, password);
    
    if (success) {
      speak('登录成功，欢迎回来，李爷爷。');
      navigate('/home');
    } else {
      setError('月儿没认出来您哦，请再试一次吧～');
      speak('月儿没认出来您哦，请再试一次吧～');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 fade-in">
      <div className={`bg-white rounded-2xl p-8 w-full max-w-md relative ${mode === 'elder' ? 'elder-mode' : ''}`}>
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="关闭"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-center">登录望月AI</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-lg mb-2">用户名</label>
            <div className="flex items-center">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
              />
              <AudioButton text="请输入您的用户名" />
            </div>
          </div>
          
          <div className="mb-8">
            <label htmlFor="password" className="block text-lg mb-2">密码</label>
            <div className="flex items-center">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
              <AudioButton text="请输入您的密码" />
            </div>
          </div>
          
          {error && (
            <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg flex items-center">
              <span>{error}</span>
              <AudioButton text={error} />
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn-primary w-full flex justify-center items-center"
          >
            <span>进入望月AI</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;