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

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 5;

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
  private fitScale: number = 1;
  private canvasWidth: number = 0;
  private canvasHeight: number = 0;
  private canvas: HTMLCanvasElement | null = null;

  constructor(config: GameConfig) {
    this.config = config;
  }

  async init(canvas: HTMLCanvasElement): Promise<void> {
    this.canvas = canvas;

    // Set canvas to full screen dimensions
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;

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
    if (!this.app || !this.canvas) return;

    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;

    // Update both canvas element and renderer
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.app.renderer.resize(this.canvasWidth, this.canvasHeight);

    // Recalculate fit scale and re-fit the map
    this.computeFitScale();
    this.applyFitView();
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

    // Auto-fit the map to screen
    this.computeFitScale();
    this.applyFitView();
  }

  private computeFitScale(): void {
    if (!this.tileMap) return;

    const mapPixelWidth = this.tileMap.width * this.config.tilePixelSize;
    const mapPixelHeight = this.tileMap.height * this.config.tilePixelSize;

    // Scale to fit 90% of the screen to leave a margin
    this.fitScale =
      Math.min(
        this.canvasWidth / mapPixelWidth,
        this.canvasHeight / mapPixelHeight,
      ) * 0.9;
  }

  private applyFitView(): void {
    if (!this.container || !this.tileMap) return;

    this.scale = this.fitScale;
    this.container.scale.set(this.scale);

    const mapPixelWidth = this.tileMap.width * this.config.tilePixelSize;
    const mapPixelHeight = this.tileMap.height * this.config.tilePixelSize;

    // Center the map on screen
    this.container.x = (this.canvasWidth - mapPixelWidth * this.scale) / 2;
    this.container.y = (this.canvasHeight - mapPixelHeight * this.scale) / 2;

    this.offset = { x: this.container.x, y: this.container.y };
  }

  private clampOffset(): void {
    if (!this.container || !this.tileMap) return;

    const mapPixelWidth = this.tileMap.width * this.config.tilePixelSize;
    const mapPixelHeight = this.tileMap.height * this.config.tilePixelSize;

    const scaledW = mapPixelWidth * this.scale;
    const scaledH = mapPixelHeight * this.scale;

    // Allow the map to be smaller than the canvas (centered),
    // but prevent scrolling past the edges when the map is larger.
    if (scaledW <= this.canvasWidth) {
      // Map fits horizontally — center it
      this.offset.x = (this.canvasWidth - scaledW) / 2;
    } else {
      // Clamp so map edges don't go past canvas edges
      this.offset.x = Math.min(0, Math.max(this.canvasWidth - scaledW, this.offset.x));
    }

    if (scaledH <= this.canvasHeight) {
      this.offset.y = (this.canvasHeight - scaledH) / 2;
    } else {
      this.offset.y = Math.min(0, Math.max(this.canvasHeight - scaledH, this.offset.y));
    }

    this.container.x = this.offset.x;
    this.container.y = this.offset.y;
  }

  private zoomAtPoint(newScale: number, clientX: number, clientY: number): void {
    if (!this.container || !this.tileMap) return;

    const clampedScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newScale));

    // Mouse position relative to canvas
    const mouseX = clientX;
    const mouseY = clientY;

    // World position of mouse before zoom
    const worldX = (mouseX - this.offset.x) / this.scale;
    const worldY = (mouseY - this.offset.y) / this.scale;

    // Apply new scale
    this.scale = clampedScale;
    this.container.scale.set(this.scale);

    // Adjust offset so the world point under the cursor stays fixed:
    // mouseX = worldX * newScale + newOffsetX  =>  newOffsetX = mouseX - worldX * newScale
    this.offset.x = mouseX - worldX * this.scale;
    this.offset.y = mouseY - worldY * this.scale;

    this.container.x = this.offset.x;
    this.container.y = this.offset.y;

    // Clamp to map bounds
    this.clampOffset();
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
            tileSize,
          );
          this.tileGraphics.endFill();

          // Draw grid line
          this.tileGraphics.lineStyle(1, 0x000000, 0.15);
          this.tileGraphics.drawRect(
            x * tileSize,
            y * tileSize,
            tileSize,
            tileSize,
          );
          this.tileGraphics.lineStyle(0);
        }
      }
    }
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

      this.offset.x += dx;
      this.offset.y += dy;
      this.container.x = this.offset.x;
      this.container.y = this.offset.y;

      this.lastMousePos = { x: e.clientX, y: e.clientY };

      // Constrain to map bounds while dragging
      this.clampOffset();
    });

    // Mouse up - stop drag
    canvas.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    canvas.addEventListener('mouseleave', () => {
      this.isDragging = false;
    });

    // Double click - toggle between fit-view and 2x zoom (centered on click)
    canvas.addEventListener('dblclick', (e) => {
      if (!this.container) return;

      if (Math.abs(this.scale - this.fitScale) < 0.01) {
        // Currently at fit-view, zoom to 2x at click position
        this.zoomAtPoint(2, e.clientX, e.clientY);
      } else {
        // Not at fit-view, return to fit
        this.applyFitView();
      }
    });

    // Mouse wheel - zoom centered on mouse position
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();

      if (!this.container) return;

      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = this.scale * zoomFactor;

      this.zoomAtPoint(newScale, e.clientX, e.clientY);
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
