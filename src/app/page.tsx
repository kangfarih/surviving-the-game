'use client';

import { useState, useRef, useEffect } from 'react';
import { GameCanvas, GameCanvasRef } from '@/components/GameCanvas';
import { TopMenu } from '@/components/TopMenu';
import { ConfigPanel } from '@/components/ConfigPanel';
import { GameConfig, DEFAULT_CONFIG, WorldData } from '@/game/types';

export default function Home() {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [config, setConfig] = useState<GameConfig>(DEFAULT_CONFIG);
  const [showGrid, setShowGrid] = useState(false);
  const [dungeonCount, setDungeonCount] = useState(0);
  const [boot, setBoot] = useState<{ done: boolean; world: WorldData | null }>({
    done: false,
    world: null,
  });
  const gameCanvasRef = useRef<GameCanvasRef>(null);

  // Boot from Neon: load the most recently saved world (if any) before the
  // Pixi engine mounts, so init uses the saved config + dungeons. Falls back
  // to the empty default map when nothing is saved or the DB is unreachable.
  useEffect(() => {
    let cancelled = false;

    const isValidWorld = (value: unknown): value is WorldData => {
      if (typeof value !== 'object' || value === null) return false;
      const v = value as { config?: unknown; dungeons?: unknown };
      return (
        typeof v.config === 'object' &&
        v.config !== null &&
        Array.isArray(v.dungeons)
      );
    };

    const loadLatestWorld = async (): Promise<WorldData | null> => {
      const listRes = await fetch('/api/worlds');
      if (!listRes.ok) return null;
      const listBody = (await listRes.json()) as { worlds?: { id: string }[] };
      const first = listBody.worlds?.[0];
      if (!first?.id) return null;

      const worldRes = await fetch(`/api/worlds/${first.id}`);
      if (!worldRes.ok) return null;
      const worldBody = (await worldRes.json()) as { world?: unknown };
      if (!isValidWorld(worldBody.world)) return null;
      if (worldBody.world.dungeons.length === 0) return null;
      return worldBody.world;
    };

    const bootFromNeon = async () => {
      const timeout = new Promise<null>((resolve) =>
        setTimeout(() => resolve(null), 8000),
      );
      try {
        const world = await Promise.race([loadLatestWorld(), timeout]);
        if (cancelled) return;
        if (world) {
          setConfig({ ...world.config });
          setDungeonCount(world.dungeons.length);
          setBoot({ done: true, world });
        } else {
          setBoot({ done: true, world: null });
        }
      } catch {
        if (!cancelled) setBoot({ done: true, world: null });
      }
    };

    bootFromNeon();

    return () => {
      cancelled = true;
    };
  }, []);

  const refreshDungeonCount = () => {
    const data = gameCanvasRef.current?.getWorldData();
    setDungeonCount(data?.dungeons.length ?? 0);
  };

  // Append ONE dungeon via the engine; returns false when the map is full
  // so the panel can show "No space" feedback (and stays open).
  const handleGenerate = () => {
    const ok = gameCanvasRef.current?.addDungeon() ?? false;
    refreshDungeonCount();
    return ok;
  };

  // Remove the OLDEST dungeon (FIFO).
  const handleDeleteDungeon = () => {
    const ok = gameCanvasRef.current?.removeOldestDungeon() ?? false;
    refreshDungeonCount();
    return ok;
  };

  const handleConfigChange = (newConfig: GameConfig) => {
    setConfig(newConfig);
  };

  const getWorldData = () => {
    return gameCanvasRef.current?.getWorldData() ?? null;
  };

  const handleLoadWorld = (data: WorldData) => {
    gameCanvasRef.current?.loadWorldData(data);
    setConfig({ ...data.config });
    setDungeonCount(data.dungeons.length);
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-950">
      {/* Top Menu */}
      <TopMenu
        onConfigClick={() => setIsConfigOpen(true)}
      />
      
      {/* Game Canvas - Full remaining height */}
      <div className="flex-1 overflow-hidden">
        {!boot.done ? (
          <div className="relative w-full h-full flex items-center justify-center bg-gray-950">
            <div className="text-amber-400">Loading world from Neon…</div>
          </div>
        ) : (
          <GameCanvas
            ref={gameCanvasRef}
            config={config}
            showGrid={showGrid}
            initialWorldData={boot.world}
          />
        )}
      </div>
      
      {/* Config Panel */}
      <ConfigPanel
        isOpen={isConfigOpen}
        config={config}
        onConfigChange={handleConfigChange}
        onClose={() => setIsConfigOpen(false)}
        onGenerate={handleGenerate}
        onDeleteDungeon={handleDeleteDungeon}
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid((prev) => !prev)}
        dungeonCount={dungeonCount}
        getWorldData={getWorldData}
        onLoadWorld={handleLoadWorld}
      />
    </div>
  );
}
