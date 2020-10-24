import create from 'zustand';

export const usePosition = create((set) => ({
  position: [0, 0, 0],
  lastPosistion: [],
  score: 0,
  speed: 10,
  setPosition: (position) => set((state) => ({ position })),
  setLastPosition: (lastPosition) => set((state) => ({ lastPosition })),
  incrementScore: () => set((state) => ({ score: state.score + 100 })),
  reset: () => set((state) => ({ position: 0 })),
}));
