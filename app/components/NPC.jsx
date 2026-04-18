'use client';

export default function NPC({ data }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: data.z,
        transform: `translateX(${data.x}px)`
      }}
    >
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
            // 🔥 HEIGHT-BASED SCALING (THIS FIXES EVERYTHING)
            height: `${(data.size / 1440) * 100}%`,
            width: 'auto',

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
