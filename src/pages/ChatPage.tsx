import React, { useState, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Send, Mic } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAudio } from '../contexts/AudioContext';
import { useLanguage } from '../contexts/LanguageContext';
import PageHeader from '../components/PageHeader';
import AudioButton from '../components/AudioButton';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const { speak } = useAudio();
  const { mode } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '我在呢，有什么想和我聊聊的吗？',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!user.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: '我明白您的感受。您说的对，生活中确实有很多值得分享的故事。要不要多告诉我一些呢？',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      speak(aiResponse.text);
    }, 1000);
  };

  const handleVoiceInput = () => {
    speak('语音输入功能即将开放');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-amber-50 ${mode === 'elder' ? 'elder-mode' : ''}`}>
      <PageHeader title="陪我说说话" />
      
      <main className="flex-1 p-4 flex flex-col max-w-4xl mx-auto w-full">
        {/* Chat Messages Container */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto mb-4 space-y-4 p-4"
        >
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-blue-100 text-black'
                    : 'bg-amber-100 text-black'
                }`}
              >
                <div className="text-lg mb-2">{message.text}</div>
                <div className="text-sm text-gray-500">
                  {formatTime(message.timestamp)}
                  <AudioButton text={message.text} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <div className="flex items-end gap-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="说点什么吧..."
              className="flex-1 p-4 text-lg border-2 border-amber-200 rounded-xl
                       focus:border-amber-400 focus:ring-2 focus:ring-amber-200
                       focus:outline-none min-h-[60px] resize-none"
              rows={2}
            />
            <div className="flex gap-2">
              <button
                onClick={handleVoiceInput}
                className="p-4 bg-amber-100 hover:bg-amber-200 rounded-full
                         transition-all duration-300"
                aria-label="语音输入"
              >
                <Mic size={24} />
              </button>
              <button
                onClick={handleSendMessage}
                className="p-4 bg-amber-400 hover:bg-amber-500 rounded-full
                         transition-all duration-300"
                aria-label="发送消息"
              >
                <Send size={24} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;