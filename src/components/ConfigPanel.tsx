'use client';

import React, { useEffect, useState } from 'react';
import { GameConfig, DEFAULT_CONFIG, WorldData } from '@/game/types';
import type { AttackResult, CombatSnapshot } from '@/game/combat';

interface ConfigPanelProps {
  isOpen: boolean;
  config: GameConfig;
  onConfigChange: (config: GameConfig) => void;
  onClose: () => void;
  getWorldData: () => WorldData | null;
  onLoadWorld: (data: WorldData) => void;
  onGenerateDungeon: () => boolean;
  onDeleteDungeon: () => boolean;
  dungeonCount: number;
  combat?: CombatSnapshot | null;
  onSummonAgent?: () => boolean;
  onSummonDummy?: () => boolean;
  onSummonBoth?: () => boolean;
  onAttackOnce?: () => AttackResult | null;
  onStartAuto?: () => void;
  onStopAuto?: () => void;
  onResetDummy?: () => void;
  onDismissCombat?: () => void;
}

interface SavedWorldSummary {
  id: string;
  name: string | null;
  updatedAt: string;
}

type NumericFieldKey = 'seed';

const FIELD_BOUNDS: Record<NumericFieldKey, { min: number; max: number }> = {
  seed: { min: 1, max: 2147483647 },
};

function draftsFromConfig(config: GameConfig): Record<NumericFieldKey, string> {
  return {
    seed: String(config.seed),
  };
}

export function ConfigPanel({
  isOpen,
  config,
  onConfigChange,
  onClose,
  getWorldData,
  onLoadWorld,
  onGenerateDungeon,
  onDeleteDungeon,
  dungeonCount,
  combat,
  onSummonAgent,
  onSummonDummy,
  onSummonBoth,
  onAttackOnce,
  onStartAuto,
  onStopAuto,
  onResetDummy,
  onDismissCombat,
}: ConfigPanelProps) {
  const [drafts, setDrafts] = useState<Record<NumericFieldKey, string>>(() =>
    draftsFromConfig(config),
  );
  const [prevConfig, setPrevConfig] = useState(config);
  const [worldName, setWorldName] = useState('');
  const [savedWorlds, setSavedWorlds] = useState<SavedWorldSummary[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [dungeonMsg, setDungeonMsg] = useState<string | null>(null);
  const [combatMsg, setCombatMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Sync local drafts when the config prop changes (e.g. Reset to Default).
  if (prevConfig !== config) {
    setPrevConfig(config);
    setDrafts(draftsFromConfig(config));
  }

  const fetchWorlds = async () => {
    try {
      const res = await fetch('/api/worlds');
      if (!res.ok) {
        setSaveMsg('Could not load saved worlds.');
        return;
      }
      const json = (await res.json()) as { worlds?: SavedWorldSummary[] };
      const list = Array.isArray(json.worlds) ? json.worlds : [];
      setSavedWorlds(list);
      setSelectedId((prev) =>
        prev && list.some((w) => w.id === prev) ? prev : (list[0]?.id ?? ''),
      );
    } catch {
      setSaveMsg('Could not load saved worlds.');
    }
  };

  // Self-contained save/load: refresh the list every time the panel opens.
  // (Message resets live in handleClose so the effect body never calls
  // setState synchronously.)
  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    fetch('/api/worlds')
      .then((res) => {
        if (!res.ok) throw new Error('load failed');
        return res.json() as Promise<{ worlds?: SavedWorldSummary[] }>;
      })
      .then((json) => {
        if (cancelled) return;
        const list = Array.isArray(json.worlds) ? json.worlds : [];
        setSavedWorlds(list);
        setSelectedId((prev) =>
          prev && list.some((w) => w.id === prev) ? prev : (list[0]?.id ?? ''),
        );
      })
      .catch(() => {
        if (!cancelled) setSaveMsg('Could not load saved worlds.');
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setSaveMsg(null);
    setDungeonMsg(null);
    setCombatMsg(null);
    onClose();
  };

  const handleReset = () => {
    onConfigChange(DEFAULT_CONFIG);
  };

  const handleRandomizeSeed = () => {
    const seed =
      Math.floor(Math.random() * (FIELD_BOUNDS.seed.max - 1)) + 1;
    onConfigChange({ ...config, seed });
  };

  const handleGenerateDungeon = () => {
    const ok = onGenerateDungeon();
    setDungeonMsg(
      ok
        ? null
        : 'All planned dungeons are already placed — change the seed for a new layout.',
    );
  };

  const handleDeleteDungeon = () => {
    const ok = onDeleteDungeon();
    setDungeonMsg(ok ? null : 'No dungeons to remove.');
  };

  const handleSummonAgent = () => {
    const ok = onSummonAgent?.() ?? false;
    setCombatMsg(ok ? null : 'Could not summon agent (no walkable tile?).');
  };

  const handleSummonDummy = () => {
    const ok = onSummonDummy?.() ?? false;
    setCombatMsg(ok ? null : 'Could not summon dummy (no walkable tile?).');
  };

  const handleSummonBoth = () => {
    const ok = onSummonBoth?.() ?? false;
    setCombatMsg(ok ? null : 'Could not summon pair (no walkable tiles?).');
  };

  const handleAttackOnce = () => {
    const r = onAttackOnce?.() ?? null;
    setCombatMsg(
      r
        ? null
        : 'Nothing to hit — summon both agent and dummy first.',
    );
  };

  const handleSave = async () => {
    setSaveMsg(null);
    const data = getWorldData();
    if (!data) {
      setSaveMsg('Nothing to save yet.');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/worlds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: worldName.trim() === '' ? null : worldName.trim(),
          config: data.config,
          dungeons: data.dungeons,
        }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setSaveMsg(err.error ?? 'Save failed.');
        return;
      }
      const json = (await res.json()) as {
        world?: { id: string; name: string | null };
      };
      setSaveMsg(
        `Saved "${json.world?.name ?? 'Untitled'}" (${data.dungeons.length} dungeon${data.dungeons.length === 1 ? '' : 's'}).`,
      );
      setWorldName('');
      await fetchWorlds();
      if (json.world?.id) setSelectedId(json.world.id);
    } catch {
      setSaveMsg('Save failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleLoad = async () => {
    if (!selectedId) {
      setSaveMsg('Pick a saved world first.');
      return;
    }
    setSaveMsg(null);
    try {
      const res = await fetch(`/api/worlds/${selectedId}`);
      if (!res.ok) {
        setSaveMsg('Load failed.');
        return;
      }
      const json = (await res.json()) as {
        world?: { config: GameConfig; dungeons: WorldData['dungeons'] };
      };
      if (!json.world) {
        setSaveMsg('Load failed.');
        return;
      }
      onLoadWorld({ config: json.world.config, dungeons: json.world.dungeons });
      setSaveMsg('World loaded.');
    } catch {
      setSaveMsg('Load failed.');
    }
  };

  const handleDeleteSaved = async () => {
    if (!selectedId) {
      setSaveMsg('Pick a saved world first.');
      return;
    }
    setSaveMsg(null);
    try {
      const res = await fetch(`/api/worlds/${selectedId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        setSaveMsg('Delete failed.');
        return;
      }
      setSaveMsg('Saved world deleted.');
      await fetchWorlds();
    } catch {
      setSaveMsg('Delete failed.');
    }
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
    const clamped = Math.min(max, Math.max(min, parsed));
    setDrafts((prev) => ({ ...prev, [key]: String(clamped) }));
    if (clamped !== config[key]) {
      onConfigChange({ ...config, [key]: clamped });
    }
  };

  const renderNumberRow = (key: NumericFieldKey, label: string) => (
    <div className="flex flex-col gap-0.5">
      <label htmlFor={key} className="text-[11px] text-gray-300 truncate">
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
        className="bg-gray-900 border border-gray-600 text-amber-100 rounded w-full px-1.5 py-0.5 text-xs text-right"
      />
    </div>
  );

  return (
    <div className="absolute top-10 right-2 z-50 w-full max-w-xs max-h-[calc(100%-3rem)] overflow-y-auto bg-gradient-to-b from-gray-800 to-gray-900 rounded-md shadow-2xl border border-amber-900/30 text-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-amber-900/30 bg-gray-800/50">
          <h2 className="text-sm font-bold text-amber-100">Configuration</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-amber-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
        <div className="p-2.5 space-y-3">
          {/* Seed */}
          <section>
            <h3 className="text-xs font-semibold text-amber-200 mb-1.5">Seed</h3>
            <div className="space-y-1.5">
              <div className="flex items-end gap-1.5">
                <div className="flex-1">{renderNumberRow('seed', 'Seed')}</div>
                <button
                  onClick={handleRandomizeSeed}
                  title="Randomize seed"
                  className="px-2 py-0.5 text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 rounded border border-gray-600 transition-colors"
                >
                  🎲
                </button>
              </div>
              <p className="text-[11px] text-gray-500">
                Same seed + settings always yields the same map.
              </p>
            </div>
          </section>

          {/* Dungeons */}
          <section>
            <h3 className="text-xs font-semibold text-amber-200 mb-1.5">Dungeons</h3>
            <div className="space-y-1.5">
              <p className="text-xs text-gray-300">
                Dungeons on map:{' '}
                <span className="text-amber-100">{dungeonCount}</span>
              </p>
              <div className="flex gap-1.5">
                <button
                  onClick={handleGenerateDungeon}
                  className="flex-1 px-2 py-1 text-xs bg-emerald-900/60 hover:bg-emerald-800/60 text-emerald-100 rounded border border-emerald-700/50 transition-colors"
                >
                  Generate Dungeon
                </button>
                <button
                  onClick={handleDeleteDungeon}
                  className="flex-1 px-2 py-1 text-xs bg-orange-900/60 hover:bg-orange-800/60 text-orange-100 rounded border border-orange-700/50 transition-colors"
                >
                  Delete Dungeon
                </button>
              </div>
              {dungeonMsg && (
                <p className="text-xs text-red-300">{dungeonMsg}</p>
              )}
            </div>
          </section>

          {/* Save / Load */}
          <section>
            <h3 className="text-xs font-semibold text-amber-200 mb-1.5">Save / Load</h3>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-1.5">
                <label htmlFor="worldName" className="text-xs text-gray-300">
                  World Name
                </label>
                <input
                  id="worldName"
                  type="text"
                  value={worldName}
                  onChange={(e) => setWorldName(e.target.value)}
                  placeholder="Untitled"
                  className="bg-gray-900 border border-gray-600 text-amber-100 rounded w-36 px-1.5 py-0.5 text-xs"
                />
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full px-2 py-1 text-xs bg-sky-900/60 hover:bg-sky-800/60 disabled:opacity-50 text-sky-100 rounded border border-sky-700/50 transition-colors"
              >
                {saving ? 'Saving…' : 'Save World to Neon'}
              </button>
              <div className="flex items-center justify-between gap-1.5">
                <label htmlFor="savedWorlds" className="text-xs text-gray-300">
                  Saved Worlds
                </label>
                <select
                  id="savedWorlds"
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="bg-gray-900 border border-gray-600 text-amber-100 rounded w-36 px-1.5 py-0.5 text-xs"
                >
                  {savedWorlds.length === 0 && (
                    <option value="">No saved worlds</option>
                  )}
                  {savedWorlds.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name ?? 'Untitled'}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={handleLoad}
                  className="flex-1 px-2 py-1 text-xs bg-indigo-900/60 hover:bg-indigo-800/60 text-indigo-100 rounded border border-indigo-700/50 transition-colors"
                >
                  Load
                </button>
                <button
                  onClick={handleDeleteSaved}
                  className="flex-1 px-2 py-1 text-xs bg-red-900/60 hover:bg-red-800/60 text-red-100 rounded border border-red-700/50 transition-colors"
                >
                  Delete Saved
                </button>
              </div>
              {saveMsg && (
                <p className="text-xs text-gray-300">{saveMsg}</p>
              )}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-2.5 border-t border-amber-900/30 flex flex-col gap-1.5 bg-gray-800/50">
          <div className="flex gap-1.5">
            <button
              onClick={handleReset}
              className="flex-1 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 rounded transition-colors border border-gray-600"
            >
              Reset to Default
            </button>
            <button
              onClick={handleClose}
              className="flex-1 px-2 py-1 text-xs bg-amber-900/50 hover:bg-amber-800/50 text-amber-100 rounded transition-colors border border-amber-700/50"
            >
              Close
            </button>
          </div>
        </div>
    </div>
  );
}
