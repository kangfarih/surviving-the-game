'use client';

import React from 'react';
import { GameConfig, DEFAULT_CONFIG } from '@/game/types';

interface ConfigPanelProps {
  isOpen: boolean;
  config: GameConfig;
  onConfigChange: (config: GameConfig) => void;
  onClose: () => void;
}

export function ConfigPanel({
  isOpen,
  config,
  onConfigChange,
  onClose,
}: ConfigPanelProps) {
  if (!isOpen) return null;

  const handleChange = (key: keyof GameConfig, value: number | boolean) => {
    onConfigChange({ ...config, [key]: value });
  };

  const handleReset = () => {
    onConfigChange(DEFAULT_CONFIG);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto border border-amber-900/30">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-amber-900/30 bg-gray-800/50">
          <h2 className="text-xl font-bold text-amber-100">Configuration</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-amber-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Map Settings */}
          <section>
            <h3 className="text-lg font-semibold text-amber-200 mb-3">Map Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Map Width: {config.mapWidth} tiles
                </label>
                <input
                  type="range"
                  min={50}
                  max={200}
                  step={10}
                  value={config.mapWidth}
                  onChange={(e) => handleChange('mapWidth', Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Map Height: {config.mapHeight} tiles
                </label>
                <input
                  type="range"
                  min={50}
                  max={200}
                  step={10}
                  value={config.mapHeight}
                  onChange={(e) => handleChange('mapHeight', Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Tile Pixel Size: {config.tilePixelSize}px
                </label>
                <input
                  type="range"
                  min={8}
                  max={32}
                  step={2}
                  value={config.tilePixelSize}
                  onChange={(e) => handleChange('tilePixelSize', Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </section>
          
          {/* City Settings */}
          <section>
            <h3 className="text-lg font-semibold text-amber-200 mb-3">City Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeCity"
                  checked={config.includeCity}
                  onChange={(e) => handleChange('includeCity', e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="includeCity" className="text-sm text-gray-300">
                  Include City in Center
                </label>
              </div>
              {config.includeCity && (
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    City Size: {config.citySize} tiles
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={40}
                    step={2}
                    value={config.citySize}
                    onChange={(e) => handleChange('citySize', Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </section>
          
          {/* Dungeon Settings */}
          <section>
            <h3 className="text-lg font-semibold text-amber-200 mb-3">Dungeon Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Number of Dungeons: {config.dungeonCount}
                </label>
                <input
                  type="range"
                  min={1}
                  max={8}
                  step={1}
                  value={config.dungeonCount}
                  onChange={(e) => handleChange('dungeonCount', Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Rooms per Dungeon: {config.roomsPerDungeon}
                </label>
                <input
                  type="range"
                  min={3}
                  max={15}
                  step={1}
                  value={config.roomsPerDungeon}
                  onChange={(e) => handleChange('roomsPerDungeon', Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Min Room Size: {config.minRoomSize} tiles
                </label>
                <input
                  type="range"
                  min={3}
                  max={8}
                  step={1}
                  value={config.minRoomSize}
                  onChange={(e) => handleChange('minRoomSize', Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Max Room Size: {config.maxRoomSize} tiles
                </label>
                <input
                  type="range"
                  min={8}
                  max={20}
                  step={1}
                  value={config.maxRoomSize}
                  onChange={(e) => handleChange('maxRoomSize', Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Corridor Width: {config.corridorWidth} tiles
                </label>
                <input
                  type="range"
                  min={1}
                  max={4}
                  step={1}
                  value={config.corridorWidth}
                  onChange={(e) => handleChange('corridorWidth', Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </section>
          
          {/* Legend */}
          <section>
            <h3 className="text-lg font-semibold text-amber-200 mb-3">Legend</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#4169e1]" />
                <span className="text-gray-300">Start Room</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#8b2252]" />
                <span className="text-gray-300">Boss Room</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#6b8b6b]" />
                <span className="text-gray-300">City Floor</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#5a6a5a]" />
                <span className="text-gray-300">City Wall</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#8b7355]" />
                <span className="text-gray-300">Room Floor</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#4a4a4a]" />
                <span className="text-gray-300">Wall</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#9b8b6b]" />
                <span className="text-gray-300">Corridor</span>
              </div>
            </div>
          </section>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-amber-900/30 flex gap-2 bg-gray-800/50">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded transition-colors border border-gray-600"
          >
            Reset to Default
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-amber-900/50 hover:bg-amber-800/50 text-amber-100 rounded transition-colors border border-amber-700/50"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
}
