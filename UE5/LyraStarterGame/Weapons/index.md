---
title: "LyraStarterGame Weapon System"
description: "Overview of the Weapon system in UE5 LyraStarterGame"
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: "Weapon System"
---


# LyraStarterGame Weapon System

This is an overview of the Weapon System in [LyraStarterGame](/UE5/LyraStarterGame/).

A Lyra weapon is a specialized piece of equipment based on the
[Lyra Equipment System](/UE5/LyraStarterGame/Equipment/),
which itself is based on the
[Lyra Inventory System](/UE5/LyraStarterGame/Inventory/).
Make sure you are familiar with those concepts as well.


## Weapon Concepts

- [Weapon Instance](#WeaponInstance)
  - Derived from [Equipment Instance](/UE5/LyraStarterGame/Equipment/#EquipmentInstance)
  - Adds Equipped/Unequipped Anim Sets
- [Ranged Weapon Instance](#RangedWeaponInstance)
  - Derived from [Weapon Instance](#WeaponInstance)
  - Adds logic RE shooting a projectile at range, ammunition capacity and use, etc
- [Weapon State Component](#WeaponStateComponent) (Controller Component)
  - Manages equipped weapon ticking and player feedback (hit result visualization)
- [Weapon Debug Settings](#WeaponDebugSettings)
  - Developer debug helper
- [Weapon Spawner](#WeaponSpawner) (Actor)
  - Spawn Weapons at dedicated spawning pads in the world

## Related Gameplay Abilities

- [Melee Attack Ability](#MeleeAttackAbility)
  - Used for all melee attacks regardless of the weapon type
- [Ranged Weapon Base Ability](#RangedWeaponBaseAbility)
  - Base ability for all ranged weapons


<a id="WeaponInstance"></a>
## Weapon Instance

A Weapon Instance (`ULyraWeaponInstance`) is an
[Equipment Instance](/UE5/LyraStarterGame/Equipment/#EquipmentInstance)
that also has equipped and unequipped animation sets associated with it.

It also keeps track of how long it has been since the player last interacted with it.

Most of the implementation is in the BP `B_WeaponInstance_Base`, from which all other Lyra
Weapon Instances are derived:

- `B_WeaponInstance_Pistol`
- `B_WeaponInstance_Rifle`
- `B_WeaponInstance_Shotgun`
- `B_WeaponInstance_NetShooter` (prototype)

The Weapon Instance has a `Tick()` method, which is executed every tick **if/when** the weapon
is equipped by the Pawn.  This ticking is managed by the
Pawn Controller's [Weapon State Component](#WeaponStateComponent).


<a id="RangedWeaponInstance"></a>
## Ranged Weapon Instance

A Ranged Weapon Instance is derived from Weapon Instance and implements `ILyraAbilitySourceInterface`.

It adds the concept of bullets, shot accuracy and spread, etc.


<a id="WeaponStateComponent"></a>
## Weapon State Component

`ULyraWeaponStateComponent` goes on the Pawn Controller.

This component:

- Is responsible for making the Pawn's currently equipped weapon `Tick()`
- During Targeting:
  - Keeps track of weapon "hit markers" for the local player
    - e.g. so you can see bullets actually hit their targets (if they do hit something)
- When server processes TargetData:
  - Remembers the "hit markers" that actually resulted in valid hits
    - Makes these available to `SHitMarkerConfirmationWidget` to draw the hit markers on the player's screen


<a id="WeaponDebugSettings"></a>
## Weapon Debug Settings




<a id="WeaponSpawner"></a>
## Weapon Spawner

This is a pad with a fixed position that spawns weapons based on the Weapon Definition
you configure it for.  You can set Cooldown time, the mesh of the weapon to show
that will be picked up, etc.

This C++ class is implemented such that the core functionality of actually giving
the weapon to the pawn **MUST** be implemented in Blueprints.  There are 2 BP
implementations:

- `B_WeaponSpawner`
  - ShooterCore pads that give weapons and health pickups
- `B_AbilitySpawner`
  - ShooterCore proximity HOT/DOT pads
  - Based on `B_WeaponSpawner` but doesn't actually grant weapons


<a id="MeleeAttackAbility"></a>
## Melee Attack Ability

`GA_Melee` is the Melee Attack Ability, derived from `GA_AbilityWithWidget`, which itself is
based on `ULyraGameplayAbility`.

It is implemented such that it can be executed regardless
of the type of weapon equipped, provided that weapon derives from `B_WeaponInstance_Base`
*(BP constraint)*.

Note that this ability is **not derived** from
the base Equipment Ability (`ULyraGameplayAbility_FromEquipment`).  While this makes sense
in that equipment isn't necessarily required to melee (Pawns have fists, feet, heads, etc),
it also means that in the current implementation there is no way to make a Katana melee
for more than a fist.  This seems like a significant implementation flaw.  You should absolutely
change this if you want interesting melee gameplay.

On Melee Attack:

- Play Melee Attack Animation Montage *(configurable per weapon)*
- If Authority:
  - If all of these conditions are true:
    - If a Pawn in front of the Attacker was hit *(limited by BP to 1 hit maximum)*
    - If the hit Pawn is on a different team than the Attacker *(BP constraint)*
    - If the hit Pawn is not behind a wall or other obstacle
  - Then:
    - Apply additive Root Motion Force in the Attacker's forward direction based on `Strength` parameter of Melee attack *(constant regardless of weapon)*
    - Add Gameplay Effect to hit Pawn: `GE_Damage_Melee` *(constant regardless of weapon)*
    - Execute GameplayCue on Attacker: `GameplayCue.Weapon.Melee.Hit`
    - Play Melee Impact sound at world impact location


<a id="RangedWeaponBaseAbility"></a>
## Ranged Weapon Base Ability

`ULyraGameplayAbility_RangedWeapon` derives from the Equipment System's
[Equipment Ability](/UE5/LyraStarterGame/Equipment/#EquipmentAbility)
(`ULyraGameplayAbility_FromEquipment`), giving it easy access to the specific weapon that
is responsible for granting the ability to the player, which will be equipped at the time
of ability activation.

This is the base class for all Lyra Ranged Weapons, and is implemented by:

- `GA_Weapon_Fire`
  - `GA_Weapon_Fire_Pistol`
  - `GA_Weapon_Fire_Rifle_Auto`
  - `GA_Weapon_Fire_Shotgun`
  - `GA_WeaponNetShooter` (prototype)

As seems to be the standard for Lyra Gameplay Abilities, very little is done in C++ and
most of the implementation is in the BP, in this case `GA_Weapon_Fire` which is the base
BP for ranged weapons.

If you're interested in how weapons work in Lyra, definitely study the event graph of
`GA_Weapon_Fire` to see how it works.

On Ability Activation (on firing the weapon):

- If locally controlled pawn:
  - Generate TargetData based on where the weapon is aiming
    - See `ULyraGameplayAbility_RangedWeapon`::`PerformLocalTargeting`
  - If remote client:
    - Send TargetData RPC to server
- Play weapon firing animation
- Send Gameplay Cue to weapon owner: `GameplayCue.Weapon.Rifle.Fire`
- Send Gameplay Cue to each target hit: `GameplayCue.Weapon.Rifle.Impact`
- If Authority:
  - Spawn physics field actor at each target hit *(if the weapon has physics field impact configured)*
  - Add Gameplay Effect to each target hit
    - The effect varies by weapon, for example: `GE_Damage_Pistol`

Additionally, ranged weapons will listen for "failed to fire weapon" Gameplay Events
(`Ability.PlayMontageOnActivateFail.Message`)
and play an animation montage to help the player visualize the failed ability activation.
That Gameplay Message is broadcast by the base `ULyraGameplayAbility`::`NativeOnAbilityFailedToActivate`.
