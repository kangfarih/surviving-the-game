# Skill Tree — Leveled Catalog

- Method: every RO skill + every ToS skill from
  docs/skills-comparison-tos-ro-coa.md rows #1-80 appears exactly once
  as primary (lowest row wins; 4 portal/blink ties fixed by override).
- CoA omitted (RO+ToS only per brief); Heal is a subtree of Holy, no top branch.
- Source shown by cell style: RO cells are Job: Name, ToS cells are Tree-Class: Name.
- Order: ascending Lv, then name, inside each Lv-band table.
- Calc: factor_base = K x (DPS x CD_eff x costMult) / (hits x aoe x cc),
  shown per skill as factor% x hits, CD, cost + effect. ~ = band estimate;
  bare numbers (5x5, 7x7, N-hit block, gem cost) are RO/ToS known values.
- Tags abbreviated (legend): phys, proj, mel, grd, chn, ins, min, sho,
  cls, shr, bst, sus, ctl, mob, sum, sup, cmb, def, bld, frz, shk, chm,
  kb, ls, exe, opn, fol, brk, stn, auto. Elements + dot/burn/fear/pull/root stay full.
- Day-0 exception (advancement §6.4): arrival grants 2 random skills
  (1 damage + 1 survival, marked Day-0) ignoring Lv gates; gates apply from first camp.
- P0 pins (advancement §6.3): Lv1 bolts/heal/dash, Lv2 wall/combo glue,
  Lv3 snare/turret, Lv4 drum/execute. All other Lv = tier floor + name-hash spread.

## 1. Level-Requirement Model

- RO tiers map to char Lv; ToS tiers map the same way; within-tier spread is draft.

| Tier | RO equiv | ToS equiv | Our Lv | Unlocks |
|---|---|---|---|---|
| Novice | Novice, SupNov | base tree | 1 | Day-0 pool, bolts |
| 1st job | Swordman-Mage-Archer | T1 adv | 1-5 | core verbs + heal |
| 2nd job | Knight-Wizard-Hunter | T2 adv | 10-20 | AoE, combo, pets |
| Trans | trans 2nd, Star Emp | T2 late | 25 | flags, drain, strip |
| 3rd job | Warlock-Ranger-Sura | T3 adv | 30-40 | fields, meteors, wards |
| 4th job | Arch Mage-Cardinal | endgame | 45-50 | ult nukes, rez, clones |

## 2. Magic

### Fire

- Lv1-5 (12)

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 1 | Mage: Fire Ball | fire,proj,shr,bst | ~120%x1 5x5, CD6 | R#2 5x5 splash |
| 1 | Mage: Fire Bolt | fire,proj,long,bst | ~150%x1, CD4, 12MP | R#1 Day-0 + bolt |
| 1 | Super Novice: Fire Bolt | fire,proj,long,bst | ~150%x1, CD4, 12MP | R#1 bolt |
| 1 | Wizard-Pyromancer: Fireball | fire,proj,long,bst | ~150%x1, CD4, 12MP | R#1 Day-0 + bolt |
| 2 | Mage: Fire Wall | fire,grd,shr,dot,burn | ~50%/t wall, CD12 | R#3 blocks + burns |
| 2 | Mage: Soul Strike | fire,proj,long,bst | ~150%x1, CD4, 12MP | R#1 bolt |
| 5 | Wizard-Pyromancer: Enchant Fire | fire,ins,shr,dot,burn | ~40%/t 6s, CD8 + burn | R#5 ignite |
| 5 | Wizard-Pyromancer: Fire Pillar | fire,proj,shr,bst | ~120%x1 spl, CD6, 14MP | R#2 splash |
| 5 | Wizard-Pyromancer: Fire Wall | fire,grd,shr,dot,burn | ~50%/t 8s, CD12, 14MP | R#3 field + burn |
| 5 | Wizard-Pyromancer: Flame Ground | fire,grd,shr,dot,burn | ~50%/t 8s, CD12, 14MP | R#3 field + burn |
| 5 | Wizard-Pyromancer: Flare | fire,proj,long,bst | ~150%x1, CD4, 12MP | R#1 bolt |
| 5 | Wizard-Pyromancer: Hell Breath | fire,proj,shr,bst | ~120%x1 spl, CD6, 14MP | R#2 splash |

- Lv6-15 (4)

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 10 | Gunslinger: Full Blast | fire,proj,shr,bst | ~120%x1 spl, CD6, 14MP | R#2 splash |
| 13 | Alchemist: Acid Terror | fire,ins,shr,dot,burn | ~40%/t 6s, CD8 + burn | R#5 ignite |
| 15 | Gunslinger: Desperado | fire,proj,shr,bst | ~120%x1 spl, CD6, 14MP | R#2 splash |
| 15 | Sage: Hindsight | fire,proj,long,bst | ~150% auto-bolt, CD6 | R#1 auto-bolt |

- Lv16-30 (12)

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 16 | Archer-Cannoneer: Cannon Shot | fire,proj,shr,bst | ~120%x1 spl, CD6, 14MP | R#2 splash |
| 16 | Archer-Cannoneer: Siege Burst | fire,grd,long,bst | ~120%x5, CD25, 30MP | R#4 sky nuke |
| 16 | Cleric-Plague Doctor: Incinerate | fire,ins,shr,dot,burn | ~40%/t 6s, CD8 + burn | R#5 ignite |
| 16 | Scout-Bullet Marker: Bloody Overdrive | fire,proj,shr,bst | ~120%x1 spl, CD6, 14MP | R#2 splash |
| 16 | Scout-Bullet Marker: Napalm Bullet | fire,proj,shr,bst | ~120%x1 spl, CD6, 14MP | R#2 splash |
| 16 | Wizard-Bokor: Damballa | fire,ins,shr,dot,burn | ~40%/t 6s, CD8 + burn | R#5 ignite |
| 16 | Wizard-Elementalist: Fire Pillar | fire,grd,shr,dot,burn | ~50%/t 8s, CD12, 14MP | R#3 field + burn |
| 16 | Wizard-Elementalist: Meteor | fire,proj,long,bst | ~150%x1, CD4, 12MP | R#1 bolt |
| 16 | Wizard-Elementalist: Storm Dust | fire,proj,long,bst | ~150%x1, CD4, 12MP | R#1 bolt |
| 16 | Wizard: Meteor Storm | fire,grd,long,bst | ~120%x5 7x7, CD25 | R#4 7x7 + stun |
| 19 | Alchemist: Bomb | fire,proj,shr,bst | ~120%x1 spl, CD6, 14MP | R#2 splash |
| 19 | Wizard: Fire Pillar | fire,grd,shr,dot,burn | ~50%/t 8s, CD12, 14MP | R#3 field + burn |

- Lv31-50 (18)

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 31 | Archer-Matross: Artillery | fire,proj,shr,bst | ~120%x1 spl, CD6, 14MP | R#2 splash |
| 31 | Archer-Matross: Orbital strike skills | fire,grd,long,bst | ~120%x5, CD25, 30MP | R#4 sky nuke |
| 31 | Wizard-Onmyoji: Fire Fox Shikigami | fire,proj,long,bst | ~150%x1, CD4, 12MP | R#1 bolt |
| 31 | Wizard-Taoist: Eradication | fire,grd,long,bst | ~120%x5, CD25, 30MP | R#4 sky nuke |
| 31 | Wizard-Taoist: Storm Calling | fire,proj,long,bst | ~150%x1, CD4, 12MP | R#1 bolt |
| 31 | Wizard-Terramancer: Ember Field | fire,grd,shr,dot,burn | ~50%/t 8s, CD12, 14MP | R#3 field + burn |
| 34 | Rebellion: Dragon Tail | fire,ins,shr,dot,burn | ~40%/t 6s, CD8 + burn | R#5 ignite |
| 35 | Genetic: Fire Expansion | fire,ins,shr,dot,burn | ~40%/t 6s, CD8 + burn | R#5 ignite |
| 35 | Sorcerer: Warmer | fire,grd,shr,dot,burn | ~50%/t 8s, CD12, 14MP | R#3 field + burn |
| 35 | Warlock: Crimson Rock | fire,grd,long,bst | ~120%x5, CD25, 30MP | R#4 sky nuke |
| 36 | Warlock: Summon Fire Ball | fire,proj,long,bst | ~150%x1, CD4, 12MP | R#1 bolt |
| 38 | Warlock: Comet | fire,grd,long,bst | ~120%x5, CD25, 30MP | R#4 sky nuke |
| 40 | Mechanic: Arm Cannon | fire,proj,shr,bst | ~120%x1 spl, CD6, 14MP | R#2 splash |
| 45 | Arch Mage: All Bloom | fire,grd,long,bst | ~120%x5, CD25, 30MP | R#4 sky nuke |
| 45 | Arch Mage: Crimson Arrow | fire,grd,long,bst | ~120%x5, CD25, 30MP | R#4 sky nuke |
| 48 | Elemental Master: Conflagration | fire,grd,shr,dot,burn | ~50%/t 8s, CD12, 14MP | R#3 field + burn |
| 49 | Arch Mage: Floral Flare Road | fire,grd,long,bst | ~120%x5, CD25, 30MP | R#4 sky nuke |
| 49 | Hyper Novice: Self Study Sorcery | fire,proj,long,bst | ~150%x1, CD4, 12MP | R#1 bolt |

### Frost

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 1 | Super Novice: Cold Bolt | frost,proj,long,bst | ~150%x1, CD4, 12MP | R#6 bolt |
| 1 | Wizard: Frost Nova | frost,nova,shr,bst,frz | ~110% AoE, CD9 + chill | R#7 Day-0 + nova + chill |
| 4 | Mage: Cold Bolt | frost,proj,long,bst | ~150%x1, CD4, 12MP | R#6 bolt |
| 5 | Wizard-Cryomancer: Ice Blast | frost,nova,shr,bst,frz | ~110% AoE, CD9 + chill | R#7 nova + chill |
| 5 | Wizard-Cryomancer: Ice Bolt | frost,proj,long,bst | ~150%x1, CD4, 12MP | R#6 bolt |
| 5 | Wizard-Cryomancer: Ice Pike | frost,proj,shr,bst,frz | ~130% line, CD8 + frz | R#8 lane spikes |
| 5 | Wizard-Cryomancer: Snow Rolling | frost,nova,shr,bst,frz | ~110% AoE, CD9 + chill | R#7 nova + chill |
| 10 | Wizard: Water Ball | frost,proj,shr,bst,frz | ~130% line, CD8 | R#8 needs water |
| 13 | Wizard: Storm Gust | frost,nova,shr,bst,frz | ~110% AoE, CD9 + chill | R#7 nova + chill |
| 16 | Wizard-Elementalist: Frost Cloud | frost,nova,shr,bst,frz | ~110% AoE, CD9 + chill | R#7 nova + chill |
| 16 | Wizard-Elementalist: Hail | frost,proj,long,bst | ~150%x1, CD4, 12MP | R#6 bolt |
| 16 | Wizard-Rune Caster: Rune of Ice | frost,proj,shr,bst,frz | ~130% line, CD8 + frz | R#8 lane spikes |
| 31 | Warlock: Frost Misty | frost,nova,shr,bst,frz | ~110% AoE, CD9 + chill | R#7 nova + chill |
| 31 | Wizard-Keraunos: Blizzard Drive | frost,nova,shr,bst,frz | ~110% AoE, CD9 + chill | R#7 nova + chill |
| 31 | Wizard-Onmyoji: Water Shikigami | frost,proj,long,bst | ~150%x1, CD4, 12MP | R#6 bolt |
| 31 | Wizard-Taoist: reduced-lane charms | frost,proj,shr,bst,frz | ~130% line, CD8 + frz | R#8 lane spikes |
| 39 | Warlock: Jack Frost | frost,proj,long,bst | ~150%x1, CD4, 12MP | R#6 bolt |
| 40 | Sorcerer: Varetyr Spear | frost,proj,shr,bst,frz | ~130% line, CD8 + frz | R#8 lane spikes |
| 40 | Warlock: Summon Water Ball | frost,proj,long,bst | ~150%x1, CD4, 12MP | R#6 bolt |
| 45 | Arch Mage: Crystal Impact | frost,proj,shr,bst,frz | ~130% line, CD8 + frz | R#8 lane spikes |
| 46 | Arch Mage: Frozen Slash | frost,nova,shr,bst,frz | ~110% AoE, CD9 + chill | R#7 nova + chill |
| 48 | Arch Mage: Rain of Crystal | frost,nova,shr,bst,frz | ~110% AoE, CD9 + chill | R#7 nova + chill |

### Storm

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 1 | Super Novice: Lightning Bolt | storm,proj,long,bst,shk | ~150%x1, CD4 + shk | R#10 bolt + shk |
| 3 | Mage: Thunderstorm | storm,grd,long,bst,shk | ~110%x3 bnc, CD12 + shk | R#11 chain storm |
| 5 | Cleric-Krivis: Zaibas | storm,proj,long,bst,shk | ~150%x1, CD4 + shk | R#10 bolt + shk |
| 5 | Mage: Lightning Bolt | storm,proj,long,bst,shk | ~150%x1, CD4 + shk | R#10 bolt + shk |
| 16 | Wizard-Elementalist: Electrocute | storm,proj,long,bst,shk | ~150%x1, CD4 + shk | R#10 bolt + shk |
| 18 | Wizard: Jupitel Thunder | storm,proj,long,bst,shk | ~100%x5 + kb, CD5 | R#10 multi-hit |
| 18 | Wizard: Lord of Vermilion | storm,grd,long,bst,shk | ~110%x3 bnc, CD12 + shk | R#11 chain storm |
| 30 | Warlock: Earth Strain | storm,grd,long,bst,shk | ~110%x3 bnc, CD12 + shk | R#11 chain storm |
| 31 | Wizard-Keraunos: Chain Volta | storm,grd,long,bst,shk | ~110%x3 bnc, CD12 + shk | R#11 chain storm |
| 31 | Wizard-Keraunos: Lightning Strike | storm,proj,long,bst,shk | ~150%x1, CD4 + shk | R#10 bolt + shk |
| 31 | Wizard-Taoist: Zaibas | storm,proj,long,bst,shk | ~150%x1, CD4 + shk | R#10 bolt + shk |
| 34 | Warlock: Chain Lightning | storm,proj,long,bst,shk | ~150%x1, CD4 + shk | R#10 bolt + shk |
| 45 | Arch Mage: Tornado Storm | storm,grd,long,bst,shk | ~110%x3 bnc, CD12 + shk | R#11 chain storm |
| 49 | Arch Mage: Storm Cannon | storm,grd,long,bst,shk | ~110%x3 bnc, CD12 + shk | R#11 chain storm |
| 50 | Arch Mage: Destructive Hurricane | storm,grd,long,bst,shk | ~110%x3 bnc, CD12 + shk | R#11 chain storm |

### Arcane

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 16 | Wizard-Psychokino: Gravity Pole | arcane,chn,long,bst | ~200% chn 2s, CD10 | R#27 beam |
| 16 | Wizard-Psychokino: Psychic Pressure | arcane,chn,long,bst | ~200% chn 2s, CD10 | R#27 beam |
| 31 | Wizard-Onmyoji: Toyou | arcane,chn,long,bst | ~200% chn 2s, CD10 | R#27 beam |
| 32 | Warlock: Tetra Vortex | arcane,chn,long,bst | ~180%x4 elem, CD15 | R#27 elem combo |
| 36 | Soul Reaper: Soul Curse | arcane,chn,long,bst | ~200% chn 2s, CD10 | R#27 beam |
| 50 | Arch Mage: Astral Strike | arcane,chn,long,bst | ~200% chn 2s, CD10 | R#27 beam |

### Shadow

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 3 | Mage: Napalm Beat | shadow,proj,long,bst | ~140%x1, CD5 | R#16 ghost line |
| 15 | Wizard: Napalm Vulcan | shadow,proj,long,bst | ~140%x1, CD5 | R#16 ghost line |
| 16 | Wizard-Bokor: Effigy | shadow,proj,long,bst | ~140%x1, CD5 | R#16 ghost line |
| 16 | Wizard-Bokor: Hexing | shadow,proj,long,bst | ~140%x1, CD5 | R#16 ghost line |
| 31 | Cleric-Zealot: Immolation | shadow,proj,long,bst | ~140%x1, CD5 | R#16 ghost line |
| 31 | Warlock: Soul Expansion | shadow,proj,long,bst | ~140%x1, CD5 | R#16 ghost line |
| 31 | Wizard-Shadowmancer: Shadow Condensation | shadow,proj,long,bst | ~140%x1, CD5 | R#16 ghost line |
| 31 | Wizard-Shadowmancer: Shadow Eruption | shadow,proj,long,bst | ~140%x1, CD5 | R#16 ghost line |
| 31 | Wizard-Shadowmancer: Shadow Thorn | shadow,proj,long,bst | ~140%x1, CD5 | R#16 ghost line |
| 31 | Wizard-Warlock: Dark Theurge | shadow,proj,long,bst | ~140%x1, CD5 | R#16 ghost line |
| 31 | Wizard-Warlock: Evil Sacrifice | shadow,proj,long,bst | ~140%x1, CD5 | R#16 ghost line |
| 31 | Wizard-Warlock: Mastema | shadow,proj,long,bst | ~140%x1, CD5 | R#16 ghost line |
| 36 | Warlock: Drain Life | shadow,proj,long,bst | ~140%x1, CD5 | R#16 ghost line |
| 36 | Warlock: White Imprison | shadow,proj,long,bst | ~140%x1, CD5 | R#16 ghost line |
| 37 | Warlock: Hell Inferno | shadow,proj,long,bst | ~140%x1, CD5 | R#16 ghost line |
| 49 | Arch Mage: Deadly Projection | shadow,proj,long,bst | ~140%x1, CD5 | R#16 ghost line |
| 49 | Arch Mage: Soul Vulcan Strike | shadow,proj,long,bst | ~140%x1, CD5 | R#16 ghost line |

### Blood

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 16 | Swordsman-Luchador: Bloodsport | blood,proj,shr,sus,ls | ~100% + heal 50%, CD8 | R#19 HP loop |
| 16 | Wizard-Featherfoot: Blood Bath | blood,proj,shr,sus,ls | ~100% + heal 50%, CD8 | R#19 HP loop |
| 16 | Wizard-Featherfoot: Blood Sucking | blood,proj,shr,sus,ls | ~100% + heal 50%, CD8 | R#19 HP loop |
| 16 | Wizard-Featherfoot: Kurdaitcha | blood,proj,shr,sus,ls | ~100% + heal 50%, CD8 | R#19 HP loop |
| 16 | Wizard-Featherfoot: Ngadhundi | blood,proj,shr,sus,ls | ~100% + heal 50%, CD8 | R#19 HP loop |
| 17 | Ninja: Shadow Slash | blood,proj,shr,sus,ls | ~100% + heal 50%, CD8 | R#19 HP loop |
| 30 | Kagerou: Soul Deprivation | blood,proj,shr,sus,ls | ~100% + heal 50%, CD8 | R#19 HP loop |
| 31 | Cleric-Zealot: Blind Faith | blood,proj,shr,sus,ls | ~100% + heal 50%, CD8 | R#19 HP loop |
| 34 | Rebellion: Bloodsucker | blood,proj,shr,sus,ls | ~100% + heal 50%, CD8 | R#19 HP loop |

### Poison

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 1 | Super Novice: Envenom | poison,proj,shr,dot | ~90% + psn 4s, CD5 | R#17 sting |
| 1 | Thief: Envenom | poison,proj,shr,dot | ~90% + psn 4s, CD5 | R#17 sting |
| 5 | Archer-Wugushi: Bewitch | poison,grd,shr,dot | ~50%/t 8s, CD12 + psn | R#18 cloud |
| 5 | Archer-Wugushi: Jincan Gu | poison,grd,shr,dot | ~50%/t 8s, CD12 + psn | R#18 cloud |
| 5 | Archer-Wugushi: Needle Blow | poison,proj,shr,dot | ~90% + psn 4s, CD5 | R#17 sting |
| 5 | Archer-Wugushi: Wugong Gu | poison,proj,shr,dot | ~90% + psn 4s, CD5 | R#17 sting |
| 5 | Archer-Wugushi: Zhendu | poison,grd,shr,dot | ~50%/t 8s, CD12 + psn | R#18 cloud |
| 10 | Alchemist: Acid Demonstration | poison,grd,shr,dot | ~50%/t 8s, CD12 + psn | R#18 cloud |
| 13 | Assassin: Enchant Poison | poison,proj,shr,dot | ~90% + psn 4s, CD5 | R#17 sting |
| 16 | Assassin: Venom Dust | poison,grd,shr,dot | ~50%/t 8s, CD12 + psn | R#18 cloud |
| 16 | Cleric-Plague Doctor: Black Death Steam | poison,grd,shr,dot | ~50%/t 8s, CD12 + psn | R#18 cloud |
| 16 | Scout-Rogue: Vendetta | poison,proj,shr,dot | ~90% + psn 4s, CD5 | R#17 sting |
| 16 | Wizard-Featherfoot: Bone Pointing | poison,proj,shr,dot | ~90% + psn 4s, CD5 | R#17 sting |
| 31 | Scout-Rangda: Miasma | poison,grd,shr,dot | ~50%/t 8s, CD12 + psn | R#18 cloud |
| 33 | Guillotine Cross: Poisoning Weapon | poison,grd,shr,dot | ~50%/t 8s, CD12 + psn | R#18 cloud |
| 36 | Genetic: Hell Plant | poison,grd,shr,dot | bite plant, CD15 | R#18 bite plant |
| 36 | Guillotine Cross: Venom Impression | poison,proj,shr,dot | ~90% + psn 4s, CD5 | R#17 sting |

### Holy

#### Nukes

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 1 | Acolyte: Ruwach | holy,proj,long,bst | reveal 9, CD12 | R#14 stealth tax |
| 3 | Acolyte: Holy Light | holy,proj,long,bst | ~150%x1, CD5 | R#14 undead slayer |
| 5 | Acolyte: Turn Undead | holy,proj,long,bst | exe vs undead, CD8 | R#14 undead exe |
| 5 | Cleric-Priest: Aspersion | holy,proj,long,bst | ~150%x1, CD5 | R#14 undead slayer |
| 5 | Cleric-Priest: Exorcise | holy,proj,long,bst | ~150%x1, CD5 | R#14 undead slayer |
| 16 | Cleric-Chaplain: Aspergillum | holy,proj,long,bst | ~150%x1, CD5 | R#14 undead slayer |
| 16 | Cleric-Miko: Hamaya | holy,grd,shr,bst | ~120% zone, CD12 | R#15 exorcism zone |
| 16 | Priest: Aspersio-boosted | holy,proj,long,bst | ~150%x1, CD5 | R#14 undead slayer |
| 17 | Priest: Magnus Exorcismus | holy,grd,shr,bst | ~120% zone, CD12 | R#15 undead zone |
| 20 | Crusader: Grand Cross | holy,grd,shr,bst | ~150% self-HP, CD10 | R#15 self HP cost |
| 31 | Cleric-Crusader: Holy Ground | holy,grd,shr,bst | ~120% zone, CD12 | R#15 exorcism zone |
| 31 | Cleric-Crusader: Smite | holy,proj,long,bst | ~150%x1, CD5 | R#14 undead slayer |
| 31 | Cleric-Exorcist: Entity | holy,proj,long,bst | ~150%x1, CD5 | R#14 undead slayer |
| 31 | Cleric-Exorcist: Gregorate | holy,grd,shr,bst | ~120% zone, CD12 | R#15 exorcism zone |
| 31 | Cleric-Exorcist: Katadikazo | holy,grd,shr,bst | ~120% zone, CD12 | R#15 exorcism zone |
| 31 | Cleric-Exorcist: Koinonia | holy,grd,shr,bst | ~120% zone, CD12 | R#15 exorcism zone |
| 31 | Cleric-Exorcist: Rubric | holy,proj,long,bst | ~150%x1, CD5 | R#14 undead slayer |
| 31 | Cleric-Inquisitor: God Smash | holy,grd,shr,bst | ~120% zone, CD12 | R#15 exorcism zone |
| 32 | Arch Bishop: Adoramus | holy,grd,shr,bst | ~120% zone, CD12 | R#15 exorcism zone |
| 35 | Arch Bishop: Judex | holy,proj,long,bst | ~150%x1, CD5 | R#14 undead slayer |
| 45 | Cardinal: Effligo | holy,grd,shr,bst | ~120% zone, CD12 | R#15 exorcism zone |
| 48 | Cardinal: Arbitrium | holy,proj,long,bst | ~150%x1, CD5 | R#14 undead slayer |
| 48 | Cardinal: Framen | holy,proj,long,bst | ~150%x1, CD5 | R#14 undead slayer |

#### Heal

- Lv1-5 (13)

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 1 | Acolyte: Heal | holy,ins,shr,sup | heal ~120%, CD10 | R#47 Day-0 + point heal |
| 1 | Cleric-Cleric: Cure | holy,ins,shr,sup | heal ~120%, CD10 | R#47 point heal |
| 1 | Cleric-Cleric: Heal | holy,ins,shr,sup | heal ~120%, CD10 | R#47 Day-0 + point heal |
| 1 | Super Novice: Heal | holy,ins,shr,sup | heal ~120%, CD10 | R#47 point heal |
| 2 | Acolyte: Cure | holy,ins,shr,sup | cleanse, CD10 | R#56 cure |
| 2 | Mage: Safety Wall | holy,ins,self,def | block N hits 6s, CD14 | R#51 Day-0 + N-hit block |
| 5 | Cleric-Priest: Cure | holy,ins,shr,sup | cleanse, CD10 | R#56 cure |
| 5 | Cleric-Priest: Heal | holy,ins,shr,sup | heal ~120%, CD10 | R#47 point heal |
| 5 | Cleric-Priest: Healing Factor | holy,grd,shr,sup | heal ~80%/t zone, CD15 | R#48 heal zone |
| 5 | Cleric-Priest: Mass Heal | holy,ins,shr,sup | heal ~120%, CD10 | R#47 point heal |
| 5 | Cleric-Priest: Resurrection | holy,ins,shr,sup | rez 100%, CD60 | R#50 rez |
| 5 | Cleric-Priest: Revive | holy,ins,shr,sup | pre-death buff, CD30 | R#47 death ward |
| 5 | Cleric-Priest: Stone Skin | holy,ins,self,def | block 3 hits, CD14 | R#51 ward |

- Lv6-15 (2)

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 11 | Priest: Highness Heal | holy,ins,shr,sup | heal ~120%, CD10 | R#47 point heal |
| 12 | Soul Linker: Kaizel | holy,ins,shr,sup | auto-rez on hit, CD60 | R#50 auto-rez buff |

- Lv16-30 (17)

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 16 | Cleric-Chaplain: Deploy Capella | holy,ins,shr,sup | heal ~120%, CD10 | R#47 point heal |
| 16 | Cleric-Dievdirbys: Statue of Goddess Ausrine | holy,grd,shr,sup | heal ~80%/t zone, CD15 | R#48 heal zone |
| 16 | Cleric-Dievdirbys: Statue of Goddess Zemyna | holy,ins,self,def | +SP regen, CD20 | R#51 SP statue |
| 16 | Cleric-Druid: Sterea Trofh | holy,aura,self,sus,sup | invuln regen, CD60 | R#49 invuln |
| 16 | Cleric-Kabbalist: Ein Sof | holy,aura,self,sus,sup | +maxHP regen, CD20 | R#49 max-HP |
| 16 | Cleric-Kabbalist: R7x | holy,ins,shr,sup | rez 100%, CD60 | R#50 rez |
| 16 | Cleric-Miko: Clap | holy,grd,shr,sup | heal ~80%/t zone, CD15 | R#48 heal zone |
| 16 | Cleric-Paladin: Barrier | holy,ins,self,def | magic wall, CD18 | R#51 barrier |
| 16 | Cleric-Paladin: Sanctuary | holy,ins,self,def | block 3 hits, CD14 | R#51 ward |
| 16 | Cleric-Pardoner: Indulgentia | holy,ins,shr,sup | cleanse, CD10 | R#56 cure |
| 16 | Cleric-Plague Doctor: Beak Mask | holy,aura,self,sus,sup | HoT ~30%/2s x5, CD15 | R#49 HoT |
| 16 | Cleric-Plague Doctor: Fumigate | holy,ins,shr,sup | cleanse, CD10 | R#56 cure |
| 16 | Cleric-Plague Doctor: Healing Factor | holy,aura,self,sus,sup | HoT, CD15 | R#49 HoT |
| 16 | Summoner: Fresh Shrimp | holy,aura,self,sus,sup | HoT ~30%/2s x5, CD15 | R#49 HoT |
| 17 | Priest: Sanctuary | holy,grd,shr,sup | heal ~80%/t, CD15 | R#48 heals + hits undead |
| 18 | Priest: Resurrection | holy,ins,shr,sup | rez 100%, CD60 | R#50 rez |
| 30 | Arch Bishop: Coluceo Heal | holy,grd,shr,sup | heal ~80%/t zone, CD15 | R#48 heal zone |

- Lv31-50 (11)

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 31 | Arch Bishop: Highness Heal | holy,grd,shr,sup | heal ~150%, CD12 | R#48 big heal |
| 31 | Royal Guard: Inspiration | holy,aura,self,sus,sup | HoT ~30%/2s x5, CD15 | R#49 HoT |
| 32 | Arch Bishop: Clearance | holy,grd,shr,sup | cleanse, CD10 | R#48 cleanse |
| 33 | Arch Bishop: Heal | holy,ins,shr,sup | heal ~120%, CD10 | R#47 point heal |
| 33 | Arch Bishop: Lauda Ramus | holy,ins,shr,sup | cleanse, CD10 | R#56 cure |
| 33 | Royal Guard: King's Grace | holy,ins,shr,sup | cleanse, CD10 | R#56 cure |
| 34 | Arch Bishop: Epiclesis | holy,grd,shr,sup | heal zone + SP, CD20 | R#48 heal + battery |
| 34 | Arch Bishop: Lauda Agnus | holy,ins,shr,sup | cleanse, CD10 | R#56 cure |
| 34 | Arch Bishop: Renovatio | holy,aura,self,sus,sup | HoT ~30%/2s, CD15 | R#49 HoT |
| 38 | Arch Bishop: Resurrection | holy,ins,shr,sup | rez 100%, CD60 | R#50 rez |
| 50 | Spirit Handler: Spirit rebirth | holy,ins,shr,sup | rez 100%, CD60 | R#50 rez |

#### Ward

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 1 | Swordsman-Swordsman: Bear | holy,aura,self,sup | +DEF aura, CD20 | R#53 DEF buff |
| 1 | Swordsman-Swordsman: Pain Barrier | holy,ins,self,def | immune flinch, CD30 | R#77 anti-flinch |
| 2 | Acolyte: Angelus | holy,aura,self,sup | +DEF aura, CD20 | R#53 DEF buff |
| 5 | Acolyte: Increase AGI | holy,ins,shr,sup | +AGI/move, CD15 | R#59 agi buff |
| 10 | Priest: Kyrie Eleison | holy,aura,self,sup | hit barrier, CD18 | R#53 hit barrier |
| 13 | Crusader: Guard | holy,aura,self,sup | +DEF aura, CD20 | R#53 DEF buff |
| 14 | Crusader: Defender | holy,aura,self,sup | +DEF aura, CD20 | R#53 DEF buff |
| 16 | Cleric-Miko: Kagura | holy,ins,shr,sup | +stats buff, CD15 | R#59 bless |
| 16 | Cleric-Monk: Golden Bell Shield | holy,ins,self,def | immune 3s, CD60 | R#77 oh-shit |
| 16 | Cleric-Monk: Iron Skin | holy,ins,self,def | immune 3s, CD60 | R#77 oh-shit |
| 16 | Cleric-Paladin: Resist Elements | holy,aura,self,sup | +DEF aura, CD20 | R#53 DEF buff |
| 16 | Scout-Squire: Arrest | holy,ins,shr,def | redirect ally, CD20 | R#60 bodyguard |
| 16 | Scout-Thaumaturge: Shrink Body | holy,ins,shr,sup | +stats buff, CD15 | R#59 bless |
| 16 | Scout-Thaumaturge: Swell Body/Hands/Left Ar~ | holy,ins,shr,sup | +stats buff, CD15 | R#59 bless |
| 16 | Swordsman-Rodelero: Slithering | holy,aura,self,sup | +DEF aura, CD20 | R#53 DEF buff |
| 16 | Swordsman-Templar: Non-Invasive Area | holy,ins,shr,def | redirect ally, CD20 | R#60 bodyguard |
| 17 | Priest: Assumptio | holy,aura,self,sup | hard DEF, CD25 | R#53 hard mit |
| 31 | Archer-Hwarang: chant buffs | holy,ins,shr,sup | +stats buff, CD15 | R#59 bless |
| 32 | Mechanic: Magnetic Field | holy,ins,shr,def | redirect ally, CD20 | R#60 bodyguard |
| 37 | Sura: Gentle Touch-Revitalize | holy,ins,self,def | immune 3s, CD60 | R#77 oh-shit |

### Nature

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 16 | Cleric-Dievdirbys: Carve Owl/Laima/Austras | nature,min,shr,sum | plant/ward, CD15 | R#67 rooted |
| 16 | Cleric-Druid: Carnivory | nature,min,shr,sum | plant/ward, CD15 | R#67 rooted |
| 16 | Cleric-Druid: Chortasmata | nature,min,shr,sum | plant/ward, CD15 | R#67 rooted |
| 16 | Cleric-Druid: Henge Stone | nature,ins,shr,ctl,chm | tame/charm, CD20 | R#70 tame |
| 16 | Cleric-Druid: Telepath | nature,ins,shr,ctl,chm | tame/charm, CD20 | R#70 tame |
| 16 | Scout-Rogue: Capturing | nature,ins,shr,ctl,chm | tame/charm, CD20 | R#70 tame |
| 17 | Summoner: Spirit Communication | nature,ins,shr,ctl,chm | tame/charm, CD20 | R#70 tame |
| 20 | Sage: Hocus Pocus | nature,ins,shr,ctl,chm | tame/charm, CD20 | R#70 tame |
| 35 | Sorcerer: Spirit Control | nature,min,shr,sum | plant/ward, CD15 | R#67 rooted |

### Summon

- Lv1-5 (7)

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 3 | Archer-Sapper: Spike Shooter | phys,trap,shr,sum | turret ~60%/2s, CD18 | R#64 Day-0 + static DPS |
| 5 | Archer-Hunter: Growling | phys,min,long,sum | beast pet, CD20 | R#66 beast |
| 5 | Archer-Hunter: Hounding | phys,min,long,sum | beast pet, CD20 | R#66 beast |
| 5 | Archer-Hunter: Praise | phys,min,long,sum | beast pet, CD20 | R#66 beast |
| 5 | Archer-Hunter: Retrieve | phys,min,long,sum | beast pet, CD20 | R#66 beast |
| 5 | Archer-Hunter: Rush Dog | phys,min,long,sum | beast pet, CD20 | R#66 beast |
| 5 | Archer-Quarrel Shooter: Deploy Pavise | phys,trap,shr,sum | turret ~60%/2s, CD18 | R#64 static DPS |

- Lv6-15 (13)

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 10 | Alchemist: Call Homunculus | phys,min,shr,sum | pet loyal, CD25 | R#61 loyalty pet |
| 10 | Hunter: Claymore Trap | phys,trap,shr,dot | trap ~60%/t, CD12 | R#65 minefield |
| 10 | Summoner: Spirit summons | phys,min,long,sum | beast pet, CD20 | R#66 beast |
| 11 | Hunter: Blast Mine | phys,trap,shr,dot | trap ~60%/t, CD12 | R#65 minefield |
| 11 | Hunter: Sandman | phys,trap,shr,dot | trap ~60%/t, CD12 | R#65 minefield |
| 11 | Hunter: Shockwave Trap | phys,trap,shr,dot | trap ~60%/t, CD12 | R#65 minefield |
| 11 | Summoner: Arclouse Dash | phys,min,cls,sum,def | tank pet, CD25 | R#63 meat wall |
| 12 | Alchemist: Homunculus Amistr | phys,min,cls,sum,def | tank pet, CD25 | R#63 meat wall |
| 12 | Summoner: Doram Spirit summons | phys,min,shr,sum | pet x3 melee, CD20 | R#61 swarm |
| 13 | Hunter: Blitz Beat | phys,min,long,sum | ~120% falcon, CD5 | R#66 falcon strike |
| 13 | Hunter: Land Mine | phys,trap,shr,dot | trap ~60%/t, CD12 | R#65 minefield |
| 14 | Ninja: Mirror Image | arcane,min,self,sum | clone 10s, CD30 | R#68 echo |
| 15 | Hunter: Talkie Box | phys,trap,shr,dot | trap ~60%/t, CD12 | R#65 minefield |

- Lv16-30 (31)

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 16 | Archer-Falconer: Call | phys,min,long,sum | hawk pet, CD20 | R#66 hawk |
| 16 | Archer-Falconer: Call + Hanging Shot | arcane,min,long,sum | pet ranged, CD20 | R#62 caster pet |
| 16 | Archer-Falconer: Circling | phys,min,long,sum | beast pet, CD20 | R#66 beast |
| 16 | Archer-Falconer: Hanging Shot | phys,min,long,sum | beast pet, CD20 | R#66 beast |
| 16 | Archer-Falconer: Hovering | phys,min,long,sum | beast pet, CD20 | R#66 beast |
| 16 | Archer-Falconer: Pheasant | phys,min,long,sum | beast pet, CD20 | R#66 beast |
| 16 | Archer-Falconer: Pre-Emptive Strike | phys,min,long,sum | beast pet, CD20 | R#66 beast |
| 16 | Archer-Falconer: Roost | phys,min,long,sum | beast pet, CD20 | R#66 beast |
| 16 | Archer-Falconer: Sonic Strike | phys,min,long,sum | beast pet, CD20 | R#66 beast |
| 16 | Archer-Sapper: Broom Trap | phys,trap,shr,dot | trap ~60%/t, CD12 | R#65 minefield |
| 16 | Archer-Sapper: Claymore | phys,trap,shr,sum | turret ~60%/2s, CD18 | R#64 static DPS |
| 16 | Archer-Sapper: Conceal | phys,trap,shr,dot | trap ~60%/t, CD12 | R#65 minefield |
| 16 | Archer-Sapper: Punji Stake | phys,trap,shr,dot | trap ~60%/t, CD12 | R#65 minefield |
| 16 | Cleric-Dievdirbys: Carve Owl | phys,min,cls,sum,def | tank pet, CD25 | R#63 meat wall |
| 16 | Scout-Shinobi: Bunshin no Jutsu | arcane,min,self,sum | clone 10s, CD30 | R#68 echo |
| 16 | Swordsman-Doppelsoeldner: Deeds of Valor | arcane,min,self,sum | clone 10s, CD30 | R#68 echo |
| 16 | Wizard-Bokor: Bwa Kayiman | phys,min,shr,sum | pet x3 melee, CD20 | R#61 swarm |
| 16 | Wizard-Necromancer: Corpse Tower | phys,min,cls,sum,def | wall-minion, CD25 | R#63 wall-minion |
| 16 | Wizard-Necromancer: Create Shoggoth | phys,min,shr,sum | pet x3 melee, CD20 | R#61 swarm |
| 16 | Wizard-Necromancer: Raise Dead | phys,min,shr,sum | skeletons x4, CD25 | R#61 chaff swarm |
| 16 | Wizard-Necromancer: Raise Skull Archer | arcane,min,long,sum | pet ranged, CD20 | R#62 caster pet |
| 16 | Wizard-Necromancer: Raise Skull Mage | arcane,min,long,sum | pet ranged, CD20 | R#62 caster pet |
| 16 | Wizard-Necromancer: Raise Skull Swordsman | phys,min,cls,sum,def | tank pet, CD25 | R#63 meat wall |
| 16 | Wizard-Sorcerer: Morph | arcane,min,long,sum | pet ranged, CD20 | R#62 caster pet |
| 16 | Wizard-Sorcerer: Summon Familiar | arcane,min,long,sum | pet ranged, CD20 | R#62 caster pet |
| 16 | Wizard-Sorcerer: Summon Salamion | phys,min,shr,sum | pet x3 melee, CD20 | R#61 swarm |
| 16 | Wizard-Sorcerer: Summon Servant | phys,min,shr,sum | pet x3 melee, CD20 | R#61 swarm |
| 17 | Alchemist: Homunculus | arcane,min,long,sum | pet ranged, CD20 | R#62 caster pet |
| 18 | Hunter: Falcon Eyes | phys,min,long,sum | beast pet, CD20 | R#66 beast |
| 25 | Biochemist: Homunculus skills | phys,min,shr,sum | pet x3 melee, CD20 | R#61 swarm |
| 25 | Sniper: Falcon Assault | phys,min,long,sum | beast pet, CD20 | R#66 beast |

- Lv31-50 (10)

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 31 | Ranger: Warg Dash | phys,min,long,sum | beast pet, CD20 | R#66 beast |
| 31 | Ranger: Warg Strike | phys,min,long,sum | beast pet, CD20 | R#66 beast |
| 33 | Ranger: Tooth of Warg | phys,min,long,sum | beast pet, CD20 | R#66 beast |
| 35 | Kagerou: Empty Shadow | arcane,min,self,sum | clone 10s, CD30 | R#68 echo |
| 35 | Rebellion: Anti-Material Blast | phys,trap,shr,sum | turret ~60%/2s, CD18 | R#64 static DPS |
| 35 | Sorcerer: Summon Aqua/Fire/Wind/Earth | arcane,min,long,sum | pet ranged, CD20 | R#62 caster pet |
| 37 | Genetic: Bloodsucker Plant | phys,trap,shr,dot | trap ~60%/t, CD12 | R#65 minefield |
| 38 | Ranger: Detonator | phys,trap,shr,dot | trap ~60%/t, CD12 | R#65 minefield |
| 48 | Night Watch: Frontier deployments | phys,trap,shr,sum | turret ~60%/2s, CD18 | R#64 static DPS |
| 48 | Shiranui: Soul Veil | arcane,min,self,sum | clone 10s, CD30 | R#68 echo |

## 3. Physical

### Single

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 1 | Swordsman-Swordsman: Bash | phys,mel,cls,bst | ~150%x1, CD4 | R#20 weapon hit |
| 1 | Swordsman-Swordsman: Thrust | phys,mel,cls,bst | ~150%x1, CD4 | R#20 weapon hit |
| 2 | Mage: Stone Curse | phys,proj,long,bst | ~60% + petrify, CD15 | R#12 red gem cost |
| 2 | Monk: Triple Attack | phys,mel,cls,bst | ~150%x1, CD4 | R#20 P0 L2 + weapon hit |
| 5 | Swordman: Bash | phys,mel,cls,bst | ~150%x1, CD4 | R#20 weapon hit |
| 5 | Swordsman-Barbarian: Frenzy | phys,nova,cls,bst | ~250% self 10%, CD20 | R#30 risk meter |
| 5 | Swordsman-Highlander: Cartar Stroke | phys,mel,cls,bst | ~150%x1, CD4 | R#20 weapon hit |
| 5 | Swordsman-Highlander: Skull Swing | phys,mel,cls,bst | ~150%x1, CD4 | R#20 weapon hit |
| 14 | Wizard: Earth Spike | phys,proj,long,bst | ~90%x5, CD5 | R#12 up to 5 hits |
| 15 | Knight: Pierce | phys,mel,cls,bst | ~150%x1, CD4 | R#20 weapon hit |
| 16 | Knight: Brandish Spear | phys,mel,cls,bst | ~150%x1, CD4 | R#20 weapon hit |
| 16 | Scout-Shinobi: Mijin no Jutsu | phys,nova,cls,bst | ~250% self 10%, CD20 | R#30 risk meter |
| 16 | Swordsman-Fencer: Attaque Composee | phys,mel,cls,bst | ~150%x1, CD4 | R#20 weapon hit |
| 16 | Swordsman-Fencer: Lunge | phys,mel,cls,bst | ~150%x1, CD4 | R#20 weapon hit |
| 16 | Swordsman-Fencer: Sept Etoiles | phys,mel,cls,bst | ~150%x1, CD4 | R#20 weapon hit |
| 16 | Swordsman-Luchador: self-slam | phys,nova,cls,bst | ~250% self 10%, CD20 | R#30 risk meter |
| 16 | Swordsman-Monk (Cleric): Double Punch | phys,mel,cls,bst | ~150%x1, CD4 | R#20 weapon hit |
| 16 | Swordsman-Monk (Cleric): God Finger Flick | phys,mel,cls,bst | ~150%x1, CD4 | R#20 weapon hit |
| 16 | Swordsman-Monk (Cleric): One Inch Punch | phys,mel,cls,bst | ~150%x1, CD4 | R#20 weapon hit |
| 16 | Swordsman-Monk (Cleric): Palm Strike | phys,mel,cls,bst | ~150%x1, CD4 | R#20 weapon hit |
| 16 | Swordsman-Murmillo: Headbutt | phys,proj,long,bst | ~140%x1, CD5 | R#12 earth-as-phys |
| 16 | Wizard-Sage: Micro Dimension | phys,proj,long,bst | ~140%x1, CD5 | R#12 earth-as-phys |
| 17 | Assassin: Sonic Blow | phys,mel,cls,bst | ~150%x1, CD4 | R#20 weapon hit |
| 17 | Monk: Occult Impaction | phys,mel,cls,bst | ~150%x1, CD4 | R#20 weapon hit |
| 25 | Champion: Guillotine Fist | phys,mel,cls,bst | ~400% SP-gated, CD10 | R#20 SP-gated nuke |
| 31 | Mechanic: Self Destruction | phys,nova,cls,bst | ~250% self 10%, CD20 | R#30 risk meter |
| 31 | Swordsman-Nak Muay: straight/hook strikes | phys,mel,cls,bst | ~150%x1, CD4 | R#20 weapon hit |
| 31 | Wizard-Terramancer: Earthen Prison | phys,proj,long,bst | ~140%x1, CD5 | R#12 earth-as-phys |
| 31 | Wizard-Terramancer: Stone Spike | phys,proj,long,bst | ~140%x1, CD5 | R#12 earth-as-phys |
| 32 | Sorcerer: Diamond Dust | phys,proj,long,bst | ~140%x1, CD5 | R#12 earth-as-phys |
| 36 | Guillotine Cross: Cross Ripper Slasher | phys,mel,cls,bst | ~150%x1, CD4 | R#20 weapon hit |
| 45 | Elemental Master: Elemental Buster | phys,proj,long,bst | ~140%x1, CD5 | R#12 earth-as-phys |
| 46 | Hyper Novice: Self-Destruction | phys,nova,cls,bst | ~250% self 10%, CD20 | R#30 risk meter |

### Area

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 1 | Swordsman-Barbarian: Cleave | phys,mel,cls,sus | ~100% arc, CD5 | R#21 Day-0 + cleave |
| 5 | Swordman: Magnum Break | phys,mel,cls,sus | ~100% arc, CD5 | R#21 cleave |
| 5 | Swordsman-Barbarian: Aggressor | phys,mel,cls,sus | ~100% arc, CD5 | R#21 cleave |
| 5 | Swordsman-Barbarian: Seism | phys,grd,shr,bst | ~120% AoE, CD10 | R#13 quake |
| 5 | Swordsman-Barbarian: Stomping Kick | phys,grd,shr,bst | ~120% AoE, CD10 | R#13 quake |
| 5 | Swordsman-Highlander: Cross Cut | phys,mel,cls,sus | ~100% arc, CD5 | R#21 cleave |
| 5 | Swordsman-Highlander: Moulinet | phys,mel,cls,sus | ~100% arc, CD5 | R#21 cleave |
| 11 | Knight: Bowling Bash | phys,mel,cls,sus | ~100% arc, CD5 | R#21 cleave |
| 12 | Wizard: Heaven's Drive | phys,grd,shr,bst | ~120% AoE, CD10 | R#13 quake |
| 16 | Swordsman-Blossom Blader: sweep skills | phys,mel,cls,sus | ~100% arc, CD5 | R#21 cleave |
| 16 | Swordsman-Doppelsoeldner: Cyclone | phys,mel,cls,sus | ~100% arc, CD5 | R#21 cleave |
| 16 | Swordsman-Doppelsoeldner: Punish | phys,mel,cls,sus | ~100% arc, CD5 | R#21 cleave |
| 16 | Swordsman-Doppelsoeldner: Redel | phys,mel,cls,sus | ~100% arc, CD5 | R#21 cleave |
| 16 | Swordsman-Doppelsoeldner: Zornhau | phys,mel,cls,sus | ~100% arc, CD5 | R#21 cleave |
| 16 | Swordsman-Hackapell: Skarphuggning | phys,mel,cls,sus | ~100% arc, CD5 | R#21 cleave |
| 16 | Wizard-Elementalist: Stone Rain | phys,grd,shr,bst | ~120% AoE, CD10 | R#13 quake |
| 31 | Warlock: Sienna Execrate | phys,grd,shr,bst | ~120% AoE, CD10 | R#13 quake |
| 31 | Wizard-Terramancer: Earthquake | phys,grd,shr,bst | ~120% AoE, CD10 | R#13 quake |
| 31 | Wizard-Terramancer: Rolling Stone | phys,grd,shr,bst | ~120% AoE, CD10 | R#13 quake |
| 33 | Royal Guard: Genesis Ray | phys,mel,cls,sus | ~100% arc, CD5 | R#21 cleave |
| 39 | Rune Knight: Storm Blast | phys,mel,cls,sus | ~100% arc, CD5 | R#21 cleave |
| 40 | Rune Knight: Dragon Breath | phys,mel,cls,sus | ~100% arc, CD5 | R#21 cleave |
| 48 | Arch Mage: Rock Down | phys,grd,shr,bst | ~120% AoE, CD10 | R#13 quake |
| 49 | Arch Mage: Violent Quake | phys,grd,shr,bst | ~120% AoE, CD10 | R#13 quake |
| 50 | Arch Mage: Stratum Tremor | phys,grd,shr,bst | ~120% AoE, CD10 | R#13 quake |

### Ranged

- Lv1-5 (10)

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 1 | Archer-Archer: Multi Shot | phys,proj,long,sus | ~70%x3, CD8 | R#23 volley |
| 1 | Archer-Archer: Oblique Shot | phys,proj,long,bst | ~150%x1, CD4 | R#22 aimed |
| 1 | Archer-Archer: Twin Arrow | phys,proj,long,bst | ~150%x1, CD4 | R#22 aimed |
| 2 | Archer: Arrow Shower | phys,proj,long,sus | ~70%x3, CD8 | R#23 volley |
| 3 | Archer: Double Strafe | phys,proj,long,bst | ~150%x1, CD4 | R#22 aimed |
| 5 | Archer-Ranger: Arrow Shower | phys,proj,long,sus | ~70%x3, CD8 | R#23 volley |
| 5 | Archer-Ranger: Bounce Shot | phys,proj,long,sus | ~70%x3, CD8 | R#23 volley |
| 5 | Archer-Ranger: Critical Shot | phys,proj,long,bst | ~150%x1, CD4 | R#22 aimed |
| 5 | Archer-Ranger: Spiral Arrow | phys,proj,long,bst | ~150%x1, CD4 | R#22 aimed |
| 5 | Archer-Ranger: Steady Aim | phys,proj,long,sus | ~70%x3, CD8 | R#23 volley |

- Lv6-15 (5)

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 10 | Gunslinger: Wounding Shot | phys,proj,long,bst | ~130%x1, CD5 | R#24 firearm |
| 12 | Gunslinger: Disarm | phys,proj,long,bst | ~130%x1, CD5 | R#24 firearm |
| 13 | Gunslinger: Rapid Shower | phys,proj,long,bst | ~130%x1, CD5 | R#24 firearm |
| 14 | Gunslinger: Tracking | phys,proj,long,bst | ~130%x1, CD5 | R#24 firearm |
| 15 | Gunslinger: Spread Attack | phys,proj,long,bst | ~130%x1, CD5 | R#24 firearm |

- Lv16-30 (20)

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 16 | Archer-Cannoneer: Bazooka | phys,proj,long,bst | ~130%x1, CD5 | R#24 firearm |
| 16 | Archer-Cannoneer: Cannon Barrage | phys,proj,long,bst | ~130%x1, CD5 | R#24 firearm |
| 16 | Archer-Cannoneer: Shootdown | phys,proj,long,sus | ~70%x3, CD8 | R#23 volley |
| 16 | Archer-Mergen: Homing Arrow | phys,proj,long,sus | ~70%x3, CD8 | R#23 volley |
| 16 | Archer-Mergen: Spread Shot | phys,proj,long,sus | ~70%x3, CD8 | R#23 volley |
| 16 | Archer-Mergen: Triple Arrow | phys,proj,long,sus | ~70%x3, CD8 | R#23 volley |
| 16 | Archer-Mergen: Zenith | phys,proj,long,sus | ~70%x3, CD8 | R#23 volley |
| 16 | Archer-Musketeer: Birdfall | phys,proj,long,bst | ~130%x1, CD5 | R#24 firearm |
| 16 | Archer-Musketeer: Butt Stroke | phys,proj,long,bst | ~130%x1, CD5 | R#24 firearm |
| 16 | Archer-Musketeer: Covering Fire | phys,proj,long,bst | ~130%x1, CD5 | R#24 firearm |
| 16 | Archer-Musketeer: Headshot | phys,proj,long,bst | ~150%x1, CD4 | R#22 aimed |
| 16 | Archer-Musketeer: Snipe | phys,proj,long,bst | ~150%x1, CD4 | R#22 aimed |
| 16 | Scout-Bullet Marker: full kit | phys,proj,long,bst | ~130%x1, CD5 | R#24 firearm |
| 16 | Scout-Bullet Marker: Smash Bullet | phys,proj,long,bst | ~150%x1, CD4 | R#22 aimed |
| 16 | Scout-Bullet Marker: Tracer Bullet | phys,proj,long,bst | ~150%x1, CD4 | R#22 aimed |
| 16 | Scout-Outlaw: Mangle | phys,proj,long,bst | ~130%x1, CD5 | R#24 firearm |
| 17 | Gunslinger: Piercing Shot | phys,proj,long,bst | ~130%x1, CD5 | R#24 firearm |
| 25 | Sniper: Arrow Storm | phys,proj,long,sus | ~70%x3, CD8 | R#23 volley |
| 25 | Sniper: Focused Arrow Strike | phys,proj,long,bst | ~150%x1, CD4 | R#22 aimed |
| 25 | Sniper: Wind Walk | phys,proj,long,sus | +move falcon, CD15 | R#23 falcon synergy |

- Lv31-50 (11)

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 31 | Archer-Arquebusier: aimed shots | phys,proj,long,bst | ~150%x1, CD4 | R#22 aimed |
| 31 | Maestro: Severe Rainstorm | phys,proj,long,sus | ~70%x3, CD8 | R#23 volley |
| 31 | Rebellion: God's Hammer | phys,proj,long,bst | ~130%x1, CD5 | R#24 firearm |
| 31 | Scout-Sheriff: fan-fire skills | phys,proj,long,bst | ~130%x1, CD5 | R#24 firearm |
| 34 | Rebellion: Fire Dance | phys,proj,long,bst | ~130%x1, CD5 | R#24 firearm |
| 37 | Rebellion: Howling Mine | phys,proj,long,bst | ~130%x1, CD5 | R#24 firearm |
| 38 | Ranger: Arrow Storm | phys,proj,long,sus | ~70%x3, CD8 | R#23 volley |
| 38 | Rebellion: Round Trip | phys,proj,long,bst | ~150%x1, CD4 | R#22 aimed |
| 38 | Rebellion: Slug Shot | phys,proj,long,bst | ~130%x1, CD5 | R#24 firearm |
| 39 | Ranger: Aimed Bolt | phys,proj,long,bst | ~150%x1, CD4 | R#22 aimed |
| 47 | Night Watch: all firearms | phys,proj,long,bst | ~130%x1, CD5 | R#24 firearm |

### Bleed

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 5 | Swordsman-Highlander: Vertical Slash | phys,mel,cls,dot,bld | ~70% + bld 6s, CD6 | R#28 wound |
| 31 | Scout-Ardito: bleed daggers | phys,mel,cls,dot,bld | ~70% + bld 6s, CD6 | R#28 wound |
| 31 | Swordsman-Corsair: Dust Devil | phys,mel,cls,dot,bld | ~70% + bld 6s, CD6 | R#28 wound |
| 31 | Swordsman-Lancer: Crush | phys,mel,cls,dot,bld | ~70% + bld 6s, CD6 | R#28 wound |
| 47 | Abyss Chaser: Frenzy Shot | phys,mel,cls,dot,bld | ~70% + bld 6s, CD6 | R#28 wound |

### Execute

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 4 | Swordsman-Assassin: Behead | phys,mel,shr,bst,exe | ~100% x2<30%, CD6 | R#25 P0 L4 + finisher |
| 16 | Cleric-Kabbalist: Clone | phys,mel,shr,bst,exe | ~100% x2<30%, CD6 | R#25 finisher |
| 16 | Scout-Rogue: Backstab | phys,mel,shr,bst,exe | ~100% x2<30%, CD6 | R#25 finisher |
| 20 | Assassin: Grimtooth | phys,mel,shr,bst,exe | ~100% x2<30%, CD6 | R#25 finisher |
| 31 | Swordsman-Assassin: Annihilation | phys,mel,shr,bst,exe | ~100% x2<30%, CD6 | R#25 finisher |
| 31 | Swordsman-Nak Muay: KO strike | phys,mel,shr,bst,exe | ~100% x2<30%, CD6 | R#25 finisher |
| 32 | Guillotine Cross: Rolling Cutter | phys,mel,shr,bst,exe | ~100% x2<30%, CD6 | R#25 finisher |
| 39 | Sura: Tiger Cannon | phys,mel,shr,bst,exe | ~100% x2<30%, CD6 | R#25 finisher |
| 48 | Inquisitor: Oleum Sanctum | phys,mel,shr,bst,exe | ~100% x2<30%, CD6 | R#25 finisher |

### Combo

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 16 | Swordsman-Fencer: Epee Garde chains | phys,mel,cls,cmb,opn | ~80%, CD5 + opn | R#26 chain |
| 16 | Swordsman-Monk: Double Punch → Palm Strike~ | phys,mel,cls,cmb,opn | ~80%, CD5 + opn | R#26 chain |
| 18 | Monk: Chain Combo | phys,mel,cls,cmb,opn | ~80%, CD5 + opn | R#26 chain |
| 25 | Star Emperor: Solar/Lunar/Stellar attacks | phys,mel,cls,cmb,opn | ~80%, CD5 + opn | R#26 chain |
| 31 | Swordsman-Matador: Faena → Muleta → Corrida~ | phys,mel,cls,cmb,opn | ~80%, CD5 + opn | R#26 chain |
| 31 | Swordsman-Nak Muay: combo strings | phys,mel,cls,cmb,opn | ~80%, CD5 + opn | R#26 chain |
| 49 | Shinkiro/Shiranui: combo charms | phys,mel,cls,cmb,opn | ~80%, CD5 + opn | R#26 chain |
| 49 | Sky Emperor: Celestial combo | phys,mel,cls,cmb,opn | ~80%, CD5 + opn | R#26 chain |

### Counter

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 5 | Swordsman-Peltasta: Butterfly | phys,mel,cls,bst,brk | ~160% ripo, CD8 | R#29 riposte |
| 5 | Swordsman-Peltasta: Umbo Blow | phys,mel,cls,bst,brk | ~160% ripo, CD8 | R#29 riposte |
| 12 | Knight: Counter Attack | phys,mel,cls,bst,brk | ~160% ripo, CD8 | R#29 riposte |
| 16 | Swordsman-Fencer: Flanconnade | phys,mel,cls,bst,brk | ~160% ripo, CD8 | R#29 riposte |
| 16 | Swordsman-Murmillo: Scutum Hit | phys,mel,cls,bst,brk | ~160% ripo, CD8 | R#29 riposte |
| 16 | Swordsman-Rodelero: Shield Charge | phys,mel,cls,bst,brk | ~160% ripo, CD8 | R#29 riposte |
| 25 | Star Emperor: Solar Protection | phys,mel,cls,bst,brk | ~160% ripo, CD8 | R#29 riposte |
| 35 | Guillotine Cross: Weapon Blocking | phys,mel,cls,bst,brk | ~160% ripo, CD8 | R#29 riposte |
| 40 | Royal Guard: Shield Spell | phys,mel,cls,bst,brk | ~160% ripo, CD8 | R#29 riposte |

## 4. Control

### Freeze

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 4 | Mage: Frost Diver | frost,ins,shr,ctl,frz | ~70% + frz, CD12 | R#31 classic combo |
| 5 | Archer-Quarrel Shooter: Scatter Caltrops | frost,grd,shr,ctl | slow 50% 6s, CD12 | R#41 slow |
| 5 | Wizard-Cryomancer: Frost Pillar | frost,ins,shr,ctl,frz | ~90% + frz tree, CD14 | R#31 freeze tree |
| 5 | Wizard-Cryomancer: Ice Wall | frost,grd,shr,ctl,def | wall 5 cells, CD15 | R#9 wall |
| 5 | Wizard-Cryomancer: Subzero Shield | frost,grd,shr,ctl,def | wall 5 cells, CD15 | R#9 wall |
| 11 | Wizard: Quagmire | frost,grd,shr,ctl | slow 50% 6s, CD12 | R#41 slow |
| 16 | Scout-Linker: Spiritual Chain | frost,grd,shr,ctl | slow 50% 6s, CD12 | R#41 slow |
| 16 | Wizard-Chronomancer: Slow | frost,grd,shr,ctl | slow 50%, CD12 | R#41 slow |
| 16 | Wizard-Chronomancer: Stop | frost,grd,shr,ctl | lock 3s, CD30 | R#41 hard stop |
| 16 | Wizard-Psychokino: Slow | frost,grd,shr,ctl | slow 50% 6s, CD12 | R#41 slow |
| 16 | Wizard-Sage: Ice Wall | frost,grd,shr,ctl,def | wall 5 cells, CD15 | R#9 wall |
| 20 | Wizard: Ice Wall | frost,grd,shr,ctl,def | wall 5 cells, CD15 | R#9 5-cell wall |
| 34 | Warlock: Freezing Spell | frost,ins,shr,ctl,frz | ~70% + frz, CD12 | R#31 lockdown |
| 49 | Arch Mage: Mystery Illusion | frost,grd,shr,ctl,def | wall 5 cells, CD15 | R#9 wall |

### Shock

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 1 | Swordsman-Swordsman: Liberate | phys,sho,shr,ctl | ~60% shout, CD12 | R#34 warcry |
| 1 | Swordsman-Swordsman: Provoke | phys,sho,shr,ctl | taunt, CD10 | R#42 taunt attr |
| 4 | Swordman: Fatal Blow | storm,ins,shr,ctl,shk | ~70% + stun, CD12 | R#32 lockdown |
| 5 | Cleric-Priest: Monstrance | storm,ins,shr,ctl,shk | ~70% + stun, CD12 | R#32 lockdown |
| 5 | Scout-Quarrel Shooter: Stone Shot | storm,ins,shr,ctl,shk | ~70% + stun, CD12 | R#32 lockdown |
| 5 | Swordman: Provoke | phys,sho,shr,ctl | taunt + threat, CD10 | R#42 aggro |
| 5 | Swordsman-Barbarian: Helm Chopper | storm,ins,shr,ctl,shk | ~70% + stun, CD12 | R#32 lockdown |
| 5 | Swordsman-Barbarian: Warcry | phys,sho,shr,ctl | ~60% shout, CD12 | R#34 warcry |
| 5 | Swordsman-Hoplite: Spear Throw | storm,ins,shr,ctl,shk | ~70% + stun, CD12 | R#32 lockdown |
| 5 | Swordsman-Peltasta: Guardian | phys,sho,shr,ctl | taunt + threat, CD10 | R#42 aggro |
| 5 | Swordsman-Peltasta: Swash Buckling | phys,sho,shr,ctl | taunt AoE, CD12 | R#42 AoE taunt |
| 16 | Archer-Pied Piper: Dissonanz | phys,sho,shr,ctl | ~60% shout, CD12 | R#34 warcry |
| 16 | Swordsman-Rodelero: Shield Push | phys,sho,shr,ctl | taunt + threat, CD10 | R#42 aggro |
| 16 | Swordsman-Templar: Aggro orders | phys,sho,shr,ctl | taunt + threat, CD10 | R#42 aggro |
| 16 | Swordsman-Templar: Battle Orders | phys,sho,shr,ctl | ~60% shout, CD12 | R#34 warcry |
| 19 | Crusader: Shield Reflect | phys,sho,shr,ctl | taunt + threat, CD10 | R#42 aggro |
| 25 | Paladin: Sacrifice | phys,sho,shr,ctl | taunt + threat, CD10 | R#42 aggro |
| 31 | Wizard-Taoist: Upper Level | storm,ins,shr,ctl,shk | ~70% + stun, CD12 | R#32 lockdown |
| 33 | Royal Guard: Battle Orders | phys,sho,shr,ctl | ~60% shout, CD12 | R#34 warcry |
| 35 | Mechanic: Pile Bunker | storm,ins,shr,ctl,shk | ~70% + stun, CD12 | R#32 lockdown |
| 35 | Royal Guard: Reflect Damage | phys,sho,shr,ctl | taunt + threat, CD10 | R#42 aggro |
| 36 | Sura: Cursed Circle | phys,sho,shr,ctl | taunt + threat, CD10 | R#42 aggro |
| 36 | Sura: Lion's Howl | phys,sho,shr,ctl | ~60% shout, CD12 | R#34 warcry |
| 38 | Sura: Gentle Touch | phys,sho,shr,ctl | ~60% shout, CD12 | R#34 warcry |

### Mind

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 14 | Ninja: Mist Slash | shadow,ins,shr,ctl | blind/curse, CD12 | R#45 acc-down |
| 16 | Archer-Appraiser: Blindside | shadow,ins,shr,ctl | blind/curse, CD12 | R#45 acc-down |
| 16 | Archer-Pied Piper: Hypnotische Floete | arcane,ins,shr,ctl,chm | sleep 6s, CD15 | R#36 incap |
| 16 | Archer-Pied Piper: Wiegenlied | arcane,ins,shr,ctl,chm | sleep 6s, CD15 | R#36 incap |
| 16 | Cleric-Dievdirbys: Zemyna | arcane,ins,shr,ctl,root | ~60% + petrify, CD15 | R#33 statue |
| 16 | Cleric-Oracle: Arcane Energy | shadow,ins,shr,ctl | blind/curse, CD12 | R#45 acc-down |
| 16 | Cleric-Oracle: Counter Spell | arcane,ins,long,ctl | dispel magic, CD15 | R#37 dispel |
| 16 | Cleric-Oracle: Death Sentence | arcane,ins,shr,ctl,root | ~60% + petrify, CD15 | R#33 statue |
| 16 | Cleric-Oracle: Prophecy | arcane,ins,shr,ctl,chm | debuff immune, CD20 | R#36 immunity |
| 16 | Cleric-Pardoner: Discerning Evil | arcane,ins,long,ctl | silence 4s, CD15 | R#37 anti-cast |
| 16 | Scout-Enchanter: Haziness | arcane,ins,shr,ctl,chm | sleep 6s, CD15 | R#36 incap |
| 16 | Scout-Linker: Hangman's Knot | arcane,ins,shr,ctl,root | ~60% + petrify, CD15 | R#33 statue |
| 16 | Scout-Rogue: Lachrymator | arcane,ins,long,ctl | silence 4s, CD15 | R#37 anti-cast |
| 16 | Wizard-Chronomancer: Pass | arcane,ins,shr,ctl | lock 3s, CD30 | R#46 hard stop |
| 16 | Wizard-Chronomancer: Quicken | arcane,ins,shr,ctl | +atk speed, CD20 | R#46 haste |
| 16 | Wizard-Psychokino: Raise | arcane,ins,shr,ctl,chm | sleep 6s, CD15 | R#36 incap |
| 16 | Wizard-Sage: Missile Hole | arcane,ins,long,ctl | silence 4s, CD15 | R#37 anti-cast |
| 18 | Dancer: Scream | arcane,ins,shr,ctl,chm | sleep 6s, CD15 | R#36 incap |
| 19 | Bard: Lullaby | arcane,ins,shr,ctl,chm | sleep 6s, CD15 | R#36 incap |
| 20 | Sage: Spell Breaker | arcane,ins,long,ctl | interrupt, CD8 | R#37 interrupt |
| 25 | Professor: Mind Breaker | arcane,ins,long,ctl | silence 4s, CD15 | R#37 anti-cast |
| 31 | Minstrel/Wanderer: Deep Sleep Lullaby | arcane,ins,shr,ctl,chm | sleep 6s, CD15 | R#36 incap |
| 31 | Scout-Assassin: Hasisas | shadow,ins,shr,ctl | blind/curse, CD12 | R#45 acc-down |
| 31 | Wizard-Shadowmancer: Shadow Pool | shadow,sho,shr,ctl,fear | ~60% + fear, CD15 | R#35 scatter |
| 31 | Wizard-Warlock: Ghastly Trail | shadow,sho,shr,ctl,fear | ~60% + fear, CD15 | R#35 scatter |
| 33 | Warlock: Stasis | arcane,ins,long,ctl | silence 4s, CD15 | R#37 anti-cast |
| 34 | Guillotine Cross: Dark Claw | shadow,ins,shr,ctl | blind/curse, CD12 | R#45 acc-down |
| 40 | Sorcerer: Arrullo | arcane,ins,shr,ctl,chm | sleep 6s, CD15 | R#36 incap |
| 45 | Abyss Chaser: Masquerade-Weakness | shadow,sho,shr,ctl,fear | ~60% + fear, CD15 | R#35 scatter |
| 45 | Cardinal: Oratio | arcane,ins,shr,ctl | lock 3s, CD30 | R#46 hard stop |
| 46 | Night Watch: Panic | shadow,sho,shr,ctl,fear | ~60% + fear, CD15 | R#35 scatter |
| 47 | Shadow Cross: Shadow Sense | shadow,sho,shr,ctl,fear | ~60% + fear, CD15 | R#35 scatter |
| 47 | Troubadour: Song of Despair | arcane,ins,long,ctl | silence 4s, CD15 | R#37 anti-cast |
| 49 | Shiranui: Shadow Leap | shadow,ins,shr,ctl | blind/curse, CD12 | R#45 acc-down |

### Space

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 1 | Linker: Hangman's Knot | arcane,grd,shr,ctl,pull | ~60% + pull, CD14 | R#38 vacuum |
| 3 | Hunter: Ankle Snare | nature,grd,shr,ctl,root | root 4s trap, CD12 | R#40 Day-0 + trap root |
| 5 | Archer-Hunter: Coursing | nature,grd,shr,ctl,root | pet hold, CD12 | R#40 beast hold |
| 5 | Archer-Hunter: Snatching | nature,grd,shr,ctl,root | ~40% + root 4s, CD12 | R#40 snare |
| 12 | Wizard: Ganbantein | arcane,grd,shr,ctl,pull | ~60% + pull, CD14 | R#38 vacuum |
| 16 | Archer-Cannoneer: Cannon Blast | phys,ins,shr,ctl,kb | ~80% + kb, CD8 | R#39 peel |
| 16 | Cleric-Dievdirbys: Laima | nature,grd,shr,ctl,root | ~40% + root 4s, CD12 | R#40 snare |
| 16 | Swordsman-Cataphract: Earth Wave | phys,ins,shr,ctl,kb | ~80% + kb, CD8 | R#39 peel |
| 16 | Swordsman-Cataphract: Steed Charge | phys,ins,shr,ctl,kb | ~80% + kb, CD8 | R#39 peel |
| 16 | Wizard-Psychokino: Magnetic Force | arcane,grd,shr,ctl,pull | ~60% + pull, CD14 | R#38 pull |
| 16 | Wizard-Sage: Ultimate Dimension | arcane,grd,shr,ctl,pull | ~60% + pull, CD14 | R#38 vacuum |
| 31 | Swordsman-Lancer: Joust | phys,ins,shr,ctl,kb | ~80% + kb, CD8 | R#39 peel |
| 31 | Swordsman-Lancer: Unhorsing | phys,ins,shr,ctl,kb | ~80% + kb, CD8 | R#39 peel |
| 31 | Swordsman-Retiarius: Rete | nature,grd,shr,ctl,root | ~40% + root 4s, CD12 | R#40 snare |
| 31 | Wizard-Terramancer: Root Snare | nature,grd,shr,ctl,root | ~40% + root 4s, CD12 | R#40 snare |
| 33 | Genetic: Thorn Trap | nature,grd,shr,ctl,root | ~40% + root 4s, CD12 | R#40 snare |
| 33 | Ranger: Electric Shock | nature,grd,shr,ctl,root | ~40% + root 4s, CD12 | R#40 snare |
| 35 | Ranger: Warg Bite | phys,ins,shr,ctl,kb | ~80% + kb, CD8 | R#39 peel |
| 38 | Sorcerer: Earth Grave | arcane,grd,shr,ctl,pull | ~60% + pull, CD14 | R#38 vacuum |
| 39 | Warlock: Gravitational Field | arcane,grd,shr,ctl,pull | ~60% + pull, CD14 | R#38 vacuum |
| 39 | Warlock: Marsh of Abyss | arcane,grd,shr,ctl,pull | ~60% + pull, CD14 | R#38 vacuum |
| 40 | Sorcerer: Extreme Vacuum | arcane,grd,shr,ctl,pull | ~60% + pull, CD14 | R#38 vacuum |

### Meta

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 11 | Sage: Dispell | arcane,ins,shr,ctl,brk | dispel/strip, CD15 | R#43 strip |
| 13 | Crusader: Devotion | arcane,ins,long,ctl | share 5 allies, CD20 | R#44 5-tgt share |
| 16 | Cleric-Kabbalist: Merkabah | arcane,ins,long,ctl | share dmg link, CD20 | R#44 share |
| 16 | Cleric-Kabbalist: Nachash | arcane,ins,long,ctl | share dmg link, CD20 | R#44 share |
| 16 | Cleric-Plague Doctor: Bloodletting | arcane,ins,shr,ctl,brk | self-cleanse, CD12 | R#43 self-cleanse |
| 16 | Cleric-Plague Doctor: Disenchant | arcane,ins,shr,ctl,brk | dispel/strip, CD15 | R#43 strip |
| 16 | Scout-Enchanter: Enchant Glove | arcane,ins,shr,ctl,brk | dispel/strip, CD15 | R#43 strip |
| 16 | Scout-Linker: Joint Penalty | arcane,ins,long,ctl | link dmg, CD20 | R#44 dmg link |
| 16 | Scout-Linker: Lifeline | arcane,ins,long,ctl | share dmg link, CD20 | R#44 share |
| 19 | Rogue: Divest Helm/Shield/Armor/Weapon | arcane,ins,shr,ctl,brk | dispel/strip, CD15 | R#43 strip |
| 20 | Soul Linker: Kaahi/Kaupe/Kaite/Kaize | arcane,ins,long,ctl | share dmg link, CD20 | R#44 share |
| 25 | Professor: Soul Burn | arcane,ins,shr,ctl,brk | dispel/strip, CD15 | R#43 strip |
| 25 | Stalker: Full Strip | arcane,ins,shr,ctl,brk | strip gear, CD30 | R#43 PvP strip |
| 32 | Warlock: Ganbantein | arcane,ins,shr,ctl,brk | dispel/strip, CD15 | R#43 strip |
| 33 | Arch Bishop: Officium | arcane,ins,long,ctl | share dmg link, CD20 | R#44 share |
| 38 | Shadow Chaser: Masquerade | arcane,ins,shr,ctl,brk | dispel/strip, CD15 | R#43 strip |

## 5. Utilities

### Buffs

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 1 | Acolyte: Blessing | phys,aura,self,sup | +STR/DEX/INT, CD15 | R#52 stat buff |
| 1 | Archer-Archer: Swift Step | arcane,aura,self,sup | +haste aura, CD20 | R#54 haste |
| 3 | Archer: Wind Walk | arcane,aura,self,sup | +haste aura, CD20 | R#54 haste |
| 3 | Mage: Increase SP Recovery | arcane,ins,shr,sup | +SP regen, CD20 | R#57 battery |
| 4 | Bard: A Poem of Bragi | phys,aura,self,sup | -cast delay, CD20 | R#52 P0 L4 + caster enabler |
| 5 | Cleric-Priest: Blessing | phys,aura,self,sup | +10% atk aura, CD20 | R#52 ATK buff |
| 5 | Cleric-Priest: Sacrament | phys,aura,self,sup | +10% atk aura, CD20 | R#52 ATK buff |
| 5 | Swordsman-Peltasta: High Guard | phys,aura,self,def | reflect 30%, CD15 | R#55 thorns |
| 12 | Priest: Increase AGI | arcane,aura,self,sup | +haste aura, CD20 | R#54 haste |
| 13 | Bard: Magic Strings | arcane,ins,shr,sup | -SP cost, CD20 | R#57 SP logistics |
| 13 | Priest: Suffragium | arcane,aura,self,sup | +haste aura, CD20 | R#54 haste |
| 13 | Soul Linker: Alchemist Spirit | arcane,ins,self,sup | imbue element, CD15 | R#58 imbue |
| 16 | Cleric-Chaplain: Last Rites | phys,aura,self,sup | +10% atk aura, CD20 | R#52 ATK buff |
| 16 | Scout-Enchanter: Agility | arcane,aura,self,sup | +haste aura, CD20 | R#54 haste |
| 16 | Scout-Enchanter: Enchant Fire | arcane,ins,self,sup | imbue fire, CD15 | R#58 imbue |
| 16 | Scout-Enchanter: Enchant Lightning | arcane,ins,self,sup | imbue storm, CD15 | R#58 imbue |
| 16 | Scout-Squire: Refreshment Table | arcane,ins,shr,sup | food + SP, CD20 | R#57 food shop |
| 16 | Scout-Thaumaturge: Swell Hands/Right Arm | phys,aura,self,sup | +10% atk aura, CD20 | R#52 ATK buff |
| 16 | Swordsman-Murmillo: Cassis Crista | phys,aura,self,def | reflect 30%, CD15 | R#55 thorns |
| 16 | Wizard-Chronomancer: Haste | arcane,aura,self,sup | +move, CD20 | R#54 haste |
| 16 | Wizard-Thaumaturge: Swell Body | arcane,aura,self,sup | +haste aura, CD20 | R#54 haste |
| 17 | Priest: Impositio Manus | phys,aura,self,sup | +10% atk aura, CD20 | R#52 ATK buff |
| 18 | Sage: Endow Blaze/Quake/Tsunami/Whirlwind | arcane,ins,self,sup | imbue element, CD15 | R#58 imbue |
| 30 | Arch Bishop: Canto Candidus | phys,aura,self,sup | +10% atk aura, CD20 | R#52 ATK buff |
| 30 | Arch Bishop: Clementia | phys,aura,self,sup | +all stats, CD15 | R#52 all-stats |
| 31 | Archer-Hwarang: war-drum buffs | phys,aura,self,sup | +10% atk aura, CD20 | R#52 ATK buff |
| 31 | Cleric-Inquisitor: Iron Maiden | phys,aura,self,def | reflect 30%, CD15 | R#55 thorns |
| 36 | Sorcerer: Striking | arcane,aura,self,sup | +haste aura, CD20 | R#54 haste |

### Move

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 1 | Archer-Archer: Leap | phys,ins,self,mob | flip 6 + drop, CD10 | R#72 drops combat |
| 1 | Knight: Charge Attack | phys,ins,self,mob | dash 6, CD8 | R#72 Day-0 + gap close |
| 1 | Super Novice: Teleport | arcane,ins,self,mob | blink 9, CD15 | R#71 blink |
| 5 | Acolyte: Teleport | arcane,ins,self,mob | blink 9, CD15 | R#71 blink |
| 15 | Knight: Cavalier Mastery | phys,ins,self,mob,stn | mount stance, CD10 | R#69 mounted |
| 16 | Scout-Schwarzer Reiter: Caracole | phys,ins,self,mob,stn | mount stance, CD10 | R#69 mounted |
| 16 | Scout-Schwarzer Reiter: Limacon | phys,ins,self,mob,stn | mount stance, CD10 | R#69 mounted |
| 16 | Scout-Schwarzer Reiter: Retreat Shot | phys,ins,self,mob,stn | mount stance, CD10 | R#69 mounted |
| 16 | Scout-Shinobi: Mokuton | arcane,ins,self,mob | blink 9, CD15 | R#71 blink |
| 16 | Swordsman-Cataphract: Impaler | phys,ins,self,mob,stn | mount stance, CD10 | R#69 mounted |
| 16 | Swordsman-Cataphract: Rush | phys,ins,self,mob,stn | charge dmg, CD10 | R#69 charge |
| 16 | Swordsman-Cataphract: Trot | phys,ins,self,mob,stn | mounted, CD10 | R#69 mount |
| 16 | Swordsman-Hackapell: mounted archery | phys,ins,self,mob,stn | mount stance, CD10 | R#69 mounted |
| 16 | Swordsman-Murmillo: Evade Thrust | phys,ins,self,mob | dash 6, CD8 | R#72 gap close |
| 16 | Swordsman-Murmillo: Sprint | phys,ins,self,mob | dash 6, CD8 | R#72 gap close |
| 16 | Wizard-Psychokino: Teleportation | arcane,ins,self,mob | blink 9, CD15 | R#71 blink |
| 16 | Wizard-Sage: Blink | arcane,ins,self,mob | blink 9, CD15 | R#71 blink |
| 18 | Crusader: Cavalry Mastery | phys,ins,self,mob,stn | mount stance, CD10 | R#69 mounted |
| 31 | Scout-Assassin: Instant Acceleration | phys,ins,self,mob | dash 6, CD8 | R#72 gap close |
| 31 | Scout-Hakkapeliter: mounted skills | phys,ins,self,mob,stn | mount stance, CD10 | R#69 mounted |
| 31 | Swordsman-Lancer: Quintain | phys,ins,self,mob,stn | mount stance, CD10 | R#69 mounted |
| 38 | Mechanic: Madogear License | phys,ins,self,mob,stn | mount stance, CD10 | R#69 mounted |
| 39 | Ranger: Warg Rider | phys,ins,self,mob,stn | mount stance, CD10 | R#69 mounted |
| 39 | Rune Knight: Dragon Training | phys,ins,self,mob,stn | mount stance, CD10 | R#69 mounted |
| 40 | Rune Knight: Phantom Thrust | phys,ins,self,mob | dash 6, CD8 | R#72 gap close |
| 49 | Night Watch: Wild Fire | phys,ins,self,mob,stn | mount stance, CD10 | R#69 mounted |

### Sight

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 1 | Scout-Scout: Cloaking | shadow,ins,self,mob | hide 10s, CD20 | R#73 stealth |
| 1 | Scout-Scout: Perspective | arcane,ins,shr,sup | reveal 9, CD12 | R#74 anti-stealth |
| 1 | Scout-Scout: Scan | arcane,ins,shr,sup | reveal 9, CD12 | R#74 reveal |
| 1 | Super Novice: Hiding | shadow,ins,self,mob | hide 10s, CD20 | R#73 hidden |
| 3 | Thief: Hiding | shadow,ins,self,mob | hide stat 10s, CD20 | R#73 stat-hidden |
| 4 | Acolyte: Sight | arcane,ins,shr,sup | reveal 9, CD12 | R#74 anti-stealth |
| 4 | Mage: Sight | arcane,ins,long,sup | reveal area, CD12 | R#80 gemless reveal |
| 10 | Wizard: Sightrasher | arcane,ins,long,sup | vision ward, CD15 | R#80 fog tool |
| 11 | Priest: Ruwach | arcane,ins,shr,sup | reveal 9, CD12 | R#74 anti-stealth |
| 13 | Wizard: Sense | arcane,ins,long,sup | vision ward, CD15 | R#80 fog tool |
| 14 | Assassin: Cloaking | shadow,ins,self,mob | hide move 10s, CD20 | R#73 move-hidden |
| 14 | Rogue: Stalk | shadow,ins,self,mob | hide 10s, CD20 | R#73 hidden |
| 16 | Archer-Appraiser: Forecast | arcane,ins,long,sup | vision ward, CD15 | R#80 fog tool |
| 16 | Hunter: Detect | arcane,ins,shr,sup | reveal 9, CD12 | R#74 anti-stealth |
| 16 | Scout-Outlaw: Ambush | shadow,ins,self,mob | hide 10s, CD20 | R#73 hidden |
| 16 | Scout-Rogue: Burrow | shadow,ins,self,mob | hide 10s, CD20 | R#73 hidden |
| 16 | Scout-Rogue: Sneak Hit | shadow,ins,self,mob | hide 10s, CD20 | R#73 hidden |
| 16 | Scout-Shinobi: Doton | shadow,ins,self,mob | hide 10s, CD20 | R#73 hidden |
| 18 | Warg: Keen Nose | arcane,ins,shr,sup | reveal 9, CD12 | R#74 anti-stealth |
| 20 | Ninja: Cicada Skin | shadow,ins,self,mob | hide 10s, CD20 | R#73 hidden |
| 33 | Shadow Chaser: Shadow Form | shadow,ins,self,mob | hide 10s, CD20 | R#73 hidden |
| 38 | Ranger: Keen Nose | arcane,ins,shr,sup | reveal 9, CD12 | R#74 anti-stealth |
| 39 | Ranger: Focused Arrow Strike | arcane,ins,shr,sup | reveal 9, CD12 | R#74 anti-stealth |

### Econ

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 3 | Merchant: Overcharge | phys,ins,self,sup | camp econ, fee | R#75 market |
| 3 | Merchant: Vending | phys,ins,self,sup | shop camp, fee | R#75 market |
| 4 | Merchant: Discount | phys,ins,self,sup | camp econ, fee | R#75 market |
| 5 | Merchant: Enlarge Weight Limit | phys,ins,self,sup | camp econ, fee | R#75 market |
| 10 | Taekwon: Peaceful Break | phys,ins,self,sup | camp econ, fee | R#75 market |
| 13 | Blacksmith: Smith Dagger/Sword/Two-Handed S~ | phys,ins,self,sup | camp econ, fee | R#75 market |
| 15 | Alchemist: Learning Potion | phys,ins,self,sup | camp econ, fee | R#75 market |
| 15 | Blacksmith: Repair Weapon | phys,ins,self,sup | camp econ, fee | R#75 market |
| 16 | Alchemist: Pharmacy | phys,ins,self,sup | camp econ, fee | R#75 market |
| 16 | Scout-Appraiser: Devaluation | phys,ins,self,sup | camp econ, fee | R#75 market |
| 16 | Scout-Appraiser: Overestimate | phys,ins,self,sup | camp econ, fee | R#75 market |
| 16 | Scout-Squire: Armor Maintenance | phys,ins,self,sup | camp econ, fee | R#75 market |
| 16 | Scout-Squire: Base Camp | phys,ins,self,sup | camp recall, CD30 | R#75 party recall |
| 16 | Scout-Squire: Repair | phys,ins,self,sup | camp econ, fee | R#75 market |
| 16 | Scout-Squire: Weapon Maintenance | phys,ins,self,sup | camp econ, fee | R#75 market |
| 16 | Wizard-Sage: Portal | arcane,ins,long,sup | portal party, CD30 | R#78 market teleport |
| 20 | Priest: Warp Portal | arcane,ins,long,sup | portal party, CD30 | R#78 party taxi |
| 30 | Shadow Chaser: Dimensional Door | arcane,ins,long,sup | portal party, CD30 | R#78 taxi |
| 31 | Wizard-Alchemist: Gem Roasting | phys,ins,self,sup | camp econ, fee | R#75 market |
| 31 | Wizard-Alchemist: Item Awakening | phys,ins,self,sup | camp econ, fee | R#75 market |
| 31 | Wizard-Alchemist: Magnum Opus | phys,ins,self,sup | camp econ, fee | R#75 market |
| 31 | Wizard-Alchemist: Tincturing | phys,ins,self,sup | camp econ, fee | R#75 market |

### Survival

| Lv | Skill | Tags | Calc | Notes |
|---|---|---|---|---|
| 1 | Super Novice: scattered regen | phys,ins,self,sus | regen/potion+, CD15 | R#76 sustain |
| 2 | Swordman: Increase HP Recovery | phys,ins,self,sus | regen/potion+, CD15 | R#76 sustain |
| 4 | Swordman: Endure | phys,ins,self,def | no-flinch 10s, CD20 | R#79 no-flinch |
| 5 | Swordsman-Highlander: Cross Guard | phys,ins,self,def | no-flinch 10s, CD20 | R#79 anti-flinch |
| 16 | Crusader: Shrink | phys,ins,self,def | no-flinch 10s, CD20 | R#79 anti-flinch |
| 19 | Alchemist: Aid Potion | phys,ins,self,sus | regen/potion+, CD15 | R#76 sustain |
| 25 | Champion: Zen | phys,ins,self,def | no-flinch 10s, CD20 | R#79 anti-flinch |

## 6. Coverage

- RO primary skills: 298. ToS primary skills: 341. Total: 639.
- All 80 comparison rows mapped, each with 1+ primaries; no row dropped.
- Dups merged to lowest row (202 merged); 11 see-ref secondaries skipped.
- Sources: comparison doc footer (irowiki, divine-pride, ro-calc, ToS class
  pages, toswiki, fandom, CoA wiki, ascension.gg, db.exil.es).
- Numbers: tag whitelist + targeters per skill-tag-taxonomy.md; Lv gates + P0
  pins per skill-advancement.md §§1-2, 6.3-6.4; pillars per
  skill-adoption-categories.md; TTK bands + factor_base per
  classless-brainstorm.md §13 and thousands-skills-plan.md §4.
