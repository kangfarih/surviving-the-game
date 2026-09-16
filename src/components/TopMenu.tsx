'use client';

import React from 'react';

interface TopMenuProps {
  onConfigClick: () => void;
  isOpen?: boolean;
}

export function TopMenu({ onConfigClick, isOpen = false }: TopMenuProps) {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-amber-900/30 px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-amber-100 font-bold text-lg tracking-wide">Surviving The Game</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onConfigClick}
            aria-expanded={isOpen}
            className={`px-4 py-2 rounded border transition-colors flex items-center gap-2 ${
              isOpen
                ? 'bg-amber-700/60 hover:bg-amber-600/60 text-amber-50 border-amber-500/50'
                : 'bg-amber-900/60 hover:bg-amber-800/60 text-amber-100 border-amber-700/50'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            Config
          </button>
        </div>
      </div>
    </div>
  );
}
