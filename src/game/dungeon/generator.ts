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
class SeededRandom {
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

// ---------------------------------------------------------------------------
// Room placement with directional flow
// ---------------------------------------------------------------------------

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
 * Try to place a single room inside `bounds`, avoiding `existingRooms` and the
 * `localRooms` already placed in the current dungeon.  Returns the Room if
 * placed, otherwise null.
 */
function tryPlaceRoom(
  rng: SeededRandom,
  bounds: Rect,
  config: GameConfig,
  existingRooms: Room[],
  localRooms: Room[],
  isStart: boolean,
  isBoss: boolean,
  /** Preferred direction vector (null = no preference). */
  preferredDir: { dx: number; dy: number } | null,
  /** Center of the previous room to flow from (null for the first room). */
  anchorCenter: Point | null,
): Room | null {
  const attempts = 200;
  const gapMin = 4;
  const gapMax = 8;

  for (let attempt = 0; attempt < attempts; attempt++) {
    const width = rng.nextInt(config.minRoomSize, config.maxRoomSize);
    const height = rng.nextInt(config.minRoomSize, config.maxRoomSize);

    let x: number;
    let y: number;

    if (anchorCenter && preferredDir) {
      // Directional placement: place the room in the preferred direction from
      // the previous room center, with some jitter on the perpendicular axis.
      const gap = rng.nextInt(gapMin, gapMax);

      if (preferredDir.dx !== 0) {
        // Horizontal movement
        x =
          anchorCenter.x +
          preferredDir.dx * (gap + Math.floor(rng.next() * 4));
        y =
          anchorCenter.y +
          rng.nextInt(-3, 3) -
          Math.floor(height / 2);
      } else {
        // Vertical movement
        y =
          anchorCenter.y +
          preferredDir.dy * (gap + Math.floor(rng.next() * 4));
        x =
          anchorCenter.x +
          rng.nextInt(-3, 3) -
          Math.floor(width / 2);
      }
    } else {
      // Random placement (first room or fallback)
      x = rng.nextInt(bounds.x + 2, bounds.x + bounds.width - width - 2);
      y = rng.nextInt(bounds.y + 2, bounds.y + bounds.height - height - 2);
    }

    const candidate: Rect = { x, y, width, height };

    // Must be fully inside dungeon bounds
    if (!isWithinBounds(candidate, bounds)) continue;

    // Must not overlap any existing room (from any dungeon) or local rooms
    const overlaps =
      existingRooms.some((r) => rectsOverlap(candidate, r.rect, 3)) ||
      localRooms.some((r) => rectsOverlap(candidate, r.rect, 3));

    if (overlaps) continue;

    return {
      id: localRooms.length,
      rect: candidate,
      connected: [],
      isStart,
      isBoss,
    };
  }

  return null;
}

// ---------------------------------------------------------------------------
// generateDungeon – sequential rooms with directional momentum
// ---------------------------------------------------------------------------

function generateDungeon(
  id: number,
  bounds: Rect,
  config: GameConfig,
  rng: SeededRandom,
  existingRooms: Room[],
): Dungeon {
  const rooms: Room[] = [];

  // --- Place the first (start) room randomly --------------------------------
  const firstRoom = tryPlaceRoom(
    rng,
    bounds,
    config,
    existingRooms,
    rooms,
    /* isStart */ true,
    /* isBoss */ false,
    /* preferredDir */ null,
    /* anchorCenter */ null,
  );

  if (!firstRoom) {
    return { id, rooms: [], bossRoomId: 0, startRoomId: 0 };
  }
  rooms.push(firstRoom);

  // --- Place remaining rooms sequentially with momentum ---------------------
  let flowDir: { dx: number; dy: number } = rng.pick(DIRECTIONS);

  for (let i = 1; i < config.roomsPerDungeon; i++) {
    const isBossRoom = i === config.roomsPerDungeon - 1;
    const anchor = rectCenter(rooms[rooms.length - 1].rect);

    // Decide whether to keep the flow direction or pick a new one
    const keepMomentum = rng.next() < 0.6;
    const dir = keepMomentum ? flowDir : rng.pick(DIRECTIONS);

    const room = tryPlaceRoom(
      rng,
      bounds,
      config,
      existingRooms,
      rooms,
      /* isStart */ false,
      isBossRoom,
      dir,
      anchor,
    );

    if (room) {
      // Connect the new room to the previous one (sequential chain)
      room.connected.push(rooms[rooms.length - 1].id);
      rooms[rooms.length - 1].connected.push(room.id);

      rooms.push(room);
      flowDir = dir; // Update flow direction
    }
    // If placement failed we simply skip this room (keeps the dungeon smaller
    // rather than looping forever).
  }

  // Ensure start and boss IDs are correct
  const startRoom = rooms.find((r) => r.isStart);
  const bossRoom = rooms.find((r) => r.isBoss);

  return {
    id,
    rooms,
    bossRoomId: bossRoom?.id ?? rooms.length - 1,
    startRoomId: startRoom?.id ?? 0,
  };
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
// Main entry point
// ---------------------------------------------------------------------------

export function generateTileMap(config: GameConfig): {
  tileMap: TileMap;
  dungeons: Dungeon[];
} {
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

  const dungeons: Dungeon[] = [];
  const allRooms: Room[] = []; // used for cross-dungeon collision checks

  // ------------------------------------------------------------------
  // City (optional, placed in the centre)
  // ------------------------------------------------------------------
  if (config.includeCity) {
    const cityX = Math.floor((gridWidth - config.citySize) / 2);
    const cityY = Math.floor((gridHeight - config.citySize) / 2);

    // Fill city floor
    for (let y = cityY; y < cityY + config.citySize; y++) {
      for (let x = cityX; x < cityX + config.citySize; x++) {
        if (y >= 0 && y < gridHeight && x >= 0 && x < gridWidth) {
          tileMap.tiles[y][x] = TileType.CITY_FLOOR;
        }
      }
    }

    // Walls around the city perimeter
    for (let y = cityY - 1; y <= cityY + config.citySize; y++) {
      for (let x = cityX - 1; x <= cityX + config.citySize; x++) {
        if (y < 0 || y >= gridHeight || x < 0 || x >= gridWidth) continue;
        if (
          y === cityY - 1 ||
          y === cityY + config.citySize ||
          x === cityX - 1 ||
          x === cityX + config.citySize
        ) {
          if (tileMap.tiles[y][x] === TileType.EMPTY) {
            tileMap.tiles[y][x] = TileType.CITY_WALL;
          }
        }
      }
    }

    // Treat the city as a single "room" so dungeons avoid overlapping it
    allRooms.push({
      id: 0,
      rect: {
        x: cityX,
        y: cityY,
        width: config.citySize,
        height: config.citySize,
      },
      connected: [],
      isStart: false,
      isBoss: false,
    });
  }

  // ------------------------------------------------------------------
  // Dungeons arranged in a circle around the city
  // ------------------------------------------------------------------
  const minDim = Math.min(gridWidth, gridHeight);
  const dungeonAreaSize = Math.floor(minDim * 0.35);
  const circleRadius = Math.floor(minDim * 0.4);

  const cityCenterX = Math.floor(gridWidth / 2);
  const cityCenterY = Math.floor(gridHeight / 2);

  for (let i = 0; i < config.dungeonCount; i++) {
    const angle = (i / config.dungeonCount) * Math.PI * 2;

    const centerX = Math.floor(cityCenterX + Math.cos(angle) * circleRadius);
    const centerY = Math.floor(cityCenterY + Math.sin(angle) * circleRadius);

    // Dungeon bounds centred on the computed position
    const dungeonBounds: Rect = {
      x: Math.max(2, centerX - Math.floor(dungeonAreaSize / 2)),
      y: Math.max(2, centerY - Math.floor(dungeonAreaSize / 2)),
      width: Math.min(dungeonAreaSize, gridWidth - 4),
      height: Math.min(dungeonAreaSize, gridHeight - 4),
    };

    const dungeon = generateDungeon(i, dungeonBounds, config, rng, allRooms);
    dungeons.push(dungeon);

    // Register rooms so subsequent dungeons avoid them
    allRooms.push(...dungeon.rooms);
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

  return { tileMap, dungeons };
}
