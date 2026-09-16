# Classless Stats / Skills / Combat — Brainstorm Vision

> Status: brainstorm (greenfield). No code yet — `src/` is only map-gen + Pixi renderer.
> Goal: classless system supporting **THOUSANDS of skills** on a client-only Next.js 16 + React 19 + PixiJS 7 + TS strict stack.
> `resolveJsonModule=true`, so JSON skill DBs can be imported directly.

## Inspirations

- **Tree of Savior (ToS / Re:Build):** 4→5 base trees, rank picks (1 base + 3 picks), ~80 classes × 5+ skills each, 15 pts/class, Overheat charges, Attributes/Arts (+0.5%/lvl, +1.25% enhance, mechanic flips), Skill Factor balancing formula, 5-way targeting taxonomy, combo prereqs.
- **Ragnarok Online (RO):** Job tree Novice→1st→2-1/2-2→Trans→3rd→4th, Job Levels = skill points, 6 stats (STR/AGI/VIT/INT/DEX/LUK) + 6 Traits (POW/STA/WIS/SPL/CON/CRT), slotted-gear cards as proto-augments (race/size/element %, skill-enable, autocast). Same job diverges by stats + cards.
- **Project Ascension (classless WoW):** Free Pick (Ability + Talent Essence per level, no armor/weapon lock, cheap respec, Spec profiles), Draft (1-of-3 every 2 lvls from 10, rarity, synergy pity, reroll), Wildcard (fully random, lock starters), 266 abilities + 195 talents + 2000–3000 Mystic Enchants (1 Legendary build-defining + 3 Epic + stackable Rare), Random Enchants + Worldforged affixes, balance via slot economy + cost curve + content difficulty, builder + Archetype starters.
- **Conquest of Azeroth (CoA, 21 custom classes, July 2026):** Necromancer, Pyromancer, Cultist (Insanity = death risk), Starcaller, Sun Cleric (Solar stacks), Tinker (Rounds, 759 spells — largest), Runemaster (8s Attunement + 4 runes), Primalist, Reaper (HP-as-resource), Venomancer (forms), Chronomancer (Order/Chaos + Past Self), Son of Arugal/Bloodmage (human↔wolf), Guardian (Support role), Stormbringer (100 Static), Felsworn (Felfury + Demon), Barbarian (Unbridled Rage + ale), Witch Doctor (mid-combat potion mix), Witch Hunter, Knight of Xoroth (steed + Deathfire), Templar (Opener→Followup→Breaker), Ranger (Quiver + falcons). Each 153–208 talent nodes, 412–759 spells (~3× vanilla). Dual trees (Class + Spec), Lv10 spec / Lv30 essences.
- **General pattern distilled:** `SkillDef { id, tags, targeter, cost, factor, scaling, flags/stance, allowedAugments }`, 3–6 tags per skill, **augments > skills** (50 base × 190 augments = 10k feels), fusion/combos/stances via windows + flags, procedural *acquisition* not *definition*, economy + caps for balance, cheap respec + loadouts.

---

## 1. Design Pillars

1. **Classless identity via combination, not selection.** No class picker. A "Necromancer" is just what other players call your Life-Force + minion + shadow build. (Ascension Free Pick; RO same-job-diverges.)
2. **Augments > skills.** Author dozens of bases, ship thousands of feels. A Fireball with bounce / channel / HP-cost / ground-zone is 4 different skills emotionally. (Ascension MEs; ToS Attributes/Arts.)
3. **Procedural acquisition, hand-authored definition.** Every SkillDef is curated; *which* 6–12 the player ends up with is drafted / rolled / fused. (Ascension Draft/Wildcard.)
4. **Economy is balance.** Slots, points, charges, and costs do the balancing work that nerf-patches would do. Power budget is conserved, not whack-a-moled. (Ascension slot economy; ToS Skill Factor.)
5. **Cheap respec, expensive identity.** Respec costs ~a run or two of gold. Loadouts + Archetypes make experimentation safe. Legendaries / locked Wildcard starters make a *run* feel committed. (Ascension Spec profiles + Archetypes.)
6. **Data-driven, no-deploy content.** Skills/augments/tags live in JSON + formulas. Designers (or a script) add rows; client hot-loads them. (See §9.)
7. **Combat readable at 60fps with 20+ actors.** 5 targeters only, 1 resource bar per actor + floating numbers + telegraphs. Pixi renders; React overlays UI. Fancy per-skill VFX is M4, not M1.

Non-pillars (explicitly out): PvP ranking, server-authoritative sim, full talent trees per class (we do shared tag-trees instead).

---

## 2. Stat System Proposal (classless)

### 2a. Primaries — 6 + traits (RO-like, renamed to fit survival-fantasy)

| Stat | Governs (draft) | Notes |
|---|---|---|
| STR (Might) | melee factor, carry, HP | diminishing per-point after soft caps |
| AGI | attack speed, dodge, move | the "feel" stat |
| VIT (Endurance) | HP, regen, status resist | tank tax |
| INT (Mind) | magic factor, max mana-ish | |
| DEX | accuracy/crit, cast speed, trap/disarm | |
| LUK | crit/crit-dmg, drop luck, reroll luck? | keep small but spicy |
| — | CRT (Fate) | kept as **trait**, not primary (see below) |

> SPL lives trait-only (see §2b) — no SPL primary row, to avoid duplicate definition.

Why 6 primaries + traits instead of 3: with classless + draft, stats are the only persistent identity across respecs. RO proves 6 stats can carry hundreds of builds when cards/gear diverge on top.

### 2b. Traits (2nd layer, unlock ~Lv20, RO Traits homage)

POW / STA / WIS / SPL / CON / CRT — pick 2 to invest. Traits multiply, primaries add. Example: POW × melee factor, CON × HP scaling, CRT × crit curve. Traits gate augments (e.g. Legendary "Blood Mage" requires CON 30).

### 2c. Curves (anti-dump-stat math)

- Primaries: `effective = base * (1 - exp(-points/k))`-style soft cap + hard diminishing: each point past 40/80/120 worth 1.0 / 0.6 / 0.3.
- HP/Mana: `HP = 50 + VIT*8*(1+VIT/200) + CON*12` (CON is a trait), Mana/CDR similar from INT/WIS (WIS is a trait).
- Crit: `crit% = 5 + DEX*0.15 + CRT*0.4` (CRT is a trait), capped 60%; critDmg `150% + LUK*0.5%`, capped 300%. SPL (trait-only) multiplies skill scaling, it is not a primary.
- All formulas live in one `formulas.ts` + JSON tunables so telemetry can retune without code.

### 2d. Level economy

- Max Lv 50 (M1–M2), 1 stat pt + 1 skill pt per level (RO Job Level homage). Trait pts from 20, 1 per 5 lvls.
- Death: drop essence dust (respec currency), not stats. Keep it roguelite-light, not punishing.

**Open stat questions:** 6 primaries — keep as-is, or merge further (e.g. DEX→AGI)? SPL lives trait-only (see §2b). Do traits unlock or start at 1? Does LUK affect Draft rarity (fun!) or is that too snowbally?

---

## 3. Skill Acquisition Modes (adapted from Ascension)

All three share the same SkillDef DB. They differ only in *offer logic*. Player picks one per run/season at character creation.

| Mode | Loop | For who |
|---|---|---|
| **Free Pick** | Each level: +1 Ability Essence + 1 Talent Essence. Spend from full shop, filtered by tags you own (synergy bias, not hard lock). Respec ~free. Save Spec profiles (loadouts). | builders, testers, M1 default |
| **Draft** | Every 2 lvls from 10: pick **1-of-3**. Rarity weights (Common 60 / Rare 28 / Epic 10 / Legendary 2 — canonical here, consumed by `./thousands-skills-plan.md` §3), synergy pity (if 0 tags overlap last 3 picks, force ≥1 overlap), 1 reroll per draft via Hands-of-Fate token. | roguelite runs, streamers, M3 |
| **Wildcard** | Fully random kit at Lv1 + per-5-lvls bonus roll. Can **lock** up to 2 starters. Chaos slider (Pure → Weighted-by-tags). | chaos players, daily runs, M3 |

Archetype starters (Ascension homage): ~8 one-click templates ("Plague Doctor", "Static Witch", "Ale Barb") that pre-spend first 10 points. They are *presets over Free Pick*, not classes — fully editable after.

Essence idea (keep or cut?): Ability Essence buys actives, Talent Essence buys passives/augments. Prevents all-active piles. M1 can start with single currency and split later.

---

## 4. Skill Anatomy — `SkillDef` Schema Sketch (TS)

```ts
// canonical defs live in ./skill-tag-taxonomy.md — mirrors it here; do not diverge.
type Targeter =
  | { kind: 'self'; radius?: number; duration?: number; ticks?: number } // buffs, auras, stances, heals (NOT shouts — shouts are 'surroundings')
  | { kind: 'surroundings'; radius: number } // novas, shouts
  | { kind: 'unit'; range: number; splash?: number } // bolts + splash
  | { kind: 'direction'; width: number; length: number; bounce?: number }
  | { kind: 'ground'; radius: number; duration?: number }; // circles, walls

interface Cost {
  hp?: number; mana?: number;
  special?: { resource: string; amount: number }; // e.g. { resource: 'static', amount: 30 }
  cooldown: number;          // seconds, flat
  charges?: number;          // ToS Overheat = charges; canonical name is charges
}

interface SkillDef {
  id: string;               // 'fireball_01'
  name: string;
  icon: string;
  tags: string[];           // 3-6: ['fire','projectile','long','burst']
  targeter: Targeter;
  cost: Cost;
  factor: number;           // % of scaling stat — ToS Skill Factor
  hits: number;             // multi-hit split
  scaling: { stat: string; ratio: number }[]; // [{stat:'INT',ratio:0.8}]
  setsFlag?: string; setsFlagDuration?: number;
  requiresFlag?: string; consumeFlag?: boolean;
  stance?: string | null;
  allowedAugments: string[]; // allowed augment ids
  vfx: string;              // key into Pixi pool, NOT inline code
  desc: string;             // template with {factor} tokens
}
```

Design rules: every active has exactly 1 targeter; every skill has 3–6 tags (enforced by validator); factor is *the* cross-skill power knob (see §8 / `./thousands-skills-plan.md`). `Cost.special`, `allowedAugments`, and `setsFlag`/`requiresFlag`/`consumeFlag`/`stance` are canonical names — see `./skill-tag-taxonomy.md` §§4–5, 7.

---

## 5. Tag Taxonomy (summary — full lists in `./skill-tag-taxonomy.md`, which is canonical)

- **Element:** fire / frost / shadow / nature / storm / holy / blood / arcane / physical / poison.
- **Delivery:** projectile / melee / nova / aura / ground / channel / instant / trap / minion / shout.
- **Range:** self / close / short / long.
- **Role:** burst / dot / control / sustain / mobility / summon / support / combo / defense.
- **Weapon:** blade / bow / staff / unarmed / shield / explosive / any.
- **Resource hook:** rage / static / insanity / lifeforce / rounds / combo / attunement / solar / fury…

Tags do triple duty: (a) draft synergy weight, (b) augment eligibility, (c) gear-card eligibility. A skill with tags `[storm, projectile, long, burst]` is offered to Storm drafters, accepts `Bounce` augment, and procs `Storm-caster` cards.

---

## 6. Augment Tiers (Ascension ME homage)

| Tier | Slots | Power | Example |
|---|---|---|---|
| Legendary | **1** | build-defining, mechanic flip | "Fireball becomes ground meteor, leaves burn zone; −30% factor" |
| Epic | **3** | strong modifier | "+2 bounce", "+1 charge (Overheat)", "cast-while-moving" |
| Rare | stackable | +X% / +N hits | "+8% factor", "+5% AoE" |

Slot economy (the balance): 1 Leg + 3 Epic per *loadout* (not per skill). Moving a Legendary between skills costs dust → forces commitment without respec pain. Rares stack but share a point pool (e.g. 20 Rare pts). ToS Arts are the model for "flip, not just +%".

Card-like gear (RO homage): weapons/armor have 0–2 slots; cards grant `+12% vs Undead`, `+10% fire`, `enable: Fireball Lv1`, `5% autocast Frost Nova on hit`. Cards are just augments bound to gear instead of skills — same JSON shape.

---

## 7. Combo / Stance System (fields canonical in `./skill-tag-taxonomy.md` §5)

- **Flags + windows, not script trees.** Skills use `setsFlag` / `setsFlagDuration` / `requiresFlag` / `consumeFlag` (default true) with a 3–6s window (Templar Opener→Followup→Breaker; Tinker Rounds).
- Example: `Shield Slam [opener]` sets `off-balance` 4s → `Riposte [followup, req off-balance]` consumes it, sets `exposed` → `Execute [breaker, req exposed]` ×2 factor.
- **Stances** (Venomancer forms / Bloodmage wolf / Runemaster Attunement, via `stance` field): exactly 1 active, swaps tag weights + resource + 2–3 skill swaps. Stance-dance has 1s lockout to prevent macro spam.
- UI: combo pips above hotbar, stance icon glows. Pixi draws telegraph; React draws pips.

---

## 8. Combat Loop Sketch

```
explore (dungeon gen exists) → encounter (3-8 mobs, telegraphed intents)
 → rotation (builder → spender → combo-breaker, 6-10s)
 → resolve (drops: dust, cards, draft token, potion mats)
 → camp (respec/loadout/craft) → delve deeper (difficulty ×1.15/depth)
```

- Tick: 10Hz logic, 60fps render. Cooldowns + charges (ToS Overheat) tick in logic; Pixi interpolates.
- TTK target: trash 4–8s, elite 20–30s, boss 90–150s at-level. Tune via factor + content difficulty, not per-skill nerfs (Ascension lesson).
- Resources: HP + Mana + **one** classless-kit resource (pick top 2–3 tags → e.g. Static / Rage / Insanity). No actor tracks >3 bars.
- Death: keep build, lose dust + current draft progress (Wildcard keeps locked starters).

---

## 9. Data-Driven Pipeline (row + formula, no deploy)

```
Google-Sheet/CSV or JSON in /data/skills/*.json
 → `pnpm validate` (zod schema + tag whitelist + factor check)
 → `pnpm build:db` (emits skills.json + augments.json + index by tag)
 → client imports JSON (resolveJsonModule) → registry + sim
```

- Formulas in `formulas.ts` with JSON tunables (`factorCurve`, `aoeTax`, `ccTax`).
- Balance without deploy = ship new JSON + tunables; client fetches `/data/*.json` at boot with bundled fallback. (Static export compatible.)
- M4: telemetry (pick rate, win rate, TTK) feeds auto-flag: `flag if pickRate>25% && winRate>60%`.

---

## 10. Content Scaling Math (how 80 bases × variants × augments = 1000s)

Authored: `B` base skills. Multiplied by variant axes (element × weapon × delivery), then by augments (Leg/Epic flips).

```
feels ≈ B × E × W × A_leg_choices
e.g. 80 × 3 (elements each base supports) × 2 (weapon styles) × 5 (Leg options)
     = 2,400 distinct-feeling builds from 80 authored actives
     + 100 stackable Rares × procedural rolls → 10k+ loadout permutations
```

We never author 2,400 rows — we author 80 + 30 Leg + 60 Epic + 100 Rare (= 190 augments) + 40 cards (M2; 80 total by M3) and let the matrix + draft produce the thousands (full method in `./thousands-skills-plan.md`).

---

## 11. Phased Roadmap

- **M1 — Stats + 50 skills (playable combat).** 6 primaries + traits + curves + formulas; 50 SkillDefs across 5 targeters × 6 elements; HP/Mana only; Free Pick only; 1 dungeon depth; search-less grid UI. Exit: kill boss with 3 distinct builds.
- **M2 — 300+ tags + augments.** Full tag taxonomy enforced; 1 Leg + 3 Epic + Rare pool (~190 augments: 30 Leg + 60 Epic + 100 Rare); card-like gear (1 slot each); combo flags + 1 stance; filter UI + loadouts. Exit: 300 feels via matrix.
- **M3 — Draft / Wildcard.** Offer engine (rarity + pity + reroll), Wildcard lock + chaos slider, 8 Archetypes, camp UI, potion-mix / ale-style mini-craft (1 system, not 3). Exit: full roguelite loop.
- **M4 — 1000s + telemetry.** Procedural variants + fusion recipes live; builder/simulator/ranking tooling; telemetry flags; VFX pool polish; difficulty scaling to depth 20. Exit: 2,000+ feels measurable.

---

## 12. Open Questions

1. Single currency (M1) vs split Ability/Talent Essence from day one?
2. charges (ToS Overheat — canonical name is `charges`) vs flat cooldowns — both, or pick one for M1?
3. Does LUK touch Draft rarity? Fun vs snowball.
4. Stances: general system in M2 or one-off per skill (Venomancer-form)?
5. Gear cards: drop-only or craftable? Autocast % — cap?
6. Telemetry: local-only counters in M4 or stub events now?
7. 6 primaries — SPL stays trait-only; merge anything else to cut new-player confusion?
8. Pixi authoritative positions vs logic-tick snapshot — who owns knockback?

*Next: concrete lists in `./skill-tag-taxonomy.md`; multiplication method in `./thousands-skills-plan.md`.*
