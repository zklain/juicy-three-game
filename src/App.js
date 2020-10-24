import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { Canvas, useFrame } from 'react-three-fiber';
import {
  Sky,
  PointerLockControls,
  Box,
  OrbitControls,
  Plane,
} from '@react-three/drei';
import { TextureLoader, Vector3, RepeatWrapping, BackSide, Group } from 'three';
import { Physics, useSphere } from 'use-cannon';
import { Camera } from './models/Camera';
// import { Ground } from './models/Ground';
import Player from './models/Player';
import desert from './models/desert.jpg';
import { usePlane } from 'use-cannon';
import { usePosition } from './store';
import { Sphere } from 'drei';
import Cactus from './models/Cactus';

const SPEED = 10;
const GROUND_PIECE_LEN = 50;
const GROUND_PIECE_WIDTH = 10;
const OF_PIECES = 4;
const LEFT_BOUNDARY = -5;
const RIGHT_BOUNDDARY = 5;

const SkyBox = () => {
  const texture = new TextureLoader().load(desert);
  return (
    <Box args={[3000, 3000, 3000]} position={[0, 0, 0]}>
      <meshStandardMaterial color={'salmon'} side={BackSide} />
    </Box>
  );
};

// SOLUTION 1
// keep position of the last piece
// if the position less then, append new piece

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

  useFrame(({ clock }) => {
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

const Obstacle = ({ position, ...props }) => {
  const [ref] = useSphere(() => ({
    position,
    type: 'Dynamic',
    ...props,
  }));

  return <Cactus position={position} />;
  //   <Box args={[0.5, 3, 0.5]} ref={ref}>
  //     <meshStandardMaterial color='#ff0000' />
  //   </Box>
  // );
};

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
        <meshStandardMaterial attach='material' color={props.color || 'cyan'} />
      </Plane>
      {obstaclesPositions.current.map((position) => (
        <Obstacle key={position[2]} position={position} />
      ))}
    </group>
  );
};

function App() {
  const score = usePosition((state) => state.score);
  return (
    <div className='hud'>
      <div className='score'>{score}</div>
      <Canvas shadowMap gl={{ alpha: false }}>
        <Camera distance={3000} fov={50} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <SkyBox />
        <Physics>
          <Ground />
          <Player />
        </Physics>
        <PointerLockControls />
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}

export default App;

// todo: loading
// todo: skybox
// todo: jumping and movement
// todo: start / stop
// todo: score
// todo: add obstales
// todo: colision
// todo: fog
// todo: animation for
// todo: terrain (how to move if the ground is not just a plane)
// todo: models
