import React, { useState, useEffect } from 'react';
import { Card } from './components/Card';
import { ALPHABET_CARDS } from './constants';
import { RotateCcw, Eye, EyeOff, Shuffle } from 'lucide-react';

export default function App() {
  // State to track which cards are flipped. Key is the letter, value is boolean.
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  // State for the card order (to allow shuffling)
  const [cards, setCards] = useState<string[]>(ALPHABET_CARDS);

  // Initialize all to false (face down) on mount is implicit by empty object
  
  const handleCardClick = (letter: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [letter]: !prev[letter], // Toggle state
    }));
  };

  const handleReset = () => {
    setFlippedCards({});
    // Optional: Reset order to A-Z
    setCards(ALPHABET_CARDS);
  };

  const handleRevealAll = () => {
    const allFlipped = ALPHABET_CARDS.reduce((acc, letter) => {
      acc[letter] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setFlippedCards(allFlipped);
  };

  const handleHideAll = () => {
    setFlippedCards({});
  };

  const handleShuffle = () => {
    // Reset flips first to avoid confusion/cheating
    setFlippedCards({});
    
    // Shuffle logic
    const shuffled = [...ALPHABET_CARDS].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  // Calculate progress
  const flippedCount = Object.values(flippedCards).filter(Boolean).length;
  const progress = Math.round((flippedCount / ALPHABET_CARDS.length) * 100);

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pb-20">
      
      {/* Header / Toolbar */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-950/80 border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Logo / Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span className="text-white font-bold text-xl">Aa</span>
              </div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                AlphaFlip
              </h1>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 bg-slate-900/50 p-1.5 rounded-full border border-white/5">
              <button
                onClick={handleRevealAll}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                title="Reveal All"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Reveal</span>
              </button>
              
              <button
                onClick={handleHideAll}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                title="Hide All"
              >
                <EyeOff className="w-4 h-4" />
                <span className="hidden sm:inline">Hide</span>
              </button>

              <div className="w-px h-6 bg-white/10 mx-1"></div>

              <button
                onClick={handleShuffle}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-indigo-300 hover:text-indigo-200 hover:bg-indigo-500/10 transition-all active:scale-95"
                title="Shuffle Cards"
              >
                <Shuffle className="w-4 h-4" />
                <span className="hidden sm:inline">Shuffle</span>
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 transition-all active:scale-95"
                title="Reset Game"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-0.5 w-full bg-slate-800">
          <div 
            className="h-full bg-indigo-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 sm:gap-6 auto-rows-fr">
          {cards.map((letter) => (
            <Card
              key={letter}
              letter={letter}
              isFlipped={!!flippedCards[letter]}
              onClick={() => handleCardClick(letter)}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-slate-500 text-sm">
        <p>Interactive Alphabet Learning • Click a card to flip</p>
      </footer>
    </div>
  );
}