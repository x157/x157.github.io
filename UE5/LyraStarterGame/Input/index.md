---
title: "LyraStarterGame Input"
description: "Discussion of User Input handling in LyraStarterGame"
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: "Input"
---

# Lyra Input Overview

Lyra combines different UE5 systems and plugins together
to coordinate a coherent input strategy.

For a 5 minute high level conceptual overview, see my YT video:
[UE5 Lyra Input Overview](https://youtu.be/mEIQDcW65qs)


<a id='KeyConcepts'></a>
## Key Concepts

- [Common UI](/UE5/CommonUI/) manages input mode changes during gameplay
  via [Common UI Action Router](/UE5/CommonUI/ActionRouter)
- [Enhanced Input](/UE5/EnhancedInput/) receives all input that is directed to the game,
  filtered by active [Input Mapping Contexts](/UE5/EnhancedInput/InputMappingContext)
- [UI Manager Subsystem](/UE5/LyraStarterGame/Input/UIManagerSubsystem) manages the
  [Lyra UI Policy](/UE5/LyraStarterGame/Input/UIPolicy)
  - defines UI Layers `UI.Layer.*` prioritized for input capture
- [Lyra HUD Layout](/UE5/LyraStarterGame/Input/HUDLayout) implements `UI.Layer.Game`, the Game HUD
- By default, Game Feature Actions like [`LAS_ShooterGame_StandardHUD`](./LAS_ShooterGame_StandardHUD) define:
  - which HUD Layout class to use
  - which Activatable Widget classes to instantiate for each UI Extension Point
- You can manage the addition/removal of other HUD Layouts and/or widgets during Gameplay
- You can override Native Player Input handling by [deriving from `ULyraHeroComponent`](#LyraHeroComponent)


<a id='InputHandlingOverview'></a>
## Input Handling Overview

Lyra uses [Common UI](/UE5/CommonUI/)
together with [Enhanced Input](/UE5/EnhancedInput/)
to manage Player Input.
Be familiar with both.

These UE5 plugins are integrated via the
[Lyra UI Policy](/UE5/LyraStarterGame/Input/UIPolicy),
which defines a HUD as being comprised of prioritized layers of
[Activatable Widgets](/UE5/CommonUI/ActivatableWidget).

The `Escape` key (the "back" button) activates the Game Menu widget,
which suspends Player Game Input while the menu is open, for example.

[Common UI](/UE5/CommonUI/)
controls if, when and how input makes it to the Game.
If/when you want to explicitly change input modes in your Game,
you must use the [Common UI Action Router](/UE5/CommonUI/ActionRouter) to do so.

When [Activatable Widgets](/UE5/CommonUI/ActivatableWidget) activate and deactivate,
they can optionally change the input mode and/or focus themselves for input
to support MKB, Gamepad, VR controllers, etc.
The settings are all customizable by input device and platform.

In particular, they should agree on the value of `Get Desired Input Config`,
hopefully via a shared implementation.

When no Activatable Widget is modifying the input mode, the input flows to
the Game itself via [Enhanced Input](/UE5/EnhancedInput/),
as triggered by any active [Input Mapping Contexts](/UE5/EnhancedInput/InputMappingContext)
at the given point in Playtime.


<a id='IMC'></a>
### Input Mapping Contexts (IMC)

[Input Mapping Context](/UE5/EnhancedInput/InputMappingContext)
management during Gameplay allows you to activate or deactivate any
given IMC based on the context.
For example, possessing a Vehicle or ejecting from it might change the active IMC
compared to movement on foot.

Lyra uses Game Feature Actions to initialize default IMCs, and you can add your own
IMC swapping logic to dynamically change inputs during Gameplay.


<a id='LyraHeroComponent'></a>
## Player Input is managed by the Lyra Hero Component

- If you want custom input handling, you **must** derive from `ULyraHeroComponent`

The Lyra Hero Component activates the Native & Ability Input Actions for the Player Pawn.

- For a pawn to receive player input, it **must** have a `ULyraHeroComponent` component
  - `ULyraHeroComponent` as a base class is required by Lyra, including but not limited to:
    - `ULyraGameplayAbility`
      - To manage ability camera modes
      - Also exposes the Hero Component to BPs that may use it for other reasons
    - Game Feature Actions having to do with input management:
      - `GameFeatureAction_AddInputBinding`
      - `GameFeatureAction_AddInputConfig`
      - `GameFeatureAction_AddInputContextMapping`
- `ULyraHeroComponent` works in conjunction with `ULyraPawnExtensionComponent` to activate the inputs on the pawn
  - Thus, the pawn must also have a `ULyraPawnExtensionComponent` and fully support the `IGameFrameworkInitStateInterface`
  - See `ULyraHeroComponent`::`InitializePlayerInput` for implementation details
    - This gets called during the pawn initialization process while transitioning to `InitState.DataInitialized`
  - This requires the player to be using `ULyraInputComponent` for input, which is configured in the [Project Settings](#ProjectSettings)


<a id='References'></a>
# References

- [Official Epic Lyra Input Docs](https://docs.unrealengine.com/5.1/en-US/lyra-input-settings-in-unreal-engine/)
- [ULyraSettingsLocal](/UE5/LyraStarterGame/ULyraSettingsLocal)

