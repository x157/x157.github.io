---
title: "Game Initialization | UE5 LyraStarterGame"
description: "Overview of Game Initialization in LyraStarterGame"
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: "Game Initialization"
---

# Game Initialization

The GameMode initializes when a World is loaded.
The [World Settings](/UE5/LyraStarterGame/Experience/#LyraWorldSettings)
defines the [GameMode](/UE5/LyraStarterGame/Experience/#LyraGameMode) to use
and (in [Lyra](/UE5/LyraStarterGame/))
which [Lyra Experience](/UE5/LyraStarterGame/Experience/)
to load by default.

There are different ways a World can come to be loaded,
including clicking the "Play In Editor" (PIE) button.

As discussed in more detail in
[Lyra Experience](/UE5/LyraStarterGame/Experience/),
unlike other Games, in Lyra you must ensure to
**delay all game play** until
`OnExperienceLoaded`, perhaps long after `BeginPlay`.


# World Load Procedure

World Loading follows this procedure:

- [Initialize Components of all World Actors](#InitializeActorsForPlay)
  - [Init Game Mode](#InitGame)
  - [Initialize Components](#InitializeComponents) *(random Actor order)*
  - [Player Login](#PlayerLogin)
    - Create Player Controller & Player State
- [World Begin Play](#BeginPlay)
  - Begin Play on all World Actors *(random Actor order)*
- [Load Lyra Experience](#LoadLyraExperience)
  - [`OnExperienceLoaded`](/UE5/LyraStarterGame/Experience/#OnExperienceLoaded)
    signals that game play can begin


<a id='InitializeActorsForPlay'></a>
## Initialize Components of all World Actors

This is implemented by World🡒InitializeActorsForPlay


<a id='InitGame'></a>
### Init Game Mode

- GameMode🡒InitGame


<a id='InitializeComponents'></a>
### Initialize Components

Initialization of World Actors is in **RANDOM ORDER**.

When the GameMode is initialized, it does:

- GameMode🡒PreInitializeComponents
  - GameState🡒PreInitializeComponents
  - GameState🡒PostInitializeComponents
  - GameMode🡒InitGameState
- GameMode🡒PostInitializeComponents


<a id='PlayerLogin'></a>
### Player Login

- GameMode🡒Login
  - GameMode🡒SpawnPlayerController
    - PlayerController🡒PreInitializeComponents
    - PlayerController🡒PostInitializeComponents
      - PlayerController🡒InitPlayerState
        - PlayerState🡒PreInitializeComponents
        - PlayerState🡒PostInitializeComponents
          - GameState🡒AddPlayerState
        - PlayerController->OnPlayerStateChanged
      - PlayerController🡒AddCheats
  - GameMode🡒InitNewPlayer
- PlayerController🡒SetPlayer
  - PlayerController🡒SetupInputComponent
  - PlayerController🡒ReceivedPlayer
    - `CommonGame` adds root HUD layout
- GameMode🡒OnPostLogin


<a id='BeginPlay'></a>
## World BeginPlay

- All World Subsystems `OnWorldBeginPlay`
- GameMode🡒StartPlay
  - GameState🡒HandleBeginPlay
    - PlayerController🡒PushInputComponent
    - All World Actors BeginPlay (**RANDOM ORDER**)
      - GameMode🡒BeginPlay
      - GameState🡒BeginPlay
      - PlayerController🡒BeginPlay
      - PlayerState🡒BeginPlay
      - ... etc ...


<a id='LoadLyraExperience'></a>
## Load Lyra Experience

In PIE, the World's Default Lyra Experience gets loaded on the tick after GameMode🡒InitGame.

In Game, the appropriate Lyra Experience is loaded by
the Frontend State Component (or your similar Game State Component).


### Experience Load Procedure

- Load Experience Asset and its References
- Load all GameFeature Plugin (GFP) dependencies
- Activate GFPs (execute GameFeature Actions)
- Broadcast [`OnExperienceLoaded`](/UE5/LyraStarterGame/Experience/#OnExperienceLoaded)

For full details, see
[Experience Loading Procedure](/UE5/LyraStarterGame/Experience/#ExperienceLoadingProcedure)

