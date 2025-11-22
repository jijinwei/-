
import React from 'react';
import { CardProps } from '../types';
import { BALLOON_COLORS } from '../constants';

export const Card: React.FC<CardProps> = ({ letter, isFlipped, index, onClick }) => {
  // isFlipped true means the balloon is POPPED (revealed)
  
  const colorClass = BALLOON_COLORS[index % BALLOON_COLORS.length];
  
  // Randomize float delay slightly for natural look
  const floatDelay = { animationDelay: `${(index % 5) * 0.2}s` };

  return (
    <div 
      className="relative w-full aspect-[4/5] flex items-center justify-center"
    >
      {/* THE REVEALED LETTER (Background Layer) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 select-none drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
          {letter}
        </span>
      </div>

      {/* THE BALLOON CONTAINER */}
      <div 
        onClick={!isFlipped ? onClick : undefined}
        className={`
          absolute inset-0 z-10 flex items-center justify-center
          ${isFlipped ? 'pointer-events-none' : 'cursor-pointer hover:scale-105 transition-transform duration-300'}
        `}
      >
        {/* Balloon Body Graphic */}
        {/* When flipped, we use animate-burst on the body to make it expand and vanish */}
        <div 
          className={`relative w-full h-full flex flex-col items-center ${isFlipped ? 'animate-burst' : 'animate-float'}`}
          style={!isFlipped ? floatDelay : {}}
        >
          {/* Main Balloon Shape */}
          <div className={`
            w-[90%] h-[85%] rounded-[50%_50%_50%_50%/40%_40%_60%_60%] 
            shadow-[inset_-10px_-10px_24px_rgba(0,0,0,0.3),_5px_5px_15px_rgba(0,0,0,0.2)]
            bg-gradient-to-br ${colorClass}
            relative
          `}>
            {/* Highlight / Reflection */}
            <div className="absolute top-[20%] left-[20%] w-4 h-8 bg-white/30 rounded-full -rotate-12 blur-[1px]"></div>
            <div className="absolute top-[22%] left-[25%] w-1 h-2 bg-white/60 rounded-full -rotate-12"></div>
          </div>

          {/* Balloon Knot */}
          <div className={`w-4 h-3 -mt-1 balloon-knot bg-gradient-to-b ${colorClass}`}></div>

          {/* Balloon String */}
          <div className="w-0.5 h-12 bg-white/40 -mt-0.5 origin-top animate-[swing_3s_ease-in-out_infinite]"></div>
        </div>

        {/* SHATTER PARTICLES (Only visible when popped) */}
        {/* These act as "shards" flying out from the center */}
        {isFlipped && (
          <>
             <div className={`absolute top-[40%] left-[50%] w-2 h-2 rounded-full bg-gradient-to-br ${colorClass} animate-particle-1`}></div>
             <div className={`absolute top-[40%] left-[50%] w-3 h-2 rounded-full bg-gradient-to-br ${colorClass} animate-particle-2`}></div>
             <div className={`absolute top-[50%] left-[50%] w-2 h-3 rounded-full bg-gradient-to-br ${colorClass} animate-particle-3`}></div>
             <div className={`absolute top-[45%] left-[50%] w-3 h-3 rounded-full bg-gradient-to-br ${colorClass} animate-particle-4`}></div>
             <div className={`absolute top-[55%] left-[50%] w-2 h-2 rounded-full bg-gradient-to-br ${colorClass} animate-particle-5`}></div>
             <div className={`absolute top-[35%] left-[50%] w-2 h-4 rounded-full bg-gradient-to-br ${colorClass} animate-particle-6`}></div>
          </>
        )}
      </div>
    </div>
  );
};
