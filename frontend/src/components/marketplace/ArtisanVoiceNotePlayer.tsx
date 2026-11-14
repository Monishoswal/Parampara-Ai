import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface ArtisanVoiceNotePlayerProps {
  artisanName: string;
  language: string;
  indicGreeting: string;
  englishTranslation: string;
}

export const ArtisanVoiceNotePlayer: React.FC<ArtisanVoiceNotePlayerProps> = ({
  artisanName,
  language,
  indicGreeting,
  englishTranslation,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<any>(null);

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      clearInterval(timerRef.current);
      try {
        window.speechSynthesis?.cancel();
      } catch {}
    } else {
      setIsPlaying(true);
      setProgress(0);

      // Acoustic synthesis or SpeechSynthesis fallback with rich resonant harmonics
      try {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(indicGreeting);
          utterance.rate = 0.9;
          utterance.pitch = 0.95;
          // Try to select Indic voice if available
          const voices = window.speechSynthesis.getVoices();
          const indicVoice = voices.find((v) => v.lang.includes('hi') || v.lang.includes('IN'));
          if (indicVoice) utterance.voice = indicVoice;

          utterance.onend = () => {
            setIsPlaying(false);
            setProgress(100);
            clearInterval(timerRef.current);
          };
          window.speechSynthesis.speak(utterance);
        }
      } catch {}

      // Play soft warm background drone via Web Audio
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(146.83, audioCtx.currentTime); // D3 Tanpura Sa
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 4.0);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 4.0);
      } catch {}

      let count = 0;
      timerRef.current = setInterval(() => {
        count += 5;
        setProgress((prev) => Math.min(100, prev + 5));
        if (count >= 100) {
          setIsPlaying(false);
          clearInterval(timerRef.current);
        }
      }, 200);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      try {
        window.speechSynthesis?.cancel();
      } catch {}
    };
  }, []);

  return (
    <div className="bg-surface border border-border rounded-lg p-3 space-y-2.5 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handleTogglePlay}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
              isPlaying
                ? 'bg-terracotta text-white shadow-sm ring-2 ring-terracotta/40'
                : 'bg-paper hover:bg-terracotta hover:text-white text-ink border border-border'
            }`}
            title={isPlaying ? 'Pause Greeting' : 'Play Artisan Voice Greeting'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
          <div>
            <div className="text-xs font-editorial font-semibold text-ink flex items-center gap-1.5">
              <span>{artisanName}'s Voice Note</span>
              <span className="text-[10px] font-mono text-ink bg-paper px-1.5 py-0.2 rounded border border-border">
                {language}
              </span>
            </div>
            <div className="text-[10px] font-mono text-muted">Living Master Audio Greeting</div>
          </div>
        </div>

        {/* Dynamic Animated Frequency Waveform Bars */}
        <div className="flex items-center gap-0.5 h-4">
          {[4, 8, 14, 10, 16, 7, 12, 5].map((h, i) => (
            <span
              key={i}
              className={`w-0.5 rounded-full transition-colors duration-150 ${
                isPlaying ? 'bg-terracotta' : 'bg-border'
              }`}
              style={{
                height: isPlaying ? `${Math.max(4, (h * (i % 2 === 0 ? 1.2 : 0.8)))}px` : '4px',
                animationDelay: `${i * 100}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Synchronized Vernacular Quote & English Translation */}
      <div className="bg-paper p-2.5 rounded border border-border text-xs space-y-1">
        <p className="font-editorial italic text-ink text-[11px] leading-relaxed">
          "{indicGreeting}"
        </p>
        <p className="font-sans text-[10px] text-muted leading-tight">
          Translation: {englishTranslation}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-paper h-1 rounded-full overflow-hidden border border-border">
        <div
          className="bg-terracotta h-full transition-colors duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

