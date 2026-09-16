# Skills Comparison: Ragnarok Online × Tree of Savior × Conquest of Azeroth

> Docs only. No `src` changes.

## 0. Method — manual tags, no vectors

Each functional row below groups skills by **combat purpose + canonical tags** from
./skill-tag-taxonomy.md (ELEMENT / DELIVERY / RANGE / ROLE, optional MODE).
Same row = same tags + same job in a fight, regardless of which game, job, or class it comes from.

**Why no vectors (yet):** the three games use small, discrete vocabularies — RO has ~400+
skills across its 1st→4th jobs, ToS has ~500+ (94 classes × ~5–8 skills each), CoA has
412–759 *spells per class* but only ~21 recognizable signature kits. A human can group these
by reading tooltips and assigning 3–6 whitelist tags per row. Embeddings would add infra
cost (pipeline, model, index, eval) without changing any grouping decision at this scale —
exact tag match + purpose match already gives 70–90 clean functional rows.

**When vectors would help:** the `./thousands-skills-plan.md` future — thousands of
procedural/augmented variants, cross-language tooltips (kRO/jRO vs iRO, kToS vs iToS),
fuzzy player-submitted builds, and "find me skills that *feel like* X" draft search.
At that point: embed tooltip text, retrieve top-K, then **verify with the same manual
tag validator** (vectors propose, tags dispose).

**How to read this doc:**
- Each section starts with a narrow **index table** (`# / Function / Tags`) for scanning.
- Each row then has a **detail block** (`### #N Title`) with one bullet per field:
  `Tags`, `RO`, `ToS`, `CoA`, `Notes`. Long lists wrap across lines — no horizontal scroll.
- `Tags` uses ONLY whitelist tokens from `./skill-tag-taxonomy.md`:
  element `fire / frost / storm / shadow / holy / nature / blood /
  poison / arcane / physical` · delivery `projectile / melee / nova / aura / ground /
  channel / instant / trap / minion / shout` · range `self / close / short / long` ·
  role `burst / sustain / dot / control / mobility / summon / support / combo / defense` ·
  mode `burn / bleed / freeze / shock / fear / charm /
  knockback / pull / root / lifesteal / execute / opener / followup / breaker / stance / autocast`.
- RO + ToS cells are **exhaustive** (every matching skill listed, comma-separated).
  Format is `Job: Skill`.
- CoA cells are **representative signatures only** — each CoA class has 412–759 spells
  (see footer), so we cite the iconic kit spell, not all ranks/talents. Format `Class: Skill`.
- Sections: **A. Offense (1–30) · B. Control (31–46) · C. Support (47–60) ·
  D. Summon (61–70) · E. Utility (71–80).**

---

## A. Offense (direct damage)

Direct-damage archetypes: bolts, AoEs, fields, melee, ranged, guns, finishers.

### Index

| # | Function | Tags |
|---|---|---|
| 1 | Fire single-target bolt | `fire, projectile, long, burst` |
| 2 | Fire small AoE splash | `fire, projectile, short, burst` |
| 3 | Fire ground field / wall | `fire, ground, short, dot, burn` |
| 4 | Fire meteor / sky nuke | `fire, ground, long, burst` |
| 5 | Fire DoT / ignite | `fire, instant, short, dot, burn` |
| 6 | Frost single-target bolt | `frost, projectile, long, burst` |
| 7 | Frost AoE nova / storm | `frost, nova, short, burst, freeze` |
| 8 | Frost lane / line spikes | `frost, projectile, short, burst, freeze` |
| 9 | Ice Wall / shatter wall | `frost, ground, short, control, defense` |
| 10 | Lightning single-target | `storm, projectile, long, burst, shock` |
| 11 | Lightning AoE / chain storm | `storm, ground, long, burst, shock` |
| 12 | Earth / stone single | `physical, projectile, long, burst` |
| 13 | Earth AoE / quake | `physical, ground, short, burst` |
| 14 | Holy single-target nuke | `holy, projectile, long, burst` |
| 15 | Holy AoE / exorcism zone | `holy, ground, short, burst` |
| 16 | Shadow / ghost nuke | `shadow, projectile, long, burst` |
| 17 | Poison single-target sting | `poison, projectile, short, dot` |
| 18 | Poison AoE / cloud | `poison, ground, short, dot` |
| 19 | Blood drain / lifesteal nuke | `blood, projectile, short, sustain, lifesteal` |
| 20 | Melee single-target burst | `physical, melee, close, burst` |
| 21 | Melee cleave / spinning AoE | `physical, melee, close, sustain` |
| 22 | Ranged physical single | `physical, projectile, long, burst` |
| 23 | Ranged AoE volley | `physical, projectile, long, sustain` |
| 24 | Gun / crossbow special | `physical, projectile, long, burst` |
| 25 | Execute / %HP finisher | `physical, melee, short, burst, execute` |
| 26 | Combo builder / chain skill | `physical, melee, close, combo, opener` |
| 27 | Channeled nuke / beam | `arcane, channel, long, burst` |
| 28 | Bleed / wound melee | `physical, melee, close, dot, bleed` |
| 29 | Counter / riposte strike | `physical, melee, close, burst, breaker` |
| 30 | Self-damage / kamikaze nuke | `physical, nova, close, burst` |

### Details

### #1 Fire single-target bolt

- **Tags:** `fire, projectile, long, burst`
- **RO:** Mage: Fire Bolt, Soul Strike (fire part); Sage: Hindsight (fire); Warlock: Summon Fire Ball (enabler); Super Novice: Fire Bolt;
  Hyper Novice: Self Study Sorcery (fire)
- **ToS:** Wizard-Pyromancer: Fireball (thrown/unit), Flare (vs burning); Wizard-Elementalist: Meteor (single-target use), Storm Dust (fire);
  Wizard-Taoist: Storm Calling (fire synergy); Wizard-Onmyoji: Fire Fox Shikigami
- **CoA:** Pyromancer: Fireball, Immolate; Sun Cleric: Solar Wrath; Knight of Xoroth: Deathfire Bolt
- **Notes:** Canonical `[fire, projectile, long, burst]` row. RO bolts scale hits by level; ToS Fireball is a kickable ground object (unique).

### #2 Fire small AoE splash

- **Tags:** `fire, projectile, short, burst`
- **RO:** Mage: Fire Ball (5×5 splash); Alchemist: Bomb (Acid Terror splash); Mechanic: Arm Cannon (fire ammo); Gunslinger: Desperado (splash), Full Blast
- **ToS:** Wizard-Pyromancer: Fire Pillar (column AoE), Hell Breath (cone); Archer-Cannoneer: Cannon Shot; Archer-Matross: Artillery;
  Scout-Bullet Marker: Napalm Bullet, Bloody Overdrive
- **CoA:** Pyromancer: Flame Patch, Conflagrate; Tinker: Deploy Bomb, Explosive Shot; Witch Hunter: Fire-Glazed Blade
- **Notes:** Splash-on-impact nukes. RO Fire Ball is the textbook example.

### #3 Fire ground field / wall

- **Tags:** `fire, ground, short, dot, burn`
- **RO:** Mage: Fire Wall (vertical wall, hits); Wizard: Fire Pillar (trap-like DoT); Sorcerer: Warmer (fire field); Elemental Master: Conflagration (field)
- **ToS:** Wizard-Pyromancer: Flame Ground, Fire Wall; Wizard-Elementalist: Fire Pillar; Wizard-Terramancer: Ember Field
- **CoA:** Pyromancer: Living Bomb field, Phoenix Feather ground heal (heal variant, see #51); Tinker: Napalm Pool
- **Notes:** Persistent decals. RO Fire Wall blocks + damages (control overlap, see #38). Frost Cloud primary see #7.

### #4 Fire meteor / sky nuke

- **Tags:** `fire, ground, long, burst`
- **RO:** Wizard: Meteor Storm (7×7, stun); Warlock: Crimson Rock, Comet (all-element); Arch Mage: Crimson Arrow, All Bloom, Floral Flare Road
- **ToS:** Wizard-Elementalist: Meteor; Archer-Cannoneer: Siege Burst; Archer-Matross: Orbital strike skills; Wizard-Taoist: Eradication (meteor-like)
- **CoA:** Pyromancer: Meteorfall; Sun Cleric: Sunfall; Primalist: Volcanic Eruption
- **Notes:** Big ground-targeted burst. `ground` delivery distinguishes from #1.

### #5 Fire DoT / ignite

- **Tags:** `fire, instant, short, dot, burn`
- **RO:** Alchemist: Acid Terror (fire-ish chem DoT); Genetic: Fire Expansion (of Hell Plant); Rebellion: Dragon Tail (burn ammo)
- **ToS:** Wizard-Pyromancer: Enchant Fire (weapon ignite), Flare (detonates burn); Cleric-Plague Doctor: Incinerate (spread burn); Wizard-Bokor: Damballa (burn zombies)
- **CoA:** Pyromancer: Ignite, Sear; Bloodmage: Sanguine Burn; Felsworn: Immolate Aura
- **Notes:** Pure `burn`-mode rows feed augment `allowTags: [fire]`.

### #6 Frost single-target bolt

- **Tags:** `frost, projectile, long, burst`
- **RO:** Mage: Cold Bolt; Sage: Hindsight (water); Warlock: Summon Water Ball (enabler), Jack Frost (single); Super Novice: Cold Bolt
- **ToS:** Wizard-Cryomancer: Ice Bolt; Wizard-Elementalist: Hail (bolt stream); Wizard-Onmyoji: Water Shikigami
- **CoA:** Stormbringer: Ice Shard; Chronomancer: Glacial Rewind; Primalist: Frostbite
- **Notes:** Mirror of #1 for frost.

### #7 Frost AoE nova / storm

- **Tags:** `frost, nova, short, burst, freeze`
- **RO:** Wizard: Frost Nova (self-centered), Storm Gust (area blizzard + freeze); Warlock: Frost Misty (wide freeze field); Arch Mage: Frozen Slash, Rain of Crystal
- **ToS:** Wizard-Cryomancer: Ice Blast (vs frozen AoE), Snow Rolling (rolling nova); Wizard-Elementalist: Frost Cloud; Wizard-Keraunos: Blizzard Drive
- **CoA:** Stormbringer: Icequake, Blizzard; Primalist: Avalanche; Chronomancer: Time Frost
- **Notes:** PBAoE + placed blizzards. `freeze`-mode overlap with control (#31).

### #8 Frost lane / line spikes

- **Tags:** `frost, projectile, short, burst, freeze`
- **RO:** Wizard: Water Ball (line, needs water); Sorcerer: Varetyr Spear (water/earth lane); Arch Mage: Crystal Impact
- **ToS:** Wizard-Cryomancer: Ice Pike (line spikes); Wizard-Rune Caster: Rune of Ice (line); Wizard-Taoist: reduced-lane charms
- **CoA:** Stormbringer: Glacial Lance; Guardian: Frozen Advance
- **Notes:** Direction-targeter spikes. Distinct from nova by shape.

### #9 Ice Wall / shatter wall

- **Tags:** `frost, ground, short, control, defense`
- **RO:** Wizard: Ice Wall (5-cell wall, blocks); Sorcerer: Extreme Vacuum (wall-ish hold, see #38); Arch Mage: Mystery Illusion (wall)
- **ToS:** Wizard-Cryomancer: Ice Wall (melee-shatter fragments), Subzero Shield; Wizard-Sage: Ice Wall (via Missile Hole synergy — shattered with Psychic Pressure)
- **CoA:** Stormbringer: Glacier Wall; Guardian: Bulwark of Ice; Chronomancer: Stasis Field
- **Notes:** Wall-as-weapon (ToS shatter) vs wall-as-cover (RO). Both `ground` + `control`.

### #10 Lightning single-target

- **Tags:** `storm, projectile, long, burst, shock`
- **RO:** Mage: Lightning Bolt; Wizard: Jupitel Thunder (multi-hit + knockback); Warlock: Chain Lightning (single bounce start); Super Novice: Lightning Bolt
- **ToS:** Cleric-Krivis: Zaibas (lightning strikes); Wizard-Elementalist: Electrocute (single); Wizard-Taoist: Storm Calling (single), Zaibas (charm);
  Wizard-Keraunos: Lightning Strike
- **CoA:** Stormbringer: Lightning Bolt, Static Discharge; Tinker: Shock Round; Witch Hunter: Shock Cartridge
- **Notes:** `shock`-mode single bolts. RO Jupitel = iconic multi-hit.

### #11 Lightning AoE / chain storm

- **Tags:** `storm, ground, long, burst, shock`
- **RO:** Mage: Thunderstorm (area); Wizard: Lord of Vermilion (9×9); Warlock: Chain Lightning (bounce), Earth Strain (wind);
  Arch Mage: Storm Cannon, Destructive Hurricane, Tornado Storm
- **ToS:** Wizard-Elementalist: Electrocute (ground field), Storm Dust; Wizard-Taoist: Eradication, Storm Calling (spread); Cleric-Krivis: Zaibas (multi-hit zone);
  Wizard-Keraunos: Chain Volta
- **CoA:** Stormbringer: Chain Lightning, Tempest, Eye of the Storm; Sun Cleric: Wrath of Heaven (holy-storm)
- **Notes:** Storm callers. ToS Krivis Zaibas is the priest-flavored entry.

### #12 Earth / stone single

- **Tags:** `physical, projectile, long, burst`
- **RO:** Mage: Stone Curse (earth + petrify); Wizard: Earth Spike (up to 5 hits); Sorcerer: Diamond Dust (earth/water); Elemental Master: Elemental Buster (earth)
- **ToS:** Wizard-Terramancer: Stone Spike, Earthen Prison (single); Wizard-Sage: Micro Dimension (crush single); Swordsman-Murmillo: Headbutt (earth-flavored stun)
- **CoA:** Primalist: Stone Spike, Boulder Toss; Guardian: Heavy Slam
- **Notes:** Earth-as-`physical` per whitelist (no earth element, earth flavor). Petrify overlap #33.

### #13 Earth AoE / quake

- **Tags:** `physical, ground, short, burst`
- **RO:** Wizard: Heaven's Drive (5×5); Warlock: Earth Strain (wide DoT), Sienna Execrate (earth bind); Arch Mage: Stratum Tremor, Violent Quake, Rock Down
- **ToS:** Wizard-Terramancer: Earthquake, Rolling Stone; Wizard-Elementalist: Stone Rain (via attributes); Swordsman-Barbarian: Seism, Stomping Kick
- **CoA:** Primalist: Earthquake, Landslide; Guardian: Shockwave; Barbarian: Earthshaker
- **Notes:** Ground-quake shape. `ground` delivery unites them.

### #14 Holy single-target nuke

- **Tags:** `holy, projectile, long, burst`
- **RO:** Acolyte: Holy Light, Turn Undead (vs undead nuke), Ruwach; Priest: Aspersio-boosted; Arch Bishop: Judex; Cardinal: Arbitrium, Framen
- **ToS:** Cleric-Priest: Aspersion (holy damage), Exorcise (Chaplain); Cleric-Chaplain: Aspergillum; Cleric-Exorcist: Rubric, Entity; Cleric-Crusader: Smite (holy)
- **CoA:** Sun Cleric: Holy Smite, Searing Light; Starcaller: Moonfire (lunar-holy); Guardian: Consecrated Blow
- **Notes:** Undead-slayer nukes. RO Turn Undead = level-based execute (see #25).

### #15 Holy AoE / exorcism zone

- **Tags:** `holy, ground, short, burst`
- **RO:** Priest: Magnus Exorcismus (undead/demon zone); Arch Bishop: Adoramus; Cardinal: Effligo; Crusader: Grand Cross (self AoE)
- **ToS:** Cleric-Exorcist: Gregorate, Koinonia, Katadikazo; Cleric-Miko: Hamaya (holy circle); Cleric-Inquisitor: God Smash (AoE slam); Cleric-Crusader: Holy Ground
- **CoA:** Sun Cleric: Hallow, Solar Flare zone; Starcaller: Lunar Eclipse; Guardian: Consecrated Ground
- **Notes:** Consecrated-ground nukes. Grand Cross self-damage = HP-cost precedent.

### #16 Shadow / ghost nuke

- **Tags:** `shadow, projectile, long, burst`
- **RO:** Mage: Napalm Beat (ghost), Soul Strike (ghost multi); Wizard: Napalm Vulcan (trans);
  Warlock: Soul Expansion (ghost AoE), Drain Life, Hell Inferno (shadow/fire), White Imprison (setup); Arch Mage: Soul Vulcan Strike, Deadly Projection
- **ToS:** Wizard-Warlock: Dark Theurge, Evil Sacrifice, Mastema (shadow); Wizard-Shadowmancer: Shadow Thorn, Shadow Condensation, Shadow Eruption;
  Wizard-Bokor: Effigy (curse nuke), Hexing (setup); Cleric-Zealot: Immolation (shadow self-burn)
- **CoA:** Cultist: Void Bolt, Mind Flay; Reaper: Lament, Soul Rend; Felsworn: Chaos Bolt, Shadow Cleave
- **Notes:** Ghost/shadow line. RO Napalm family = the oldest shadow kit.

### #17 Poison single-target sting

- **Tags:** `poison, projectile, short, dot`
- **RO:** Thief: Envenom; Assassin: Enchant Poison (enabler), Venom Dust (area, see #18); Guillotine Cross: Venom Impression (setup); Super Novice: Envenom
- **ToS:** Archer-Wugushi: Needle Blow, Wugong Gu (single poison); Scout-Rogue: Vendetta (poison dagger); Wizard-Featherfoot: Bone Pointing (curse-poison)
- **CoA:** Venomancer: Sting, Envenom; Witch Doctor: Hex Venom; Ranger: Viper Shot
- **Notes:** Applied-poison openers. `dot` + single target.

### #18 Poison AoE / cloud

- **Tags:** `poison, ground, short, dot`
- **RO:** Assassin: Venom Dust (poison cloud); Alchemist: Acid Demonstration (acid AoE); Genetic: Hell Plant (poison summon-field), Fire Expansion;
  Guillotine Cross: Poisoning Weapon (cloud)
- **ToS:** Archer-Wugushi: Bewitch, Jincan Gu, Zhendu (poison spread); Cleric-Plague Doctor: Black Death Steam, Incinerate (spread); Scout-Rangda: Miasma
- **CoA:** Venomancer: Plague Cloud, Swarm Cloud; Witch Doctor: Voodoo Puddle (poison field); Necromancer: Plague Nova
- **Notes:** Poison zones. ToS Wugushi = the poison specialist tree.

### #19 Blood drain / lifesteal nuke

- **Tags:** `blood, projectile, short, sustain, lifesteal`
- **RO:** Warlock: Drain Life (drain DoT); Ninja: Shadow Slash (blood-ish); Rebellion: Bloodsucker (HP drain ammo); Kagerou: Soul Deprivation
- **ToS:** Wizard-Featherfoot: Blood Sucking, Blood Bath, Kurdaitcha (bleed-drain), Ngadhundi; Cleric-Zealot: Blind Faith (blood cost nuke); Swordsman-Luchador: Bloodsport
- **CoA:** Bloodmage: Drain Life, Crimson Drain; Reaper: Reap (scythe + heal); Venomancer: Leech Swarm
- **Notes:** HP-as-resource loop (CoA Reaper precedent). `lifesteal` mode.

### #20 Melee single-target burst

- **Tags:** `physical, melee, close, burst`
- **RO:** Swordman: Bash; Knight: Brandish Spear (single), Pierce; Crusader: Grand Cross (single-ish); Assassin: Sonic Blow; Monk: Triple Attack, Occult Impaction;
  Champion: Guillotine Fist (Asura Strike); Guillotine Cross: Cross Ripper Slasher
- **ToS:** Swordsman-Swordsman: Bash, Thrust; Swordsman-Highlander: Cartar Stroke, Skull Swing; Swordsman-Fencer: Sept Etoiles, Attaque Composee, Lunge;
  Swordsman-Monk (Cleric): Double Punch, Palm Strike, One Inch Punch, God Finger Flick; Swordsman-Nak Muay: straight/hook strikes
- **CoA:** Templar: Shield Slam, Riposte; Barbarian: Pulverize, Cleave; Guardian: Linebreaker; Knight of Xoroth: Mortal Strike
- **Notes:** Bread-and-butter weapon hits. `melee` + `close`. Champion Guillotine Fist = SP-gated nuke (execute overlap, see #25).

### #21 Melee cleave / spinning AoE

- **Tags:** `physical, melee, close, sustain`
- **RO:** Swordman: Magnum Break (fire cleave); Knight: Bowling Bash, Brandish Spear (splash); Rune Knight: Dragon Breath (cone), Storm Blast; Royal Guard: Genesis Ray
- **ToS:** Swordsman-Barbarian: Cleave, Aggressor; Swordsman-Doppelsoeldner: Cyclone, Zornhau, Punish, Redel; Swordsman-Hackapell: Skarphuggning;
  Swordsman-Blossom Blader: sweep skills; Swordsman-Highlander: Moulinet, Cross Cut
- **CoA:** Barbarian: Whirlwind, Sweeping Strikes; Templar: Whirling Blade; Guardian: Arc Sweep; Felsworn: Fel Cleave
- **Notes:** Direction/nova melee. RO Bowling Bash bounce = proto-cleave.

### #22 Ranged physical single

- **Tags:** `physical, projectile, long, burst`
- **RO:** Archer: Double Strafe; Hunter: Blitz Beat (falcon, see #66); Sniper: Focused Arrow Strike; Ranger: Aimed Bolt; Rebellion: Round Trip
- **ToS:** Archer-Archer: Twin Arrow, Oblique Shot (bounce single); Archer-Ranger: Critical Shot, Spiral Arrow; Archer-Musketeer: Headshot, Snipe;
  Archer-Arquebusier: aimed shots; Scout-Bullet Marker: Smash Bullet, Tracer Bullet
- **CoA:** Ranger: Aimed Shot, Snipe; Witch Hunter: Headshot, Twin Fangs; Tinker: Gunslinger shot
- **Notes:** Aim-and-fire single. ToS Oblique bounce = augments preview.

### #23 Ranged AoE volley

- **Tags:** `physical, projectile, long, sustain`
- **RO:** Archer: Arrow Shower; Sniper: Arrow Storm (wide), Wind Walk (buff); Ranger: Arrow Storm, Aimed Bolt (AoE); Maestro: Severe Rainstorm
- **ToS:** Archer-Archer: Multi Shot; Archer-Ranger: Arrow Shower, Bounce Shot, Steady Aim; Archer-Mergen: Homing Arrow, Spread Shot, Triple Arrow, Zenith;
  Archer-Cannoneer: Cannon Shot, Shootdown
- **CoA:** Ranger: Multi-Shot, Volley; Tinker: Barrage, Flak Cannon; Witch Hunter: Grapeshot
- **Notes:** Arrow-hose rows. RO Arrow Storm = the namesake.

### #24 Gun / crossbow special

- **Tags:** `physical, projectile, long, burst`
- **RO:** Gunslinger: Piercing Shot, Rapid Shower, Desperado, Full Blast, Spread Attack, Tracking, Disarm, Wounding Shot;
  Rebellion: Round Trip, Dragon Tail, Fire Dance, God's Hammer, Howling Mine, Slug Shot; Night Watch: all firearms
- **ToS:** Archer-Musketeer: Snipe, Covering Fire, Birdfall, Butt Stroke, Headshot; Archer-Cannoneer: Bazooka, Cannon Barrage;
  Scout-Bullet Marker: full kit (Double Gun Stance, Bloody Overdrive, Napalm Bullet); Scout-Sheriff: fan-fire skills; Scout-Outlaw: Mangle (gun)
- **CoA:** Tinker: Gunslinger, Loaded Rounds, Sniper Round; Witch Hunter: Dual Crossbows volley, Musket Blast; Ranger: Black Powder Shot
- **Notes:** Firearm fantasy. CoA `Rounds` resource lives here.

### #25 Execute / %HP finisher

- **Tags:** `physical, melee, short, burst, execute`
- **RO:** Assassin: Grimtooth (bleed-execute-ish); Guillotine Cross: Rolling Cutter (low-HP bonus); Sura: Tiger Cannon (HP-gated); Inquisitor: Oleum Sanctum (execute)
- **ToS:** Swordsman-Assassin: Behead, Annihilation (execute); Swordsman-Nak Muay: KO strike; Scout-Rogue: Backstab (positional execute);
  Cleric-Kabbalist: Clone (damage-copy execute setup)
- **CoA:** Templar: Execute (requires Exposed); Reaper: Harvest Soul (<30% bonus); Bloodmage: Exsanguinate
- **Notes:** `execute`-mode row. Feeds Templar Opener→Followup→Breaker chain.

### #26 Combo builder / chain skill

- **Tags:** `physical, melee, close, combo, opener`
- **RO:** Monk: Triple Attack (combo starter), Chain Combo; Star Emperor: Solar/Lunar/Stellar attacks (stance cycle); Shinkiro/Shiranui: combo charms;
  Sky Emperor: Celestial combo
- **ToS:** Swordsman-Monk: Double Punch → Palm Strike → Hand Knife (chain); Swordsman-Nak Muay: combo strings; Swordsman-Matador: Faena → Muleta → Corrida Finale;
  Swordsman-Fencer: Epee Garde chains
- **CoA:** Templar: Shield Slam [sets Off-Balance], Riposte [requires Off-Balance]; Barbarian: Opening Strikes; Knight of Xoroth: Chain Pull → Impale
- **Notes:** `opener/followup/breaker` flags live here. Monk Triple Attack = the RO original.

### #27 Channeled nuke / beam

- **Tags:** `arcane, channel, long, burst`
- **RO:** Warlock: Tetra Vortex (elemental combo nuke), Comet; Sorcerer: Varetyr Spear; Arch Mage: Astral Strike; Soul Reaper: Soul Curse (channel)
- **ToS:** Wizard-Elementalist: Hail (channeled); Wizard-Psychokino: Psychic Pressure (hold beam), Gravity Pole (hold); Wizard-Onmyoji: Toyou (channeled);
  Cleric-Exorcist: Koinonia (channeled)
- **CoA:** Runemaster: Arcane Barrage (channeled), Rune Beam; Stormbringer: Storm Channel; Cultist: Drain Mind
- **Notes:** Hold-to-fry. `channel` delivery. RO Tetra Vortex = multi-element setup payoff.

### #28 Bleed / wound melee

- **Tags:** `physical, melee, close, dot, bleed`
- **RO:** Assassin: Grimtooth (bleed); Guillotine Cross: Cross Ripper Slasher (bleed); Abyss Chaser: Frenzy Shot (bleed)
- **ToS:** Swordsman-Highlander: Cross Cut (bleed), Vertical Slash; Swordsman-Corsair: Dust Devil (bleed); Swordsman-Lancer: Crush (bleed); Scout-Ardito: bleed daggers
- **CoA:** Barbarian: Rend, Deep Cuts; Bloodmage: Hemorrhage; Witch Hunter: Serrated Blade
- **Notes:** `bleed`-mode sustain damage.

### #29 Counter / riposte strike

- **Tags:** `physical, melee, close, burst, breaker`
- **RO:** Knight: Counter Attack; Crusader: Shield Reflect (see #55); Royal Guard: Shield Spell (counter); Guillotine Cross: Weapon Blocking (counter);
  Star Emperor: Solar Protection (counter stance)
- **ToS:** Swordsman-Peltasta: Umbo Blow (block-counter), Butterfly (evade-counter); Swordsman-Rodelero: Shield Charge (counter); Swordsman-Murmillo: Scutum Hit;
  Swordsman-Fencer: Flanconnade (parry-riposte)
- **CoA:** Templar: Riposte [requires Off-Balance]; Guardian: Retaliate; Knight of Xoroth: Vengeful Hook
- **Notes:** Block-then-punish. `breaker` flag consumers.

### #30 Self-damage / kamikaze nuke

- **Tags:** `physical, nova, close, burst`
- **RO:** Alchemist: Acid Demonstration (self-splash risk); Mechanic: Self Destruction (Madogear detonate); Hyper Novice: Self-Destruction
- **ToS:** Swordsman-Barbarian: Frenzy (HP drain); Scout-Shinobi: Mijin no Jutsu (self-explode clone); Cleric-Zealot: Immolation (self-burn nuke);
  Swordsman-Luchador: self-slam
- **CoA:** Cultist: Insanity burst (100-stack self-damage + nuke); Reaper: Soul Sacrifice; Felsworn: Demonic Detonation
- **Notes:** HP-as-cost nukes. Cultist Insanity = the canonical risk meter.

---

## B. Control (crowd control + space)

Hard and soft control: freeze, stun, fear, sleep, silence, pull, knockback, root, taunt, dispel, links.

### Index

| # | Function | Tags |
|---|---|---|
| 31 | Freeze / chill lockdown | `frost, instant, short, control, freeze` |
| 32 | Stun / shock lockdown | `storm, instant, short, control, shock` |
| 33 | Petrify / statue lockdown | `arcane, instant, short, control, root` |
| 34 | Stun shout / warcry | `physical, shout, short, control` |
| 35 | Fear / horror scatter | `shadow, shout, short, control, fear` |
| 36 | Sleep / charm incapacitate | `arcane, instant, short, control, charm` |
| 37 | Silence / mute lockout | `arcane, instant, long, control` |
| 38 | Ground denial / vacuum hold | `arcane, ground, short, control, pull` |
| 39 | Knockback / knockdown | `physical, instant, short, control, knockback` |
| 40 | Root / snare field | `nature, ground, short, control, root` |
| 41 | Slow / chill aura field | `frost, ground, short, control` |
| 42 | Taunt / forced aggro | `physical, shout, short, control` |
| 43 | Dispel / strip control | `arcane, instant, short, control, breaker` |
| 44 | Link / damage-share | `arcane, instant, long, control` |
| 45 | Blind / curse accuracy-down | `shadow, instant, short, control` |
| 46 | Time stop / hard lockdown | `arcane, instant, short, control` |

### Details

### #31 Freeze / chill lockdown

- **Tags:** `frost, instant, short, control, freeze`
- **RO:** Mage: Frost Diver (freeze); Wizard: Storm Gust (freeze), Frost Nova (freeze); Warlock: Freezing Spell (store), Frost Misty, Jack Frost; Arch Mage: Frozen Slash
- **ToS:** Wizard-Cryomancer: Ice Bolt (freeze chance), Ice Pike (freeze), Frost Pillar (freeze tree), Ice Blast (detonate frozen); Wizard-Elementalist: Hail (chill);
  Wizard-Rune Caster: Rune of Ice
- **CoA:** Stormbringer: Deep Freeze; Chronomancer: Temporal Freeze; Primalist: Permafrost
- **Notes:** `freeze`-mode core. RO Frost Diver + Lightning Bolt combo = the classic.

### #32 Stun / shock lockdown

- **Tags:** `storm, instant, short, control, shock`
- **RO:** Swordman: Fatal Blow (Bash stun); Mage: Thunderstorm (stun); Wizard: Meteor Storm (stun), Lord of Vermilion (stun); Monk: Occult Impaction (stun);
  Mechanic: Pile Bunker (stun)
- **ToS:** Cleric-Priest: Monstrance (shock-ish); Swordsman-Hoplite: Spear Throw (stun); Swordsman-Barbarian: Helm Chopper (stun), Seism (stun);
  Wizard-Taoist: Upper Level (stun charm); Scout-Quarrel Shooter: Stone Shot (stun)
- **CoA:** Stormbringer: Static Shock; Guardian: Shield Bash (stun); Tinker: Concussion Round
- **Notes:** `shock`-mode stuns. Distinguish from freeze by element tag.

### #33 Petrify / statue lockdown

- **Tags:** `arcane, instant, short, control, root`
- **RO:** Mage: Stone Curse (petrify); Warlock: Sienna Execrate (earth bind); Sorcerer: Arrullo (deep sleep, see #36)
- **ToS:** Cleric-Dievdirbys: Zemyna (root statue); Wizard-Sage: Micro Dimension (hold); Scout-Linker: Hangman's Knot (root-ish); Cleric-Oracle: Death Sentence (doom)
- **CoA:** Primalist: Petrify, Stone Prison; Witch Doctor: Petrify Hex; Cultist: Flesh to Stone
- **Notes:** Stone-prison family. RO Stone Curse needs Red Gemstone (cost design).

### #34 Stun shout / warcry

- **Tags:** `physical, shout, short, control`
- **RO:** Swordman: Provoke (taunt-aggro, see #53); Sura: Lion's Howl, Gentle Touch; Royal Guard: Battle Orders
- **ToS:** Swordsman-Swordsman: Liberate (shout-taunt); Swordsman-Barbarian: Warcry (debuff shout), Stomping Kick (shout-stun); Swordsman-Templar: Battle Orders;
  Archer-Pied Piper: Dissonanz (sonic control)
- **CoA:** Barbarian: Battle Shout, Intimidating Roar; Guardian: Challenging Shout, Banner of Haste; Knight of Xoroth: Dread Howl
- **Notes:** `shout`-delivery control. Warcry debuffs = soft control.

### #35 Fear / horror scatter

- **Tags:** `shadow, shout, short, control, fear`
- **RO:** Warlock: White Imprison (trap-fear-ish); Shadow Cross: Shadow Sense (fear); Abyss Chaser: Masquerade-Weakness (fear-ish); Night Watch: Panic (fear grenade)
- **ToS:** Wizard-Warlock: Ghastly Trail (fear), Mastema (fear); Wizard-Shadowmancer: Shadow Pool (fear); Wizard-Bokor: Hexing (fear);
  Archer-Pied Piper: Wiegenlied (sleep, see #36)
- **CoA:** Necromancer: Terrify, Howl of the Dead (fear); Cultist: Whispers of Madness; Knight of Xoroth: Fearsome Charge
- **Notes:** `fear`-mode scatter. Necromancer owns fear in CoA.

### #36 Sleep / charm incapacitate

- **Tags:** `arcane, instant, short, control, charm`
- **RO:** Dancer: Scream (sleep-ish); Bard: Lullaby (sleep); Sorcerer: Arrullo (deep sleep); Minstrel/Wanderer: Deep Sleep Lullaby
- **ToS:** Archer-Pied Piper: Wiegenlied (sleep), Hypnotische Floete (charm); Wizard-Psychokino: Raise (lift-sleep-ish); Cleric-Oracle: Prophecy (sleep resist);
  Scout-Enchanter: Haziness (charm)
- **CoA:** Witch Doctor: Hex Sleep, Charm Beast; Cultist: Dominate Mind; Venomancer: Sedative Sting
- **Notes:** Bard-song sleeps (RO) vs flute sleeps (ToS). `charm` mode.

### #37 Silence / mute lockout

- **Tags:** `arcane, instant, long, control`
- **RO:** Sage: Spell Breaker (interrupt); Professor: Mind Breaker (SP-burn silence-ish); Warlock: Stasis (magic block); Troubadour: Song of Despair (silence song)
- **ToS:** Cleric-Oracle: Counter Spell (magic immunity); Cleric-Pardoner: Discerning Evil (debuff-silence); Wizard-Sage: Missile Hole (spell-eat);
  Scout-Rogue: Lachrymator (silence powder)
- **CoA:** Witch Doctor: Silencing Hex; Cultist: Void Silence; Templar: Rebuke
- **Notes:** Anti-caster control. RO Spell Breaker = the iconic interrupt.

### #38 Ground denial / vacuum hold

- **Tags:** `arcane, ground, short, control, pull`
- **RO:** Wizard: Ganbantein (clear ground); Warlock: Marsh of Abyss (slow field), Gravitational Field (pull-slow);
  Sorcerer: Extreme Vacuum (pull-hold), Earth Grave (bleed-field)
- **ToS:** Wizard-Psychokino: Magnetic Force (pull), Gravity Pole (hold), Raise (lift); Wizard-Sage: Ultimate Dimension (slow field);
  Wizard-Terramancer: Earthen Prison (hold); Linker: Hangman's Knot (gather)
- **CoA:** Chronomancer: Gravity Bomb (pull); Primalist: Grasping Roots; Runemaster: Gravity Rune
- **Notes:** `pull`-mode zones. Psychokino = the archetype.

### #39 Knockback / knockdown

- **Tags:** `physical, instant, short, control, knockback`
- **RO:** Mage: Thunderstorm (knockback); Wizard: Jupitel Thunder (knockback); Archer: Arrow Shower (knockback); Ranger: Warg Bite (knockdown);
  Mechanic: Arm Cannon (knockback)
- **ToS:** Swordsman-Swordsman: Bash (Knockdown attribute); Swordsman-Cataphract: Earth Wave (knockdown), Steed Charge (knockdown);
  Swordsman-Lancer: Joust (knockdown), Unhorsing; Archer-Cannoneer: Cannon Blast (knockback)
- **CoA:** Guardian: Concussive Blow; Barbarian: Punt; Tinker: Blast Wave; Ranger: Scatter Shot
- **Notes:** `knockback`-mode peels. RO Jupitel knockback disabled in WoE (good tuning note).

### #40 Root / snare field

- **Tags:** `nature, ground, short, control, root`
- **RO:** Hunter: Ankle Snare (root trap); Ranger: Electric Shock (warg root); Sorcerer: Extreme Vacuum (root); Genetic: Thorn Trap (root)
- **ToS:** Archer-Hunter: Snatching (root), Coursing (hold); Cleric-Dievdirbys: Laima (slow root); Swordsman-Retiarius: Rete (net root); Wizard-Terramancer: Root Snare
- **CoA:** Primalist: Entangling Roots; Ranger: Freezing Trap (root); Venomancer: Web Spray
- **Notes:** `root`-mode holds. RO Ankle Snare = the trap-root textbook.

### #41 Slow / chill aura field

- **Tags:** `frost, ground, short, control`
- **RO:** Wizard: Quagmire (slow all stats); Warlock: Marsh of Abyss (slow field); Sorcerer: Extreme Vacuum (slow)
- **ToS:** Wizard-Chronomancer: Slow, Stop; Wizard-Psychokino: Slow (via attributes); Archer-Quarrel Shooter: Scatter Caltrops (slow field);
  Scout-Linker: Spiritual Chain (slow share)
- **CoA:** Chronomancer: Slow Time, Time Trap (50% slow); Primalist: Muddy Ground; Stormbringer: Chilled Field
- **Notes:** Slow-fields. RO Quagmire slows + stat-drains (double duty).

### #42 Taunt / forced aggro

- **Tags:** `physical, shout, short, control`
- **RO:** Swordman: Provoke (taunt + ATK up); Crusader: Shield Reflect (aggro via damage); Paladin: Sacrifice (redirect); Royal Guard: Reflect Damage (aggro);
  Sura: Cursed Circle (aggro-hold)
- **ToS:** Swordsman-Swordsman: Liberate (threat buff), Provoke (attribute); Swordsman-Peltasta: Swash Buckling (taunt), Guardian (aggro stance);
  Swordsman-Rodelero: Shield Push (taunt); Swordsman-Templar: Aggro orders
- **CoA:** Guardian: Taunt, Linebreaker (threat); Knight of Xoroth: Challenge; Reaper: Lament (threat); Sun Cleric: Righteous Provocation
- **Notes:** Tank taunts. RO Provoke also buffs enemy ATK (risk/reward).

### #43 Dispel / strip control

- **Tags:** `arcane, instant, short, control, breaker`
- **RO:** Sage: Dispell (strip buffs); Professor: Soul Burn (SP-strip); Rogue: Divest Helm/Shield/Armor/Weapon (strip); Stalker: Full Strip;
  Shadow Chaser: Masquerade (strip-mask); Warlock: Ganbantein (clear ground)
- **ToS:** Cleric-Oracle: Counter Spell (dispel), Prophecy (debuff immunity); Cleric-Pardoner: Discerning Evil (strip debuffs);
  Cleric-Plague Doctor: Disenchant, Bloodletting (self-cleanse); Scout-Enchanter: Enchant Glove (strip-ward)
- **CoA:** Witch Doctor: Cleanse Hex, Purge; Chronomancer: Dispel Time; Cultist: Sever Bond
- **Notes:** Strip/dispel. RO Full Strip = the most feared PvP control.

### #44 Link / damage-share

- **Tags:** `arcane, instant, long, control`
- **RO:** Crusader: Devotion (damage-share); Paladin: Sacrifice (share); Soul Linker: Kaahi/Kaupe/Kaite/Kaize (spirit links); Arch Bishop: Officium (link)
- **ToS:** Scout-Linker: Joint Penalty (damage link), Hangman's Knot (gather), Spiritual Chain (buff-share), Lifeline (HP-share);
  Cleric-Kabbalist: Merkabah (link-chariot), Nachash
- **CoA:** Chronomancer: Past Self (echo link); Bloodmage: Blood Link; Starcaller: Astral Bond
- **Notes:** Damage-share links. RO Devotion = the tank-share original.

### #45 Blind / curse accuracy-down

- **Tags:** `shadow, instant, short, control`
- **RO:** Ninja: Mist Slash (blind); Guillotine Cross: Dark Claw (curse); Shiranui: Shadow Leap (blind)
- **ToS:** Scout-Rogue: Lachrymator (blind powder); Scout-Assassin: Hasisas (blind); Cleric-Oracle: Arcane Energy (curse); Wizard-Bokor: Hexing (curse);
  Archer-Appraiser: Blindside (expose-blind)
- **CoA:** Witch Doctor: Blind Hex; Cultist: Curse of Blindness; Reaper: Shroud of Night
- **Notes:** Accuracy-denial. RO Divest family pairs with this.

### #46 Time stop / hard lockdown

- **Tags:** `arcane, instant, short, control`
- **RO:** Warlock: White Imprison (freeze-target), Stasis (magic lock); Sorcerer: Arrullo (deep sleep); Cardinal: Oratio (doom-lock)
- **ToS:** Wizard-Chronomancer: Stop, Pass (reset), Quicken (haste contrast); Wizard-Psychokino: Raise (lift-lock); Scout-Linker: Lifeline (stasis-share)
- **CoA:** Chronomancer: Stop Time, Rewind Time, Past Self (echo); Cultist: Stasis Tentacle
- **Notes:** Hard stops. CoA Chronomancer owns this row.

---

## C. Support (heal · buff · shield)

Healing, shields, party buffs, cleanse, mana, imbues, redirects.

### Index

| # | Function | Tags |
|---|---|---|
| 47 | Heal single-target | `holy, instant, short, support` |
| 48 | Heal AoE / zone | `holy, ground, short, support` |
| 49 | Heal-over-time / regen | `holy, aura, self, sustain, support` |
| 50 | Resurrect / battle-rez | `holy, instant, short, support` |
| 51 | Damage shield / barrier | `holy, instant, self, defense` |
| 52 | Party ATK buff | `physical, aura, self, support` |
| 53 | Party DEF / resist buff | `holy, aura, self, support` |
| 54 | Speed / cast-speed buff | `arcane, aura, self, support` |
| 55 | Reflect / thorns | `physical, aura, self, defense` |
| 56 | Cleanse / debuff cure | `holy, instant, short, support` |
| 57 | SP / mana battery | `arcane, instant, short, support` |
| 58 | Elemental weapon imbue | `arcane, instant, self, support` |
| 59 | Stat buff / bless | `holy, instant, short, support` |
| 60 | Damage-redirect / guardian | `holy, instant, short, defense` |

### Details

### #47 Heal single-target

- **Tags:** `holy, instant, short, support`
- **RO:** Acolyte: Heal; Priest: Highness Heal; Arch Bishop: Heal, Epiclesis (zone, see #48); Cardinal: Renovatio (HoT, see #49); Super Novice: Heal
- **ToS:** Cleric-Cleric: Heal (tile), Cure; Cleric-Priest: Heal, Mass Heal (single-ish), Revive (pre-heal); Cleric-Chaplain: Deploy Capella (heal zone)
- **CoA:** Sun Cleric: Flash Heal; Starcaller: Lunar Mend; Witch Doctor: Soothing Brew; Primalist: Mend
- **Notes:** Point heals. ToS Heal tiles = positional play.

### #48 Heal AoE / zone

- **Tags:** `holy, ground, short, support`
- **RO:** Priest: Sanctuary (AoE heal zone); Arch Bishop: Epiclesis (heal + buff zone), Highness Heal (splash), Clearance, Coluceo Heal
- **ToS:** Cleric-Priest: Mass Heal, Healing Factor (Plague Doc); Cleric-Dievdirbys: Statue of Goddess Ausrine (heal statue); Cleric-Oracle: Arcane Energy (heal);
  Cleric-Miko: Clap (buff-heal)
- **CoA:** Sun Cleric: Solar Radiance (AoE); Starcaller: Moonwell; Primalist: Healing Rain; Witch Doctor: Healing Ward
- **Notes:** Heal zones. RO Sanctuary damages undead (offense overlap).

### #49 Heal-over-time / regen

- **Tags:** `holy, aura, self, sustain, support`
- **RO:** Arch Bishop: Renovatio (HoT); Royal Guard: Inspiration (regen); Summoner: Fresh Shrimp (HoT food)
- **ToS:** Cleric-Plague Doctor: Healing Factor (HoT), Beak Mask (HoT+); Cleric-Priest: Revive (delayed-save); Cleric-Kabbalist: Ein Sof (max-HP + regen);
  Cleric-Druid: Sterea Trofh (invuln-regen)
- **CoA:** Pyromancer (Phoenix): Rebirth Flame (HoT); Starcaller: Regrowth; Bloodmage: Crimson Regen; Venomancer: Symbiotic Heal
- **Notes:** HoTs. `aura` vs `instant` separates from #47.

### #50 Resurrect / battle-rez

- **Tags:** `holy, instant, short, support`
- **RO:** Priest: Resurrection; Arch Bishop: Resurrection, Epiclesis; Soul Linker: Kaizel (auto-rez buff); Spirit Handler: Spirit rebirth
- **ToS:** Cleric-Priest: Resurrection, Revive (pre-death buff); Cleric-Kabbalist: R7x (revive gamble); Cleric-Oracle: Prophecy (death-ward)
- **CoA:** Sun Cleric: Resurrection, Divine Intervention; Starcaller: Reincarnate; Chronomancer: Rewind Death
- **Notes:** Kaizel (auto-rez on hit) = the most elegant design here.

### #51 Damage shield / barrier

- **Tags:** `holy, instant, self, defense`
- **RO:** Mage: Safety Wall (melee block, N hits); Crusader: Shield Reflect (see #55); Royal Guard: Shield Spell (ward); Arch Mage: Mystery Illusion
- **ToS:** Cleric-Paladin: Barrier (magic barrier), Sanctuary (damage zone); Cleric-Priest: Stone Skin, Aspersion (defense);
  Cleric-Dievdirbys: Statue of Goddess Zemyna (SP-shield); Wizard-Sage: Missile Hole (projectile-eat)
- **CoA:** Guardian: Shield Wall, Aegis; Sun Cleric: Solar Aegis; Runemaster: Rune Ward; Starcaller: Star Shield
- **Notes:** Block-N-hits (RO Safety Wall) vs timed barriers (ToS).

### #52 Party ATK buff

- **Tags:** `physical, aura, self, support`
- **RO:** Acolyte: Blessing (STR/DEX/INT); Priest: Impositio Manus (ATK); Bard: A Poem of Bragi (cast); Arch Bishop: Clementia, Canto Candidus
- **ToS:** Cleric-Priest: Blessing, Sacrament; Cleric-Chaplain: Last Rites, Aspergillum; Swordsman-Templar: Battle Orders; Archer-Hwarang: war-drum buffs;
  Scout-Thaumaturge: Swell Hands/Right Arm (ATK)
- **CoA:** Guardian: Banner of Haste, Battle Standard; Barbarian: Ale Toast (ATK buff); Starcaller: Stellar Empowerment
- **Notes:** `aura`-delivery party buffs. RO Blessing = the timeless ATK buff.

### #53 Party DEF / resist buff

- **Tags:** `holy, aura, self, support`
- **RO:** Acolyte: Angelus (DEF); Priest: Kyrie Eleison (hit-barrier), Assumptio (hard DEF); Crusader: Guard (self), Defender (ranged-reduce);
  Royal Guard: Inspiration, Reflect Damage
- **ToS:** Swordsman-Swordsman: Bear (damage-reduce), Gung Ho (ATK — see #52); Swordsman-Peltasta: Guardian (DEF stance); Cleric-Priest: Stone Skin, Aspersion;
  Cleric-Paladin: Resist Elements; Swordsman-Rodelero: Slithering (evade)
- **CoA:** Guardian: Defensive Stance, Rallying Cry; Sun Cleric: Bulwark of Dawn; Primalist: Stoneskin Totem
- **Notes:** DEF auras + stances. RO Assumptio = hard-mitigation king.

### #54 Speed / cast-speed buff

- **Tags:** `arcane, aura, self, support`
- **RO:** Bard: A Poem of Bragi (cast-delay cut); Archer: Wind Walk (move+); Priest: Suffragium (fixed-cast cut), Increase AGI; Arch Bishop: Canto Candidus (move);
  Sorcerer: Striking (cast)
- **ToS:** Wizard-Chronomancer: Quicken (attack speed), Haste (move); Wizard-Thaumaturge: Swell Body (speed-ish); Scout-Enchanter: Agility;
  Archer-Archer: Swift Step (move + evade)
- **CoA:** Guardian: Banner of Haste; Chronomancer: Haste Time; Ranger: Hunting Horn (speed); Barbarian: Swift Ale
- **Notes:** Haste family. RO Bragi = the legendary caster-enabler.

### #55 Reflect / thorns

- **Tags:** `physical, aura, self, defense`
- **RO:** Crusader: Shield Reflect; Royal Guard: Reflect Damage; Genetic: Thorn Trap (reflect-ish)
- **ToS:** Swordsman-Peltasta: Butterfly (reflect attribute), High Guard (reflect); Swordsman-Rodelero: Shield Charge (reflect); Swordsman-Murmillo: Cassis Crista (reflect);
  Cleric-Inquisitor: Iron Maiden (reflect)
- **CoA:** Guardian: Spiked Bulwark, Retaliation Stance; Knight of Xoroth: Hellish Rebuke; Templar: Mirror Guard
- **Notes:** Damage-mirror tanks. `aura` + `defense`.

### #56 Cleanse / debuff cure

- **Tags:** `holy, instant, short, support`
- **RO:** Acolyte: Cure (silence/chaos cure); Arch Bishop: Clearance, Lauda Agnus, Lauda Ramus; Royal Guard: King's Grace (cleanse)
- **ToS:** Cleric-Priest: Cure (status tiles); Cleric-Oracle: Prophecy (immunity), Counter Spell (magic cleanse);
  Cleric-Plague Doctor: Bloodletting (self-cleanse), Fumigate (cleanse); Cleric-Pardoner: Indulgentia (cleanse)
- **CoA:** Witch Doctor: Purify Brew; Sun Cleric: Cleanse; Starcaller: Lunar Purge; Primalist: Purifying Waters
- **Notes:** Status-cure. RO Cure (Acolyte) = level-1 must-have.

### #57 SP / mana battery

- **Tags:** `arcane, instant, short, support`
- **RO:** Mage: Increase SP Recovery; Professor: Soul Burn (SP burn); Arch Bishop: Epiclesis (SP regen); Bard: Magic Strings (SP-cost cut)
- **ToS:** Cleric-Dievdirbys: Statue of Goddess Zemyna (SP regen); Cleric-Kabbalist: Ein Sof (SP sustain); Cleric-Oracle: Arcane Energy (SP);
  Scout-Squire: Refreshment Table (SP food)
- **CoA:** Starcaller: Mana Infusion; Runemaster: Mana Rune; Chronomancer: Time Battery
- **Notes:** SP economy. RO Magic Strings + Bragi = caster logistics.

### #58 Elemental weapon imbue

- **Tags:** `arcane, instant, self, support`
- **RO:** Sage: Endow Blaze/Quake/Tsunami/Whirlwind (weapon element); Soul Linker: Alchemist Spirit (weapon); Royal Guard: Shield Spell (element)
- **ToS:** Scout-Enchanter: Enchant Fire, Enchant Lightning, Enchant Glove; Cleric-Chaplain: Aspergillum (holy imbue), Last Rites;
  Cleric-Priest: Aspersion (holy), Sacrament (holy)
- **CoA:** Runemaster: Rune Infusion (element); Bloodmage: Blood Weapon; Witch Hunter: Fire-Glazed Blade, Frost-Glazed Blade
- **Notes:** Weapon-element buffs. RO Endows = party logistics puzzle.

### #59 Stat buff / bless

- **Tags:** `holy, instant, short, support`
- **RO:** Acolyte: Blessing (STR/DEX/INT), Increase AGI (AGI); Priest: Impositio Manus; Arch Bishop: Clementia (all-stats)
- **ToS:** Cleric-Priest: Blessing, Monstrance (DEX); Scout-Thaumaturge: Swell Body/Hands/Left Arm/Right Arm, Shrink Body; Cleric-Miko: Kagura (dance buff);
  Archer-Hwarang: chant buffs
- **CoA:** Guardian: War Horn (stats); Barbarian: Ale Feast (stats); Starcaller: Blessing of Elune
- **Notes:** Raw-stat buffs. ToS Thaumaturge Swell = the stat-swell specialist.

### #60 Damage-redirect / guardian

- **Tags:** `holy, instant, short, defense`
- **RO:** Crusader: Devotion (take ally damage); Paladin: Sacrifice (HP-share); Royal Guard: King's Grace (redirect); Mechanic: Magnetic Field (absorb)
- **ToS:** Swordsman-Peltasta: Guardian (protect stance); Swordsman-Templar: Non-Invasive Area (protect zone); Cleric-Paladin: Sanctuary (protect zone), Barrier;
  Scout-Squire: Arrest (protect-hold)
- **CoA:** Guardian: Intervene, Shield Wall (ally); Knight of Xoroth: Hellguard (ally shield); Templar: Guard Ally
- **Notes:** Bodyguard skills. RO Devotion = 5-target share (legendary).

---

## D. Summon (pets · turrets · plants)

Minions, turrets, traps, companions, plants, clones, mounts, tames.

### Index

| # | Function | Tags |
|---|---|---|
| 61 | Melee minion swarm | `physical, minion, short, summon` |
| 62 | Ranged minion / caster pet | `arcane, minion, long, summon` |
| 63 | Tanky / taunt minion | `physical, minion, close, summon, defense` |
| 64 | Turret / static shooter | `physical, trap, short, summon` |
| 65 | Trap field (damage) | `physical, trap, short, dot` |
| 66 | Animal companion / falcon | `physical, minion, long, summon` |
| 67 | Plant / stationary summon | `nature, minion, short, summon` |
| 68 | Temporary clone / echo | `arcane, minion, self, summon` |
| 69 | Mount / vehicle form | `physical, instant, self, mobility, stance` |
| 70 | Charm / tame enemy | `nature, instant, short, control, charm` |

### Details

### #61 Melee minion swarm

- **Tags:** `physical, minion, short, summon`
- **RO:** Alchemist: Call Homunculus (Lif/Amistr/Filir/Vanilmirth); Biochemist: Homunculus skills; Summoner: Doram Spirit summons
- **ToS:** Wizard-Necromancer: Raise Dead (skeletons), Create Shoggoth; Wizard-Sorcerer: Summon Salamion, Summon Servant;
  Wizard-Bokor: Bwa Kayiman (zombie wheel), Damballa (zombie bomb)
- **CoA:** Necromancer: Raise Skeleton (warriors); Felsworn: Summon Demon (melee); Reaper: Summon Wraith
- **Notes:** Chaff swarms. RO Homunculus = persistent pet with loyalty (deepest system).

### #62 Ranged minion / caster pet

- **Tags:** `arcane, minion, long, summon`
- **RO:** Alchemist: Homunculus (Vani attack-magic); Sorcerer: Summon Aqua/Fire/Wind/Earth (spirit attacks); Elemental Master: Elemental Buster (spirit nuke)
- **ToS:** Wizard-Necromancer: Raise Skull Mage, Raise Skull Archer; Wizard-Sorcerer: Morph (buff pet), Summon Familiar (bats);
  Archer-Falconer: Call (hawk) + Hanging Shot (ranged pet)
- **CoA:** Necromancer: Raise Caster (mages); Runemaster: Bonded Familiar; Witch Doctor: Raptor Spirit (ranged)
- **Notes:** Backline pets. `minion` + `long`.

### #63 Tanky / taunt minion

- **Tags:** `physical, minion, close, summon, defense`
- **RO:** Alchemist: Homunculus Amistr (tank); Summoner: Arclouse Dash (tanky)
- **ToS:** Wizard-Necromancer: Raise Skull Swordsman (tanky), Corpse Tower (wall-minion); Wizard-Sorcerer: Summon Servant (tank); Cleric-Dievdirbys: Carve Owl (tanky statue)
- **CoA:** Necromancer: Raise Abomination (tank); Knight of Xoroth: Hellsteed (mount-tank); Guardian: Shieldbearer
- **Notes:** Meat-shield pets. Corpse Tower doubles as wall.

### #64 Turret / static shooter

- **Tags:** `physical, trap, short, summon`
- **RO:** Mechanic: Arm Cannon; Rebellion: Howling Mine (mine), Anti-Material Blast (emplaced); Night Watch: Frontier deployments
- **ToS:** Archer-Sapper: Spike Shooter (auto-turret), Claymore (mine); Archer-Quarrel Shooter: Deploy Pavise (shield-turret); Scout-Squire: (camp turret-ish)
- **CoA:** Tinker: Sentry Turret, Cannon Turret; Witch Doctor: Serpent Ward; Primalist: Stone Turret
- **Notes:** Static DPS. ToS Sapper = the trap/turret tree. `trap` delivery.

### #65 Trap field (damage)

- **Tags:** `physical, trap, short, dot`
- **RO:** Hunter: Blast Mine, Claymore Trap, Land Mine, Sandman (sleep), Talkie Box (joke), Shockwave Trap; Ranger: Detonator (trigger); Genetic: Thorn Trap, Bloodsucker Plant
- **ToS:** Archer-Sapper: Claymore, Punji Stake, Spike Shooter, Broom Trap, Conceal (trap stealth); Archer-Quarrel Shooter: Scatter Caltrops (slow trap);
  Archer-Hunter: Snatching (trap-hold)
- **CoA:** Tinker: Deploy Bomb (remote mine), Land Mine; Ranger: Explosive Trap, Freezing Trap; Witch Hunter: Snare Trap
- **Notes:** Trap-fields. RO Hunter traps = the genre reference. `trap` + `dot`.

### #66 Animal companion / falcon

- **Tags:** `physical, minion, long, summon`
- **RO:** Archer: (no pet) — Hunter: Blitz Beat (falcon strike), Falcon Eyes; Sniper: Falcon Assault, Wind Walk (falcon synergy);
  Ranger: Warg Bite, Warg Strike, Warg Dash, Tooth of Warg, Electric Shock (warg kit); Summoner: Spirit summons
- **ToS:** Archer-Hunter: Coursing, Snatching, Retrieve, Rush Dog, Hounding, Growling, Praise (pet buffs);
  Archer-Falconer: Call, Circling, Roost, Hanging Shot, Sonic Strike, Hovering, Pheasant, Pre-Emptive Strike
- **CoA:** Ranger: War Falcon (pet + Quiver); Primalist: Wild God companion; Witch Doctor: Dinosaur Spirit
- **Notes:** Beastmasters. Falcon→Warg (RO) vs Hawk→Dog (ToS).

### #67 Plant / stationary summon

- **Tags:** `nature, minion, short, summon`
- **RO:** Genetic: Hell Plant (carnivorous plant), Thorn Trap, Bloodsucker Plant, Fire Expansion; Sorcerer: Spirit Control (plant-ish)
- **ToS:** Cleric-Druid: Chortasmata (grass), Carnivory (bite-plant); Archer-Sapper: Broom Trap (plant-ish); Cleric-Dievdirbys: Carve Owl/Laima/Austras (statue-plants)
- **CoA:** Witch Doctor: Healing Ward, Voodoo Puddle (ward); Primalist: Healing Totem, Earth Totem; Venomancer: Spore Colony
- **Notes:** Rooted helpers. RO Hell Plant = the carnivorous classic.

### #68 Temporary clone / echo

- **Tags:** `arcane, minion, self, summon`
- **RO:** Ninja: Mirror Image (clone); Kagerou: Empty Shadow (clone); Shiranui: Soul Veil (clone)
- **ToS:** Scout-Shinobi: Bunshin no Jutsu (clones); Swordsman-Doppelsoeldner: Deeds of Valor (double-pay clone-ish); Cleric-Kabbalist: Clone (damage-copy);
  Wizard-Sage: Blink (clone-leap)
- **CoA:** Chronomancer: Past Self (replays casts); Reaper: Possess (enter foe); Cultist: Split Psyche
- **Notes:** Echo fighters. CoA Past Self (replay 3s) = the most ambitious.

### #69 Mount / vehicle form

- **Tags:** `physical, instant, self, mobility, stance`
- **RO:** Knight: Cavalier Mastery (peco mount); Crusader: Cavalry Mastery; Rune Knight: Dragon Training (dragon mount); Mechanic: Madogear License (mech suit);
  Ranger: Warg Rider (warg mount); Night Watch: Wild Fire (mounted)
- **ToS:** Swordsman-Cataphract: Trot (mounted), Impaler, Steed Charge, Rush, Earth Wave (mounted); Swordsman-Lancer: Joust, Unhorsing, Quintain (mounted);
  Swordsman-Hackapell: mounted archery; Scout-Schwarzer Reiter: Caracole, Retreat Shot, Limacon (mounted guns); Scout-Hakkapeliter: mounted skills
- **CoA:** Knight of Xoroth: Summon Steed (mount = +move/−turn, Deathfire spender); Ranger: Mount Up; Guardian: Warhorse Charge
- **Notes:** Mounted combat. `stance` flag. Knight of Xoroth mount tradeoff = best design note.

### #70 Charm / tame enemy

- **Tags:** `nature, instant, short, control, charm`
- **RO:** Sage: Hocus Pocus (tame-ish); Summoner: Spirit Communication
- **ToS:** Archer-Hunter: Coursing (beast-hold), Praise; Cleric-Druid: Telepath (beast-control), Henge Stone; Scout-Rogue: Capturing (net)
- **CoA:** Witch Doctor: Hex Charm; Venomancer: Infest (mind-control bug); Primalist: Befriend Beast
- **Notes:** Enemy-taming. Rare in all three games — design gap worth mining.

---

## E. Utility (move · stealth · econ)

Mobility, stealth, detection, economy, sustain, immunity, portals, vision.

### Index

| # | Function | Tags |
|---|---|---|
| 71 | Teleport / blink | `arcane, instant, self, mobility` |
| 72 | Dash / charge / leap | `physical, instant, self, mobility` |
| 73 | Stealth / cloak / hide | `shadow, instant, self, mobility` |
| 74 | Trap detect / reveal | `arcane, instant, short, support` |
| 75 | Shop / vending / econ | `physical, instant, self, support` |
| 76 | Self-heal / potion boost | `physical, instant, self, sustain` |
| 77 | Emergency immunity / bubble | `holy, instant, self, defense` |
| 78 | Party portal / summon | `arcane, instant, long, support` |
| 79 | Buff-strip protect / endure | `physical, instant, self, defense` |
| 80 | Scout / vision / reveal map | `arcane, instant, long, support` |

### Details

### #71 Teleport / blink

- **Tags:** `arcane, instant, self, mobility`
- **RO:** Acolyte: Teleport (random/escape); Priest: Warp Portal (party portal); Shadow Chaser: Dimensional Door (portal); Super Novice: Teleport
- **ToS:** Wizard-Psychokino: Teleportation; Wizard-Sage: Blink, Portal (shop portal); Scout-Shinobi: Mokuton (log-escape)
- **CoA:** Chronomancer: Blink, Rewind Time (positional reset); Runemaster: Rune Gate; Starcaller: Starfall Leap
- **Notes:** Portal vs self-blink. RO Warp Portal (party taxi + econ) = genre legend.

### #72 Dash / charge / leap

- **Tags:** `physical, instant, self, mobility`
- **RO:** Knight: Charge Attack (peco charge); Rune Knight: Phantom Thrust (pull-charge); Guillotine Cross: Rolling Cutter (spin-dash); Sura: Cursed Circle (leap)
- **ToS:** Archer-Archer: Leap (backflip + drop-combat); Swordsman-Cataphract: Steed Charge, Rush; Swordsman-Lancer: Joust; Swordsman-Murmillo: Sprint, Evade Thrust;
  Scout-Assassin: Instant Acceleration; Scout-Outlaw: Mangle (dash)
- **CoA:** Guardian: Heroic Leap; Barbarian: Charge; Reaper: Shadowstep; Knight of Xoroth: Hell Charge; Tinker: Rocket Boost
- **Notes:** Gap-closers/escapes. ToS Leap drops combat (strong).

### #73 Stealth / cloak / hide

- **Tags:** `shadow, instant, self, mobility`
- **RO:** Thief: Hiding (hide); Assassin: Cloaking (move-hidden); Rogue: Stalk (chase-hidden); Shadow Chaser: Shadow Form (attach-hidden); Ninja: Cicada Skin (evade-hidden);
  Super Novice: Hiding
- **ToS:** Scout-Scout: Cloaking; Scout-Assassin: Hasisas (stealth); Scout-Rogue: Burrow (underground), Sneak Hit (from-stealth); Scout-Shinobi: Doton (earth-hide);
  Scout-Outlaw: Ambush
- **CoA:** Reaper: Slip into Darkness; Ranger: Camouflage; Witch Hunter: Smokescreen; Venomancer: Burrow Swarm
- **Notes:** Hide kits. RO Cloaking vs Hiding (move vs stationary) = good granularity.

### #74 Trap detect / reveal

- **Tags:** `arcane, instant, short, support`
- **RO:** Hunter: Detect (reveal hidden); Ranger: Keen Nose (detect), Focused Arrow Strike (reveal); Priest: Ruwach (reveal); Acolyte: Ruwach, Sight (Mage: Sight);
  Warg: Keen Nose
- **ToS:** Archer-Archer: Swift Step (reveal-ish); Scout-Scout: Scan (reveal), Perspective (stealth-see); Archer-Appraiser: Blindside (expose);
  Wizard-Sage: Micro Dimension (reveal)
- **CoA:** Witch Hunter: Detect Monsters, Holy Lantern; Ranger: Tracker's Eye; Tinker: Sensor Drone
- **Notes:** Anti-stealth. RO Ruwach/Sight = the support-tax answer to Hiding.

### #75 Shop / vending / econ

- **Tags:** `physical, instant, self, support`
- **RO:** Merchant: Vending, Discount, Overcharge, Enlarge Weight Limit; Blacksmith: Repair Weapon, Smith Dagger/Sword/Two-Handed Sword/Spear/Axe/Mace/Knuckle (forge!);
  Alchemist: Pharmacy (brew), Learning Potion; Taekwon: Peaceful Break (HP→SP econ)
- **ToS:** Scout-Squire: Repair, Weapon Maintenance, Armor Maintenance, Refreshment Table (food shop), Base Camp (shop-camp);
  Scout-Appraiser: Overestimate, Devaluation (price manip); Wizard-Alchemist: Item Awakening, Gem Roasting, Tincturing, Magnum Opus (craft!)
- **CoA:** Tinker: Field Workshop (craft/repair); Witch Doctor: Potion Mix (3 herbs → potion mid-combat); Barbarian: Ale Brewing (buff-consumable)
- **Notes:** Player economy. RO Vending + Forge + Brew = the living-market trio.

### #76 Self-heal / potion boost

- **Tags:** `physical, instant, self, sustain`
- **RO:** Swordman: Increase HP Recovery; Alchemist: Aid Potion, Learning Potion (potion-boost); Taekwon: Peaceful Break (SP→HP); Summoner: Fresh Shrimp;
  Super Novice: scattered regen
- **ToS:** Swordsman-Swordsman: Bear (damage-reduce = effective-heal); Cleric-Priest: Revive (self-save); Cleric-Kabbalist: Ein Sof (max-HP);
  Swordsman-Barbarian: Frenzy (HP-drain cost)
- **CoA:** Bloodmage: Crimson Regen; Reaper: Soul Feast (kill-heal); Barbarian: Ale Chug (heal + vuln); Witch Doctor: Healing Tonic
- **Notes:** Solo sustain. RO Aid Potion + Taekwon conversions = potion-loop design.

### #77 Emergency immunity / bubble

- **Tags:** `holy, instant, self, defense`
- **RO:** Crusader: Guard (block); Paladin: Sacrifice (redirect); Royal Guard: King's Grace, Inspiration (status-immune); Sura: Gentle Touch-Revitalize (cleanse-immune);
  Mechanic: Magnetic Field (projectile-immune)
- **ToS:** Swordsman-Swordsman: Pain Barrier (knockdown/status immune); Cleric-Monk: Golden Bell Shield (debuff-immune + skill-amp), Iron Skin (physical-reduce);
  Cleric-Druid: Sterea Trofh (invuln); Cleric-Oracle: Prophecy (status-immune)
- **CoA:** Guardian: Last Stand; Sun Cleric: Divine Shield; Knight of Xoroth: Hellshell; Starcaller: Lunar Veil
- **Notes:** Oh-shit buttons. RO vs ToS both gate these behind short durations.

### #78 Party portal / summon

- **Tags:** `arcane, instant, long, support`
- **RO:** Priest: Warp Portal (map taxi); Shadow Chaser: Dimensional Door
- **ToS:** Wizard-Sage: Portal (market teleport); Scout-Squire: Base Camp (party recall); Cleric-Dievdirbys: Statue of Goddess Ausrine (recall-ish);
  Swordsman-Templar: (guild summon)
- **CoA:** Chronomancer: Summon Party (time-rift); Starcaller: Star Gate
- **Notes:** Group mobility. RO Warp Portal memo/agenda gameplay = social glue.

### #79 Buff-strip protect / endure

- **Tags:** `physical, instant, self, defense`
- **RO:** Swordman: Endure (uninterruptible + MDEF); Crusader: Shrink (knockback-immune); Champion: Zen
- **ToS:** Swordsman-Swordsman: Pain Barrier (interrupt-immune); Swordsman-Highlander: Cross Guard (block); Swordsman-Peltasta: High Guard, Guardian (flinch-immune);
  Swordsman-Rodelero: Slithering (evade)
- **CoA:** Guardian: Unstoppable (CC-immune); Barbarian: Unbridled Rage (flinch-immune); Templar: Stalwart Stance
- **Notes:** Anti-interrupt. RO Endure (MDEF + no-flinch) = the leveling staple.

### #80 Scout / vision / reveal map

- **Tags:** `arcane, instant, long, support`
- **RO:** Mage: Sight (reveal area); Wizard: Sightrasher (reveal + damage), Sense (monster-info); Ranger: Focused Arrow Strike
- **ToS:** Scout-Scout: Scan, Perspective; Archer-Falconer: Hanging Shot (aerial vision), Roost (ward-vision); Archer-Appraiser: Forecast (market-vision, econ overlap)
- **CoA:** Ranger: Falcon Sight, Track; Tinker: Scout Drone; Witch Hunter: Hunter's Mark (vision + bonus)
- **Notes:** Vision control. RO Sight (gemless reveal) vs Sightrasher (damage-reveal).

---

## Footer

### Coverage counts (verified Sept 2026)

- **Ragnarok Online (~400+ skills):** 6 first jobs (Swordman, Mage, Archer, Merchant,
  Thief, Acolyte) → 2-1/2-2 seconds (Knight/Crusader, Wizard/Sage, Hunter/Bard-Dancer,
  Blacksmith/Alchemist, Assassin/Rogue, Priest/Monk) → transcendent seconds → 3rd jobs
  (Rune Knight, Royal Guard, Warlock, Sorcerer, Ranger, Maestro/Wanderer, Mechanic,
  Genetic, Guillotine Cross, Shadow Chaser, Arch Bishop, Sura) → 4th jobs (Dragon Knight,
  Imperial Guard, Arch Mage, Elemental Master, Windhawk, Troubadour/Trouvere, Meister,
  Biolo, Shadow Cross, Abyss Chaser, Cardinal, Inquisitor) + expanded lines (Taekwon →
  Star Emperor/Soul Reaper → Sky Emperor/Soul Ascetic, Ninja → Shinkiro/Shiranui,
  Gunslinger → Rebellion → Night Watch, Super Novice → Hyper Novice, Summoner/Doram →
  Spirit Handler). Every 2nd/3rd/4th kit above is named in its row; pre-renewal vs renewal
  numbers differ but functional identity is stable.
- **Tree of Savior (~500+ skills, 94 classes):** 5 base trees — Swordsman (19 adv:
  Highlander, Peltasta, Hoplite, Barbarian, Cataphract, Doppelsoeldner, Rodelero, Murmillo,
  Fencer, Dragoon, Templar, Lancer, Matador, Nak Muay, Retiarius, Hackapell, Blossom Blader,
  Luchador, Shenji), Wizard (18 adv: Pyromancer, Cryomancer, Psychokino, Alchemist, Sorcerer,
  Chronomancer, Necromancer, Elementalist, Sage, Warlock, Featherfoot, Rune Caster,
  Shadowmancer, Onmyoji, Taoist, Bokor, Terramancer, Keraunos), Archer (17 adv: Hunter,
  Quarrel Shooter, Ranger, Sapper, Wugushi, Fletcher, Pied Piper, Appraiser, Falconer,
  Cannoneer, Musketeer, Mergen, Matross, Tiger Hunter, Arbalester, Arquebusier, Hwarang),
  Cleric (18 adv: Priest, Krivis, Druid, Sadhu, Dievdirbys, Oracle, Monk, Pardoner, Paladin,
  Chaplain, Plague Doctor, Kabbalist, Inquisitor, Miko, Zealot, Exorcist, Crusader, Lama),
  Scout (17 adv: Assassin, Outlaw, Squire, Corsair, Shinobi, Thaumaturge, Enchanter, Linker,
  Rogue, Schwarzer Reiter, Bullet Marker, Ardito, Sheriff, Rangda, Clown, Hakkapeliter,
  Jaguar) — 5 bases + 89 adv = 94 classes, ~5–8 skills each ≈ 500–700 skills. Every class
  appears at least once above.
- **Conquest of Azeroth (412–759 spells/class, signatures only):** per `db.exil.es/classes`
  — Barbarian 476, Bloodmage 610, Chronomancer 473, Cultist 589, Felsworn 413, Guardian 416,
  Knight of Xoroth 413, Necromancer 731, Primalist 614, Pyromancer 478, Ranger 577,
  Reaper 524, Runemaster 690, Starcaller 484, Stormbringer 493, Sun Cleric 504, Templar 469,
  Tinker 759, Venomancer 510, Witch Doctor 599, Witch Hunter 584 (≈ 11.1k total). This doc
  cites 1–3 iconic spells per row, never the full rank/talent grid — that is intentional.

### Sources

- RO: `https://irowiki.org/wiki/Classes`, `https://irowiki.org/wiki/Skill`,
  `https://irowiki.org/wiki/Fire_Bolt`, `https://irowiki.org/wiki/Fire_Ball`,
  `https://irowiki.org/wiki/Meteor_Storm`, `https://irowiki.org/classic/Wizard`,
  `https://www.divine-pride.net/database/skill/84/jupitel-thunder`,
  `https://ro-calc.de` (build/skill reference).
- ToS: `https://treeofsavior.com/page/class` (all 5 trees + 89 adv classes),
  `https://treeofsavior.com/page/class/view.php?c=Cryomancer`,
  `https://treeofsavior.com/page/class/view.php?c=Swordsman`,
  `https://treeofsavior.com/page/class/view.php?c=Archer`,
  `https://treeofsavior.com/page/class/view.php?c=Monk`,
  `https://toswiki.treeofsaviorgame.com/`, `https://treeofsavior.fandom.com/`.
- CoA: `https://conquest-of-azeroth.wiki/classes` (21-class roster),
  `https://features.ascension.gg/coa` (signature spells: Raise Skeleton, Entomb, Icequake,
  Sentry Turret, Deploy Bomb, Gunslinger, Potion Toss, Voodoo Puddle, Serpent Ward,
  Gravity Bomb, Past Self, Rewind Time, Reap, Lament, Possess, Pulverize, Linebreaker,
  Banner of Haste), `https://db.exil.es/classes` (per-class spell counts).
- Canonical tags: `./skill-tag-taxonomy.md` §1 (validator-enforced whitelist).

### How to extend to the thousands-skills plan (`./thousands-skills-plan.md`)

1. **Row = SkillDef family:** promote each of the 80 rows to a family id
   (e.g. `fire_bolt_fam`) with base tags + targeter + factor band; every RO/ToS/CoA skill
   in the cell becomes a stat-blocked member (numbers differ, tags identical).
2. **Augments attach at row level:** a Legendary like "Meteorfall" declares
   `allowTags: [fire]`, `denyTags: [aura]` and flips delivery `projectile → ground` —
   one augment then covers rows #1–#2 across all three games.
3. **New skills must land in exactly one row:** validator checks 3–6 whitelist tags and
   suggests the row by tag-overlap; ambiguous skills (e.g. Fire Wall = damage + block)
   list a primary row + secondary reference, never a duplicate entry.
4. **Vectors only when search breaks:** if designers can't find the right row by tag
   filter (thousands of variants, multilingual tooltips), add embeddings as a *retrieval*
   layer that proposes rows — tags remain the source of truth.
