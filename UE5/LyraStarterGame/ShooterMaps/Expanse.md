---
title: Expanse Map Dissection
description: Dissection of LyraStarterGame ShooterMaps L_Expanse map
back_links:
  - link: /UE5/
    name: UE5
  - link: /UE5/LyraStarterGame/
    name: LyraStarterGame
  - link: /UE5/LyraStarterGame/ShooterMaps/
    name: ShooterMaps
---


# Expanse Map Dissection

The `L_Expanse` map is an arena-like level.  It uses the `B_ShooterGame_Elimination` experience, which determines the game logic, scoring, win states, etc.


# Outline: Experience: B_ShooterGame_Elimination

- Experience: `B_ShooterGame_Elimination`
  - Common ShooterCore experience settings
  - Abilities:
    - `LyraPlayerState` injections:
      - `AbilitySet_Elimination`
        - Abilities: `GA_ShowLeaderboard_TDM`, `GA_AutoRespawn`
  - Components:
    - `LyraGameState` injections:
      - `B_TeamDeathMatchScoring` (client+server)
        - Type: `UGameStateComponent` > `B_ShooterGameScoring_Base`
        - Logic:
          - `Wait for Experience Ready`, then:
            - Start `Phase_Warmup` game phase
              - Attach `GameStarted` custom event to end of `Phase_Warmup` game phase
          - `GameStarted` custom event
            - Set game state like max # kills to win, max time to end game
            - Start timer to tick game clock every second
              - Calls `CountDown` custom event each second
            - If lots of players then enable data layer with extra spawn points
            - Reset all players
            - Reset all other misc actors
          - `CountDown` custom event
            - update game clock
            - when out of time, call `HandleVictory` function
          - `OnEliminationScored` function
            - Base class calls this each time someone is killed
            - Child class calls `HandleVictory` if one team reaches the winning threshold
          - `HandleVictory` function
            - Send `GameplayCue.ShooterGame.UserMessage.MatchDecided` cue
            - Start `Phase_Post_Game` game phase
          - (via base class)
            - Listen for Gameplay Cues, update score
              - `Lyra.Elimination.Message`
              - `Lyra.Assist.Message`
      - `B_MusicManagerComponent_Elimination` (client only)
        - Type: `UActorComponent` > `B_MusicManagerComponent`
        - Logic: 
          - Set Is Menu = False
          - (via base class)
            - Begin Play:
              - Set `mx_System` as Game State Music System
              - Listen for `Lyra.Elimination.Message` cues, call `Receive Player Death` function
              - Listen for `Lyra.Damage.Taken.Message` cues, if local player then call `Receive Weapon Fire` function
            - Every Tick:
              - Set `LookDir` audio controller parameter
              - Set `Alpha Mvmt` audio parameter based on current move speed
              - Set `Intensity` audio parameter
            - `Receive Player Death` function sets max alpha 1.0
            - `Receive Weapon Fire` function sets alpha based on weapon fire strength
  - Widgets:
    - `W_ScoreWidget_Elimination` into `HUD.Slot.TeamScore` slot

