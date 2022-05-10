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

- L_[Expanse](./Expanse) -- team death match (elimination) experience
- L_[Convolution_Blockout](./Convolution_Blockout) -- team control point experience


## Other Maps

- L_Expanse_Blockout
- L_FiringRange_WP
  - Essentially a test map
  - Contains all the elements of the other maps, in a compact area, and the bots hit like kittens.
- L_ShooterFrontendBackground
  - This map is hard-coded into Lyra to be the front-end's lobby background scene.
  - Worth looking at to see how they did the cinematic camera sequence, if nothing else.


# Common ShooterCore Experience Settings

Both of the experiences in `ShooterMaps` use the following common settings


## Gameplay

- Activate `ShooterCore` GameFeature Plugin
- Pawn Data: `HeroData_ShooterGame`
  - Pawn Class: `B_Hero_ShooterMannequin`


## Action Sets


### `LAS_ShooterGame_SharedInput`

- Input Mapping: `IMC_ShooterGame_KBM`
- Input Config: `InputData_ShooterGame_Addons`


### `LAS_ShooterGame_StandardComponents`

#### `LyraPlayerController` injections:

| Component | Parent Class | Tick Group | Scope |
| `B_NiagaraNumberPopComponent` | `ULyraNumberPopComponent_NiagaraText` | `During Physics` | Client |
| `NameplateManagerComponent` | `UControllerComponent` | `During Physics` | Client |

#### `Controller` injections: *(Player + AI both)*

| Component | Parent Class | Tick Group | Scope |
| `B_QuickBarComponent` | `ULyraQuickBarComponent` | `During Physics` | Client + Server |

#### `B_Hero_ShooterMannequin` injections:

| Component | Parent Class | Tick Group | Scope |
| `NameplateSource` | `ULyraQuickBarComponent` | `During Physics` | Client |


### `LAS_ShooterGame_StandardHUD`

- Layout: `W_ShooterHUDLayout`

#### Widgets

| Slot ID | Widget | Note |
| `HUD.Slot.EliminationFeed` | `W_EliminationFeed` | |
| `HUD.Slot.Equipment` | `W_QuickBar` | |
| `HUD.Slot.TopAccolades` | `W_AccoladeHostWidget` | |
| `HUD.Slot.Reticle` | `W_WeaponReticleHost` | |
| `HUD.Slot.PerfStats.Graph` | `W_PerfStatContainer_GraphOnly` | |
| `HUD.Slot.PerfStats.Text` | `W_PerfStatContainer_TextOnly` | |
| `HUD.Slot.LeftSideTouchInputs` | `W_OnScreenJoystick_Left` | |
| `HUD.Slot.RightSideTouchInputs` | `W_OnScreenJoystick_Right` | |
| `HUD.Slot.RightSideTouchInputs` | `W_FireButton` | <problem>DUPLICATE SLOT ID</problem> |
| `HUD.Slot.RightSideTouchRegion` | `W_TouchRegion_Right` | |
| `HUD.Slot.LeftSideTouchRegion` | `W_TouchRegion_Left` | |


### `EAS_BasicShooterAccolades`

#### `GameStateBase` injections:

| Component | Parent Class | Tick Group | Scope |
| `B_ElimChainProcessor` | `UElimChainProcessor` < `UGameplayMessageProcessor` | `During Physics` | Server only |
| `B_ElimStreakProcessor` | `UElimStreakProcessor` < `UGameplayMessageProcessor` | `During Physics` | Server only |
| `AssistProcessor` (C++) | `UGameplayMessageProcessor` | `During Physics` |Server only |
| `B_AccoladeRelay` | `UGameplayMessageProcessor` | `During Physics` | Client + Server |


## Ability Sets


### `AbilitySet_ShooterHero`

- Abilities: `GA_Hero_Jump`, `GA_Hero_Death`, `GA_Hero_Dash`, `GA_Emote`, `GA_QuickbarSlots`, `GA_ADS`, `GA_Grenade`, `GA_DropWeapon`, `GA_Melee`, `GA_SpawnEffect`, `LyraGameplayAbility_Reset`
- Effects: `GS_IsPlayer` (sets `Lyra.Player` tag)
  - Tag Relationships: `TagRelationships_ShooterHero`
  - Input Config: `InputData_Hero`
  - Camera Mode: `CM_ThirdPerson`

#### `LyraGameState` injections:

| Component | Parent Class | Tick Group | Scope |
| `B_ShooterBotSpawner` | `ULyraBotCreationComponent` | `During Physics` | Server |
| `B_TeamSetup_TwoTeams` | `ULyraTeamCreationComponent` | <todo>default?</todo> | Server |
| `B_TeamSpawningRules` | `UTDM_PlayerSpawningManagementComponent` | `Pre Physics` | Server |

#### `Controller` injections: *(Player + AI both)*

| Component | Parent Class | Tick Group | Scope |
| `B_PickRandomCharacter` | `ULyraControllerComponent_CharacterParts` | *default?* | Client + Server |


# Game Logic

- `NameplateManagerComponent` logic:
  - Keep track of all actors needing nameplates
  - Use `W_Nameplate` UI widget

- `B_AccoladeRelay` logic:
  - Listen for `Lyra.ShooterGame.Accolade` gameplay cues
  - Do stuff RE accolades

- `B_ShooterBotSpawner` logic:
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

- `B_TeamSetup_TwoTeams` logic:
  - Teams to Create:
    - 1 = `TeamDA_Red`
    - 2 = `TeamDA_Blue`

- `B_TeamSpawningRules` logic (via C++ base class):
  - Try to find `ALyraPlayerStart` farthest from enemy teams

- `B_PickRandomCharacter` Logic:
  - `BeginPlay` event:
    - **DOES NOT CALL PARENT BEGINPLAY** (seems to be a bug)
    - `AddCharacterPart` randomly either `B_Manny` or `B_Quinn`
