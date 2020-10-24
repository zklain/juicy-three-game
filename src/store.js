import React from 'react';
import create from 'zustand';

export const usePosition = create((set) => ({
  position: [0, 0, 0],
  lastPosistion: [],
  setPosition: (position) => set((state) => ({ position })),
  setLastPosition: (lastPosition) => set((state) => ({ lastPosition })),
  reset: () => set((state) => ({ position: 0 })),
}));
