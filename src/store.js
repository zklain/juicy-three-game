import React from 'react';
import create from 'zustand';

export const usePosition = create((set) => ({
  position: React.createRef(),
  setPosition: (position) => set((state) => ({ position })),
  reset: () => set((state) => ({ position: 0 })),
}));
