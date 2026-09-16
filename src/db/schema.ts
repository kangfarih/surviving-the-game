import { bigint, integer, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import type { Dungeon, GameConfig } from '@/game/types';

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
  // Display name for save/load (nullable for legacy rows).
  name: text('name'),
  worldConfigId: uuid('world_config_id').references(() => worldConfigs.id),
  // Seed fits in a JS number (Date.now() magnitude); stored as bigint.
  seed: bigint('seed', { mode: 'number' }).notNull(),
  generatorVersion: text('generator_version')
    .default(GENERATOR_VERSION)
    .notNull(),
  width: integer('width').notNull(),
  height: integer('height').notNull(),
  // Legacy payload: { config, dungeons } used for deterministic regen.
  // Kept for backward compat; new writes duplicate the data into the
  // explicit `config` / `dungeons` columns below.
  mapConfig: jsonb('map_config').notNull(),
  // Full persisted WorldData. Appended dungeons can't be reproduced from
  // seed + config regen, so the explicit dungeon list is stored as-is.
  config: jsonb('config').$type<GameConfig>(),
  dungeons: jsonb('dungeons').$type<Dungeon[]>().notNull().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type WorldConfigRow = typeof worldConfigs.$inferSelect;
export type WorldRow = typeof worlds.$inferSelect;
