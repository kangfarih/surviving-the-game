import * as PIXI from 'pixi.js';
import { Dungeon, GameConfig, TileType, TileMap, WorldData } from './types';
import { generateWorldDungeons, renderWorld } from './dungeon/generator';
import {
  AttackResult,
  CombatSnapshot,
  applyAttack,
  createAgentDrifter,
  createDummy,
  resetCombatant,
  rollBasicAttack,
  type Combatant,
} from './combat';
import { createDrifterSprite } from './sprites';

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

  // --- Minimal combat test harness (agent vs dummy, basic attack only) ---
  private combatLayer: PIXI.Container | null = null;
  private agentSprite: PIXI.Sprite | null = null;
  private dummyContainer: PIXI.Container | null = null;
  private agentHpBar: PIXI.Graphics | null = null;
  private dummyHpBar: PIXI.Graphics | null = null;
  private floaters: Array<{ obj: PIXI.Text; life: number }> = [];
  private agent: Combatant | null = null;
  private dummy: Combatant | null = null;
  private agentTile: { x: number; y: number } | null = null;
  private dummyTile: { x: number; y: number } | null = null;
  private autoAttacking = false;
  private combatTick = 0;
  private combatTimer: number | null = null;
  private combatLog: AttackResult[] = [];
  private lastHit: AttackResult | null = null;
  private onCombatUpdate: ((snap: CombatSnapshot) => void) | null = null;

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

    // Combat layer sits above tiles + grid (agent sprite, dummy, HP bars).
    this.combatLayer = new PIXI.Container();
    this.container.addChild(this.combatLayer);

    // Animate floating damage numbers.
    this.app.ticker.add(this.updateFloaters);

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
    this.container?.addChildAt(this.tileGraphics, 0);

    // Draw tiles
    this.drawTileMap();

    // Ensure grid overlay stays on top of tiles but below combat.
    if (!this.gridGraphics) {
      this.gridGraphics = new PIXI.Graphics();
      this.container?.addChild(this.gridGraphics);
    } else {
      this.container?.removeChild(this.gridGraphics);
      this.container?.addChild(this.gridGraphics);
    }
    this.drawGrid();

    // Keep combat layer above tiles + grid.
    if (this.combatLayer) {
      this.container?.removeChild(this.combatLayer);
      this.container?.addChild(this.combatLayer);
      this.repositionCombatants();
    }

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
    this.stopAutoAttack();
    window.removeEventListener('resize', this.handleResize);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (this.app) {
      this.app.ticker.remove(this.updateFloaters);
      this.app.destroy(true);
      this.app = null;
    }
  }

  getTileMap(): TileMap | null {
    return this.tileMap;
  }

  // -------------------------------------------------------------------------
  // Combat test harness: summon agent + dummy, basic attack, floating damage.
  // -------------------------------------------------------------------------

  /** Subscribe to combat snapshots (React panel). Returns unsubscribe. */
  onCombat(cb: (snap: CombatSnapshot) => void): () => void {
    this.onCombatUpdate = cb;
    cb(this.getCombatSnapshot());
    return () => {
      if (this.onCombatUpdate === cb) this.onCombatUpdate = null;
    };
  }

  getCombatSnapshot(): CombatSnapshot {
    return {
      agent: this.agent ? { ...this.agent } : null,
      dummy: this.dummy ? { ...this.dummy } : null,
      autoAttacking: this.autoAttacking,
      tick: this.combatTick,
      lastHit: this.lastHit ? { ...this.lastHit } : null,
      log: this.combatLog.slice(-20).map((r) => ({ ...r })),
    };
  }

  private emitCombat(): void {
    this.onCombatUpdate?.(this.getCombatSnapshot());
  }

  private isWalkable(x: number, y: number): boolean {
    const tm = this.tileMap;
    if (!tm) return false;
    if (x < 0 || y < 0 || x >= tm.width || y >= tm.height) return false;
    const t = tm.tiles[y][x];
    return t !== TileType.WALL && t !== TileType.EMPTY;
  }

  private tileToWorld(tx: number, ty: number): { x: number; y: number } {
    const s = this.config.tilePixelSize;
    return { x: (tx + 0.5) * s, y: (ty + 0.5) * s };
  }

  /** Find a walkable tile near map center, then a walkable neighbor for the dummy. */
  private findArenaSpots(): [{ x: number; y: number }, { x: number; y: number }] | null {
    const tm = this.tileMap;
    if (!tm) return null;
    const cx = Math.floor(tm.width / 2);
    const cy = Math.floor(tm.height / 2);
    const maxR = Math.max(tm.width, tm.height);
    for (let r = 0; r < maxR; r++) {
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
          const ax = cx + dx;
          const ay = cy + dy;
          if (!this.isWalkable(ax, ay)) continue;
          const neighbors = [
            { x: ax + 1, y: ay },
            { x: ax - 1, y: ay },
            { x: ax, y: ay + 1 },
            { x: ax, y: ay - 1 },
          ];
          for (const n of neighbors) {
            if (this.isWalkable(n.x, n.y)) {
              return [{ x: ax, y: ay }, n];
            }
          }
        }
      }
    }
    return null;
  }

  /** First walkable tile near center, optionally avoiding one tile. */
  private findSingleSpot(
    exclude: { x: number; y: number } | null = null,
  ): { x: number; y: number } | null {
    const tm = this.tileMap;
    if (!tm) return null;
    const cx = Math.floor(tm.width / 2);
    const cy = Math.floor(tm.height / 2);
    const maxR = Math.max(tm.width, tm.height);
    for (let r = 0; r < maxR; r++) {
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
          const x = cx + dx;
          const y = cy + dy;
          if (!this.isWalkable(x, y)) continue;
          if (exclude && x === exclude.x && y === exclude.y) continue;
          return { x, y };
        }
      }
    }
    return null;
  }

  /** Walkable neighbor of `around`, avoiding `exclude`. Falls back to any spot. */
  private findNeighborSpot(
    around: { x: number; y: number },
    exclude: { x: number; y: number } | null = null,
  ): { x: number; y: number } | null {
    const candidates = [
      { x: around.x + 1, y: around.y },
      { x: around.x - 1, y: around.y },
      { x: around.x, y: around.y + 1 },
      { x: around.x, y: around.y - 1 },
    ];
    for (const n of candidates) {
      if (exclude && n.x === exclude.x && n.y === exclude.y) continue;
      if (this.isWalkable(n.x, n.y)) return n;
    }
    return this.findSingleSpot(exclude ?? around);
  }

  private ensureHpBars(): void {
    if (!this.combatLayer) return;
    if (!this.agentHpBar) {
      this.agentHpBar = new PIXI.Graphics();
      this.combatLayer.addChild(this.agentHpBar);
    }
    if (!this.dummyHpBar) {
      this.dummyHpBar = new PIXI.Graphics();
      this.combatLayer.addChild(this.dummyHpBar);
    }
  }

  private faceAgentToDummy(): void {
    if (!this.agentSprite || !this.agentTile || !this.dummyTile) return;
    const aPos = this.tileToWorld(this.agentTile.x, this.agentTile.y);
    const dPos = this.tileToWorld(this.dummyTile.x, this.dummyTile.y);
    const dx = dPos.x - aPos.x;
    const dy = dPos.y - aPos.y;
    this.agentSprite.rotation = Math.atan2(dx, -dy);
  }

  private spawnAgentSprite(): void {
    if (!this.combatLayer || !this.agentTile || !this.agent) return;
    if (this.agentSprite) {
      const p = this.tileToWorld(this.agentTile.x, this.agentTile.y);
      this.agentSprite.position.set(p.x, p.y);
      return;
    }
    this.agentSprite = createDrifterSprite('agent', this.config.tilePixelSize, 0);
    const aPos = this.tileToWorld(this.agentTile.x, this.agentTile.y);
    this.agentSprite.position.set(aPos.x, aPos.y);
    this.combatLayer.addChild(this.agentSprite);
  }

  private spawnDummySprite(): void {
    if (!this.combatLayer || !this.dummyTile || !this.dummy) return;
    if (this.dummyContainer) {
      const p = this.tileToWorld(this.dummyTile.x, this.dummyTile.y);
      this.dummyContainer.position.set(p.x, p.y);
      return;
    }
    this.dummyContainer = new PIXI.Container();
    const dPos = this.tileToWorld(this.dummyTile.x, this.dummyTile.y);
    this.dummyContainer.position.set(dPos.x, dPos.y);
    const s = this.config.tilePixelSize;
    const body = new PIXI.Graphics();
    // Post
    body.beginFill(0x8a6b46);
    body.drawRect(-s * 0.12, -s * 0.6, s * 0.24, s * 1.2);
    body.endFill();
    // Cross-arm
    body.beginFill(0x8a6b46);
    body.drawRect(-s * 0.5, -s * 0.35, s * 1.0, s * 0.2);
    body.endFill();
    // Straw head (target circle)
    body.beginFill(0xc9b896);
    body.lineStyle(2, 0x14171f, 1);
    body.drawCircle(0, -s * 0.55, s * 0.32);
    body.endFill();
    body.beginFill(0x7a2e2e);
    body.drawCircle(0, -s * 0.55, s * 0.14);
    body.endFill();
    body.lineStyle(0);
    this.dummyContainer.addChild(body);
    this.combatLayer.addChild(this.dummyContainer);
  }

  /** Summon only the agent drifter. Idempotent — keeps position if present. */
  summonAgent(): boolean {
    if (!this.app || !this.container || !this.combatLayer || !this.tileMap) return false;
    if (this.agent && this.agentTile && this.agentSprite) return true;
    // Place next to the dummy when it already exists.
    const tile = this.dummyTile
      ? (this.findNeighborSpot(this.dummyTile, this.dummyTile) ?? this.findSingleSpot(this.dummyTile))
      : (this.agentTile ?? this.findSingleSpot(null));
    if (!tile) return false;
    this.agentTile = tile;
    if (!this.agent) this.agent = createAgentDrifter();
    this.spawnAgentSprite();
    this.ensureHpBars();
    this.faceAgentToDummy();
    this.drawHpBars();
    this.emitCombat();
    return true;
  }

  /** Summon only the training dummy. Idempotent — keeps position if present. */
  summonDummy(): boolean {
    if (!this.app || !this.container || !this.combatLayer || !this.tileMap) return false;
    if (this.dummy && this.dummyTile && this.dummyContainer) return true;
    // Place next to the agent when it already exists.
    const tile = this.agentTile
      ? (this.findNeighborSpot(this.agentTile, this.agentTile) ?? this.findSingleSpot(this.agentTile))
      : (this.dummyTile ?? this.findSingleSpot(null));
    if (!tile) return false;
    this.dummyTile = tile;
    if (!this.dummy) this.dummy = createDummy();
    else if (!this.dummy.alive) resetCombatant(this.dummy);
    this.spawnDummySprite();
    if (this.dummyContainer) this.dummyContainer.alpha = 1;
    this.ensureHpBars();
    this.faceAgentToDummy();
    this.drawHpBars();
    this.emitCombat();
    return true;
  }

  /** Summon an agent drifter + training dummy side-by-side near map center. */
  summonAgentAndDummy(): boolean {
    if (!this.app || !this.container || !this.combatLayer || !this.tileMap) return false;
    // If both already out, keep positions.
    if (this.agent && this.dummy && this.agentTile && this.dummyTile) return true;
    // Fresh pair placement when neither exists — keeps the classic side-by-side.
    if (!this.agentTile && !this.dummyTile) {
      const spots = this.findArenaSpots();
      if (!spots) return false;
      const [agentTile, dummyTile] = spots;
      this.agentTile = agentTile;
      this.dummyTile = dummyTile;
      this.stopAutoAttack();
      this.clearCombatSprites();
      this.combatLog = [];
      this.lastHit = null;
      this.combatTick = 0;
      this.agent = createAgentDrifter();
      this.dummy = createDummy();
      this.spawnAgentSprite();
      this.spawnDummySprite();
      this.ensureHpBars();
      this.faceAgentToDummy();
      this.drawHpBars();
      this.emitCombat();
      return true;
    }
    // Otherwise summon whichever side is missing next to the other.
    const okA = this.summonAgent();
    const okD = this.summonDummy();
    return okA && okD;
  }

  /** Remove combat sprites without clearing sim state listeners. */
  private clearCombatSprites(): void {
    if (this.agentSprite) {
      this.agentSprite.destroy();
      this.agentSprite = null;
    }
    if (this.dummyContainer) {
      this.dummyContainer.destroy({ children: true });
      this.dummyContainer = null;
    }
    if (this.agentHpBar) {
      this.agentHpBar.destroy();
      this.agentHpBar = null;
    }
    if (this.dummyHpBar) {
      this.dummyHpBar.destroy();
      this.dummyHpBar = null;
    }
    for (const f of this.floaters) {
      this.combatLayer?.removeChild(f.obj);
      f.obj.destroy();
    }
    this.floaters = [];
  }

  /** Dismiss agent + dummy, stop auto-attack. */
  dismissCombat(): void {
    this.stopAutoAttack();
    this.clearCombatSprites();
    this.agent = null;
    this.dummy = null;
    this.agentTile = null;
    this.dummyTile = null;
    this.lastHit = null;
    this.emitCombat();
  }

  /** Reset dummy HP (revive) without moving anything. */
  resetDummy(): void {
    if (!this.dummy) return;
    resetCombatant(this.dummy);
    this.drawHpBars();
    // Clear grey-out on revive.
    if (this.dummyContainer) this.dummyContainer.alpha = 1;
    this.emitCombat();
  }

  private drawHpBars(): void {
    if (!this.agentHpBar || !this.dummyHpBar) return;
    const s = this.config.tilePixelSize;
    const w = s * 1.6;
    const h = Math.max(3, s * 0.22);
    const draw = (g: PIXI.Graphics, c: Combatant | null, wx: number, wy: number) => {
      g.clear();
      if (!c) return;
      const pct = c.maxHp > 0 ? Math.max(0, c.hp / c.maxHp) : 0;
      const x = wx - w / 2;
      const y = wy - s * 1.05 - h;
      g.beginFill(0x000000, 0.75);
      g.drawRect(x - 1, y - 1, w + 2, h + 2);
      g.endFill();
      const color = pct > 0.5 ? 0x4ade80 : pct > 0.25 ? 0xfbbf24 : 0xef4444;
      g.beginFill(color, 1);
      g.drawRect(x, y, w * pct, h);
      g.endFill();
    };
    if (this.agentTile) {
      const p = this.tileToWorld(this.agentTile.x, this.agentTile.y);
      draw(this.agentHpBar, this.agent, p.x, p.y);
    }
    if (this.dummyTile) {
      const p = this.tileToWorld(this.dummyTile.x, this.dummyTile.y);
      draw(this.dummyHpBar, this.dummy, p.x, p.y);
    }
  }

  private repositionCombatants(): void {
    if (!this.agentTile || !this.dummyTile) return;
    if (this.agentSprite) {
      const p = this.tileToWorld(this.agentTile.x, this.agentTile.y);
      this.agentSprite.position.set(p.x, p.y);
      this.agentSprite.width = this.config.tilePixelSize * 1.2;
      this.agentSprite.height = this.config.tilePixelSize * 1.2;
    }
    if (this.dummyContainer && this.dummyTile) {
      const p = this.tileToWorld(this.dummyTile.x, this.dummyTile.y);
      this.dummyContainer.position.set(p.x, p.y);
    }
    this.drawHpBars();
  }

  /** One basic attack from the agent to the dummy. Returns null if N/A. */
  attackOnce(rng: () => number = Math.random): AttackResult | null {
    if (!this.agent || !this.dummy) return null;
    if (!this.agent.alive || !this.dummy.alive) return null;
    this.combatTick += 1;
    const result = rollBasicAttack(this.agent, this.dummy, this.combatTick, rng);
    applyAttack(this.dummy, result);
    this.lastHit = result;
    this.combatLog.push(result);
    if (this.combatLog.length > 100) this.combatLog.shift();
    this.spawnFloater(result.damage, result.killed);
    this.drawHpBars();
    if (result.killed) {
      // Grey out the dummy + stop the loop so the kill reads clearly.
      if (this.dummyContainer) this.dummyContainer.alpha = 0.45;
      this.stopAutoAttack();
    }
    this.emitCombat();
    return result;
  }

  /** Start the auto-attack loop (default 1 hit / 800ms). */
  startAutoAttack(intervalMs = 800): void {
    if (!this.agent || !this.dummy) return;
    if (!this.dummy.alive) resetCombatant(this.dummy);
    if (this.dummyContainer) this.dummyContainer.alpha = 1;
    this.drawHpBars();
    this.stopAutoAttack();
    this.autoAttacking = true;
    // Immediate feedback: first hit lands at once, then on interval.
    this.attackOnce();
    // If the first hit killed (tiny HP pool), don't schedule the loop.
    if (!this.dummy?.alive) {
      this.autoAttacking = false;
      this.emitCombat();
      return;
    }
    this.combatTimer = window.setInterval(() => {
      const r = this.attackOnce();
      if (!r) this.stopAutoAttack();
      // attackOnce already stops + emits on kill; keep flag in sync.
      if (!this.dummy?.alive) this.autoAttacking = false;
    }, intervalMs);
    this.emitCombat();
  }

  stopAutoAttack(): void {
    if (this.combatTimer !== null) {
      window.clearInterval(this.combatTimer);
      this.combatTimer = null;
    }
    if (this.autoAttacking) {
      this.autoAttacking = false;
      this.emitCombat();
    }
  }

  private spawnFloater(damage: number, killed: boolean): void {
    if (!this.combatLayer || !this.dummyTile) return;
    const p = this.tileToWorld(this.dummyTile.x, this.dummyTile.y);
    const text = new PIXI.Text(killed ? `${damage} ☠` : `-${damage}`, {
      fontFamily: 'monospace',
      fontSize: Math.max(12, this.config.tilePixelSize * 0.9),
      fill: killed ? '#ef4444' : '#fbbf24',
      stroke: '#000000',
      strokeThickness: 3,
    });
    text.anchor.set(0.5, 1);
    text.position.set(p.x, p.y - this.config.tilePixelSize * 1.3);
    this.combatLayer.addChild(text);
    this.floaters.push({ obj: text, life: 1.0 });
  }

  private updateFloaters = (delta: number): void => {
    if (this.floaters.length === 0) return;
    const dt = delta / 60;
    for (let i = this.floaters.length - 1; i >= 0; i--) {
      const f = this.floaters[i];
      f.life -= dt * 0.9;
      f.obj.position.y -= dt * 28;
      f.obj.alpha = Math.max(0, Math.min(1, f.life * 1.5));
      if (f.life <= 0) {
        this.combatLayer?.removeChild(f.obj);
        f.obj.destroy();
        this.floaters.splice(i, 1);
      }
    }
  };
}
