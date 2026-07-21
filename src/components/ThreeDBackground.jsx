import React from 'react';

export default function ThreeDBackground({ children, className = "" }) {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#f0f2f5] ${className}`}>
      {/* Floor/Perspective shadow */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-[#e2e8f0] to-transparent opacity-60"
        style={{
          transform: 'perspective(1000px) rotateX(60deg)',
          transformOrigin: 'bottom',
        }}
      />
      
      {/* Dynamic Lighting Highlights */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[120px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#5d5fef]/10 rounded-full blur-[100px] opacity-30 pointer-events-none" />
      
      {/* Subtle Grid for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: 'perspective(1000px) rotateX(45deg) scale(2)',
          transformOrigin: 'center',
        }}
      />

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
