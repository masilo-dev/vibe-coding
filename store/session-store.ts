"use client";

import { create } from "zustand";

interface SessionState {
  isActive: boolean;
  startTime: number | null;
  elapsedTime: number;
  sessionLength: number; // in minutes
  isBreak: boolean;
  interruptions: number;
  
  // Actions
  startSession: (length?: number) => void;
  pauseSession: () => void;
  resumeSession: () => void;
  endSession: () => void;
  addInterruption: () => void;
  startBreak: (length?: number) => void;
  updateElapsedTime: () => void;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  isActive: false,
  startTime: null,
  elapsedTime: 0,
  sessionLength: 25,
  isBreak: false,
  interruptions: 0,

  startSession: (length = 25) => {
    set({
      isActive: true,
      startTime: Date.now(),
      elapsedTime: 0,
      sessionLength: length,
      isBreak: false,
      interruptions: 0,
    });
  },

  pauseSession: () => {
    const { elapsedTime } = get();
    set({
      isActive: false,
      startTime: null,
    });
  },

  resumeSession: () => {
    set({
      isActive: true,
      startTime: Date.now(),
    });
  },

  endSession: () => {
    set({
      isActive: false,
      startTime: null,
      elapsedTime: 0,
      interruptions: 0,
    });
  },

  addInterruption: () => {
    set((state) => ({
      interruptions: state.interruptions + 1,
    }));
  },

  startBreak: (length = 5) => {
    set({
      isActive: true,
      startTime: Date.now(),
      elapsedTime: 0,
      sessionLength: length,
      isBreak: true,
      interruptions: 0,
    });
  },

  updateElapsedTime: () => {
    const { startTime, isActive } = get();
    if (isActive && startTime) {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      set({ elapsedTime: elapsed });
    }
  },
}));
