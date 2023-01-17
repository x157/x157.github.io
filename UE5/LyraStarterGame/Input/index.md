---
title: "LyraStarterGame Input"
description: "Discussion of User Input handling in LyraStarterGame"
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: "Input"
---

# Lyra Input Overview

[Official Epic Lyra Input Docs](https://docs.unrealengine.com/5.1/en-US/lyra-input-settings-in-unreal-engine/)


##### Input Mode is managed by `CommonUI`

- In the Experience Definition, configure a HUD Layout to set the default Input Mode
  - [CommonUI](/UE5/LyraStarterGame/CommonUI/) manages **if (and *when*)** the input mode changes during gameplay
  - See [Example HUD Settings](#ExampleHUDSettings) screenshot

##### Player Input is mapped to Input Actions via a Lyra Experience Action Set

- In the Experience Definition, add a Lyra Experience Action Set with an `Add Input Config` action
  - Add input action mappings, for example to configure `SPACEBAR` taps to trigger the `IA_Jump` input action
  - This defines all the possible input actions the player can invoke
- There are other related Game Feature Actions, including `Add Input Binds` and `Add Input Mapping`
  - As of Lyra 5.1, `Add Input Config` seems to be the most generally useful, but check out the others to see what the differences are

##### Pawn Data's Input Config maps Input Actions to Input Tags

- In the Pawn Data definition for the Player's pawn, configure the Input Config
  - This is a map of **Input Actions** to `InputTag.*` Gameplay Tags
  - This is a list of all native inputs and ability inputs the Pawn will be able to respond to
- The `Native Input Actions` don't do anything at all unless you explicitly register for these and handle them in C++ code
  - TODO "How to add and use native input actions" tutorial
- The `Ability Input Actions` are used to automatically trigger abilities by GameplayTag

##### Lyra Hero Component activates the Native & Ability Input Actions for the Player Pawn

- For a pawn to receive player input, it **must** have a `ULyraHeroComponent` component
  - If you want custom input handling, you **must** derive from `ULyraHeroComponent`
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
    - This gets called during the pawn initialization process while transitioning to `InitState_DataInitialized`
  - This requires the player to be using `ULyraInputComponent` for input, which is configured in the [Project Settings](#ProjectSettings)


<a id='ProjectSettings'></a>
# Lyra Project Settings

`Config/DefaultInput.ini` defines (amongst other things):

```ini
[/Script/Engine.InputSettings]
DefaultPlayerInputClass=/Script/EnhancedInput.EnhancedPlayerInput
DefaultInputComponentClass=/Script/LyraGame.LyraInputComponent
```

- Enables Enhanced Input
- Sets `ULyraInputComponent` as the player's input component (it is derived from `UEnhancedInputComponent`)


# Examples

<a id='ExampleHUDSettings'></a>
## Example HUD Settings

This is one of the HUD Layouts that I use:

![Example HUD Settings](./screenshots/ExampleHUDSettings.png)

