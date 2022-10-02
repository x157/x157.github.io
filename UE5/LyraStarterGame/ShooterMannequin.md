---
title: "B_Hero_ShooterMannequin in Lyra's ShooterCore GameFeature Plugin"
description: "Description of Lyra's primary mannequin: B_Hero_ShooterMannequin"
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: "Shooter Mannequin"
---

# Deep Dive: Lyra's Shooter Mannequin

Lyra defines a "Shooter Mannequin" (`B_Hero_ShooterMannequin`) to be the base
character for the Lyra project.  This serves as both the player-controlled character
and the AI-controlled character.

I'm documenting this based on Lyra 5.1 which as of the time of writing still
has not yet been released.  If you're still on 5.0, the concepts here will all
be similar.

Note that I do not use `B_Hero_ShooterMannequin` in my game.  That would require me to declare
`ShooterCore` as a GFP dependency, which I do not wish to do.  Instead, I have my own base
character class that was constructed using `B_Hero_ShooterMannequin` as an example.
Thus, even though I'm not using this, it is still very important to understand what Epic is
doing with this class so I can pick and choose the pieces that are relevant to my game
for my character.

Quick Links:

- [Primary Blueprint Overview: `B_Hero_ShooterMannequin`](#ShooterMannequinOverview)
- [Key Concept: Pawn Extension System](#PawnExtensionSystem)
  - An implementation of the `ModularGameplay` Plugin
- Deep Dive into specific Blueprints:
  - [`B_Hero_ShooterMannequin`](#BP__B_Hero_ShooterMannequin)
  - [`B_Hero_Default`](#BP__B_Hero_Default)
  - [`B_Character_Default`](#BP__B_Character_Default)


--------------------------------------------------------------------------------

<a id="ShooterMannequinOverview"></a>
## Primary Blueprint Overview: `B_Hero_ShooterMannequin`

This is the primary BP we are interested in.  However, note that A LOT of functionality is implemented
in the base classes, both the base BPs and the base C++.  You need to understand ALL the base classes
and interfaces if you are to fully understand `B_Hero_ShooterMannequin`.

##### `B_Hero_ShooterMannequin` BP Inheritance

- BP Base `B_Hero_Default`
  - BP Base `Character_Default`
    - C++ Base `ALyraCharacter`

##### `ALyraCharacter` C++ Inheritance

- C++ Interface `IAbilitySystemInterface`
- C++ Interface `IGameplayCueInterface`
- C++ Interface `IGameplayTagAssetInterface`
- C++ Interface `ILyraTeamAgentInterface`
  - C++ Interface `IGenericTeamAgentInterface`
- C++ Base `AModularCharacter`
  - C++ Base `ACharacter`
    - C++ Base `APawn`
      - C++ Interface `INavAgentInterface`
      - C++ Base `AActor`
        - C++ Base `UObject`


### Controller-Injected C++ Component: `B_PickRandomCharacter`

In addition to the base classes, Lyra also injects a `B_PickRandomCharacter`
component into every `AController` at runtime.
For example see the `B_ShooterGame_Elimination` Experience Definition.

Thus, even though you won't see this explicitly attached to the controller or pawn in code,
at runtime this component WILL exist on the default Pawn controller.

This component is based on the C++ `ULyraControllerComponent_CharacterParts`.

This Controller Component acts in conjunction with the Pawn version of this
component (`ULyraPawnComponent_CharacterParts`).  If you are dealing with characters
comprised of different parts, like Lyra, you will want to read the underlying C++
for both the controller AND pawn versions of this component.  They're two parts of
the same system.

On Controller `BeginPlay`, a random body mesh is chosen (either Manny or Quinn)
by the controller component and assigned to the Pawn.
This is what makes the pawn randomly masculine or feminine
in physical appearance and animation style.


--------------------------------------------------------------------------------

<a id="PawnExtensionSystem"></a>
## Key Concept: Pawn Extension System

*NOTE: This is new in Lyra 5.1 and is a significant change from Lyra 5.0.  The 5.0 system
contained similar functionality, but it has been completely redesigned and refactored in 5.1.
If you worked on Character-based C++ code in 5.0, particularly related to the Pawn Extension Component,
this is likely to require some merging when you upgrade to 5.1. Armed with the information presented
here, it should take you a few hours or less.*

Lyra Characters are modularly constructed at runtime.  For this reason
**there can be no clearly defined initialization procedure**.
The character may have many optional components that depend on each other in different ways
that change over time.

As a developer you don't have any way to know which components will be injected at
runtime, yet you must still allow for them to initialize correctly,
each with their own dependencies, in whatever random order happens by chance at runtime.

Lyra solves this problem by implementing
[The `ModularGameplay` Plugin](/UE5/ModularGameplay/)
in the form of `ULyraPawnExtensionComponent`,
which is a part of every `ALyraCharacter`.


<a id="PawnExtensionComponent"></a>
### Lyra Pawn Extension Component

`ULyraPawnExtensionComponent` is the implementation of the
[`ModularGameplay` Plugin](/UE5/ModularGameplay/)'s
[`IGameFrameworkInitStateInterface`](/UE5/ModularGameplay/#GameFrameworkInitStateInterface)
functionality on a Pawn.

Giving this component to an Actor allows the other components on that actor
to share Init State updates with each other to satisfy runtime dependencies.
The components can hook into `Actor Init State Changed` events broadcast by this component
if/when they have runtime dependencies to satisfy.

Note that, though this is a component, there are some deep integrations in `ALyraCharacter`
for things like, for example, calling `ULyraPawnExtensionComponent`🡒`HandleControllerChanged`
from `ALyraCharacter`🡒`PossessedBy`.  If you want a deep understanding of what
this component is doing, make sure you read through `ALyraCharacter` as well.

##### `OnRegister`
- Register self with `ModularGameplay` plugin's `UGameFrameworkComponentManager`
  - Pawn Extension Component implements feature name `PawnExtension`

##### `BeginPlay`
- Bind `Actor Init State Changed` event to `ULyraPawnExtensionComponent`🡒`OnActorInitStateChanged`

##### Pawn Extension Component 🡒 `OnActorInitStateChanged`

- Every time a feature (**NOT** including the `PawnExtension` feature itself) changes state:
  - If new state == `DataAvailable`:
    - Run `CheckDefaultInitialization()` on all feature components

##### Pawn Extension Component :: `CheckDefaultInitialization`

This tells every component on the owner Actor that supports the
[`IGameFrameworkInitStateInterface`](/UE5/ModularGameplay/#GameFrameworkInitStateInterface)
to try to initialize.

This gets spammed A LOT during initialization.  This is a trigger that keeps getting
executed until all components have initialized successfully or finally fail to initialize.

##### Debugging Tip

The interesting logs related to the Pawn Extension System are made by the
`ModularGameplay` plugin's `IGameFrameworkInitStateInterface`.

It logs to `LogModularGameplay` with a lot of `Verbose` log messages.  Make sure you turn on
`Verbose` viewing for that log if you are trying to understand the flow of code via logs.


--------------------------------------------------------------------------------

<a id="BP__B_Hero_ShooterMannequin"></a>
# Blueprint: `B_Hero_ShooterMannequin`

## Components:

### » AimAssistTarget (`UAimAssistTargetComponent` via `ShooterCore` GFP)

- This component helps other pawns shoot at this one more accurately

### » PawnCosmeticsComponent (`ULyraPawnComponent_CharacterParts`)

- Broadcasts `On Character Parts Changed` Events
- BP `B_MannequinPawnCosmetics` defines 2 Body Meshes:

| Mesh Name | Animation Style | Body Style |
|-----------|-----------------|------------|
| Manny     | `Masculine`     | `Medium`   |
| Quinn     | `Feminine`      | `Medium`   |

The actual Gameplay Tags defined are `Cosmetic.AnimationStyle.*` and `Cosmetic.BodyStyle.*`

Anywhere that you want to know if you have a masculine or feminine character, you can simply
check the Pawn's Tags to, for example, animate a feminine character differently than a masculine one.


## Event Graph:

### `BeginPlay`
- (Async) Listen for Team Events:
  - Update cosmetics each time a different team is assigned
- Hide Actor in game
- (Async) Wait for `ULyraPawnExtensionComponent` State Change to `InitState.GameplayReady`, then:
  - Unhide Actor on next tick

### `Possessed`
- (Async) Wait for Experience Ready
  - (Async) Wait for Inventory Ready
    - Add Initial Inventory

### `ULyraPawnComponent_CharacterParts`.`OnCharacterPartsChanged`
- If pawn is on a Team:
  - Update team colors, assets, etc

### `ULyraHealthComponent`.`OnHealthChanged`
- On Server only:
  - Report Damage events to `AISense_Damage`

### Enhanced Input Action Triggers:
- Quick Slot 1
- Quick Slot 2
- Quick Slot 3
- Quick Slot +
- Quick Slot -

### `OnDeathFinished`
- Clear Inventory

### `OnReset`
- Clear Inventory

### `Set Emote Audio Component` from BI Emote Sound Interface
Not sure what this is or what this does.  Seems to be part of the emote system.  Requires investigation.


--------------------------------------------------------------------------------

<a id="BP__B_Hero_Default"></a>
# Blueprint: `B_Hero_Default`

## Components:

### » LyraHero (`ULyraHeroComponent`)
- Implements Player Input & Camera handling
- Implements `IGameFrameworkInitStateInterface`
- `OnRegister`
  - Register self with `ModularGameplay` plugin's `UGameFrameworkComponentManager`
    - Lyra Hero Component implements feature name `Hero`
- `BeginPlay`
  - Bind `Actor Init State Changed` to `ULyraHeroComponent`🡒`OnActorInitStateChanged`
- **Bug:** Intermittently binds player inputs twice
  - Does not seem to adversely affect Lyra, but you should fix this in your implementation
  - Intermittent ensure failures at `ULyraHeroComponent`::`InitializePlayerInput` near `ensure(!bReadyToBindInputs)`
    - There was a similar bug in 5.0

##### Lyra Hero Component 🡒 `OnActorInitStateChanged`

- When the `PawnExtension` feature state changes to `DataInitialized`:
  - Run `CheckDefaultInitialization()` on self

##### Lyra Hero Component :: `CheckDefaultInitialization`

- Tries to advance the init state from its current point to `InitState_GameplayReady`
- **NOTE:** Code is duplicated here from `ULyraPawnExtensionComponent`,
  including the definition of the Init State Chain, which is suboptimal.
  Expect changes.

### » AIPerceptionStimuliSource (`UAIPerceptionStimuliSourceComponent`)
- Auto-register these senses:
  - `AISense_Sight`
  - `AISense_Hearing`

### » LyraContextEffect (`ULyraContextEffectComponent`)
- Register Default Context Effects: `CFX_DefaultSkin`
  - Defines effects:
    - `AnimEffect.Footstep.Walk`: Concrete, Glass, Default
    - `AnimEffect.Footstep.Land`:  Concrete, Glass, Default

## Event Graph:

### `ULyraHealthComponent`.`OnDeathStarted`
- Play random death animation montage
- Unregister from AI Sense
  - **Bug:** Only unregisters from `AISense_Sight`, should also unregister from `AISense_Hearing`
    - Impact of this bug is zero if you destroy the pawn after it dies, as all senses are unregistered on destroy
- Delay `0.1`-`0.6` seconds » Ragdoll » Death


### `ULyraContextEffectComponent`.`AnimMotionEffect`
- Uses an external `B_FootStep` Actor to implement the `AninMotionEffect` event


## Interesting Variables:

- `Death Montages` = array of Anim Montages to play on character death


--------------------------------------------------------------------------------

<a id="BP__B_Character_Default"></a>
# Blueprint: `B_Character_Default`

This is a very simple BP.  It inherits from `ALyraCharacter` and:

- Set Capsule Component Navigation `Area Class Override` = `NavArea_Obstacle`

Essentially this is telling the navigation system that AI need to path AROUND
a `B_Character_Default` character rather than through it.
