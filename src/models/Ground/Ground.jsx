import React, { useEffect, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { GROUND_PIECE_LEN, OF_PIECES } from '../../constants';
import { usePosition } from '../../store';
import GroundPiece from './GroundPiece';

const Ground = () => {
  const position = usePosition((state) => state.position);
  const lastPosition = usePosition((state) => state.lastPosition);
  const setLastPosition = usePosition((state) => state.setLastPosition);

  const [groundPieces, setGroundPieces] = useState([]);

  useEffect(() => {
    const positions = [...Array(OF_PIECES)].map((_, i) => {
      const position = [0, 0, -i * GROUND_PIECE_LEN];
      // last piece
      if (i === OF_PIECES - 1) {
        setLastPosition(position);
      }

      return position;
    });

    setGroundPieces(
      positions.map((position, i) => {
        return <GroundPiece position={position} key={i} />;
      })
    );
  }, []);

  useFrame(() => {
    const playerZ = position[2];
    const lastZ = lastPosition[2];

    if (playerZ < lastZ + GROUND_PIECE_LEN * 2) {
      console.log('PLAYER', playerZ);
      console.log('LAST', lastZ);
      console.log('ADDING');
      const newLastPosition = [0, 0, lastZ - GROUND_PIECE_LEN];
      setLastPosition(newLastPosition);
      setGroundPieces([
        ...groundPieces.slice(1),
        <GroundPiece position={newLastPosition} key={lastZ} />,
      ]);
    }
  });

  return <group>{groundPieces.map((_, index) => groundPieces[index])}</group>;
};
export default Ground;
