import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Mic, Volume2, ArrowDownUp, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAudio } from '../contexts/AudioContext';
import { useLanguage } from '../contexts/LanguageContext';
import PageHeader from '../components/PageHeader';
import AudioButton from '../components/AudioButton';

const TranslationPage: React.FC = () => {
  const { user } = useAuth();
  const { speak } = useAudio();
  const { mode } = useLanguage();
  const [isReversed, setIsReversed] = useState(false);
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const welcomeMessage = '需要翻译帮助吗？试着说点什么吧！';

  if (!user.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleVoiceInput = () => {
    speak('语音输入功能即将开放');
  };

  const handlePlayAudio = () => {
    if (translatedText) {
      speak(translatedText);
    }
  };

  const handleFlipLanguages = () => {
    setIsReversed(!isReversed);
    const temp = sourceText;
    setSourceText(translatedText);
    setTranslatedText(temp);
    speak('已切换翻译方向');
  };

  const handleTranslate = () => {
    if (!sourceText.trim()) {
      speak('请先输入需要翻译的内容');
      return;
    }
    
    // For now, we'll just simulate translation
    // This will be replaced with actual translation logic later
    const simulatedTranslation = isReversed 
      ? `[Translated to Chinese]: ${sourceText}`
      : `[Translated to English]: ${sourceText}`;
    
    setTranslatedText(simulatedTranslation);
    speak('翻译完成');
  };

  const sourceLabel = isReversed ? '🗣️ Speak English' : '🗣️ 说中文';
  const targetLabel = isReversed ? '🎧 AI 翻译 (中文)' : '🎧 AI Translation (English)';
  const translateButtonLabel = isReversed ? '🌐 翻成中文' : '🌐 翻成英文';

  return (
    <div className={`min-h-screen flex flex-col bg-amber-50 ${mode === 'elder' ? 'elder-mode' : ''}`}>
      <PageHeader title="英文翻译" />
      
      <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
        <div className="text-center mb-8 flex items-center justify-center gap-2">
          <h2 className="text-2xl md:text-3xl text-gray-700 font-bold">
            {welcomeMessage}
          </h2>
          <AudioButton text={welcomeMessage} />
        </div>

        <div className="space-y-6">
          {/* Source Language Input */}
          <div className="space-y-2">
            <label className="block text-xl font-bold mb-2">{sourceLabel}</label>
            <div className="relative">
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                className="w-full p-4 rounded-xl bg-blue-50 text-lg min-h-[120px]
                         border-2 border-blue-100 focus:border-blue-300 focus:ring-2 
                         focus:ring-blue-200 focus:outline-none transition-all"
                placeholder={isReversed ? "Type in English..." : "请用中文输入..."}
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={handleVoiceInput}
                  className="p-3 bg-blue-100 hover:bg-blue-200
                           rounded-full transition-all duration-300 flex items-center gap-2"
                  aria-label="语音输入"
                >
                  <Mic size={24} />
                  <span className="text-lg">语音输入</span>
                </button>
              </div>
            </div>
          </div>

          {/* Translation Button */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleTranslate}
              className="p-4 bg-amber-400 hover:bg-amber-500 rounded-full
                       transition-all duration-300 flex items-center gap-2
                       shadow-sm hover:shadow-md text-lg font-bold"
            >
              <Globe size={24} />
              <span>{translateButtonLabel}</span>
            </button>

            <button
              onClick={handleFlipLanguages}
              className="p-4 bg-amber-100 hover:bg-amber-200 rounded-full
                       transition-all duration-300 flex items-center gap-2
                       shadow-sm hover:shadow-md"
            >
              <ArrowDownUp size={24} />
              <span className="text-lg">切换语言</span>
            </button>
          </div>

          {/* Target Language Output */}
          <div className="space-y-2">
            <label className="block text-xl font-bold mb-2">{targetLabel}</label>
            <div className="relative">
              <textarea
                value={translatedText}
                readOnly
                className="w-full p-4 rounded-xl bg-green-50 text-lg min-h-[120px]
                         border-2 border-green-100"
                placeholder={isReversed ? "AI 翻译会显示在这里..." : "AI translation will appear here..."}
              />
              <button
                onClick={handlePlayAudio}
                className="absolute bottom-4 right-4 p-3 bg-green-100 hover:bg-green-200
                         rounded-full transition-all duration-300 flex items-center gap-2"
                aria-label="播放声音"
              >
                <Volume2 size={24} />
                <span className="text-lg">播放声音</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TranslationPage;