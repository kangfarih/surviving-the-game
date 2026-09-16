import * as PIXI from 'pixi.js';
import { GameConfig, TileType, TileMap } from './types';
import { generateTileMap } from './dungeon/generator';

// Color palette for tiles
const TILE_COLORS: Record<TileType, number> = {
  [TileType.EMPTY]: 0x000000,
  [TileType.WALL]: 0x4a4a4a,
  [TileType.FLOOR]: 0x8b7355,
  [TileType.CORRIDOR]: 0x9b8b6b,
  [TileType.CITY_FLOOR]: 0x6b8b6b,
  [TileType.CITY_WALL]: 0x5a6a5a,
  [TileType.DOOR]: 0x8b4513,
  [TileType.BOSS_FLOOR]: 0x8b2252,
  [TileType.START_FLOOR]: 0x4169e1,
};

export class GameEngine {
  private app: PIXI.Application | null = null;
  private tileGraphics: PIXI.Graphics | null = null;
  private container: PIXI.Container | null = null;
  private config: GameConfig;
  private tileMap: TileMap | null = null;
  private isDragging: boolean = false;
  private lastMousePos: { x: number; y: number } = { x: 0, y: 0 };
  private offset: { x: number; y: number } = { x: 0, y: 0 };
  private scale: number = 1;
  private canvasWidth: number = 0;
  private canvasHeight: number = 0;
  
  constructor(config: GameConfig) {
    this.config = config;
  }
  
  async init(canvas: HTMLCanvasElement): Promise<void> {
    // Get full screen dimensions
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    
    // Create PixiJS application with full screen
    this.app = new PIXI.Application({
      view: canvas,
      width: this.canvasWidth,
      height: this.canvasHeight,
      backgroundColor: 0x111111,
      antialias: false,
      resolution: 1,
      autoDensity: true,
    });
    
    // Create container for tilemap
    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
    
    // Generate initial tilemap
    this.generate();
    
    // Setup controls
    this.setupControls(canvas);
    
    // Handle window resize
    window.addEventListener('resize', this.handleResize);
  }
  
  private handleResize = (): void => {
    if (!this.app) return;
    
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    
    this.app.renderer.resize(this.canvasWidth, this.canvasHeight);
    this.centerView();
  };
  
  generate(): void {
    if (!this.app) return;
    
    // Generate tilemap
    const result = generateTileMap(this.config);
    this.tileMap = result.tileMap;
    
    // Clear previous graphics
    if (this.tileGraphics) {
      this.container?.removeChild(this.tileGraphics);
      this.tileGraphics.destroy();
    }
    
    // Create new graphics
    this.tileGraphics = new PIXI.Graphics();
    this.container?.addChild(this.tileGraphics);
    
    // Draw tiles
    this.drawTileMap();
    
    // Center the view
    this.centerView();
  }
  
  private drawTileMap(): void {
    if (!this.tileGraphics || !this.tileMap) return;
    
    this.tileGraphics.clear();
    
    const tileSize = this.config.tilePixelSize;
    
    // Draw all tiles
    for (let y = 0; y < this.tileMap.height; y++) {
      for (let x = 0; x < this.tileMap.width; x++) {
        const tile = this.tileMap.tiles[y][x];
        const color = TILE_COLORS[tile];
        
        if (tile !== TileType.EMPTY) {
          // Draw filled rectangle
          this.tileGraphics.beginFill(color);
          this.tileGraphics.drawRect(
            x * tileSize,
            y * tileSize,
            tileSize,
            tileSize
          );
          this.tileGraphics.endFill();
          
          // Draw grid line
          this.tileGraphics.lineStyle(1, 0x000000, 0.15);
          this.tileGraphics.drawRect(
            x * tileSize,
            y * tileSize,
            tileSize,
            tileSize
          );
          this.tileGraphics.lineStyle(0);
        }
      }
    }
  }
  
  private centerView(): void {
    if (!this.container || !this.tileMap) return;
    
    const mapPixelWidth = this.tileMap.width * this.config.tilePixelSize;
    const mapPixelHeight = this.tileMap.height * this.config.tilePixelSize;
    
    // Center the map on screen
    this.container.x = (this.canvasWidth - mapPixelWidth * this.scale) / 2;
    this.container.y = (this.canvasHeight - mapPixelHeight * this.scale) / 2;
    
    this.offset = { x: this.container.x, y: this.container.y };
  }
  
  private setupControls(canvas: HTMLCanvasElement): void {
    // Mouse down - start drag
    canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMousePos = { x: e.clientX, y: e.clientY };
    });
    
    // Mouse move - drag
    canvas.addEventListener('mousemove', (e) => {
      if (!this.isDragging || !this.container) return;
      
      const dx = e.clientX - this.lastMousePos.x;
      const dy = e.clientY - this.lastMousePos.y;
      
      this.container.x += dx;
      this.container.y += dy;
      
      this.offset.x = this.container.x;
      this.offset.y = this.container.y;
      
      this.lastMousePos = { x: e.clientX, y: e.clientY };
    });
    
    // Mouse up - stop drag
    canvas.addEventListener('mouseup', () => {
      this.isDragging = false;
    });
    
    canvas.addEventListener('mouseleave', () => {
      this.isDragging = false;
    });
    
    // Double click - zoom
    canvas.addEventListener('dblclick', () => {
      if (!this.container) return;
      
      if (this.scale < 2) {
        this.scale = Math.min(3, this.scale + 0.5);
      } else {
        this.scale = 1;
      }
      
      this.container.scale.set(this.scale);
      this.centerView();
    });
    
    // Mouse wheel - zoom (alternative)
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      
      if (!this.container) return;
      
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      this.scale = Math.max(0.5, Math.min(3, this.scale + delta));
      
      this.container.scale.set(this.scale);
      this.centerView();
    });
  }
  
  updateConfig(config: GameConfig): void {
    this.config = config;
    this.generate();
  }
  
  destroy(): void {
    window.removeEventListener('resize', this.handleResize);
    if (this.app) {
      this.app.destroy(true);
      this.app = null;
    }
  }
  
  getTileMap(): TileMap | null {
    return this.tileMap;
  }
}
