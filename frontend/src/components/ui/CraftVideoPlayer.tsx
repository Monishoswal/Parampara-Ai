import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  Film,
  Clock,
  CheckCircle2,
  ExternalLink,
  Layers,
  ChevronRight,
  ChevronLeft,
  AlertCircle
} from 'lucide-react';
import { VideoBookmark } from '../../types';

interface CraftVideoPlayerProps {
  videoUrl?: string;
  youtubeId?: string;
  posterUrl?: string;
  title?: string;
  duration?: string;
  bookmarks?: VideoBookmark[];
  craftName: string;
  artisanName?: string;
  onBookmarkClick?: (stageIndex: number) => void;
}

export const CraftVideoPlayer: React.FC<CraftVideoPlayerProps> = ({
  videoUrl,
  youtubeId = 'NMFaPZAFgUU', // Default to Bidriware Business Insider documentary if unprovided
  posterUrl,
  title,
  duration,
  bookmarks = [],
  craftName,
  artisanName,
  onBookmarkClick,
}) => {
  const [playerMode, setPlayerMode] = useState<'youtube' | 'interactive'>('youtube');
  const [activeBookmarkIndex, setActiveBookmarkIndex] = useState<number>(0);
  const [startSeconds, setStartSeconds] = useState<number>(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(true);

  // Helper to parse "mm:ss" to seconds
  const parseTimestamp = (ts: string): number => {
    const parts = ts.split(':').map(Number);
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }
    return 0;
  };

  // Determine effective YouTube ID:
  // If youtubeId prop is provided, use it; if videoUrl contains a YouTube ID, extract it.
  const getEffectiveYoutubeId = (): string => {
    if (youtubeId) return youtubeId;
    if (videoUrl && (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be'))) {
      const match = videoUrl.match(/(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/);
      if (match && match[1]) return match[1];
    }
    // Fallback to high quality Indian craft documentary on Bidriware
    return 'NMFaPZAFgUU';
  };

  const currentYoutubeId = getEffectiveYoutubeId();

  const handleBookmarkClick = (bm: VideoBookmark, index: number) => {
    const sec = parseTimestamp(bm.timestamp);
    setStartSeconds(sec);
    setActiveBookmarkIndex(index);
    setIsPlayingAuto(true);
    if (onBookmarkClick) {
      onBookmarkClick(index);
    }
  };

  const nextStage = () => {
    if (bookmarks.length === 0) return;
    const nextIdx = (activeBookmarkIndex + 1) % bookmarks.length;
    handleBookmarkClick(bookmarks[nextIdx], nextIdx);
  };

  const prevStage = () => {
    if (bookmarks.length === 0) return;
    const prevIdx = (activeBookmarkIndex - 1 + bookmarks.length) % bookmarks.length;
    handleBookmarkClick(bookmarks[prevIdx], prevIdx);
  };

  return (
    <div className="relative rounded-lg overflow-hidden bg-stone-950 border border-stone-800 shadow-card">
      {/* Top Header Bar with Mode Toggles */}
      <div className="p-3 bg-stone-900 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs font-mono bg-stone-950 text-amber-300 border border-amber-500/30">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            Verified documentary archive
          </span>
          {duration && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-mono text-stone-400 bg-stone-950 border border-stone-800">
              <Clock className="w-3 h-3 text-amber-400" />
              {duration} Masterclass
            </span>
          )}
        </div>

        {/* Player Mode Switcher */}
        <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-md border border-stone-800 text-xs">
          <button
            type="button"
            onClick={() => setPlayerMode('youtube')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
              playerMode === 'youtube'
                ? 'bg-stone-100 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Documentary Film</span>
          </button>
          <button
            type="button"
            onClick={() => setPlayerMode('interactive')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
              playerMode === 'interactive'
                ? 'bg-stone-100 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Step-by-Step Simulator</span>
          </button>
        </div>
      </div>

      {/* Main Video Viewport */}
      <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
        {playerMode === 'youtube' ? (
          <div className="w-full h-full relative">
            <iframe
              key={`${currentYoutubeId}-${startSeconds}`}
              src={`https://www.youtube-nocookie.com/embed/${currentYoutubeId}?autoplay=${isPlayingAuto ? '1' : '0'}&start=${startSeconds}&rel=0&modestbranding=1&enablejsapi=1`}
              title={`${craftName} Traditional Craft Documentary`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0 absolute inset-0"
            />
          </div>
        ) : (
          /* Interactive Process Walkthrough Mode */
          <div className="relative w-full h-full">
            <img
              src={posterUrl || '/images/heritage/workshop_bidriware.jpg'}
              alt={`${craftName} Stage`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

            {/* Stage Info Card Overlay */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-md bg-stone-950/90 border border-stone-800 backdrop-blur-sm shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-amber-400">
                    Stage {activeBookmarkIndex + 1} of {bookmarks.length || 4}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    Time: {bookmarks[activeBookmarkIndex]?.timestamp || '0:00'}
                  </span>
                </div>
                <h4 className="text-base font-editorial text-stone-100">
                  {bookmarks[activeBookmarkIndex]?.label || `${craftName} Handcraft Stage`}
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {bookmarks[activeBookmarkIndex]?.desc || 'Traditional technique executed by certified master artisan lineage.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevStage}
                  className="p-2 rounded-md bg-stone-800 hover:bg-stone-700 text-white transition-colors"
                  title="Previous Stage"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextStage}
                  className="p-2 rounded-md bg-terracotta hover:bg-terracotta-hover text-white transition-colors font-medium flex items-center gap-1 text-xs px-3"
                >
                  <span>Next stage</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Process Chapter Bookmarks */}
      {bookmarks.length > 0 && (
        <div className="p-3 bg-stone-900 border-t border-stone-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-amber-400 flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5" />
              Documented process stages:
            </span>
            <span className="text-[11px] font-mono text-stone-400">
              {bookmarks.length} Stages Bookmarked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {bookmarks.map((bm, idx) => {
              const isActive = activeBookmarkIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleBookmarkClick(bm, idx)}
                  className={`text-left p-2.5 rounded-md border transition-colors text-xs flex flex-col gap-1 ${
                    isActive
                      ? 'bg-stone-800 border-stone-600 text-white'
                      : 'bg-stone-950 border-stone-850 text-stone-300 hover:bg-stone-850 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium text-stone-200 flex items-center gap-1 truncate text-xs">
                      {isActive && <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />}
                      {bm.label}
                    </span>
                    <span className="font-mono text-[10px] px-1 py-0.2 bg-stone-900 text-amber-300 rounded-sm">
                      {bm.timestamp}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 line-clamp-1">{bm.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer Info & Credit */}
      <div className="px-3.5 py-2 bg-stone-950 border-t border-stone-800 flex flex-wrap items-center justify-between text-xs text-stone-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="font-mono text-[11px]">Curated Heritage Footage • {craftName}</span>
        </div>
        {artisanName && (
          <div className="text-[11px]">
            Demonstrated by: <strong className="text-stone-200">{artisanName}</strong>
          </div>
        )}
      </div>
    </div>
  );
};
