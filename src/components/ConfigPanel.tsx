'use client';

import React, { useState } from 'react';
import { GameConfig, DEFAULT_CONFIG } from '@/game/types';

interface ConfigPanelProps {
  isOpen: boolean;
  config: GameConfig;
  onConfigChange: (config: GameConfig) => void;
  onClose: () => void;
  onGenerate: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
}

type NumericFieldKey =
  | 'mapWidth'
  | 'mapHeight'
  | 'tilePixelSize'
  | 'citySize'
  | 'dungeonCount'
  | 'roomsPerDungeon'
  | 'minRoomSize'
  | 'maxRoomSize'
  | 'corridorWidth';

const FIELD_BOUNDS: Record<NumericFieldKey, { min: number; max: number }> = {
  mapWidth: { min: 50, max: 200 },
  mapHeight: { min: 50, max: 200 },
  tilePixelSize: { min: 8, max: 32 },
  citySize: { min: 10, max: 40 },
  dungeonCount: { min: 1, max: 8 },
  roomsPerDungeon: { min: 3, max: 15 },
  minRoomSize: { min: 3, max: 8 },
  maxRoomSize: { min: 8, max: 20 },
  corridorWidth: { min: 1, max: 4 },
};

function draftsFromConfig(config: GameConfig): Record<NumericFieldKey, string> {
  return {
    mapWidth: String(config.mapWidth),
    mapHeight: String(config.mapHeight),
    tilePixelSize: String(config.tilePixelSize),
    citySize: String(config.citySize),
    dungeonCount: String(config.dungeonCount),
    roomsPerDungeon: String(config.roomsPerDungeon),
    minRoomSize: String(config.minRoomSize),
    maxRoomSize: String(config.maxRoomSize),
    corridorWidth: String(config.corridorWidth),
  };
}

export function ConfigPanel({
  isOpen,
  config,
  onConfigChange,
  onClose,
  onGenerate,
  showGrid,
  onToggleGrid,
}: ConfigPanelProps) {
  const [drafts, setDrafts] = useState<Record<NumericFieldKey, string>>(() =>
    draftsFromConfig(config),
  );
  const [prevConfig, setPrevConfig] = useState(config);

  // Sync local drafts when the config prop changes (e.g. Reset to Default).
  if (prevConfig !== config) {
    setPrevConfig(config);
    setDrafts(draftsFromConfig(config));
  }

  if (!isOpen) return null;

  const handleCheckboxChange = (key: 'includeCity', value: boolean) => {
    onConfigChange({ ...config, [key]: value });
  };

  const handleReset = () => {
    onConfigChange(DEFAULT_CONFIG);
  };

  const commitDraft = (key: NumericFieldKey) => {
    const raw = drafts[key].trim();
    if (raw === '') {
      // Ignore empty input while typing; revert to committed value.
      setDrafts((prev) => ({ ...prev, [key]: String(config[key]) }));
      return;
    }
    const parsed = Number.parseInt(raw, 10);
    if (Number.isNaN(parsed)) {
      setDrafts((prev) => ({ ...prev, [key]: String(config[key]) }));
      return;
    }
    const { min, max } = FIELD_BOUNDS[key];
    let clamped = Math.min(max, Math.max(min, parsed));
    // Guard minRoomSize <= maxRoomSize.
    if (key === 'minRoomSize') {
      clamped = Math.min(clamped, config.maxRoomSize);
    } else if (key === 'maxRoomSize') {
      clamped = Math.max(clamped, config.minRoomSize);
    }
    setDrafts((prev) => ({ ...prev, [key]: String(clamped) }));
    if (clamped !== config[key]) {
      onConfigChange({ ...config, [key]: clamped });
    }
  };

  const renderNumberRow = (key: NumericFieldKey, label: string) => (
    <div className="flex items-center justify-between gap-2">
      <label htmlFor={key} className="text-sm text-gray-300">
        {label}
      </label>
      <input
        id={key}
        type="number"
        min={FIELD_BOUNDS[key].min}
        max={FIELD_BOUNDS[key].max}
        value={drafts[key]}
        onChange={(e) =>
          setDrafts((prev) => ({ ...prev, [key]: e.target.value }))
        }
        onBlur={() => commitDraft(key)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            commitDraft(key);
            (e.target as HTMLInputElement).blur();
          }
        }}
        className="bg-gray-900 border border-gray-600 text-amber-100 rounded w-24 px-2 py-1 text-right"
      />
    </div>
  );

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
              {renderNumberRow('mapWidth', 'Map Width (tiles)')}
              {renderNumberRow('mapHeight', 'Map Height (tiles)')}
              {renderNumberRow('tilePixelSize', 'Tile Pixel Size (px)')}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showGrid"
                  checked={showGrid}
                  onChange={onToggleGrid}
                  className="w-4 h-4"
                />
                <label htmlFor="showGrid" className="text-sm text-gray-300">
                  Show Grid
                </label>
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
                  onChange={(e) => handleCheckboxChange('includeCity', e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="includeCity" className="text-sm text-gray-300">
                  Include City in Center
                </label>
              </div>
              {config.includeCity && (
                <div>{renderNumberRow('citySize', 'City Size (tiles)')}</div>
              )}
            </div>
          </section>

          {/* Dungeon Settings */}
          <section>
            <h3 className="text-lg font-semibold text-amber-200 mb-3">Dungeon Settings</h3>
            <div className="space-y-3">
              {renderNumberRow('dungeonCount', 'Number of Dungeons')}
              {renderNumberRow('roomsPerDungeon', 'Rooms per Dungeon')}
              {renderNumberRow('minRoomSize', 'Min Room Size (tiles)')}
              {renderNumberRow('maxRoomSize', 'Max Room Size (tiles)')}
              {renderNumberRow('corridorWidth', 'Corridor Width (tiles)')}
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
        <div className="p-4 border-t border-amber-900/30 flex flex-col gap-2 bg-gray-800/50">
          <button
            onClick={onGenerate}
            className="w-full px-4 py-2 bg-emerald-900/60 hover:bg-emerald-800/60 text-emerald-100 rounded border border-emerald-700/50 transition-colors flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Generate New Map
          </button>
          <div className="flex gap-2">
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
    </div>
  );
}
