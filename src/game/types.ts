// Game Configuration Types
export interface GameConfig {
  // Random seed for deterministic world generation.
  // When undefined (e.g. configs saved before seeds existed), generators
  // must fall back to Date.now().
  seed: number;

  // Map settings (in tiles)
  mapWidth: number;
  mapHeight: number;
  
  // Tile settings
  tilePixelSize: number;
  
  // City settings
  includeCity: boolean;
  cityWidth: number; // in tiles
  cityHeight: number; // in tiles

  // Dungeon settings (gen-v2: full-fill pack + BSP, ported from the
  // standalone dungeon-generator.html prototype)
  minRoomSize: number; // in tiles — smallest playable room floor
  minRoomsPerDungeon: number; // incl. boss room
  maxRoomsPerDungeon: number; // incl. boss room

  // Deprecated gen-v1 fields. Kept optional so legacy saved worlds still
  // load; ignored by the gen-v2 generator (see resolveConfig migration).
  roomsPerDungeon?: number;
  maxRoomSize?: number; // in tiles
  corridorWidth?: number; // in tiles
}

export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Room {
  id: number;
  rect: Rect;
  connected: number[]; // IDs of connected rooms
  isStart: boolean;
  isBoss: boolean;
}

export interface Dungeon {
  id: number;
  rooms: Room[];
  bossRoomId: number;
  startRoomId: number;
}

export interface WorldData {
  config: GameConfig;
  dungeons: Dungeon[];
}

export interface City {
  rect: Rect;
  buildings: Rect[];
}

export interface TileMap {
  width: number;
  height: number;
  tiles: TileType[][];
}

export enum TileType {
  EMPTY = 0,
  WALL = 1,
  FLOOR = 2,
  CORRIDOR = 3,
  CITY_FLOOR = 4,
  CITY_WALL = 5,
  DOOR = 6,
  BOSS_FLOOR = 7,
  START_FLOOR = 8,
}

export const DEFAULT_CONFIG: GameConfig = {
  seed: 1337,
  mapWidth: 200,
  mapHeight: 100,
  tilePixelSize: 16,
  includeCity: true,
  cityWidth: 50,
  cityHeight: 30,
  minRoomSize: 15,
  minRoomsPerDungeon: 5,
  maxRoomsPerDungeon: 10,
};
