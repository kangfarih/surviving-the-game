# Skill Advancement — Levels, Requirements, Acquisition

> Status: P0 proposal (docs only, no `src`). Implements
> `./classless-brainstorm.md` §§2–3, 8, 11–13, `./skill-tag-taxonomy.md`
> §§4–6, 8, `./skill-adoption-categories.md` §3 (P0 10 skills),
> `./thousands-skills-plan.md` §§4–5.
> Canonical names: `charges`, `Cost.special`, `allowedAugments`,
> `setsFlag` / `requiresFlag` / `consumeFlag` / `stance`.
> P0 constraints: 4 targeters (`unit`, `surroundings`, `ground`, `self`);
> HP + Mana + cooldown only (no charges/specials); `factor` is the power knob.

## 1. Do Skills Have Levels?

Three models considered. P0 picks one; others deferred, not deleted.

### 1.1 Option A — Skill Level Lv1–5 (point-buy, RO Job Level homage)

- Each owned skill has level 1–5. Spend Skill Essence to acquire (Lv1)
  then to raise (Lv2–5). Costs escalate; see §6 cost table.
- Each level multiplies `factor` by a fixed step (validator-safe: steps
  are constants, so Lv1 `factorCheck` implies all levels pass).
- Level gates extras: Lv3 extends rider (burn/chill/root +1s);
  Lv4 unlocks `charges +1` (dormant until M2); Lv5 unlocks Legendary
  eligibility (dormant until M2). No new engine shapes per level.
- Pros: headless-testable, AI-friendly (integer ledger), matches
  brainstorm §2d "1 skill pt per level". Cons: flat +% can feel samey
  without augments (accepted for P0; augments fix it in M2).

### 1.2 Option B — Attribute-style (ToS Enhance / Arts split)

- Skill stays Lv1; separate per-skill attributes bought with dust:
  Enhance (+X% factor per point) + Arts (mechanic flips, e.g. Meteorfall).
- Pros: fine-grained sink for rich players; flips carry fantasy.
  Cons: two currencies × 10 skills = 20+ buttons in P0 camp UI;
  needs augment slot economy to make sense (M2). Deferred to M2,
  where it arrives AS Rare/Epic/Legendary augments (taxonomy §6).

### 1.3 Option C — Mastery (use-to-level, e.g. Elder Scrolls / RO Homunculus)

- Skill levels by cast count / damage dealt, no Essence cost.
- Pros: organic, rewards signature moves. Cons: grindable/bottable,
  punishes support (heals level slower than bolts), unfair to AI
  survivors (player APM ≠ agent tick), sim-hostile (TTK drifts with
  history). Rejected as primary; MAY return in M3 as a discount:
  50 casts → −1 Essence off next level (flavor, not path).

### 1.4 Recommendation for P0: Option A, capped at Lv3

- Engine supports Lv1–5; **P0 content caps at Lv3** (scope cut, not
  design cut). Lv4–5 rows exist in schema + validator, unlock in M2
  alongside charges + augments.
- P0 factor steps:

| Lv | Factor mult | Rider | M2 unlock |
|---|---|---|---|
| 1 | ×1.00 | base | — |
| 2 | ×1.12 | — | — |
| 3 | ×1.24 | +1s duration | Epic-eligible |
| 4 | ×1.38 | — | `charges +1` |
| 5 | ×1.52 | — | Legendary-eligible |

- Mana/CD do NOT scale with level (keeps `factorCheck` trivial;
  cost pressure comes from Essence price, not per-cast tax).
- Why not augment-slots-per-level: loadout slots are per-loadout
  (1 Leg + 3 Epic + 20 Rare-pts, taxonomy §6). Per-skill slot unlocks
  would break the slot economy (thousands-plan §5.1). Levels gate
  *eligibility*, never *slot count*.

## 2. Requirements — Soft by Default, Hard by Exception

Classless pillar: identity via combination, not selection. Requirements
steer; they rarely lock. Rule of thumb: **soft = numbers, hard = logic**.

| Req type | Soft (P0 default) | Hard (rare) |
|---|---|---|
| Stats / traits | below-req casts at −15% factor; above-req gets full scaling | never hard in P0 |
| Tags owned | synergy weight in offers (§4), no lock | never hard |
| Combo flags | — | hard: `requiresFlag` must be present or cast fizzles (taxonomy §5) |
| Level gates | — | hard but shallow: Lv-gate only 6 rows (5 P0 + 1 combo glue, see §6.3) as progression unlock, not stat/tag lock |
| Weapon / mode | flavor tags only in P0 (all P0 skills usable with `any`) | hard only when input impossible (aim-cone `direction` arrives P1) |

- Soft-req math: `if stat < req: factor ×0.85`. No cast lock, no greyed
  button — red "weak" tag instead. Above req: normal `scaling` applies.
- Lv-gates are progression unlocks (pacing), not stat/tag locks: the Free
  Pick shop stays open; gates only order *when* complex skills surface.
  Free Pick remains the soft-pillar default.
- `requiresFlag` / `consumeFlag` stay the ONLY hard combat gate in P0:
  `shield_slam_01` sets `off-balance` 4s → `cleave_01` consumes nothing
  (`consumeFlag: false`, +25% followup) → `execute_01` checks HP% only.
  `exposed` does not exist in P0 (arrives P1 with `riposte_01`).
- Weapon tags (`blade/bow/staff/...`) are draft weights + card hooks in
  P0, never equip locks (brainstorm §3: no armor/weapon lock).
- Trait reqs (POW/STA/WIS/SPL/CON/CRT) do not exist in P0 (traits unlock
  ~Lv20, brainstorm §2b). Documented here so M2 augment gates reuse the
  soft pattern (e.g. Legendary "Blood Mage" wants CON 30 → soft −15%).

## 3. How Drifters GET Skills — 4 Modes Compared

"Drifter" = in-world survivor body (see `src/game/actor.ts`, canonical).
Player (human) / Agent (LLM mind) / Bot (script mind) all use the
same offer pipeline; only the *chooser* differs (§3.3).

| Mode | Mechanic | Pros | Cons |
|---|---|---|---|
| A. Free Pick | spend Essence in full shop, synergy-biased filter | builder freedom; M1 default; AI-testable | paradox of choice; meta piles |
| B. Draft 1-of-3 | every N levels, pick 1 of 3 (rarity + pity + reroll) | roguelike variety; spectacle | pool dilution at 1000s of variants; needs offer engine |
| C. Discovery | stats/personality surface offers (e.g. VIT+Altruism → heal) | fantasy ("hermit found Reap"); guides newbies | opaque if unexplained; snowball risk |
| D. Drifter Decision | chooser policy: player clicks, agent scores, bot rules — same offers | one pipeline for human play + spectators + bots | needs scoring formula (cheap, §4) |

### 3.1 Recommendation: hybrid (P0 lite → M3 full)

- **P0 (M1): A + C-lite + D.** Free Pick shop is canonical; discovery is
  a *sort + hint row* ("hermits often take…"), never a lock; D is the
  AI policy stub scoring the same shop. NO random draft in P0 progression
  (keeps TTK tests deterministic); an opt-in preview draft every 5 levels
  exercises the 1-of-3 UI without affecting balance.
- **P1–M3: A + B + C + D.** Draft every 3 levels from Lv10 (deviation from
  brainstorm §3 every-2-lvls: slower cadence cuts offer churn for balance
  scope; revert to every-2 if playtest wants faster variety; rarity Common
  60 / Rare 28 / Epic 10 / Legendary 2, brainstorm §3; synergy pity; 1
  reroll via Hands-of-Fate). Shop stays open between drafts (Free Pick
  spine). Discovery weights feed draft rarity, not access.
- Wildcard (fully random + lock 2 starters) stays an opt-in run modifier
  (M3), never the default. AI survivors may run any mode; policy D works
  unchanged because offers are just ranked lists.

### 3.2 Why hybrid fits classless

- Free Pick proves combat; Draft proves variety; Discovery proves fantasy;
  Decision proves AI parity. No mode needs new SkillDefs — all four share
  the P0 10-skill DB and differ only in offer logic (brainstorm §3).
- Single currency in P0 (Skill Essence buys actives AND levels). Split
  Ability/Talent Essence arrives M2 with augments (brainstorm open Q #1).

## 4. Stat + Personality Influence — Weights and Discounts, Never Locks

### 4.1 Four personality axes (−100…+100 per agent, default 0)

| Axis | − pole (tags weighted) | + pole (tags weighted) |
|---|---|---|
| Aggression ↔ Caution | `burst, execute` | `defense, control, support` |
| Altruism ↔ Ego | `support, sustain` | `summon, burst` |
| Curiosity ↔ Discipline | novel tags (unowned) | owned-tag synergy |
| Grit ↔ Finesse | `melee, nova` + HP-costs | `projectile, channel` + INT-scaling |

- Axes are set at creation (Archetype preset or 3-click quiz) and drift
  ±5 percamp choice (e.g. donating dust → Altruism +2). AI survivors get
  fixed Archetype spreads so spectators can read them ("the cautious one").
- Offer score (shared by shop sort + draft + AI chooser D):

```
score = 2.0*synergyOverlap + 0.6*personalityMatch + 0.4*roleNeed + 0.2*novelty
```

  `synergyOverlap` = shared tags with owned kit (0–6); `roleNeed` = 1 if
  kit lacks heal/dash/CC, else 0; weights are JSON tunables.
- Cost discount (not access): matching pole → −10% Essence per full 50 points,
  max −20%. Discount applied once per spend, rounded up (ceil), floor 1.
  Example: Aggression 80 → 1 bracket → −10%: new skill 1→1, Lv2 upgrade
  1→1, Lv3 2→2 (ceil(2×0.9)=2). Discounts never gate;
  a Caution-100 pacifist CAN buy Execute at full price.

### 4.2 Discovery examples (hints, not locks)

- High VIT + Altruism → `heal_01` surfaces top + tutorial hint.
- High STR + Aggression → `execute_01` offered early with HP-threshold tip.
- High INT + Curiosity → `turret_01` + `fireball_01` bundle hint.
- High AGI + Caution → `dash_01` + `snare_trap_01` kiting hint.
- LUK does NOT touch offer rarity in P0 (brainstorm open Q #3 stays open;
  snowball risk undecided — revisit with telemetry M4).

### 4.3 Anti-paralysis: Archetypes, loadouts, cheap respec

- **8 Archetype starters** (presets over Free Pick, brainstorm §3): e.g.
  "Plague Doctor" (heal + snare + frost), "Ale Barb" (slam + cleave +
  execute). One click pre-spends first 3 picks in P0 (scope-cut from
  brainstorm §3 full 10-pt presets; full presets return M2+); fully editable after.
- **6-slot bar, 10-skill dex:** own up to all P0 skills, equip 6. Choice
  is loadout, not identity. Role-need banner ("no heal equipped") nudges.
- **Respec:** P0 camp respec refunds 100% (free experimentation). M2+
  charges dust per Legendary move (expensive identity, cheap tinkering).
- **Offer cap:** shop shows max 10 (3 pinned role-needs + 7 scored); draft
  shows exactly 3. No infinite grid in P0.

## 5. Advancement Loop — Earn → Spend → Diminish → Die (Lightly)

```
explore → encounter (3–8 mobs, telegraphed) → earn XP + dust
 → camp: spend (stats auto? / skill acquire / skill level / save loadout)
 → delve deeper (mob HP/dmg ×1.15/depth) → repeat; die → keep build, lose dust
```

- **Earn:** 1 stat pt + 1 Skill Essence per level (max Lv50, brainstorm
  §2d); trait pts from Lv20 (1 per 5 lvls, dormant in P0 UI). Dust drops
  per encounter (respec/craft currency, not power).
- **Spend priority (P0):** 1st new damage skill → heal or shield → combo
  enabler (`shield_slam_01`) → levels on main nuke → flex (turret/buff).
  Shop enforces nothing; Archetype path highlights this order.
- **Diminishing (three layers, all JSON-tuned):** stats soft-cap past
  40/80/120 worth 1.0/0.6/0.3 (brainstorm §2c); skill Essence costs
  escalate (§6); duplicate-role tax (thousands-plan §5.2): 2nd mobility
  +50% cost, 3rd summon −30% effectiveness. No per-skill nerfs.
- **Death (roguelite-light):** keep levels + build + Archetype; lose dust
  + current preview-draft progress (brainstorm §8). No stat loss, no
  permadeath in P0. Wildcard (M3) keeps locked starters through death.
- **TTK anchor:** P0 dummy test uses brainstorm §13 band (trash 1v1
  12–18s, elite 30–60s, boss 90–150s); tune `K`/`ttkScale`, never skills
  (adoption §3 checklist + thousands-plan §4 `factorCheck` ±20% band).
  Migration note: adoption §3 checklist item 5 still cites brainstorm §8
  (4–8s) as pre-classic reference; §13 is normative for P0
  (`ttkScale=1.0`; ≈0.45 recovers §8 if playtest rejects slower TTK).

## 6. Concrete P0 Rules

### 6.1 Caps and currencies

| Knob | P0 value | Later |
|---|---|---|
| Skill max level | Lv3 (engine supports 5) | Lv5 at M2 |
| Skills owned / equipped | 10 / 6 | grows with DB |
| Currency | 1 Skill Essence / level (single) | split Ability/Talent M2 |
| Respec | free in camp | dust fee for Leg moves M2 |
| Traits | hidden until Lv20 | gate M2 augments |

### 6.2 Cost table (Essence; P0 single currency, floor 1, personality §4)

| Spend | L1 new | L1→2 | L2→3 | L3→4 | L4→5 |
|---|---|---|---|---|---|
| Cost | 1 | 1 | 2 | 2 (M2) | 3 (M2) |

- Maxing one P0 skill to Lv3 = 1+1+2 = 4 Essence. Ten skills × 4 = 40 of
  50 lifetime Essence: a completer CAN near-max by Lv50, so the live cap
  is the 6-slot bar + duplicate-role tax, not the wallet (by design P0).
- `scaling` sums ≤1.2, one stat each (STR melee/physical, INT fire/frost/
  holy; adoption §3 checklist). `vfx` keys per adoption §3 coder checklist item 4.

### 6.3 Requirement table — the 10 P0 skills (+ combo glue)

Soft stat = −15% factor if below, full scaling if above. Hard = logic only.
For Targeter/Cost/factor bands see adoption §3 P0 table (canonical for
combat numbers); this table covers only progression gates.

| Skill (row) | Lv gate | Soft stat | Hard gate (P0) |
|---|---|---|---|
| `fireball_01` (#1) | 1 | INT 8 | none |
| `cleave_01` (#21) | 1 | STR 8 | none (followup bonus needs `off-balance`) |
| `frost_nova_01` (#7) | 1 | INT 8 | none |
| `dash_01` (#72) | 1 | AGI 6 | none |
| `heal_01` (#47) | 1 | INT 6 | none (self-only P0) |
| `safety_wall_01` (#51) | 2 | VIT 6 | none (`blocksHits:3` extension) |
| `snare_trap_01` (#40) | 3 | DEX 6 | none (ground decal; `trap` flip is M2 augment) |
| `turret_01` (#64) | 3 | INT 10 | `maxActive:1` (extension) |
| `war_drum_01` (#52) | 4 | STR 6 | none (aura radius 6, 10s) |
| `execute_01` (#25) | 4 | STR 10 | target <30% HP (×2 factor) |
| `shield_slam_01` (#26) | 2 | STR 8 | sets `off-balance` 4s |

- No weapon hard locks in P0; no trait reqs; `exposed` absent (P1).
- `shield_slam_01` canonical tags `[physical, melee, close, burst, opener]`
  (taxonomy §1, adoption §2A); comparison #26 `combo` role superseded for
  P0 — use `burst` role + `opener` mode everywhere.
- Validator must cross-check `setsFlag`/`requiresFlag` pairs (taxonomy §8).

### 6.4 Acquisition flow (P0 default run: Day-0 Wildcard arrival -> Free Pick)

1. **Arrival (Day-0 Wildcard, lore):** drifter is dragged into fantasy
   world with no meta knowledge. README random kit applies: Day-0 grants
   survival kit only, no agency. This is NOT the M3 full-lock Wildcard
   run (§3.1, §5); lock ends at first camp.
2. **Stats Day-0 (constrained scramble):** 6 primaries roll 5-12 on a
   fixed total budget. Fair (same budget) but varied (no two drifters
   identical). Respects soft-req bands in §6.3; no hard locks (§2).
3. **Skills Day-0 (exactly 2, by slot):** slot — not fixed skill — is
   locked. Specific skill is random inside slot, weighted by hidden
   personality seed (§4). Guarantees 1 kill + 1 live; no unwinnable spawn.

| Slot | Role | Random 1 of |
|---|---|---|
| 1 | Damage | `fireball_01` / `cleave_01` / `frost_nova_01` |
| 2 | Survival | `heal_01` / `safety_wall_01` / `snare_trap_01` / `dash_01` |

   P0 shapes only: HP + Mana + cooldown, 4 targeters (§6.3). No
   Archetype pick at Day-0; seed stays hidden.
4. **First camp unlocks agency:** Free Pick shop opens (soft pillar,
   §§2-3); discovery hints sort shop (§4.2); Agent Decision policy D
   scores same offers (§§3-4.1) incl. personality discount (−10% per
   50 pts, max −20%, floor 1). Archetypes surface here as paths,
   never locks (§4.3).
5. **Lv2-4:** shop open at camp; Lv-gates in §6.3 unlock naturally. AI
   survivors auto-buy via policy D with hidden-seed weights.
6. **Lv5+:** opt-in preview draft every 5 levels (1-of-3 scored view over
   same shop pool; no rarity tiers yet; decline = keep Essence). Full
   rarity + pity + reroll draft ships M3 (brainstorm §11).
7. **Camp loop:** buy / level / equip-6 / save loadout / free respec.
   Draft progress + dust drop on death; build + levels persist.

### 6.5 P0 validator checklist (extends taxonomy §8 + adoption §3)

- [ ] Max Lv3 enforced in P0 content (schema allows 5).
- [ ] Cost table respected; personality discount floored at 1.
- [ ] Soft-req −15% applied; no hard stat/tag locks in P0 rows.
- [ ] Flags pair (`off-balance` setter ↔ consumer); `exposed` absent.
- [ ] `factor` within band per level (Lv1 check + fixed mults §1.4).
- [ ] Bar cap 6, owned cap 10; extensions (`move`, `blocksHits`,
  `maxActive`) use custom fields, never overload `ticks`/`duration`.

## Open Questions (for playtest, not P0 blockers)

1. Single Essence now vs split Ability/Talent from day one (brainstorm §12.1)?
   P0: single. Revisit M2 with augments.
2. Does Lv3-rider (+1s) read, or should Lv3 be pure factor (simpler tooltip)?
3. LUK → draft rarity ever, or permanent no (snowball)?
4. AI policy weights (§4.1): does 2.0/0.6/0.4/0.2 produce readable
   spectator personalities, or do bots converge on one build?
5. Preview draft cadence: every 5 levels vs every 3 (P0 uses 5 to protect
   determinism; P1–M3 uses 3 per §3.1 deviation from brainstorm §3 every-2)?
6. Mastery-discount (50 casts → −1 Essence): flavor win or botting vector?
