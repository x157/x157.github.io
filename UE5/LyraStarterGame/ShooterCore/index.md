---
title: ShooterCore Game Logic Dissection \| LyraStarterGame
description: High level overview of LyraStarterGame's ShooterMaps plugin, settings and blueprints
back_links:
  - link: /UE5/
    name: UE5
  - link: /UE5/LyraStarterGame/
    name: LyraStarterGame
back_link_title: ShooterCore Game Logic Dissection
---


# ShooterCore Game Logic Dissection

`ShooterCore` defines a lot more functionality than it shows off.  In addition to the one map it provides, it is also used by `ShooterMaps` to showcase more maps and experiences.

In this high level game logic dissection we'll take a look at what makes the game do what it does.  This isn't going to get into details of animation, menus, music or other aspects of the game.  This is purely focused on the logic.


# Experience: `B_ShooterGame_Elimination`

The `L_ShooterGym` map activates the `B_ShooterGame_Elimination` experience.

- Activate `ShooterCore` GameFeature Plugin
  - *Mainly useful when other plugins want to use this experience*


## Pawn Data: `HeroData_ShooterGame`

- Pawn Class: `B_Hero_ShooterMannequin`
  - Very important class that warrants its own dissection
- Tag Relationships: `TagRelationships_ShooterHero`
  - This config helps determine which abilities can be used and when
- Input Config: `InputData_Hero`
- Camera Mode: `CM_ThirdPerson`

### Pawn Ability Set: `AbilitySet_ShooterHero`

Adds default `ShooterCore` hero abilities to the pawn, maps which abilities should activate for which input tags.

- Abilities: `GA_Hero_Jump`, `GA_Hero_Death`, `GA_Hero_Dash`, `GA_Emote`, `GA_QuickbarSlots`, `GA_ADS`, `GA_Grenade`, `GA_DropWeapon`, `GA_Melee`, `GA_SpawnEffect`, `LyraGameplayAbility_Reset`
- Effects: `GS_IsPlayer` (sets `Lyra.Player` tag)


----------------------------------------------------------------------


## Action Set: `LAS_ShooterGame_SharedInput`

Adds input bindings and key mappings pertinent to `ShooterCore` (e.g. show leaderboard, throw grenade, melee attack, etc)

- Input Mapping: `IMC_ShooterGame_KBM`
- Input Config: `InputData_ShooterGame_Addons`


## Action Set: `LAS_ShooterGame_StandardComponents`

### `LyraPlayerController` injections:

| Component | Parent Class | Tick Group | Scope |
| --- | --- | --- | --- |
| `B_NiagaraNumberPopComponent` | `ULyraNumberPopComponent_NiagaraText` | `During Physics` | Client |
| `NameplateManagerComponent` | `UControllerComponent` | `During Physics` | Client |

### `Controller` injections: *(Player + AI both)*

| Component | Parent Class | Tick Group | Scope |
| --- | --- | --- | --- |
| `B_QuickBarComponent` | `ULyraQuickBarComponent` | `During Physics` | Client + Server |

### `B_Hero_ShooterMannequin` injections:

| Component | Parent Class | Tick Group | Scope |
| --- | --- | --- | --- |
| `NameplateSource` | `ULyraQuickBarComponent` | `During Physics` | Client |


## Action Set: `LAS_ShooterGame_StandardHUD`

- Layout: `W_ShooterHUDLayout`
- Widgets:

| Slot ID | Widget | Note |
| --- | --- | --- |
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


## Action Set: `EAS_BasicShooterAccolades`

Interestingly this is the only place where injections are made to base Engine code rather than to `ModularGameplayActors`-derived classes.

This action set is also the only one with an `EAS_` prefix rather than `LAS_` which I imagine is intended to illustrate that this is intentionally referring to `GameStateBase` rather than `LyraGameStateBase` for these particular injections.

### `GameStateBase` injections:

| Component | Parent Class | Tick Group | Scope |
| --- | --- | --- | --- |
| `B_ElimChainProcessor` | `UElimChainProcessor` < `UGameplayMessageProcessor` | `During Physics` | Server only |
| `B_ElimStreakProcessor` | `UElimStreakProcessor` < `UGameplayMessageProcessor` | `During Physics` | Server only |
| `AssistProcessor` (C++) | `UGameplayMessageProcessor` | `During Physics` |Server only |
| `B_AccoladeRelay` | `UGameplayMessageProcessor` | `During Physics` | Client + Server |


----------------------------------------------------------------------


## Experience Ability Sets


### `LyraPlayerState` injections:

| Component | Parent Class |
| --- | --- |
| `AbilitySet_Elimination` | `ULyraAbilitySet` |

### Ability Set: `AbilitySet_Elimination`

| Ability | Input Tag |
| --- | --- |
| `GA_ShowLeaderboard_TDM` | `InputTag.Ability.ShowLeaderboard` |
| `GA_AutoRespawn` | |


## Experience Component Injection


### `LyraGameState` injections:

| Component | Parent Class | Tick Group | Scope |
| --- | --- | --- | --- |
| `B_TeamDeathMatchScoring` | `B_ShooterGameScoringBase` | `During Physics` | Client + Server |
| `B_MusicManagerComponent_Elimination` | `B_MusicManagerComponentBase` | `During Physics` | Client |
| `B_ShooterBotSpawner` | `ULyraBotCreationComponent` | `During Physics` | Server |
| `B_TeamSetup_TwoTeams` | `ULyraTeamCreationComponent` | `During Physics` | Server |
| `B_TeamSpawningRules` | `UTDM_PlayerSpawningManagmentComponent` | `Pre Physics` | Server |

### `Controller` injections: *(Player + AI both)*

| Component | Parent Class | Tick Group | Scope |
| --- | --- | --- | --- |
| `B_PickRandomCharacter` | `ULyraControllerComponent_CharacterParts` | `During Physics` | Server |


## Experience Widgets

| Slot ID | Widget |
| --- | --- |
| `HUD.Slot.TeamScore` | `W_ScoreWidget_Elimination` |


----------------------------------------------------------------------


# Game Logic

## Logic from `LyraGameState` injections

### `B_TeamSetup_TwoTeams` logic

- Teams to Create:
  - 1 = `TeamDA_Red`
  - 2 = `TeamDA_Blue`

### `B_TeamSpawningRules` logic

- Try to find `ALyraPlayerStart` farthest from enemy teams

### `B_ShooterBotSpawner` logic

- Num Bots to Create: `3`
- Assign random bot names
- Bot Controller Class: `B_AI_Controller_LyraShooter` < `ULyraPlayerBotController`

### `B_AI_Controller_LyraShooter` logic

- BeginPlay:
  - `Wait for Experience Ready`, then:
    - `Run Behavior Tree` = `BT_Lyra_Shooter_Bot`
  - Register `OnDeathStarted` custom event on pawn's `Lyra Health Component`.`OnDeathStarted` event
- `OnPossess` event:
  - Start `BrainComponent` logic
  - Set `AIPerception` team ID
- `OnUnPossess` event:
  - Call `OnDeathStarted` custom event
- `OnDeathStarted` custom event:
  - Clear blackboard
  - Stop `BrainComponent` logic

### `B_TeamDeathMatchScoring` logic

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

### `B_MusicManagerComponent_Elimination` logic

- Set Is Menu = False
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


## Logic from `LyraPlayerController` injections


## `B_NiagaraNumberPopComponent` logic

Base class `ULyraNumberPopComponent`

- When damage is done/taken, briefly display a damage number

### `NameplateManagerComponent` logic

- Keep track of all actors needing nameplates
- Use `W_Nameplate` UI widget


## Logic from `Controller` injections


### `B_PickRandomCharacter` Logic

This component is injected into all `Controller`s for both Players and AI.

- `BeginPlay` event:
  - `AddCharacterPart` randomly choose either `B_Manny` or `B_Quinn` body parts
  - Minor bug: <problem>Does NOT call Parent BeginPlay</problem>
    - Seems like it will only be problematic if/when you allow users to change which pawns they possess

### `B_QuickBarComponent` logic

Base class `ULyraQuickBarComponent`

- Manage the 3 quick bar slots
  - which equipment is in which slot
- Allow swapping which equipment is active


## Logic from `B_Hero_ShooterMannequin` injections


### `NameplateSource` logic

- Begin Play:
  - Broadcast to other players that self should have a nameplate
  - Register for `Gameplay.Message.Nameplate.Discover` gameplay cues
    - When receiving one, respond and register self
- End Play:
  - Broadcast to other players to remove self as a nameplate object


## Logic from `GameStateBase` injections


### `B_ElimChainProcessor` logic

Base class `UElimChainProcessor`

- Keep track of how many players were eliminated since we last died.

### `B_ElimStreakProcessor` logic

Base class `UElimStreakProcessor`

- Keep track of long streaks of kills (5, 10, 15, 20).

### `AssistProcessor` logic

- Keep track of number of kill assists this player has.

### `B_AccoladeRelay` logic

- Listen for `Lyra.ShooterGame.Accolade` gameplay cues
- Do stuff RE accolades

