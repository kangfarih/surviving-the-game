import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db/client';
import { worlds } from '@/db/schema';
import { generateTileMap } from '@/game/dungeon/generator';
import { hashTileMap, missingDbResponse, resolveConfig } from '@/db/worldgen';

// Never statically prerender: this handler needs a live DATABASE_URL.
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const [row] = await getDb()
      .select()
      .from(worlds)
      .where(eq(worlds.id, id));
    if (!row) {
      return Response.json({ error: `world not found: ${id}` }, { status: 404 });
    }

    // Regenerate deterministically from the persisted seed + config.
    const stored = row.mapConfig as { config?: unknown } | null;
    const config = resolveConfig(stored?.config);
    const { tileMap, dungeons } = generateTileMap({
      ...config,
      seed: row.seed,
    });
    const hash = hashTileMap(tileMap);

    const withTiles = request.nextUrl.searchParams.get('tiles') === '1';
    return Response.json({
      world: {
        id: row.id,
        worldConfigId: row.worldConfigId,
        seed: row.seed,
        generatorVersion: row.generatorVersion,
        width: row.width,
        height: row.height,
        hash,
        config,
        ...(withTiles ? { tiles: tileMap.tiles, dungeons } : {}),
      },
    });
  } catch (err) {
    return missingDbResponse(err);
  }
}
