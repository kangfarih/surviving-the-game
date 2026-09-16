'use client';

import { useState, useRef, useEffect } from 'react';
import { GameCanvas, GameCanvasRef } from '@/components/GameCanvas';
import { TopMenu } from '@/components/TopMenu';
import { ConfigPanel } from '@/components/ConfigPanel';
import { GameConfig, DEFAULT_CONFIG, WorldData } from '@/game/types';
import type { CombatSnapshot } from '@/game/combat';

export default function Home() {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [config, setConfig] = useState<GameConfig>(DEFAULT_CONFIG);
  const [showGrid] = useState(false);
  const [dungeonCount, setDungeonCount] = useState(0);
  const [combat, setCombat] = useState<CombatSnapshot | null>(null);
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

  const handleGenerateDungeon = () => {
    const result = gameCanvasRef.current?.addDungeon() ?? false;
    const data = gameCanvasRef.current?.getWorldData() ?? null;
    if (data) setDungeonCount(data.dungeons.length);
    return result;
  };

  const handleDeleteDungeon = () => {
    const result = gameCanvasRef.current?.removeDungeon() ?? false;
    const data = gameCanvasRef.current?.getWorldData() ?? null;
    if (data) setDungeonCount(data.dungeons.length);
    return result;
  };

  const handleSummonAgent = () => {
    const ok = gameCanvasRef.current?.summonAgent() ?? false;
    setCombat(gameCanvasRef.current?.getCombatSnapshot() ?? null);
    return ok;
  };

  const handleSummonDummy = () => {
    const ok = gameCanvasRef.current?.summonDummy() ?? false;
    setCombat(gameCanvasRef.current?.getCombatSnapshot() ?? null);
    return ok;
  };

  const handleSummonBoth = () => {
    const ok = gameCanvasRef.current?.summonBoth() ?? false;
    setCombat(gameCanvasRef.current?.getCombatSnapshot() ?? null);
    return ok;
  };

  const handleAttackOnce = () => {
    const r = gameCanvasRef.current?.attackOnce() ?? null;
    setCombat(gameCanvasRef.current?.getCombatSnapshot() ?? null);
    return r;
  };

  const handleStartAuto = () => {
    gameCanvasRef.current?.startAutoAttack();
    setCombat(gameCanvasRef.current?.getCombatSnapshot() ?? null);
  };

  const handleStopAuto = () => {
    gameCanvasRef.current?.stopAutoAttack();
    setCombat(gameCanvasRef.current?.getCombatSnapshot() ?? null);
  };

  const handleResetDummy = () => {
    gameCanvasRef.current?.resetDummy();
    setCombat(gameCanvasRef.current?.getCombatSnapshot() ?? null);
  };

  const handleDismissCombat = () => {
    gameCanvasRef.current?.dismissCombat();
    setCombat(gameCanvasRef.current?.getCombatSnapshot() ?? null);
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-950">
      {/* Top Menu */}
      <TopMenu
        onConfigClick={() => setIsConfigOpen((prev) => !prev)}
        isOpen={isConfigOpen}
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
            onStats={(dungeons) => setDungeonCount(dungeons)}
            onCombat={(snap) => setCombat(snap)}
          />
        )}
      </div>

      {/* Combat status chip (bottom-right): agent HP, dummy HP, last hit */}
      {combat && (combat.agent || combat.dummy) && (
        <div className="absolute bottom-4 right-4 z-40 bg-black/70 border border-amber-700/40 rounded px-3 py-2 text-xs text-amber-100 space-y-1">
          <div className="font-semibold text-amber-200">Combat Test</div>
          <div>
            Agent:{' '}
            {combat.agent ? `${combat.agent.hp}/${combat.agent.maxHp} HP` : '—'}
            {'  •  '}Dummy:{' '}
            {combat.dummy ? `${combat.dummy.hp}/${combat.dummy.maxHp} HP` : '—'}
          </div>
          <div className="text-gray-300">
            {combat.lastHit
              ? `Last hit: -${combat.lastHit.damage} (tick ${combat.lastHit.tick})${combat.lastHit.killed ? ' ☠' : ''}`
              : 'No hits yet.'}
            {combat.autoAttacking ? '  •  auto-attacking…' : ''}
          </div>
        </div>
      )}
      
      {/* Config Panel */}
      <ConfigPanel
        isOpen={isConfigOpen}
        config={config}
        onConfigChange={handleConfigChange}
        onClose={() => setIsConfigOpen(false)}
        getWorldData={getWorldData}
        onLoadWorld={handleLoadWorld}
        onGenerateDungeon={handleGenerateDungeon}
        onDeleteDungeon={handleDeleteDungeon}
        dungeonCount={dungeonCount}
        combat={combat}
        onSummonAgent={handleSummonAgent}
        onSummonDummy={handleSummonDummy}
        onSummonBoth={handleSummonBoth}
        onAttackOnce={handleAttackOnce}
        onStartAuto={handleStartAuto}
        onStopAuto={handleStopAuto}
        onResetDummy={handleResetDummy}
        onDismissCombat={handleDismissCombat}
      />
    </div>
  );
}
