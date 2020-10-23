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

const SPEED = 40;
const GROUND_PIECE_LEN = 50;

const Ground = () => {
  const groundPieces = [...Array(3)].map((_, i) => {
    return <GroundPiece position={[0, 0, -i * 50]} key={i} />;
  });

  useFrame(({ clock }) => {
    // ref.current.rotation.y += 1;
    // console.log('TIME', clock.elapsedTime);
    // todo: reset when end of plane
  });

  const [current, setCurrent] = useState();
  useEffect(() => {}, [current]);

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
    const { z } = ref.current.position;
    ref.current.position.copy(new Vector3(0, 0, z + clock.elapsedTime * 10));
  });
  // const texture = new TextureLoader().load(grass);
  // texture.wrapS = RepeatWrapping;
  // texture.wrapT = RepeatWrapping;
  // texture.repeat.set(200, 200);

  return (
    <Plane args={[10, 50]} ref={ref} receiveShadow>
      <meshStandardMaterial
        attach='material'
        color='cyan'
        roughness={0.8}
        metalness={0.3}
      />
    </Plane>
  );
};

const SkyBox = () => {
  const texture = new TextureLoader().load(desert);
  return (
    <Box args={[3000, 3000, 3000]} position={[0, 0, 0]}>
      <meshStandardMaterial color={'violet'} side={BackSide} />
      {/* <meshStandardMaterial map={texture} side={BackSide} />
      <meshStandardMaterial map={texture} side={BackSide} />
      <meshStandardMaterial map={texture} side={BackSide} />
      <meshStandardMaterial map={texture} side={BackSide} />
      <meshStandardMaterial map={texture} side={BackSide} /> */}
    </Box>
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
