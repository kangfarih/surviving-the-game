import type { NextRequest } from 'next/server';
import { getDb } from '@/db/client';
import { worldConfigs } from '@/db/schema';
import { missingDbResponse, resolveConfig } from '@/db/worldgen';

// Never statically prerender: these handlers need a live DATABASE_URL.
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rows = await getDb().select().from(worldConfigs);
    return Response.json({ configs: rows });
  } catch (err) {
    return missingDbResponse(err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const name =
      typeof (body as { name?: unknown }).name === 'string'
        ? (body as { name: string }).name
        : null;
    const config = resolveConfig((body as { config?: unknown }).config);
    const [row] = await getDb()
      .insert(worldConfigs)
      .values({ name, config })
      .returning();
    return Response.json({ config: row }, { status: 201 });
  } catch (err) {
    return missingDbResponse(err);
  }
}
