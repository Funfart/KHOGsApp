'use client';

import { useEffect, useState, useRef } from 'react';
import NPC from './NPC';

const BASE_CID = "https://ipfs.io/ipfs/bafybeide4mwhz4hzck5tnpchd4h5tsexsj6ij4nxddz2jaeqwb3bib5wyy";

export default function NPCManager() {
  const [npcs, setNPCs] = useState([]);

  const idRef = useRef(0);
  const activeRef = useRef(true);
  const loopRef = useRef(null);

  // 🎲 PRE-SHUFFLED IMAGE POOL (NO REPEAT FEEL)
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
    const z = Math.random() < 0.5 ? 4 : 7;

    return {
      id: idRef.current++,
      src: getNextImage(),
      direction,
      z,
      size: 500,

      duration: 8000 + Math.random() * 4000
    };
  }

  useEffect(() => {
    activeRef.current = true;

    function spawn() {
      if (!activeRef.current) return;

      setNPCs(prev => {
        if (prev.length >= 3) return prev;
        return [...prev, createNPC()];
      });

      const delay = 3000 + Math.random() * 4000;
      loopRef.current = setTimeout(spawn, delay);
    }

    spawn();

    return () => {
      activeRef.current = false;
      clearTimeout(loopRef.current); // 🔥 CRITICAL FIX
    };
  }, []);

  function removeNPC(id) {
    setNPCs(prev => prev.filter(n => n.id !== id));
  }

  return (
    <>
      {npcs.map(npc => (
        <NPC key={npc.id} data={npc} onExit={removeNPC} />
      ))}
    </>
  );
}
