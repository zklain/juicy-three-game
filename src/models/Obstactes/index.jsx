import React from 'react';
import { useSphere } from 'use-cannon';
import Cactus from '../Cactus';

export const Obstacle = ({ position, ...props }) => {
  const [ref] = useSphere(() => ({
    id: 'Obstacle=1245',
    position,
    type: 'Dynamic',
    ...props,
    collisionFilterGroup: 3,
  }));

  return <Cactus position={position} />;
};
