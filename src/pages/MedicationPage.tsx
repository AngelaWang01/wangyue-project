import React, { useState, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Send, Mic, Camera, Bell, Calendar, HelpCircle } from 'lucide-react';
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

const INITIAL_MESSAGE = '李爷爷，今天您需要吃 3 种药，我来帮您安排好啦～';

const MedicationPage: React.FC = () => {
  const { user } = useAuth();
  const { speak } = useAudio();
  const { mode } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: INITIAL_MESSAGE,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    speak(INITIAL_MESSAGE);
  }, [speak]);

  if (!user.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSendMessage = (text: string = inputText) => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate AI response based on the topic
    setTimeout(() => {
      let response = '';
      if (text.includes('扫描')) {
        response = '好的，我看到这个处方是"氯沙坦"，用于高血压，每天一次～已经为您加入今日提醒啦～记得按时吃哦，我会每天提醒您～';
      } else if (text.includes('今日用药')) {
        response = '今天您需要服用的药物有：\n1. 氯沙坦（早餐后）\n2. 阿司匹林（午餐后）\n3. 降糖药（晚餐后）\n我会在每个时间点提醒您的！';
      } else if (text.includes('提醒')) {
        response = '好的，我已经为您设置了以下提醒时间：\n早上 8:30\n中午 12:30\n晚上 6:30\n需要调整时间吗？';
      } else if (text.includes('副作用')) {
        response = '关于药物副作用，建议您注意以下几点：\n1. 如果感觉头晕，建议坐下休息\n2. 如有不适，及时联系医生\n3. 保持规律作息，适量运动\n您还有其他问题吗？';
      } else {
        response = '您说得对。您想了解药品的具体服用方法，还是需要设置提醒呢？我很乐意为您详细解释。';
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      speak(response);
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

  const quickActions = [
    { icon: <Camera size={24} />, text: '扫描药盒 📷' },
    { icon: <Calendar size={24} />, text: '今日用药 💊' },
    { icon: <Bell size={24} />, text: '设置提醒 🔔' },
    { icon: <HelpCircle size={24} />, text: '副作用咨询 🗣️' }
  ];

  return (
    <div className={`min-h-screen flex flex-col bg-amber-50 ${mode === 'elder' ? 'elder-mode' : ''}`}>
      <PageHeader title="吃药提醒与说明" />
      
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
                <div className="text-lg mb-2 whitespace-pre-line">{message.text}</div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  {formatTime(message.timestamp)}
                  <AudioButton text={message.text} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(action.text)}
              className="flex items-center justify-center gap-2 p-4 bg-white
                       rounded-full shadow-md hover:shadow-lg transition-all
                       duration-300 text-lg font-medium"
            >
              {action.icon}
              <span>{action.text}</span>
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <div className="flex items-end gap-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="请告诉我您的问题..."
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
                onClick={() => handleSendMessage()}
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

export default MedicationPage;