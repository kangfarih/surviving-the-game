import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db/client';
import { GENERATOR_VERSION, worldConfigs, worlds } from '@/db/schema';
import { generateTileMap } from '@/game/dungeon/generator';
import { GameConfig } from '@/game/types';
import { hashTileMap, missingDbResponse, resolveConfig } from '@/db/worldgen';

// Never statically prerender: these handlers need a live DATABASE_URL.
export const dynamic = 'force-dynamic';

function includeTiles(request: NextRequest): boolean {
  return request.nextUrl.searchParams.get('tiles') === '1';
}

export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json().catch(() => ({}));
    const {
      worldConfigId,
      seed,
      config: rawConfig,
    } = body as {
      worldConfigId?: unknown;
      seed?: unknown;
      config?: unknown;
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

    const { tileMap, dungeons } = generateTileMap(config);
    const hash = hashTileMap(tileMap);

    const [row] = await db
      .insert(worlds)
      .values({
        worldConfigId: configId,
        seed: config.seed,
        generatorVersion: GENERATOR_VERSION,
        width: tileMap.width,
        height: tileMap.height,
        mapConfig: { config, dungeons },
      })
      .returning();

    const withTiles = includeTiles(request);
    return Response.json(
      {
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
      },
      { status: 201 },
    );
  } catch (err) {
    return missingDbResponse(err);
  }
}
