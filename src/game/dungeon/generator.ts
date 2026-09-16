import { 
  Dungeon, 
  Room, 
  Rect, 
  Point, 
  GameConfig, 
  TileType, 
  TileMap 
} from '../types';

// Seeded random number generator for reproducibility
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
}

// Check if two rectangles overlap with padding
function rectsOverlap(a: Rect, b: Rect, padding: number = 1): boolean {
  return !(
    a.x + a.width + padding <= b.x ||
    b.x + b.width + padding <= a.x ||
    a.y + a.height + padding <= b.y ||
    b.y + b.height + padding <= a.y
  );
}

// Check if a rectangle is within bounds
function isWithinBounds(rect: Rect, bounds: Rect): boolean {
  return (
    rect.x >= bounds.x &&
    rect.y >= bounds.y &&
    rect.x + rect.width <= bounds.x + bounds.width &&
    rect.y + rect.height <= bounds.y + bounds.height
  );
}

// Generate a single dungeon with sequential rooms
function generateDungeon(
  id: number,
  bounds: Rect,
  config: GameConfig,
  rng: SeededRandom,
  existingRooms: Room[]
): Dungeon {
  const rooms: Room[] = [];
  let attempts = 0;
  const maxAttempts = 500;
  
  // Place first room (start room)
  let firstRoomPlaced = false;
  while (attempts < maxAttempts && !firstRoomPlaced) {
    const width = rng.nextInt(config.minRoomSize, config.maxRoomSize);
    const height = rng.nextInt(config.minRoomSize, config.maxRoomSize);
    const x = rng.nextInt(bounds.x + 2, bounds.x + bounds.width - width - 2);
    const y = rng.nextInt(bounds.y + 2, bounds.y + bounds.height - height - 2);
    
    const newRoom: Rect = { x, y, width, height };
    
    // Check if room overlaps with existing rooms
    const overlaps = existingRooms.some(r => rectsOverlap(newRoom, r.rect, 3)) ||
                     rooms.some(r => rectsOverlap(newRoom, r.rect, 3));
    
    if (!overlaps && isWithinBounds(newRoom, bounds)) {
      rooms.push({
        id: rooms.length,
        rect: newRoom,
        connected: [],
        isStart: true,
        isBoss: false,
      });
      firstRoomPlaced = true;
    }
    attempts++;
  }
  
  // If first room couldn't be placed, return empty dungeon
  if (rooms.length === 0) {
    return {
      id,
      rooms: [],
      bossRoomId: 0,
      startRoomId: 0,
    };
  }
  
  // Place remaining rooms sequentially
  for (let i = 1; i < config.roomsPerDungeon; i++) {
    attempts = 0;
    const isBossRoom = i === config.roomsPerDungeon - 1;
    let roomPlaced = false;
    
    while (attempts < maxAttempts && !roomPlaced) {
      // Get the last placed room
      const lastRoom = rooms[rooms.length - 1];
      
      const width = rng.nextInt(config.minRoomSize, config.maxRoomSize);
      const height = rng.nextInt(config.minRoomSize, config.maxRoomSize);
      
      // Try to place room in a direction from the last room
      const directions = [
        { dx: 1, dy: 0 },  // right
        { dx: -1, dy: 0 }, // left
        { dx: 0, dy: 1 },  // down
        { dx: 0, dy: -1 }, // up
      ];
      
      // Shuffle directions
      for (let j = directions.length - 1; j > 0; j--) {
        const k = rng.nextInt(0, j);
        [directions[j], directions[k]] = [directions[k], directions[j]];
      }
      
      for (const dir of directions) {
        // Calculate distance from last room
        const distance = rng.nextInt(3, 6);
        
        let x: number, y: number;
        
        if (dir.dx !== 0) {
          // Horizontal placement
          x = lastRoom.rect.x + (dir.dx > 0 ? lastRoom.rect.width + distance : -width - distance);
          y = rng.nextInt(
            Math.max(bounds.y + 2, lastRoom.rect.y - 3),
            Math.min(bounds.y + bounds.height - height - 2, lastRoom.rect.y + lastRoom.rect.height - 3)
          );
        } else {
          // Vertical placement
          x = rng.nextInt(
            Math.max(bounds.x + 2, lastRoom.rect.x - 3),
            Math.min(bounds.x + bounds.width - width - 2, lastRoom.rect.x + lastRoom.rect.width - 3)
          );
          y = lastRoom.rect.y + (dir.dy > 0 ? lastRoom.rect.height + distance : -height - distance);
        }
        
        const newRoom: Rect = { x, y, width, height };
        
        // Check if room overlaps with existing rooms
        const overlaps = existingRooms.some(r => rectsOverlap(newRoom, r.rect, 3)) ||
                         rooms.some(r => rectsOverlap(newRoom, r.rect, 3));
        
        if (!overlaps && isWithinBounds(newRoom, bounds)) {
          const newRoomObj: Room = {
            id: rooms.length,
            rect: newRoom,
            connected: [rooms.length - 1],
            isStart: false,
            isBoss: isBossRoom,
          };
          
          // Connect previous room to this room
          rooms[rooms.length - 1].connected.push(rooms.length);
          
          rooms.push(newRoomObj);
          roomPlaced = true;
          break;
        }
      }
      
      attempts++;
    }
  }
  
  // Find boss room and start room
  const bossRoom = rooms.find(r => r.isBoss);
  const startRoom = rooms.find(r => r.isStart);
  
  return {
    id,
    rooms,
    bossRoomId: bossRoom?.id ?? rooms.length - 1,
    startRoomId: startRoom?.id ?? 0,
  };
}

// Generate corridor between two rooms
function generateCorridor(
  from: Room,
  to: Room,
  tileMap: TileMap,
  config: GameConfig
): void {
  const fromCenter: Point = {
    x: Math.floor(from.rect.x + from.rect.width / 2),
    y: Math.floor(from.rect.y + from.rect.height / 2),
  };
  
  const toCenter: Point = {
    x: Math.floor(to.rect.x + to.rect.width / 2),
    y: Math.floor(to.rect.y + to.rect.height / 2),
  };
  
  // L-shaped corridor
  const halfWidth = Math.floor(config.corridorWidth / 2);
  
  // Draw horizontal corridor first, then vertical
  const minX = Math.min(fromCenter.x, toCenter.x);
  const maxX = Math.max(fromCenter.x, toCenter.x);
  const minY = Math.min(fromCenter.y, toCenter.y);
  const maxY = Math.max(fromCenter.y, toCenter.y);
  
  // Horizontal segment
  for (let x = minX; x <= maxX; x++) {
    for (let dy = -halfWidth; dy <= halfWidth; dy++) {
      const y = fromCenter.y + dy;
      if (y >= 0 && y < tileMap.height && x >= 0 && x < tileMap.width) {
        if (tileMap.tiles[y][x] === TileType.EMPTY) {
          tileMap.tiles[y][x] = TileType.CORRIDOR;
        }
      }
    }
  }
  
  // Vertical segment
  for (let y = minY; y <= maxY; y++) {
    for (let dx = -halfWidth; dx <= halfWidth; dx++) {
      const x = toCenter.x + dx;
      if (y >= 0 && y < tileMap.height && x >= 0 && x < tileMap.width) {
        if (tileMap.tiles[y][x] === TileType.EMPTY) {
          tileMap.tiles[y][x] = TileType.CORRIDOR;
        }
      }
    }
  }
}

// Fill room with floor tiles
function fillRoom(room: Room, tileMap: TileMap, tileType: TileType): void {
  for (let y = room.rect.y; y < room.rect.y + room.rect.height; y++) {
    for (let x = room.rect.x; x < room.rect.x + room.rect.width; x++) {
      if (y >= 0 && y < tileMap.height && x >= 0 && x < tileMap.width) {
        tileMap.tiles[y][x] = tileType;
      }
    }
  }
}

// Add walls around floor tiles
function addWalls(tileMap: TileMap): void {
  const tempTiles = tileMap.tiles.map(row => [...row]);
  
  for (let y = 0; y < tileMap.height; y++) {
    for (let x = 0; x < tileMap.width; x++) {
      if (tempTiles[y][x] === TileType.EMPTY) {
        // Check if adjacent to any floor tile
        const hasFloorNeighbor = 
          (y > 0 && isFloorTile(tempTiles[y - 1][x])) ||
          (y < tileMap.height - 1 && isFloorTile(tempTiles[y + 1][x])) ||
          (x > 0 && isFloorTile(tempTiles[y][x - 1])) ||
          (x < tileMap.width - 1 && isFloorTile(tempTiles[y][x + 1]));
        
        if (hasFloorNeighbor) {
          tileMap.tiles[y][x] = TileType.WALL;
        }
      }
    }
  }
}

function isFloorTile(tile: TileType): boolean {
  return tile === TileType.FLOOR || 
         tile === TileType.CORRIDOR || 
         tile === TileType.CITY_FLOOR ||
         tile === TileType.DOOR ||
         tile === TileType.BOSS_FLOOR ||
         tile === TileType.START_FLOOR;
}

// Generate the complete tile map
export function generateTileMap(config: GameConfig): {
  tileMap: TileMap;
  dungeons: Dungeon[];
} {
  const rng = new SeededRandom();
  
  // Use map dimensions directly
  const gridWidth = config.mapWidth;
  const gridHeight = config.mapHeight;
  
  // Initialize empty tile map
  const tileMap: TileMap = {
    width: gridWidth,
    height: gridHeight,
    tiles: Array(gridHeight).fill(null).map(() => Array(gridWidth).fill(TileType.EMPTY)),
  };
  
  const dungeons: Dungeon[] = [];
  const allRooms: Room[] = [];
  
  // Generate city in center if enabled
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
    
    // Add city walls
    for (let y = cityY - 1; y <= cityY + config.citySize; y++) {
      for (let x = cityX - 1; x <= cityX + config.citySize; x++) {
        if (y >= 0 && y < gridHeight && x >= 0 && x < gridWidth) {
          if (y === cityY - 1 || y === cityY + config.citySize ||
              x === cityX - 1 || x === cityX + config.citySize) {
            if (tileMap.tiles[y][x] === TileType.EMPTY) {
              tileMap.tiles[y][x] = TileType.CITY_WALL;
            }
          }
        }
      }
    }
    
    // Create city rooms as a single big room
    allRooms.push({
      id: 0,
      rect: { x: cityX, y: cityY, width: config.citySize, height: config.citySize },
      connected: [],
      isStart: false,
      isBoss: false,
    });
  }
  
  // Calculate dungeon positions around the city
  const dungeonAreaSize = Math.floor(Math.min(gridWidth, gridHeight) * 0.35);
  const cityCenterX = Math.floor(gridWidth / 2);
  const cityCenterY = Math.floor(gridHeight / 2);
  
  // Place dungeons in a circle around the city
  for (let i = 0; i < config.dungeonCount; i++) {
    const angle = (i / config.dungeonCount) * Math.PI * 2;
    const distance = Math.floor(Math.min(gridWidth, gridHeight) * 0.35);
    
    const centerX = Math.floor(cityCenterX + Math.cos(angle) * distance);
    const centerY = Math.floor(cityCenterY + Math.sin(angle) * distance);
    
    // Define dungeon bounds
    const dungeonBounds: Rect = {
      x: Math.max(2, centerX - Math.floor(dungeonAreaSize / 2)),
      y: Math.max(2, centerY - Math.floor(dungeonAreaSize / 2)),
      width: Math.min(dungeonAreaSize, gridWidth - 4),
      height: Math.min(dungeonAreaSize, gridHeight - 4),
    };
    
    const dungeon = generateDungeon(i, dungeonBounds, config, rng, allRooms);
    dungeons.push(dungeon);
    
    // Add dungeon rooms to all rooms
    allRooms.push(...dungeon.rooms);
  }
  
  // Render all dungeons to tile map
  for (const dungeon of dungeons) {
    // Skip empty dungeons
    if (dungeon.rooms.length === 0) continue;
    
    for (const room of dungeon.rooms) {
      let tileType = TileType.FLOOR;
      
      if (room.isStart) {
        tileType = TileType.START_FLOOR;
      } else if (room.isBoss) {
        tileType = TileType.BOSS_FLOOR;
      }
      
      fillRoom(room, tileMap, tileType);
      
      // Draw room walls
      for (let y = room.rect.y - 1; y <= room.rect.y + room.rect.height; y++) {
        for (let x = room.rect.x - 1; x <= room.rect.x + room.rect.width; x++) {
          if (y >= 0 && y < gridHeight && x >= 0 && x < gridWidth) {
            if (y === room.rect.y - 1 || y === room.rect.y + room.rect.height ||
                x === room.rect.x - 1 || x === room.rect.x + room.rect.width) {
              if (tileMap.tiles[y][x] === TileType.EMPTY) {
                tileMap.tiles[y][x] = TileType.WALL;
              }
            }
          }
        }
      }
    }
    
    // Draw corridors between connected rooms
    for (const room of dungeon.rooms) {
      for (const connectedId of room.connected) {
        if (connectedId > room.id) {
          const connectedRoom = dungeon.rooms.find(r => r.id === connectedId);
          if (connectedRoom) {
            generateCorridor(room, connectedRoom, tileMap, config);
          }
        }
      }
    }
    
    // Add walls around corridors (only if dungeon has rooms)
    if (dungeon.rooms.length > 0) {
      addWalls(tileMap);
    }
  }
  
  return { tileMap, dungeons };
}
