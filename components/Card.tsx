import React from 'react';
import { CardProps } from '../types';

export const Card: React.FC<CardProps> = ({ letter, isFlipped, onClick }) => {
  return (
    <div 
      className="group perspective-1000 w-full aspect-[3/4] cursor-pointer"
      onClick={onClick}
    >
      <div 
        className={`relative w-full h-full transition-all duration-700 preserve-3d shadow-xl rounded-2xl ${
          isFlipped ? 'rotate-y-180' : ''
        } group-hover:scale-[1.02] active:scale-95`}
      >
        {/* Front of Card (Face Down - Hidden State) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden border border-white/10 bg-slate-800">
          {/* Background Gradient/Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90"></div>
          
          {/* Decorative Pattern overlay */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_2px_2px,_rgba(255,255,255,0.4)_1px,_transparent_0)] bg-[length:20px_20px]"></div>
          
          {/* Center Icon/Design */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/10 group-hover:bg-white/20 transition-colors">
              <span className="text-white/80 font-semibold text-lg sm:text-2xl">?</span>
            </div>
          </div>
          
          {/* Card Shine Effect */}
          <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine" />
        </div>

        {/* Back of Card (Face Up - Revealed State) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden bg-white border-2 border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
          <div className="flex items-center justify-center h-full w-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white">
            <span className="text-6xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-purple-600 select-none drop-shadow-sm">
              {letter}
            </span>
          </div>
          
          {/* Small corner indicators */}
          <div className="absolute top-2 left-3 text-sm font-bold text-slate-300">{letter}</div>
          <div className="absolute bottom-2 right-3 text-sm font-bold text-slate-300 rotate-180">{letter}</div>
        </div>
      </div>
    </div>
  );
};