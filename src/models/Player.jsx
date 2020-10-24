import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { Vector3 } from 'three';
import {
  useBox,
  useCompoundBody,
  useConvexPolyhedron,
  useParticle,
  useSphere,
} from 'use-cannon';
import { SPEED } from '../constants';
import { usePosition } from '../store';
import TylerTrex from './TylerTrex';
import { usePlayerControls } from '../controls/useControls';
const Player = (props) => {
  const { camera } = useThree();
  const { moveForward, moveLeft, moveRight, jump } = usePlayerControls();

  const [ref, api] = useParticle(() => ({
    mass: 1000,
    size: [20, 20, 20],
    type: 'Dynamic',
    position: [-4, 2, 7],
    // collisionResponse: true,
    // boundingBox: [100, 100, 100],
    ...props,
    onCollide: (e) => {
      if (e.collisionFilters.bodyFilterGroup === 3) {
        // alert('COLLIDE!');
        console.log(e);
      }
    },
  }));

  const position = usePosition((state) => state.position);
  const setPosition = usePosition((state) => state.setPosition);
  const incrementScore = usePosition((state) => state.incrementScore);

  const velocity = useRef([0, 0, 0]);

  useEffect(() => {
    // todo: ref.current for positions
    api.position.subscribe((p) => setPosition(p));
    api.velocity.set(0, 0, -30);
    api.velocity.subscribe((v) => (velocity.current = v));
  }, []);

  useFrame(({ clock }) => {
    const { x, y, z } = ref.current.position;
    camera.position.copy(new Vector3(x, y + 2.5, z + 5));

    const direction = new Vector3();
    const frontVector = new Vector3(0, 0, -Number(moveForward) * SPEED);
    const sideVector = new Vector3(Number(moveLeft) - Number(moveRight), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    if (Math.round(position[2]) % 100 === 0) {
      incrementScore();
    }
    // api.position.set(new Vector3(direction.x, dwwdirection.y, z - 0.5));

    // if (jump) {
    //   api.velocity.set(velocity.current[0], 10, velocity.current[2]);
    // }

    // if (jump && Math.abs)
    api.velocity.set(direction.x, velocity.current[1], -30);
  });

  return (
    <group ref={ref}>
      <TylerTrex />
    </group>
  );
};

export default Player;
