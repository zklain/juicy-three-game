import React from 'react';
import { useSphere } from 'use-cannon';
import Cactus from '../Cactus';

export const Obstacle = ({ position, ...props }) => {
  const [ref] = useSphere(() => ({
    position,
    type: 'Dynamic',
    ...props,
  }));

  return <Cactus position={position} />;
};
