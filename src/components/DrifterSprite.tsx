'use client';

import React from 'react';
import type { ControllerKind } from '@/game/actor';

export const DRIFTER_TRIM: Record<ControllerKind, string> = {
  player: '#fbbf24',
  agent: '#22d3ee',
  bot: '#9ca3af',
};

interface DrifterSpriteProps {
  /** Who pilots this body — controls the trim ring + facing wedge color. */
  variant?: ControllerKind;
  /** Render size in px (square). */
  size?: number;
  /** Facing in degrees, 0 = north (up). Rotates the whole token. */
  facing?: number;
  className?: string;
  title?: string;
}

/**
 * Inline SVG drifter token for DOM UI (legends, spectator panel, tooltips).
 * Top-down 32x32 design — for the Pixi canvas use the precolored files in
 * `public/assets/drifter/` via `src/game/sprites.ts` instead.
 */
export function DrifterSprite({
  variant = 'agent',
  size = 32,
  facing = 0,
  className,
  title,
}: DrifterSpriteProps) {
  const trim = DRIFTER_TRIM[variant];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
      role="img"
      aria-label={title ?? `Drifter (${variant})`}
      className={className}
      style={facing ? { transform: `rotate(${facing}deg)` } : undefined}
    >
      <title>{title ?? `Drifter — ${variant}`}</title>
      <ellipse cx="16" cy="27.5" rx="9" ry="2.8" fill="#000000" opacity="0.42" />
      <circle cx="16" cy="16" r="12.5" fill="none" stroke={trim} strokeWidth="2" />
      <circle cx="16" cy="16.5" r="10" fill="#4b5568" stroke="#14171f" strokeWidth="2" />
      <path d="M8 22 L10 26 L12 22 Z" fill="#4b5568" stroke="#14171f" strokeWidth="1" strokeLinejoin="round" />
      <path d="M14 23 L16 27 L18 23 Z" fill="#4b5568" stroke="#14171f" strokeWidth="1" strokeLinejoin="round" />
      <path d="M20 22 L22 26 L24 22 Z" fill="#4b5568" stroke="#14171f" strokeWidth="1" strokeLinejoin="round" />
      <path d="M9 12 L23 21" stroke="#2a2118" strokeWidth="2" />
      <path d="M23 12 L9 21" stroke="#2a2118" strokeWidth="2" />
      <rect x="15" y="15" width="3" height="3" fill="#8a6b46" stroke="#14171f" strokeWidth="1" />
      <path d="M8 13 L11 10 L13 13 L10 15 Z" fill="#c9b896" stroke="#14171f" strokeWidth="1" strokeLinejoin="round" />
      <path d="M24 13 L21 10 L19 13 L22 15 Z" fill="#c9b896" stroke="#14171f" strokeWidth="1" strokeLinejoin="round" />
      <circle cx="16" cy="15" r="6" fill="#232838" stroke="#14171f" strokeWidth="1.5" />
      <circle cx="16" cy="15.5" r="3.2" fill="#e0a46c" />
      <rect x="13.9" y="13.2" width="1.5" height="1.5" fill="#1a120b" />
      <rect x="16.6" y="13.2" width="1.5" height="1.5" fill="#1a120b" />
      <path d="M9 12 A9 9 0 0 1 14 7.6" fill="none" stroke="#9aa3b5" strokeWidth="1.5" opacity="0.9" />
      <g transform="rotate(28 25.5 16)">
        <rect x="24" y="9" width="3" height="11" rx="1" fill="#8a6b46" stroke="#14171f" strokeWidth="1" />
        <rect x="24" y="12" width="3" height="1.4" fill="#2a2118" />
        <rect x="24" y="15" width="3" height="1.4" fill="#2a2118" />
      </g>
      <path d="M16 0.5 L20.5 8 L11.5 8 Z" fill={trim} stroke="#14171f" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}
