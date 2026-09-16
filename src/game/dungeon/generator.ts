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

// ---------------------------------------------------------------------------
// Room placement with directional flow
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Tunnel-carve + Room Stamping (digger agent) — tuning knobs
// ---------------------------------------------------------------------------

/** Digger walk steps per requested room (total steps = roomsPerDungeon * this). */
export const DIGGER_STEPS_PER_ROOM = 14;
/** Chance the digger keeps walking the same direction each step (momentum). */
export const DIGGER_MOMENTUM = 0.65;
/** Path steps between room stamp attempts. */
export const STAMP_INTERVAL = 10;
/** Extra forward points to try when a stamp anchor overlaps (lookahead). */
export const STAMP_LOOKAHEAD = 5;

/**
 * Cardinal directions as vectors.  Index matters for the momentum logic:
 *   0 = right, 1 = left, 2 = down, 3 = up
 */
const DIRECTIONS: { dx: number; dy: number }[] = [
  { dx: 1, dy: 0 },   // right
  { dx: -1, dy: 0 },  // left
  { dx: 0, dy: 1 },   // down
  { dx: 0, dy: -1 },  // up
];

/**
 * Digger agent: random-walk inside `bounds` (inset 2 tiles) for up to
 * `maxSteps` steps, with momentum (65% continue straight). Returns the
 * recorded path points, starting from a random point inset 3 tiles.
 */
function carveDiggerPath(
  rng: SeededRandom,
  bounds: Rect,
  maxSteps: number,
): Point[] {
  const minX = bounds.x + 2;
  const maxX = bounds.x + bounds.width - 1 - 2;
  const minY = bounds.y + 2;
  const maxY = bounds.y + bounds.height - 1 - 2;

  // Degenerate bounds: return just the center point.
  if (minX > maxX || minY > maxY) {
    return [
      {
        x: bounds.x + Math.floor(bounds.width / 2),
        y: bounds.y + Math.floor(bounds.height / 2),
      },
    ];
  }

  // Start inset 3 tiles, clamped into the walk area (midpoint fallback for
  // tiny bounds where the inset range is inverted).
  const clamp = (v: number, lo: number, hi: number) =>
    Math.max(lo, Math.min(hi, v));
  const sxMin = bounds.x + 3;
  const sxMax = bounds.x + bounds.width - 1 - 3;
  const syMin = bounds.y + 3;
  const syMax = bounds.y + bounds.height - 1 - 3;
  let x =
    sxMin <= sxMax
      ? rng.nextInt(sxMin, sxMax)
      : bounds.x + Math.floor(bounds.width / 2);
  let y =
    syMin <= syMax
      ? rng.nextInt(syMin, syMax)
      : bounds.y + Math.floor(bounds.height / 2);
  x = clamp(x, minX, maxX);
  y = clamp(y, minY, maxY);

  const path: Point[] = [{ x, y }];
  let dir = rng.pick(DIRECTIONS);

  for (let step = 0; step < maxSteps; step++) {
    if (rng.next() >= DIGGER_MOMENTUM) {
      dir = rng.pick(DIRECTIONS);
    }
    let nx = x + dir.dx;
    let ny = y + dir.dy;
    if (nx < minX || nx > maxX || ny < minY || ny > maxY) {
      // Turn when hitting the inset wall; skip the step if still outside.
      dir = rng.pick(DIRECTIONS);
      nx = x + dir.dx;
      ny = y + dir.dy;
      if (nx < minX || nx > maxX || ny < minY || ny > maxY) continue;
    }
    x = nx;
    y = ny;
    path.push({ x, y });
  }

  return path;
}

/**
 * Try to stamp one room centered on `center`: random size from
 * config.minRoomSize/maxRoomSize, shrunk + clamped to stay inside `bounds`.
 * Returns the Room when it fits in bounds and avoids overlaps, else null.
 */
function tryStampRoom(
  rng: SeededRandom,
  center: Point,
  bounds: Rect,
  config: GameConfig,
  existingRooms: Room[],
  localRooms: Room[],
  id: number,
): Room | null {
  let width = rng.nextInt(config.minRoomSize, config.maxRoomSize);
  let height = rng.nextInt(config.minRoomSize, config.maxRoomSize);

  // Shrink (rather than fail) so the rect can stay inside small bounds.
  width = Math.max(1, Math.min(width, bounds.width));
  height = Math.max(1, Math.min(height, bounds.height));

  const x = Math.max(
    bounds.x,
    Math.min(center.x - Math.floor(width / 2), bounds.x + bounds.width - width),
  );
  const y = Math.max(
    bounds.y,
    Math.min(
      center.y - Math.floor(height / 2),
      bounds.y + bounds.height - height,
    ),
  );

  const candidate: Rect = { x, y, width, height };

  if (!isWithinBounds(candidate, bounds)) return null;
  if (existingRooms.some((r) => rectsOverlap(candidate, r.rect, 2))) {
    return null;
  }
  if (localRooms.some((r) => rectsOverlap(candidate, r.rect, 1))) {
    return null;
  }

  return { id, rect: candidate, connected: [], isStart: false, isBoss: false };
}

// ---------------------------------------------------------------------------
// generateDungeon – digger tunnel-carve + room stamping
// ---------------------------------------------------------------------------

function generateDungeon(
  id: number,
  bounds: Rect,
  config: GameConfig,
  rng: SeededRandom,
  existingRooms: Room[],
): Dungeon {
  const empty: Dungeon = { id, rooms: [], bossRoomId: 0, startRoomId: 0 };

  // --- DIG: random-walk tunnel ---------------------------------------------
  const maxSteps = Math.max(1, config.roomsPerDungeon * DIGGER_STEPS_PER_ROOM);
  const path = carveDiggerPath(rng, bounds, maxSteps);
  if (path.length === 0) return empty;

  // --- STAMP: start room, shifting forward until one fits -------------------
  const rooms: Room[] = [];
  let lastStamp = -1;
  for (let i = 0; i < path.length; i++) {
    const room = tryStampRoom(
      rng,
      path[i],
      bounds,
      config,
      existingRooms,
      rooms,
      rooms.length,
    );
    if (room) {
      room.isStart = true;
      rooms.push(room);
      lastStamp = i;
      break;
    }
  }
  if (lastStamp < 0) return empty;

  // --- STAMP: remaining rooms ~STAMP_INTERVAL path steps after the last -----
  // --- stamped room (cursor-based so rooms spread along the tunnel) --------
  for (let n = 1; n < config.roomsPerDungeon; n++) {
    const base = lastStamp + STAMP_INTERVAL;
    if (base >= path.length) break; // path exhausted
    const end = Math.min(base + STAMP_LOOKAHEAD, path.length - 1);
    let stamped = false;
    for (let i = base; i <= end; i++) {
      const room = tryStampRoom(
        rng,
        path[i],
        bounds,
        config,
        existingRooms,
        rooms,
        rooms.length,
      );
      if (room) {
        rooms.push(room);
        lastStamp = i;
        stamped = true;
        break;
      }
    }
    // On failure we give up on that room slot and continue from the end of
    // its window (keeps the dungeon smaller rather than looping forever).
    if (!stamped) lastStamp = end;
  }

  // Engine reports "No space" unless at least 2 rooms were stamped.
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
  const dungeonAreaSize = Math.floor(minDim * 0.35);
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
