import React from 'react';
import { render, act } from '@testing-library/react';
import { AudioProvider, useAudio } from '../AudioContext';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('AudioContext', () => {
  beforeEach(() => {
    // mock speechSynthesis with cancel method
    const mockSpeech: Partial<SpeechSynthesis> = {
      cancel: vi.fn(),
      speak: vi.fn(),
    };
    (globalThis as { speechSynthesis: SpeechSynthesis }).speechSynthesis =
      mockSpeech as SpeechSynthesis;
  });

  it('toggleAudio cancels speech when disabling', () => {
    let context: ReturnType<typeof useAudio> | null = null;
    const Consumer = () => {
      context = useAudio();
      return null;
    };

    render(
      <AudioProvider>
        <Consumer />
      </AudioProvider>
    );

    if (!context) throw new Error('Context not found');

    expect(context.audioEnabled).toBe(true);

    act(() => {
      context!.toggleAudio();
    });

    const { cancel } = (globalThis as { speechSynthesis: SpeechSynthesis }).speechSynthesis;
    expect(cancel).toHaveBeenCalled();
    expect(context!.audioEnabled).toBe(false);
  });
});

