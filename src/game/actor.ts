// Canonical terminology for who-is-who in Surviving the Game.
//
// - Player  = human only. Watches, tweaks configs, designs skills via JSON,
//             and can pilot their own drifter directly.
//             (2 syllables: play-er)
// - Drifter = in-world body teleported in to survive. The character with
//             HP/stamina/hunger, skills, position. (2 syllables: drift-er)
// - Agent   = outer LLM-driven mind that pilots a Drifter.
// - Bot     = outer scripted/heuristic mind that pilots a Drifter
//             (baseline, e.g. random-walk, greedy). Same interface as Agent,
//             dumber inside.
// - Actor   = any simulated entity in code (Drifter + natives/mobs).
// - Native  = world-born denizen (mob/NPC). Never teleported in.
//
// Mind vs body split: the controller (player clicks, agent scores, bot
// rules) decides; the Drifter is the body that acts. One Drifter has exactly
// one controller at a time:
//
//   Player (human, plays or watches) ─┐
//   Agent (LLM mind, pilots) ──────────┼─> Drifter (body, acts)
//   Bot (script mind, pilots) ─────────┘
//
// Naming rules:
// - Code: `Drifter`, `DrifterId`, `ControllerKind = 'player' | 'agent' | 'bot'`.
// - Never name a Drifter variable `player`. `player` is reserved for humans.
// - Docs: say "drifter survives / dies / drafts", not "player survives".
// - Telemetry/logs: tag rows with `controller: 'player' | 'agent' | 'bot'`
//   so human runs, LLM runs, and scripted baselines stay comparable.

export type ControllerKind = "player" | "agent" | "bot";

export type ActorKind = "drifter" | "native";

export interface Controller {
  kind: ControllerKind;
  /** Model name for agents (e.g. 'muse-spark'), policy name for bots (e.g. 'random-walk'). */
  name: string;
}

/** In-world teleported body. Has stats/position/skills; driven by one controller. */
export interface Drifter {
  id: string;
  kind: "drifter";
  controller: Controller;
}

/** World-born entity (mob, NPC, boss). No outer AI controller. */
export interface Native {
  id: string;
  kind: "native";
}

/** Any simulated entity. */
export type Actor = Drifter | Native;

export function isDrifter(a: Actor): a is Drifter {
  return a.kind === "drifter";
}

export function describeController(c: Controller): string {
  return `${c.kind}:${c.name}`;
}
