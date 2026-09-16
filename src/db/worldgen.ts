import { createHash } from 'node:crypto';
import { DEFAULT_CONFIG, Dungeon, GameConfig, TileMap } from '@/game/types';

// Merge a partial client-supplied config over defaults. Seed falls back to
// Date.now() so worlds are always reproducible once persisted.
//
// gen-v2 migration: legacy configs carry `roomsPerDungeon` instead of
// `min/maxRoomsPerDungeon` — derive the range from it when the new fields
// are absent. Unknown legacy keys (maxRoomSize, corridorWidth) ride along
// harmlessly via the spread and are ignored by the generator.
export function resolveConfig(input: unknown): GameConfig {
  const partial =
    input && typeof input === 'object'
      ? (input as Partial<GameConfig>)
      : {};
  const merged: GameConfig = {
    ...DEFAULT_CONFIG,
    ...partial,
    seed:
      typeof partial.seed === 'number' && Number.isFinite(partial.seed)
        ? partial.seed
        : (DEFAULT_CONFIG.seed ?? Date.now()),
  };
  const legacyRooms =
    typeof partial.roomsPerDungeon === 'number' &&
    Number.isFinite(partial.roomsPerDungeon)
      ? Math.max(1, Math.floor(partial.roomsPerDungeon))
      : null;
  if (
    legacyRooms !== null &&
    (typeof merged.minRoomsPerDungeon !== 'number' ||
      typeof merged.maxRoomsPerDungeon !== 'number')
  ) {
    merged.minRoomsPerDungeon = legacyRooms;
    merged.maxRoomsPerDungeon = legacyRooms;
  }
  if (
    typeof merged.minRoomsPerDungeon !== 'number' ||
    typeof merged.maxRoomsPerDungeon !== 'number'
  ) {
    merged.minRoomsPerDungeon = DEFAULT_CONFIG.minRoomsPerDungeon;
    merged.maxRoomsPerDungeon = DEFAULT_CONFIG.maxRoomsPerDungeon;
  }
  if (merged.minRoomsPerDungeon > merged.maxRoomsPerDungeon) {
    const swap = merged.minRoomsPerDungeon;
    merged.minRoomsPerDungeon = merged.maxRoomsPerDungeon;
    merged.maxRoomsPerDungeon = swap;
  }
  return merged;
}

// Short deterministic fingerprint of a generated tile grid.
export function hashTileMap(tileMap: TileMap): string {
  return createHash('sha256')
    .update(JSON.stringify(tileMap.tiles))
    .digest('hex')
    .slice(0, 16);
}

export function missingDbResponse(err: unknown): Response {
  const message = err instanceof Error ? err.message : String(err);
  const status = message.includes('Missing DATABASE_URL') ? 500 : 500;
  return Response.json({ error: message }, { status });
}

// Read back a stored world's full WorldData (config + explicit dungeons).
// Prefers the explicit `config` / `dungeons` columns; falls back to the
// legacy `mapConfig` payload ({ config, dungeons }) for pre-migration rows.
export function storedWorldData(row: {
  config?: unknown;
  dungeons?: unknown;
  mapConfig?: unknown;
}): { config: GameConfig; dungeons: Dungeon[] } {
  const legacy =
    row.mapConfig && typeof row.mapConfig === 'object'
      ? (row.mapConfig as { config?: unknown; dungeons?: unknown })
      : {};
  const config = resolveConfig(
    row.config && typeof row.config === 'object' ? row.config : legacy.config,
  );
  const raw = Array.isArray(row.dungeons)
    ? row.dungeons
    : Array.isArray(legacy.dungeons)
      ? legacy.dungeons
      : [];
  return { config, dungeons: raw as Dungeon[] };
}
