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
Your project is expected to use the
[On Experience Loaded](#OnExperienceLoaded)
event to initiate gameplay, it fires when the async loading completes.

The [Experience Definition](#LyraExperienceDefinition)
configures the default
[Lyra Pawn Data](#LyraPawnData)
and a list of [Experience Action Sets](#LyraExperienceActionSet)
to load and execute.
*(Runtime component injection, HUD widget extension, etc.)*

Note that `BeginPlay` has a different meaning in Lyra.  Whereas in other games Begin Play
might literally mean in some cases "game play has begun", in Lyra it just means the
Level has been loaded and the (perhaps quite slow) async loading process has begun.
In Lyra, the game shouldn't actually start playing until the
[On Experience Loaded](#OnExperienceLoaded)
event fires, sometime **well after** `BeginPlay`.


## Primary Data Assets Defining an Experience

  - [Lyra Experience Definition](#LyraExperienceDefinition)
  - [Lyra Experience Action Set](#LyraExperienceActionSet)
  - [Lyra Pawn Data](#LyraPawnData)
  - [Lyra Input Config](#LyraInputConfig)
  - [Game Feature Action](#GameFeatureAction)

## Unreal Engine Setup

  - [Lyra Game Mode](#LyraGameMode)
  - [Lyra Game State](#LyraGameState)
    - [Lyra Experience Manager Component](#LyraExperienceManagerComponent)
      - [Experience Loading Procedure](#ExperienceLoadingProcedure)
- [Lyra World Settings](#LyraWorldSettings)
- [Lyra Asset Manager](#LyraAssetManager)
- [Lyra Experience Manager](#LyraExperienceManager) Subsystem *(only relevant to PIE)*

## How to Initiate Gameplay in a Lyra Experience

- Event: [`OnExperienceLoaded`](#OnExperienceLoaded)
- [Loading a Default Experience](#LoadingADefaultExperience)
  - Example: [Lyra Frontend State Component](#LyraFrontendStateComponent)


### Debugging Tip

- Enable `LogLyraExperience` logging


<a id='PrimaryDataAssets'></a>
# Primary Data Assets

This section describes the major Primary Data Assets that are required to define
a Lyra Experience.


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

This section describes how Lyra sets up Unreal Engine to support a Lyra Experience.


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
- [Lyra Experience Manager Component](#LyraExperienceManagerComponent)


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
- Async Load assets via [Lyra Asset Manager](#LyraAssetManager)
    - Primary Experience Asset ID
    - Experience Action Sets
    - Client/Server Game Features Subsystem
- On async load complete:
    - Scan for GFPs
    - Async Load and Activate each required GFP
- After all GFPs finish loading:
    - Set state = `ExecutingActions`

##### State: Executing Actions
- Execute all [Game Feature Actions](#GameFeatureAction) defined by the experience and its action sets
- Set state = `Loaded`

##### State: Loaded
- Broadcast [`OnExperienceLoaded`](#OnExperienceLoaded)


<a id='LyraWorldSettings'></a>
## Lyra World Settings

- Adds `Default Gameplay Experience` setting to `ULevel` assets
- In PIE, load the default experience during `InitGame`
- This is what allows you to specify the Lyra Experience for a level to use

`Config/DefaultEngine.ini` configures the use of Lyra World Settings:

```ini
[/Script/Engine.Engine]
WorldSettingsClassName=/Script/LyraGame.LyraWorldSettings
```


<a id='LyraAssetManager'></a>
## Lyra Asset Manager

- Game-specific implementation of Asset Manager to handle loading assets
  - Allows using Soft Object Pointers in configs to delay loading of assets until they are really needed
    - Supposedly a significant performance boost as compared to *not* using Soft Object Pointers

`Config/DefaultEngine.ini` configures the use of Lyra Asset Manager:

```ini
[/Script/Engine.Engine]
AssetManagerClassName=/Script/LyraGame.LyraAssetManager
```


<a id='LyraExperienceManager'></a>
## Lyra Experience Manager

« Engine Subsystem »

- This is required for PIE but otherwise doesn't do anything for the game


# Lyra Gameplay Initiation

This section discusses the intended way to initiate actual gameplay in a Lyra Experience.
TLDR **do not** use `BeginPlay` to start gameplay, instead in `BeginPlay` you need to wait for
`OnExperienceLoaded`.


<a id='OnExperienceLoaded'></a>
## On Experience Loaded

The [Lyra Experience Manager Component](#LyraExperienceManagerComponent)
will broadcast the `OnExperienceLoaded` event after the asynchronous experience loading
process has completed.

Your game needs to be diligent about using this event to initiate game play, and **not** use
`BeginPlay` for that purpose.  Using `BeginPlay` to initiate game play will result in intermittent
errors.

Lyra also provides `AsyncAction_OnExperienceLoaded` which is an asynchronous BP action, so that
you can easily wait for `OnExperienceLoaded` in BPs.  Lyra does this when it initializes its
Shooter Mannequin character, for example.

Note that the `OnExperienceLoaded` event is fired in three different levels of priority
(High, Normal and Low)
to allow you to have some handlers that are dependent on other higher priority handlers.

There are many examples of how to use `OnExperienceLoaded` in Lyra.
`CTRL`+`SHIFT`+`F` in Rider to see many interesting C++ snippets.
Some examples of particular interest are discussed below.

### High Priority Examples
- Lyra Team Creation Component :: Begin Play
  - Wait for On Experience Loaded, then create teams
- [Lyra Frontend State Component](#LyraFrontendStateComponent) :: Begin Play
  - Wait for On Experience Loaded, then start a multistep async process to show the Frontend Game Menu as soon as possible

### Normal Priority Examples
- Lyra Player State :: Post Initialize Components
  - Wait for On Experience Loaded, then Set Player Pawn Data
    - This grants Ability Sets to the Player State based on the Default Pawn Data config
- [Lyra Game Mode](#LyraGameMode) :: Init Game State
  - Wait for On Experience Loaded, then Restart all players who don't yet have Pawns
    - This effectively assigns each player/bot the Default Pawn Data

### Low Priority Examples
- Lyra Bot Creation Component :: Begin Play
  - Wait for On Experience Loaded, then create bots
    - Depends on the (high priority) Lyra Team Creation Component having created the teams
    - Depends on the (normal priority) Lyra Player State having set the [Lyra Pawn Data](#LyraPawnData)


<a id='LoadingADefaultExperience'></a>
# Loading a Default Experience

Lyra loads the Frontend Experience as the default by injecting the
[Lyra Frontend State Component](#LyraFrontendStateComponent)
into the [Lyra Game State](#LyraGameState)
from a [Lyra Experience Definition](#LyraExperienceDefinition).

For example, the map Lyra uses by default to start the game is `L_LyraFrontEnd`,
which uses `B_LyraFrontEnd_Experience` as the `Default Gameplay Experience`.

In `B_LyraFrontEnd_Experience` it injects `B_LyraFrontendStateComponent` into the
`LyraGameState` via an `AddComponents`
[Game Feature Action](#GameFeatureAction).
The `B_LyraFrontendStateComponent` is a simple BP configuration of
[Lyra Frontend State Component](#LyraFrontendStateComponent),
defining the menu widgets used by the project.


<a id='LyraFrontendStateComponent'></a>
## Lyra Frontend State Component

This component is expected to be injected into a
[Lyra Game State](#LyraGameState).
It registers a high priority `OnExperienceLoaded` callback that initiates the
asynchronous process of showing the frontend menu system to the user.

This interfaces with the `CommonLoadingScreen` plugin that is distributed with Lyra.
That allows the loading screen to be visible for however long it takes to load the
Lyra Experience.

Once the Experience has loaded and the player is ready to see the menu, the loading
screen is disabled and the menu system is displayed.

- Generally you'll need to make a BP version of this to configure the menu widgets
- Consider this an example component that loads a default experience even if you do not want to use Lyra's FrontEnd
