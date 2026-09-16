import * as PIXI from 'pixi.js';
import { Dungeon, GameConfig, TileType, TileMap, WorldData } from './types';
import { generateWorldDungeons, renderWorld } from './dungeon/generator';

// Color palette ported from the dungeon-generator.html prototype.
const TILE_COLORS: Record<TileType, number> = {
  [TileType.EMPTY]: 0x000000,
  [TileType.WALL]: 0x232838,
  [TileType.FLOOR]: 0x4b5568,
  [TileType.CORRIDOR]: 0x39414f,
  [TileType.CITY_FLOOR]: 0xc9b896,
  [TileType.CITY_WALL]: 0x5b4a3a,
  [TileType.DOOR]: 0x8b4513,
  [TileType.BOSS_FLOOR]: 0x7a2e2e,
  [TileType.START_FLOOR]: 0x2e7a4f,
};

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 5;

export class GameEngine {
  private app: PIXI.Application | null = null;
  private tileGraphics: PIXI.Graphics | null = null;
  private gridGraphics: PIXI.Graphics | null = null;
  private showGrid = false;
  private container: PIXI.Container | null = null;
  private config: GameConfig;
  private tileMap: TileMap | null = null;
  // Full deterministic plan for the current seed + config. Only the first
  // `visibleCount` entries are placed on the map — nothing is auto-placed.
  private planned: Dungeon[] = [];
  private visibleCount = 0;
  private isDragging: boolean = false;
  private lastMousePos: { x: number; y: number } = { x: 0, y: 0 };
  private offset: { x: number; y: number } = { x: 0, y: 0 };
  private scale: number = 1;
  private coverScale: number = 1;
  private minScale: number = MIN_ZOOM;

  /** Upper zoom bound; guards tiny maps where cover > 5. */
  private get maxZoom(): number {
    return Math.max(MAX_ZOOM, this.minScale);
  }
  private canvasWidth: number = 0;
  private canvasHeight: number = 0;
  private canvas: HTMLCanvasElement | null = null;
  private resizeObserver: ResizeObserver | null = null;

  constructor(config: GameConfig) {
    this.config = config;
  }

  async init(canvas: HTMLCanvasElement): Promise<void> {
    this.canvas = canvas;

    // Size from the canvas's actual container (the flex-1 area below the
    // top menu), NOT window.innerWidth/Height which includes the menu and
    // would render a taller image than visible (cropping the map bottom).
    const { width, height } = this.measureContainerSize();
    this.canvasWidth = width;
    this.canvasHeight = height;
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

    // Re-fit when the parent container layout changes (menu height,
    // flex layout, etc.) even without a window resize.
    if (
      typeof ResizeObserver !== 'undefined' &&
      canvas.parentElement
    ) {
      this.resizeObserver = new ResizeObserver(() => {
        this.handleResize();
      });
      this.resizeObserver.observe(canvas.parentElement);
    }
  }

  /**
   * Measure the canvas's actual container size. Falls back to the canvas
   * CSS size, then to window minus the measured top menu height.
   */
  private measureContainerSize(): { width: number; height: number } {
    const parent = this.canvas?.parentElement;
    let w = parent?.clientWidth ?? 0;
    let h = parent?.clientHeight ?? 0;

    if ((!w || !h) && this.canvas) {
      w = w || this.canvas.clientWidth;
      h = h || this.canvas.clientHeight;
    }

    if ((!w || !h) && typeof window !== 'undefined') {
      const header = document.querySelector('header');
      const headerHeight =
        header instanceof HTMLElement ? header.offsetHeight : 0;
      w = w || window.innerWidth;
      h = h || window.innerHeight - headerHeight;
    }

    return {
      width: Math.max(1, Math.floor(w)),
      height: Math.max(1, Math.floor(h)),
    };
  }

  private handleResize = (): void => {
    if (!this.app || !this.canvas) return;

    const { width, height } = this.measureContainerSize();

    // No-op if the container size did not actually change.
    if (width === this.canvasWidth && height === this.canvasHeight) return;

    this.canvasWidth = width;
    this.canvasHeight = height;

    // Update both canvas element and renderer
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.app.renderer.resize(this.canvasWidth, this.canvasHeight);

    // Recalculate cover scale and re-apply the cover view
    this.computeCoverScale();
    this.applyCoverView();
  };

  /**
   * Re-plan from seed + config and reset to an empty map (city + solid rock).
   * Dungeons are only placed via addDungeon() — nothing auto-generates.
   */
  generate(): void {
    this.planned = generateWorldDungeons(this.config);
    this.visibleCount = 0;
    this.redraw();
  }

  /** Re-render the explicit world state (city + current dungeons). */
  private redraw(): void {
    this.tileMap = renderWorld(this.config, this.planned.slice(0, this.visibleCount));

    if (!this.app) return;

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

    // Auto-cover the map to screen (no outside area visible)
    this.computeCoverScale();
    this.applyCoverView();
  }

  private computeCoverScale(): void {
    if (!this.tileMap) {
      this.minScale = MIN_ZOOM;
      return;
    }

    const mapPixelWidth = this.tileMap.width * this.config.tilePixelSize;
    const mapPixelHeight = this.tileMap.height * this.config.tilePixelSize;

    // Scale to cover the entire canvas so the map always fills it.
    // Exact cover, no margin: zooming out past this would reveal outside.
    this.coverScale = Math.max(
      this.canvasWidth / mapPixelWidth,
      this.canvasHeight / mapPixelHeight,
    );

    // Minimum zoom is the cover scale: the map always covers the canvas,
    // and the user can never zoom out past that.
    this.minScale = this.coverScale;
  }

  private applyCoverView(): void {
    if (!this.container || !this.tileMap) return;

    this.scale = this.coverScale;
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

    // Never reveal outside the map: offset must keep the scaled map
    // covering the whole canvas. At/above cover the scaled map is larger
    // than the canvas, so clamp to [canvas - scaled, 0]. Guard the
    // below-cover case (shouldn't happen) by centering that axis.
    if (scaledW <= this.canvasWidth) {
      // Map narrower than canvas — center it
      this.offset.x = (this.canvasWidth - scaledW) / 2;
    } else {
      // Clamp so no empty/outside area is visible horizontally
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

    const clampedScale = Math.max(this.minScale, Math.min(this.maxZoom, newScale));

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

    // Double click - toggle between cover-view and 2x zoom (centered on click)
    canvas.addEventListener('dblclick', (e) => {
      if (!this.container) return;

      if (Math.abs(this.scale - this.coverScale) < 0.01) {
        // Currently at cover-view, zoom in ~2x at click position.
        // Use 2x cover when cover itself is large so the target never
        // ends up below minScale; zoomAtPoint clamps to [minScale, MAX].
        this.zoomAtPoint(Math.max(2, this.coverScale * 2), e.clientX, e.clientY);
      } else {
        // Not at cover-view, return to cover (== minScale), never below.
        this.applyCoverView();
      }
    });

    // Mouse wheel - zoom centered on mouse position
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();

      if (!this.container) return;

      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.max(
        this.minScale,
        Math.min(this.maxZoom, this.scale * zoomFactor),
      );

      this.zoomAtPoint(newScale, e.clientX, e.clientY);
    });
  }

  updateConfig(config: GameConfig): void {
    this.config = config;
    // Existing dungeons can't survive a config change: room footprints depend
    // on map/city/room settings, so re-plan fresh and reset to empty
    // (same seed + config = same plan).
    this.generate();
  }

  /**
   * Place the next planned dungeon (deterministic packing order).
   * Returns false when every planned dungeon is already placed.
   */
  addDungeon(): boolean {
    if (this.visibleCount >= this.planned.length) return false;
    this.visibleCount++;
    this.redraw();
    return true;
  }

  /**
   * Remove the most recently placed dungeon (LIFO, keeps the visible prefix).
   * Returns false when the map has no dungeons.
   */
  removeDungeon(): boolean {
    if (this.visibleCount <= 0) return false;
    this.visibleCount--;
    this.redraw();
    return true;
  }

  getWorldData(): WorldData {
    return {
      config: { ...this.config },
      dungeons: this.planned.slice(0, this.visibleCount).map((d) => ({
        ...d,
        rooms: d.rooms.map((r) => ({
          ...r,
          rect: { ...r.rect },
          connected: [...r.connected],
        })),
      })),
    };
  }

  loadWorldData(data: WorldData): void {
    this.config = { ...data.config };
    const planned = generateWorldDungeons(this.config);
    const saved = data.dungeons.map((d) => ({
      ...d,
      rooms: d.rooms.map((r) => ({
        ...r,
        rect: { ...r.rect },
        connected: [...r.connected],
      })),
    }));
    if (
      saved.length <= planned.length &&
      saved.every((d, i) => JSON.stringify(d) === JSON.stringify(planned[i]))
    ) {
      // Prefix restore: saved dungeons match the deterministic plan prefix,
      // so further addDungeon() calls continue the deterministic order.
      this.planned = planned;
      this.visibleCount = saved.length;
    } else {
      // Legacy gen-v1 saves: fall back to the saved dungeons as the plan.
      this.planned = saved;
      this.visibleCount = saved.length;
    }
    this.redraw();
  }

  destroy(): void {
    window.removeEventListener('resize', this.handleResize);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (this.app) {
      this.app.destroy(true);
      this.app = null;
    }
  }

  getTileMap(): TileMap | null {
    return this.tileMap;
  }
}
