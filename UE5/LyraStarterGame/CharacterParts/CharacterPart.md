---
title: "Lyra Character Part"
description: "Answers the question: What is a Lyra Character Part?"
breadcrumb_path: "UE5/LyraStarterGame/CharacterParts"
breadcrumb_name: "Character Part"
---

# Lyra Character Part

C++ Struct: `FLyraCharacterPart`
( Lyra 5.2
[LyraCharacterPartTypes.h](https://github.com/EpicGames/UnrealEngine/blob/5.2/Samples/Games/Lyra/Source/LyraGame/Cosmetics/LyraCharacterPartTypes.h)
)

This is one part of the [Lyra Character Parts](/UE5/LyraStarterGame/CharacterParts/) system,
see that page for an overview.


## Conceptual Overview

A "Character Part" is an actor that is attached to a Pawn, which represents a cosmetic part of the
Character's body.

The actual character body is invisible, and the cosmetic parts are what you see.

The character must have one or more parts to be visible.  In vanilla Lyra, there are only
2 parts defined: `B_Manny` for the masculine mannequin
or `B_Quinn` for the feminine mannequin.

You may also opt to use modular characters, where a character is comprised of many
different parts.

Lyra [drives animation](#Animation) based on the Gameplay Tags defined by all of
the Character Parts, for example to choose between masculine and feminine animation styles.


### Properties of a Lyra Character Part

- Actor Class Type
- Socket Name to attach to *(optional)*
- Collision Mode *(optional)*

The Actor Class can optionally implement the `IGameplayTagAssetInterface` interface,
which allows it to communicate Gameplay Tags to the game.

Lyra uses the `ALyraTaggedActor` C++ class as the base for its cosmetic parts
to set `Masculine` or `Feminine` animation style tags,
and a `Medium` body style, for example.  You can inherit from `ALyraTaggedActor`,
or implement `IGameplayTagAssetInterface`, or neither, as you prefer for your game.

Character Parts are considered to be equivalent if they are the same class type and attach
to the same socket.
Any difference in the collision setting is ignored for equivalence testing purposes.


## Vanilla Lyra Character Parts

By default, Lyra defines only two Character Parts, representing either a male (Manny)
or female (Quinn) body.


### Character Part: `B_Manny`

The `B_Manny` blueprint defines the Manny body, the masculine mannequin.

| Property      | Value                                                            |
|---------------|------------------------------------------------------------------|
| Base Class    | `ALyraTaggedActor`                                               |
| Gameplay Tags | `Cosmetic.AnimationStyle.Masculine`, `Cosmetic.BodyStyle.Medium` |
| Skeletal Mesh | `SKM_Manny`                                                      |


### Character Part: `B_Quinn`

The `B_Quinn` blueprint defines the Quinn body, the feminine mannequin.

| Property      | Value                                                           |
|---------------|-----------------------------------------------------------------|
| Base Class    | `ALyraTaggedActor`                                              |
| Gameplay Tags | `Cosmetic.AnimationStyle.Feminine`, `Cosmetic.BodyStyle.Medium` |
| Skeletal Mesh | `SKM_Quinn`                                                     |


<a id='Animation'></a>
## Driving Animation via Gameplay Tags

Lyra uses the `Cosmetic.AnimationStyle.*` Gameplay Tags to drive its animation,
so that it can animate Manny with "masculine" animations
and Quinn with "feminine" animations.

How exactly these animations work is beyond the scope of this documentation,
however in general if you are interested in this, here are some things for you
to search for.

In your C++ IDE:

- `FLyraAnimBodyStyleSelectionSet`
  - In particular, this method: `SelectBestLayer`
    - This is used by the `B_WeaponInstance_Base` Blueprint to select the animation set when ranged weapons are equipped or unequipped
- `ULyraWeaponInstance`
  - In particular, this method: `PickBestAnimLayer`

In Unreal Editor:

- `B_WeaponInstance_Base`
  - This is the base class for all ranged [Lyra Weapons](/UE5/LyraStarterGame/Weapons/)
  - When the weapon is equipped or unequipped, it changes the animation style accordingly, based on the collective Gameplay Tags defined by all the Character Parts
- Search Gameplay Tag Asset References: `Cosmetic.AnimationStyle.Feminine`
  - This will show you **all** of the Lyra Blueprints that reference this tag, including: `B_MannequinPawnCosmetics`, `B_Quinn`, `B_WeaponInstance_Base`, etc.


### Example Pistol Animation Rules

As an example, when a Lyra Character equips or unequips a Pistol, the `B_WeaponInstance_Pistol` blueprint
defines the animation rules.

[![B_WeaponInstance_Pistol Animation Rules](./screenshots/PistolAnimationRules.png)](./screenshots/PistolAnimationRules.png)

Above you can see that if any of the Character Parts defines the `Cosmetic.AnimationStyle.Feminine`
Gameplay Tag, the Character will use the `ABP_PistolAnimLayers_Feminine` animation blueprint
when the pistol is equipped.
Otherwise, the default `ABP_PistolAnimLayers` blueprint is used (the masculine version).

When the pistol is unequipped, then again if any of the Character Parts defines the `Cosmetic.AnimationStyle.Feminine`
Gameplay Tag, the feminine unarmed animation will be used (`ABP_UnarmedAnimLayers_Feminine`),
and otherwise the default masculine `ABP_UnarmedAnimLayers` will be used.

*Note: this is not at all efficient; **every single weapon** is forced to define the same exact
unarmed animation set rules, but that is how Lyra works by default.*

[Lyra Weapons](/UE5/LyraStarterGame/Weapons/) are discussed in more detail.


### Conflicting Gameplay Tags are not handled by default

By default, Lyra does not handle conflicting Gameplay Tags well.

If you assign one part that defines `Masculine` animation and another part that defines `Feminine` animation,
Lyra will not notice, and it will just select one of them.

*It looks like it probably selects whichever animation set is defined first
in the `FLyraAnimBodyStyleSelectionSet`'s `LayerRules`, so in the above example,
the feminine animation set would always be used if both masculine and feminine tags are defined
by different Character Parts.*
