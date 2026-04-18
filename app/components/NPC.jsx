'use client';

import { useEffect, useRef } from 'react';

const WORLD_WIDTH = 2560;

export default function NPC({ data, onExit }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const buffer = 600;

    const startX =
      data.direction === 'right'
        ? -buffer
        : WORLD_WIDTH + buffer;

    const endX =
      data.direction === 'right'
        ? WORLD_WIDTH + buffer
        : -buffer;

    el.style.transition = 'none';
    el.style.transform = `translateX(${startX}px)`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = `transform ${data.duration}ms linear`;
        el.style.transform = `translateX(${endX}px)`;
      });
    });

    // ✅ TIME-BASED EXIT (STABLE WITH SCALE)
    const timeout = setTimeout(() => {
      onExit(data.id);
    }, data.duration + 300); // small buffer

    return () => clearTimeout(timeout);
  }, [data, onExit]);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: data.z
      }}
    >
      <div
        style={{
          animation: `npcBounce ${0.35}s infinite ease-in-out`
        }}
      >
        <img
          src={data.src}
          alt="npc"
          draggable={false}
          style={{
            width: '500px',

            transform:
              data.direction === 'right'
                ? 'scaleX(-1)'
                : 'scaleX(1)',

            transformOrigin: 'bottom center'
          }}
        />
      </div>
    </div>
  );
}
