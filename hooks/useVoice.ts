import { useState, useCallback, useEffect } from 'react';
import { useEmergencyStore, EmergencyType } from '@/store/emergencyStore';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const useVoice = () => {
  const [isListening, setIsListening] = useState(false);
  const setEmergencyType = useEmergencyStore((state) => state.setEmergencyType);
  const [transcript, setTranscript] = useState('');

  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const command = event.results[0][0].transcript.toLowerCase();
      setTranscript(command);

      if (command.includes('medical') || command.includes('doctor') || command.includes('ambulance')) {
        setEmergencyType('Medical');
      } else if (command.includes('fire') || command.includes('smoke')) {
        setEmergencyType('Fire');
      } else if (command.includes('police') || command.includes('help') || command.includes('crime')) {
        setEmergencyType('Police');
      } else if (command.includes('disaster') || command.includes('earthquake') || command.includes('flood')) {
        setEmergencyType('Disaster');
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }, [setEmergencyType]);

  return { isListening, startListening, transcript };
};
