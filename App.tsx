
import React, { useState } from 'react';
import { Card } from './components/Card';
import { ALPHABET_CARDS } from './constants';
import { RotateCcw, Eye, EyeOff } from 'lucide-react';

export default function App() {
  // State to track which cards are popped (flipped). Key is the letter, value is boolean.
  const [poppedCards, setPoppedCards] = useState<Record<string, boolean>>({});
  // The cards array is constant based on user requirement, but we keep state in case shuffle is needed later.
  // Note: User requested a specific order, so we default to ALPHABET_CARDS.
  const [cards, setCards] = useState<string[]>(ALPHABET_CARDS);

  const handleCardClick = (letter: string) => {
    setPoppedCards((prev) => ({
      ...prev,
      [letter]: !prev[letter], // Toggle state (Pop/Unpop)
    }));
  };

  const handleReset = () => {
    setPoppedCards({}); // Unpop all (inflate balloons)
    setCards(ALPHABET_CARDS); // Restore original order
  };

  const handlePopAll = () => {
    const allPopped = ALPHABET_CARDS.reduce((acc, letter) => {
      acc[letter] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setPoppedCards(allPopped);
  };

  const handleInflateAll = () => {
    setPoppedCards({});
  };

  // Calculate progress
  const poppedCount = Object.values(poppedCards).filter(Boolean).length;
  const progress = Math.round((poppedCount / ALPHABET_CARDS.length) * 100);

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-950 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 pb-20 overflow-x-hidden">
      
      {/* Header / Toolbar */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/70 border-b border-white/5 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Logo / Title */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="flex flex-col">
                <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300 tracking-tight leading-tight">
                  三英国际
                </h1>
                <span className="text-[10px] sm:text-xs text-slate-400 font-medium tracking-wide uppercase">
                  Interactive Learning
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-full border border-white/10 shadow-inner w-full md:w-auto justify-center md:justify-end">
              <button
                onClick={handlePopAll}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                title="Pop All Balloons"
              >
                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="whitespace-nowrap">全部显示</span>
              </button>
              
              <button
                onClick={handleInflateAll}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                title="Restore All Balloons"
              >
                <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="whitespace-nowrap">全部隐藏</span>
              </button>

              <div className="w-px h-6 bg-white/10 mx-1"></div>

              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 transition-all active:scale-95"
                title="Reset"
              >
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="whitespace-nowrap">重置</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-1 w-full bg-slate-900">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(59,130,246,0.6)]" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 sm:gap-8">
          {cards.map((letter, index) => (
            <Card
              key={`${letter}-${index}`}
              letter={letter}
              index={index}
              isFlipped={!!poppedCards[letter]}
              onClick={() => handleCardClick(letter)}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-slate-600 text-xs sm:text-sm border-t border-white/5 mt-auto">
        <p>Three Heroes International • Interactive Learning</p>
      </footer>
    </div>
  );
}
