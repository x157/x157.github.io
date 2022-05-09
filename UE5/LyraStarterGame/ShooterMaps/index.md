---
title: ShooterMaps Blueprints Overview
description: High level overview of LyraStarterGame's ShooterMaps plugin, settings and blueprints
back_links:
  - link: /UE5/
    name: UE5
  - link: /UE5/LyraStarterGame/
    name: LyraStarterGame
---


# Plugin: ShooterMaps


# Map: L_Expanse

- Map: `L_Expanse`
  - Experience: `B_ShooterGame_Elimination`


# Experience: B_ShooterGame_Elimination

- Experience: `B_ShooterGame_Elimination`
  - Activate `ShooterCore` GameFeature Plugin
  - Pawn Data: `HeroData_ShooterGame`

    - Pawn Class: `B_Hero_ShooterMannequin`
    - Ability Sets:
      - `AbilitySet_ShooterHero`

        - Abilities: GA_Hero_Jump, GA_Hero_Death, GA_Hero_Dash, GA_Emote, GA_QuickbarSlots, GA_ADS, GA_Grenade, GA_DropWeapon, GA_Melee, GA_SpawnEffect, LyraGameplayAbility_Reset
        - Effects: `GS_IsPlayer` (sets `Lyra.Player` tag)

    - Tag Relationships: `TagRelationships_ShooterHero`
    - Input Config: `InputData_Hero`
    - Camera Mode: `CM_ThirdPerson`

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

      - `B_ShooterBotSpawner` (server only)

        - Type: `ULyraBotCreationComponent`
        - Tick Group: `During Physics`
        - Num Bots to Create: `3`
        - Assign random bot names
        - Bot Controller Class: `B_AI_Controller_LyraShooter`

          - Type: `ULyraPlayerBotController`
          - Logic:
            - BeginPlay:
              - `Wait for Experience Ready`, then:
                - `Run Behavior Tree` = `BT_Lyra_Shooter_Bot`
              - Register `OnDeathStarted` custom event on pawn's `Lyra Health Component`.`OnDeathStarted` event
            - `OnDeathStarted` custom event:
              - Clear blackboard
              - Stop `BrainComponent` logic
            - `OnPossess` event:
              - Start `BrainComponent` logic
              - Set `AIPerception` team ID
            - `OnUnPossess` event:
              - Call `OnDeathStarted` custom event

      - `B_TeamSetup_TwoTeams` (server only)
      
        - Type: `ULyraTeamCreationComponent`
        - Teams to Create:
          - 1 = `TeamDA_Red`
          - 2 = `TeamDA_Blue`

      - `B_TeamSpawningRules` (server only)

        - Type: `UTDM_PlayerSpawningManagementComponent`
        - Tick Group: `Pre Physics`
        - Logic (C++):
          - Try to find `ALyraPlayerStart` farthest from enemy teams

    - `Controller` injections *(both Player and AI)*:
      - `B_PickRandomCharacter`

        - Type: C++ `ULyraControllerComponent_CharacterParts`
        - Logic:
          - `BeginPlay` event:
            - **DOES NOT CALL PARENT BEGINPLAY** (seems to be a bug)
            - `AddCharacterPart` randomly either `B_Manny` or `B_Quinn`

  - Widgets:
    - `W_ScoreWidget_Elimination` into `HUD.Slot.TeamScore` slot

