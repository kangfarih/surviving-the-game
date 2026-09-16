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

---

## 13. WoW-Classic-Style Combat Math (Brainstorm — Concrete Formulas, M1-ready)

> Status: **draft / tunable**. Philosophy = WoW Classic (dangerous mobs, slower swings, tactical pulling),
> translated to this classless sim — not a WoW clone. All knobs live in `code` below and belong in one
> JSON tunables file consumed by `formulas.ts` (see §2c). Connects to §2 (stats/curves) and §10 (factor budget).

### 13.1 Goals & TTK targets (reconciling with §8)

- §8 says trash 4–8s / elite 20–30s / boss 90–150s. That is ARPG-fast: fine for M1 smoke-test, wrong for
>   spectator-readable tactical combat with 3–8 mobs and telegraphed intents.
- **Proposal (M1-ready, slower):** trash **1v1 12–18s** (pack of 3 ≈ 30–45s with pulling), elite **30–60s**,
>   boss **90–150s unchanged**. Depth scaling stays `×1.15/depth` on mob HP/dmg (see §8 loop).
- Why slower: (1) a 15–30s kill is a *spectacle* — viewers read builder→spender→combo-breaker (§8);
>   (2) 1v2 must feel lethal, so 1v1 must take long enough that a second mob matters;
>   (3) downtime (eat/drink, §13.5) only matters if a fight costs real HP/mana.
- **Normative for M1:** `M1 normative TTK = §13 (12–18s trash 1v1, 30–60s elite, 90–150s boss)`; `§8 retained as
>   pre-classic reference only`. This §13 proposal **SUPERSEDES §8 trash 4–8s / elite 20–30s bands if playtest
>   passes**; M1 exit (§11: kill boss with 3 distinct builds) is judged against the §13 band (±10% tolerance).
- Migration path: M1 ships with §13-authored mob HP as baseline (`ttkScale = 1.0` means §13 values, not §8).
>   `classicScale = 2.2` is the documented HP ratio (§13 HP ≈ §8 HP × `2.2`, mob dmg × `0.8`) kept as a one-click
>   playtest preset / fallback knob: set `ttkScale ≈ 0.45` (≈1/2.2) to recover the §8 4–8s band without code
>   changes if playtest rejects slower TTK. Never apply both multipliers at once. Pick one band before M2.
- Rule of thumb: `DPS_target = MobHP / TTK_target`. All factor budgets (§10, `factor_base` formula) derive
>   backwards from this — do not buff skills, buff/nerf `MobHP` + `contentMult`.

### 13.2 One-roll attack table + level delta (draft)

- One `d100` roll per swing, evaluated top-to-bottom. First match wins (Classic order):
>   `miss > dodge > parry > glancing > block > crit > crushing > hit`.
- `levelDiff = defLevel - atkLevel`. Positive means defender is higher (harder to hit).
- Front-only: `parry` and `block` resolve only if attacker is in defender's front 180° arc; otherwise skipped.
- Miss: `miss% = clamp(missBase + missPerLevel * levelDiff - DEX_atk * dexHitPerPoint, 0, missCap)`
>   with `missBase = 5`, `missPerLevel = 2`, `dexHitPerPoint = 0.05`, `missCap = 20`.
>   Example: L5 vs L8 (`levelDiff = 3`): `5 + 6 - DEX10*0.05 (0.5) = 10.5%` miss before gear.
- Dodge: `dodge% = clamp(dodgeBase + AGI_def * agiDodgePerPoint + levelDiff * dodgePerLevel, 0, dodgeCap)`
>   with `dodgeBase = 5`, `agiDodgePerPoint = 0.10`, `dodgePerLevel = 0.5`, `dodgeCap = 25`.
>   Example: AGI 12 defender, even level: `5 + 1.2 = 6.2%`.
- Parry (front, melee only): `parry% = parryBase (5)` if defender wields melee weapon / has parry flag, else `0`.
>   Bosses + Barbarian-stance builds get `parryBonus = +3`. Cap `parryCap = 15`.
- Glancing (attacker lower level only): `glanceChance = clamp(glanceBase + glancePerLevel * levelDiff, 0, glanceCap)`
>   with `glanceBase = 10`, `glancePerLevel = 10`, `glanceCap = 40`. Damage × uniform(`glanceLow = 0.65`, `glanceHigh = 0.85`).
>   Even level: `0%`. Vs +3: `40%` — this alone is the "skull mob eats your DPS" tax.
- Block (front + shield only): `blockChance = blockBase (5) + CON_def * conBlockPerPoint (0.15)`, cap `blockCap = 25`.
>   Blocked hit takes flat `blockValue` off after armor (see §13.3), never below `1`.
>   Intentional trait extension: CON is an HP-scaling trait in §2c; its use here for block chance + `blockValue`
>   (§13.3) is a deliberate tank-trait extension, not a contradiction.
- Crit: reuse §2c curve — `crit% = min(5 + DEX*0.15 + CRT*0.4, critCap)` with `critCap = 60` — then apply
>   level suppression: `critEff = max(0, crit% - critSuppressPerLevel * levelDiff)` with `critSuppressPerLevel = 1.0`.
>   (Vs +3 you lose 3% crit: small but felt with slow swings.)
- Crushing (mob-vs-player only, `levelDiff >= 3` from the mob's view): `crushChance = 15`, damage `× crushMult = 1.5`.
>   Players never crush — keeps the power fantasy asymmetric: mobs are scary, you are clever.
- Remainder = clean `hit` for `100%` weapon/skill damage.

### 13.3 Damage & mitigation (draft)

- STR → Attack Power: `AP = STR * strToAP` with `strToAP = 2` (2:1, Classic homage). Trait POW multiplies (§2b):
>   `AP_eff = AP * (1 + POW * powPerPoint)` with `powPerPoint = 0.02`.
- AP → DPS: `dpsFromAP = AP_eff / apPerDPS` with `apPerDPS = 14` (14 AP = 1 DPS).
- Weapon normalization: `swingDamage = (weaponDPS + dpsFromAP) * swingTime`. Slow weapons hit harder per swing
>   but identical DPS naked — speed is feel + proc rate, not free damage.
- Skills reuse `factor` (§4, §10): `skillHit = swingDamage * (factor/100) * scalingMult`, split across `hits`.
>   `scalingMult` from INT/SPL curves in §2c; specials can crit (melee `2x`, spells `1.5x` — see below).
- Armor DR: `DR% = min(Armor / (Armor + armorK + armorPerLevel * atkLevel), drCap)`
>   with `armorK = 400`, `armorPerLevel = 85`, `drCap = 0.75` (75% cap).
>   Example: L5 attacker vs 100 armor: `100 / (100 + 400 + 425) = 10.8%` reduced.
>   Example: L5 attacker vs 400 armor (elite): `400 / (400 + 400 + 425) = 32.7%` reduced.
- Order of ops per landed hit: `raw → glance/crit mult → armor DR% → flat blockValue → max(1, round())`.
- Block value: `blockValue = 8 + CON_def * 1.5 + shieldTier * 6` (buckler `shieldTier = 1`, tower `3`).
- Crit damage (unified with §2c — §2c spell formula retained verbatim, extended here for melee):
>   spells/dots `mult_spell = 1.5 + LUK*0.005` (i.e. `150% + LUK*0.5%`, cap `critDmgCap = 300%`);
>   melee white + melee specials `mult_melee = 2.0 + LUK*0.005` (same cap). In words: melee crit = **2.0x BASE**,
>   then the §2c LUK bonus applies on top of the bonus portion. At LUK 0 both reduce to 1.5x / 2.0x, so all §13
>   TTK worked examples (assumed LUK 0, CRT 0) are unchanged and the §10 factor budget stays consistent.
- Diminishing (links §2c): STR past `40/80/120` worth `1.0/0.6/0.3` before AP conversion — dump-statting STR
>   still works, just with Classic-flavored falloff.

### 13.4 Swing timers & haste (draft)

- Base swing by weapon class (`swingBase`): dagger `1.8s`, sword/mace `2.5s`, axe/heavy `3.0s`,
>   barbarian two-hander `3.5s`. Ranged bow `2.8s`, staff melee `2.2s`. All in `weaponTable.json`.
- Swing haste (AGI only, per §2a): `swingEff = swingBase / (1 + hasteSwing%)`,
>   `hasteSwing% = min(AGI * agiHastePerPoint, hasteCap)` with `agiHastePerPoint = 0.003` (0.3%/pt),
>   `hasteCap = 0.30` (30%). AGI 20 → `6%` faster swings. AGI never speeds casts.
- Cast speed (DEX only, per §2a — fixes the DEX-vs-AGI split): `castEff = castBase / (1 + castHaste%)`,
>   `castHaste% = min(DEX * dexCastPerPoint, hasteCap)` with `dexCastPerPoint = 0.003` (0.3%/pt, shared cap).
>   DEX never speeds swings. Worked examples (§13.7) use nominal `swingTime` (AGI haste ≈2% omitted for readability).
- Parry-haste (Classic feel, anti-turtle): when you parry, your next swing's *remaining* time × `parryHasteMult = 0.6`
>   (40% off), once per `parryHasteLockout = 1.0s`. Mobs get it too — tanking a +3 mob with a fast dagger hurts.
- Specials reset the swing timer (Classic): instant melee specials deal their damage, then `swingTimer = swingEff`.
>   Do not use a special at `90%` of a 3.5s swing unless the combo flag (§7) is worth it — tactical choice.
- DoTs/traps tick on the 10Hz logic clock (§8), independent of swing timers.

### 13.5 Regen / downtime / survival taxes (draft)

- **Zero HP regen in combat.** `hpRegenInCombat = 0`. Bandages/potions/skills only. This is the whole game.
- Out of combat (no damage dealt/taken for `oocDelay = 5s`): `hpPerSec = maxHP * oocPctPerSec + VIT * vitOocPerPoint`
>   with `oocPctPerSec = 0.01` (1%/s), `vitOocPerPoint = 0.2` (HP/s per VIT). Example: 179 max HP, VIT 15
>   → `1.79 + 3.0 = 4.8 HP/s` → full heal `179/4.8 ≈ 37s` walking; while eating (+`eatPctPerSec = 0.03`
>   → `+5.4 HP/s` → `10.2 HP/s` total) → `179/10.2 ≈ 18s` sitting (not 12s — corrected).
- Mana 5-second rule: after any mana spend, `manaRegen = 0` for `manaRuleDelay = 5s`; then
>   `manaPerSec = maxMana * manaPctPerSec + INT * intManaPerPoint + WIS * wisManaPerPoint` with
>   `manaPctPerSec = 0.02` (fraction/s), `intManaPerPoint = 0.3`, `wisManaPerPoint = 0.5` (mana/s per point;
>   WIS is a trait per §2c — restores the INT/WIS split: INT sets max mana, WIS drives regen).
- Eat/drink (M1, sitting, broken by damage/move): food `eatPctPerSec = 0.03` (3% HP/s), water
>   `drinkPctPerSec = 0.05` (5% mana/s). Vendor food heals a full bar in ~30s; dungeon rations ~15s at 2× cost.
- Hunger/stamina hooks (M1 minimal, expand M3): `stamina` drains on sprint/dodge (`sprintCostPerSec = 4`,
>   `dodgeCost = 15`, max 100); at `0` you cannot sprint and swings × `exhaustedMult = 0.8`. Hunger is a slow
>   debuff only: unfed after `hungerGraceMin = 10` min → `oocPctPerSec` halved. No starvation death in M1.
- Camp (§8 loop) doubles all regen (`campRegenMult = 2.0`) — coming back to camp must feel like exhaling.

### 13.6 Pulling & threat (draft)

- Aggro radius: `aggroRadius = clamp(aggroBase + aggroPerLevel * (mobLevel - playerLevel), aggroMin, aggroMax)`
>   with `aggroBase = 20` (yards), `aggroPerLevel = 2`, `aggroMin = 10`, `aggroMax = 30`.
>   Crouch halves it (`stealthMult = 0.5`); running through adds `+4` (`moveNoiseBonus`).
- Social aggro: same-faction mobs within `socialRadius = 10` of the pulled mob also aggro. Undead/beasts
>   use `socialRadius = 14` (pack feel). Body-pull (touch) always aggros regardless of facing.
- Runners: mobs at `runnerHpPct = 0.15–0.20` (roll once per mob, `runnerChance = 0.5` of mobs) flee toward nearest
>   pack at `fleeSpeedMult = 1.1` shouting (applies social check at double radius). Snare/stun stops them.
- Leash: beyond `leashRadius = 40` from spawn, mob evades (`evadeFlag`, takes 90% reduced damage) and walks home,
>   then regens to full in `leashRegenSec = 3`. Players cannot cheese bosses off cliffs in M1.
- LOS: ranged/caster mobs require line-of-sight; breaking LOS for `losDropSec = 3` forces them to walk to you
>   (classic corner-pull). Melee mobs path straight (dungeon gen guarantees no stuck spots — verify in M1).
- Threat (1v1 barely matters, 2+ mobs everything matters): damage `threatPerDmg = 1.0`, healing
>   `threatPerHeal = 0.5`, buffs/taunts flat (`tauntThreat = 500`, `buffThreat = 50`). Tank stance × `tankThreatMult = 1.5`.
>   Heal-noise check each tick: healers sitting at full mana still pull runners if they overheal.

### 13.7 Worked examples (L5, draft numbers — verify in playtest)

- **Ex1 — L5 barb vs L5 gnoll, fair 1v1.** Barb: STR 18, AGI 8, VIT 15, DEX 10, CRT 0, LUK 0, POW 0
>   → `AP = 36`, `AP_eff = 36`, `dpsFromAP = 36/14 = 2.57`. Greataxe `weaponDPS = 8`, nominal `swingTime = 3.5s`
>   (AGI haste 2.4% omitted for readability) → `swing = (8+2.57)*3.5 = 37.0`.
>   Gnoll: 180 HP, 40 armor, assumed AGI 12, no shield/parry, even level → no glance/crush; `miss 4.5%`
>   (`5 − 10*0.05`), `dodge 6.2%` (`5 + 12*0.10`), player crit `5 + 10*0.15 + 0 = 6.5% ×2.0` (LUK 0).
>   Armor DR: `40/(40+400+425) = 4.6%` (×0.954) → avg landed ≈ `37*0.954*(1+0.065) ≈ 37.6`.
>   Connect ≈ `100 − 4.5 − 6.2 = 89.3%` → effective DPS ≈ `37.6*0.893/3.5 ≈ 9.6` → **TTK ≈ 180/9.6 ≈ 18.8s
>   (≈19s rounded; compliant at the top of the 12–18s band within M1 ±10% playtest tolerance)**. Gnoll deals
>   ~6 DPS back; barb takes ~110 over the fight from 179 HP → wins at ~40% HP, must eat after. Textbook Classic.
- **Ex2 — same barb vs L8 skull gnoll (+3, do not fight).** `levelDiff = 3`: miss `10.5%` (`5 + 6 − 0.5`),
>   glance `40% × 0.75` (midpoint of 0.65–0.85), crit suppressed `6.5 − 3*1.0 = 3.5%`, dodge `7.7%`
>   (same AGI-12 gnoll: `5 + 1.2 + 3*0.5`), armor heavier (say 120 → `120/(120+400+425) = 12.7%`, ×0.873).
>   Expected mult per swing = hit `38.3%×1.0` + glance `40%×0.75` + crit `3.5%×2.0` = `0.383 + 0.300 + 0.070 = 0.753`
>   → avg per swing ≈ `37*0.873*0.753 ≈ 24.3` at `≈82%` connect (`100 − 10.5 − 7.7`) → DPS ≈ `24.3/3.5 ≈ 6.9`
>   vs 320 HP → **TTK ≈ 46s** (not 49s — corrected). Meanwhile mob crushes: `9*(0.85 + 0.15*1.5) = 9*1.075 ≈ 9.7`
>   DPS taken (before player dodge/parry) → 179 HP lasts ≈18s (not 16s — corrected). **You run.** Working as intended.
- **Ex3 — 1v2 overpull death.** Two L5 gnolls, second joins at 50% of first's HP. Incoming doubles to ~12 DPS;
>   barb's kill order means 19s + 19s = 38s of exposure ≈ 450 damage vs 179 HP + one potion (`potionHeal = 80`).
>   Runner at `15–20%` fetches a third 30% of the time. **Lesson: pull with LOS, kill the runner first.**

### 13.8 Tunables table (everything a JSON config needs)

| name | default | meaning |
|---|---|---|
| `ttkScale` | `1.0` (mult, range 0.3–2.5) | master MobHP multiplier; 1.0 = §13-authored HP (12–18s band); ≈0.45 recovers §8 band |
| `classicScale` | `2.2` (mult) + mob-dmg `0.8` | historical §13/§8 HP ratio; playtest preset only — never stack with `ttkScale` |
| `missBase` / `missPerLevel` / `dexHitPerPoint` / `missCap` | `5` (%) / `2` (%/lvl) / `0.05` (%/pt) / `20` (%) | miss% curve vs `levelDiff` |
| `dodgeBase` / `agiDodgePerPoint` / `dodgePerLevel` / `dodgeCap` | `5` (%) / `0.10` (%/pt) / `0.5` (%/lvl) / `25` (%) | dodge% curve |
| `parryBase` / `parryCap` / `parryBonus` | `5` / `15` / `3` | front-only melee parry |
| `glanceBase` / `glancePerLevel` / `glanceCap` / `glanceLow` / `glanceHigh` | `10` / `10` / `40` / `0.65` / `0.85` | glancing tax vs higher mobs |
| `blockBase` / `conBlockPerPoint` / `blockCap` | `5` / `0.15` / `25` | shield block chance; value via `blockValue` formula |
| `critSuppressPerLevel` | `1.0` | crit% lost per attacker-under-level |
| `crushChance` / `crushMult` | `15` / `1.5` | mob-only crushing vs +3 |
| `strToAP` / `apPerDPS` / `powPerPoint` | `2` / `14` / `0.02` | STR→AP→DPS chain (+POW trait, §2b) |
| `armorK` / `armorPerLevel` / `drCap` | `400` / `85` / `0.75` | armor DR denominator + cap |
| `meleeCritMult` / `spellCritBase` / `lukCritPerPoint` / `critDmgCap` | `2.0` / `1.5` / `0.005` (mult/pt) / `300%` (mult cap) | melee 2.0 base + LUK bonus (unified §2c); spells 1.5 base + same LUK bonus |
| `swingBase` (per weapon) | `1.8–3.5` (s) | dagger→two-hander swing times |
| `agiHastePerPoint` / `dexCastPerPoint` / `hasteCap` | `0.003` / `0.003` (fraction/pt) / `0.30` (fraction cap) | AGI→swing haste only; DEX→cast speed only |
| `parryHasteMult` / `parryHasteLockout` | `0.6` (mult) / `1.0s` | remaining-swing cut on parry |
| `hpRegenInCombat` / `oocDelay` | `0` (HP/s) / `5s` | no sustain mid-fight; OOC grace |
| `oocPctPerSec` / `vitOocPerPoint` | `0.01` (fraction/s) / `0.2` (HP/s per VIT) | out-of-combat HP regen |
| `manaRuleDelay` / `manaPctPerSec` / `intManaPerPoint` / `wisManaPerPoint` | `5s` / `0.02` (fraction/s) / `0.3` / `0.5` (mana/s per point) | 5s mana rule + INT/WIS regen (WIS = trait) |
| `eatPctPerSec` / `drinkPctPerSec` / `campRegenMult` | `0.03` / `0.05` (fraction/s) / `2.0` (mult) | downtime rates |
| `aggroBase` / `aggroPerLevel` / `aggroMin` / `aggroMax` | `20` / `2` (yards/lvl) / `10` / `30` (yards) | aggro radius vs level gap |
| `socialRadius` / `stealthMult` / `moveNoiseBonus` | `10` / `0.5` / `4` | pack aggro, crouch, runner noise |
| `runnerHpPct` / `runnerChance` / `fleeSpeedMult` | `0.15–0.20` (fraction) / `0.5` (prob) / `1.1` (mult) | runners fetch adds |
| `leashRadius` / `leashRegenSec` / `losDropSec` | `40` (yards) / `3` (s) / `3` (s) | anti-cheese + corner pulls |
| `threatPerDmg` / `threatPerHeal` / `tauntThreat` | `1.0` / `0.5` (threat/pt) / `500` (flat threat) | threat ledger weights |

### 13.9 Open questions for playtest

1. Is trash **12–18s** too slow for a Pixi sim with no animation budget — does it read as tense or boring?
2. One-roll vs two-roll (separate crit roll): does the single-table feel fair enough when a miss eats a 3.5s swing?
3. Melee crit split — RESOLVED in §13.3: distinct bases (melee 2.0 / spell 1.5) with shared LUK bonus
>   (`lukCritPerPoint = 0.005`) + shared 300% cap; open playtest item is only the LUK coefficient, not the split.
4. Parry-haste on mobs: keep symmetric (scary) or players-only (kind)? +3 mobs with haste may one-shot tanks.
5. Runners: `50%` of mobs flee — hilarious or griefing in tight dungeon-gen corridors? Tune `runnerChance` first.
6. Eat/drink to full in ~30s: too WoW (nostalgic) or too slow (mobile-session killer)? Is `campRegenMult = 2` enough?
7. Threat with no taunt in M1 Free Pick: does any 1v2 just collapse onto the healer? Ship a dummy taunt or accept it?

