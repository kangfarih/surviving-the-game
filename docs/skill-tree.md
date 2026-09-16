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
- Description = player-facing cast result; direct impact and follow-up area damage are stated separately when both apply.
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

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Fire Bolt | fire, projectile, long, burst | ~150%x1, CD4, 12MP | R#1; 12v; Lv1-49; Day-0; P0 L1; WoW: Mage:Fireball, Lk:ShadowBolt/Immolate | Hurl a bolt of fire at one enemy for direct damage. |
| 1 | Fire Splash | fire, projectile, short, burst | ~120%x1 spl, CD6, 14MP | R#2; 11v; Lv1-40; WoW: Mage:FireBlast/Scorch, Lk:SearingPain/SoulFire | Blast a nearby enemy; the impact splashes fire damage around the target. |
| 2 | Fire Field | fire, ground, short, dot, burn | ~50%/t 8s, CD12, 14MP | R#3; 8v; Lv2-48; WoW: Mage:Flamestrike, Hunter:Immolation, Sh:FireNova, Lk:RainFire | Ignite a target area; enemies standing in it take fire damage over time. |
| 5 | Ignite | fire, instant, short, dot, burn | ~40%/t 6s, CD8 + burn | R#5; 6v; Lv5-35; WoW: Lk:Corruption/Agony, Pr:SW:Pain, Dr:Moonfire, Hunter:Serpent | Set a nearby enemy ablaze, causing burning damage each second. |
| 10 | Flame Arc | fire, nova, short, burst | ~130% AoE, CD10, 18MP | #93; ladder-fill Lv10 | Release a short-range fire arc that strikes enemies around you. |
| 15 | Pyre Wave | fire, ground, short, dot, burn | ~70%/t 8s, CD14, 20MP | #94; ladder-fill Lv15 | Raise a burning wave across an area; enemies caught in it keep burning. |
| 16 | Meteor | fire, ground, long, burst | ~120%x5, CD25, 30MP | R#4; 9v; Lv16-49; WoW: Mage:Blizzard, Dr:Starfire/Hurricane | Rain a meteor on a target area with radius 10; enemies hit take direct damage equal to 20% damage, then a radius-10 fire area remains and deals 10% damage per second for 5 seconds. |
| 20 | Inferno Crash | fire, projectile, long, burst, burn | ~200%x1 + burn, CD16, 24MP | #95; ladder-fill Lv20 | Launch a heavy fireball that hits one enemy hard and applies a lingering burn. |
| 25 | Volcano Core | fire, ground, short, burst, burn | ~150%x4, CD25, 30MP | #96; ladder-fill Lv25 | Erupt a volcanic core beneath an area, striking repeatedly and leaving embers behind. |
| 30 | Sunfall | fire, ground, long, burst | ~180%x5, CD30, 36MP | #97; ladder-fill Lv30 | Call down a wide solar barrage that repeatedly scorches the target area. |

### Storm

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Lightning Bolt | storm, projectile, long, burst, shock | ~150%x1 unit bnc0, CD4 + shk | R#10; 8v; Lv1-34; unit; WoW: Sh:LightningBolt, Dr:Wrath | Strike one enemy with a long-range bolt of lightning and apply shock. |
| 3 | Chain Lightning | storm, projectile, long, burst, shock | ~100%x3+ dir bnc3, CD12 + shk | R#11; 7v; Lv3-50; WoW: Sh:ChainLightning (heal-var see Heal Zone) | Launch lightning at an enemy; it bounces to additional targets and shocks each one. |
| 5 | Static Arc | storm, nova, short, burst, shock | ~140% AoE, CD10, 16MP | #98; ladder-fill Lv5 | Discharge a short-range electric arc that damages nearby enemies and shocks them. |
| 10 | Thunder Spear | storm, projectile, long, burst, shock | ~170%x1, CD8, 18MP | #99; ladder-fill Lv10 | Hurl a focused spear of lightning at one distant enemy and apply shock. |
| 15 | Storm Cell | storm, ground, short, dot, shock | ~70%/t 8s, CD14, 20MP | #100; ladder-fill Lv15 | Create a charged field that repeatedly shocks enemies standing inside it. |
| 20 | Tempest Lance | storm, projectile, long, burst, shock | ~200%x1 bnc1, CD12, 24MP | #101; ladder-fill Lv20 | Pierce one enemy with a powerful lightning lance, then bounce the charge to another target. |
| 25 | Eye of Storm | storm, nova, short, burst, shock | ~180% AoE, CD18, 28MP | #102; ladder-fill Lv25 | Unleash a storm around you that strikes every nearby enemy with lightning. |
| 30 | Judgment Storm | storm, ground, long, burst, shock | ~160%x5, CD28, 34MP | #103; ladder-fill Lv30 | Call down repeated lightning strikes across a distant area, shocking enemies caught within it. |

### Shadow

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Gloom Bolt | shadow, projectile, long, burst | ~140%x1, CD4, 12MP | #104; ladder-fill Lv1 | Fire a shadow bolt at one distant enemy for direct damage. |
| 3 | Shadow Bolt | shadow, projectile, long, burst | ~140%x1, CD5 | R#16; 17v; Lv3-49; WoW: Lk:ShadowBolt, Pr:MindBlast | Hurl concentrated shadow at one distant enemy for direct damage. |
| 5 | Creeping Dark | shadow, instant, short, dot | ~50%/t 6s, CD8, 14MP | #105; ladder-fill Lv5 | Coat a nearby enemy in creeping darkness that deals damage each second. |
| 10 | Night Spike | shadow, projectile, short, burst | ~170%x1, CD8, 18MP | #106; ladder-fill Lv10 | Drive a spike of shadow into a nearby enemy for heavy direct damage. |
| 15 | Umbral Field | shadow, ground, short, dot | ~70%/t 8s, CD14, 20MP | #107; ladder-fill Lv15 | Spread a dark field that damages enemies every second while they remain inside. |
| 20 | Soul Rend | shadow, melee, close, burst, lifesteal | ~200%x1 + heal, CD12, 22MP | #108; ladder-fill Lv20 | Tear at a close enemy's soul for direct damage and restore health from the wound. |
| 25 | Abyss Nova | shadow, nova, short, burst | ~180% AoE, CD18, 28MP | #109; ladder-fill Lv25 | Detonate a shadow nova around you, damaging all nearby enemies. |
| 30 | Eventide Fall | shadow, ground, long, burst | ~170%x5, CD30, 34MP | #110; ladder-fill Lv30 | Bring down repeated waves of shadow across a distant area, striking enemies multiple times. |

### Blood

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Blood Prick | blood, projectile, short, burst | ~130%x1, CD4, 10MP | #111; ladder-fill Lv1 | Fire a sharp blood projectile at a nearby enemy for direct damage. |
| 5 | Leech Bite | blood, melee, close, sustain, lifesteal | ~110% + heal 30%, CD6 | #112; ladder-fill Lv5 | Bite a close enemy, dealing damage and returning part of the damage as health. |
| 10 | Crimson Arc | blood, melee, close, burst, lifesteal | ~150% + heal 30%, CD8 | #113; ladder-fill Lv10 | Slash nearby enemies with a crimson arc and heal from the blood spilled. |
| 15 | Sanguine Pool | blood, ground, short, dot, lifesteal | ~60%/t 8s + heal, CD14 | #114; ladder-fill Lv15 | Flood an area with blood that damages enemies over time and restores your health. |
| 16 | Drain | blood, projectile, short, sustain, lifesteal | ~100% + heal 50%, CD8 | R#19; 9v; Lv16-34; WoW: Lk:DrainLife/Soul/Mana/LifeTap/Coil, Hunter:Viper | Drain life from one nearby enemy, dealing damage and restoring a portion of your health. |
| 20 | Heart Siphon | blood, instant, short, sustain, lifesteal | ~180% + heal 50%, CD12 | #115; ladder-fill Lv20 | Siphon a nearby enemy's vitality for heavy damage and a large heal. |
| 25 | Blood Nova | blood, nova, short, burst, lifesteal | ~170% AoE + heal, CD18 | #116; ladder-fill Lv25 | Burst a blood nova around you, damaging nearby enemies and healing you for the life taken. |
| 30 | Exsanguinate | blood, instant, long, burst, execute, lifesteal | ~150% x2<30% + heal, CD20 | #117; ladder-fill Lv30 | Rip the blood from a distant weakened enemy for repeated damage and restore health from the execution. |

### Poison

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Venom Sting | poison, projectile, short, dot | ~90% + psn 4s, CD5 | R#17; 8v; Lv1-36; WoW: Hunter:Serpent/Scorpid, Ro:Instant/DeadlyPoison | Sting a nearby enemy with venom that continues dealing poison damage. |
| 5 | Venom Cloud | poison, ground, short, dot | ~50%/t 8s, CD12 + psn | R#18; 9v; Lv5-36; WoW: Lk:Corruption, Ro:Poisons | Fill an area with poisonous vapor that damages enemies each second. |
| 10 | Plague Spike | poison, projectile, long, dot | ~120% + psn 6s, CD8, 18MP | #118; ladder-fill Lv10 | Launch a plague spike at one distant enemy for direct damage and a lingering poison. |
| 15 | Miasma Field | poison, ground, short, dot | ~70%/t 8s, CD14, 20MP | #119; ladder-fill Lv15 | Spread toxic miasma across an area, damaging enemies that remain inside. |
| 20 | Envenom Burst | poison, melee, close, burst | ~200%x1 + psn, CD12, 22MP | #120; ladder-fill Lv20 | Strike a close enemy with a venomous blow that deals direct damage and applies poison. |
| 25 | Blight Nova | poison, nova, short, dot | ~100%/t 6s AoE, CD18, 28MP | #121; ladder-fill Lv25 | Detonate a blight nova around you that poisons nearby enemies over time. |
| 30 | Pandemic | poison, ground, long, dot | ~90%/t 10s, CD28, 34MP | #122; ladder-fill Lv30 | Infect a distant area with a spreading plague that damages enemies every second. |

### Arcane

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Arc Spark | arcane, projectile, long, burst | ~140%x1, CD4, 12MP | #123; ladder-fill Lv1 | Use Arc Spark to deal direct damage to its target or the listed area. |
| 5 | Rune Dart | arcane, projectile, short, burst | ~150%x1, CD5, 14MP | #124; ladder-fill Lv5 | Use Rune Dart to deal direct damage to its target or the listed area. |
| 10 | Mana Flare | arcane, nova, short, burst | ~140% AoE, CD10, 18MP | #125; ladder-fill Lv10 | Use Mana Flare to deal direct damage to its target or the listed area. |
| 15 | Spell Lattice | arcane, ground, short, dot | ~60%/t 8s, CD14, 20MP | #126; ladder-fill Lv15 | Place Spell Lattice across an area; enemies or allies inside receive its listed effect. |
| 16 | Beam | arcane, channel, long, burst | ~200% chn 2s, CD10 | R#27; 6v; Lv16-50; WoW: Mage:ArcMissiles, Hunter:ArcaneShot, Dr:Starfire | Use Beam to deal direct damage to its target or the listed area. |
| 20 | Prism Lance | arcane, channel, long, burst | ~220% chn 2s, CD12, 24MP | #127; ladder-fill Lv20 | Use Prism Lance to deal direct damage to its target or the listed area. |
| 25 | Arc Storm | arcane, nova, short, burst | ~180% AoE, CD18, 28MP | #128; ladder-fill Lv25 | Use Arc Storm to deal direct damage to its target or the listed area. |
| 30 | Singularity | arcane, ground, long, burst | ~170%x5, CD30, 36MP | #129; ladder-fill Lv30 | Place Singularity across an area; enemies or allies inside receive its listed effect. |

### Holy - Nukes

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Holy Bolt | holy, projectile, long, burst | ~150%x1, CD5 | R#14; 13v; Lv1-48; WoW: Pr:Smite/HolyFire, Pa:Exorcism/HolyWrath | Use Holy Bolt to deal direct damage to its target or the listed area. |
| 1 | Seal-Judgement | holy, melee, close, burst | ~100% seal + judge 8s, CD10 | #84; WoW: Pa:SealRighteous/Crusader/Justice/Light/Wisdom + Judgement | Use Seal-Judgement to deal direct damage to its target or the listed area. |
| 5 | Radiant Brand | holy, instant, short, burst | ~140%x1, CD6, 14MP | #130; ladder-fill Lv5 | Use Radiant Brand to deal direct damage to its target or the listed area. |
| 10 | Sunlance | holy, projectile, long, burst | ~170%x1, CD8, 18MP | #131; ladder-fill Lv10 | Use Sunlance to deal direct damage to its target or the listed area. |
| 15 | Consecrate | holy, ground, short, dot | ~60%/t 8s, CD14, 20MP | #132; ladder-fill Lv15 | Place Consecrate across an area; enemies or allies inside receive its listed effect. |
| 16 | Exorcism Zone | holy, ground, short, burst | ~120% zone, CD12 | R#15; 10v; Lv16-45; WoW: Pa:Exorcism, Pr:HolyFire, Mage:ArcaneExplosion | Place Exorcism Zone across an area; enemies or allies inside receive its listed effect. |
| 20 | Judgment Ray | holy, projectile, long, burst | ~200%x1, CD12, 24MP | #133; ladder-fill Lv20 | Use Judgment Ray to deal direct damage to its target or the listed area. |
| 25 | Hallowed Nova | holy, nova, short, burst | ~180% AoE, CD18, 28MP | #134; ladder-fill Lv25 | Use Hallowed Nova to deal direct damage to its target or the listed area. |
| 30 | Wrath of Light | holy, ground, long, burst | ~170%x5, CD30, 36MP | #135; ladder-fill Lv30 | Place Wrath of Light across an area; enemies or allies inside receive its listed effect. |

### Holy - Heal (only heal home; Nature refs here)

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Heal | holy, instant, short, support | heal ~120%, CD10 | R#47; 10v; Lv1-33; Day-0; P0 L1; WoW: Pr:Lesser/Heal/Flash/Greater, Pa:HolyLight | Restore health to an ally or yourself with Heal. |
| 2 | Barrier | holy, instant, self, defense | block 3 hits, CD14 | R#51; 5v; Lv2-16; Day-0; P0 L2; WoW: Pr:PW:Shield/InnerFire, Mage:Armors/Wards | Use Barrier to protect yourself or an ally with its listed defensive effect. |
| 2 | Cleanse | holy, instant, short, support | cleanse, CD10 | R#56; 7v; Lv2-34; WoW: Pa:Purify/Cleanse, Pr:Cure/Dispel, Dr:Cure/Remove, Sh:Purge | Use Cleanse to apply the listed effect to its target. |
| 5 | Heal Zone | holy, ground, short, support | heal ~80%/t zone, CD15 | R#48; 8v; Lv5-34; WoW: Pr:PrayerHealing, Sh:HealingStream/ChainHeal, Dr:Tranquility | Restore health to an ally or yourself with Heal Zone. |
| 5 | Resurrect | holy, instant, short, support | rez 100%, CD60 | R#50; 6v; Lv5-50; WoW: Pr:Res, Pa:Redemption/DI, Sh:Ancestral/Reincarn, Dr:Rebirth | Use Resurrect to apply the listed effect to its target. |
| 10 | Flash Mend | holy, instant, short, support | heal ~150%, CD8, 18MP | #136; ladder-fill Lv10 | Restore health to an ally or yourself with Flash Mend. |
| 15 | Sanctuary Field | holy, ground, short, support | heal ~100%/t zone, CD18, 22MP | #137; ladder-fill Lv15 | Place Sanctuary Field across an area; enemies or allies inside receive its listed effect. |
| 16 | Regen | holy, aura, self, sustain, support | HoT ~30%/2s x5, CD15 | R#49; 7v; Lv16-34; WoW: Pr:Renew, Dr:Rejuvenation/Regrowth | Place Regen across an area; enemies or allies inside receive its listed effect. |
| 20 | Radiant Surge | holy, instant, short, support | heal ~200% party, CD20, 26MP | #138; ladder-fill Lv20 | Use Radiant Surge to apply the listed effect to its target. |
| 25 | Divine Beacon | holy, ground, long, support | heal ~120%/t zone, CD22, 30MP | #139; ladder-fill Lv25 | Place Divine Beacon across an area; enemies or allies inside receive its listed effect. |
| 30 | Miracle | holy, instant, long, support | full heal + cleanse, CD60, 40MP | #140; ladder-fill Lv30 | Use Miracle to apply the listed effect to its target. |

### Holy - Ward

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Bubble | holy, instant, self, defense | immune 3s, CD60 | R#77; 4v; Lv1-37; WoW: Pa:DivineShield/Protection, Mage:IceBlock/ManaShield | Use Bubble to protect yourself or an ally with its listed defensive effect. |
| 1 | DEF Aura | holy, aura, self, support | +DEF aura, CD20 | R#53; 8v; Lv1-17; WoW: Pa:Devotion/ResistAuras, Pr:Fortitude, Dr:MarkWild | Place DEF Aura across an area; enemies or allies inside receive its listed effect. |
| 1 | Paladin Aura | holy, aura, self, defense | 1 aura/party, CD0 | #86; WoW: Pa:Devotion/Retribution/Concentration/Shadow/Frost/FireRes | Use Paladin Aura to protect yourself or an ally with its listed defensive effect. |
| 4 | Paladin Blessing | holy, aura, self, support | 1 bless/target 5m, CD0 | #85; WoW: Pa:Might/Wisdom/Light/Protection/Freedom/Salvation | Place Paladin Blessing across an area; enemies or allies inside receive its listed effect. |
| 5 | Bless | holy, instant, short, support | +stats buff, CD15 | R#59; 5v; Lv5-31; WoW: Pa:Might/Wisdom/Light, Pr:Fortitude, Mage:Intellect | Use Bless to apply the listed effect to its target. |
| 10 | Guardian Oath | holy, instant, short, defense | shield ally 200%, CD18, 20MP | #141; ladder-fill Lv10 | Use Guardian Oath to protect yourself or an ally with its listed defensive effect. |
| 15 | Aegis Zone | holy, ground, short, defense | ward zone block 5 hits, CD20, 24MP | #142; ladder-fill Lv15 | Use Aegis Zone to protect yourself or an ally with its listed defensive effect. |
| 16 | Bodyguard | holy, instant, short, defense | redirect ally, CD20 | R#60; 3v; Lv16-32; WoW: Pa:BlessProtection/Sacrifice, Lk:HealthFunnel | Use Bodyguard to protect yourself or an ally with its listed defensive effect. |
| 18 | Fear Ward Pulse | holy, instant, short, defense | ward 1 fear 10m/pulse 5s, CD30 | #91; WoW: Pr:FearWard; Sh:TremorTotem | Use Fear Ward Pulse to protect yourself or an ally with its listed defensive effect. |
| 20 | Martyr Swap | holy, instant, short, defense | take ally dmg 6s, CD22, 26MP | #143; ladder-fill Lv20 | Use Martyr Swap to protect yourself or an ally with its listed defensive effect. |
| 25 | Sanctum Dome | holy, aura, self, defense | immune dome 4s, CD40, 32MP | #144; ladder-fill Lv25 | Use Sanctum Dome to protect yourself or an ally with its listed defensive effect. |
| 30 | Invincible Legion | holy, aura, self, defense | party immune 3s, CD60, 40MP | #145; ladder-fill Lv30 | Use Invincible Legion to protect yourself or an ally with its listed defensive effect. |

### Frost bolts (walls see Control-Freeze #9)

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Cold Bolt | frost, projectile, long, burst | ~150%x1, CD4, 12MP | R#6; 7v; Lv1-40; WoW: Mage:Frostbolt, Sh:FrostShock | Use Cold Bolt to deal direct damage to its target or the listed area. |
| 1 | Frost Nova | frost, nova, short, burst, freeze | ~110% AoE, CD9 + chill | R#7; 9v; Lv1-48; Day-0; P0 L1; WoW: Mage:FrostNova, Hunter:Freezing/FrostTrap | Use Frost Nova to deal direct damage to its target or the listed area. |
| 5 | Ice Lane | frost, projectile, short, burst, freeze | ~130% line, CD8 + frz | R#8; 6v; Lv5-45; WoW: Mage:ConeCold/Blizzard | Use Ice Lane to deal direct damage to its target or the listed area. |
| 10 | Glacial Spike | frost, projectile, long, burst, freeze | ~170%x1 + chill, CD8, 18MP | #146; ladder-fill Lv10 | Use Glacial Spike to deal direct damage to its target or the listed area. |
| 15 | Blizzard Field | frost, ground, short, dot, freeze | ~70%/t 8s + slow, CD14, 20MP | #147; ladder-fill Lv15 | Place Blizzard Field across an area; enemies or allies inside receive its listed effect. |
| 20 | Deep Freeze Lance | frost, instant, short, control, freeze | ~180% + frz 3s, CD14, 24MP | #148; ladder-fill Lv20 | Use Deep Freeze Lance to hinder nearby enemies with its listed control effect. |
| 25 | Frozen Nova | frost, nova, short, burst, freeze | ~180% AoE + frz, CD18, 28MP | #149; ladder-fill Lv25 | Use Frozen Nova to deal direct damage to its target or the listed area. |
| 30 | Absolute Zero | frost, ground, long, burst, freeze | ~170%x5 + frz, CD30, 36MP | #150; ladder-fill Lv30 | Place Absolute Zero across an area; enemies or allies inside receive its listed effect. |

### Nature (heals see Holy-Heal)

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Thorn Lash | nature, projectile, short, burst | ~140%x1, CD4, 12MP | #151; ladder-fill Lv1 | Use Thorn Lash to deal direct damage to its target or the listed area. |
| 5 | Entangle Seeds | nature, ground, short, control, root | ~50% + root 4s, CD12, 14MP | #152; ladder-fill Lv5 | Use Entangle Seeds to hinder nearby enemies with its listed control effect. |
| 10 | Briar Guard | nature, minion, short, summon, defense | thorn pet, CD20, 18MP | #153; ladder-fill Lv10 | Summon Briar Guard to fight, guard, or control the area for you. |
| 15 | Spore Cloud | nature, ground, short, dot | ~70%/t 8s, CD14, 20MP | #154; ladder-fill Lv15 | Place Spore Cloud across an area; enemies or allies inside receive its listed effect. |
| 16 | Plant | nature, minion, short, summon | plant/ward, CD15 | R#67; 4v; Lv16-35; WoW: Sh:SentryTotem, Hunter:ImmolationTrap | Summon Plant to fight, guard, or control the area for you. |
| 16 | Tame | nature, instant, short, control, charm | tame/charm, CD20 | R#70; 5v; Lv16-20; WoW: Hunter:Tame/CallPet, Lk:Imp/Void/Succ/Felhunter, Dr:Hibernate | Use Tame to hinder nearby enemies with its listed control effect. |
| 20 | Vine Crush | nature, melee, close, burst | ~200%x1 + root, CD12, 24MP | #155; ladder-fill Lv20 | Use Vine Crush to deal direct damage to its target or the listed area. |
| 25 | Ancient Grove | nature, ground, short, support | heal + root zone 8s, CD22, 30MP | #156; ladder-fill Lv25 | Place Ancient Grove across an area; enemies or allies inside receive its listed effect. |
| 30 | Worldroot Wrath | nature, ground, long, burst | ~170%x5 + root, CD30, 36MP | #157; ladder-fill Lv30 | Place Worldroot Wrath across an area; enemies or allies inside receive its listed effect. |

### Summon

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Spark Turret | physical, trap, short, summon | turret ~50%/2s, CD15, 14MP | #158; ladder-fill Lv1 | Summon Spark Turret to fight, guard, or control the area for you. |
| 3 | Turret | physical, trap, short, summon | turret ~60%/2s, CD18 | R#64; 5v; Lv3-48; P0 L3; WoW: Sh:Searing/Magma/FireNovaTotem | Summon Turret to fight, guard, or control the area for you. |
| 4 | Totem | nature, trap, short, summon | totem HP5, 1/element, killable | #88; WoW: Sh:Stoneskin/Earthbind/Searing/ManaSpring/Grounding | Summon Totem to fight, guard, or control the area for you. |
| 5 | Beast Companion | physical, minion, long, summon | beast pet, CD20 | R#66; 20v; Lv5-33; WoW: Hunter:Pet, Lk:Imp | Summon Beast Companion to fight, guard, or control the area for you. |
| 10 | Swarm Pet | physical, minion, short, summon | pet x3 melee, CD20 | R#61; 8v; Lv10-25; WoW: Lk:Inferno, Hunter:Pet | Summon Swarm Pet to fight, guard, or control the area for you. |
| 10 | Trap Field | physical, trap, short, dot | trap ~60%/t, CD12 | R#65; 11v; Lv10-38; WoW: Hunter:Immolation/Freezing/Frost/Explosive, Ro:Traps | Apply Trap Field to an enemy; it continues dealing damage over time. |
| 11 | Tank Pet | physical, minion, close, summon, defense | tank pet, CD25 | R#63; 5v; Lv11-16; WoW: Lk:Voidwalker, Hunter:Pet | Summon Tank Pet to fight, guard, or control the area for you. |
| 14 | Clone | arcane, minion, self, summon | clone 10s, CD30 | R#68; 5v; Lv14-48; WoW: Sh:SentryTotem, Lk:EyeKilrogg | Summon Clone to fight, guard, or control the area for you. |
| 15 | Rune Sentry | arcane, trap, short, summon | sentry ~80%/2s, CD18, 22MP | #159; ladder-fill Lv15 | Summon Rune Sentry to fight, guard, or control the area for you. |
| 16 | Caster Pet | arcane, minion, long, summon | pet ranged, CD20 | R#62; 7v; Lv16-35; WoW: Lk:Imp/Felhunter, Hunter:Pet | Summon Caster Pet to fight, guard, or control the area for you. |
| 20 | Siege Golem | physical, minion, close, summon, defense | golem tank, CD25, 26MP | #160; ladder-fill Lv20 | Summon Siege Golem to fight, guard, or control the area for you. |
| 25 | Storm Battery | storm, trap, short, summon | turret ~100%/2s chain, CD22, 30MP | #161; ladder-fill Lv25 | Summon Storm Battery to fight, guard, or control the area for you. |
| 30 | Legion Gate | shadow, minion, short, summon | pet x5 + buff, CD30, 36MP | #162; ladder-fill Lv30 | Summon Legion Gate to fight, guard, or control the area for you. |

## 3. Physical

### Single

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Weapon Hit | physical, melee, close, burst | ~150%x1, CD4 | R#20; 20v; Lv1-36; WoW: Wa:Heroic/Rend/Overpower/Slam, Ro:Sinister/Backstab, Dr:Maul | Use Weapon Hit to deal direct damage to its target or the listed area. |
| 2 | Stone Shot | physical, projectile, long, burst | ~140%x1, CD5 | R#12; 8v; Lv2-45; WoW: Hunter:AutoShot | Use Stone Shot to deal direct damage to its target or the listed area. |
| 5 | Kamikaze | physical, nova, close, burst | ~250% self 10%, CD20 | R#30; 5v; Lv5-46; WoW: Wa:Retaliation/Recklessness, Mage:ArcaneExplosion | Use Kamikaze to deal direct damage to its target or the listed area. |
| 10 | Heavy Slam | physical, melee, close, burst | ~170%x1, CD8 | #163; ladder-fill Lv10 | Use Heavy Slam to deal direct damage to its target or the listed area. |
| 15 | Piercing Shot | physical, projectile, long, burst | ~180%x1, CD10, 16MP | #164; ladder-fill Lv15 | Use Piercing Shot to deal direct damage to its target or the listed area. |
| 20 | Colossus Blow | physical, melee, close, burst | ~210%x1, CD12 | #165; ladder-fill Lv20 | Use Colossus Blow to deal direct damage to its target or the listed area. |
| 25 | Earthshaker Slam | physical, nova, close, burst | ~180% AoE, CD16 | #166; ladder-fill Lv25 | Use Earthshaker Slam to deal direct damage to its target or the listed area. |
| 30 | Titan Breaker | physical, melee, close, burst, breaker | ~220%x1, CD18 | #167; ladder-fill Lv30 | Use Titan Breaker to deal direct damage to its target or the listed area. |

### Area

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Cleave | physical, melee, close, sustain | ~100% arc, CD5 | R#21; 15v; Lv1-40; Day-0; P0 L1; WoW: Wa:Cleave/Whirlwind/ThunderClap, Dr:Swipe | Use Cleave to deal damage and maintain your momentum with its listed sustain effect. |
| 5 | Quake | physical, ground, short, burst | ~120% AoE, CD10 | R#13; 10v; Lv5-50; WoW: Wa:ThunderClap, Hunter:Volley/Explosive, Dr:Hurricane | Place Quake across an area; enemies or allies inside receive its listed effect. |
| 10 | Whirlwind | physical, melee, close, sustain | ~110% 360, CD8 | #168; ladder-fill Lv10 | Use Whirlwind to deal damage and maintain your momentum with its listed sustain effect. |
| 15 | Shockwave | physical, ground, short, burst | ~140% line AoE, CD12 | #169; ladder-fill Lv15 | Place Shockwave across an area; enemies or allies inside receive its listed effect. |
| 20 | Sunder Quake | physical, ground, short, burst, breaker | ~170% AoE, CD14 | #170; ladder-fill Lv20 | Place Sunder Quake across an area; enemies or allies inside receive its listed effect. |
| 25 | Blade Storm | physical, melee, close, sustain | ~130%x3 spin, CD18 | #171; ladder-fill Lv25 | Use Blade Storm to deal damage and maintain your momentum with its listed sustain effect. |
| 30 | Cataclysm Slam | physical, ground, long, burst | ~180%x3, CD25 | #172; ladder-fill Lv30 | Place Cataclysm Slam across an area; enemies or allies inside receive its listed effect. |

### Ranged

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Aimed Shot | physical, projectile, long, burst | ~150%x1, CD4 | R#22; 13v; Lv1-39; WoW: Hunter:ArcaneShot/MultiShot/HunterMark | Use Aimed Shot to deal direct damage to its target or the listed area. |
| 1 | Volley | physical, projectile, long, sustain | ~70%x3, CD8 | R#23; 14v; Lv1-38; WoW: Hunter:Volley/MultiShot | Use Volley to deal damage and maintain your momentum with its listed sustain effect. |
| 5 | Quick Draw | physical, projectile, long, burst | ~160%x1, CD5 | #173; ladder-fill Lv5 | Use Quick Draw to deal direct damage to its target or the listed area. |
| 10 | Firearm Shot | physical, projectile, long, burst | ~130%x1, CD5 | R#24; 19v; Lv10-47; WoW: Hunter:AutoShot/ArcaneShot | Use Firearm Shot to deal direct damage to its target or the listed area. |
| 15 | Scatter Volley | physical, projectile, long, sustain | ~80%x4, CD10 | #174; ladder-fill Lv15 | Use Scatter Volley to deal damage and maintain your momentum with its listed sustain effect. |
| 20 | Deadeye Shot | physical, projectile, long, burst | ~210%x1, CD12 | #175; ladder-fill Lv20 | Use Deadeye Shot to deal direct damage to its target or the listed area. |
| 25 | Barrage | physical, projectile, long, sustain | ~90%x5, CD16 | #176; ladder-fill Lv25 | Use Barrage to deal damage and maintain your momentum with its listed sustain effect. |
| 30 | Snipe | physical, projectile, long, burst, execute | ~200% x2<30%, CD18 | #177; ladder-fill Lv30 | Use Snipe to deal direct damage to its target or the listed area. |

### Bleed

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Scratch | physical, melee, close, dot, bleed | ~60% + bld 4s, CD4 | #178; ladder-fill Lv1 | Apply Scratch to an enemy; it continues dealing damage over time. |
| 5 | Bleed Cut | physical, melee, close, dot, bleed | ~70% + bld 6s, CD6 | R#28; 5v; Lv5-47; WoW: Wa:Rend, Ro:Rupture/Garrote, Dr:Rip/Rake | Apply Bleed Cut to an enemy; it continues dealing damage over time. |
| 10 | Deep Gash | physical, melee, close, dot, bleed | ~90% + bld 6s, CD8 | #179; ladder-fill Lv10 | Apply Deep Gash to an enemy; it continues dealing damage over time. |
| 15 | Hemorrhage | physical, melee, short, dot, bleed | ~100% + bld 8s, CD10 | #180; ladder-fill Lv15 | Apply Hemorrhage to an enemy; it continues dealing damage over time. |
| 20 | Arterial Cut | physical, melee, close, burst, bleed | ~160% + bld 8s, CD12 | #181; ladder-fill Lv20 | Use Arterial Cut to deal direct damage to its target or the listed area. |
| 25 | Bloodbath | physical, nova, short, dot, bleed | ~80%/t 8s AoE, CD18 | #182; ladder-fill Lv25 | Apply Bloodbath to an enemy; it continues dealing damage over time. |
| 30 | Exsanguinating Wounds | physical, melee, long, dot, bleed | ~120%/t 10s, CD22 | #183; ladder-fill Lv30 | Apply Exsanguinating Wounds to an enemy; it continues dealing damage over time. |

### Execute

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Coup de Grace | physical, melee, close, burst, execute | ~120% x1.5<40%, CD6 | #184; ladder-fill Lv1 | Use Coup de Grace to deal direct damage to its target or the listed area. |
| 4 | Execute | physical, melee, short, burst, execute | ~100% x2<30%, CD6 | R#25; 9v; Lv4-48; P0 L4; WoW: Wa:Execute, Ro:Eviscerate, Dr:FerociousBite, Pa:HammerWrath | Use Execute to deal direct damage to its target or the listed area. |
| 5 | Finishing Blow | physical, melee, short, burst, execute | ~130% x2<30%, CD6 | #185; ladder-fill Lv5 | Use Finishing Blow to deal direct damage to its target or the listed area. |
| 10 | Decapitate | physical, melee, close, burst, execute | ~150% x2<30%, CD8 | #186; ladder-fill Lv10 | Use Decapitate to deal direct damage to its target or the listed area. |
| 15 | Guillotine | physical, melee, short, burst, execute | ~170% x2<25%, CD10 | #187; ladder-fill Lv15 | Use Guillotine to deal direct damage to its target or the listed area. |
| 20 | Annihilate | physical, melee, close, burst, execute | ~190% x2<30%, CD12 | #188; ladder-fill Lv20 | Use Annihilate to deal direct damage to its target or the listed area. |
| 25 | Death Sentence | physical, melee, long, burst, execute | ~200% x2.5<35%, CD16 | #189; ladder-fill Lv25 | Use Death Sentence to deal direct damage to its target or the listed area. |
| 30 | Obliterate | physical, melee, close, burst, execute | ~220% x2.5<30%, CD18 | #190; ladder-fill Lv30 | Use Obliterate to deal direct damage to its target or the listed area. |

### Combo

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Shard-Combo-Rage | shadow, instant, self, combo | 5cp/shards; rage on hit/taken | #90; WoW: Ro:Combo-CP; Lk:Shards; Wa:Rage/Bloodrage | Use Shard-Combo-Rage as part of a combo to trigger its listed chain effect. |
| 5 | Opener Strike | physical, melee, close, combo, opener | ~100%, CD5 + opn | #191; ladder-fill Lv5 | Use Opener Strike as part of a combo to trigger its listed chain effect. |
| 10 | Followup Slash | physical, melee, close, combo, followup | ~120% followup, CD6 | #192; ladder-fill Lv10 | Use Followup Slash as part of a combo to trigger its listed chain effect. |
| 15 | Chain Breaker | physical, melee, close, combo, breaker | ~150% breaker, CD8 | #193; ladder-fill Lv15 | Use Chain Breaker as part of a combo to trigger its listed chain effect. |
| 16 | Combo Chain | physical, melee, close, combo, opener | ~80%, CD5 + opn | R#26; 8v; Lv16-49; P0 L2 glue; WoW: Ro:Sinister/Backstab, Dr:Claw, Wa:Overpower | Use Combo Chain as part of a combo to trigger its listed chain effect. |
| 20 | Relentless Chain | physical, melee, close, combo, followup | ~140% followup, CD8 | #194; ladder-fill Lv20 | Use Relentless Chain as part of a combo to trigger its listed chain effect. |
| 25 | Grand Finale | physical, melee, close, burst, breaker | ~200% breaker, CD14 | #195; ladder-fill Lv25 | Use Grand Finale to deal direct damage to its target or the listed area. |
| 30 | Infinite Combo | physical, melee, close, combo, opener | ~120% + reset CD, CD18 | #196; ladder-fill Lv30 | Use Infinite Combo as part of a combo to trigger its listed chain effect. |

### Counter

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Parry Stance | physical, melee, close, burst, breaker | ~120% ripo, CD6 | #197; ladder-fill Lv1 | Use Parry Stance to deal direct damage to its target or the listed area. |
| 5 | Riposte | physical, melee, close, burst, breaker | ~160% ripo, CD8 | R#29; 9v; Lv5-40; WoW: Wa:Revenge/Overpower, Hunter:Mongoose/WingClip | Use Riposte to deal direct damage to its target or the listed area. |
| 10 | Counter Slash | physical, melee, close, burst, breaker | ~170% ripo, CD8 | #198; ladder-fill Lv10 | Use Counter Slash to deal direct damage to its target or the listed area. |
| 15 | Reversal | physical, melee, short, burst, breaker | ~180% ripo, CD10 | #199; ladder-fill Lv15 | Use Reversal to deal direct damage to its target or the listed area. |
| 20 | Vengeful Blade | physical, melee, close, burst, breaker | ~200% ripo, CD12 | #200; ladder-fill Lv20 | Use Vengeful Blade to deal direct damage to its target or the listed area. |
| 25 | Perfect Guard | physical, instant, self, defense, breaker | block + ~180% ripo, CD16 | #201; ladder-fill Lv25 | Use Perfect Guard to protect yourself or an ally with its listed defensive effect. |
| 30 | Retribution | physical, nova, close, burst, breaker | ~200% AoE ripo, CD20 | #202; ladder-fill Lv30 | Use Retribution to deal direct damage to its target or the listed area. |

## 4. Control

### Freeze

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Chill Touch | frost, instant, short, control, freeze | ~60% + chill 2s, CD6, 10MP | #203; ladder-fill Lv1 | Use Chill Touch to hinder nearby enemies with its listed control effect. |
| 4 | Freeze | frost, instant, short, control, freeze | ~70% + frz, CD12 | R#31; 3v; Lv4-34; WoW: Hunter:FreezingTrap, Sh:FrostShock/Earthbind | Use Freeze to hinder nearby enemies with its listed control effect. |
| 5 | Ice Wall | frost, ground, short, control, defense | wall 5 cells, CD15 | R#9; 5v; Lv5-49; WoW: Sh:Stoneclaw/Earthbind | Use Ice Wall to protect yourself or an ally with its listed defensive effect. |
| 5 | Slow Field | frost, ground, short, control | slow 50% 6s, CD12 | R#41; 6v; Lv5-16; WoW: Sh:Earthbind, Hunter:Concussive/WingClip, Wa:Hamstring | Use Slow Field to hinder nearby enemies with its listed control effect. |
| 10 | Frost Shackles | frost, instant, short, control, freeze | ~90% + frz 2s, CD12, 18MP | #204; ladder-fill Lv10 | Use Frost Shackles to hinder nearby enemies with its listed control effect. |
| 15 | Glacial Wall | frost, ground, short, control, defense | wall 8 cells, CD16, 22MP | #205; ladder-fill Lv15 | Use Glacial Wall to protect yourself or an ally with its listed defensive effect. |
| 20 | Deep Freeze | frost, instant, short, control, freeze | ~150% + frz 3s, CD15, 26MP | #206; ladder-fill Lv20 | Use Deep Freeze to hinder nearby enemies with its listed control effect. |
| 25 | Winter Prison | frost, ground, short, control, freeze | ~120% + frz zone 4s, CD20, 30MP | #207; ladder-fill Lv25 | Use Winter Prison to hinder nearby enemies with its listed control effect. |
| 30 | Absolute Prison | frost, ground, long, control, freeze | ~150% + frz zone 5s, CD25, 36MP | #208; ladder-fill Lv30 | Use Absolute Prison to hinder nearby enemies with its listed control effect. |

### Shock

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Taunt | physical, shout, short, control | taunt + threat, CD10 | R#42; 10v; Lv1-36; WoW: Wa:Taunt/Mocking, Dr:Growl, Lk:Torment, Hunter:Distract | Use Taunt to hinder nearby enemies with its listed control effect. |
| 1 | Warcry | physical, shout, short, control | ~60% shout, CD12 | R#34; 7v; Lv1-38; WoW: Wa:Battle/DemoralShout, Dr:DemoralRoar, Lk:HowlTerror | Use Warcry to hinder nearby enemies with its listed control effect. |
| 4 | Stun | storm, instant, short, control, shock | ~70% + stun, CD12 | R#32; 7v; Lv4-35; WoW: Wa:Charge/Intercept/Bash, Ro:CheapShot/Kidney, Pa:HoJ | Use Stun to hinder nearby enemies with its listed control effect. |
| 5 | Shockwave Shout | storm, shout, short, control, shock | ~80% + stun 1s, CD12, 14MP | #209; ladder-fill Lv5 | Use Shockwave Shout to hinder nearby enemies with its listed control effect. |
| 10 | Threat | physical, shout, short, defense | threat xN, CD0-10 | #89; WoW: Wa:Sunder/Taunt; Dr:Growl; Pa:Salvation/RighteousFury | Use Threat to protect yourself or an ally with its listed defensive effect. |
| 15 | Thunder Roar | storm, shout, short, control, shock | ~100% + stun 2s, CD14, 20MP | #210; ladder-fill Lv15 | Use Thunder Roar to hinder nearby enemies with its listed control effect. |
| 20 | Concussive Slam | storm, instant, short, control, shock | ~150% + stun 2s, CD14, 24MP | #211; ladder-fill Lv20 | Use Concussive Slam to hinder nearby enemies with its listed control effect. |
| 25 | Storm Shout | storm, shout, short, control, shock | ~130% AoE + stun, CD18, 28MP | #212; ladder-fill Lv25 | Use Storm Shout to hinder nearby enemies with its listed control effect. |
| 30 | Cataclysm Roar | storm, shout, long, control, shock | ~150% AoE + stun 3s, CD25, 34MP | #213; ladder-fill Lv30 | Use Cataclysm Roar to hinder nearby enemies with its listed control effect. |

### Mind

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Daze | shadow, instant, short, control | ~50% + daze 2s, CD6, 10MP | #214; ladder-fill Lv1 | Use Daze to hinder nearby enemies with its listed control effect. |
| 5 | Hex Whisper | shadow, instant, short, control | ~60% + blind 2s, CD8, 14MP | #215; ladder-fill Lv5 | Use Hex Whisper to hinder nearby enemies with its listed control effect. |
| 10 | Confuse Ray | arcane, projectile, short, control | ~90% + charm 2s, CD10, 18MP | #216; ladder-fill Lv10 | Use Confuse Ray to hinder nearby enemies with its listed control effect. |
| 14 | Blind | shadow, instant, short, control | blind/curse, CD12 | R#45; 6v; Lv14-49; WoW: Ro:Blind/Gouge, Lk:Curses, Dr:FaerieFire, Hunter:Scorpid | Use Blind to hinder nearby enemies with its listed control effect. |
| 15 | Horrify | shadow, shout, short, control, fear | ~80% + fear 2s, CD14, 20MP | #217; ladder-fill Lv15 | Use Horrify to hinder nearby enemies with its listed control effect. |
| 16 | Petrify | arcane, instant, short, control, root | ~60% + petrify, CD15 | R#33; 3v; Lv unknown; WoW: Pr:Shackle, Lk:Banish, Dr:Hibernate, Ro:Sap | Use Petrify to hinder nearby enemies with its listed control effect. |
| 16 | Silence | arcane, instant, long, control | silence 4s, CD15 | R#37; 8v; Lv16-47; WoW: Mage:Counterspell, Ro:Kick, Wa:Pummel, Sh:EarthShock | Use Silence to hinder nearby enemies with its listed control effect. |
| 16 | Sleep | arcane, instant, short, control, charm | sleep 6s, CD15 | R#36; 9v; Lv16-40; WoW: Mage:Polymorph, Ro:Sap, Dr:Hibernate, Hunter:ScareBeast | Use Sleep to hinder nearby enemies with its listed control effect. |
| 16 | Time Stop | arcane, instant, short, control | lock 3s, CD30 | R#46; 3v; Lv16-45; WoW: none in Classic (stun-locks see Stun) | Use Time Stop to hinder nearby enemies with its listed control effect. |
| 20 | Psychic Shackle | arcane, instant, long, control | ~100% + root 3s, CD15, 24MP | #218; ladder-fill Lv20 | Use Psychic Shackle to hinder nearby enemies with its listed control effect. |
| 25 | Mass Hysteria | shadow, shout, short, control, fear | ~100% AoE + fear 2s, CD20, 30MP | #219; ladder-fill Lv25 | Use Mass Hysteria to hinder nearby enemies with its listed control effect. |
| 30 | Dominate Mind | shadow, instant, short, control, charm | charm humanoid 20s chn, CD8 | #92; WoW: Pr:MindControl; Lk:Enslave/Seduction | Use Dominate Mind to hinder nearby enemies with its listed control effect. |
| 31 | Fear | shadow, shout, short, control, fear | ~60% + fear, CD15 | R#35; 5v; Lv31-47; WoW: Pr:PsychicScream, Lk:Fear/Howl/Coil, Wa:IntimidShout | Use Fear to hinder nearby enemies with its listed control effect. |

### Space

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Vacuum | arcane, ground, short, control, pull | ~60% + pull, CD14 | R#38; 8v; Lv1-40; WoW: none in Classic (no pull equiv) | Use Vacuum to hinder nearby enemies with its listed control effect. |
| 3 | Snare | nature, ground, short, control, root | ~40% + root 4s, CD12 | R#40; 8v; Lv3-33; Day-0; P0 L3; WoW: Dr:Roots, Hunter:WingClip/Traps, Sh:Earthbind | Use Snare to hinder nearby enemies with its listed control effect. |
| 5 | Grasping Roots | nature, ground, short, control, root | ~60% + root 4s, CD12, 14MP | #220; ladder-fill Lv5 | Use Grasping Roots to hinder nearby enemies with its listed control effect. |
| 10 | Repel Wave | physical, instant, short, control, knockback | ~100% + kb, CD10, 16MP | #221; ladder-fill Lv10 | Use Repel Wave to hinder nearby enemies with its listed control effect. |
| 15 | Gravity Well | arcane, ground, short, control, pull | ~80% + pull, CD14, 20MP | #222; ladder-fill Lv15 | Use Gravity Well to hinder nearby enemies with its listed control effect. |
| 16 | Knockback | physical, instant, short, control, knockback | ~80% + kb, CD8 | R#39; 6v; Lv16-35; WoW: Hunter:Disengage | Use Knockback to hinder nearby enemies with its listed control effect. |
| 20 | Thunderous Push | physical, instant, short, control, knockback | ~150% + kb, CD12, 24MP | #223; ladder-fill Lv20 | Use Thunderous Push to hinder nearby enemies with its listed control effect. |
| 25 | Singularity Pull | arcane, ground, short, control, pull | ~120% + pull, CD18, 28MP | #224; ladder-fill Lv25 | Use Singularity Pull to hinder nearby enemies with its listed control effect. |
| 30 | Cataclysm Shift | arcane, ground, long, control, pull | ~150% + pull + kb, CD25, 34MP | #225; ladder-fill Lv30 | Use Cataclysm Shift to hinder nearby enemies with its listed control effect. |

### Meta

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Minor Dispel | arcane, instant, short, control, breaker | dispel 1 buff, CD10, 10MP | #226; ladder-fill Lv1 | Use Minor Dispel to hinder nearby enemies with its listed control effect. |
| 5 | Disrupt | arcane, instant, short, control, breaker | ~60% + strip 1, CD12, 14MP | #227; ladder-fill Lv5 | Use Disrupt to hinder nearby enemies with its listed control effect. |
| 10 | Purge | arcane, instant, short, control, breaker | dispel 2/strip, CD14, 18MP | #228; ladder-fill Lv10 | Use Purge to hinder nearby enemies with its listed control effect. |
| 11 | Dispel | arcane, instant, short, control, breaker | dispel/strip, CD15 | R#43; 9v; Lv11-38; WoW: Pr:Dispel, Pa:Purify, Sh:Purge, Lk:Devour, Hunter:Tranquil | Use Dispel to hinder nearby enemies with its listed control effect. |
| 13 | Link | arcane, instant, long, control | share dmg link, CD20 | R#44; 7v; Lv13-33; WoW: Pa:BlessSacrifice, Lk:HealthFunnel | Use Link to hinder nearby enemies with its listed control effect. |
| 15 | Spell Sever | arcane, instant, long, control, breaker | ~80% + silence 2s, CD15, 20MP | #229; ladder-fill Lv15 | Use Spell Sever to hinder nearby enemies with its listed control effect. |
| 20 | Soul Link | arcane, instant, long, control | share dmg + heal, CD20, 24MP | #230; ladder-fill Lv20 | Use Soul Link to hinder nearby enemies with its listed control effect. |
| 25 | Null Field | arcane, ground, short, control, breaker | dispel zone 4s, CD22, 30MP | #231; ladder-fill Lv25 | Use Null Field to hinder nearby enemies with its listed control effect. |
| 30 | Unmake Magic | arcane, instant, long, control, breaker | ~150% + mass dispel, CD25, 34MP | #232; ladder-fill Lv30 | Use Unmake Magic to hinder nearby enemies with its listed control effect. |

## 5. Utilities

### Buffs

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | ATK Aura | physical, aura, self, support | +10% atk aura, CD20 | R#52; 10v; Lv1-31; P0 L4; WoW: Wa:BattleShout, Pa:Might, Sh:StrengthEarth/Windfury | Place ATK Aura across an area; enemies or allies inside receive its listed effect. |
| 1 | Haste | arcane, aura, self, support | +haste aura, CD20 | R#54; 8v; Lv1-36; WoW: Ro:SliceDice, Hunter:RapidFire, Sh:Windfury | Place Haste across an area; enemies or allies inside receive its listed effect. |
| 3 | Battery | arcane, instant, short, support | +SP regen, CD20 | R#57; 3v; Lv3-16; WoW: Dr:Innervate, Sh:ManaSpring, Mage:Evocation | Use Battery to apply the listed effect to its target. |
| 4 | Hunter Aspect | physical, aura, self, mobility | 1 aspect, CD0 | #87; WoW: Hunter:Monkey/Hawk/Cheetah/Beast/Pack/Wild | Use Hunter Aspect to reposition quickly and gain its listed movement effect. |
| 5 | Thorns | physical, aura, self, defense | reflect 30%, CD15 | R#55; 3v; Lv5-31; WoW: Dr:Thorns, Pa:RetributionAura, Sh:LightningShield | Use Thorns to protect yourself or an ally with its listed defensive effect. |
| 10 | War Banner | physical, aura, self, support | +15% atk aura 12s, CD20, 18MP | #233; ladder-fill Lv10 | Place War Banner across an area; enemies or allies inside receive its listed effect. |
| 13 | Imbue | arcane, instant, self, support | imbue element, CD15 | R#58; 4v; Lv13-18; WoW: Sh:Rockbiter/Flametongue/Frostbrand/Windfury, Ro:Poisons | Use Imbue to apply the listed effect to its target. |
| 15 | Swift Chant | arcane, aura, self, support | +haste +move 12s, CD20, 20MP | #234; ladder-fill Lv15 | Place Swift Chant across an area; enemies or allies inside receive its listed effect. |
| 20 | Elemental Weapon | arcane, instant, self, support | imbue + factor 15%, CD18, 24MP | #235; ladder-fill Lv20 | Use Elemental Weapon to apply the listed effect to its target. |
| 25 | Overdrive Hymn | arcane, aura, self, support | +20% atk +haste 10s, CD30, 30MP | #236; ladder-fill Lv25 | Place Overdrive Hymn across an area; enemies or allies inside receive its listed effect. |
| 30 | Godlike Aura | holy, aura, self, support | +25% all stats 12s, CD40, 36MP | #237; ladder-fill Lv30 | Place Godlike Aura across an area; enemies or allies inside receive its listed effect. |

### Move

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Blink | arcane, instant, self, mobility | blink 9, CD15 | R#71; 5v; Lv1-16; WoW: Mage:Blink | Use Blink to reposition quickly and gain its listed movement effect. |
| 1 | Dash | physical, instant, self, mobility | dash 6, CD8 | R#72; 6v; Lv1-40; Day-0; P0 L1; WoW: Ro:Sprint, Wa:Charge/Intercept, Dr:Dash | Use Dash to reposition quickly and gain its listed movement effect. |
| 1 | Combat Stance | physical, instant, self, defense, stance | stance swap 1s lock, CD3 | #81; WoW: Wa:Battle/Defensive/Berserker | Use Combat Stance to protect yourself or an ally with its listed defensive effect. |
| 5 | Sprint Burst | physical, instant, self, mobility | +60% move 4s, CD12, 10MP | #238; ladder-fill Lv5 | Use Sprint Burst to reposition quickly and gain its listed movement effect. |
| 10 | Feral Forms | nature, instant, self, defense, stance | form swap role change, CD3, mana | #82; WoW: Dr:Bear/Cat/Travel/Aquatic/Dire | Use Feral Forms to protect yourself or an ally with its listed defensive effect. |
| 15 | Mount | physical, instant, self, mobility, stance | mount stance, CD10 | R#69; 15v; Lv15-49; WoW: Pa:Warhorse/Charger, Lk:Felsteed/Dreadsteed, Dr:Travel | Use Mount to reposition quickly and gain its listed movement effect. |
| 20 | Spirit Wolf | nature, instant, self, mobility, stance | +40% move, CD0 | #83; WoW: Sh:GhostWolf | Use Spirit Wolf to reposition quickly and gain its listed movement effect. |
| 25 | Shadowstep | shadow, instant, self, mobility | teleport behind 9, CD18, 24MP | #239; ladder-fill Lv25 | Use Shadowstep to reposition quickly and gain its listed movement effect. |
| 30 | Wind Rider | storm, instant, self, mobility | fly 12 + immune slow 6s, CD25, 30MP | #240; ladder-fill Lv30 | Use Wind Rider to reposition quickly and gain its listed movement effect. |

### Sight

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Reveal | arcane, instant, short, support | reveal 9, CD12 | R#74; 8v; Lv1-39; WoW: Mage:DetectMagic, Hunter:Flare, Pr:MindVision, Lk:EyeKilrogg | Use Reveal to apply the listed effect to its target. |
| 1 | Stealth | shadow, instant, self, mobility | hide 10s, CD20 | R#73; 11v; Lv1-33; WoW: Ro:Stealth/Vanish, Dr:Prowl, Hunter:FeignDeath | Use Stealth to reposition quickly and gain its listed movement effect. |
| 4 | Scout | arcane, instant, long, support | vision ward, CD15 | R#80; 4v; Lv4-16; WoW: Hunter:Tracks/EagleEye/BeastLore, Sh:FarSight, Lk:EyeKilrogg | Use Scout to apply the listed effect to its target. |
| 5 | Keen Senses | arcane, instant, self, support | reveal + range 6s, CD12, 10MP | #241; ladder-fill Lv5 | Use Keen Senses to apply the listed effect to its target. |
| 10 | Vanish | shadow, instant, self, mobility | hide 6s + cleanse, CD20, 16MP | #242; ladder-fill Lv10 | Use Vanish to reposition quickly and gain its listed movement effect. |
| 15 | Far Sight | arcane, instant, long, support | vision 15 10s, CD18, 20MP | #243; ladder-fill Lv15 | Use Far Sight to apply the listed effect to its target. |
| 20 | Shadowmeld | shadow, instant, self, mobility | hide 10s + heal, CD25, 24MP | #244; ladder-fill Lv20 | Use Shadowmeld to reposition quickly and gain its listed movement effect. |
| 25 | True Sight | arcane, aura, self, support | reveal aura 10s, CD25, 28MP | #245; ladder-fill Lv25 | Place True Sight across an area; enemies or allies inside receive its listed effect. |
| 30 | Omniscience | arcane, instant, long, support | reveal map 12s, CD40, 34MP | #246; ladder-fill Lv30 | Use Omniscience to apply the listed effect to its target. |

### Econ (portals see #78)

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Barter | physical, instant, self, support | camp trade fee-, CD0 | #247; ladder-fill Lv1 | Use Barter to apply the listed effect to its target. |
| 3 | Market | physical, instant, self, support | camp econ, fee | R#75; 19v; Lv3-31; WoW: Ro:PickPocket/PickLock, Mage:ConjureFood/Water | Use Market to apply the listed effect to its target. |
| 5 | Appraise | arcane, instant, self, support | +loot 10% 5m, CD20, 10MP | #248; ladder-fill Lv5 | Use Appraise to apply the listed effect to its target. |
| 10 | Caravan | physical, instant, self, support | camp shop + slots, CD0 | #249; ladder-fill Lv10 | Use Caravan to apply the listed effect to its target. |
| 15 | Smuggle | shadow, instant, self, mobility | fee- + hide 10s, CD20, 18MP | #250; ladder-fill Lv15 | Use Smuggle to reposition quickly and gain its listed movement effect. |
| 16 | Portal | arcane, instant, long, support | portal party, CD30 | R#78; 3v; Lv16-30; WoW: Mage:Teleport/Portal, Lk:RitualSummoning, Sh:AstralRecall | Use Portal to apply the listed effect to its target. |
| 20 | Waygate | arcane, instant, long, support | portal + buff 10s, CD30, 26MP | #251; ladder-fill Lv20 | Use Waygate to apply the listed effect to its target. |
| 25 | Trade Empire | physical, aura, self, support | econ aura fee--, CD0 | #252; ladder-fill Lv25 | Place Trade Empire across an area; enemies or allies inside receive its listed effect. |
| 30 | Mass Exodus | arcane, instant, long, support | portal raid 10, CD60, 40MP | #253; ladder-fill Lv30 | Use Mass Exodus to apply the listed effect to its target. |

### Survival

| Lv | Unified Skill | Tags | Calc | Sources/Notes | Description |
|---|---|---|---|---|---|
| 1 | Sustain | physical, instant, self, sustain | regen/potion+, CD15 | R#76; 3v; Lv1-19; WoW: Mage:Conjure/Evocation, Lk:Healthstone/LifeTap, Dr:FrenziedRegen | Use Sustain to deal damage and maintain your momentum with its listed sustain effect. |
| 4 | Endure | physical, instant, self, defense | no-flinch 10s, CD20 | R#79; 4v; Lv4-25; WoW: Wa:ShieldWall/ShieldBlock/BerserkerRage, Ro:Evasion, Sh:Grounding | Use Endure to protect yourself or an ally with its listed defensive effect. |
| 5 | Second Wind | physical, instant, self, sustain | heal 30% + cleanse, CD20, 12MP | #254; ladder-fill Lv5 | Use Second Wind to deal damage and maintain your momentum with its listed sustain effect. |
| 10 | Iron Skin | physical, instant, self, defense | -dmg 40% 8s, CD20, 16MP | #255; ladder-fill Lv10 | Use Iron Skin to protect yourself or an ally with its listed defensive effect. |
| 15 | Field Rations | physical, instant, self, sustain | regen + potion++ 10s, CD20, 18MP | #256; ladder-fill Lv15 | Use Field Rations to deal damage and maintain your momentum with its listed sustain effect. |
| 20 | Last Stand | physical, instant, self, defense | survive lethal + heal 50%, CD60, 24MP | #257; ladder-fill Lv20 | Use Last Stand to protect yourself or an ally with its listed defensive effect. |
| 25 | Unbreakable | physical, aura, self, defense | -dmg 30% aura 10s, CD30, 28MP | #258; ladder-fill Lv25 | Use Unbreakable to protect yourself or an ally with its listed defensive effect. |
| 30 | Immortal Feast | physical, instant, self, sustain | full heal + immune 4s, CD60, 36MP | #259; ladder-fill Lv30 | Use Immortal Feast to deal damage and maintain your momentum with its listed sustain effect. |

## 6. Coverage

- Before: 639 catalog rows (RO 298 + ToS 341 primaries, documented).
- Base: 92 unified families (80 comparison #1-80 + 12 WoW-system #81-92).
- Ladder-fill: +167 new families (#93-#259) so every sub-type has a
  skill at Lv 1 / 5 / 10 / 15 / 20 / 25 / 30.
- After: 259 unified families total.
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
