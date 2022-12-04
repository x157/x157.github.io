---
title: "Lyra Experience"
description: "A look at the Lyra Experience system. What is it? How does it work?"
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: "Experience"
---

# Lyra Experience

A Lyra Experience is a custom Game Mode that allows Game Feature Plugins (GFPs) to be loaded
and activated at runtime.

Using the Experience system, your game can define drastically different Game Modes (Experiences)
for your players, and at runtime only those GFPs that are needed at any given time
will be loaded into memory.

This also allows you to release content as optional or seasonal content packs, etc.

In general, an Experience is a list of all of the GFPs that need to be loaded, the components
that need to be injected into game objects and other related configurations.


## Implementation Overview

- [Lyra Experience Definition](#LyraExperienceDefinition)
- [Lyra World Settings](#LyraWorldSettings)
- [Lyra Game Mode](#LyraGameMode)
- [Lyra Game State](#LyraGameState)
  - [Lyra Experience Manager Component](#LyraExperienceManagerComponent)
    - [Experience Loading Procedure](#ExperienceLoadingProcedure)
- [Lyra Experience Manager](#LyraExperienceManager) *(only relevant to PIE)*
- [Lyra Frontend State Component](#LyraFrontendStateComponent)


# How does it work?

You must create a
[Lyra Experience Definition](#LyraExperienceDefinition)
Data Asset, for example named `EXP_XistGame`.

To activate your Experience for a given level, in that level's World Settings, set:

- Default Gameplay Experience = `EXP_XistGame` *(your Experience Definition Data Asset)*

Lyra defines the default Game Mode to be `ULyraGameMode`, which is the required base
Game Mode that supports Lyra Experiences.
You'll need to ensure your project uses a default Game Mode based on this,
or set an explicit override in the World Settings.


### Debugging Tips

- Enable `LogLyraExperience` logging


# Aspects of the Lyra Experience System


<a id='LyraExperienceDefinition'></a>
## Lyra Experience Definition

This is a Const Data Asset.  It literally defines a given experience.

- List of Game Features to Enable
- Default Pawn Data
- List of Game Feature Actions
- List of Lyra Experience Action Sets


<a id='LyraWorldSettings'></a>
## LyraWorldSettings

- Adds `Default Gameplay Experience` setting to `ULevel` assets
- This is what allows you to specify the Lyra Experience for a level to use
  - Configured as the World Settings class in `Config/DefaultEngine.ini`:
    - `WorldSettingsClassName`=`/Script/LyraGame.LyraWorldSettings`


<a id='LyraGameMode'></a>
## Lyra Game Mode

- Restart all players on `OnExperienceLoaded`
- Lots of player start related logic


<a id='LyraGameState'></a>
## Lyra Game State

Includes components:

- Ability System Component
- Lyra Experience Manager Component


<a id='LyraExperienceManagerComponent'></a>
### Lyra Experience Manager Component

- Manages loading of experiences

<a id='ExperienceLoadingProcedure'></a>
#### Experience Loading Procedure
- Set state = `Loading`
- Async Load assets via `ULyraAssetManager`
    - Primary Experience Asset ID
    - Experience Action Sets
    - Client/Server Game Features Subsystem
- On async load complete:
    - Scan for GFPs
    - Async Load and Activate each required GFP
- After all GFPs finish loading:
    - Set state = `ExecutingActions`
    - Execute all `UGameFeatureActions` defined by the experience and its action sets
    - Set state = `Loaded`
    - Broadcast `OnExperienceLoaded`


<a id='LyraExperienceManager'></a>
## Lyra Experience Manager

- Engine Subsystem
- This is required for PIE but otherwise doesn't do anything for the game
  - Poorly named class makes it seem much more important than it really is


<a id='LyraFrontendStateComponent'></a>
## Lyra Frontend State Component

- Generally you'll need to make a BP version of this to configure the menu widgets
  - Inject this component into the Game State in your Experience Definition to activate the Lyra FrontEnd experience
