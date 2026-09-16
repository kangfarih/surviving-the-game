// Game Configuration Types
export interface GameConfig {
  // Map settings (in tiles)
  mapWidth: number;
  mapHeight: number;
  
  // Tile settings
  tilePixelSize: number;
  
  // City settings
  includeCity: boolean;
  citySize: number; // in tiles
  
  // Dungeon settings
  dungeonCount: number;
  roomsPerDungeon: number;
  minRoomSize: number; // in tiles
  maxRoomSize: number; // in tiles
  corridorWidth: number; // in tiles
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
  mapWidth: 100,
  mapHeight: 80,
  tilePixelSize: 16,
  includeCity: true,
  citySize: 20,
  dungeonCount: 3,
  roomsPerDungeon: 5,
  minRoomSize: 5,
  maxRoomSize: 10,
  corridorWidth: 2,
};
