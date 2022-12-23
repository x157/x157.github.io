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


## World Load

### World🡒InitializeActorsForPlay

`LogWorld: Bringing World /XistGame/Maps/L_WorldName.L_WorldName up for play`

#### InitGame

- GameMode🡒InitGame

#### Initialize Components of ALL World Actors

Initialization of World Actors is in **RANDOM ORDER**.

- GameMode🡒PreInitializeComponents
  - GameState🡒PreInitializeComponents
  - GameState🡒PostInitializeComponents
  - GameMode🡒InitGameState
- GameMode🡒PostInitializeComponents

`LogWorld: Bringing up level for play took: 0.013386`

#### Initialize Player Controller / State

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


### World BeginPlay

- All World Subsystems OnWorldBeginPlay
- GameMode🡒StartPlay
  - GameState🡒HandleBeginPlay
    - PlayerController🡒PushInputComponent
    - All World Actors BeginPlay (**RANDOM ORDER**)
      - GameMode🡒BeginPlay
      - GameState🡒BeginPlay
      - PlayerController🡒BeginPlay
      - PlayerState🡒BeginPlay
      - ... etc ...


### Lyra Experience Load

In PIE, the World's Default Lyra Experience gets loaded on the tick after GameMode🡒InitGame.

In Game, the appropriate Lyra Experience is loaded by
the Frontend State Component (or your similar Game State Component).


#### Experience Load Procedure

- Load Experience Asset and its References
- Load all GameFeature Plugin (GFP) dependencies
- Activate GFPs (execute GameFeature Actions)
- Broadcast [`OnExperienceLoaded`](/UE5/LyraStarterGame/Experience/#OnExperienceLoaded)

For full details, see
[Experience Loading Procedure](/UE5/LyraStarterGame/Experience/#ExperienceLoadingProcedure)

