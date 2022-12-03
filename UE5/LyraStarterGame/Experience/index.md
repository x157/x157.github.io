---
title: "Lyra Experience"
description: "A look at the Lyra Experience system. What is it? How does it work?"
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: "Experience"
---

# Lyra Experience


# What is the Lyra Experience System?

A Lyra Experience is a Game Mode override.



# How does it work?

First you need to create a
[Lyra Experience Definition](#LyraExperienceDefinition)
Data Asset, for example named `EXP_XistGame`.

To activate your Experience for a given level, in that level's World Settings, set:

- Default Gameplay Experience = `EXP_XistGame` *(your Experience Definition Data Asset)*

Lyra defines the default Game Mode to be `ULyraGameMode`, which is the required base
Game Mode that supports Lyra Experiences.
You'll need to ensure your project uses a default Game Mode based on this,
or set an explicit override in the Level's World Settings.


### Debugging Tips

- Enable `LogLyraExperience` logging


<a id='LyraExperienceDefinition'></a>
## Lyra Experience Definition

This is a Const Data Asset.  It literally defines a given experience.

- List of Game Features to Enable
- Default Pawn Data
- List of Game Feature Actions
- List of Lyra Experience Action Sets


<a id='LyraExperienceManager'></a>
## Lyra Experience Manager

- Purely useful for managing PIE
  - No logic at all related to game play
- Engine Subsystem


<a id='LyraGameState'></a>
## Lyra Game State

- Ability System Component
- Experience Manager Component


<a id='LyraGame Mode'></a>
## Lyra Game Mode

- OnExperienceLoaded
  - Restarts all players

- SpawnDefaultPawnAtTransform
  - Spawns the player pawn, assigns Pawn Data

- Lot of player start logic


<a id='LyraWorldSettings'></a>
## LyraWorldSettings

- Adds `Default Gameplay Experience` setting to `ULevel` assets
- Configured in `Config/DefaultEngine.ini`:
  - `WorldSettingsClassName=/Script/LyraGame.LyraWorldSettings`


<a id='LyraExperienceManagerComponent'></a>
## Lyra Experience Manager Component

- Handles loading of experiences
- Game State Component

### Experience Loading Procedure
  - Set state = `Loading`
  - Async Load assets via `ULyraAssetManager`
    - Primary Experience Asset ID
    - Experience Action Sets
    - Client/Server Game Features Subsystem
  - On async load complete:
    - Scan for GFPs
    - Async Load and Activate each required GFP
  - On all GFPs async loaded:
    - Set state = `ExecutingActions`
    - Execute all `UGameFeatureActions` defined by the experience
    - Execute all `UGameFeatureActions` defined by the experience's action sets
    - Set state = `Loaded`
    - Broadcast `OnExperienceLoaded`


<a id='LyraFrontendStateComponent'></a>
## Lyra Frontend State Component
