---
title: Convolution_Blockout Map Dissection
description: Dissection of LyraStarterGame ShooterMaps L_Convolution_Blockout map
back_links:
  - link: /UE5/
    name: UE5
  - link: /UE5/LyraStarterGame/
    name: LyraStarterGame
  - link: /UE5/LyraStarterGame/ShooterMaps/
    name: ShooterMaps
---


# Convolution_Blockout Map Dissection

The `L_Convolution_Blockout` map is an arena-like level with team capture objectives.  It uses the `B_LyraShooterGame_ControlPoints` experience, which determines the game logic, scoring, win states, etc.


# Outline: Experience: B_LyraShooterGame_ControlPoints

- Experience: `B_LyraShooterGame_ControlPoints`
  - Common ShooterCore experience settings
  - Abilities:
    - `LyraPlayerState` injections:
      - `AbilitySet_ControlPoint`
        - Abilities: `GA_ShowLeaderboard_CP`, `GA_AutoRespawn`
  - Components:
    - `LyraGameState` injections:
      - `B_ControlPointScoring` (client+server)
        - Type: `UGameStateComponent` > `B_ShooterGameScoring_Base`
        - Logic:




          - TODO




          - (via base class)
            - Listen for Gameplay Cues, update score
              - `Lyra.Elimination.Message`
              - `Lyra.Assist.Message`
      - `B_MusicManagerComponent` (client only)
        - Type: `UActorComponent` > `B_MusicManagerComponent`
        - Logic:





          - TODO





  - Widgets:
    - `W_CPScoreWidget` into `HUD.Slot.TeamScore` slot
    - `W_ControlPointStatusWidget` into `HUT.Slot.ModeStatus` slot
