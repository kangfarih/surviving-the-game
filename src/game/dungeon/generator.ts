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
// gen-v2 — full-fill dungeon + city generator.
//
// Port of the standalone `dungeon-generator.html` prototype. Design notes:
//
// - The grid starts fully solid (WALL) and is only ever carved into, so every
//   tile is used — there is no EMPTY/void.
// - Space around the (optional, centered) city is split into N/S/W/E regions;
//   each region is strip-packed with dungeon slots until the remainder is too
//   small for one minimum-size room. There is NO fixed dungeon count.
// - Each slot is BSP-split into leaves (both children always >= minLeafSize),
//   shrunk by a 1-tile wall border into rooms, ordered entrance -> ... ->
//   boss via nearest-neighbor, with the largest room forced last as the boss.
// - Two deliberate deviations from the prototype:
//   1. Corridor L-bend orientation is a deterministic hash of the endpoints
//      (not an RNG coin flip) so `renderWorld(config, savedDungeons)` — used
//      by save/load and the tile API — reproduces identical corridors.
//   2. City buildings use a dedicated RNG stream (`seed ^ CITY_SALT`) so city
//      layout is stable regardless of dungeon packing order.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Seeded RNG (same hash as the prototype; accepts the numeric config seed)
// ---------------------------------------------------------------------------
function makeRand(seed: number): () => number {
  const seedStr = String(seed);
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

/** Legacy-compatible RNG wrapper (kept for existing imports). */
export class SeededRandom {
  private rand: () => number;

  constructor(seed: number = Date.now()) {
    this.rand = makeRand(seed);
  }

  next(): number {
    return this.rand();
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.rand() * (max - min + 1)) + min;
  }

  /** Return a random element from the array. */
  pick<T>(arr: T[]): T {
    return arr[this.nextInt(0, arr.length - 1)];
  }
}

/** Factory for a persistent RNG instance. */
export function createRng(seed: number = Date.now()): SeededRandom {
  return new SeededRandom(seed);
}

/** Salted stream so city layout doesn't depend on dungeon packing order. */
function createCityRng(seed: number): SeededRandom {
  return new SeededRandom((seed ^ 0x9e3779b9) >>> 0);
}

// ---------------------------------------------------------------------------
// Geometry helpers
// ---------------------------------------------------------------------------

/** Return the center of a rectangle as a Point. */
function rectCenter(rect: Rect): Point {
  return {
    x: Math.floor(rect.x + rect.width / 2),
    y: Math.floor(rect.y + rect.height / 2),
  };
}

/**
 * Centered city rect, clamped so at least a small border remains around it
 * (mirrors the prototype's `min(cityW, cols-8)` clamp). Returns null when the
 * city is disabled or the map is too small to fit one.
 */
export function getCityRect(config: GameConfig): Rect | null {
  if (!config.includeCity) return null;
  const w = Math.min(config.cityWidth, config.mapWidth - 8);
  const h = Math.min(config.cityHeight, config.mapHeight - 8);
  if (w < 4 || h < 4) return null;
  return {
    x: Math.floor((config.mapWidth - w) / 2),
    y: Math.floor((config.mapHeight - h) / 2),
    width: w,
    height: h,
  };
}

// ---------------------------------------------------------------------------
// L-shaped corridor path (deterministic bend; see header note)
// ---------------------------------------------------------------------------

function lPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  horizFirst: boolean,
): Array<[number, number]> {
  const pts: Array<[number, number]> = [];
  let x = x1;
  let y = y1;
  if (horizFirst) {
    while (x !== x2) {
      pts.push([x, y]);
      x += x < x2 ? 1 : -1;
    }
    while (y !== y2) {
      pts.push([x, y]);
      y += y < y2 ? 1 : -1;
    }
  } else {
    while (y !== y2) {
      pts.push([x, y]);
      y += y < y2 ? 1 : -1;
    }
    while (x !== x2) {
      pts.push([x, y]);
      x += x < x2 ? 1 : -1;
    }
  }
  pts.push([x2, y2]);
  return pts;
}

/**
 * Deterministic bend direction from the endpoints + dungeon id. Replaces the
 * prototype's `rand() < 0.5` so saved dungeons re-render identically.
 */
function bendHorizFirst(
  ax: number,
  ay: number,
  bx: number,
  by: number,
  dungeonId: number,
): boolean {
  return (ax * 3 + ay * 5 + bx * 7 + by * 11 + dungeonId * 13) % 2 === 0;
}

// ---------------------------------------------------------------------------
// Strip-packing: fill a region with dungeon slots until nothing min-size fits
// ---------------------------------------------------------------------------

function packRegionWithDungeons(
  region: Rect,
  minLeafSize: number,
  minRooms: number,
  maxRooms: number,
  rng: SeededRandom,
): Rect[] {
  const isHoriz = region.width >= region.height;
  const total = isHoriz ? region.width : region.height;
  const crossSize = isHoriz ? region.height : region.width;
  if (crossSize < minLeafSize) return []; // too narrow for even one room

  const rowsFit = Math.max(1, Math.floor(crossSize / minLeafSize));
  const slots: Rect[] = [];
  let cursor = 0;
  while (total - cursor >= minLeafSize) {
    const roomsTarget = rng.nextInt(minRooms, maxRooms);
    const colsNeeded = Math.max(1, Math.ceil(roomsTarget / rowsFit));
    const footprint = Math.min(colsNeeded * minLeafSize, total - cursor);
    if (footprint < minLeafSize) break;
    slots.push(
      isHoriz
        ? { x: region.x + cursor, y: region.y, width: footprint, height: region.height }
        : { x: region.x, y: region.y + cursor, width: region.width, height: footprint },
    );
    cursor += footprint;
  }
  return slots; // leftover sliver (< one room) stays solid rock
}

// ---------------------------------------------------------------------------
// BSP: split a slot into leaves, both children always >= minLeafSize
// ---------------------------------------------------------------------------

function bspSplit(
  rect: Rect,
  targetLeaves: number,
  minLeafSize: number,
  rng: SeededRandom,
): Rect[] {
  const leaves: Rect[] = [{ ...rect }];
  while (leaves.length < targetLeaves) {
    leaves.sort((a, b) => b.width * b.height - a.width * a.height);
    let idx = -1;
    let splitW = false;
    for (let i = 0; i < leaves.length; i++) {
      const leaf = leaves[i];
      const canW = leaf.width >= minLeafSize * 2;
      const canH = leaf.height >= minLeafSize * 2;
      if (canW || canH) {
        idx = i;
        splitW = canW && (!canH || leaf.width >= leaf.height);
        break;
      }
    }
    if (idx === -1) break; // nothing left can split without violating the minimum
    const leaf = leaves.splice(idx, 1)[0];
    let a: Rect;
    let b: Rect;
    if (splitW) {
      const cut = rng.nextInt(minLeafSize, leaf.width - minLeafSize);
      a = { x: leaf.x, y: leaf.y, width: cut, height: leaf.height };
      b = { x: leaf.x + cut, y: leaf.y, width: leaf.width - cut, height: leaf.height };
    } else {
      const cut = rng.nextInt(minLeafSize, leaf.height - minLeafSize);
      a = { x: leaf.x, y: leaf.y, width: leaf.width, height: cut };
      b = { x: leaf.x, y: leaf.y + cut, width: leaf.width, height: leaf.height - cut };
    }
    leaves.push(a, b);
  }
  return leaves;
}

// ---------------------------------------------------------------------------
// Dungeon planning: leaves -> rooms -> entrance-first, boss-last chain
// ---------------------------------------------------------------------------

function planDungeonRooms(
  slot: Rect,
  minRooms: number,
  maxRooms: number,
  minLeafSize: number,
  entryPoint: Point,
  rng: SeededRandom,
): Room[] {
  const maxPossible = Math.max(
    1,
    Math.floor(slot.width / minLeafSize) * Math.floor(slot.height / minLeafSize),
  );
  const target = Math.max(1, Math.min(rng.nextInt(minRooms, maxRooms), maxPossible));
  const leaves = bspSplit(slot, target, minLeafSize, rng);

  // Shrink each leaf by a 1-tile wall border; interior stays >= minRoomSize.
  const nodes = leaves.map((leaf) => {
    const rect: Rect = {
      x: leaf.x + 1,
      y: leaf.y + 1,
      width: leaf.width - 2,
      height: leaf.height - 2,
    };
    const c = rectCenter(rect);
    return { rect, cx: c.x, cy: c.y };
  });

  // Boss fight needs the most space: largest room goes last.
  let bossNode: { rect: Rect; cx: number; cy: number } | null = null;
  if (nodes.length > 1) {
    let bossIdx = 0;
    for (let i = 1; i < nodes.length; i++) {
      if (nodes[i].rect.width * nodes[i].rect.height > nodes[bossIdx].rect.width * nodes[bossIdx].rect.height) {
        bossIdx = i;
      }
    }
    bossNode = nodes.splice(bossIdx, 1)[0];
  }

  // Nearest-neighbor chain starting from the room closest to the entry point.
  const remaining = nodes.slice();
  const first = remaining.reduce((best, n) => {
    const d = (n.cx - entryPoint.x) ** 2 + (n.cy - entryPoint.y) ** 2;
    return !best || d < best.d ? { n, d } : best;
  }, null as { n: { rect: Rect; cx: number; cy: number }; d: number } | null);
  if (!first) return [];
  const chain = [first.n];
  remaining.splice(remaining.indexOf(first.n), 1);
  while (remaining.length > 0) {
    let bestIdx = 0;
    let bestD = Infinity;
    const current = chain[chain.length - 1];
    for (let i = 0; i < remaining.length; i++) {
      const d = (remaining[i].cx - current.cx) ** 2 + (remaining[i].cy - current.cy) ** 2;
      if (d < bestD) {
        bestD = d;
        bestIdx = i;
      }
    }
    chain.push(remaining.splice(bestIdx, 1)[0]);
  }
  if (bossNode) chain.push(bossNode);

  // Chain order becomes room id order so `connected` links render each
  // corridor exactly once (lower id -> higher id).
  return chain.map((node, i) => ({
    id: i,
    rect: node.rect,
    connected:
      chain.length === 1
        ? []
        : [
            ...(i > 0 ? [i - 1] : []),
            ...(i < chain.length - 1 ? [i + 1] : []),
          ],
    isStart: i === 0,
    isBoss: chain.length > 1 && i === chain.length - 1,
  }));
}

// ---------------------------------------------------------------------------
// Full-world dungeon planning (deterministic from seed + config)
// ---------------------------------------------------------------------------

function roomRange(config: GameConfig): { min: number; max: number } {
  // Migrate legacy gen-v1 configs that only know `roomsPerDungeon`.
  const legacy = config.roomsPerDungeon;
  const min =
    Number.isFinite(config.minRoomsPerDungeon) && config.minRoomsPerDungeon > 0
      ? Math.floor(config.minRoomsPerDungeon)
      : legacy
        ? Math.max(1, Math.floor(legacy))
        : 4;
  const max =
    Number.isFinite(config.maxRoomsPerDungeon) && config.maxRoomsPerDungeon > 0
      ? Math.floor(config.maxRoomsPerDungeon)
      : legacy
        ? Math.max(1, Math.floor(legacy))
        : 7;
  return { min: Math.min(min, max), max: Math.max(min, max) };
}

/**
 * Plan every dungeon for the map. Deterministic: same seed + config always
 * yields the same dungeon list. Regions that can't fit even one minimum-size
 * room produce no dungeons.
 */
export function generateWorldDungeons(config: GameConfig): Dungeon[] {
  const rng = createRng(config.seed ?? Date.now());
  const cols = Math.max(8, Math.floor(config.mapWidth));
  const rows = Math.max(8, Math.floor(config.mapHeight));
  const minRoomSize = Math.max(1, Math.floor(config.minRoomSize) || 7);
  // A leaf needs a 1-tile wall on each side of the carved room.
  const minLeafSize = minRoomSize + 2;
  const { min: minRooms, max: maxRooms } = roomRange(config);

  const cityRect = getCityRect(config);
  const entryRef = cityRect
    ? { x: cityRect.x + cityRect.width / 2, y: cityRect.y + cityRect.height / 2 }
    : { x: cols / 2, y: rows / 2 };

  const regions: Rect[] = cityRect
    ? [
        { x: 0, y: 0, width: cols, height: cityRect.y }, // north
        { x: 0, y: cityRect.y + cityRect.height, width: cols, height: rows - (cityRect.y + cityRect.height) }, // south
        { x: 0, y: cityRect.y, width: cityRect.x, height: cityRect.height }, // west
        { x: cityRect.x + cityRect.width, y: cityRect.y, width: cols - (cityRect.x + cityRect.width), height: cityRect.height }, // east
      ].filter((r) => r.width > 0 && r.height > 0)
    : [{ x: 0, y: 0, width: cols, height: rows }];

  const dungeons: Dungeon[] = [];
  regions.forEach((region) => {
    const slots = packRegionWithDungeons(region, minLeafSize, minRooms, maxRooms, rng);
    slots.forEach((slot) => {
      const entry = {
        x: Math.max(slot.x, Math.min(slot.x + slot.width, entryRef.x)),
        y: Math.max(slot.y, Math.min(slot.y + slot.height, entryRef.y)),
      };
      const rooms = planDungeonRooms(
        slot,
        minRooms,
        maxRooms,
        minLeafSize,
        entry,
        rng,
      );
      if (rooms.length === 0) return;
      const id = dungeons.length;
      dungeons.push({
        id,
        rooms,
        bossRoomId: rooms.length > 1 ? rooms[rooms.length - 1].id : rooms[0].id,
        startRoomId: rooms[0].id,
      });
    });
  });
  return dungeons;
}

// ---------------------------------------------------------------------------
// Rendering: explicit dungeon list -> tile grid (no EMPTY tiles remain)
// ---------------------------------------------------------------------------

function fillRoom(room: Room, tiles: TileType[][], tileType: TileType): void {
  for (let y = room.rect.y; y < room.rect.y + room.rect.height; y++) {
    for (let x = room.rect.x; x < room.rect.x + room.rect.width; x++) {
      if (y >= 0 && y < tiles.length && x >= 0 && x < tiles[0].length) {
        tiles[y][x] = tileType;
      }
    }
  }
}

function carveCityBuildings(
  tiles: TileType[][],
  cityRect: Rect,
  rng: SeededRandom,
): void {
  const buildingBudget = Math.max(1, Math.floor((cityRect.width * cityRect.height) / 22));
  let placed = 0;
  let tries = 0;
  while (placed < buildingBudget && tries < buildingBudget * 12) {
    tries++;
    const bw = rng.nextInt(2, 4);
    const bh = rng.nextInt(2, 4);
    const bx = cityRect.x + 1 + rng.nextInt(0, Math.max(0, cityRect.width - bw - 2));
    const by = cityRect.y + 1 + rng.nextInt(0, Math.max(0, cityRect.height - bh - 2));
    let clear = true;
    for (let y = by - 1; y <= by + bh && clear; y++) {
      for (let x = bx - 1; x <= bx + bw; x++) {
        if (!tiles[y] || tiles[y][x] !== TileType.CITY_FLOOR) {
          clear = false;
          break;
        }
      }
    }
    if (!clear) continue;
    for (let y = by; y < by + bh; y++) {
      for (let x = bx; x < bx + bw; x++) {
        tiles[y][x] = TileType.CITY_WALL;
      }
    }
    placed++;
  }
}

/**
 * Build a tile map from an explicit dungeon list. Draws the city (when
 * enabled) then every dungeon's rooms (START/FLOOR/BOSS) plus 1-wide
 * L-corridors along each `connected` link. Deterministic from seed + rooms,
 * so saved worlds and `?tiles=1` API renders match the live canvas.
 */
export function renderWorld(config: GameConfig, dungeons: Dungeon[]): TileMap {
  const gridWidth = Math.max(8, Math.floor(config.mapWidth));
  const gridHeight = Math.max(8, Math.floor(config.mapHeight));

  // Grid starts fully solid — every tile carved from here on is deliberate.
  const tiles: TileType[][] = Array(gridHeight)
    .fill(null)
    .map(() => Array(gridWidth).fill(TileType.WALL));

  // City (optional, centered)
  const cityRect = getCityRect(config);
  if (cityRect) {
    for (let y = cityRect.y; y < cityRect.y + cityRect.height; y++) {
      for (let x = cityRect.x; x < cityRect.x + cityRect.width; x++) {
        if (y >= 0 && y < gridHeight && x >= 0 && x < gridWidth) {
          tiles[y][x] = TileType.CITY_FLOOR;
        }
      }
    }
    carveCityBuildings(tiles, cityRect, createCityRng(config.seed ?? Date.now()));
  }

  for (const dungeon of dungeons) {
    if (dungeon.rooms.length === 0) continue;

    for (const room of dungeon.rooms) {
      fillRoom(
        room,
        tiles,
        room.isStart
          ? TileType.START_FLOOR
          : room.isBoss
            ? TileType.BOSS_FLOOR
            : TileType.FLOOR,
      );
    }

    for (const room of dungeon.rooms) {
      for (const connectedId of room.connected) {
        if (connectedId <= room.id) continue; // draw each link once
        const other = dungeon.rooms.find((r) => r.id === connectedId);
        if (!other) continue;
        const a = rectCenter(room.rect);
        const b = rectCenter(other.rect);
        const path = lPath(
          Math.round(a.x),
          Math.round(a.y),
          Math.round(b.x),
          Math.round(b.y),
          bendHorizFirst(a.x, a.y, b.x, b.y, dungeon.id),
        );
        for (const [x, y] of path) {
          if (y >= 0 && y < gridHeight && x >= 0 && x < gridWidth) {
            if (tiles[y][x] === TileType.WALL) tiles[y][x] = TileType.CORRIDOR;
          }
        }
      }
    }
  }

  return { width: gridWidth, height: gridHeight, tiles };
}
