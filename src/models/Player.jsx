import { Box } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { Vector3 } from 'three';
import { useSphere } from 'use-cannon';

const Player = (props) => {
  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 2, 0],
    ...props,
  }));

  useFrame(({ clock }) => {
    const { x, y, z } = ref.current.position;
    // ref.current.rotation.copy(camera.rotation);
    // ref.current.position.copy(new Vector3(x, y, 10));
    camera.position.copy(new Vector3(x, y + 1.5, z + 3));
  });

  return (
    <Box ref={ref}>
      <meshStandardMaterial attach='material' color='hotpink' />
    </Box>
  );
};

export default Player;

//todo: restrict rotation
