import { Box } from '@react-three/drei';
import React, { useEffect } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { Vector3 } from 'three';
import { useSphere } from 'use-cannon';
import { usePosition } from '../store';

const Player = (props) => {
  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 2, 20],
    ...props,
  }));

  const position = usePosition((state) => state.position);
  const setPosition = usePosition((state) => state.setPosition);
  const incrementScore = usePosition((state) => state.incrementScore);

  useEffect(() => {
    api.position.subscribe((p) => setPosition(p));

    // api.velocity.set(0, 0, -10);
  }, []);

  useFrame(({ clock }) => {
    const { x, y, z } = ref.current.position;
    camera.position.copy(new Vector3(x, y + 1.5, z + 3));

    if (Math.round(position[2]) % 100 === 0) {
      incrementScore();
    }
  });

  return (
    <Box ref={ref}>
      <meshStandardMaterial attach='material' color='hotpink' />
    </Box>
  );
};

export default Player;
