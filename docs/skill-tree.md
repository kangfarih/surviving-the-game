# Skill Tree — Unified Families (one entry per comparison row)

- Method: every RO + ToS primary from the prior leveled catalog
  appears exactly once, merged into its comparison-row family
  (docs/skills-comparison-tos-ro-coa.md #1-80). Same row + same
  whitelist tags + same combat purpose = ONE skill entry.
- WoW Classic 1.12 (9 classes, ranks collapsed) merged the same
  way: match = WoW variant appended to that family's Sources
  cell (`WoW: Class: Skill`); no match = new family #81-92.
- CoA omitted (RO+ToS only); Heal lives only under Holy, Nature refs it.
- Lv = lowest RO/ToS source Lv (kept stable; WoW noted as variant).
- Tags are canonical whitelist tokens (skill-tag-taxonomy.md §1).
- Calc = representative factor% x hits + CD/cost; variant range in notes.
- Sources: R#N = comparison-row N in docs/skills-comparison-tos-ro-coa.md (full RO Job: Name + ToS Tree-Class: Name lists live there); WoW variant appended as WoW: Class: Skill.
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
| 1 | Fire Bolt | fire, projectile, long, burst | ~150%x1, CD4, 12MP | R#1; 12v; Lv1-49; Day-0; P0 L1; WoW: Mage:Fireball, Lk:ShadowBolt/Immolate |
| 1 | Fire Splash | fire, projectile, short, burst | ~120%x1 spl, CD6, 14MP | R#2; 11v; Lv1-40; WoW: Mage:FireBlast/Scorch, Lk:SearingPain/SoulFire |
| 2 | Fire Field | fire, ground, short, dot, burn | ~50%/t 8s, CD12, 14MP | R#3; 8v; Lv2-48; WoW: Mage:Flamestrike, Hunter:Immolation, Sh:FireNova, Lk:RainFire |
| 5 | Ignite | fire, instant, short, dot, burn | ~40%/t 6s, CD8 + burn | R#5; 6v; Lv5-35; WoW: Lk:Corruption/Agony, Pr:SW:Pain, Dr:Moonfire, Hunter:Serpent |
| 16 | Meteor | fire, ground, long, burst | ~120%x5, CD25, 30MP | R#4; 9v; Lv16-49; WoW: Mage:Blizzard, Dr:Starfire/Hurricane |

### Storm

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Lightning Bolt | storm, projectile, long, burst, shock | ~150%x1, CD4 + shk | R#10; 8v; Lv1-34; WoW: Sh:LightningBolt, Dr:Wrath |
| 3 | Storm Field | storm, ground, long, burst, shock | ~110%x3 bnc, CD12 + shk | R#11; 7v; Lv3-50; WoW: Hunter:Volley/Multi, Sh:FireNova/ChainLightning, Mage:ArcaneExplosion |

### Shadow

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 3 | Shadow Bolt | shadow, projectile, long, burst | ~140%x1, CD5 | R#16; 17v; Lv3-49; WoW: Lk:ShadowBolt, Pr:MindBlast |

### Blood

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 16 | Drain | blood, projectile, short, sustain, lifesteal | ~100% + heal 50%, CD8 | R#19; 9v; Lv16-34; WoW: Lk:DrainLife/Soul/Mana/LifeTap/Coil, Hunter:Viper |

### Poison

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Venom Sting | poison, projectile, short, dot | ~90% + psn 4s, CD5 | R#17; 8v; Lv1-36; WoW: Hunter:Serpent/Scorpid, Ro:Instant/DeadlyPoison |
| 5 | Venom Cloud | poison, ground, short, dot | ~50%/t 8s, CD12 + psn | R#18; 9v; Lv5-36; WoW: Lk:Corruption, Ro:Poisons |

### Arcane

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 16 | Beam | arcane, channel, long, burst | ~200% chn 2s, CD10 | R#27; 6v; Lv16-50; WoW: Mage:ArcMissiles, Hunter:ArcaneShot, Dr:Starfire |

### Holy - Nukes

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Holy Bolt | holy, projectile, long, burst | ~150%x1, CD5 | R#14; 13v; Lv1-48; WoW: Pr:Smite/HolyFire, Pa:Exorcism/HolyWrath |
| 1 | Seal-Judgement | holy, melee, close, burst | ~100% seal + judge 8s, CD10 | #84; WoW: Pa:SealRighteous/Crusader/Justice/Light/Wisdom + Judgement |
| 16 | Exorcism Zone | holy, ground, short, burst | ~120% zone, CD12 | R#15; 10v; Lv16-45; WoW: Pa:Exorcism, Pr:HolyFire, Mage:ArcaneExplosion |

### Holy - Heal (only heal home; Nature refs here)

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Heal | holy, instant, short, support | heal ~120%, CD10 | R#47; 10v; Lv1-33; Day-0; P0 L1; WoW: Pr:Lesser/Heal/Flash/Greater, Pa:HolyLight |
| 2 | Barrier | holy, instant, self, defense | block 3 hits, CD14 | R#51; 5v; Lv2-16; Day-0; P0 L2; WoW: Pr:PW:Shield/InnerFire, Mage:Armors/Wards |
| 2 | Cleanse | holy, instant, short, support | cleanse, CD10 | R#56; 7v; Lv2-34; WoW: Pa:Purify/Cleanse, Pr:Cure/Dispel, Dr:Cure/Remove, Sh:Purge |
| 5 | Heal Zone | holy, ground, short, support | heal ~80%/t zone, CD15 | R#48; 8v; Lv5-34; WoW: Pr:PrayerHealing, Sh:HealingStream/ChainHeal, Dr:Tranquility |
| 5 | Resurrect | holy, instant, short, support | rez 100%, CD60 | R#50; 6v; Lv5-50; WoW: Pr:Res, Pa:Redemption/DI, Sh:Ancestral/Reincarn, Dr:Rebirth |
| 16 | Regen | holy, aura, self, sustain, support | HoT ~30%/2s x5, CD15 | R#49; 7v; Lv16-34; WoW: Pr:Renew, Dr:Rejuvenation/Regrowth |

### Holy - Ward

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Bubble | holy, instant, self, defense | immune 3s, CD60 | R#77; 4v; Lv1-37; WoW: Pa:DivineShield/Protection, Mage:IceBlock/ManaShield |
| 1 | DEF Aura | holy, aura, self, support | +DEF aura, CD20 | R#53; 8v; Lv1-17; WoW: Pa:Devotion/ResistAuras, Pr:Fortitude, Dr:MarkWild |
| 1 | Paladin Aura | holy, aura, self, defense | 1 aura/party, CD0 | #86; WoW: Pa:Devotion/Retribution/Concentration/Shadow/Frost/FireRes |
| 4 | Paladin Blessing | holy, aura, self, support | 1 bless/target 5m, CD0 | #85; WoW: Pa:Might/Wisdom/Light/Protection/Freedom/Salvation |
| 5 | Bless | holy, instant, short, support | +stats buff, CD15 | R#59; 5v; Lv5-31; WoW: Pa:Might/Wisdom/Light, Pr:Fortitude, Mage:Intellect |
| 16 | Bodyguard | holy, instant, short, defense | redirect ally, CD20 | R#60; 3v; Lv16-32; WoW: Pa:BlessProtection/Sacrifice, Lk:HealthFunnel |
| 18 | Fear Ward Pulse | holy, instant, short, defense | ward 1 fear 10m/pulse 5s, CD30 | #91; WoW: Pr:FearWard; Sh:TremorTotem |

### Frost bolts (walls see Control-Freeze #9)

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Cold Bolt | frost, projectile, long, burst | ~150%x1, CD4, 12MP | R#6; 7v; Lv1-40; WoW: Mage:Frostbolt, Sh:FrostShock |
| 1 | Frost Nova | frost, nova, short, burst, freeze | ~110% AoE, CD9 + chill | R#7; 9v; Lv1-48; Day-0; P0 L1; WoW: Mage:FrostNova, Hunter:Freezing/FrostTrap |
| 5 | Ice Lane | frost, projectile, short, burst, freeze | ~130% line, CD8 + frz | R#8; 6v; Lv5-45; WoW: Mage:ConeCold/Blizzard |

### Nature (heals see Holy-Heal)

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 16 | Plant | nature, minion, short, summon | plant/ward, CD15 | R#67; 4v; Lv16-35; WoW: Sh:SentryTotem, Hunter:ImmolationTrap |
| 16 | Tame | nature, instant, short, control, charm | tame/charm, CD20 | R#70; 5v; Lv16-20; WoW: Hunter:Tame/CallPet, Lk:Imp/Void/Succ/Felhunter, Dr:Hibernate |

### Summon

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 3 | Turret | physical, trap, short, summon | turret ~60%/2s, CD18 | R#64; 5v; Lv3-48; P0 L3; WoW: Sh:Searing/Magma/FireNovaTotem |
| 4 | Totem | nature, trap, short, summon | totem HP5, 1/element, killable | #88; WoW: Sh:Stoneskin/Earthbind/Searing/ManaSpring/Grounding |
| 5 | Beast Companion | physical, minion, long, summon | beast pet, CD20 | R#66; 20v; Lv5-33; WoW: Hunter:Pet, Lk:Imp |
| 10 | Swarm Pet | physical, minion, short, summon | pet x3 melee, CD20 | R#61; 8v; Lv10-25; WoW: Lk:Inferno, Hunter:Pet |
| 10 | Trap Field | physical, trap, short, dot | trap ~60%/t, CD12 | R#65; 11v; Lv10-38; WoW: Hunter:Immolation/Freezing/Frost/Explosive, Ro:Traps |
| 11 | Tank Pet | physical, minion, close, summon, defense | tank pet, CD25 | R#63; 5v; Lv11-16; WoW: Lk:Voidwalker, Hunter:Pet |
| 14 | Clone | arcane, minion, self, summon | clone 10s, CD30 | R#68; 5v; Lv14-48; WoW: Sh:SentryTotem, Lk:EyeKilrogg |
| 16 | Caster Pet | arcane, minion, long, summon | pet ranged, CD20 | R#62; 7v; Lv16-35; WoW: Lk:Imp/Felhunter, Hunter:Pet |

## 3. Physical

### Single

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Weapon Hit | physical, melee, close, burst | ~150%x1, CD4 | R#20; 20v; Lv1-36; WoW: Wa:Heroic/Rend/Overpower/Slam, Ro:Sinister/Backstab, Dr:Maul |
| 2 | Stone Shot | physical, projectile, long, burst | ~140%x1, CD5 | R#12; 8v; Lv2-45; WoW: Hunter:AutoShot |
| 5 | Kamikaze | physical, nova, close, burst | ~250% self 10%, CD20 | R#30; 5v; Lv5-46; WoW: Wa:Retaliation/Recklessness, Mage:ArcaneExplosion |

### Area

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Cleave | physical, melee, close, sustain | ~100% arc, CD5 | R#21; 15v; Lv1-40; Day-0; P0 L1; WoW: Wa:Cleave/Whirlwind/ThunderClap, Dr:Swipe |
| 5 | Quake | physical, ground, short, burst | ~120% AoE, CD10 | R#13; 10v; Lv5-50; WoW: Wa:ThunderClap, Hunter:Volley/Explosive, Dr:Hurricane |

### Ranged

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Aimed Shot | physical, projectile, long, burst | ~150%x1, CD4 | R#22; 13v; Lv1-39; WoW: Hunter:ArcaneShot/MultiShot/HunterMark |
| 1 | Volley | physical, projectile, long, sustain | ~70%x3, CD8 | R#23; 14v; Lv1-38; WoW: Hunter:Volley/MultiShot |
| 10 | Firearm Shot | physical, projectile, long, burst | ~130%x1, CD5 | R#24; 19v; Lv10-47; WoW: Hunter:AutoShot/ArcaneShot |

### Bleed

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 5 | Bleed Cut | physical, melee, close, dot, bleed | ~70% + bld 6s, CD6 | R#28; 5v; Lv5-47; WoW: Wa:Rend, Ro:Rupture/Garrote, Dr:Rip/Rake |

### Execute

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 4 | Execute | physical, melee, short, burst, execute | ~100% x2<30%, CD6 | R#25; 9v; Lv4-48; P0 L4; WoW: Wa:Execute, Ro:Eviscerate, Dr:FerociousBite, Pa:HammerWrath |

### Combo

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Shard-Combo-Rage | shadow, instant, self, combo | 5cp/shards; rage on hit/taken | #90; WoW: Ro:Combo-CP; Lk:Shards; Wa:Rage/Bloodrage |
| 16 | Combo Chain | physical, melee, close, combo, opener | ~80%, CD5 + opn | R#26; 8v; Lv16-49; P0 L2 glue; WoW: Ro:Sinister/Backstab, Dr:Claw, Wa:Overpower |

### Counter

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 5 | Riposte | physical, melee, close, burst, breaker | ~160% ripo, CD8 | R#29; 9v; Lv5-40; WoW: Wa:Revenge/Overpower, Hunter:Mongoose/WingClip |

## 4. Control

### Freeze

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 4 | Freeze | frost, instant, short, control, freeze | ~70% + frz, CD12 | R#31; 3v; Lv4-34; WoW: Hunter:FreezingTrap, Sh:FrostShock/Earthbind |
| 5 | Ice Wall | frost, ground, short, control, defense | wall 5 cells, CD15 | R#9; 5v; Lv5-49; WoW: Sh:Stoneclaw/Earthbind |
| 5 | Slow Field | frost, ground, short, control | slow 50% 6s, CD12 | R#41; 6v; Lv5-16; WoW: Sh:Earthbind, Hunter:Concussive/WingClip, Wa:Hamstring |

### Shock

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Taunt | physical, shout, short, control | taunt + threat, CD10 | R#42; 10v; Lv1-36; WoW: Wa:Taunt/Mocking, Dr:Growl, Lk:Torment, Hunter:Distract |
| 1 | Warcry | physical, shout, short, control | ~60% shout, CD12 | R#34; 7v; Lv1-38; WoW: Wa:Battle/DemoralShout, Dr:DemoralRoar, Lk:HowlTerror |
| 4 | Stun | storm, instant, short, control, shock | ~70% + stun, CD12 | R#32; 7v; Lv4-35; WoW: Wa:Charge/Intercept/Bash, Ro:CheapShot/Kidney, Pa:HoJ |
| 10 | Threat | physical, shout, short, defense | threat xN, CD0-10 | #89; WoW: Wa:Sunder/Taunt; Dr:Growl; Pa:Salvation/RighteousFury |

### Mind

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 14 | Blind | shadow, instant, short, control | blind/curse, CD12 | R#45; 6v; Lv14-49; WoW: Ro:Blind/Gouge, Lk:Curses, Dr:FaerieFire, Hunter:Scorpid |
| 16 | Petrify | arcane, instant, short, control, root | ~60% + petrify, CD15 | R#33; 3v; Lv unknown; WoW: Pr:Shackle, Lk:Banish, Dr:Hibernate, Ro:Sap |
| 16 | Silence | arcane, instant, long, control | silence 4s, CD15 | R#37; 8v; Lv16-47; WoW: Mage:Counterspell, Ro:Kick, Wa:Pummel, Sh:EarthShock |
| 16 | Sleep | arcane, instant, short, control, charm | sleep 6s, CD15 | R#36; 9v; Lv16-40; WoW: Mage:Polymorph, Ro:Sap, Dr:Hibernate, Hunter:ScareBeast |
| 16 | Time Stop | arcane, instant, short, control | lock 3s, CD30 | R#46; 3v; Lv16-45; WoW: none in Classic (stun-locks see Stun) |
| 30 | Dominate Mind | shadow, instant, short, control, charm | charm humanoid 20s chn, CD8 | #92; WoW: Pr:MindControl; Lk:Enslave/Seduction |
| 31 | Fear | shadow, shout, short, control, fear | ~60% + fear, CD15 | R#35; 5v; Lv31-47; WoW: Pr:PsychicScream, Lk:Fear/Howl/Coil, Wa:IntimidShout |

### Space

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Vacuum | arcane, ground, short, control, pull | ~60% + pull, CD14 | R#38; 8v; Lv1-40; WoW: none in Classic (no pull equiv) |
| 3 | Snare | nature, ground, short, control, root | ~40% + root 4s, CD12 | R#40; 8v; Lv3-33; Day-0; P0 L3; WoW: Dr:Roots, Hunter:WingClip/Traps, Sh:Earthbind |
| 16 | Knockback | physical, instant, short, control, knockback | ~80% + kb, CD8 | R#39; 6v; Lv16-35; WoW: Hunter:Disengage |

### Meta

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 11 | Dispel | arcane, instant, short, control, breaker | dispel/strip, CD15 | R#43; 9v; Lv11-38; WoW: Pr:Dispel, Pa:Purify, Sh:Purge, Lk:Devour, Hunter:Tranquil |
| 13 | Link | arcane, instant, long, control | share dmg link, CD20 | R#44; 7v; Lv13-33; WoW: Pa:BlessSacrifice, Lk:HealthFunnel |

## 5. Utilities

### Buffs

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | ATK Aura | physical, aura, self, support | +10% atk aura, CD20 | R#52; 10v; Lv1-31; P0 L4; WoW: Wa:BattleShout, Pa:Might, Sh:StrengthEarth/Windfury |
| 1 | Haste | arcane, aura, self, support | +haste aura, CD20 | R#54; 8v; Lv1-36; WoW: Ro:SliceDice, Hunter:RapidFire, Sh:Windfury |
| 3 | Battery | arcane, instant, short, support | +SP regen, CD20 | R#57; 3v; Lv3-16; WoW: Dr:Innervate, Sh:ManaSpring, Mage:Evocation |
| 4 | Hunter Aspect | physical, aura, self, mobility | 1 aspect, CD0 | #87; WoW: Hunter:Monkey/Hawk/Cheetah/Beast/Pack/Wild |
| 5 | Thorns | physical, aura, self, defense | reflect 30%, CD15 | R#55; 3v; Lv5-31; WoW: Dr:Thorns, Pa:RetributionAura, Sh:LightningShield |
| 13 | Imbue | arcane, instant, self, support | imbue element, CD15 | R#58; 4v; Lv13-18; WoW: Sh:Rockbiter/Flametongue/Frostbrand/Windfury, Ro:Poisons |

### Move

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Blink | arcane, instant, self, mobility | blink 9, CD15 | R#71; 5v; Lv1-16; WoW: Mage:Blink |
| 1 | Dash | physical, instant, self, mobility | dash 6, CD8 | R#72; 6v; Lv1-40; Day-0; P0 L1; WoW: Ro:Sprint, Wa:Charge/Intercept, Dr:Dash |
| 1 | Combat Stance | physical, instant, self, defense, stance | stance swap 1s lock, CD3 | #81; WoW: Wa:Battle/Defensive/Berserker |
| 10 | Feral Forms | nature, instant, self, defense, stance | form swap role change, CD3, mana | #82; WoW: Dr:Bear/Cat/Travel/Aquatic/Dire |
| 15 | Mount | physical, instant, self, mobility, stance | mount stance, CD10 | R#69; 15v; Lv15-49; WoW: Pa:Warhorse/Charger, Lk:Felsteed/Dreadsteed, Dr:Travel |
| 20 | Spirit Wolf | nature, instant, self, mobility, stance | +40% move, CD0 | #83; WoW: Sh:GhostWolf |

### Sight

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Reveal | arcane, instant, short, support | reveal 9, CD12 | R#74; 8v; Lv1-39; WoW: Mage:DetectMagic, Hunter:Flare, Pr:MindVision, Lk:EyeKilrogg |
| 1 | Stealth | shadow, instant, self, mobility | hide 10s, CD20 | R#73; 11v; Lv1-33; WoW: Ro:Stealth/Vanish, Dr:Prowl, Hunter:FeignDeath |
| 4 | Scout | arcane, instant, long, support | vision ward, CD15 | R#80; 4v; Lv4-16; WoW: Hunter:Tracks/EagleEye/BeastLore, Sh:FarSight, Lk:EyeKilrogg |

### Econ (portals see #78)

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 3 | Market | physical, instant, self, support | camp econ, fee | R#75; 19v; Lv3-31; WoW: Ro:PickPocket/PickLock, Mage:ConjureFood/Water |
| 16 | Portal | arcane, instant, long, support | portal party, CD30 | R#78; 3v; Lv16-30; WoW: Mage:Teleport/Portal, Lk:RitualSummoning, Sh:AstralRecall |

### Survival

| Lv | Unified Skill | Tags | Calc | Sources/Notes |
|---|---|---|---|---|
| 1 | Sustain | physical, instant, self, sustain | regen/potion+, CD15 | R#76; 3v; Lv1-19; WoW: Mage:Conjure/Evocation, Lk:Healthstone/LifeTap, Dr:FrenziedRegen |
| 4 | Endure | physical, instant, self, defense | no-flinch 10s, CD20 | R#79; 4v; Lv4-25; WoW: Wa:ShieldWall/ShieldBlock/BerserkerRage, Ro:Evasion, Sh:Grounding |

## 6. Coverage

- Before: 639 catalog rows (RO 298 + ToS 341 primaries, documented).
- After: 92 unified families (80 comparison #1-80 + 12 WoW-system #81-92).
- Merged away: 559 duplicate rows into shared families.
- Parsed cells: 298 RO-style + 341 ToS-style = 639.
- WoW Classic 1.12: 9 classes, ranks collapsed; every base ability
  merged as a variant above or covered by a new #81-92 family.
- Every prior primary lands in exactly one family (lowest row wins).
- Day-0 pool + P0 pins preserved per family Sources cells (Day-0/P0 tags).
- Tags whitelist + targeters per skill-tag-taxonomy.md; Lv gates +
  P0 pins per skill-advancement.md §§6.3-6.4; TTK + factor_base per
  classless-brainstorm.md §13.

(End of file - total 290 lines)
