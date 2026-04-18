'use client';

import { useEffect, useRef, useState } from 'react';
import NPC from './NPC';

const BASE_CID = "https://ipfs.io/ipfs/bafybeide4mwhz4hzck5tnpchd4h5tsexsj6ij4nxddz2jaeqwb3bib5wyy";
const WORLD_WIDTH = 2560;

export default function NPCManager() {
  const [npcs, setNPCs] = useState([]);

  const npcsRef = useRef([]);
  const lastSpawnRef = useRef(0);
  const idRef = useRef(0);

  // 🎲 shuffled pool
  const poolRef = useRef(
    Array.from({ length: 46 }, (_, i) => i + 1)
      .sort(() => Math.random() - 0.5)
  );

  function getNextImage() {
    if (poolRef.current.length === 0) {
      poolRef.current = Array.from({ length: 46 }, (_, i) => i + 1)
        .sort(() => Math.random() - 0.5);
    }

    const i = poolRef.current.pop();
    return `${BASE_CID}/KnuckleheadsOG%23${i}.png`;
  }

  function createNPC() {
    const direction = Math.random() < 0.5 ? 'left' : 'right';
    
    const depth = Math.random();
    
    let z;
    
    if (depth < 0.33) z = 4;      // behind character
    else if (depth < 0.66) z = 6; // same plane
    else z = 10;                  // in front
    
    const speed = 0.15 + Math.random() * 0.15; // px per ms

    return {
      id: idRef.current++,
      src: getNextImage(),
      direction,
      z: Math.random() < 0.5 ? 4 : 7,
      size: 500,

      x:
        direction === 'right'
          ? -600
          : WORLD_WIDTH + 600,

      speed
    };
  }

  useEffect(() => {
    let raf;

    function loop(time) {
      const now = performance.now();

      let next = [...npcsRef.current];

      // 🎯 SPAWN CONTROL
      if (
        next.length < 3 &&
        now - lastSpawnRef.current > 2500 + Math.random() * 3000
      ) {
        next.push(createNPC());
        lastSpawnRef.current = now;
      }

      // 🎯 UPDATE POSITIONS
      next = next.map(npc => {
        const dir = npc.direction === 'right' ? 1 : -1;

        return {
          ...npc,
          x: npc.x + dir * npc.speed * 16 // approx frame step
        };
      });

      // 🎯 REMOVE OFFSCREEN (TRUE WORLD SPACE)
      next = next.filter(npc => {
        return npc.x > -800 && npc.x < WORLD_WIDTH + 800;
      });

      npcsRef.current = next;
      setNPCs(next);

      raf = requestAnimationFrame(loop);
    }

    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      {npcs.map(npc => (
        <NPC key={npc.id} data={npc} />
      ))}
    </>
  );
}
