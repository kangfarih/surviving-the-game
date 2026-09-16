import { bigint, integer, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

// Phase 1 persistence: configs + worlds only. No runs/ticks yet.

export const GENERATOR_VERSION = 'gen-v1';

export const worldConfigs = pgTable('world_configs', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  config: jsonb('config').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const worlds = pgTable('worlds', {
  id: uuid('id').defaultRandom().primaryKey(),
  worldConfigId: uuid('world_config_id').references(() => worldConfigs.id),
  // Seed fits in a JS number (Date.now() magnitude); stored as bigint.
  seed: bigint('seed', { mode: 'number' }).notNull(),
  generatorVersion: text('generator_version')
    .default(GENERATOR_VERSION)
    .notNull(),
  width: integer('width').notNull(),
  height: integer('height').notNull(),
  // Effective GameConfig + dungeon summary used to regenerate deterministically.
  mapConfig: jsonb('map_config').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type WorldConfigRow = typeof worldConfigs.$inferSelect;
export type WorldRow = typeof worlds.$inferSelect;
