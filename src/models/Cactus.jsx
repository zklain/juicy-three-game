import React from 'react';
import { useGLTF } from '@react-three/drei';

export default ({ position }) => {
  const gltf = useGLTF('/models/cactus/cactus.glb');

  return (
    <group position={position} scale={[1.5, 1.5, 1.5]}>
      <mesh
        material={gltf.materials['DefaultMaterial.002']}
        geometry={gltf.nodes['defaultMaterial'].geometry}
      />
    </group>
  );
};
