# Skill Adoption Categories — What We Steal (and What We Skip)

> Source: `docs/skills-comparison-tos-ro-coa.md` (80 functional rows #1–80),
> `docs/classless-brainstorm.md`, `docs/skill-tag-taxonomy.md`, `docs/thousands-skills-plan.md`.
> Context: greenfield Next.js 16 + React 19 + PixiJS 7. `src/` is map-gen + tile renderer only
> (`src/game/types.ts`, `src/game/engine.ts`, `src/game/dungeon/generator.ts`).
> No combat, no actors, no SkillDef registry yet. Docs only, no `src` changes.

## 0. TL;DR for the coder implementing P0

- Implement **10 SkillDefs in `data/skills/p0.json`** (schema: taxonomy §7, brainstorm §4).
- You only need **4 of the 5 targeters**: `unit`, `surroundings`, `ground`, `self`.
  Skip `direction` (aim-cone input) until P1 — P0 cleave can ship as `surroundings`.
- Resources for P0: **HP + Mana + cooldown only**. No charges, no specials (taxonomy §4: M1 rule).
- Tags: 3–6 whitelist tags per skill, ≥1 element + delivery + role. Copy tags verbatim from taxonomy §1 + comparison §A-E Index.
- Balance knob: `factor` only. Use bands in §3. No per-skill tuning.
- Pixi: reuse 1 projectile pool + 1 decal pool + 1 ring VFX. Distinct icons/tints per element (plan §9 sameyness rule).

---

## 1. Adoption Pillars (5) → Comparison Rows

| Pillar | Covers | Comparison rows #N |
|---|---|---|
| **A. Core Combat Verbs** | single-target bolts/strikes, splash, nova, DoT, melee, ranged, execute, combo, counter | #1, #2, #6, #7, #10, #13, #19, #20, #21, #22, #23, #25, #26, #27, #28, #29, #30 |
| **B. Control / Space** | freeze, stun, vacuum/pull, knockback, root, slow, wall, dispel | #9, #31, #32, #38, #39, #40, #41, #43 |
| **C. Survival / Support** | point heal, zone heal, HoT, shield, ATK/DEF/speed buffs, cleanse, battery, imbue, self-sustain, bubble, endure | #47, #48, #49, #51, #52, #53, #54, #56, #57, #58, #59, #76, #77, #79 |
| **D. Summon / Field** | swarm, tank pet, turret, trap field, plant/ward, companion | #61, #63, #64, #65, #66, #67 |
| **E. Mobility / Utility** | dash, blink, stealth, detect, vision | #71, #72, #73, #74, #80 |

Deliberately **excluded from pillars** (see §4): #3–#5, #8, #11–#12, #14–#18, #24 (element-duplicate offense),
#33–#37, #42, #44–#46 (niche/exotic control), #50, #55, #60, #62, #68–#70, #75, #78
(econ/social/system-heavy). They return in P2 or never.

---

## 2. Per-Category Adoption Briefs

### A. Core Combat Verbs

**Why adopt (game feel payoff):** this is the moment-to-moment rotation. Without 1× reliable
single-target + 1× satisfying AoE + 1× finisher, nothing else matters. Verbs also prove all
damage plumbing: projectile flight, splash, PBAoE, flags (`opener → followup → breaker`), `%HP` checks.

**Source inspiration:**
- RO: Mage Fire Bolt / Fire Ball, Swordman Bash → Knight Bowling Bash, Monk Triple Attack chain,
  Assassin Grimtooth bleed, Crusader Counter Attack.
- ToS: Pyromancer Fireball/Flare, Cryomancer Ice Blast, Barbarian Cleave / Doppelsoeldner Cyclone,
  Assassin Behead/Annihilation (execute), Fencer Sept Etoiles.
- CoA: Pyromancer Fireball/Meteorfall, Templar Shield Slam → Riposte → Execute chain,
  Barbarian Whirlwind/Rend, Reaper Reap (HP-as-resource).

**Tags involved:** elements `fire / frost / storm / physical / blood / arcane`,
delivery `projectile / melee / nova / ground / channel`,
range `close / short / long`, role `burst / sustain / dot / combo`,
mode `burn / bleed / shock / freeze / lifesteal / execute / opener / followup / breaker`.

**MVP examples (prototype first — these ARE the P0 damage core):**

1. `fireball_01` — Row #1, `[fire, projectile, long, burst]`, targeter `unit + splash`.
   Why first: canonical bolt, tests projectile pool + charges-later + `burn` rider hook.
2. `frost_nova_01` — Row #7, `[frost, nova, short, burst, freeze]`, targeter `surroundings`.
   Why: AoE + soft-CC in one cast; proves PBAoE + `freeze` slow.
3. `cleave_01` (`slash_arc`) — Row #21, `[physical, melee, close, sustain]`, targeter `surroundings`
   (ship as mini-nova; graduate to `direction` cone in P1). Why: melee feel without aim-cone input work.
4. `shield_slam_01` — Primary Row #26 (combo builder; cf. #20 melee burst), `[physical, melee, close, burst, opener]`, sets `off-balance` 4s.
   Tag set takes `burst` role from #20 + `opener` mode from #26 (verbatim per taxonomy §1 Shield Slam example;
   primary + secondary ref per comparison-footer rule §4.3, cf. `snare_trap_01` pattern below).
   Why: proves flag system with one field.
5. `execute_01` — Row #25, `[physical, melee, short, burst, execute]`, requires target <30% HP x2 in P0 (no flag; requiresFlag:none). Gains requiresFlag:exposed in P1 when riposte_01 lands.
   Why: finisher fantasy; tests `%HP` branch in P0 (flag-consumer branch arrives P1).

**Later extensions (P1→P2):** storm bolt + chain storm (#10→#11, `shock` + bounce),
quake (#13, `ground` melee-fantasy), drain nuke (#19, `lifesteal` + HP-cost loop),
ranged volley (#22→#23), channeled beam (#27, hold-input), bleed melee (#28),
riposte (#29, block-window), kamikaze (#30, risk meter). Element variants via `supportsElements`
(fire→frost→storm riders: dot/chill/bounce) per thousands-plan Axis A — not new rows.

### B. Control / Space

**Why adopt:** control is what makes PixiJS positioning *matter*. A root field + a knockback
turns a flat tilemap into tactics. Also the cheapest difficulty knob: slow/root lets 10Hz logic
+ telegraphed mobs feel fair without server sim.

**Source inspiration:**
- RO: Frost Diver (freeze), Hunter Ankle Snare (trap-root), Wizard Fire Wall / Extreme Vacuum
  (deny/vacuum), Jupitel Thunder knockback, Quagmire slow, Ice Wall block.
- ToS: Cryomancer Frost Pillar, Psychokino Magnetic Force / Gravity Pole (pull),
  Cataphract Earth Wave (knockdown), Chronomancer Slow/Stop, Linker Hangman's Knot (gather).
- CoA: Stormbringer Deep Freeze, Chronomancer Gravity Bomb / Slow Time, Primalist Entangling Roots.

**Tags involved:** `frost / storm / arcane / nature / physical` +
`instant / ground / nova` + `control` + mode `freeze / shock / pull / knockback / root`.

**MVP examples (prototype first):**

1. `snare_trap_01` — Primary Row #40 (`nature, ground, short, control, root`, verbatim),
    secondary ref #65 (trap-field). Targeter `ground`; `trap` delivery arrives via
    augment flip `ground -> trap` (per comparison-footer rule §4.3: primary + secondary ref,
    never a synthetic merged tag set). 4s root + small dot. Why: one decal covers
    "CC requirement" AND "trap" delivery proof.
2. `knockback_01` (`thunder_clap`) — Row #39, `[physical, instant, short, control, knockback]`,
    targeter `surroundings`. P1 only, NOT P0 (P0 CC slot is `snare_trap_01` alone).
    Why: peel button; tests displacement ownership (open question brainstorm §12.8 —
    decide: logic-tick owns knockback, Pixi interpolates).
3. *(P0 gets freeze free via `frost_nova_01` chill — no third CC skill in P0.)*

**Later extensions:** hard freeze single (#31, Frost Diver homage), stun shout (#32/#34),
vacuum hold (#38, Psychokino fantasy — needs pull physics, P1), slow field (#41, Quagmire),
ice wall (#9, wall-as-cover vs shatter — needs collision, P2), dispel/strip (#43, PvP-flavored, P2+).

### C. Survival / Support

**Why adopt:** P0 must answer "how do I not die?" with exactly two buttons (heal + shield).
Buffs answer "why play together / why draft support?" Cleanse answers DoT-heavy depths.
Everything here is `self`/`surroundings`/`ground` — no new input code.

**Source inspiration:**
- RO: Acolyte Heal/Cure, Mage Safety Wall (block-N-hits), Priest Assumptio / Kyrie,
  Bard Bragi (cast-speed), Blessing/Increase AGI, Endure (anti-interrupt).
- ToS: Cleric Heal tiles / Mass Heal, Paladin Barrier, Priest Blessing/Stoneskin,
  Chronomancer Quicken/Haste, Swordsman Pain Barrier (bubble).
- CoA: Sun Cleric Flash Heal / Solar Aegis / Divine Shield, Guardian Defensive Stance / Last Stand,
  Bloodmage Crimson Regen.

**Tags involved:** `holy / arcane / physical` + `instant / aura / self` +
`support / defense / sustain`.

**MVP examples:**

1. `heal_01` — Row #47, `[holy, instant, short, support]`, targeter `self` (ally-unit in co-op later).
   Why: the survival loop closer.
2. `safety_wall_01` — Row #51, `[holy, instant, self, defense]`, block-N-hits (RO Safety Wall),
    NOT timed-barrier. `targeter:{kind:'self', duration:6} + blocksHits:3` —
    `blocksHits` is a custom schema-extension field (taxonomy §2 `self` has only
    `radius/duration/ticks`; do not overload `ticks`). Why: block-count is trivially testable in headless sim; timed barriers need aura ticks.
3. `war_drum_01` (ATK buff) — Row #52, `[physical, aura, self, support]`, 10s +10% factor aura.
   Why: proves aura delivery + party-buff hook with one buff.

**Later extensions:** zone heal (#48, Sanctuary), HoT (#49, Renovatio), DEF/speed buffs (#53/#54, Bragi/Haste),
cleanse (#56, Cure), mana battery (#57, Magic Strings/Zemyna), imbue (#58, Endows — needs gear system, M2),
self-sustain potion boost (#76, Aid Potion), bubble (#77, Pain Barrier/Sterea — short invuln, boss-gated),
endure (#79, anti-flinch staple).

### D. Summon / Field

**Why adopt:** one summon proves the minion pipeline (spawn → AI tick → leech-back) that all
future Necromancer/Tinker fantasies reuse. One turret proves static-DPS balance
(factor tax via `aoeMult`). Traps reuse the ground-decal renderer from control — nearly free.

**Source inspiration:**
- RO: Homunculus Amistr (tank pet), Hunter Blast Mine / Claymore / Land Mine,
  Genetic Hell Plant (stationary bite-plant), Ranger Warg.
- ToS: Necromancer Raise Dead / Corpse Tower (wall-minion), Sapper Spike Shooter / Claymore / Broom Trap,
  Hunter Coursing / Falconer Call.
- CoA: Necromancer Raise Skeleton/Abomination, Tinker Sentry Turret / Deploy Bomb / Land Mine,
  Primalist Healing Totem.

**Tags involved:** `physical / nature / arcane` + `minion / trap` + `summon` (+ `defense` for tank).

**MVP examples:**

1. `turret_01` (`spike_shooter`) — Row #64, `[physical, trap, short, summon]`, targeter `ground`,
    20s static shooter, 1 active cap. Why: no pet-AI needed; tests duration + killable-entity + DPS tax.
2. *(P0 pet AI is out of scope — `turret_01` + `snare_trap_01` cover the "summon/turret" P0 slot.
    First true minion lands in P1.)*

**Later extensions (P1):** melee swarm (#61, skeletons), tanky taunt minion (#63, Amistr/Corpse Tower),
trap field DoT (#65, Hunter mines), plant/ward (#67, Hell Plant / Healing Totem),
animal companion (#66, falcon/warg — needs follow-AI + pet UI, P2).

### E. Mobility / Utility

**Why adopt:** one dash is non-negotiable for action feel + telegraph dodging on a tilemap.
Everything else (blink, stealth, vision) is leverage *later*: stealth needs enemy-AI perception,
blink needs wall-collision rules, vision needs fog-of-war.

**Source inspiration:**
- RO: Knight Charge Attack, Rune Knight Phantom Thrust, Thief Hiding / Assassin Cloaking,
  Acolyte Teleport, Hunter Detect / Mage Sight.
- ToS: Cataphract Steed Charge / Rush, Archer Leap (backflip + drop-combat),
  Scout Cloaking / Shinobi Mokuton, Scout Scan, Falconer Hanging Shot (aerial vision).
- CoA: Guardian Heroic Leap, Barbarian Charge, Reaper Shadowstep/Shadow Slip,
  Chronomancer Blink, Ranger Camouflage/Falcon Sight.

**Tags involved:** `physical / arcane / shadow` + `instant / self` + `mobility`
(+ `support` for detect/vision).

**MVP examples:**

1. `dash_01` (`heroic_leap`) — Row #72, `[physical, instant, self, mobility]`,
   6-tile dash, 8s CD, no damage (damage in P1 via augment). Why: pure movement = minimal balance risk;
   proves displacement + i-frames window hook.

**Later extensions:** blink (#71, wall-rule decision first), stealth (#73, Cloaking-vs-Hiding granularity
+ perception AI, P2), detect/reveal (#74, Ruwach/Sight — the stealth tax, ships *with* stealth),
map vision (#80, Sight/Scan — needs fog, P2+).

---

## 3. MVP Priority Tiers

### P0 — First playable (10 skills, M1 per brainstorm §11)

Goal: kill a boss with 3 distinct builds using only HP/Mana/cooldown + flags.
Constraint: 4 targeters max (`unit`, `surroundings`, `ground`, `self`). No charges, no specials, no stances.

| # | id | Row | Tags (verbatim) | Targeter | Cost (draft) | Factor band | Fulfils P0 slot |
|---|---|---|---|---|---|---|---|
| 1 | `fireball_01` | #1 | `fire, projectile, long, burst` | `unit`, range 9, splash 1.5 | 12 mana, 4s | 140–160%, 1 hit, INT 0.8 | single-target |
| 2 | `cleave_01` | #21 | `physical, melee, close, sustain` | `surroundings`, radius 2.5 | 0 mana, 3s | 90–110%, 1 hit, STR 0.8, `requiresFlag: off-balance, consumeFlag: false` (+25% followup) | melee |
| 3 | `frost_nova_01` | #7 | `frost, nova, short, burst, freeze` | `surroundings`, radius 3.5 | 16 mana, 9s | 100–120% + 30% slow 2s | **AoE** + chill |
| 4 | `dash_01` | #72 | `physical, instant, self, mobility` | `targeter:{kind:'self'} + move:{distance:6}`* | 0 mana, 8s | — (no damage) | **dash** |
| 5 | `heal_01` | #47 | `holy, instant, short, support` | `self` | 18 mana, 10s | heal 120% INT | **heal** |
| 6 | `safety_wall_01` | #51 | `holy, instant, self, defense` | `targeter:{kind:'self', duration:6} + blocksHits:3`† | 14 mana, 14s | — | **shield** |
| 7 | `snare_trap_01` | #40 (primary; cf. #65) | `nature, ground, short, control, root` | `ground`, radius 2.5, 4s | 10 mana, 12s | 40% + root | **CC** (+trap proof via augment flip `ground->trap`) |
| 8 | `turret_01` | #64 | `physical, trap, short, summon` | `targeter:{kind:'ground', radius:1.5, duration:20}, maxActive:1`‡ | 20 mana, 18s | 60% / shot, 2s tick | **summon/turret** |
| 9 | `war_drum_01` | #52 | `physical, aura, self, support` | `self`, radius 6, 10s | 12 mana, 20s | +10% factor aura | **buff** |
| 10 | `execute_01` | #25 | `physical, melee, short, burst, execute` | `unit`, range 3 | 8 mana, 6s | 100% (x2 vs <30% HP), `requiresFlag: none` in P0 | **execute** |
| 10b | `shield_slam_01` (combo glue) | #26 (primary; cf. #20) | `physical, melee, close, burst, opener` | `unit`, range 2 | 6 mana, 5s | 80% + sets `off-balance` 4s | (fold into #2 slot if bar space tight — drop to 9 skills) |

\* `move:{distance:6}` is a schema-extension field (taxonomy §2 `self` has only `radius/duration/ticks` — do not overload `self` with displacement).
† `blocksHits:3` is a custom schema-extension field (taxonomy §2 `self` has no hit-count; do not overload `ticks`).
‡ `maxActive:1` is a custom schema-extension field (taxonomy §2 `ground` has only `radius/duration` — do not overload `duration` with cap).

Combo chain in P0 (flags per taxonomy §5): `shield_slam_01` sets `off-balance` →
`cleave_01` with `requiresFlag: off-balance, consumeFlag: false` (followup, +25%) →
`execute_01` with `requiresFlag: none` in P0 (HP% only). `exposed` does not exist in P0
(no P0 setter); it arrives in P1 with `riposte_01` (`requires off-balance, sets exposed`)
as the `execute_01` enabler.

Coder checklist (P0):
1. `Cost { mana, cooldown }` only. `factor` per table ±20% validator band (plan §4).
2. `scaling` sums ≤1.2, one stat each (STR for melee/physical, INT for fire/frost/holy).
3. `setsFlag/requiresFlag` cross-check must pass `pnpm validate` (taxonomy §8).
4. `vfx` keys: `proj_fire_01`, `nova_frost_01`, `arc_melee_01`, `decal_trap_01`, `turret_01`, `ring_buff_01`.
5. Dummy test: trash TTK 4–8s, elite 20–30s at-level (brainstorm §8) — tune `K`, not skills.

### P1 — Next 20 (rounds out the grid: 30 SkillDefs ≈ 30 cells of plan §9)

Pick order = fills missing targeter + missing element + missing loop:

| # | id | Row | Why now |
|---|---|---|---|
| 11 | `storm_bolt_01` | #10 | storm single + `shock`; pairs with frost/fire for Axis-A variants |
| 12 | `chain_storm_01` | #11 | storm AoE + bounce-1 baseline (stays `ground` per comparison #11; `direction` debuts via `cleave_01` cone variant in P1, or via augment flip `ground->direction`) |
| 13 | `quake_01` | #13 | `ground` melee-fantasy; cone→circle contrast with nova |
| 14 | `drain_01` | #19 | `blood, lifesteal`; first HP-cost skill (red cost text) |
| 15 | `volley_01` | #23 | sustained ranged hose; tests multi-tick `unit` |
| 16 | `beam_01` | #27 | `channel` delivery debut (hold-input) |
| 17 | `rend_01` | #28 | `bleed` dot melee; cleanse-tax preview |
| 18 | `riposte_01` | #29 | `breaker` consumer; completes Templar chain w/ `exposed` |
| 19 | `frost_diver_01` | #31 | hard single freeze (CC depth beyond chill) |
| 20 | `vacuum_01` | #38 | `pull` gather (Psychokino); needs pull-physics decision |
| 21 | `thunder_clap_01` | #39 | knockback peel (standalone from nova) |
| 22 | `slow_field_01` | #41 | Quagmire slow; kiting tool |
| 23 | `zone_heal_01` | #48 | `ground` heal zone (Sanctuary) |
| 24 | `hot_01` | #49 | `aura` regen (Renovatio) |
| 25 | `haste_01` | #54 | cast/move speed (Bragi-lite); feel multiplier |
| 26 | `cleanse_01` | #56 | DoT-answer; ships with rend/poison |
| 27 | `skeleton_01` | #61 | first true `minion` AI (melee chaff) |
| 28 | `ward_01` | #67 | stationary plant/ward (Hell Plant lite) |
| 29 | `blink_01` | #71 | wall-rule + portal-tech precursor |
| 30 | `endure_01` | #79 | anti-flinch (leveling staple, cheap to implement) |

After P1: 30 actives ≈ brainstorm M1 "50 skills" 60% done; all 5 targeters live; flags + HP-costs live;
charges/specials still out (M2).

### P2 — Fantasy fill to 80 families (M2–M3)

Author the remaining 48 families as data rows (no new engine work expected).
Every row #1–80 lands in exactly one tier: P0 (12 primary) + P1 (20) + P2 (48).
#65 appears in P0 only as a secondary ref for `snare_trap_01`; its standalone
trap-field family lands here. Element duplicates ship as `supportsElements`
variants (Axis A), not new engine shapes:

- Offense fields/variants (#2 fire splash — splash-param variant of #1, #3 fire field,
  #4 meteor, #5 ignite, #6 frost bolt — element variant of #1, #8 ice-pike lane —
  needs `direction` aim widget from P1, #12 earth single — element variant of #1,
  #14 holy nuke, #15 holy zone, #16 ghost — lifesteal rider, #17 sting,
  #18 poison cloud, #22 ranged single — weapon variant of #1, #24 guns —
  `Rounds` special, M3, #30 kamikaze — Insanity-lite).
- Control depth (#9 ice wall — needs collision, #32 stun, #33 petrify, #34 stun shout,
  #35 fear, #36 sleep/charm, #37 silence, #42 taunt — needs threat AI,
  #43 dispel/strip — PvP-flavored, P2+, #44 link-share, #45 blind, #46 time-stop).
- Support depth (#50 rez/Kaizel — co-op gated, #53 DEF stance, #55 thorns,
  #57 battery, #58 imbue — needs gear system, M2, #59 bless, #60 redirect,
  #76 potion-boost sustain, #77 bubble — short invuln, boss-gated).
- Summon depth (#62 caster pet, #63 tank pet, #65 trap-field standalone DoT,
  #66 falcon/companion — follow-AI, #68 clone/echo — cast-replay buffer,
  #69 mount/vehicle — stance machine, M2+, #70 charm/tame — faction AI).
- Utility depth (#73 stealth, #74 detect — ships *with* stealth, no orphans,
  #75 shop/econ — persistence/market, M3 picks one mini-craft max,
  #78 portal/summon — multi-map + party, co-op gated, #80 vision — needs fog, P2+).
Element/weapon variants + 30 Leg / 60 Epic / 100 Rare + cards multiply these 80 → thousands (plan §§2–3).

---

## 4. What NOT to Adopt Yet (+ reason)

| Rows | System | Reason to defer |
|---|---|---|
| CoA full rank grids (412–759 spells/class, footer) | 10k authored spells | We adopt **1 signature per row**, never ranks. Ranks are plan-Axis-D Rare rolls, not rows. Authoring ranks now = unreviewable bloat. |
| #75 shop/vending/forge/brew | player economy | Needs persistence + pricing + multiplayer market. M3 mini-craft picks **one** system (Witch Doctor mix OR ale, not both). |
| #69 mounts / vehicles (peco, dragon, Madogear, steed) | mounted combat + `stance` | Needs mount-state machine, turn-penalty tuning, mounted anims. Knight-of-Xoroth tradeoff note saved for stance-design (M2). |
| #78 party portal / summon, #50 resurrect | social topology | Useless client-only solo; portals need multi-map + party. Revisit with co-op. |
| #70 charm/tame, #68 clone/echo, #44 link/share | AI-heavy systems | Taming needs faction AI; Past-Self echo needs cast-replay buffer; Devotion-share needs ally-damage routing. All P2+ with real actors. |
| #46 time-stop, #43 full-strip, #36 sleep/charm | hard-CC / anti-fun | Stop breaks 10Hz-tick assumptions; Full Strip needs gear-durability; sleep needs wake-rules. Playtest soft-CC (freeze/slow/root) first. |
| #62 ranged/caster pet, #66 falcon companion | advanced pet AI | P0 turret (static) → P1 chaff (melee follow) → P2 ranged/falcon (kiting + pet UI). Don't pay follow-and-kite AI cost in M1. |
| #24 guns + `Rounds`, Insanity (#30/#35), Static/Rage meters | special resources | Kit rule: HP+Mana+≤1 special, and M1 = HP+Mana only (taxonomy §4). Specials are M3 Draft-weighting material. |
| #55 reflect/thorns, #60 redirect/guardian | damage-routing | Needs attacker→reflector plumbing + threat. Shield-block (P0) covers the fantasy cheaply. |
| #74/#80 detect/vision w/o stealth/fog | unsupported counters | Ship detect **with** stealth, vision **with** fog. No orphans. |
| #8 lane-spikes as separate engine shape | input scope | P0 has no `direction` aim-cone input. Lanes arrive in P1 with the `direction` aim widget (via `cleave_01` cone variant / `chain_storm_01` augment flip `ground->direction`), not as a P0 shape. |

---

## 5. Mapping Table (Category → Rows → Tags → MVP skills)

| Category | Rows | Tags (representative) | MVP skills (P0 ★ / P1 ·) |
|---|---|---|---|
| A. Core Combat Verbs | #1–#8, #10–#30 (offense span; #9 lives in B) | `fire/frost/storm/physical/blood/arcane + projectile/melee/nova/ground/channel + burst/sustain/dot/combo + burn/bleed/shock/freeze/lifesteal/execute/opener/followup/breaker` | ★ `fireball_01` (#1), `frost_nova_01` (#7), `cleave_01` (#21), `shield_slam_01` (#26 primary; cf. #20), `execute_01` (#25) · `storm_bolt_01` (#10), `chain_storm_01` (#11), `quake_01` (#13), `drain_01` (#19), `volley_01` (#23), `beam_01` (#27), `rend_01` (#28), `riposte_01` (#29); P2: #2–#6, #8, #12, #14–#18, #22, #24, #30 (variants/fields per §P2) |
| B. Control / Space | #9, #31–#46 (full control span) | `frost/storm/arcane/nature/physical + instant/ground/nova + control + freeze/shock/pull/knockback/root` | ★ `snare_trap_01` (#40 primary; cf. #65), chill via `frost_nova_01` (#7) · `frost_diver_01` (#31), `vacuum_01` (#38), `thunder_clap_01` (#39, P1 knockback — not P0), `slow_field_01` (#41); P2: #9, #32–#37, #42–#46 |
| C. Survival / Support | #47–#60, #76–#77, #79 (support purpose; #76/#77/#79 sit in Utility numbers) | `holy/arcane/physical + instant/aura/self + support/defense/sustain` | ★ `heal_01` (#47), `safety_wall_01` (#51), `war_drum_01` (#52) · `zone_heal_01` (#48), `hot_01` (#49), `haste_01` (#54), `cleanse_01` (#56), `endure_01` (#79); P2: #50, #53, #55, #57–#60, #76–#77 |
| D. Summon / Field | #61–#70 (full summon span) | `physical/nature/arcane + minion/trap + summon (+defense)` | ★ `turret_01` (#64) · `skeleton_01` (#61), `ward_01` (#67); P2: #62–#63, #65 (standalone; P0 uses #65 only as secondary ref), #66, #68–#70 |
| E. Mobility / Utility | #71–#75, #78, #80 (utility numbers; #76–#77, #79 live in C) | `physical/arcane/shadow + instant/self + mobility (+support)` | ★ `dash_01` (#72) · `blink_01` (#71); P2: #73 + #74 (paired), #75, #78, #80 |

**Row-coverage count:** P0 covers 12 primary rows (#65 only as secondary ref for
`snare_trap_01`) — enough for 3 builds
(fire-melee-execute / frost-control-turret / buff-tank-shield-slam).
P1 adds 20 rows → 32 primary rows. P2 authors the remaining 48 (see §P2 list;
§1 pillars + excluded line already partition all 80). No row is ever duplicated —
ambiguous skills list primary + secondary ref per comparison-footer rule §4.3.
