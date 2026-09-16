# Surviving the Game — Agent Survival Simulator

> An agent or bot pilots a drifter teleported into a brutal barbarian survival-fantasy world and tries to survive.

Inspired by **_Surviving the Game as a Barbarian_**, this project is a simulator for watching autonomous agents spawn into a game world — with no cheats, no meta knowledge — and struggle to stay alive. Explore procedurally generated dungeons, stumble into the city, fight, loot, die, retry.

The core idea is simple: **teleport an agent in, give it the same rules as everyone else, see how long it lasts.**

## Current Status

Playable world viewer (no combat yet):

- Procedural `TileMap` generation: N dungeons × sequential rooms + corridors, optional city with buildings, start / boss rooms
- PixiJS 7 canvas renderer: pan (drag), zoom (wheel / double-click), centered + resize-aware
- Config panel for live world tuning: map size, tile size, city, dungeons, rooms, corridors
- Classless stats / skills / combat design docs under `docs/` (brainstorm, not implemented)

## Vision

1. **Teleport in.** A drifter spawns in the start room with a random or drafted kit.
2. **Survive.** Same HP / stamina / hunger / combat rules as natives. No minimap hacks.
3. **Observe.** Watch runs as a spectator: exploration paths, encounters, TTK, death causes.
4. **Evolve.** Draft / Free Pick / Wildcard skill acquisition per run, telemetry-driven balance, thousands of build feels via augments.

> Terminology: **Player** = human only (you, watching). **Drifter** = in-world
> body that survives/dies (2 syllables, teleported in). **Agent** = LLM mind
> piloting a drifter; **Bot** = scripted mind piloting a drifter (baseline).
> Never call a drifter a player. See `src/game/actor.ts` (canonical).

See:

- `docs/classless-brainstorm.md` — classless stats, skill anatomy, acquisition modes, roadmap M1–M4
- `docs/skill-tag-taxonomy.md` — tags, targeters, costs, flags/stances
- `docs/thousands-skills-plan.md` — how 80 bases × augments = 1000s of feels

## Tech Stack

- Next.js 16 + React 19 + TypeScript (strict)
- PixiJS 7 for tilemap rendering
- Tailwind CSS 4
- Client-only, static-export friendly. Skills will be JSON-importable (`resolveJsonModule`).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5200](http://localhost:5200).

```bash
npm run build
npm run start
npm run lint
```

## Controls

- **Drag** — pan camera
- **Wheel / double-click** — zoom (0.5×–3×)
- **Top menu → Generate** — regenerate world with current config
- **Top menu → Config** — open world-gen panel

## World-Gen Config (`src/game/types.ts`)

| Key | Default | Meaning |
|---|---|---|
| `mapWidth / mapHeight` | 100 × 80 | world size in tiles |
| `tilePixelSize` | 16 | px per tile |
| `includeCity / citySize` | true / 20 | safe-zone city block |
| `dungeonCount` | 3 | separate dungeon regions |
| `roomsPerDungeon` | 5 | rooms per dungeon |
| `minRoomSize / maxRoomSize` | 5 / 10 | room footprint in tiles |
| `corridorWidth` | 2 | corridor thickness in tiles |

## Project Structure

```
src/
  app/page.tsx              # Home: TopMenu + GameCanvas + ConfigPanel wiring
  components/
    GameCanvas.tsx          # Pixi canvas mount + engine lifecycle
    TopMenu.tsx             # Generate / Config actions
    ConfigPanel.tsx         # World-gen sliders / toggles
  game/
    types.ts                # GameConfig, TileMap, Room, Dungeon, TileType
    engine.ts               # Pixi GameEngine: draw, pan/zoom, regenerate
    dungeon/generator.ts    # Seeded procedural map generation
docs/                       # Design docs (classless system, tags, scaling plan)
```

## Roadmap

- [x] M0 — procedural world + viewer
- [ ] M1 — stats + 50 skills, playable combat, agent spawns and dies
- [ ] M2 — augments (1 Legendary + 3 Epic + stackable Rare), combo flags, 1 stance
- [ ] M3 — Draft / Wildcard run modes, 8 archetype starters, camp UI
- [ ] M4 — telemetry (pick rate, win rate, TTK, death causes), 2000+ build feels

## Contributing

This is an experiment in agent survivability, not a balanced game yet. Ideas welcome — especially:

- What should the agent *see*? (vision radius, memory, intents)
- What kills runs fastest? (difficulty curves, resource taxes)
- What makes a death *interesting* to watch?
