# Skill Tag Taxonomy + Resources + Augment Slots

> Companion to `./classless-brainstorm.md`. This file is the **concrete, enforceable** reference: tag whitelists, 5 targeters, resource models, slot rules, example SkillDef JSON + TS.
> It is **canonical** for `Cost`, `SkillDef`, `Targeter`, and tag whitelists — `./classless-brainstorm.md` §4 mirrors it.
> Inspirations: ToS (targeting taxonomy, Attributes/Arts, Skill Factor) · RO (cards, stats/traits) · Ascension (ME tiers/slots) · CoA (resource fantasies).

## 1. Tag Whitelists (validator-enforced)

Every skill: **3–6 tags**, at least 1 element + 1 delivery + 1 role. Validator rejects unknown tags.

### ELEMENT (pick 1–2)
`fire | frost | storm | shadow | holy | nature | blood | poison | arcane | physical`

### DELIVERY (pick 1)
`projectile | melee | nova | aura | ground | channel | instant | trap | minion | shout`

### RANGE (pick 1)
`self | close | short | long`

### ROLE (pick 1–2)
`burst | sustain | dot | control | mobility | summon | support | combo | defense`

### WEAPON (pick 1, `any` = no lock)
`blade | bow | staff | unarmed | shield | explosive | any`

### MODE (optional, 0–2 — powers draft/AI filtering)
`burn | bleed | freeze | shock | fear | charm | knockback | pull | root |
lifesteal | execute | opener | followup | breaker | stance | autocast`

Example tag sets:
- Fireball: `[fire, projectile, long, burst]`
- Shield Slam: `[physical, melee, close, burst, opener]`
- Healing Aura: `[holy, aura, self, sustain, support]`
- Venom Trap: `[poison, trap, short, dot, control]`

## 2. The 5 Targeters (from ToS)

Borrowed 1:1 from ToS because they cover everything playtested in that lineage:

| # | Targeter | Shape params | UX | Examples |
|---|---|---|---|---|
| 1 | **Self / Aura** | `radius?, duration?, ticks?` | instant cast, ring VFX | buffs, stances, heals, auras |
| 2 | **Surroundings** | `radius` | PBAoE nova around caster | novas, shouts, thorns |
| 3 | **Unit + splash** | `range, splash?` | click/tab-target, small AoE on hit | bolts, executes, hexes |
| 4 | **Direction + bounce** | `width, length, bounce?` | aim cone/line, chains | cleaves, lightning, piercing arrows |
| 5 | **Ground circle** | `radius, duration?` | place decal, DoT/zone | meteors, traps, walls, heals |

```ts
type Targeter =
  | { kind: 'self'; radius?: number; duration?: number; ticks?: number }
  | { kind: 'surroundings'; radius: number }
  | { kind: 'unit'; range: number; splash?: number }
  | { kind: 'direction'; width: number; length: number; bounce?: number }
  | { kind: 'ground'; radius: number; duration?: number };
```

Rule: exactly one targeter per active. Passives/augments have none.

## 3. Resource Models (from CoA — pick per-kit, max 1 special + HP + Mana)

> Note: sampled from CoA's 21 classes, not exhaustive.

CoA's 21 classes are basically a menu of resource fantasies. Steal the mechanics, drop the class lock:

| Resource | Source class | Mechanic | Adapted rule |
|---|---|---|---|
| Life Force | Necromancer | minion fuel | spend HP-or-corpses to summon; minions leech back |
| Insanity | Cultist | death risk | power scales with stacks; at 100 → damage yourself + big burst, then reset |
| Solar stacks | Sun Cleric | builder/spender | builders +1 Solar, spenders consume all, +10%/stack |
| Rounds | Tinker | loaded shots | store up to N charges out of combat; spend in combat, reload via channel |
| Attunement + runes | Runemaster | 8s setup | channel 8s (or 4 w/ augment) → gain 4 rune charges, each empowers next cast |
| Rage | Barbarian | Unbridled Rage | gain on hit/taken; spend on breakers; ale consumable +Rage +vuln |
| Static | Stormbringer | 0–100 meter | generators +Static, spenders dump; over 80 = +crit, −defense |
| Felfury / Demon | Felsworn | transform meter | at full → demon form 10s (stance swap) |
| Combo chain | Templar | Opener→Followup→Breaker | flags, not a bar (see §5) |
| Quiver / Falcons | Ranger | ammo + pet | ammo count + falcon cooldown as paired resource |
| Deathfire / Steed | Knight of Xoroth | mount + meter | mounted = +move, −turn; Deathfire spender |
| Potion mix | Witch Doctor | mid-combat craft | 3 herbs → 1 potion in combat via 2s channel |
| HP-as-resource | Reaper | — | skills cost HP directly; lifesteal closes loop |
| Order / Chaos + Past Self | Chronomancer | dual + echo | casts tilt Order/Chaos; Past Self replays last 3s of casts |

Kit rule: an actor tracks **HP + Mana + ≤1 special**. Draft offers weight toward the special you already use (synergy bias) but never hard-lock.

## 4. Cost / Cooldown Models

```ts
interface Cost {
  hp?: number; mana?: number;
  special?: { resource: string; amount: number }; // e.g. { resource: 'static', amount: 30 }
  cooldown: number;          // seconds, flat
  charges?: number;          // ToS Overheat = charges; canonical name is charges
}
```

- **Cooldown** for rotational gates; **charges (ToS Overheat)** for burst windows (Fireball 3 charges × 8s recharge feels better than 8s CD).
- **HP costs** (Reaper) bypass mana; always show red cost text.
- M1: cooldown + mana only. M2: add charges. M3: specials.

## 5. Combo / Stance Flags (canonical fields — see `./classless-brainstorm.md` §7 for loop)

```ts
setsFlag?: string;       // 'off-balance' (+ duration below)
setsFlagDuration?: number; // seconds, 3-6 typical
requiresFlag?: string;   // consumed on cast unless `consumeFlag: false`
consumeFlag?: boolean;   // default true
stance?: string | null;         // 'wolf' | 'demon' | 'attuned' | null
```

Templar chain: `Shield Slam [sets off-balance 4s]` → `Riposte [requires off-balance, sets exposed 4s]` → `Execute [requires exposed, factor ×2 vs <30% HP]`.

- Stance-dance has 1s lockout; exactly 1 stance active. UI: combo pips above hotbar, stance icon glows (see brainstorm §7).

## 6. Augment Slot Rules (Ascension-style, tuned down for M2)

- **Loadout slots: 1 Legendary + 3 Epic + 20 Rare-points.** Per *loadout*, not per skill — moving a Leg costs dust.
- **Eligibility:** augment declares `allowTags` / `denyTags` / `allowTargeter`. E.g. `Bounce+2` requires `projectile` or `direction`, denies `aura`.
- **Stacking:** Legendary non-stackable; Epic same-id non-stackable; Rare stackable to 5.
- **Flips > numbers:** every Legendary must change *at least one* of {targeter, resource, hits→zone, cost type}. Pure +40% Legs banned by review checklist.
- **Cards (gear-bound augments, RO homage):** gear has 0–2 slots; card JSON reuses augment shape + `slot: 'weapon'|'armor'`, plus `enableSkill?` and `autocast?` (`{skill, chance, icd}` — chance ≤5%, ICD ≥10s).

## 7. Example SkillDef — TS + JSON

```ts
interface Scaling { stat: string; ratio: number; }
interface SkillDef {
  id: string; name: string; icon: string;
  tags: string[]; targeter: Targeter; cost: Cost;
  factor: number; hits: number; scaling: Scaling[];
  setsFlag?: string; setsFlagDuration?: number;
  requiresFlag?: string; consumeFlag?: boolean;
  stance?: string | null;
  allowedAugments: string[]; // ids; validator checks augment eligibility
  vfx: string; desc: string;
}
interface AugmentDef {
  id: string; tier: 'legendary' | 'epic' | 'rare';
  allowTags?: string[]; denyTags?: string[];
  allowTargeter?: Targeter['kind'][];
  mods: Record<string, number | string>; // e.g. { bounce: 2, factorMult: 0.7 }
  flip?: string; // human-readable mechanic change
  desc: string;
}
```

```json
{
  "id": "fireball_01",
  "name": "Fireball",
  "icon": "fireball",
  "tags": ["fire", "projectile", "long", "burst"],
  "targeter": { "kind": "unit", "range": 9, "splash": 1.5 },
  "cost": { "mana": 12, "cooldown": 4, "charges": 3 },
  "factor": 150,
  "hits": 1,
  "scaling": [{ "stat": "INT", "ratio": 0.8 }],
  "allowedAugments": ["meteorfall_leg", "bounce_epic", "charges_epic", "ember_rare"],
  "vfx": "proj_fire_01",
  "desc": "Hurl flame for {factor}% INT. {charges} charges."
}
```

```json
{
  "id": "meteorfall_leg",
  "tier": "legendary",
  "allowTags": ["fire"],
  "denyTags": ["aura"],
  "mods": { "targeterKind": "ground", "factorMult": 0.7, "hits": 4 },
  "flip": "Fireball becomes a ground-targeted meteor: 4 hits over a burn zone.",
  "desc": "METEORFALL: Fireball becomes ground-targeted meteor + burn zone."
}
```

```json
{
  "id": "lifesteal_card_03",
  "tier": "epic",
  "slot": "weapon",
  "allowTags": ["blood", "melee"],
  "mods": { "lifesteal": 0.12 },
  "autocast": { "skill": "drain_01", "chance": 0.03, "icd": 12 },
  "desc": "+12% lifesteal on blood/melee. 3% to cast Drain on hit (12s ICD)."
}
```

## 8. Validation Checklist (for `pnpm validate`, M2+)

- [ ] 3–6 tags, all in whitelist; ≥1 element + delivery + role.
- [ ] Exactly 1 targeter with positive numbers.
- [ ] `factor` within band for (hits × AoE × CD) — see factor formula in `./thousands-skills-plan.md`.
- [ ] `scaling` ratios sum ≤ 1.2; stat names in stat registry.
- [ ] Flags referenced exist (`requiresFlag` must match some `setsFlag`).
- [ ] Augment eligibility cross-check both directions.
- [ ] `vfx` key exists in Pixi pool manifest.
- [ ] Desc tokens (`{factor}`, `{charges}`) all resolve.
