'use client';

import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useVoice } from '@/hooks/useVoice';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const VoiceInput: React.FC = () => {
  const { isListening, startListening, transcript } = useVoice();

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <div className="relative">
        {isListening && (
          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75" />
        )}
        <button
          onClick={startListening}
          disabled={isListening}
          className={cn(
            'relative z-10 p-8 rounded-full transition-all duration-300 shadow-2xl border-4',
            isListening 
              ? 'bg-red-600 border-red-400 scale-110' 
              : 'bg-white border-gray-100 hover:scale-105 active:scale-95'
          )}
        >
          {isListening ? (
            <Mic size={48} className="text-white" />
          ) : (
            <MicOff size={48} className="text-gray-400" />
          )}
        </button>
      </div>

      <div className="h-12 flex flex-col items-center text-center">
        <p className={cn(
          "text-lg font-bold transition-colors duration-300",
          isListening ? "text-red-600 animate-pulse" : "text-gray-600"
        )}>
          {isListening ? 'Listening for commands...' : 'Tap for Voice Activation'}
        </p>
        {transcript && (
          <p className="text-sm text-gray-400 font-medium italic mt-1">
            "{transcript}"
          </p>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {['Medical', 'Fire', 'Police', 'Disaster'].map((key) => (
          <span key={key} className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full border border-gray-200">
            {key}
          </span >
        ))}
      </div>
    </div>
  );
};
