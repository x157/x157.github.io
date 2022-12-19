---
title: "Lyra Experience"
description: "A look at the Lyra Experience system. What is it? How does it work?"
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: "Experience"
---

# Lyra Experience

A Lyra Experience is a custom, configurable Game Mode/State.  Each level in a Lyra project
can specify the `Default Lyra Experience` to load for that level via custom
[World Settings](#LyraWorldSettings).

[Loading a Lyra Experience](#ExperienceLoadingProcedure)
is asynchronous.  Content is expected to be placed into
Game Feature Plugins
([GFPs](/UE5/GameFeatures/))
which are dynamically loaded only when actually needed.
Your project is expected to use the `OnExperienceLoaded` event to initiate gameplay,
it fires when the async loading completes.

The [Experience Definition](#LyraExperienceDefinition)
configures the default
[Lyra Pawn Data](#LyraPawnData)
and a list of [Experience Action Sets](#LyraExperienceActionSet)
to load and execute.
*(Runtime component injection, HUD widget extension, etc.)*


## Implementation Overview

- [Primary Data Assets Comprising an Experience](#PrimaryDataAssets)
  - [Lyra Experience Definition](#LyraExperienceDefinition)
  - [Lyra Experience Action Set](#LyraExperienceActionSet)
  - [Lyra Pawn Data](#LyraPawnData)
  - [Lyra Input Config](#LyraInputConfig)
  - [Game Feature Action](#GameFeatureAction)
- [Setting up Unreal Engine for Lyra Experience](#EngineSetup)
  - [Lyra World Settings](#LyraWorldSettings)
  - [Lyra Game Mode](#LyraGameMode)
  - [Lyra Game State](#LyraGameState)
    - [Lyra Experience Manager Component](#LyraExperienceManagerComponent)
      - [Experience Loading Procedure: `StartExperienceLoad`](#ExperienceLoadingProcedure)
  - [Lyra Experience Manager](#LyraExperienceManager) *(only relevant to PIE)*
- [Lyra Frontend State Component](#LyraFrontendStateComponent)


### Debugging Tip

- Enable `LogLyraExperience` logging


<a id='PrimaryDataAssets'></a>
# Primary Data Assets Comprising an Experience

<a id='LyraExperienceDefinition'></a>
## Lyra Experience Definition

« Primary Data Asset »

This is a Const Data Asset.  It literally defines a given Experience.

- Default [Lyra Pawn Data](#LyraPawnData)
- List of Instanced [Game Feature Actions](#GameFeatureAction)
- List of [Lyra Experience Action Sets](#LyraExperienceActionSet)
- List of Game Feature Plugin ([GFP](/UE5/GameFeatures/)) dependencies


<a id='LyraExperienceActionSet'></a>
## Lyra Experience Action Set

« Primary Data Asset »

- Array of [Game Feature Actions](#GameFeatureAction)
- Array of Game Feature Plugin ([GFP](/UE5/GameFeatures/)) dependencies used by this Action Set


<a id='LyraPawnData'></a>
## Lyra Pawn Data

« Primary Data Asset »

- Pawn (Subclass)
- Lyra Ability Sets (Array)
- Lyra Ability Tag Relationship Mapping
- [Lyra Input Config](#LyraInputConfig)
- Lyra Camera Mode (Subclass)


<a id='LyraInputConfig'></a>
## Lyra Input Config

« Const Data Asset »

- Native Lyra Input Actions (Array)
- Ability Lyra Input Actions (Array)


<a id='GameFeatureAction'></a>
## Game Feature Action

An Action to be taken when a Game Feature is activated.
Part of the experimental `GameFeatures` plugin.

An Instanced Game Feature Action handles
[Game Features](/UE5/GameFeatures/)
asset loading and unloading.  Events include:

- Registering
- Unregistering
- Loading
- Activating
- Deactivating


<a id='EngineSetup'></a>
# Setting up Unreal Engine for Lyra Experience



<a id='LyraWorldSettings'></a>
## Lyra World Settings

- Adds `Default Gameplay Experience` setting to `ULevel` assets
- In PIE, load the default experience during `InitGame`
- This is what allows you to specify the Lyra Experience for a level to use

Configured as the World Settings class in `Config/DefaultEngine.ini`:
- `WorldSettingsClassName`=`/Script/LyraGame.LyraWorldSettings`


<a id='LyraGameMode'></a>
## Lyra Game Mode

Lyra Game Mode is the required base Game Mode providing Lyra Experience support.

- Uses a [Lyra Game State](#LyraGameState)
- In `Init Game`:
  - On Server, call `ServerSetCurrentExperience` via `OnMatchAssignmentGiven`
- Adds support for loading an Experience on PIE start by simulating a match assignment
- Delay initial player spawn until `OnExperienceLoaded`
  - Lots of other player start related logic


<a id='LyraGameState'></a>
## Lyra Game State

The Lyra Game State is key to the functionality of Lyra Experiences.

The Lyra Game State itself is relatively simple, but it does initialize
and activate two very important components that enable Experiences:

- Ability System Component
- Lyra Experience Manager Component


<a id='LyraExperienceManagerComponent'></a>
### Lyra Experience Manager Component

The `ULyraExperienceManagerComponent`
does the heavy lifting related to loading and unloading,
activating and deactivating Experiences.


<a id='ExperienceLoadingProcedure'></a>
#### Experience Loading Procedure: `StartExperienceLoad`

On the server and on all clients, `StartExperienceLoad` must be called
*(explicitly on the server and via replication on the clients)*,
which begins this process:

- Set state = `Loading`

##### State: Loading
- Async Load assets via `ULyraAssetManager`
    - Primary Experience Asset ID
    - Experience Action Sets
    - Client/Server Game Features Subsystem
- On async load complete:
    - Scan for GFPs
    - Async Load and Activate each required GFP
- After all GFPs finish loading:
    - Set state = `ExecutingActions`

##### State: Executing Actions
- Execute all `UGameFeatureActions` defined by the experience and its action sets
- Set state = `Loaded`

##### State: Loaded
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
- This can be used as an example component that loads an experience even if you do not want to use Lyra's FrontEnd
