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
  private gridGraphics: PIXI.Graphics | null = null;
  private showGrid = true;
  private container: PIXI.Container | null = null;
  private config: GameConfig;
  private tileMap: TileMap | null = null;
  private isDragging: boolean = false;
  private lastMousePos: { x: number; y: number } = { x: 0, y: 0 };
  private offset: { x: number; y: number } = { x: 0, y: 0 };
  private scale: number = 1;
  private fitScale: number = 1;
  private minScale: number = MIN_ZOOM;
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

    // Create grid overlay above tile graphics
    this.gridGraphics = new PIXI.Graphics();
    this.container.addChild(this.gridGraphics);

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

    // Ensure grid overlay stays on top (fix z-order) and redraw it
    if (!this.gridGraphics) {
      this.gridGraphics = new PIXI.Graphics();
      this.container?.addChild(this.gridGraphics);
    } else {
      this.container?.removeChild(this.gridGraphics);
      this.container?.addChild(this.gridGraphics);
    }
    this.drawGrid();

    // Auto-fit the map to screen
    this.computeFitScale();
    this.applyFitView();
  }

  private computeFitScale(): void {
    if (!this.tileMap) {
      this.minScale = MIN_ZOOM;
      return;
    }

    const mapPixelWidth = this.tileMap.width * this.config.tilePixelSize;
    const mapPixelHeight = this.tileMap.height * this.config.tilePixelSize;

    // Scale to fit 90% of the screen to leave a margin
    this.fitScale =
      Math.min(
        this.canvasWidth / mapPixelWidth,
        this.canvasHeight / mapPixelHeight,
      ) * 0.9;

    // Minimum zoom is the fit scale: the whole map plus outside margin
    // stays visible, and the user can never zoom out past that.
    this.minScale = this.fitScale;
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

    const clampedScale = Math.max(this.minScale, Math.min(MAX_ZOOM, newScale));

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

  private drawGrid(): void {
    if (!this.gridGraphics) return;
    this.gridGraphics.clear();
    if (!this.showGrid || !this.tileMap) return;

    const mapPixelW = this.tileMap.width * this.config.tilePixelSize;
    const mapPixelH = this.tileMap.height * this.config.tilePixelSize;

    // Pass 1: dark halo so lines are visible on light tiles
    this.gridGraphics.lineStyle(2, 0x000000, 0.55);
    for (let x = 0; x <= this.tileMap.width; x++) {
      const px = x * this.config.tilePixelSize;
      this.gridGraphics.moveTo(px, 0);
      this.gridGraphics.lineTo(px, mapPixelH);
    }
    for (let y = 0; y <= this.tileMap.height; y++) {
      const py = y * this.config.tilePixelSize;
      this.gridGraphics.moveTo(0, py);
      this.gridGraphics.lineTo(mapPixelW, py);
    }

    // Pass 2: thin white core so lines are visible on dark tiles
    this.gridGraphics.lineStyle(1, 0xffffff, 0.55);
    for (let x = 0; x <= this.tileMap.width; x++) {
      const px = x * this.config.tilePixelSize;
      this.gridGraphics.moveTo(px, 0);
      this.gridGraphics.lineTo(px, mapPixelH);
    }
    for (let y = 0; y <= this.tileMap.height; y++) {
      const py = y * this.config.tilePixelSize;
      this.gridGraphics.moveTo(0, py);
      this.gridGraphics.lineTo(mapPixelW, py);
    }

    // Map extent border so the map bounds are obvious
    this.gridGraphics.lineStyle(2, 0xfbbf24, 0.9);
    this.gridGraphics.drawRect(0, 0, mapPixelW, mapPixelH);
  }

  public setShowGrid(show: boolean): void {
    this.showGrid = show;
    this.drawGrid();
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
        // Currently at fit-view, zoom in ~2x at click position.
        // Use 2x fit when fit itself is large so the target never
        // ends up below minScale; zoomAtPoint clamps to [minScale, MAX].
        this.zoomAtPoint(Math.max(2, this.fitScale * 2), e.clientX, e.clientY);
      } else {
        // Not at fit-view, return to fit (== minScale), never below.
        this.applyFitView();
      }
    });

    // Mouse wheel - zoom centered on mouse position
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();

      if (!this.container) return;

      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.max(
        this.minScale,
        Math.min(MAX_ZOOM, this.scale * zoomFactor),
      );

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
