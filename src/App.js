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
import grass from './models/deserttext.jpg';
import desert from './models/desert.jpg';
import { usePlane } from 'use-cannon';
import { usePosition } from './store';
import { Sphere } from 'drei';

const SPEED = 10;
const GROUND_PIECE_LEN = 50;
const OF_PIECES = 4;

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
      const position = [0, 0, -i * 50];
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
        <GroundPiece position={newLastPosition} color='red' key={lastZ} />,
      ]);
    }
  });

  return <group>{groundPieces.map((_, index) => groundPieces[index])}</group>;
};

const GroundPiece = ({ position, ...props }) => {
  const [ref] = usePlane(() => ({
    position,
    type: 'Dynamic',
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));

  useFrame(({ clock }) => {
    // const { z } = ref.current.position;
    // ref.current.position.copy(new Vector3(0, 0, z + clock.elapsedTime * SPEED));
  });
  // const texture = new TextureLoader().load(grass);
  // texture.wrapS = RepeatWrapping;
  // texture.wrapT = RepeatWrapping;
  // texture.repeat.set(200, 200);

  return (
    <Plane args={[10, 50]} ref={ref} receiveShadow>
      <meshStandardMaterial
        attach='material'
        color={props.color || 'cyan'}
        roughness={0.8}
        metalness={0.3}
      />
    </Plane>
  );
};

function App() {
  const Obstacles = [...Array(20)].map((i) => {
    return (
      <Box key={i} position={[0, 0, -i * 50]}>
        <meshStandardMaterial attach='material' color='orange' />
      </Box>
    );
  });

  return (
    <Canvas shadowMap gl={{ alpha: false }}>
      <Camera distance={3000} fov={50} />
      {/* <Sky sunPosition={new Vector3(100, 10, -100)} /> */}
      <ambientLight intensity={0.9} />
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
      <SkyBox />
      <Physics>
        <Ground />
        {Obstacles.map((_, i) => (
          <>{Obstacles[i]}</>
        ))}
        <Player />
      </Physics>
      <PointerLockControls />
      {/* <OrbitControls /> */}
    </Canvas>
  );
}

export default App;

// todo: add new plane when reached the end of plane
// todo: start / stop
