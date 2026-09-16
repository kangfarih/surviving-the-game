import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Load .env.local (where DATABASE_URL lives) for the drizzle-kit CLI.
// Next.js loads .env* files automatically at runtime, but drizzle-kit runs
// outside Next, so we load it explicitly here.
dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error(
    'Missing DATABASE_URL. Paste your Neon connection string into .env.local:\n' +
      '  DATABASE_URL=postgresql://<user>:<password>@<host>/<dbname>?sslmode=require\n' +
      'Find it in the Neon dashboard → your project → Connection string. ' +
      'See .env.local.example for details.',
  );
}

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
