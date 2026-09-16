import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Lazy Neon HTTP client.
//
// Do NOT create the client at module top-level: builds (next build) run
// without DATABASE_URL set, and any throw at import time would fail the
// build. Call getDb() inside Route Handlers instead, so the error only
// surfaces at request time when the env var is genuinely needed.
type Db = ReturnType<typeof drizzle<typeof schema>>;

let cached: Db | null = null;

function missingDbUrlError(): Error {
  return new Error(
    'Missing DATABASE_URL. Paste your Neon connection string into .env.local:\n' +
      '  DATABASE_URL=postgresql://<user>:<password>@<host>/<dbname>?sslmode=require\n' +
      'Find it in the Neon dashboard → your project → Connection string. ' +
      'See .env.local.example for details.',
  );
}

export function getDb(): Db {
  const url = process.env.DATABASE_URL;
  if (!url) throw missingDbUrlError();
  if (!cached) {
    cached = drizzle(neon(url), { schema });
  }
  return cached;
}

export function hasDbUrl(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
