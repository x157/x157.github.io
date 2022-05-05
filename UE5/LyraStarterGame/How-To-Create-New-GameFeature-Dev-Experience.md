---
title: How to Create a GameFeature Experience
description: Create a new GameFeature Experience including all of its prerequisite data assets
back_links:
  - link: /UE5/
    name: UE5
  - link: /UE5/LyraStarterGame/
    name: LyraStarterGame
---


# Create Your Dev Experience

The first time you create an experience is the hardest.  It's much easier for additional ones as you can reuse a lot of the work you do here.

For this reason we'll start with the "Dev" experience, e.g. one you don't actually care about except to test that things are working.

**Note: Default objects need to be based on Lyra code rather than on vanilla engine code.**

The order in which you create these matters; some reference others.


## Player Pawn

In mod `Game` directory, make a base player pawn for your mod.

You'll likely want to derive your base pawn from Lyra's `Content\Characters\Heros\B_Hero_Default`.

Make sure you also take an extensive look at `ShooterCore/Content/Game/B_Hero_ShooterMannequin` to see how Epic set up their player pawn.  There are things in there you likely don't need, but there are also things you'll most certainly want to copy/extend.

In my game, `B_XG_Character_Humanoid` is the player's pawn.  It extends from `B_XG_Character_Base` which contains the pertinent parts of Epic's ShooterGame character.


### Example Player Pawn Inheritance

- `Lyra/Content/Characters/Heros/B_Hero_Default`
  - `XistGame/Content/Game/B_XG_Character_Base`
    - `XistGame/Content/Game/B_XG_Character_Humanoid`


### Lyra Ability Set

| Data Asset | Base Class |
| --- | --- |
| `Character/DA_XG_AbilitySet_Humanoid` | `LyraAbilitySet` |

- Gameplay Abilities:
  - Granted Gameplay Abilities:
    0.
      - Ability: `GA_Hero_Jump`
      - Ability Level: 1
      - Input Tag: `InputTag.Jump`


### LyraAbilityTagRelationshipMapping

| Data Asset | Base Class |
| --- | --- |
| `Game/DA_XG_TagRelationships` | `LyraAbilityTagRelationshipMapping` |

- Ability
  - Ability Tag Relationships
    0. `(AbilityTag=(TagName="Ability.Type.Action"),AbilityTagsToBlock=(GameplayTags=),AbilityTagsToCancel=(GameplayTags=),ActivationRequiredTags=(GameplayTags=),ActivationBlockedTags=(GameplayTags=((TagName="Status.Death.Dead"),(TagName="Status.Death.Dying"))))`
    1. `(AbilityTag=(TagName="Ability.Type.Action.Melee"),AbilityTagsToBlock=(GameplayTags=((TagName="Ability.Type.Action.Emote"))),AbilityTagsToCancel=(GameplayTags=((TagName="Ability.Type.Action.Emote"))),ActivationRequiredTags=(GameplayTags=),ActivationBlockedTags=(GameplayTags=))`
    2. `(AbilityTag=(TagName="Ability.Type.Action.Drop"),AbilityTagsToBlock=(GameplayTags=((TagName="Ability.Type.Action.Emote"))),AbilityTagsToCancel=(GameplayTags=((TagName="Ability.Type.Action.Emote"))),ActivationRequiredTags=(GameplayTags=),ActivationBlockedTags=(GameplayTags=))`
    3. `(AbilityTag=(TagName="Ability.Type.Action.Emote"),AbilityTagsToBlock=(GameplayTags=),AbilityTagsToCancel=(GameplayTags=),ActivationRequiredTags=(GameplayTags=),ActivationBlockedTags=(GameplayTags=((TagName="Movement.Mode.Falling"))))`


### Lyra Input Config

| Data Asset | Base Class |
| --- | --- |
| `Character/DA_XG_InputData_Humanoid` | `LyraInputConfig` |

Duplicate `Game/Content/Input/InputData_Hero` to your new file name, then edit it and remove any inputs you don't want.


### Lyra Pawn Data

In mod `Game` directory create a `LyraPawnData` data asset with a `DA_` name prefix.

I named mine `DA_XG_PawnData_Humanoid`

Configure this asset:

- Lyra
  - Pawn
    - Pawn Class: `B_XG_Character_Humanoid` (mod custom)
  - Abilities
    - Ability Sets:
      - Index 0 = `DA_XG_AbilitySet_Humanoid`
    - Tag Relationship Mapping: `DA_XG_TagRelationships`
  - Input
    - Input Config: `DA_XG_InputData_Humanoid` (default Lyra hero input)
  - Camera
    - Default Camera Mode: `CM_ThirdPerson` (default Lyra camera)


### Input Mapping Context

Duplicate `Game/Content/Input/Mappings/IMC_Default_KBM`

Rename it `Mod/Content/Input/IMC_XG_Default_KBM`

Edit `IMC_XG_Default_KBM` and remove any of the default input mappings that you don't want/need in your game.


### Lyra Experience Action Set

In mod `Experiences` directory create a `LyraExperienceActionSet` data asset with a `LAS_` name prefix.

I named mine `LAS_XG_SharedInput`

Configure this asset:

- Actions
  - Index 0: `Add Input Mapping`
    - Input
      - Input Mappings
        - Index 0:
          - Input Mapping: `IMC_XG_Default_KBM` (mod custom keybinds)
          - Priority: 1
  - Index 1: `Add Input Binds`
    - Input
      - Input Configs
        - Index 0: `DA_XG_InputData_Humanoid` (mod custom)
- Feature Dependencies
  - Game Features to Enable
    - Index 0: `XistGame` (mod name)


### Gameplay Experience

Duplicate `ShooterCore/Content/Experiences/B_ShooterGame_Elimination`

Name it `B_XG_Experience_Dev`

Configure this asset:

- Gameplay
  - Game Features to Enable:
    - Index 0: `XistGame` (mod name)
  - Default Pawn Data: `DA_XG_PawnData_Humanoid` (mod custom)
  - Action Sets: `LAS_XG_SharedInput` (mod custom)
  - Actions
    - Actions: *(delete everything here, make it an empty array)*


## Dev Map

In mod `Maps` directory create a new `World` map with a `L_` name prefix.

I named mine `L_DevMap`

Configure this asset (its `World Settings`):

- Game Mode
  - Default Gameplay Experience: `B_XG_Experience_Dev` (mod custom)

You don't need much here right now.  A plane, a light and a `LyraPlayerStart` actor should do it.


# GameFeature Dev Experience Complete

You should now have an empty level that you can play in PIE.  It will spawn in your character and you should have basic movement keybindings available.


[Continue your Lyra journey](./)

