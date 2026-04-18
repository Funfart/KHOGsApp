'use client';

import { useEffect, useRef } from 'react';

export default function NPC({ data, onExit }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const startX = data.direction === 'right' ? -200 : 2760;
    const endX = data.direction === 'right' ? 2760 : -200;

    el.style.transform = `
      translateX(${startX}px)
      translateY(-50%)
      scale(${data.scale})
    `;

    requestAnimationFrame(() => {
      el.style.transition = `transform ${data.duration}ms linear`;

      el.style.transform = `
        translateX(${endX}px)
        translateY(-50%)
        scale(${data.scale})
      `;
    });

    const timeout = setTimeout(() => {
      onExit(data.id);
    }, data.duration);

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

        // 🔥 depth layering
        zIndex: data.z
      }}
    >
      {/* 🦶 BOUNCE LAYER */}
      <div
        style={{
          animation: `npcBounce ${0.3 + Math.random() * 0.2}s infinite ease-in-out`
        }}
      >
        <img
          src={data.src}
          alt="npc"
          draggable={false}
          style={{
            width: `${data.size}px`,
            height: 'auto',

            // 🎯 BASE ART FACES LEFT
            transform:
              data.direction === 'right'
                ? 'scaleX(-1)'
                : 'scaleX(1)',

            transformOrigin: 'bottom center'
          }}
        />
      </div>
    </div>
}
