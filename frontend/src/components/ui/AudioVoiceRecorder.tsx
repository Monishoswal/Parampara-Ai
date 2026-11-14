import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mic, Square, Play, Pause, Trash2, Upload, AlertCircle, CheckCircle2, Volume2 } from 'lucide-react';

interface AudioVoiceRecorderProps {
  onAudioReady: (audioBlob: Blob, filename?: string) => void;
  languageHint?: string;
}

export const AudioVoiceRecorder: React.FC<AudioVoiceRecorderProps> = ({
  onAudioReady,
  languageHint = 'hi',
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    setPermissionError(null);
    audioChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        onAudioReady(audioBlob, 'voice_recording.mp3');
        // Stop audio tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      timerIntervalRef.current = window.setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.warn('Microphone permission error or unavailable:', err);
      setPermissionError(
        'Microphone access is blocked or unavailable in this browser. You can use the file upload option below or select a prepared oral history sample.'
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }
  };

  const deleteRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setUploadedFileName(null);
    setRecordingDuration(0);
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    if (!audioElementRef.current && audioUrl) {
      const audio = new Audio(audioUrl);
      audioElementRef.current = audio;
      audio.onended = () => setIsPlaying(false);
    }

    if (audioElementRef.current) {
      if (isPlaying) {
        audioElementRef.current.pause();
        setIsPlaying(false);
      } else {
        audioElementRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      onAudioReady(file, file.name);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-surface rounded-lg p-6 border border-border shadow-card space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-ink">Spoken Story & Technique Capture</h3>
          <p className="text-xs text-muted mt-0.5">
            Record in your native Indian dialect ({languageHint.toUpperCase()}). Spoken narratives are transcribed by Gemini 3.5 Transcribe.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-terracotta/10 text-terracotta border border-terracotta/20">
          Oral Heritage Studio
        </span>
      </div>

      {permissionError && (
        <div className="p-3.5 rounded-md bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>{permissionError}</span>
        </div>
      )}

      {/* Main Recording Surface */}
      <div className="bg-paper rounded-md p-6 border border-border/70 flex flex-col items-center justify-center text-center space-y-4">
        {!audioUrl ? (
          <>
            <div className="relative">
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                  isRecording
                    ? 'bg-rose-600 text-white ring-4 ring-rose-200'
                    : 'bg-terracotta hover:bg-terracotta-hover text-white'
                }`}
                title={isRecording ? 'Stop Recording' : 'Start Microphone Recording'}
              >
                {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
            </div>

            {/* Smooth animated audio waveform bars during active recording */}
            {isRecording && (
              <div className="flex items-center justify-center gap-1.5 h-12 w-full max-w-xs">
                {[12, 28, 40, 20, 36, 16, 32, 24, 44, 18, 30, 22, 38, 14, 26, 34].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: [h * 0.3, h, h * 0.2],
                    }}
                    transition={{
                      duration: 0.6 + (i % 4) * 0.15,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                    }}
                    className="w-1.5 bg-rose-500 rounded-full"
                  />
                ))}
              </div>
            )}

            <div className="text-sm font-semibold text-ink">
              {isRecording ? (
                <div className="flex items-center gap-2 text-rose-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                  Recording oral narrative... {formatTime(recordingDuration)}
                </div>
              ) : (
                'Click microphone to record oral tradition memory'
              )}
            </div>
            <p className="text-xs text-muted max-w-sm">
              Speak naturally about your master lineage, materials sourcing, or secrets of technique execution.
            </p>
          </>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-between p-4 bg-surface rounded-md border border-border">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlayback}
                  className="w-10 h-10 rounded-full bg-terracotta hover:bg-terracotta-hover text-white flex items-center justify-center shadow-sm transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <div className="text-left">
                  <div className="text-sm font-semibold text-ink flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-sage" />
                    <span>{uploadedFileName || 'Recorded Oral History'}</span>
                  </div>
                  <span className="text-xs text-muted font-mono">
                    {recordingDuration > 0 ? formatTime(recordingDuration) : 'Audio ready for Gemini transcription'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={deleteRecording}
                className="p-2 text-muted hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                title="Discard audio and re-record"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Alternative File Upload */}
      {!isRecording && !audioUrl && (
        <div className="pt-2 flex items-center justify-between text-xs text-muted">
          <span>Or upload a recorded audio interview:</span>
          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border hover:bg-paper text-ink font-medium transition-colors">
            <Upload className="w-3.5 h-3.5 text-muted" />
            <span>Select Audio File</span>
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      )}
    </div>
  );
};
