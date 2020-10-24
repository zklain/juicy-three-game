import { Box, PointerLockControls } from '@react-three/drei';
import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { BackSide, TextureLoader } from 'three';
import { Physics } from 'use-cannon';
import './index.css';
import { Camera } from './models/Camera';
import desert from './models/desert.jpg';
import Ground from './models/Ground/Ground';
// import { Ground } from './models/Ground';
import Player from './models/Player';
import { usePosition } from './store';
const SkyBox = () => {
  const texture = new TextureLoader().load(desert);
  return (
    <Box args={[3000, 3000, 3000]} position={[0, 0, 0]}>
      <meshStandardMaterial color={'salmon'} side={BackSide} />
    </Box>
  );
};

function App() {
  const score = usePosition((state) => state.score);
  return (
    <div className='hud'>
      <div className='score'>{score}</div>
      <Canvas shadowMap gl={{ alpha: false }}>
        <Camera distance={3000} fov={50} />
        <ambientLight intensity={0.9} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <SkyBox />
        <Physics>
          <Suspense fallback={null}>
            <Ground />
            <Player />
          </Suspense>
        </Physics>
        <PointerLockControls />
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
