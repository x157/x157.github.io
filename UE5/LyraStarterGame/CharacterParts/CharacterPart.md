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
