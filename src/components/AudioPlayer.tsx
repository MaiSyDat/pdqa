import { useEffect, useRef, useState } from 'react';
import { Theme } from '../types';

const SONG_URL = "/music/i thought i saw your face today (piano cover).mp3";

interface AudioPlayerProps {
  theme: Theme;
}

export default function AudioPlayer({ theme }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Helper reference to prevent stale closures
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Initialize audio instance
  const initAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(SONG_URL);
    audio.loop = true; // Loop this single song continuously
    audio.volume = 0.25; // Soft background music volume
    audioRef.current = audio;

    audio.addEventListener('error', (e) => {
      console.warn("Lỗi tải nhạc nền:", e);
    });

    if (isPlayingRef.current) {
      audio.play().catch((err) => {
        console.warn("Autoplay was blocked by browser or is loading:", err);
      });
    }
  };

  useEffect(() => {
    initAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle play-bgm custom event from intro
  useEffect(() => {
    const handleGlobalPlay = () => {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.warn("Global autoplay failed:", err);
        });
      }
    };

    window.addEventListener('play-bgm', handleGlobalPlay);
    return () => {
      window.removeEventListener('play-bgm', handleGlobalPlay);
    };
  }, []);

  // Handle browser autoplay block by playing on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (isPlaying && audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch((err) => {
          console.warn("Playback resumed on user interaction:", err);
        });
      }
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlaying]);

  // Sync isPlaying state to active audio ref
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn("Play state sync failed:", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Render nothing as user requested removing the mute/unmute visual controller button
  return null;
}
