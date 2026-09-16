import * as PIXI from 'pixi.js';
import type { ControllerKind } from './actor';

/**
 * SVG source-of-truth for entity sprites.
 *
 * - Author as SVG in `public/assets/...` (crisp at any zoom, git-friendly).
 * - Pixi rasterizes the SVG into a texture at load; game code only deals
 *   with `PIXI.Sprite` sized in world pixels.
 * - Keep the art top-down on a 32x32 grid so 1 sprite ~= 2 tiles at the
 *   default `tilePixelSize: 16` (or scale 0.5x for strict 1-tile tokens).
 */

export const DRIFTER_ASSET_URL: Record<ControllerKind, string> = {
  player: '/assets/drifter/drifter-player.svg',
  agent: '/assets/drifter/drifter-agent.svg',
  bot: '/assets/drifter/drifter-bot.svg',
};

/** Raster size: SVG is 32x32 — render at 2x so zoom-ins stay crisp. */
const DRIFTER_RASTER_SCALE = 2;

/**
 * Load (or reuse from cache) the drifter texture for a controller kind.
 * Safe to call repeatedly — `Texture.from` returns the cached texture
 * when the URL was already loaded.
 */
export function getDrifterTexture(variant: ControllerKind): PIXI.Texture {
  const url = DRIFTER_ASSET_URL[variant];
  const tex = PIXI.Texture.from(url);
  // Hint the rasterizer: baseTexture resolution bumps effective pixels.
  // (No-op once cached — kept here so first-load quality is deterministic.)
  if (
    tex.baseTexture &&
    (tex.baseTexture.width < 32 * DRIFTER_RASTER_SCALE ||
      tex.baseTexture.width === 1)
  ) {
    tex.baseTexture.setResolution?.(DRIFTER_RASTER_SCALE);
  }
  return tex;
}

/**
 * Create a Pixi sprite for a drifter body.
 *
 * @param tilePixelSize world px per tile (from GameConfig) — sprite is
 * sized to ~1.2 tiles so it reads at min zoom without covering corridors.
 * @param facing radians, 0 = north (art faces up, so no offset needed).
 */
export function createDrifterSprite(
  variant: ControllerKind,
  tilePixelSize = 16,
  facing = 0,
): PIXI.Sprite {
  const sprite = new PIXI.Sprite(getDrifterTexture(variant));
  sprite.anchor.set(0.5, 0.55);
  const size = tilePixelSize * 1.2;
  sprite.width = size;
  sprite.height = size;
  sprite.rotation = facing;
  return sprite;
}
