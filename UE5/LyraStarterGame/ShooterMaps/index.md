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


## Interesting Maps

Common experience settings are further below, but 2 maps in particular warrant further investigation as they implement
two different types of experience.

- `L_Expanse` -- team death match (elimination) experience
- `L_Convolution_Blockout` -- team control point experience


## Other Maps

- `L_Expanse_Blockout`
- `L_FiringRange_WP`
  - Essentially a test map
  - Contains all the elements of the other maps, in a compact area, and the bots hit like kittens.
- `L_ShooterFrontendBackground`
  - This map is hard-coded into Lyra to be the front-end's lobby background scene.
  - Worth looking at to see how they did the cinematic camera sequence, if nothing else.


# Differences to `ShooterCore`

Because `ShooterCore` contains an elimination map similar to `L_Expanse`, I'll not cover that here.

Instead I'll focus on the `L_Convolution_Blockout` map which is a control point experience.


# Experience: `B_LyraShooterGame_ControlPoints`

- Activate `ShooterCore` GameFeature Plugin
  - Required because we're now in the `ShooterMaps` plugin, so `ShooterCore` is not active unless we activate it


## Pawn Data: `HeroData_ShooterGame`

*Same as Elimination experience*


## Action Sets

*Same as Elimination experience*


## Experience Ability Sets


### `LyraPlayerState` injections:

| Component                 | Parent Class      |
|---------------------------|-------------------|
| `AbilitySet_ControlPoint` | `ULyraAbilitySet` |

### Ability Set: `AbilitySet_Elimination`

| Ability                 | Input Tag                          |
|-------------------------|------------------------------------|
| `GA_ShowLeaderboard_CP` | `InputTag.Ability.ShowLeaderboard` |
| `GA_AutoRespawn`        |                                    |


## Experience Component Injection

### `LyraGameState` injections:

*Same as Elimination experience, except for:*

| Component                              | Parent Class                  | Tick Group       | Scope           |
|----------------------------------------|-------------------------------|------------------|-----------------|
| `B_ControlPoint_Scoring`               | `B_ShooterGameScoringBase`    | `During Physics` | Client + Server |
| `B_MusicManagerComponent_ControlPoint` | `B_MusicManagerComponentBase` | `During Physics` | Client          |


## Experience Widgets

| Slot ID               | Widget                       |
|-----------------------|------------------------------|
| `HUD.Slot.TeamScore`  | `W_CPScoreWidget`            |
| `HUD.Slot.ModeStatus` | `W_ControlPointStatusWidget` |


----------------------------------------------------------------------


# Game Logic

All the same logic happens as for the Elimination experience, except for the few components that were swapped out
above.


## Logic from `LyraGameState` injections

### `B_ControlPoint_Scoring` logic

todo

### `B_MusicManagerComponent_ControlPoint` logic

todo

