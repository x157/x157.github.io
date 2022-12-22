---
title: "Game Initialization | UE5 LyraStarterGame"
description: "Overview of Game Initialization in LyraStarterGame"
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: "Game Initialization"
---

# Game Initialization

The GameMode initializes when a World is loaded.
There are different ways a World can come to be loaded,
including clicking the "Play In Editor" (PIE) button.

The World Settings defines the GameMode to use,
and for [Lyra](/UE5/LyraStarterGame/),
which [Lyra Experience](/UE5/LyraStarterGame/Experience/) to load.


## World Load

World🡒InitializeActorsForPlay

`LogWorld: Bringing World ... up for play`

- GameMode🡒InitGame

Other World Actors in the world also get initialized *(random order?)*

- GameMode🡒PreInitializeComponents
  - GameState🡒PreInitializeComponents
  - GameState🡒PostInitializeComponents
  - GameMode🡒InitGameState
- GameMode🡒PostInitializeComponents

`LogWorld: Bringing up level for play took: ...`

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

## World BeginPlay

- All World Subsystems OnWorldBeginPlay
- GameMode🡒StartPlay
  - GameState🡒HandleBeginPlay
    - PlayerController🡒PushInputComponent
    - All World Actors BeginPlay *(random order?)*
      - GameMode🡒BeginPlay
      - GameState🡒BeginPlay
      - PlayerController🡒BeginPlay
      - PlayerState🡒BeginPlay
      - ... etc ...

## Lyra Experience Load

In PIE, 1 tick after GameMode🡒InitGame, Load World's Lyra Experience

In Game, Frontend State Component (or your similar Game State Component) loads Lyra Experience

For full details, see
[Experience Loading Procedure](/UE5/LyraStarterGame/Experience/#ExperienceLoadingProcedure)

TLDR version:

- Load Experience Asset & its References
- Load all GameFeature Plugin dependencies
- Activate GFPs (execute GameFeature Actions)
- Broadcast [`OnExperienceLoaded`](/UE5/LyraStarterGame/Experience/#OnExperienceLoaded)
