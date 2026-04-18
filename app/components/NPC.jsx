'use client';

import { useEffect, useState } from 'react';

export default function NPC({ data }) {
  const [scale, setScale] = useState(1);

  // 🔥 read scene scale and invert it
  useEffect(() => {
    function updateScale() {
      const s = parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--scene-scale')
      ) || 1;

      setScale(1 / s); // 👈 COUNTER SCALE
    }

    updateScale();
    window.addEventListener('resize', updateScale);

    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        pointerEvents: 'none',

        // 🔥 TRUE DEPTH LAYERS
        zIndex: data.z,

        transform: `translateX(${data.x}px)`
      }}
    >
      {/* 🦶 bounce layer */}
      <div
        style={{
          animation: `npcBounce 0.35s infinite ease-in-out`
        }}
      >
        <img
          src={data.src}
          alt="npc"
          draggable={false}
          style={{
            width: `${data.size}px`, // 500px base

            // 🔥 APPLY COUNTER SCALE HERE
            transform: `
              ${data.direction === 'right' ? 'scaleX(-1)' : 'scaleX(1)'}
              scale(${scale})
            `,

            transformOrigin: 'bottom center'
          }}
        />
      </div>
    </div>
  );
}
