---
title: ShooterMaps Dissection
description: High level overview of LyraStarterGame's ShooterMaps plugin, settings and blueprints
back_links:
  - link: /UE5/
    name: UE5
  - link: /UE5/LyraStarterGame/
    name: LyraStarterGame
---


# ShooterMaps Dissection

The `ShooterMaps` plugin uses `ShooterCore` for the base game play.  It defines some maps and experiences as follows:


## Interesting Map Dissection

Common experience settings are further below, but 2 maps in particular warrant further dissection as they implement two different types of experience.

- [L_Expanse](./Expanse) -- team death match (elimination) experience
- [L_Convolution_Blockout](./Convolution_Blockout) -- team control point experience


## Other Maps

- L_Expanse_Blockout
- L_FiringRange_WP
  - Essentially a test map
  - Contains all the elements of the other maps, in a compact area, and the bots hit like kittens.
- L_ShooterFrontendBackground
  - This map is hard-coded into Lyra to be the front-end's lobby background scene.
  - Worth looking at to see how they did the cinematic camera sequence, if nothing else.


# Common ShooterCore Experience Settings

Both of the experiences in `ShooterMaps` use the following common settings:

  - Activate `ShooterCore` GameFeature Plugin
  - Pawn Data: `HeroData_ShooterGame`
    - Pawn Class: `B_Hero_ShooterMannequin`
    - Action Sets:
      - `LAS_ShooterGame_SharedInput`
        - Input Mapping: `IMC_ShooterGame_KBM`
        - Input Config: `InputData_ShooterGame_Addons`
      - `LAS_ShooterGame_StandardComponents`
        - Inject into `LyraPlayerController`:
          - `B_NiagaraNumberPopComponent`
            - Parent: C++ `ULyraNumberPopComponentNiagraText`
            - Tick Group: `During Physics`
            - Client only
          - `NameplateManagerComponent`
            - Parent: C++ `UControllerComponent`
            - Tick Group: `During Physics`
            - Client only
            - Purpose:
              - Keep track of all actors needing nameplates
              - Use `W_Nameplate` UI widget
        - Inject into `Controller` *(Player + AI both)*:
          - `B_QuickBarComponent`
            - 
            - Client + Server
        - Inject into `B_Hero_ShooterMannequin`
          - `NameplateSource`
            - Parent: C++ `ULyraQuickBarComponent`
            - Tick Group: `During Physics`
            - Client only
      - `LAS_ShooterGame_StandardHUD`
        - Layout: `W_ShooterHUDLayout`
        - Widgets:
          - Slot `HUD.Slot.EliminationFeed` == `W_EliminationFeed`
          - Slot `HUD.Slot.Equipment` == `W_QuickBar`
          - Slot `HUD.Slot.TopAccolades` == `W_AccoladeHostWidget`
          - Slot `HUD.Slot.Reticle` == `W_WeaponReticleHost`
          - Slot `HUD.Slot.PerfStats.Graph` == `W_PerfStatContainer_GraphOnly`
          - Slot `HUD.Slot.PerfStats.Text` == `W_PerfStatContainer_TextOnly`
          - Slot `HUD.Slot.LeftSideTouchInputs` == `W_OnScreenJoystick_Left`
          - Slot `HUD.Slot.RightSideTouchInputs` == `W_OnScreenJoystick_Right`
          - Slot `HUD.Slot.RightSideTouchInputs` == `W_FireButton` **?? BUG: DUPLICATE SLOT ID ??**
          - Slot `HUD.Slot.RightSideTouchRegion` == `W_TouchRegion_Right`
          - Slot `HUD.Slot.LeftSideTouchRegion` == `W_TouchRegion_Left`
      - `EAS_BasicShooterAccolades`
        - Inject into `GameStateBase`:
          - `B_ElimChainProcessor`
            - Parent: `UElimChainProcessor` < `UGameplayMessageProcessor`
            - Tick Group: `During Physics`
            - Server only
          - `B_ElimStreakProcessor`
            - Parent: `UElimStreakProcessor` < `UGameplayMessageProcessor`
            - Tick Group: `During Physics`
            - Server only
          - `AssistProcessor` (C++)
            - Parent: `UGameplayMessageProcessor`
            - Tick Group: `During Physics`
            - Server only
          - `B_AccoladeRelay`
            - Parent: `UGameplayMessageProcessor`
            - Tick Group: `During Physics`
            - Client + Server
            - Logic:
              - Listen for `Lyra.ShooterGame.Accolade` gameplay cues
              - Do stuff RE accolades
    - Ability Sets:
      - `AbilitySet_ShooterHero`
        - Abilities: `GA_Hero_Jump`, `GA_Hero_Death`, `GA_Hero_Dash`, `GA_Emote`, `GA_QuickbarSlots`, `GA_ADS`, `GA_Grenade`, `GA_DropWeapon`, `GA_Melee`, `GA_SpawnEffect`, `LyraGameplayAbility_Reset`
        - Effects: `GS_IsPlayer` (sets `Lyra.Player` tag)
    - Tag Relationships: `TagRelationships_ShooterHero`
    - Input Config: `InputData_Hero`
    - Camera Mode: `CM_ThirdPerson`
  - Components:
    - `LyraGameState` injections:
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
