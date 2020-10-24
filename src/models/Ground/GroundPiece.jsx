import { Plane } from '@react-three/drei';
import React, { useRef } from 'react';
import { usePlane } from 'use-cannon';
import { GROUND_PIECE_LEN, GROUND_PIECE_WIDTH } from '../../constants';
import { Obstacle } from '../Obstactes';

const GroundPiece = ({ position, ...props }) => {
  const [ref] = usePlane(() => ({
    position,
    type: 'Dynamic',
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));

  let obstaclesPositions = useRef(
    [...new Array(3)].map((_, i) => {
      const [x, y, z] = position;

      const obsX = x + i;
      const obsY = y + 1.5;
      const obsZ = z + i;

      return [obsX, obsY, obsZ];
    })
  );

  return (
    <group>
      <Plane
        args={[GROUND_PIECE_WIDTH, GROUND_PIECE_LEN]}
        ref={ref}
        receiveShadow>
        <meshStandardMaterial attach='material' color='#fccc39' />
      </Plane>
      {obstaclesPositions.current.map((position) => (
        <Obstacle key={position[2]} position={position} />
      ))}
    </group>
  );
};

export default GroundPiece;
