"use client";

import { create } from "zustand";
import { Howl } from "howler";

export type MusicGenre = "lofi" | "ambient" | "classical" | "jazz" | "rain" | "nature";
export type AmbientSound = "rain" | "ocean" | "forest" | "cafe" | "fire" | null;

interface AudioState {
  isPlaying: boolean;
  currentGenre: MusicGenre;
  ambientSound: AmbientSound;
  volume: number;
  musicPlayer: Howl | null;
  ambientPlayer: Howl | null;
  
  // Actions
  setGenre: (genre: MusicGenre) => void;
  setAmbientSound: (sound: AmbientSound) => void;
  setVolume: (volume: number) => void;
  togglePlay: () => void;
  playMusic: () => void;
  pauseMusic: () => void;
  stopAll: () => void;
}

// Music URLs (in production, these would be actual audio files or streaming URLs)
const musicUrls: Record<MusicGenre, string> = {
  lofi: "/audio/lofi.mp3",
  ambient: "/audio/ambient.mp3",
  classical: "/audio/classical.mp3",
  jazz: "/audio/jazz.mp3",
  rain: "/audio/rain.mp3",
  nature: "/audio/nature.mp3",
};

const ambientUrls: Record<Exclude<AmbientSound, null>, string> = {
  rain: "/audio/ambient/rain.mp3",
  ocean: "/audio/ambient/ocean.mp3",
  forest: "/audio/ambient/forest.mp3",
  cafe: "/audio/ambient/cafe.mp3",
  fire: "/audio/ambient/fire.mp3",
};

export const useAudioStore = create<AudioState>((set, get) => ({
  isPlaying: false,
  currentGenre: "lofi",
  ambientSound: null,
  volume: 50,
  musicPlayer: null,
  ambientPlayer: null,

  setGenre: (genre) => {
    const { musicPlayer, isPlaying, volume } = get();
    
    // Stop current player
    if (musicPlayer) {
      musicPlayer.stop();
      musicPlayer.unload();
    }

    // Create new player
    const newPlayer = new Howl({
      src: [musicUrls[genre]],
      html5: true,
      loop: true,
      volume: volume / 100,
    });

    if (isPlaying) {
      newPlayer.play();
    }

    set({ currentGenre: genre, musicPlayer: newPlayer });
  },

  setAmbientSound: (sound) => {
    const { ambientPlayer, volume } = get();

    // Stop current ambient
    if (ambientPlayer) {
      ambientPlayer.stop();
      ambientPlayer.unload();
    }

    if (sound === null) {
      set({ ambientSound: null, ambientPlayer: null });
      return;
    }

    // Create new ambient player
    const newPlayer = new Howl({
      src: [ambientUrls[sound]],
      html5: true,
      loop: true,
      volume: (volume / 100) * 0.3, // Ambient sounds at 30% of main volume
    });

    newPlayer.play();
    set({ ambientSound: sound, ambientPlayer: newPlayer });
  },

  setVolume: (volume) => {
    const { musicPlayer, ambientPlayer } = get();
    
    if (musicPlayer) {
      musicPlayer.volume(volume / 100);
    }
    
    if (ambientPlayer) {
      ambientPlayer.volume((volume / 100) * 0.3);
    }

    set({ volume });
  },

  togglePlay: () => {
    const { isPlaying, musicPlayer } = get();

    if (!musicPlayer) return;

    if (isPlaying) {
      musicPlayer.pause();
      set({ isPlaying: false });
    } else {
      musicPlayer.play();
      set({ isPlaying: true });
    }
  },

  playMusic: () => {
    const { musicPlayer } = get();
    if (musicPlayer) {
      musicPlayer.play();
      set({ isPlaying: true });
    }
  },

  pauseMusic: () => {
    const { musicPlayer } = get();
    if (musicPlayer) {
      musicPlayer.pause();
      set({ isPlaying: false });
    }
  },

  stopAll: () => {
    const { musicPlayer, ambientPlayer } = get();
    
    if (musicPlayer) {
      musicPlayer.stop();
    }
    
    if (ambientPlayer) {
      ambientPlayer.stop();
    }

    set({ isPlaying: false });
  },
}));
