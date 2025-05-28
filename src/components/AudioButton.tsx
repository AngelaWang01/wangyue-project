import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';

type AudioButtonProps = {
  text?: string;
};

const AudioButton: React.FC<AudioButtonProps> = ({ text }) => {
  const { audioEnabled, toggleAudio, speak } = useAudio();

  const handleClick = () => {
    toggleAudio();
    speak(audioEnabled ? '语音已关闭' : '语音已开启');
  };

  const handleSpeakText = () => {
    if (text) {
      speak(text);
    }
  };

  if (text) {
    return (
      <button 
        className="audio-btn"
        onClick={handleSpeakText}
        aria-label="朗读文本"
      >
        <Volume2 size={24} />
      </button>
    );
  }

  return (
    <button 
      className="audio-btn"
      onClick={handleClick}
      aria-label={audioEnabled ? '关闭语音' : '开启语音'}
    >
      {audioEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </button>
  );
};

export default AudioButton;