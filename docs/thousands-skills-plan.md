# Thousands of Skills Plan — Breadth Without Authoring Thousands

> How we ship **2,000+ distinct-feeling builds** while hand-authoring **80 actives + 190 augments (30 Leg + 60 Epic + 100 Rare) + 80 cards**.
> Inspirations: Ascension (Mystic Enchants > abilities; slot economy; cost curve) · ToS (Skill Factor formula; 80 classes × variants; Attributes/Arts) · RO (cards as proto-augments; same-job divergence) · CoA (resource fantasies × kits = combinatorial identity).

## 1. Core Thesis

**Never author thousands. Author a matrix, then multiply.**

```
feels ≈ Bases × Elements × Weapons × Legendary-flips × (Draft × Gear × Stats)
80    × ~3     × ~2      × ~5               = ~2,400 authored-feels
+ 100 stackable Rares × procedural rolls × card combos → 10k+ loadout permutations
```

Players experience *builds*, not rows. 50 bases × 190 augments already felt like "10k skills" in Ascension — because the *combination* is the content.

What we hand-author (M4 target): **80 actives, 30 Legendaries, 60 Epics, 100 Rares, 80 gear cards, 12 fusion recipes, 8 Archetypes.** Everything else is generated, validated, and offered — never hand-written.

## 2. The Multiplication Axes

### Axis A — Element variants (×2–4 per base)
Each base declares `supportsElements: [...]`. Fireball → Frostball (chill), Stormball (bounce-1 baseline), Shadowball (lifesteal). Implementation: same SkillDef, `element` param swaps tags + VFX key + one rider. **Not a copy-paste row** — one row, `variants` field; sim expands.

```json
{ "id": "bolt_01", "supportsElements": ["fire", "frost", "storm"],
  "riders": { "fire": {"dot": 3}, "frost": {"chill": 0.3}, "storm": {"bounce": 1} } }
```

Authoring cost: ~15 min/variant (numbers + rider + icon tint). 80 bases × 3 = 240 feels for ~80 rows.

### Axis B — Weapon / delivery variants (×1–2)
`supportsWeapons: [...]`. Cleave with blade (arc) vs staff (longer, thinner, +factor)? Arrow with bow (fast) vs explosive (ground targeter flip)? Weapon tags gate cards and draft weights — an RO-like divergence lever: same skill, different stat scaling + gear chase.

### Axis C — Legendary flips (×3–5 eligible per base)
Each base allows 3–5 Legendaries; each Leg *must* flip a mechanic (targeter, resource, hits→zone, cost type — per taxonomy doc). Fireball → Meteorfall (ground), → Pyroblast (channel, 1 huge hit), → Flame Aura (self, DoT). This is the ToS-Arts idea at Ascension-Legendary power.

### Axis D — Epic / Rare rolls (procedural, bounded)
Epics (60 authored): `+2 bounce`, `charges +1`, `cast-while-moving`, `execute window`. Rares (100 authored, stackable ×5): `+8% factor`, `+10% radius`, `−8% CD`. Random-enchant / Worldforged homage: loot can drop a base with 1–2 random Rare rolls pre-applied ("Worldforged: +12% factor, +1 bounce") — exciting, still validatable.

### Axis E — Gear cards (×80, RO homage)
Cards multiply *without touching skills*: `+12% vs Undead`, `+10% fire`, `enable: skill X`, `autocast Y on hit ≤5%`. A card that enables an off-tag skill is a mini-Legendary ("even without INT you can Frostball"). 80 cards × 80 bases = the long-tail thousands.

### Axis F — Fusion recipes (×12, CoA-fantasy combos)
Two maxed skills + dust → hybrid with both tags, higher cost, one targeter. E.g. `Fireball + Boulder → Magma Orb (fire+physical, ground, leaves zone)`. Hand-author 12 recipes; each is a chase goal, not random mush. Fusion window: camp-only, previewable, reversible for dust.

## 3. Procedural Variant Generator (definition stays curated)

Generator pseudocode (runs in tooling + Draft offer engine, NOT at runtime combat):

```
for base in bases:
  for el in base.supportsElements:
    for wpn in base.supportsWeapons:
      candidate = expand(base, el, wpn)
      for leg in eligibleLegendaries(candidate):   # 0 or 1 (slot rule)
        v = apply(candidate, leg)
        v += rollRares(v, budget)                  # point-budgeted
        if validate(v) and factorCheck(v): emit(v)
```

- Emitted variants get deterministic ids: `fireball_01__storm__staff__meteorfall`.
- Cap: top-N per base by (fun-score × novelty), rest stay latent for rerolls. Prevents UI flood.
- Draft/Wildcard draw from *emitted* pool, weighted by synergy + rarity (weights canonical in `./classless-brainstorm.md` §3: Common 60 / Rare 28 / Epic 10 / Legendary 2).

## 4. Skill Factor Formula (ToS homage — the cross-skill power knob)

Every variant must satisfy:

```
factor_base = K * (DPS_target * CD_eff * costMult) / (hits * aoeMult * ccMult)
  aoeMult  = 1 + 0.35 * ln(1 + aoeCells)     # AoE tax
  ccMult   = 1 + 0.5 * ccPower               # control tax (root=1, stun=1.5)
  CD_eff   = CD / (charges ?? 1)              # charges (ToS Overheat) normalized, 1 if none
  costMult = 1 + 0.2 * (hp>0) + 0.15 * (special!=null)  # hp = Cost.hp, special = Cost.special.amount
```

- `K` tuned so at-level TTK hits §8 targets in brainstorm doc (trash 4–8s).
- Validator **rejects** variants outside ±20% band; flags ±10% for review.
- Numbers people: this is the anti-combinatorial-explosion device. We don't playtest 2,400 variants — we *budget* them.

## 5. Anti-Combinatorial-Explosion Balance

1. **Slot economy > nerfs.** 1 Leg + 3 Epic + 20 Rare-pts per loadout caps stacking no matter how many rows exist. (Ascension lesson.)
2. **Cost curve.** Second mobility skill costs +50%? Third summon −30% effectiveness? Diminishing identical-role slots prevent 6-dash piles.
3. **Content difficulty, not skill nerfs.** Depth scales mob HP ×1.15/depth; outlier builds get outgrown instead of patched. (Ascension: balance via content.)
4. **Bans & denylists.** Augment `denyTags` + per-mode banlist (`wildcard_bans.json`) kill known-toxic combos without touching defs.
5. **Telemetry flags (M4).** Auto-flag `pickRate > 25% && winRate > 60%` or `TTK < 50% target`; human reviews, usually by adjusting cost/weight, not factor.
6. **Cheap respec + loadouts.** If everything is viable-ish and switching is cheap, "OP" becomes "popular" — acceptable in PvE.

## 6. Card-Like Gear (RO × Ascension RE)

- Gear: weapon / armor / trinket, 0–2 slots each (M2: 1 slot each to start).
- Cards: 80 authored, same JSON shape as augments + `slot` + optional `enableSkill` / `autocast {skill, chance ≤5%, icd ≥10s}`.
- Card sets (2–3pc bonus, e.g. 3× Undead-bane → +5% all): chase without power creep (set bonus = utility, not factor).
- Worldforged: 5% of drops get a bonus Rare roll. Same validator, extra excitement.

## 7. Tooling (build the lab before the library)

| Tool | What | When |
|---|---|---|
| `pnpm validate` | zod schema + tag whitelist + factor band + flag/augment cross-check | M1 stub, M2 full |
| `pnpm build:db` | CSV/JSON → `skills.json` + `augments.json` + tag index; deterministic variant expansion | M2 |
| Builder (web UI) | pick skills + augments + stats → DPS/TTK estimate, shareable link/code | M3 (Ascension-builder homage) |
| Simulator | headless 10Hz combat vs dummy depths; batch-runs variants → TTK table | M3 |
| Ranker | nightly sim sweep → tier list by depth-TTK + pick/win from telemetry | M4 |
| Archetype seeder | 8 presets as versioned JSON, validated like any build | M3 |

Builder + sim are force multipliers: they let *players* explore thousands so designers don't have to pre-clear them.

## 8. Milestone Content Counts

| Milestone | Authored | Feels (via matrix) | Notes |
|---|---|---|---|
| M1 | 50 actives, 0 augments | 50 | Free Pick, HP/Mana, grid UI |
| M2 | +30 actives (80 total), 30 Leg, 60 Epic, 100 Rare (= 190 augments), 40 cards | ~300–500 | slots, combos, 1 stance, loadouts |
| M3 | +fusion 12, +40 cards (80 total), 8 Archetypes, Draft/Wildcard | ~1,200 | offer engine, camp, builder+sim |
| M4 | procedural rolls, Worldforged, telemetry | **2,000+** | ranker, depth 20, VFX pool |

Rule of thumb: each milestone's *authored* count stays reviewable by one person in a weekend; *feels* grow 3–5× per milestone via multiplication.

## 9. Risks & Open Questions

- **Sameyness:** 240 bolt-variants risk feeling like tints. Mitigation: Leg-flip requirement + rider per element (dot/chill/bounce/lifesteal must *play* different) + VFX/audio per element.
- **Draft pool dilution:** thousands of variants → any one build unfindable. Mitigation: synergy weighting + pity + Archetype seeds + search/filter UI.
- **Sim-reality gap:** sim TTK ≠ human TTK (positioning, panic). Mitigation: sim reports *relative* tiers; telemetry corrects.
- **Fusion bloat:** hybrids could obsolete parents. Mitigation: fusion costs a slot (hybrid occupies 2 skill slots? or +Leg slot) — TBD.
- **Authoring bottleneck:** who writes 80 good bases? Mitigation: start from 6 elements × 5 targeters = 30 cells, 2–3 bases per cell = 60–90. Grid guarantees coverage.
