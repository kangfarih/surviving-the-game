// Minimal combat sim for agent-vs-dummy testing (P0, basic attack only).
//
// Pure logic — no Pixi here so the numbers stay testable headless.
// Rendering (sprites, HP bars, floating damage) lives in `engine.ts`.
// Skill system (Fire Bolt etc.) will build on top of `AttackResult`.

export type CombatantKind = 'drifter' | 'dummy';

export interface Combatant {
  id: string;
  label: string;
  kind: CombatantKind;
  hp: number;
  maxHp: number;
  /** Inclusive basic-attack damage range. */
  atkMin: number;
  atkMax: number;
  alive: boolean;
}

export interface AttackResult {
  tick: number;
  attackerId: string;
  targetId: string;
  damage: number;
  remainingHp: number;
  killed: boolean;
}

export interface CombatSnapshot {
  agent: Combatant | null;
  dummy: Combatant | null;
  autoAttacking: boolean;
  tick: number;
  lastHit: AttackResult | null;
  log: AttackResult[];
}

export const BASIC_ATTACK_DEFAULT = { atkMin: 8, atkMax: 12 } as const;
export const DUMMY_DEFAULT_HP = 100;
export const AGENT_DEFAULT_HP = 100;

export function createAgentDrifter(
  id = 'agent-1',
  hp = AGENT_DEFAULT_HP,
): Combatant {
  return {
    id,
    label: 'Agent Drifter',
    kind: 'drifter',
    hp,
    maxHp: hp,
    atkMin: BASIC_ATTACK_DEFAULT.atkMin,
    atkMax: BASIC_ATTACK_DEFAULT.atkMax,
    alive: true,
  };
}

export function createDummy(id = 'dummy-1', hp = DUMMY_DEFAULT_HP): Combatant {
  return {
    id,
    label: 'Training Dummy',
    kind: 'dummy',
    hp,
    maxHp: hp,
    atkMin: 0,
    atkMax: 0,
    alive: true,
  };
}

/** Roll one basic attack. Pass a custom rng for deterministic tests. */
export function rollBasicAttack(
  attacker: Combatant,
  target: Combatant,
  tick: number,
  rng: () => number = Math.random,
): AttackResult {
  const span = attacker.atkMax - attacker.atkMin + 1;
  const damage = attacker.atkMin + Math.floor(rng() * span);
  const remainingHp = Math.max(0, target.hp - damage);
  return {
    tick,
    attackerId: attacker.id,
    targetId: target.id,
    damage,
    remainingHp,
    killed: remainingHp <= 0,
  };
}

/** Apply an AttackResult to the target in place; returns the target. */
export function applyAttack(
  target: Combatant,
  result: AttackResult,
): Combatant {
  target.hp = result.remainingHp;
  if (result.killed) {
    target.alive = false;
  }
  return target;
}

export function resetCombatant(c: Combatant): Combatant {
  c.hp = c.maxHp;
  c.alive = true;
  return c;
}
