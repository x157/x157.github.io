---
title: How to Create a GameFeature Experience
description: Create a new GameFeature Experience including all of its prerequisite data assets
back_links:
  - link: /UE5/
    name: UE5
  - link: /UE5/LyraStarterGame/
    name: LyraStarterGame
---


# Create Your Dev Experience

The first time you create an experience is the hardest.  It's much easier for additional ones as you can reuse a lot of the work you do here.

For this reason we'll start with the "Dev" experience, e.g. one you don't actually care about except to test that things are working.

**Note: Default objects need to be based on Lyra code rather than on vanilla engine code.**

The order in which you create these matters; some reference others.


## Player Pawn

In mod `Game` directory, make a base player pawn for your mod.

You'll likely want to derive your base pawn from Lyra's `B_Hero_Default`.

Make sure you also take an extensive look at `ShooterCore/Content/Game/B_Hero_ShooterMannequin` to see how Epic set up their player pawn.  There are things in there you likely don't need, but there are also things you'll most certainly want to copy/extend.

In my game, `B_XGCyborg` is the player's pawn.  It extends from `B_XGCharacterBase` which contains the pertinent parts of Epic's ShooterGame character.


### Example Player Pawn Inheritance

- `Lyra/Content/Characters/Heros/B_Hero_Default`
  - `XistGame/Content/Game/B_XGCharacterBase`
    - `XistGame/Content/Game/B_XGCyborg`


### Lyra Pawn Data

In mod `Game` directory create a `LyraPawnData` data asset with a `DA_` name prefix.

I named mine `DA_XGPlayerPawnData`

Configure this asset:

- Lyra
  - Pawn
    - Pawn Class: `B_XGCyborg` (mod custom)
  - Input
    - Input Config: `InputData_Hero` (default Lyra hero input)
  - Camera
    - Default Camera Mode: `CM_ThirdPerson` (default Lyra camera)


### Input Mapping Context

In mod `Input/Mappings` directory create a `InputMappingContext` data asset with a `IMC_` name prefix.

I named mine `IMC_XGKBM`

For now leave this blank.  Later you'll add mod-specific keyboard mappings here.


### Lyra Input Config

In mod `Input/Configs` directory create a `LyraInputConfig` data asset with a `InputData_` name prefix.

I named mine `InputData_XGAddOns`

For now leave this blank.  Later you'll add mod-specific input actions here.


### Lyra Experience Action Set

In mod `Experiences` directory create a `LyraExperienceActionSet` data asset with a `LAS_` name prefix.

I named mine `LAS_XGSharedInput`

Configure this asset:

- Actions
  - Index 0: `Add Input Mapping`
    - Input
      - Input Mappings
        - Index 0:
          - Input Mapping: `IMC_XGKBM` (mod custom keybinds)
          - Priority: 1
        - Index 1:
          - Input Mapping: `IMC_Default_KBM` (lyra default keybinds)
          - Priority: 0
  - Index 1: `Add Input Binds`
    - Input
      - Input Configs
        - Index 0: `InputData_XGAddOns` (mod custom)
- Feature Dependencies
  - Game Features to Enable
    - Index 0: `XistGame` (mod name)

In the setup above, we're using default Lyra MKB keybinds and overriding them with our mod custom keybinds.


### Gameplay Experience

In mod `Experiences` directory create a new `LyraExperienceDefinition` child blueprint with a `B_` name prefix.

I named mine `B_XGDevExperience`

Configure this asset:

- Gameplay
  - Game Features to Enable:
    - Index 0: `XistGame` (mod name)
  - Default Pawn Data: `DA_XGPlayerPawnData` (mod custom)
  - Action Sets: `LAS_XGSharedInput` (mod custom)


## Dev Map

In mod `Maps` directory create a new `World` map with a `L_` name prefix.

I named mine `L_DevMap`

Configure this asset (its `World Settings`):

- Game Mode
  - Default Gameplay Experience: `B_XGDevExperience` (mod custom)

You don't need much here right now.  A plane, a light and a `LyraPlayerStart` actor should do it.


# GameFeature Dev Experience Complete

You should now have an empty level that you can play in PIE.  It will spawn in your character and you should have basic movement keybindings available.


[Continue your Lyra journey](./)

