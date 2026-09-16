import {
  Dungeon,
  Room,
  Rect,
  Point,
  GameConfig,
  TileType,
  TileMap,
} from '../types';

// ---------------------------------------------------------------------------
// Seeded random number generator for reproducibility
// ---------------------------------------------------------------------------
export class SeededRandom {
  private seed: number;

  constructor(seed: number = Date.now()) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 16807 + 0) % 2147483647;
    return this.seed / 2147483647;
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  /** Return a random element from the array. */
  pick<T>(arr: T[]): T {
    return arr[this.nextInt(0, arr.length - 1)];
  }
}

/** Factory for a persistent RNG instance (engine holds one across dungeons). */
export function createRng(seed: number = Date.now()): SeededRandom {
  return new SeededRandom(seed);
}

// ---------------------------------------------------------------------------
// Geometry helpers
// ---------------------------------------------------------------------------

/** Check if two rectangles overlap (with optional padding between them). */
function rectsOverlap(a: Rect, b: Rect, padding: number = 1): boolean {
  return !(
    a.x + a.width + padding <= b.x ||
    b.x + b.width + padding <= a.x ||
    a.y + a.height + padding <= b.y ||
    b.y + b.height + padding <= a.y
  );
}

/** Check that `rect` fits entirely inside `bounds`. */
function isWithinBounds(rect: Rect, bounds: Rect): boolean {
  return (
    rect.x >= bounds.x &&
    rect.y >= bounds.y &&
    rect.x + rect.width <= bounds.x + bounds.width &&
    rect.y + rect.height <= bounds.y + bounds.height
  );
}

/** Return the center of a rectangle as a Point. */
function rectCenter(rect: Rect): Point {
  return {
    x: Math.floor(rect.x + rect.width / 2),
    y: Math.floor(rect.y + rect.height / 2),
  };
}

/**
 * Centered city rect (`cityWidth x cityHeight`), or null when the city is
 * disabled. Returns the rect even if it slightly exceeds tiny maps; callers
 * clip when rendering.
 */
export function getCityRect(config: GameConfig): Rect | null {
  if (!config.includeCity) return null;
  return {
    x: Math.floor((config.mapWidth - config.cityWidth) / 2),
    y: Math.floor((config.mapHeight - config.cityHeight) / 2),
    width: config.cityWidth,
    height: config.cityHeight,
  };
}

/**
 * Try to place one room in a bounded grid slot. The slot is the important
 * difference from the old random-walk approach: every requested room gets a
 * finite set of valid locations instead of depending on a path crossing a
 * usable point at exactly the right time.
 */
function tryStampRoom(
  rng: SeededRandom,
  slot: Rect,
  bounds: Rect,
  config: GameConfig,
  existingRooms: Room[],
  localRooms: Room[],
  id: number,
  isBoss: boolean = false,
): Room | null {
  // Boss rooms get 2x size multiplier, but capped to dungeon bounds
  const sizeMultiplier = isBoss ? 2.0 : 1.0;
  const effectiveMin = Math.max(config.minRoomSize, 5);
  const effectiveMax = Math.min(
    Math.floor(config.maxRoomSize * sizeMultiplier),
    bounds.width,
    bounds.height,
  );

  if (effectiveMin > effectiveMax) return null;

  const width = rng.nextInt(effectiveMin, effectiveMax);
  const height = rng.nextInt(effectiveMin, effectiveMax);

  // Position: center the room randomly within the slot, but clamp to bounds
  const maxX = bounds.x + bounds.width - width;
  const maxY = bounds.y + bounds.height - height;
  const x = rng.nextInt(
    Math.max(bounds.x, slot.x - Math.floor(width / 3)),
    Math.min(maxX, slot.x + slot.width),
  );
  const y = rng.nextInt(
    Math.max(bounds.y, slot.y - Math.floor(height / 3)),
    Math.min(maxY, slot.y + slot.height),
  );

  const candidate: Rect = { x, y, width, height };

  // Must fit within dungeon bounds
  if (!isWithinBounds(candidate, bounds)) return null;

  // Must not overlap existing rooms (cross-dungeon: 2 tile gap, intra: 1 tile)
  if (existingRooms.some((r) => rectsOverlap(candidate, r.rect, 2))) {
    return null;
  }
  if (localRooms.some((r) => rectsOverlap(candidate, r.rect, 1))) {
    return null;
  }

  return { id, rect: candidate, connected: [], isStart: false, isBoss: false };
}

// ---------------------------------------------------------------------------
// generateDungeon – bounded grid room placement + graph corridors
// ---------------------------------------------------------------------------

function generateDungeon(
  id: number,
  bounds: Rect,
  config: GameConfig,
  rng: SeededRandom,
  existingRooms: Room[],
): Dungeon {
  const empty: Dungeon = { id, rooms: [], bossRoomId: 0, startRoomId: 0 };

  const slotGap = 2;
  const minRoomSize = Math.max(1, config.minRoomSize);
  const columns = Math.max(
    1,
    Math.floor((bounds.width + slotGap) / (minRoomSize + slotGap)),
  );
  const rows = Math.max(
    1,
    Math.floor((bounds.height + slotGap) / (minRoomSize + slotGap)),
  );
  const slotWidth = Math.floor(
    (bounds.width - slotGap * (columns - 1)) / columns,
  );
  const slotHeight = Math.floor(
    (bounds.height - slotGap * (rows - 1)) / rows,
  );
  if (slotWidth < minRoomSize || slotHeight < minRoomSize) return empty;

  const slots: Rect[] = [];
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      slots.push({
        x: bounds.x + column * (slotWidth + slotGap),
        y: bounds.y + row * (slotHeight + slotGap),
        width: slotWidth,
        height: slotHeight,
      });
    }
  }

  // Shuffle slots so the layout stays varied while every room remains bounded.
  for (let i = slots.length - 1; i > 0; i--) {
    const swapIndex = rng.nextInt(0, i);
    [slots[i], slots[swapIndex]] = [slots[swapIndex], slots[i]];
  }

  const rooms: Room[] = [];
  for (const slot of slots) {
    if (rooms.length >= config.roomsPerDungeon) break;
    const isLastSlot = rooms.length === config.roomsPerDungeon - 1;
    const room = tryStampRoom(
      rng,
      slot,
      bounds,
      config,
      existingRooms,
      rooms,
      rooms.length,
      isLastSlot, // boss room gets size multiplier
    );
    if (room) {
      rooms.push(room);
    }
  }

  if (rooms.length < 2) return empty;

  // Mark exactly one start (first) and one boss (last), wire the chain.
  for (let i = 0; i < rooms.length; i++) {
    rooms[i].isStart = i === 0;
    rooms[i].isBoss = i === rooms.length - 1;
    rooms[i].connected = [];
  }
  for (let i = 1; i < rooms.length; i++) {
    rooms[i].connected.push(rooms[i - 1].id);
    rooms[i - 1].connected.push(rooms[i].id);
  }

  return {
    id,
    rooms,
    bossRoomId: rooms[rooms.length - 1].id,
    startRoomId: rooms[0].id,
  };
}

// ---------------------------------------------------------------------------
// Single-dungeon placement on a golden-angle circle
// ---------------------------------------------------------------------------

/** Golden angle in radians (~137.5°) for even angular distribution. */
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/** Compute the dungeon bounds rect for a given angle around the map center. */
function boundsForAngle(config: GameConfig, angle: number): Rect {
  const gridWidth = config.mapWidth;
  const gridHeight = config.mapHeight;
  const minDim = Math.min(gridWidth, gridHeight);
  const dungeonAreaSize = Math.floor(minDim * 0.45);
  const circleRadius = Math.floor(minDim * 0.4);

  const centerX = Math.floor(gridWidth / 2 + Math.cos(angle) * circleRadius);
  const centerY = Math.floor(gridHeight / 2 + Math.sin(angle) * circleRadius);

  return {
    x: Math.max(2, centerX - Math.floor(dungeonAreaSize / 2)),
    y: Math.max(2, centerY - Math.floor(dungeonAreaSize / 2)),
    width: Math.min(dungeonAreaSize, gridWidth - 4),
    height: Math.min(dungeonAreaSize, gridHeight - 4),
  };
}

/**
 * Place a single dungeon on a circle around the map center. The base angle
 * derives from the golden angle times the dungeon index, plus jitter; up to
 * ~8 angle/bounds attempts are tried. Returns null when fewer than 2 rooms
 * could be stamped (map full). `existingRooms` must include the city pseudo-room plus
 * all previous dungeons' rooms so the new dungeon never overlaps them.
 */
export function generateSingleDungeon(
  config: GameConfig,
  existingRooms: Room[],
  index: number,
  rng: SeededRandom,
): Dungeon | null {
  const baseAngle = index * GOLDEN_ANGLE;

  for (let attempt = 0; attempt < 8; attempt++) {
    // Spread retries around the circle with a bit of random jitter.
    const angle =
      baseAngle + attempt * (Math.PI / 4) + rng.next() * 0.5;
    const bounds = boundsForAngle(config, angle);
    const dungeon = generateDungeon(index, bounds, config, rng, existingRooms);
    if (dungeon.rooms.length >= 2) {
      return dungeon;
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// Corridor generation (L-shaped, walls on both sides)
// ---------------------------------------------------------------------------

function generateCorridor(
  from: Room,
  to: Room,
  tileMap: TileMap,
  config: GameConfig,
  rng: SeededRandom,
): void {
  const fromCenter = rectCenter(from.rect);
  const toCenter = rectCenter(to.rect);

  // Randomly choose horizontal-first or vertical-first for the L-shape
  const horizontalFirst = rng.next() < 0.5;

  /** Helper to stamp corridor tiles along a segment. */
  const stamp = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ) => {
    const sx = Math.min(x1, x2);
    const ex = Math.max(x1, x2);
    const sy = Math.min(y1, y2);
    const ey = Math.max(y1, y2);

    const halfWidth = Math.floor(config.corridorWidth / 2);

    // Determine if this is a horizontal or vertical segment
    if (sy === ey) {
      // Horizontal segment: expand Y range by halfWidth
      for (let x = sx; x <= ex; x++) {
        for (let y = sy - halfWidth; y <= sy + halfWidth; y++) {
          if (y >= 0 && y < tileMap.height && x >= 0 && x < tileMap.width) {
            if (tileMap.tiles[y][x] === TileType.EMPTY) {
              tileMap.tiles[y][x] = TileType.CORRIDOR;
            }
          }
        }
      }
    } else {
      // Vertical segment: expand X range by halfWidth
      for (let y = sy; y <= ey; y++) {
        for (let x = sx - halfWidth; x <= sx + halfWidth; x++) {
          if (y >= 0 && y < tileMap.height && x >= 0 && x < tileMap.width) {
            if (tileMap.tiles[y][x] === TileType.EMPTY) {
              tileMap.tiles[y][x] = TileType.CORRIDOR;
            }
          }
        }
      }
    }
  };

  if (horizontalFirst) {
    // Horizontal segment from fromCenter to (toCenter.x, fromCenter.y)
    stamp(fromCenter.x, fromCenter.y, toCenter.x, fromCenter.y);
    // Vertical segment from that corner to toCenter
    stamp(toCenter.x, fromCenter.y, toCenter.x, toCenter.y);
  } else {
    // Vertical segment from fromCenter to (fromCenter.x, toCenter.y)
    stamp(fromCenter.x, fromCenter.y, fromCenter.x, toCenter.y);
    // Horizontal segment from that corner to toCenter
    stamp(fromCenter.x, toCenter.y, toCenter.x, toCenter.y);
  }
}

// ---------------------------------------------------------------------------
// Tile helpers
// ---------------------------------------------------------------------------

function fillRoom(room: Room, tileMap: TileMap, tileType: TileType): void {
  for (let y = room.rect.y; y < room.rect.y + room.rect.height; y++) {
    for (let x = room.rect.x; x < room.rect.x + room.rect.width; x++) {
      if (y >= 0 && y < tileMap.height && x >= 0 && x < tileMap.width) {
        tileMap.tiles[y][x] = tileType;
      }
    }
  }
}

function isFloorTile(tile: TileType): boolean {
  return (
    tile === TileType.FLOOR ||
    tile === TileType.CORRIDOR ||
    tile === TileType.CITY_FLOOR ||
    tile === TileType.DOOR ||
    tile === TileType.BOSS_FLOOR ||
    tile === TileType.START_FLOOR
  );
}

/**
 * Scan the entire map and place WALL tiles on any EMPTY tile that is adjacent
 * (4-connected) to a floor-type tile.
 */
function addWalls(tileMap: TileMap): void {
  const snapshot = tileMap.tiles.map((row) => [...row]);

  for (let y = 0; y < tileMap.height; y++) {
    for (let x = 0; x < tileMap.width; x++) {
      if (snapshot[y][x] !== TileType.EMPTY) continue;

      const hasFloorNeighbor =
        (y > 0 && isFloorTile(snapshot[y - 1][x])) ||
        (y < tileMap.height - 1 && isFloorTile(snapshot[y + 1][x])) ||
        (x > 0 && isFloorTile(snapshot[y][x - 1])) ||
        (x < tileMap.width - 1 && isFloorTile(snapshot[y][x + 1]));

      if (hasFloorNeighbor) {
        tileMap.tiles[y][x] = TileType.WALL;
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Render an explicit world (city + given dungeons) to a tile map
// ---------------------------------------------------------------------------

/**
 * Build a tile map from an explicit dungeon list. Draws the centered
 * `cityWidth x cityHeight` city (when enabled), then every non-empty
 * dungeon's rooms (START/BOSS/FLOOR), room walls, L-corridors between
 * connected rooms, and walls around corridors. Rooms outside the map bounds
 * are clipped by the existing render guards.
 */
export function renderWorld(
  config: GameConfig,
  dungeons: Dungeon[],
): TileMap {
  const rng = new SeededRandom(config.seed ?? Date.now());

  const gridWidth = config.mapWidth;
  const gridHeight = config.mapHeight;

  // Initialise empty tile map
  const tileMap: TileMap = {
    width: gridWidth,
    height: gridHeight,
    tiles: Array(gridHeight)
      .fill(null)
      .map(() => Array(gridWidth).fill(TileType.EMPTY)),
  };

  // ------------------------------------------------------------------
  // City (optional, centered cityWidth x cityHeight)
  // ------------------------------------------------------------------
  const cityRect = getCityRect(config);
  if (cityRect) {
    const { x: cityX, y: cityY, width: cityW, height: cityH } = cityRect;

    // Fill city floor
    for (let y = cityY; y < cityY + cityH; y++) {
      for (let x = cityX; x < cityX + cityW; x++) {
        if (y >= 0 && y < gridHeight && x >= 0 && x < gridWidth) {
          tileMap.tiles[y][x] = TileType.CITY_FLOOR;
        }
      }
    }

    // Walls around the city perimeter
    for (let y = cityY - 1; y <= cityY + cityH; y++) {
      for (let x = cityX - 1; x <= cityX + cityW; x++) {
        if (y < 0 || y >= gridHeight || x < 0 || x >= gridWidth) continue;
        if (
          y === cityY - 1 ||
          y === cityY + cityH ||
          x === cityX - 1 ||
          x === cityX + cityW
        ) {
          if (tileMap.tiles[y][x] === TileType.EMPTY) {
            tileMap.tiles[y][x] = TileType.CITY_WALL;
          }
        }
      }
    }
  }

  // ------------------------------------------------------------------
  // Render all rooms, corridors, and walls to the tile map
  // ------------------------------------------------------------------
  for (const dungeon of dungeons) {
    if (dungeon.rooms.length === 0) continue;

    // 1. Fill room interiors
    for (const room of dungeon.rooms) {
      let tileType = TileType.FLOOR;
      if (room.isStart) tileType = TileType.START_FLOOR;
      else if (room.isBoss) tileType = TileType.BOSS_FLOOR;

      fillRoom(room, tileMap, tileType);
    }

    // 2. Draw room walls (one tile outside each room)
    for (const room of dungeon.rooms) {
      for (
        let y = room.rect.y - 1;
        y <= room.rect.y + room.rect.height;
        y++
      ) {
        for (
          let x = room.rect.x - 1;
          x <= room.rect.x + room.rect.width;
          x++
        ) {
          if (y < 0 || y >= gridHeight || x < 0 || x >= gridWidth) continue;
          if (
            y === room.rect.y - 1 ||
            y === room.rect.y + room.rect.height ||
            x === room.rect.x - 1 ||
            x === room.rect.x + room.rect.width
          ) {
            if (tileMap.tiles[y][x] === TileType.EMPTY) {
              tileMap.tiles[y][x] = TileType.WALL;
            }
          }
        }
      }
    }

    // 3. Draw corridors between connected rooms
    for (const room of dungeon.rooms) {
      for (const connectedId of room.connected) {
        // Only draw each corridor once (from lower id → higher id)
        if (connectedId > room.id) {
          const connectedRoom = dungeon.rooms.find(
            (r) => r.id === connectedId,
          );
          if (connectedRoom) {
            generateCorridor(room, connectedRoom, tileMap, config, rng);
          }
        }
      }
    }

    // 4. Add walls around corridors (after all corridors in this dungeon are
    //    drawn so they share the same wall layer)
    addWalls(tileMap);
  }

  return tileMap;
}
