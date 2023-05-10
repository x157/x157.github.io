---
title: "Lyra Character Parts Pawn Component"
description: "Details of the Lyra Character Parts Pawn-specific Component"
breadcrumb_path: "UE5/LyraStarterGame/CharacterParts"
breadcrumb_name: "Pawn Component"
---

# Lyra Character Parts Pawn Component

C++ Class: `ULyraPawnComponent_CharacterParts`
( Lyra 5.2
 [header](https://github.com/EpicGames/UnrealEngine/blob/5.2/Samples/Games/Lyra/Source/LyraGame/Cosmetics/LyraPawnComponent_CharacterParts.h)
|
 [cpp](https://github.com/EpicGames/UnrealEngine/blob/5.2/Samples/Games/Lyra/Source/LyraGame/Cosmetics/LyraPawnComponent_CharacterParts.cpp)
)

This is one part of the [Lyra Character Parts](/UE5/LyraStarterGame/CharacterParts/) system,
see that page for an overview.

This component is used by the [Controller Component](./ControllerComponent)
and is generally referred to as the "Pawn Customizer".
For our purposes, I'm going to refer to this as the Pawn Customizer Component.

**There must be only one Pawn Customizer Component on any given Pawn.**


## How Lyra Sets This Up

- The `B_MannequinPawnCosmetics` Blueprint is based on the `ULyraPawnComponent_CharacterParts` C++ class
    - `B_Hero_ShooterMannequin` adds a `B_MannequinPawnCosmetics` component named `PawnCosmeticsComponent`

Thus, every Lyra character based on `B_Hero_ShooterMannequin` has a Pawn Customizer Component.


## Quick Look: `B_MannequinPawnCosmetics`

Here you can see the interesting (non-default) part of `B_MannequinPawnCosmetics`,
where the two default Lyra body types are defined:

[![B_MannequinPawnCosmetics](./screenshots/B_MannequinPawnCosmetics.png)](./screenshots/B_MannequinPawnCosmetics.png)


## You can make your own component

You can make your own Pawn Customizer Component that defines the settings you want to use.
You don't necessarily have to use the Lyra defaults.

Just make sure that you add your own Pawn Component to your Character,
replacing the Lyra default `B_MannequinPawnCosmetics`.


### Make sure you Integrate with your Character

If you do make your own component, make sure you integrate it with your Character.

For example, see this Blueprint snippet, where the default `B_Hero_ShooterMannequin` blueprint
hooks into the default `B_MannequinPawnCosmetics` event `OnCharacterPartsChanged`.

You will want to hook into your own custom component rather than the default Lyra component
if you replace the Lyra default with a custom version.

#### `B_Hero_ShooterMannequin` hook into `On Character Parts Changed`

[![OnCharacterPartsChanged](./screenshots/B_Hero_ShooterMannequin__OnCharacterPartsChanged.png)](./screenshots/B_Hero_ShooterMannequin__OnCharacterPartsChanged.png)

