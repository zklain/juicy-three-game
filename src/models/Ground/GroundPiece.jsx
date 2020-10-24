import { Plane } from '@react-three/drei';
import React, { useRef } from 'react';
import { usePlane } from 'use-cannon';
import {
  GROUND_PIECE_LEN,
  GROUND_PIECE_WIDTH,
  LEFT_BOUNDARY,
  RIGHT_BOUNDDARY,
} from '../../constants';
import { Obstacle } from '../Obstactes';

const generateObstaclePositions = (position) => {
  const positions = [...new Array(5)].map((_, i) => {
    const [x, y, z] = position;

    const obsX = LEFT_BOUNDARY + Math.random() * 10;
    const obsZ = z + Math.random() * (GROUND_PIECE_LEN - z);
    return [obsX, y + 1.25, obsZ];
  });

  console.log(positions);

  return positions;
};

const GroundPiece = ({ position, ...props }) => {
  const [ref] = usePlane(() => ({
    position,
    type: 'Dynamic',
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));

  let obstaclesPositions = useRef(generateObstaclePositions(position));

  return (
    <group>
      <Plane
        args={[GROUND_PIECE_WIDTH, GROUND_PIECE_LEN]}
        ref={ref}
        receiveShadow>
        <meshStandardMaterial attach='material' color='#ffda8b' />
      </Plane>
      {obstaclesPositions.current.map((position) => (
        <Obstacle key={position[2]} position={position} />
      ))}
    </group>
  );
};

export default GroundPiece;
