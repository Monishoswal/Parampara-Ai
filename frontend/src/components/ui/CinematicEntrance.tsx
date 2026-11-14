import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const CinematicEntrance: React.FC = () => {
  const { hasSeenIntro, setHasSeenIntro, setIsSoundscapePlaying, userProfile } = useApp();
  const [stage, setStage] = useState<'initial' | 'traveling' | 'completed'>('initial');
  const navigate = useNavigate();

  useEffect(() => {
    if (hasSeenIntro) return;

    // After 1.3s, start traveling towards top-left and start background audio
    const travelTimer = setTimeout(() => {
      setStage('traveling');
      setIsSoundscapePlaying(true);
    }, 1300);

    // At 2.6s, complete the entrance, dissolve black curtain, and reveal the 3D Heritage Vault
    const finishTimer = setTimeout(() => {
      setStage('completed');
      setHasSeenIntro(true);
    }, 2600);

    return () => {
      clearTimeout(travelTimer);
      clearTimeout(finishTimer);
    };
  }, [hasSeenIntro]);

  const handleManualEnter = () => {
    setIsSoundscapePlaying(true);
    setStage('traveling');
    setTimeout(() => {
      setStage('completed');
      setHasSeenIntro(true);
    }, 900);
  };

  if (hasSeenIntro || stage === 'completed') {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-curtain"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === 'traveling' ? 0.96 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden select-none cursor-pointer"
        onClick={handleManualEnter}
      >
        {/* ONLY in white: PARAMPARA and nothing else */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            stage === 'traveling'
              ? {
                  x: 'calc(-50vw + 120px)',
                  y: 'calc(-50vh + 32px)',
                  scale: 0.36,
                  opacity: 0.92,
                }
              : {
                  x: 0,
                  y: 0,
                  scale: 1,
                  opacity: 1,
                }
          }
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative z-20 flex items-center justify-center"
        >
          <span className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.25em] text-white">
            PARAMPARA
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
