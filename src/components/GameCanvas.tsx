'use client';

import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { GameEngine } from '@/game/engine';
import { GameConfig, WorldData } from '@/game/types';

interface GameCanvasProps {
  config: GameConfig;
  showGrid: boolean;
  initialWorldData?: WorldData | null;
  onStats?: (dungeonCount: number, roomCount: number) => void;
}

export interface GameCanvasRef {
  regenerate: () => void;
  addDungeon: () => boolean;
  removeDungeon: () => boolean;
  updateConfig: (config: GameConfig) => void;
  setShowGrid: (show: boolean) => void;
  getWorldData: () => WorldData | null;
  loadWorldData: (data: WorldData) => void;
}

export const GameCanvas = forwardRef<GameCanvasRef, GameCanvasProps>(
  ({ config, showGrid, initialWorldData, onStats }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<GameEngine | null>(null);
    const [isClient, setIsClient] = useState(false);
    // Mirror latest config without re-running the init effect.
    // The init effect (deps [isClient]) reads configRef.current once so the
    // engine is constructed with the freshest initial config.
    const configRef = useRef<GameConfig>(config);
    configRef.current = config;
    // Mirror latest callback without re-running the init effect.
    const onStatsRef = useRef(onStats);
    onStatsRef.current = onStats;

    const reportStats = (engine: GameEngine) => {
      const data = engine.getWorldData();
      onStatsRef.current?.(
        data.dungeons.length,
        data.dungeons.reduce((n, d) => n + d.rooms.length, 0),
      );
    };
    // Boot payload from Neon (most recently saved world). Read once at init.
    const initialWorldRef = useRef<WorldData | null>(initialWorldData ?? null);
    initialWorldRef.current = initialWorldData ?? null;

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (!isClient || !canvasRef.current) return;

      let mounted = true;

      const initGame = async () => {
        try {
          // Create engine once with the initial config snapshot.
          // Subsequent config changes go through updateConfig (see below)
          // so the Pixi Application / WebGL context is never re-created.
          const engine = new GameEngine(configRef.current);
          
          // Initialize
          await engine.init(canvasRef.current!);

          if (mounted) {
            engineRef.current = engine;
            const bootWorld = initialWorldRef.current;
            if (bootWorld && Array.isArray(bootWorld.dungeons) && bootWorld.dungeons.length > 0) {
              engine.loadWorldData(bootWorld);
            }
            reportStats(engine);
          } else {
            engine.destroy();
          }
        } catch (error) {
          console.error('Failed to initialize game engine:', error);
        }
      };

      initGame();

      return () => {
        mounted = false;
        if (engineRef.current) {
          engineRef.current.destroy();
          engineRef.current = null;
        }
      };
    }, [isClient]);

    // Live config updates without tearing down the WebGL context.
    // Skipped until the engine has finished init (guard null).
    useEffect(() => {
      const engine = engineRef.current;
      if (!engine) return;
      engine.updateConfig(config);
      reportStats(engine);
    }, [config]);

    useImperativeHandle(ref, () => ({
      regenerate: () => {
        const engine = engineRef.current;
        if (engine) {
          engine.generate();
          reportStats(engine);
        }
      },
      addDungeon: () => {
        const engine = engineRef.current;
        if (!engine) return false;
        const result = engine.addDungeon();
        reportStats(engine);
        return result;
      },
      removeDungeon: () => {
        const engine = engineRef.current;
        if (!engine) return false;
        const result = engine.removeDungeon();
        reportStats(engine);
        return result;
      },
      updateConfig: (newConfig: GameConfig) => {
        if (engineRef.current) {
          engineRef.current.updateConfig(newConfig);
        }
      },
      setShowGrid: (show: boolean) => {
        engineRef.current?.setShowGrid(show);
      },
      getWorldData: () => {
        return engineRef.current?.getWorldData() ?? null;
      },
      loadWorldData: (data: WorldData) => {
        engineRef.current?.loadWorldData(data);
      },
    }));

    useEffect(() => {
      engineRef.current?.setShowGrid(showGrid);
    }, [showGrid]);

    if (!isClient) {
      return (
        <div className="relative w-full h-full flex items-center justify-center bg-gray-900">
          <div className="text-gray-400">Loading game engine...</div>
        </div>
      );
    }

    return (
      <div className="relative w-full h-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ imageRendering: 'pixelated' }}
        />
        <div className="absolute bottom-4 left-4 text-xs text-gray-500 bg-black/50 px-2 py-1 rounded">
          Double-click to zoom | Scroll to zoom | Drag to pan
        </div>
      </div>
    );
  }
);

GameCanvas.displayName = 'GameCanvas';
