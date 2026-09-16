'use client';

import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { GameEngine } from '@/game/engine';
import { GameConfig } from '@/game/types';

interface GameCanvasProps {
  config: GameConfig;
  showGrid: boolean;
}

export interface GameCanvasRef {
  regenerate: () => void;
  updateConfig: (config: GameConfig) => void;
  setShowGrid: (show: boolean) => void;
}

export const GameCanvas = forwardRef<GameCanvasRef, GameCanvasProps>(
  ({ config, showGrid }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<GameEngine | null>(null);
    const [isClient, setIsClient] = useState(false);
    // Mirror latest config without re-running the init effect.
    // The init effect (deps [isClient]) reads configRef.current once so the
    // engine is constructed with the freshest initial config.
    const configRef = useRef<GameConfig>(config);
    configRef.current = config;

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
      engineRef.current?.updateConfig(config);
    }, [config]);

    useImperativeHandle(ref, () => ({
      regenerate: () => {
        if (engineRef.current) {
          engineRef.current.generate();
        }
      },
      updateConfig: (newConfig: GameConfig) => {
        if (engineRef.current) {
          engineRef.current.updateConfig(newConfig);
        }
      },
      setShowGrid: (show: boolean) => {
        engineRef.current?.setShowGrid(show);
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
