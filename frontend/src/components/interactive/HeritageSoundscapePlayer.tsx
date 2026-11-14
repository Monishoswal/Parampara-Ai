import React, { useEffect, useRef } from 'react';

/**
 * Headless Background Audio Engine:
 * - Plays divine Krishna Flute song in the background continuously
 * - Fixed volume locked strictly at 40% (0.40)
 * - Zero visual UI: no pills, no banners, no controls, no settings visible to the user
 * - Auto-plays on website start, with seamless unmuting on initial user interaction
 */
export const HeritageSoundscapePlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Strict fixed volume at 40%
    audio.volume = 0.40;

    // Direct auto-play attempt the moment the site loads
    const startAudio = () => {
      if (audio && audio.paused) {
        audio.volume = 0.40;
        audio.play().catch(() => {
          // Handled gracefully until user gesture
        });
      }
    };

    startAudio();

    // Browser policy: unlock immediately on the very first natural user interaction anywhere
    const gestureEvents = ['click', 'pointerdown', 'keydown', 'touchstart', 'scroll', 'mousemove'];
    const unlockOnGesture = () => {
      if (audio) {
        audio.volume = 0.40;
        if (audio.paused) {
          audio.play().then(() => {
            // Once playing, remove gesture listeners
            gestureEvents.forEach((evt) => {
              window.removeEventListener(evt, unlockOnGesture);
            });
          }).catch(() => {});
        }
      }
    };

    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, unlockOnGesture, { passive: true });
    });

    return () => {
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, unlockOnGesture);
      });
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/audio/krishna_flute.mp3"
      loop
      playsInline
      preload="auto"
      style={{ display: 'none' }}
      aria-hidden="true"
    />
  );
};
