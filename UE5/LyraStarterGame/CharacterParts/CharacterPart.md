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

A "Character Part" is an actor that is attached to a Pawn, which represents a part of the
Character's body.  A single part may also represent the entire body, as is the case
in Vanilla Lyra.


## Properties of a Lyra Character Part

- Actor Class Type
- Socket Name to attach to
- Collision Mode

Character Parts are considered to be equivalent if they are the same class type and attach
to the same socket.


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
