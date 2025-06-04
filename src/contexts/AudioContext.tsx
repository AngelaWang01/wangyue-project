import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type AudioContextType = {
  audioEnabled: boolean;
  toggleAudio: () => void;
  speak: (text: string) => void;
};

const AudioContext = createContext<AudioContextType>({
  audioEnabled: true,
  toggleAudio: () => {},
  speak: () => {}
});

export const useAudio = () => useContext(AudioContext);

type AudioProviderProps = {
  children: ReactNode;
};

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize speech synthesis when the component mounts
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const toggleAudio = () => {
    setAudioEnabled(prev => {
      if (prev && speechSynthesis) {
        // Cancel any ongoing speech when disabling audio
        speechSynthesis.cancel();
      }
      return !prev;
    });
  };

  const speak = (text: string) => {
    if (audioEnabled && speechSynthesis) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();

      // Create a new utterance
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language to Chinese
      utterance.lang = 'zh-CN';
      
      // Speak the text
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <AudioContext.Provider value={{ audioEnabled, toggleAudio, speak }}>
      {children}
    </AudioContext.Provider>
  );
};