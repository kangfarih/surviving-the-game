# Skill Tree — Unified Families (one entry per comparison row)

- Method: every RO + ToS primary from the prior leveled catalog
  appears exactly once, merged into its comparison-row family
  (docs/skills-comparison-tos-ro-coa.md #1-80). Same row + same
  whitelist tags + same combat purpose = ONE skill entry.
- CoA omitted (RO+ToS only); Heal lives only under Holy, Nature refs it.
- Lv = lowest source Lv; higher-Lv variants noted per family.
- Tags are canonical whitelist tokens (skill-tag-taxonomy.md §1).
- Calc = representative factor% x hits + CD/cost; variant range in notes.
- Sources: RO cells are Job: Name, ToS cells are Tree-Class: Name.
- Day-0 = arrival-pool skill; P0 = pinned per advancement §6.3 (11: #1,#21,#7,#72,#47,#51,#40,#64,#52,#25,#26).
- Order: Lv ascending inside each table. No table > 40 rows.

## 1. Level-Requirement Model

- RO tiers map to char Lv; ToS tiers map the same way.

| Tier | RO equiv | ToS equiv | Our Lv | Unlocks |
|---|---|---|---|---|
| Novice | Novice, SupNov | base tree | 1 | Day-0 pool, bolts |
| 1st job | Swordman-Mage-Archer | T1 adv | 1-5 | core verbs + heal |
| 2nd job | Knight-Wizard-Hunter | T2 adv | 10-20 | AoE, combo, pets |
| Trans | trans 2nd, Star Emp | T2 late | 25 | flags, drain, strip |
| 3rd job | Warlock-Ranger-Sura | T3 adv | 30-40 | fields, meteors |
| 4th job | Arch Mage-Cardinal | endgame | 45-50 | ult nukes, rez |

## 2. Magic

### Fire

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Fire Bolt | fire, projectile, long, burst | ~150%x1, CD4, 12MP | R#1; 12v; Lv1-49; Day-0; P0 L1 |
| 1 | Fire Splash | fire, projectile, short, burst | ~120%x1 spl, CD6, 14MP | R#2; 11v; Lv1-40 |
| 2 | Fire Field | fire, ground, short, dot, burn | ~50%/t 8s, CD12, 14MP | R#3; 8v; Lv2-48 |
| 5 | Ignite | fire, instant, short, dot, burn | ~40%/t 6s, CD8 + burn | R#5; 6v; Lv5-35 |
| 16 | Meteor | fire, ground, long, burst | ~120%x5, CD25, 30MP | R#4; 9v; Lv16-49 |

- **Lv1 Fire Bolt** (R#1) — ~150%x1, CD4, 12MP. variants Lv1-49. Day-0 arrival pool. P0 L1.
  - RO: Mage: Fire Bolt; Super Novice: Fire Bolt; Mage: Soul Strike; Sage: Hindsight; Warlock: Summon Fire Ball; Hyper Novice: Self Study Sorcery
  - ToS: Wizard-Pyromancer: Fireball; Wizard-Pyromancer: Flare; Wizard-Elementalist: Meteor; Wizard-Elementalist: Storm Dust; Wizard-Onmyoji: Fire Fox Shikigami
  + Wizard-Taoist: Storm Calling
- **Lv1 Fire Splash** (R#2) — ~120%x1 spl, CD6, 14MP. variants Lv1-40.
  - RO: Mage: Fire Ball; Gunslinger: Full Blast; Gunslinger: Desperado; Alchemist: Bomb; Mechanic: Arm Cannon
  - ToS: Wizard-Pyromancer: Fire Pillar; Wizard-Pyromancer: Hell Breath; Archer-Cannoneer: Cannon Shot; Scout-Bullet Marker: Bloody Overdrive
  + Scout-Bullet Marker: Napalm Bullet; Archer-Matross: Artillery
- **Lv2 Fire Field** (R#3) — ~50%/t 8s, CD12, 14MP. variants Lv2-48.
  - RO: Mage: Fire Wall; Wizard: Fire Pillar; Sorcerer: Warmer; Elemental Master: Conflagration
  - ToS: Wizard-Pyromancer: Fire Wall; Wizard-Pyromancer: Flame Ground; Wizard-Elementalist: Fire Pillar; Wizard-Terramancer: Ember Field
- **Lv5 Ignite** (R#5) — ~40%/t 6s, CD8 + burn. variants Lv5-35.
  - RO: Alchemist: Acid Terror; Rebellion: Dragon Tail; Genetic: Fire Expansion
  - ToS: Wizard-Pyromancer: Enchant Fire; Cleric-Plague Doctor: Incinerate; Wizard-Bokor: Damballa
- **Lv16 Meteor** (R#4) — ~120%x5, CD25, 30MP. variants Lv16-49.
  - RO: Wizard: Meteor Storm; Warlock: Crimson Rock; Warlock: Comet; Arch Mage: All Bloom; Arch Mage: Crimson Arrow; Arch Mage: Floral Flare Road
  - ToS: Archer-Cannoneer: Siege Burst; Archer-Matross: Orbital strike skills; Wizard-Taoist: Eradication

### Storm

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Lightning Bolt | storm, projectile, long, burst, shock | ~150%x1, CD4 + shk | R#10; 8v; Lv1-34 |
| 3 | Storm Field | storm, ground, long, burst, shock | ~110%x3 bnc, CD12 + shk | R#11; 7v; Lv3-50 |

- **Lv1 Lightning Bolt** (R#10) — ~150%x1, CD4 + shk. variants Lv1-34.
  - RO: Super Novice: Lightning Bolt; Mage: Lightning Bolt; Wizard: Jupitel Thunder; Warlock: Chain Lightning
  - ToS: Cleric-Krivis: Zaibas; Wizard-Elementalist: Electrocute; Wizard-Keraunos: Lightning Strike; Wizard-Taoist: Zaibas
- **Lv3 Storm Field** (R#11) — ~110%x3 bnc, CD12 + shk. variants Lv3-50.
  - RO: Mage: Thunderstorm; Wizard: Lord of Vermilion; Warlock: Earth Strain; Arch Mage: Tornado Storm; Arch Mage: Storm Cannon; Arch Mage: Destructive Hurricane
  - ToS: Wizard-Keraunos: Chain Volta

### Shadow

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 3 | Shadow Bolt | shadow, projectile, long, burst | ~140%x1, CD5 | R#16; 17v; Lv3-49 |

- **Lv3 Shadow Bolt** (R#16) — ~140%x1, CD5. variants Lv3-49.
  - RO: Mage: Napalm Beat; Wizard: Napalm Vulcan; Warlock: Soul Expansion; Warlock: Drain Life; Warlock: White Imprison; Warlock: Hell Inferno; Arch Mage: Deadly Projection
  + Arch Mage: Soul Vulcan Strike
  - ToS: Wizard-Bokor: Effigy; Wizard-Bokor: Hexing; Cleric-Zealot: Immolation; Wizard-Shadowmancer: Shadow Condensation; Wizard-Shadowmancer: Shadow Eruption
  + Wizard-Shadowmancer: Shadow Thorn; Wizard-Warlock: Dark Theurge; Wizard-Warlock: Evil Sacrifice; Wizard-Warlock: Mastema

### Blood

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 16 | Drain | blood, projectile, short, sustain, lifesteal | ~100% + heal 50%, CD8 | R#19; 9v; Lv16-34 |

- **Lv16 Drain** (R#19) — ~100% + heal 50%, CD8. variants Lv16-34.
  - RO: Ninja: Shadow Slash; Kagerou: Soul Deprivation; Rebellion: Bloodsucker
  - ToS: Swordsman-Luchador: Bloodsport; Wizard-Featherfoot: Blood Bath; Wizard-Featherfoot: Blood Sucking; Wizard-Featherfoot: Kurdaitcha; Wizard-Featherfoot: Ngadhundi
  + Cleric-Zealot: Blind Faith

### Poison

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Venom Sting | poison, projectile, short, dot | ~90% + psn 4s, CD5 | R#17; 8v; Lv1-36 |
| 5 | Venom Cloud | poison, ground, short, dot | ~50%/t 8s, CD12 + psn | R#18; 9v; Lv5-36 |

- **Lv1 Venom Sting** (R#17) — ~90% + psn 4s, CD5. variants Lv1-36.
  - RO: Super Novice: Envenom; Thief: Envenom; Assassin: Enchant Poison; Guillotine Cross: Venom Impression
  - ToS: Archer-Wugushi: Needle Blow; Archer-Wugushi: Wugong Gu; Scout-Rogue: Vendetta; Wizard-Featherfoot: Bone Pointing
- **Lv5 Venom Cloud** (R#18) — ~50%/t 8s, CD12 + psn. variants Lv5-36.
  - RO: Alchemist: Acid Demonstration; Assassin: Venom Dust; Guillotine Cross: Poisoning Weapon; Genetic: Hell Plant
  - ToS: Archer-Wugushi: Bewitch; Archer-Wugushi: Jincan Gu; Archer-Wugushi: Zhendu; Cleric-Plague Doctor: Black Death Steam; Scout-Rangda: Miasma

### Arcane

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 16 | Beam | arcane, channel, long, burst | ~200% chn 2s, CD10 | R#27; 6v; Lv16-50 |

- **Lv16 Beam** (R#27) — ~200% chn 2s, CD10. variants Lv16-50.
  - RO: Warlock: Tetra Vortex; Soul Reaper: Soul Curse; Arch Mage: Astral Strike
  - ToS: Wizard-Psychokino: Gravity Pole; Wizard-Psychokino: Psychic Pressure; Wizard-Onmyoji: Toyou

### Holy - Nukes

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Holy Bolt | holy, projectile, long, burst | ~150%x1, CD5 | R#14; 13v; Lv1-48 |
| 16 | Exorcism Zone | holy, ground, short, burst | ~120% zone, CD12 | R#15; 10v; Lv16-45 |

- **Lv1 Holy Bolt** (R#14) — ~150%x1, CD5. variants Lv1-48.
  - RO: Acolyte: Ruwach; Acolyte: Holy Light; Acolyte: Turn Undead; Priest: Aspersio-boosted; Arch Bishop: Judex; Cardinal: Arbitrium; Cardinal: Framen
  - ToS: Cleric-Priest: Aspersion; Cleric-Priest: Exorcise; Cleric-Chaplain: Aspergillum; Cleric-Crusader: Smite; Cleric-Exorcist: Entity; Cleric-Exorcist: Rubric
- **Lv16 Exorcism Zone** (R#15) — ~120% zone, CD12. variants Lv16-45.
  - RO: Priest: Magnus Exorcismus; Crusader: Grand Cross; Arch Bishop: Adoramus; Cardinal: Effligo
  - ToS: Cleric-Miko: Hamaya; Cleric-Crusader: Holy Ground; Cleric-Exorcist: Gregorate; Cleric-Exorcist: Katadikazo; Cleric-Exorcist: Koinonia; Cleric-Inquisitor: God Smash

### Holy - Heal (only heal home; Nature refs here)

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Heal | holy, instant, short, support | heal ~120%, CD10 | R#47; 10v; Lv1-33; Day-0; P0 L1; same tags as #50/#56/#59 |
| 2 | Barrier | holy, instant, self, defense | block 3 hits, CD14 | R#51; 5v; Lv2-16; Day-0; P0 L2 |
| 2 | Cleanse | holy, instant, short, support | cleanse, CD10 | R#56; 7v; Lv2-34; same tags as #47 |
| 5 | Heal Zone | holy, ground, short, support | heal ~80%/t zone, CD15 | R#48; 8v; Lv5-34 |
| 5 | Resurrect | holy, instant, short, support | rez 100%, CD60 | R#50; 6v; Lv5-50; same tags as #47 |
| 16 | Regen | holy, aura, self, sustain, support | HoT ~30%/2s x5, CD15 | R#49; 7v; Lv16-34 |

- **Lv1 Heal** (R#47) — heal ~120%, CD10. variants Lv1-33. Day-0 arrival pool. P0 L1. same tags as #50/#56/#59; point-heal.
  - RO: Acolyte: Heal; Super Novice: Heal; Priest: Highness Heal; Arch Bishop: Heal
  - ToS: Cleric-Cleric: Cure; Cleric-Cleric: Heal; Cleric-Priest: Heal; Cleric-Priest: Mass Heal; Cleric-Priest: Revive; Cleric-Chaplain: Deploy Capella
- **Lv2 Barrier** (R#51) — block 3 hits, CD14. variants Lv2-16. Day-0 arrival pool. P0 L2.
  - RO: Mage: Safety Wall
  - ToS: Cleric-Priest: Stone Skin; Cleric-Dievdirbys: Statue of Goddess Zemyna; Cleric-Paladin: Barrier; Cleric-Paladin: Sanctuary
- **Lv2 Cleanse** (R#56) — cleanse, CD10. variants Lv2-34. same tags as #47; cure purpose, no HP restore.
  - RO: Acolyte: Cure; Arch Bishop: Lauda Ramus; Royal Guard: King's Grace; Arch Bishop: Lauda Agnus
  - ToS: Cleric-Priest: Cure; Cleric-Pardoner: Indulgentia; Cleric-Plague Doctor: Fumigate
- **Lv5 Heal Zone** (R#48) — heal ~80%/t zone, CD15. variants Lv5-34.
  - RO: Priest: Sanctuary; Arch Bishop: Coluceo Heal; Arch Bishop: Highness Heal; Arch Bishop: Clearance; Arch Bishop: Epiclesis
  - ToS: Cleric-Priest: Healing Factor; Cleric-Dievdirbys: Statue of Goddess Ausrine; Cleric-Miko: Clap
- **Lv5 Resurrect** (R#50) — rez 100%, CD60. variants Lv5-50. same tags as #47; rez purpose (Kaizel auto-rez variant).
  - RO: Soul Linker: Kaizel; Priest: Resurrection; Arch Bishop: Resurrection; Spirit Handler: Spirit rebirth
  - ToS: Cleric-Priest: Resurrection; Cleric-Kabbalist: R7x
- **Lv16 Regen** (R#49) — HoT ~30%/2s x5, CD15. variants Lv16-34.
  - RO: Summoner: Fresh Shrimp; Royal Guard: Inspiration; Arch Bishop: Renovatio
  - ToS: Cleric-Druid: Sterea Trofh; Cleric-Kabbalist: Ein Sof; Cleric-Plague Doctor: Beak Mask; Cleric-Plague Doctor: Healing Factor

### Holy - Ward

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Bubble | holy, instant, self, defense | immune 3s, CD60 | R#77; 4v; Lv1-37 |
| 1 | DEF Aura | holy, aura, self, support | +DEF aura, CD20 | R#53; 8v; Lv1-17 |
| 5 | Bless | holy, instant, short, support | +stats buff, CD15 | R#59; 5v; Lv5-31; same tags as #47 |
| 16 | Bodyguard | holy, instant, short, defense | redirect ally, CD20 | R#60; 3v; Lv16-32 |

- **Lv1 Bubble** (R#77) — immune 3s, CD60. variants Lv1-37.
  - RO: Sura: Gentle Touch-Revitalize
  - ToS: Swordsman-Swordsman: Pain Barrier; Cleric-Monk: Golden Bell Shield; Cleric-Monk: Iron Skin
- **Lv1 DEF Aura** (R#53) — +DEF aura, CD20. variants Lv1-17.
  - RO: Acolyte: Angelus; Priest: Kyrie Eleison; Crusader: Guard; Crusader: Defender; Priest: Assumptio
  - ToS: Swordsman-Swordsman: Bear; Cleric-Paladin: Resist Elements; Swordsman-Rodelero: Slithering
- **Lv5 Bless** (R#59) — +stats buff, CD15. variants Lv5-31. same tags as #47; stat-buff purpose, no HP restore.
  - RO: Acolyte: Increase AGI
  - ToS: Cleric-Miko: Kagura; Scout-Thaumaturge: Shrink Body; Scout-Thaumaturge: Swell Body/Hands/Left Arm/Right Arm; Archer-Hwarang: chant buffs
- **Lv16 Bodyguard** (R#60) — redirect ally, CD20. variants Lv16-32.
  - RO: Mechanic: Magnetic Field
  - ToS: Scout-Squire: Arrest; Swordsman-Templar: Non-Invasive Area

### Frost bolts (walls see Control-Freeze #9)

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Cold Bolt | frost, projectile, long, burst | ~150%x1, CD4, 12MP | R#6; 7v; Lv1-40 |
| 1 | Frost Nova | frost, nova, short, burst, freeze | ~110% AoE, CD9 + chill | R#7; 9v; Lv1-48; Day-0; P0 L1 |
| 5 | Ice Lane | frost, projectile, short, burst, freeze | ~130% line, CD8 + frz | R#8; 6v; Lv5-45 |

- **Lv1 Cold Bolt** (R#6) — ~150%x1, CD4, 12MP. variants Lv1-40.
  - RO: Super Novice: Cold Bolt; Mage: Cold Bolt; Warlock: Jack Frost; Warlock: Summon Water Ball
  - ToS: Wizard-Cryomancer: Ice Bolt; Wizard-Elementalist: Hail; Wizard-Onmyoji: Water Shikigami
- **Lv1 Frost Nova** (R#7) — ~110% AoE, CD9 + chill. variants Lv1-48. Day-0 arrival pool. P0 L1.
  - RO: Wizard: Frost Nova; Wizard: Storm Gust; Warlock: Frost Misty; Arch Mage: Frozen Slash; Arch Mage: Rain of Crystal
  - ToS: Wizard-Cryomancer: Ice Blast; Wizard-Cryomancer: Snow Rolling; Wizard-Elementalist: Frost Cloud; Wizard-Keraunos: Blizzard Drive
- **Lv5 Ice Lane** (R#8) — ~130% line, CD8 + frz. variants Lv5-45.
  - RO: Wizard: Water Ball; Sorcerer: Varetyr Spear; Arch Mage: Crystal Impact
  - ToS: Wizard-Cryomancer: Ice Pike; Wizard-Rune Caster: Rune of Ice; Wizard-Taoist: reduced-lane charms

### Nature (heals see Holy-Heal)

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 16 | Plant | nature, minion, short, summon | plant/ward, CD15 | R#67; 4v; Lv16-35 |
| 16 | Tame | nature, instant, short, control, charm | tame/charm, CD20 | R#70; 5v; Lv16-20 |

- **Lv16 Plant** (R#67) — plant/ward, CD15. variants Lv16-35.
  - RO: Sorcerer: Spirit Control
  - ToS: Cleric-Dievdirbys: Carve Owl/Laima/Austras; Cleric-Druid: Carnivory; Cleric-Druid: Chortasmata
- **Lv16 Tame** (R#70) — tame/charm, CD20. variants Lv16-20.
  - RO: Summoner: Spirit Communication; Sage: Hocus Pocus
  - ToS: Cleric-Druid: Henge Stone; Cleric-Druid: Telepath; Scout-Rogue: Capturing

### Summon

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 3 | Turret | physical, trap, short, summon | turret ~60%/2s, CD18 | R#64; 5v; Lv3-48; P0 L3 |
| 5 | Beast Companion | physical, minion, long, summon | beast pet, CD20 | R#66; 20v; Lv5-33 |
| 10 | Swarm Pet | physical, minion, short, summon | pet x3 melee, CD20 | R#61; 8v; Lv10-25 |
| 10 | Trap Field | physical, trap, short, dot | trap ~60%/t, CD12 | R#65; 11v; Lv10-38 |
| 11 | Tank Pet | physical, minion, close, summon, defense | tank pet, CD25 | R#63; 5v; Lv11-16 |
| 14 | Clone | arcane, minion, self, summon | clone 10s, CD30 | R#68; 5v; Lv14-48 |
| 16 | Caster Pet | arcane, minion, long, summon | pet ranged, CD20 | R#62; 7v; Lv16-35 |

- **Lv3 Turret** (R#64) — turret ~60%/2s, CD18. variants Lv3-48. P0 L3; Lv3 gate, not Day-0 pool.
  - RO: Rebellion: Anti-Material Blast; Night Watch: Frontier deployments
  - ToS: Archer-Sapper: Spike Shooter; Archer-Quarrel Shooter: Deploy Pavise; Archer-Sapper: Claymore
- **Lv5 Beast Companion** (R#66) — beast pet, CD20. variants Lv5-33.
  - RO: Summoner: Spirit summons; Hunter: Blitz Beat; Hunter: Falcon Eyes; Sniper: Falcon Assault; Ranger: Warg Dash; Ranger: Warg Strike; Ranger: Tooth of Warg
  - ToS: Archer-Hunter: Growling; Archer-Hunter: Hounding; Archer-Hunter: Praise; Archer-Hunter: Retrieve; Archer-Hunter: Rush Dog; Archer-Falconer: Call
  + Archer-Falconer: Circling; Archer-Falconer: Hanging Shot; Archer-Falconer: Hovering; Archer-Falconer: Pheasant; Archer-Falconer: Pre-Emptive Strike
  + Archer-Falconer: Roost; Archer-Falconer: Sonic Strike
- **Lv10 Swarm Pet** (R#61) — pet x3 melee, CD20. variants Lv10-25.
  - RO: Alchemist: Call Homunculus; Summoner: Doram Spirit summons; Biochemist: Homunculus skills
  - ToS: Wizard-Bokor: Bwa Kayiman; Wizard-Necromancer: Create Shoggoth; Wizard-Necromancer: Raise Dead; Wizard-Sorcerer: Summon Salamion; Wizard-Sorcerer: Summon Servant
- **Lv10 Trap Field** (R#65) — trap ~60%/t, CD12. variants Lv10-38.
  - RO: Hunter: Claymore Trap; Hunter: Blast Mine; Hunter: Sandman; Hunter: Shockwave Trap; Hunter: Land Mine; Hunter: Talkie Box; Genetic: Bloodsucker Plant
  + Ranger: Detonator
  - ToS: Archer-Sapper: Broom Trap; Archer-Sapper: Conceal; Archer-Sapper: Punji Stake
- **Lv11 Tank Pet** (R#63) — tank pet, CD25. variants Lv11-16.
  - RO: Summoner: Arclouse Dash; Alchemist: Homunculus Amistr
  - ToS: Cleric-Dievdirbys: Carve Owl; Wizard-Necromancer: Corpse Tower; Wizard-Necromancer: Raise Skull Swordsman
- **Lv14 Clone** (R#68) — clone 10s, CD30. variants Lv14-48.
  - RO: Ninja: Mirror Image; Kagerou: Empty Shadow; Shiranui: Soul Veil
  - ToS: Scout-Shinobi: Bunshin no Jutsu; Swordsman-Doppelsoeldner: Deeds of Valor
- **Lv16 Caster Pet** (R#62) — pet ranged, CD20. variants Lv16-35.
  - RO: Alchemist: Homunculus; Sorcerer: Summon Aqua/Fire/Wind/Earth
  - ToS: Archer-Falconer: Call + Hanging Shot; Wizard-Necromancer: Raise Skull Archer; Wizard-Necromancer: Raise Skull Mage; Wizard-Sorcerer: Morph
  + Wizard-Sorcerer: Summon Familiar

## 3. Physical

### Single

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Weapon Hit | physical, melee, close, burst | ~150%x1, CD4 | R#20; 20v; Lv1-36; non-P0, see P0 #26 glue |
| 2 | Stone Shot | physical, projectile, long, burst | ~140%x1, CD5 | R#12; 8v; Lv2-45; earth-as-physical |
| 5 | Kamikaze | physical, nova, close, burst | ~250% self 10%, CD20 | R#30; 5v; Lv5-46 |

- **Lv1 Weapon Hit** (R#20) — ~150%x1, CD4. variants Lv1-36. non-P0 base hit; P0 glue is #26 shield_slam.
  - RO: Monk: Triple Attack; Swordman: Bash; Knight: Pierce; Knight: Brandish Spear; Assassin: Sonic Blow; Monk: Occult Impaction; Champion: Guillotine Fist
  + Guillotine Cross: Cross Ripper Slasher
  - ToS: Swordsman-Swordsman: Bash; Swordsman-Swordsman: Thrust; Swordsman-Highlander: Cartar Stroke; Swordsman-Highlander: Skull Swing; Swordsman-Fencer: Attaque Composee
  + Swordsman-Fencer: Lunge; Swordsman-Fencer: Sept Etoiles; Swordsman-Monk (Cleric): Double Punch; Swordsman-Monk (Cleric): God Finger Flick
  + Swordsman-Monk (Cleric): One Inch Punch; Swordsman-Monk (Cleric): Palm Strike; Swordsman-Nak Muay: straight/hook strikes
- **Lv2 Stone Shot** (R#12) — ~140%x1, CD5. variants Lv2-45. earth-as-physical; Stone Curse petrify + gem variant.
  - RO: Mage: Stone Curse; Wizard: Earth Spike; Sorcerer: Diamond Dust; Elemental Master: Elemental Buster
  - ToS: Swordsman-Murmillo: Headbutt; Wizard-Sage: Micro Dimension; Wizard-Terramancer: Earthen Prison; Wizard-Terramancer: Stone Spike
- **Lv5 Kamikaze** (R#30) — ~250% self 10%, CD20. variants Lv5-46.
  - RO: Mechanic: Self Destruction; Hyper Novice: Self-Destruction
  - ToS: Swordsman-Barbarian: Frenzy; Scout-Shinobi: Mijin no Jutsu; Swordsman-Luchador: self-slam

### Area

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Cleave | physical, melee, close, sustain | ~100% arc, CD5 | R#21; 15v; Lv1-40; Day-0; P0 L1 |
| 5 | Quake | physical, ground, short, burst | ~120% AoE, CD10 | R#13; 10v; Lv5-50 |

- **Lv1 Cleave** (R#21) — ~100% arc, CD5. variants Lv1-40. Day-0 arrival pool. P0 L1.
  - RO: Swordman: Magnum Break; Knight: Bowling Bash; Royal Guard: Genesis Ray; Rune Knight: Storm Blast; Rune Knight: Dragon Breath
  - ToS: Swordsman-Barbarian: Cleave; Swordsman-Barbarian: Aggressor; Swordsman-Highlander: Cross Cut; Swordsman-Highlander: Moulinet
  + Swordsman-Blossom Blader: sweep skills; Swordsman-Doppelsoeldner: Cyclone; Swordsman-Doppelsoeldner: Punish; Swordsman-Doppelsoeldner: Redel
  + Swordsman-Doppelsoeldner: Zornhau; Swordsman-Hackapell: Skarphuggning
- **Lv5 Quake** (R#13) — ~120% AoE, CD10. variants Lv5-50.
  - RO: Wizard: Heaven's Drive; Warlock: Sienna Execrate; Arch Mage: Rock Down; Arch Mage: Violent Quake; Arch Mage: Stratum Tremor
  - ToS: Swordsman-Barbarian: Seism; Swordsman-Barbarian: Stomping Kick; Wizard-Elementalist: Stone Rain; Wizard-Terramancer: Earthquake; Wizard-Terramancer: Rolling Stone

### Ranged

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Aimed Shot | physical, projectile, long, burst | ~150%x1, CD4 | R#22; 13v; Lv1-39; same tags as #24 |
| 1 | Volley | physical, projectile, long, sustain | ~70%x3, CD8 | R#23; 14v; Lv1-38 |
| 10 | Firearm Shot | physical, projectile, long, burst | ~130%x1, CD5 | R#24; 19v; Lv10-47; same tags as #22 |

- **Lv1 Aimed Shot** (R#22) — ~150%x1, CD4. variants Lv1-39. same tags as #24; bow-aimed purpose, see #24 guns.
  - RO: Archer: Double Strafe; Sniper: Focused Arrow Strike; Rebellion: Round Trip; Ranger: Aimed Bolt
  - ToS: Archer-Archer: Oblique Shot; Archer-Archer: Twin Arrow; Archer-Ranger: Critical Shot; Archer-Ranger: Spiral Arrow; Archer-Musketeer: Headshot
  + Archer-Musketeer: Snipe; Scout-Bullet Marker: Smash Bullet; Scout-Bullet Marker: Tracer Bullet; Archer-Arquebusier: aimed shots
- **Lv1 Volley** (R#23) — ~70%x3, CD8. variants Lv1-38.
  - RO: Archer: Arrow Shower; Sniper: Arrow Storm; Sniper: Wind Walk; Maestro: Severe Rainstorm; Ranger: Arrow Storm
  - ToS: Archer-Archer: Multi Shot; Archer-Ranger: Arrow Shower; Archer-Ranger: Bounce Shot; Archer-Ranger: Steady Aim; Archer-Cannoneer: Shootdown
  + Archer-Mergen: Homing Arrow; Archer-Mergen: Spread Shot; Archer-Mergen: Triple Arrow; Archer-Mergen: Zenith
- **Lv10 Firearm Shot** (R#24) — ~130%x1, CD5. variants Lv10-47. same tags as #22; firearm purpose, see #22 bows.
  - RO: Gunslinger: Wounding Shot; Gunslinger: Disarm; Gunslinger: Rapid Shower; Gunslinger: Tracking; Gunslinger: Spread Attack; Gunslinger: Piercing Shot
  + Rebellion: God's Hammer; Rebellion: Fire Dance; Rebellion: Howling Mine; Rebellion: Slug Shot; Night Watch: all firearms
  - ToS: Archer-Cannoneer: Bazooka; Archer-Cannoneer: Cannon Barrage; Archer-Musketeer: Birdfall; Archer-Musketeer: Butt Stroke; Archer-Musketeer: Covering Fire
  + Scout-Bullet Marker: full kit; Scout-Outlaw: Mangle; Scout-Sheriff: fan-fire skills

### Bleed

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 5 | Bleed Cut | physical, melee, close, dot, bleed | ~70% + bld 6s, CD6 | R#28; 5v; Lv5-47 |

- **Lv5 Bleed Cut** (R#28) — ~70% + bld 6s, CD6. variants Lv5-47.
  - RO: Abyss Chaser: Frenzy Shot
  - ToS: Swordsman-Highlander: Vertical Slash; Scout-Ardito: bleed daggers; Swordsman-Corsair: Dust Devil; Swordsman-Lancer: Crush

### Execute

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 4 | Execute | physical, melee, short, burst, execute | ~100% x2<30%, CD6 | R#25; 9v; Lv4-48; P0 L4 + finisher |

- **Lv4 Execute** (R#25) — ~100% x2<30%, CD6. variants Lv4-48. P0 L4 + finisher.
  - RO: Assassin: Grimtooth; Guillotine Cross: Rolling Cutter; Sura: Tiger Cannon; Inquisitor: Oleum Sanctum
  - ToS: Swordsman-Assassin: Behead; Cleric-Kabbalist: Clone; Scout-Rogue: Backstab; Swordsman-Assassin: Annihilation; Swordsman-Nak Muay: KO strike

### Combo

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 16 | Combo Chain | physical, melee, close, combo, opener | ~80%, CD5 + opn | R#26; 8v; Lv16-49; P0 L2 glue (shield_slam) |

- **Lv16 Combo Chain** (R#26) — ~80%, CD5 + opn. variants Lv16-49. P0 L2 glue (shield_slam_01; burst+opener).
  - RO: Monk: Chain Combo; Star Emperor: Solar/Lunar/Stellar attacks; Shinkiro/Shiranui: combo charms; Sky Emperor: Celestial combo
  - ToS: Swordsman-Fencer: Epee Garde chains; Swordsman-Monk: Double Punch → Palm Strike~; Swordsman-Matador: Faena → Muleta → Corrida~; Swordsman-Nak Muay: combo strings

### Counter

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 5 | Riposte | physical, melee, close, burst, breaker | ~160% ripo, CD8 | R#29; 9v; Lv5-40 |

- **Lv5 Riposte** (R#29) — ~160% ripo, CD8. variants Lv5-40.
  - RO: Knight: Counter Attack; Star Emperor: Solar Protection; Guillotine Cross: Weapon Blocking; Royal Guard: Shield Spell
  - ToS: Swordsman-Peltasta: Butterfly; Swordsman-Peltasta: Umbo Blow; Swordsman-Fencer: Flanconnade; Swordsman-Murmillo: Scutum Hit; Swordsman-Rodelero: Shield Charge

## 4. Control

### Freeze

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 4 | Freeze | frost, instant, short, control, freeze | ~70% + frz, CD12 | R#31; 3v; Lv4-34 |
| 5 | Ice Wall | frost, ground, short, control, defense | wall 5 cells, CD15 | R#9; 5v; Lv5-49; split: wall-as-cover (RO) vs wall-as-weapon (ToS shatter) |
| 5 | Slow Field | frost, ground, short, control | slow 50% 6s, CD12 | R#41; 6v; Lv5-16 |

- **Lv4 Freeze** (R#31) — ~70% + frz, CD12. variants Lv4-34.
  - RO: Mage: Frost Diver; Warlock: Freezing Spell
  - ToS: Wizard-Cryomancer: Frost Pillar
- **Lv5 Ice Wall** (R#9) — wall 5 cells, CD15. variants Lv5-49. split: wall-as-cover (RO) vs wall-as-weapon (ToS shatter).
  - RO: Wizard: Ice Wall; Arch Mage: Mystery Illusion
  - ToS: Wizard-Cryomancer: Ice Wall; Wizard-Cryomancer: Subzero Shield; Wizard-Sage: Ice Wall
- **Lv5 Slow Field** (R#41) — slow 50% 6s, CD12. variants Lv5-16.
  - RO: Wizard: Quagmire
  - ToS: Archer-Quarrel Shooter: Scatter Caltrops; Scout-Linker: Spiritual Chain; Wizard-Chronomancer: Slow; Wizard-Chronomancer: Stop; Wizard-Psychokino: Slow

### Shock

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Taunt | physical, shout, short, control | taunt + threat, CD10 | R#42; 10v; Lv1-36; same tags as #34 |
| 1 | Warcry | physical, shout, short, control | ~60% shout, CD12 | R#34; 7v; Lv1-38; same tags as #42 |
| 4 | Stun | storm, instant, short, control, shock | ~70% + stun, CD12 | R#32; 7v; Lv4-35 |

- **Lv1 Taunt** (R#42) — taunt + threat, CD10. variants Lv1-36. same tags as #34; forced-aggro purpose, see #34 shout.
  - RO: Swordman: Provoke; Crusader: Shield Reflect; Paladin: Sacrifice; Royal Guard: Reflect Damage; Sura: Cursed Circle
  - ToS: Swordsman-Swordsman: Provoke; Swordsman-Peltasta: Guardian; Swordsman-Peltasta: Swash Buckling; Swordsman-Rodelero: Shield Push; Swordsman-Templar: Aggro orders
- **Lv1 Warcry** (R#34) — ~60% shout, CD12. variants Lv1-38. same tags as #42; shout-debuff purpose, see #42 taunt.
  - RO: Royal Guard: Battle Orders; Sura: Lion's Howl; Sura: Gentle Touch
  - ToS: Swordsman-Swordsman: Liberate; Swordsman-Barbarian: Warcry; Archer-Pied Piper: Dissonanz; Swordsman-Templar: Battle Orders
- **Lv4 Stun** (R#32) — ~70% + stun, CD12. variants Lv4-35.
  - RO: Swordman: Fatal Blow; Mechanic: Pile Bunker
  - ToS: Cleric-Priest: Monstrance; Scout-Quarrel Shooter: Stone Shot; Swordsman-Barbarian: Helm Chopper; Swordsman-Hoplite: Spear Throw; Wizard-Taoist: Upper Level

### Mind

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 14 | Blind | shadow, instant, short, control | blind/curse, CD12 | R#45; 6v; Lv14-49 |
| 16 | Petrify | arcane, instant, short, control, root | ~60% + petrify, CD15 | R#33; 3v; Lv unknown |
| 16 | Silence | arcane, instant, long, control | silence 4s, CD15 | R#37; 8v; Lv16-47; same delivery/role as #46, range long vs short |
| 16 | Sleep | arcane, instant, short, control, charm | sleep 6s, CD15 | R#36; 9v; Lv16-40 |
| 16 | Time Stop | arcane, instant, short, control | lock 3s, CD30 | R#46; 3v; Lv16-45; same delivery/role as #37, range short vs long |
| 31 | Fear | shadow, shout, short, control, fear | ~60% + fear, CD15 | R#35; 5v; Lv31-47 |

- **Lv14 Blind** (R#45) — blind/curse, CD12. variants Lv14-49.
  - RO: Ninja: Mist Slash; Guillotine Cross: Dark Claw; Shiranui: Shadow Leap
  - ToS: Archer-Appraiser: Blindside; Cleric-Oracle: Arcane Energy; Scout-Assassin: Hasisas
- **Lv16 Petrify** (R#33) — ~60% + petrify, CD15. variants Lv unknown.
  - RO: — (lowest-row-wins; Stone Curse see #12, Sienna see #13, Arrullo see #36)
  - ToS: Cleric-Dievdirbys: Zemyna; Cleric-Oracle: Death Sentence; Scout-Linker: Hangman's Knot
- **Lv16 Silence** (R#37) — silence 4s, CD15. variants Lv16-47. same delivery/role as #46, range long vs short; anti-cast, see #46 stop.
  - RO: Sage: Spell Breaker; Professor: Mind Breaker; Warlock: Stasis; Troubadour: Song of Despair
  - ToS: Cleric-Oracle: Counter Spell; Cleric-Pardoner: Discerning Evil; Scout-Rogue: Lachrymator; Wizard-Sage: Missile Hole
- **Lv16 Sleep** (R#36) — sleep 6s, CD15. variants Lv16-40.
  - RO: Dancer: Scream; Bard: Lullaby; Minstrel/Wanderer: Deep Sleep Lullaby; Sorcerer: Arrullo
  - ToS: Archer-Pied Piper: Hypnotische Floete; Archer-Pied Piper: Wiegenlied; Cleric-Oracle: Prophecy; Scout-Enchanter: Haziness; Wizard-Psychokino: Raise
- **Lv16 Time Stop** (R#46) — lock 3s, CD30. variants Lv16-45. same delivery/role as #37, range short vs long; hard-lock, see #37 silence.
  - RO: Cardinal: Oratio
  - ToS: Wizard-Chronomancer: Pass; Wizard-Chronomancer: Quicken
- **Lv31 Fear** (R#35) — ~60% + fear, CD15. variants Lv31-47.
  - RO: Abyss Chaser: Masquerade-Weakness; Night Watch: Panic; Shadow Cross: Shadow Sense
  - ToS: Wizard-Shadowmancer: Shadow Pool; Wizard-Warlock: Ghastly Trail

### Space

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Vacuum | arcane, ground, short, control, pull | ~60% + pull, CD14 | R#38; 8v; Lv1-40 |
| 3 | Snare | nature, ground, short, control, root | ~40% + root 4s, CD12 | R#40; 8v; Lv3-33; Day-0; P0 L3 |
| 16 | Knockback | physical, instant, short, control, knockback | ~80% + kb, CD8 | R#39; 6v; Lv16-35 |

- **Lv1 Vacuum** (R#38) — ~60% + pull, CD14. variants Lv1-40.
  - RO: Wizard: Ganbantein; Sorcerer: Earth Grave; Warlock: Gravitational Field; Warlock: Marsh of Abyss; Sorcerer: Extreme Vacuum
  - ToS: Linker: Hangman's Knot; Wizard-Psychokino: Magnetic Force; Wizard-Sage: Ultimate Dimension
- **Lv3 Snare** (R#40) — ~40% + root 4s, CD12. variants Lv3-33. Day-0 arrival pool. P0 L3.
  - RO: Hunter: Ankle Snare; Genetic: Thorn Trap; Ranger: Electric Shock
  - ToS: Archer-Hunter: Coursing; Archer-Hunter: Snatching; Cleric-Dievdirbys: Laima; Swordsman-Retiarius: Rete; Wizard-Terramancer: Root Snare
- **Lv16 Knockback** (R#39) — ~80% + kb, CD8. variants Lv16-35.
  - RO: Ranger: Warg Bite
  - ToS: Archer-Cannoneer: Cannon Blast; Swordsman-Cataphract: Earth Wave; Swordsman-Cataphract: Steed Charge; Swordsman-Lancer: Joust; Swordsman-Lancer: Unhorsing

### Meta

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 11 | Dispel | arcane, instant, short, control, breaker | dispel/strip, CD15 | R#43; 9v; Lv11-38 |
| 13 | Link | arcane, instant, long, control | share dmg link, CD20 | R#44; 7v; Lv13-33 |

- **Lv11 Dispel** (R#43) — dispel/strip, CD15. variants Lv11-38.
  - RO: Sage: Dispell; Rogue: Divest Helm/Shield/Armor/Weapon; Professor: Soul Burn; Stalker: Full Strip; Warlock: Ganbantein; Shadow Chaser: Masquerade
  - ToS: Cleric-Plague Doctor: Bloodletting; Cleric-Plague Doctor: Disenchant; Scout-Enchanter: Enchant Glove
- **Lv13 Link** (R#44) — share dmg link, CD20. variants Lv13-33.
  - RO: Crusader: Devotion; Soul Linker: Kaahi/Kaupe/Kaite/Kaize; Arch Bishop: Officium
  - ToS: Cleric-Kabbalist: Merkabah; Cleric-Kabbalist: Nachash; Scout-Linker: Joint Penalty; Scout-Linker: Lifeline

## 5. Utilities

### Buffs

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | ATK Aura | physical, aura, self, support | +10% atk aura, CD20 | R#52; 10v; Lv1-31; P0 L4 + caster enabler |
| 1 | Haste | arcane, aura, self, support | +haste aura, CD20 | R#54; 8v; Lv1-36 |
| 3 | Battery | arcane, instant, short, support | +SP regen, CD20 | R#57; 3v; Lv3-16 |
| 5 | Thorns | physical, aura, self, defense | reflect 30%, CD15 | R#55; 3v; Lv5-31 |
| 13 | Imbue | arcane, instant, self, support | imbue element, CD15 | R#58; 4v; Lv13-18 |

- **Lv1 ATK Aura** (R#52) — +10% atk aura, CD20. variants Lv1-31. P0 L4 + caster enabler.
  - RO: Acolyte: Blessing; Bard: A Poem of Bragi; Priest: Impositio Manus; Arch Bishop: Canto Candidus; Arch Bishop: Clementia
  - ToS: Cleric-Priest: Blessing; Cleric-Priest: Sacrament; Cleric-Chaplain: Last Rites; Scout-Thaumaturge: Swell Hands/Right Arm; Archer-Hwarang: war-drum buffs
- **Lv1 Haste** (R#54) — +haste aura, CD20. variants Lv1-36.
  - RO: Archer: Wind Walk; Priest: Increase AGI; Priest: Suffragium; Sorcerer: Striking
  - ToS: Archer-Archer: Swift Step; Scout-Enchanter: Agility; Wizard-Chronomancer: Haste; Wizard-Thaumaturge: Swell Body
- **Lv3 Battery** (R#57) — +SP regen, CD20. variants Lv3-16.
  - RO: Mage: Increase SP Recovery; Bard: Magic Strings
  - ToS: Scout-Squire: Refreshment Table
- **Lv5 Thorns** (R#55) — reflect 30%, CD15. variants Lv5-31.
  - RO: — (lowest-row-wins; Reflect see #42, Thorn Trap see #40)
  - ToS: Swordsman-Peltasta: High Guard; Swordsman-Murmillo: Cassis Crista; Cleric-Inquisitor: Iron Maiden
- **Lv13 Imbue** (R#58) — imbue element, CD15. variants Lv13-18.
  - RO: Soul Linker: Alchemist Spirit; Sage: Endow Blaze/Quake/Tsunami/Whirlwind
  - ToS: Scout-Enchanter: Enchant Fire; Scout-Enchanter: Enchant Lightning

### Move

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Blink | arcane, instant, self, mobility | blink 9, CD15 | R#71; 5v; Lv1-16; self-blink vs party-portal variants (portal see #78) |
| 1 | Dash | physical, instant, self, mobility | dash 6, CD8 | R#72; 6v; Lv1-40; Day-0; P0 L1 |
| 15 | Mount | physical, instant, self, mobility, stance | mount stance, CD10 | R#69; 15v; Lv15-49; stance flag |

- **Lv1 Blink** (R#71) — blink 9, CD15. variants Lv1-16. self-blink vs party-portal variants (portal see #78).
  - RO: Super Novice: Teleport; Acolyte: Teleport
  - ToS: Scout-Shinobi: Mokuton; Wizard-Psychokino: Teleportation; Wizard-Sage: Blink
- **Lv1 Dash** (R#72) — dash 6, CD8. variants Lv1-40. Day-0 arrival pool. P0 L1.
  - RO: Knight: Charge Attack; Rune Knight: Phantom Thrust
  - ToS: Archer-Archer: Leap; Swordsman-Murmillo: Evade Thrust; Swordsman-Murmillo: Sprint; Scout-Assassin: Instant Acceleration
- **Lv15 Mount** (R#69) — mount stance, CD10. variants Lv15-49. stance flag; charge variants deal damage.
  - RO: Knight: Cavalier Mastery; Crusader: Cavalry Mastery; Mechanic: Madogear License; Ranger: Warg Rider; Rune Knight: Dragon Training; Night Watch: Wild Fire
  - ToS: Scout-Schwarzer Reiter: Caracole; Scout-Schwarzer Reiter: Limacon; Scout-Schwarzer Reiter: Retreat Shot; Swordsman-Cataphract: Impaler; Swordsman-Cataphract: Rush
  + Swordsman-Cataphract: Trot; Swordsman-Hackapell: mounted archery; Scout-Hakkapeliter: mounted skills; Swordsman-Lancer: Quintain

### Sight

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Reveal | arcane, instant, short, support | reveal 9, CD12 | R#74; 8v; Lv1-39; short/long range variants by source |
| 1 | Stealth | shadow, instant, self, mobility | hide 10s, CD20 | R#73; 11v; Lv1-33 |
| 4 | Scout | arcane, instant, long, support | vision ward, CD15 | R#80; 4v; Lv4-16 |

- **Lv1 Reveal** (R#74) — reveal 9, CD12. variants Lv1-39. short/long range variants by source.
  - RO: Acolyte: Sight; Priest: Ruwach; Hunter: Detect; Warg: Keen Nose; Ranger: Keen Nose; Ranger: Focused Arrow Strike
  - ToS: Scout-Scout: Perspective; Scout-Scout: Scan
- **Lv1 Stealth** (R#73) — hide 10s, CD20. variants Lv1-33.
  - RO: Super Novice: Hiding; Thief: Hiding; Assassin: Cloaking; Rogue: Stalk; Ninja: Cicada Skin; Shadow Chaser: Shadow Form
  - ToS: Scout-Scout: Cloaking; Scout-Outlaw: Ambush; Scout-Rogue: Burrow; Scout-Rogue: Sneak Hit; Scout-Shinobi: Doton
- **Lv4 Scout** (R#80) — vision ward, CD15. variants Lv4-16.
  - RO: Mage: Sight; Wizard: Sightrasher; Wizard: Sense
  - ToS: Archer-Appraiser: Forecast

### Econ (portals see #78)

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 3 | Market | physical, instant, self, support | camp econ, fee | R#75; 19v; Lv3-31 |
| 16 | Portal | arcane, instant, long, support | portal party, CD30 | R#78; 3v; Lv16-30 |

- **Lv3 Market** (R#75) — camp econ, fee. variants Lv3-31.
  - RO: Merchant: Overcharge; Merchant: Vending; Merchant: Discount; Merchant: Enlarge Weight Limit; Taekwon: Peaceful Break
  + Blacksmith: Smith Dagger/Sword/Two-Handed Sword/Spear/Axe/Mace/Knuckle (forge!); Blacksmith: Repair Weapon
  + Alchemist: Learning Potion; Alchemist: Pharmacy
  - ToS: Scout-Appraiser: Devaluation; Scout-Appraiser: Overestimate; Scout-Squire: Armor Maintenance; Scout-Squire: Base Camp; Scout-Squire: Repair
  + Scout-Squire: Weapon Maintenance; Wizard-Alchemist: Gem Roasting; Wizard-Alchemist: Item Awakening; Wizard-Alchemist: Magnum Opus; Wizard-Alchemist: Tincturing
- **Lv16 Portal** (R#78) — portal party, CD30. variants Lv16-30.
  - RO: Priest: Warp Portal; Shadow Chaser: Dimensional Door
  - ToS: Wizard-Sage: Portal

### Survival

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Sustain | physical, instant, self, sustain | regen/potion+, CD15 | R#76; 3v; Lv1-19 |
| 4 | Endure | physical, instant, self, defense | no-flinch 10s, CD20 | R#79; 4v; Lv4-25 |

- **Lv1 Sustain** (R#76) — regen/potion+, CD15. variants Lv1-19.
  - RO: Super Novice: scattered regen; Swordman: Increase HP Recovery; Alchemist: Aid Potion
  - ToS: — (lowest-row-wins; Bear see #53, Revive see #47, Ein Sof see #49, Frenzy see #30)
- **Lv4 Endure** (R#79) — no-flinch 10s, CD20. variants Lv4-25.
  - RO: Swordman: Endure; Crusader: Shrink; Champion: Zen
  - ToS: Swordsman-Highlander: Cross Guard

## 6. Coverage

- Before: 639 catalog rows (RO 298 + ToS 341 primaries, documented).
- After: 80 unified families (one per comparison row #1-80).
- Merged away: 559 duplicate rows into shared families.
- Parsed cells: 298 RO-style + 341 ToS-style = 639.
- Every prior primary lands in exactly one family (lowest row wins).
- Day-0 pool + P0 pins preserved per family bullets.
- Tags whitelist + targeters per skill-tag-taxonomy.md; Lv gates +
  P0 pins per skill-advancement.md §§6.3-6.4; TTK + factor_base per
  classless-brainstorm.md §13.
