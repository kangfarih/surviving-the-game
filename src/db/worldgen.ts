import { createHash } from 'node:crypto';
import { DEFAULT_CONFIG, GameConfig, TileMap } from '@/game/types';

// Merge a partial client-supplied config over defaults. Seed falls back to
// Date.now() so worlds are always reproducible once persisted.
export function resolveConfig(input: unknown): GameConfig {
  const partial =
    input && typeof input === 'object'
      ? (input as Partial<GameConfig>)
      : {};
  return {
    ...DEFAULT_CONFIG,
    ...partial,
    seed:
      typeof partial.seed === 'number' && Number.isFinite(partial.seed)
        ? partial.seed
        : (DEFAULT_CONFIG.seed ?? Date.now()),
  };
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
