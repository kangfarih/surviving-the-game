import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db/client';
import { worlds } from '@/db/schema';
import { renderWorld } from '@/game/dungeon/generator';
import { hashTileMap, missingDbResponse, storedWorldData } from '@/db/worldgen';

// Never statically prerender: this handler needs a live DATABASE_URL.
export const dynamic = 'force-dynamic';

// GET /api/worlds/[id] — load one saved world (full config + dungeons).
// Pass ?tiles=1 to also render the tile grid + hash.
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

    const stored = storedWorldData(row);
    const withTiles = request.nextUrl.searchParams.get('tiles') === '1';
    const tileMap = withTiles
      ? renderWorld(stored.config, stored.dungeons)
      : null;

    return Response.json({
      world: {
        id: row.id,
        name: row.name,
        worldConfigId: row.worldConfigId,
        seed: row.seed,
        generatorVersion: row.generatorVersion,
        width: row.width,
        height: row.height,
        config: stored.config,
        dungeons: stored.dungeons,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        ...(tileMap
          ? { hash: hashTileMap(tileMap), tiles: tileMap.tiles }
          : {}),
      },
    });
  } catch (err) {
    return missingDbResponse(err);
  }
}

// DELETE /api/worlds/[id] — delete a saved world (FIFO's saved-data twin).
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const [deleted] = await getDb()
      .delete(worlds)
      .where(eq(worlds.id, id))
      .returning({ id: worlds.id });
    if (!deleted) {
      return Response.json({ error: `world not found: ${id}` }, { status: 404 });
    }
    return Response.json({ ok: true, id: deleted.id });
  } catch (err) {
    return missingDbResponse(err);
  }
}
