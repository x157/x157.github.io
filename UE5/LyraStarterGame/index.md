---
title: How to make a game with UE5 LyraStarterGame
description: Learn how to make a new game based on UE5's Lyra Starter Game (LyraStarterGame)
back_links:
  - link: /UE5/
    name: UE5
---


# Make Your UE5 Game from Lyra

Don't start from scratch!  Start from Lyra.

Epic suggests using this massive starter game framework for new dev projects, and seeing all of the things that they've already done for us, it's not hard to imagine why.

This thing is PACKED full of things that every game NEEDS but that isn't the least bit fun for devs, especially hobbyists like myself, to implement.

The cost to us is simply to learn how they've put things together, and furthermore how to extend the framework they've built.


# Step 1: Create a GameFeature Plugin

It seems Epic intends for us to create a plugin and contain all of our own source and content there, such that they can eventually (how!?) update the LyraStarterGame code and content they've provided with additions, bug fixes, etc.

[How To Create a GameFeature Plugin](./How-To-Create-a-GameFeature-Plugin)


# Step 2: Configure Asset Manager for Plugin

Once you have a plugin, you need to tell the Asset Manager where to find files for your plugin.

[How to Configure Asset Manager for GameFeature Plugins](./How-To-Configure-AssetManager-for-GameFeature-Plugins)


# Step 3: Create Your Dev Experience

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
    - Pawn > Pawn Class: `B_XGCyborg` (mod custom)
  - Input
    - Input > Input Config: `InputData_Hero` (default Lyra hero input)
  - Camera
    - Camera > Default Camera Mode: `CM_ThirdPerson` (default Lyra camera)


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

Make sure to enable your mod in the `Game Features to Enable` array.  E.g. I added a row there with the text `XistGame`.


# Step N: Change Front-end to show this new experience

Create user-facing experience to accomplish this (?)

*... work in progress ...*


## Dev Map

`XistGame/Content/Maps/L_DevMap` default empty map.

In the `World Settings` for this map, set the `Game Mode`: `Default Gameplay Experience` to be the new experience blueprint you created.

For example mine was named `B_XGDevExperience`.


# Step N: Your guess is as good as mine! :D

Currently working toward this.  Will update more as I learn more.

*... work in progress ...*


# References

As I learn more about LyraStarterGame I'm keeping a list of references.

- [Epic Games Developer Discussion References](./Epic-Games-Developer-Discussion-References)

