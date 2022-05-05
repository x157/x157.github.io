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

| Data Asset | Base Class |
| --- | --- |
| `Characters/B_XG_Character_Base` | `Lyra`:`Characters/Heros/B_Hero_Default` |
| `Characters/B_XG_Character_Humanoid` | `Characters/B_XG_Character_Base` |

Make sure you also take an extensive look at `ShooterCore`:`Game/B_Hero_ShooterMannequin` to see how Epic set up their player pawn.  There are things in there you likely don't need, but there are also things you'll most certainly want to copy/extend.

In XistGame, `B_XG_Character_Humanoid` is the player pawn.  It extends from `B_XG_Character_Base` which contains the pertinent parts of Epic's ShooterGame character.


### XistGame Player Pawn Inheritance

- `Lyra`:`Characters/Heros/B_Hero_Default`
  - `XistGame`:`Characters/B_XG_Character_Base`
    - `XistGame`:`Characters/B_XG_Character_Humanoid`


## Lyra Ability Set

| Data Asset | Base Class |
| --- | --- |
| `Characters/DA_XG_AbilitySet_Humanoid` | C++ `LyraAbilitySet` |

- Gameplay Abilities:
  - Granted Gameplay Abilities:
    - 0:
      - Ability: `Lyra`:`Characters/Heroes/Abilities/GA_Hero_Jump`
      - Ability Level: 1
      - Input Tag: `InputTag.Jump`


## Lyra Ability Tag Relationship Mapping

| Data Asset | Base Class |
| --- | --- |
| `Game/DA_XG_TagRelationships` | C++ `LyraAbilityTagRelationshipMapping` |

Note that XistGame doesn't actually use these, I'm just having them here as an example of the kinds of relationships tags can have since these actions make sense that they're cancelling/blocking whatever.  Feel free to leave the relationships blank if you really want a blank project, or keep these for the sake of illustration.

Just copy this and paste it into `Ability Tag Relationships` if you want the default 4.

```text
((AbilityTag=(TagName="Ability.Type.Action"),ActivationBlockedTags=(GameplayTags=((TagName="Status.Death.Dead"),(TagName="Status.Death.Dying")))),(AbilityTag=(TagName="Ability.Type.Action.Melee"),AbilityTagsToBlock=(GameplayTags=((TagName="Ability.Type.Action.Emote"))),AbilityTagsToCancel=(GameplayTags=((TagName="Ability.Type.Action.Emote")))),(AbilityTag=(TagName="Ability.Type.Action.Drop"),AbilityTagsToBlock=(GameplayTags=((TagName="Ability.Type.Action.Emote"))),AbilityTagsToCancel=(GameplayTags=((TagName="Ability.Type.Action.Emote")))),(AbilityTag=(TagName="Ability.Type.Action.Emote"),ActivationBlockedTags=(GameplayTags=((TagName="Movement.Mode.Falling")))))
```

- Ability
  - Ability Tag Relationships:
    - 0: `Ability.Type.Action`
      - Activation Blocked Tags:
        - `Status.Death.Dead`
        - `Status.Death.Dying`
    - 1: `Ability.Type.Action.Melee`
      - Ability Tags to Block
        - `Ability.Type.Action.Emote`
      - Ability Tags to Cancel
        - `Ability.Type.Action.Emote`
    - 2: `Ability.Type.Action.Drop`
      - Ability Tags to Block
        - `Ability.Type.Action.Emote`
      - Ability Tags to Cancel
        - `Ability.Type.Action.Emote`
    - 3: `Ability.Type.Action.Emote`
      - Activation Blocked Tags:
        - `Movement.Mode.Falling`


## Lyra Input Config

| Data Asset | Base Class |
| --- | --- |
| `Input/DA_XG_InputData_Humanoid` | C++ `LyraInputConfig` |

Duplicate `Lyra`:`Input/InputData_Hero` to your new file name, then edit it and remove any inputs you don't want.


## Lyra Pawn Data

| Data Asset | Base Class |
| --- | --- |
| `Characters/DA_XG_PawnData_Humanoid` | C++ `LyraPawnData` |

Configure this asset:

- Lyra
  - Pawn
    - Pawn Class: `B_XG_Character_Humanoid`
  - Abilities
    - Ability Sets:
      - 0: `DA_XG_AbilitySet_Humanoid`
    - Tag Relationship Mapping: `DA_XG_TagRelationships`
  - Input
    - Input Config: `DA_XG_InputData_Humanoid`
  - Camera
    - Default Camera Mode: `Lyra`:`CM_ThirdPerson`


## Input Mapping Context

| Data Asset | Base Class |
| --- | --- |
| `Input/IMC_XG_Default_KBM` | C++ `InputMappingContext` |

Duplicate `Lyra`:`Input/Mappings/IMC_Default_KBM`

Edit `IMC_XG_Default_KBM` and remove any of the default input mappings that you don't want/need in your game.


## Lyra Experience Action Set

| Data Asset | Base Class |
| --- | --- |
| `Experiences/LAS_XG_SharedInput` | C++ `LyraExperienceActionSet` |

Configure this asset:

- Actions to Perform
  - Actions
    - 0: `Add Input Mapping`
      - Input
        - Input Mappings
          - 0:
            - Input Mapping: `IMC_XG_Default_KBM`
            - Priority: 1
    - 1: `Add Input Binds`
      - Input
        - Input Configs
          - 0: `DA_XG_InputData_Humanoid`
- Feature Dependencies
  - Game Features to Enable
    - 0: `XistGame` (mod name)


## Gameplay Experience

| Data Asset | Base Class |
| --- | --- |
| `Experiences/B_XG_Experience_Dev` | C++ `LyraExperienceDefinition` |

Duplicate `ShooterCore`:`Experiences/B_ShooterGame_Elimination`

Configure this asset:

- Gameplay
  - Game Features to Enable:
    - 0: `XistGame` (mod name)
  - Default Pawn Data: `DA_XG_PawnData_Humanoid`
  - Action Sets:
    - 0: `LAS_XG_SharedInput`
- Actions
  - Actions: *(delete everything here, make it an empty array)*


## World: Dev Map

| Data Asset | Base Class |
| --- | --- |
| `Maps/L_DevMap` | C++ `World` |

Configure this asset (its `World Settings`):

- Game Mode
  - Default Gameplay Experience: `B_XG_Experience_Dev` (mod custom)

You don't need much here right now.  A plane, a light and a C++ `LyraPlayerStart` actor should do it.


# Next Step: ???

You should now have an empty level that you can play in PIE.  It will spawn in your character and you should have basic movement keybindings available.

[???](???)
or go back to [Lyra Starter Game](./)

