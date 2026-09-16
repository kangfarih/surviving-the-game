import type { NextRequest } from 'next/server';
import { desc, eq } from 'drizzle-orm';
import { getDb } from '@/db/client';
import { GENERATOR_VERSION, worldConfigs, worlds } from '@/db/schema';
import { renderWorld } from '@/game/dungeon/generator';
import { Dungeon, GameConfig } from '@/game/types';
import {
  hashTileMap,
  missingDbResponse,
  resolveConfig,
  storedWorldData,
} from '@/db/worldgen';

// Never statically prerender: these handlers need a live DATABASE_URL.
export const dynamic = 'force-dynamic';

function includeTiles(request: NextRequest): boolean {
  return request.nextUrl.searchParams.get('tiles') === '1';
}

// GET /api/worlds — list saved worlds by recency (lightweight summaries).
export async function GET() {
  try {
    const rows = await getDb()
      .select({
        id: worlds.id,
        name: worlds.name,
        updatedAt: worlds.updatedAt,
      })
      .from(worlds)
      .orderBy(desc(worlds.updatedAt));
    return Response.json({ worlds: rows });
  } catch (err) {
    return missingDbResponse(err);
  }
}

function asDungeons(input: unknown): Dungeon[] {
  return Array.isArray(input) ? (input as Dungeon[]) : [];
}

// POST /api/worlds — save (insert) or upsert (when `id` matches a row) a
// FULL world: { id?, name?, config, dungeons }. The explicit dungeons array
// is stored as-is because appended dungeons can't be reproduced from
// seed + config regen.
//
// Legacy shape still accepted: { worldConfigId?, seed?, config? } persists
// a world with an empty dungeon list (or the stored dungeons when the
// caller passes them along).
export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json().catch(() => ({}));
    const {
      id: rawId,
      name: rawName,
      worldConfigId,
      seed,
      config: rawConfig,
      dungeons: rawDungeons,
    } = body as {
      id?: unknown;
      name?: unknown;
      worldConfigId?: unknown;
      seed?: unknown;
      config?: unknown;
      dungeons?: unknown;
    };

    // Resolve the effective config: stored config wins when worldConfigId is
    // given, otherwise merge the inline config (or defaults).
    let config: GameConfig;
    let configId: string | null = null;
    if (typeof worldConfigId === 'string') {
      const [stored] = await db
        .select()
        .from(worldConfigs)
        .where(eq(worldConfigs.id, worldConfigId));
      if (!stored) {
        return Response.json(
          { error: `worldConfigId not found: ${worldConfigId}` },
          { status: 404 },
        );
      }
      configId = stored.id;
      config = resolveConfig({
        ...(stored.config as object),
        ...(typeof rawConfig === 'object' ? rawConfig : {}),
      });
    } else {
      config = resolveConfig(rawConfig);
    }

    if (typeof seed === 'number' && Number.isFinite(seed)) {
      config = { ...config, seed };
    }

    const name =
      typeof rawName === 'string' && rawName.trim() !== ''
        ? rawName.trim()
        : null;
    const dungeons = asDungeons(rawDungeons);

    const values = {
      name,
      worldConfigId: configId,
      seed: config.seed,
      generatorVersion: GENERATOR_VERSION,
      width: config.mapWidth,
      height: config.mapHeight,
      // Legacy payload kept in sync so pre-migration readers still work.
      mapConfig: { config, dungeons },
      config,
      dungeons,
      updatedAt: new Date(),
    };

    let row;
    let status = 201;
    if (typeof rawId === 'string' && rawId !== '') {
      const [existing] = await db
        .select({ id: worlds.id })
        .from(worlds)
        .where(eq(worlds.id, rawId));
      if (existing) {
        [row] = await db
          .update(worlds)
          .set(values)
          .where(eq(worlds.id, rawId))
          .returning();
        status = 200;
      } else {
        // Upsert with a client-supplied id: insert under that id.
        [row] = await db
          .insert(worlds)
          .values({ id: rawId, ...values })
          .returning();
      }
    } else {
      [row] = await db.insert(worlds).values(values).returning();
    }
    if (!row) {
      return Response.json({ error: 'Failed to save world' }, { status: 500 });
    }

    const stored = storedWorldData(row);
    const withTiles = includeTiles(request);
    const tileMap = withTiles ? renderWorld(stored.config, stored.dungeons) : null;

    return Response.json(
      {
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
      },
      { status },
    );
  } catch (err) {
    return missingDbResponse(err);
  }
}
