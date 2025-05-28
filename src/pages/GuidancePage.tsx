import React, { useState, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Send, Mic, Guitar as Hospital, Car, PartyPopper, Phone } from 'lucide-react';
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

const INITIAL_MESSAGE = '我们今天来说说生活服务吧，您是想了解医疗服务、交通出行、社区活动，还是常用电话呢？';

const GuidancePage: React.FC = () => {
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
    speak('您好张奶奶，今天我来陪您了解生活服务～');
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
      if (text.includes('医疗服务')) {
        response = '好的，我来为您介绍附近的医院和诊所。您想了解哪方面的医疗服务呢？比如预约挂号、体检服务，或是急诊信息？';
      } else if (text.includes('交通出行')) {
        response = '我来帮您了解交通信息。您是想查询公交路线、预约出租车，还是了解社区接送服务呢？';
      } else if (text.includes('社区活动')) {
        response = '社区最近有很多有趣的活动呢！有太极班、书法班、合唱团等，您对哪个感兴趣呢？';
      } else if (text.includes('常用电话')) {
        response = '我这里有紧急联系电话：\n急救电话：120\n报警电话：110\n消防电话：119\n您还需要其他电话号码吗？';
      } else {
        response = '您说得对。您想具体了解哪方面的服务呢？我很乐意为您详细介绍。';
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
    { icon: <Hospital size={24} />, text: '医疗服务 🏥' },
    { icon: <Car size={24} />, text: '交通出行 🚗' },
    { icon: <PartyPopper size={24} />, text: '社区活动 🎉' },
    { icon: <Phone size={24} />, text: '常用电话 ☎️' }
  ];

  return (
    <div className={`min-h-screen flex flex-col bg-[#FFF7E6] ${mode === 'elder' ? 'elder-mode' : ''}`}>
      <PageHeader title="生活小助手" />
      
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
              placeholder="请告诉我您需要什么帮助..."
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

export default GuidancePage;