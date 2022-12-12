---
title: "Modular Gameplay | Unreal Engine 5"
description: "Overview of UE5's ModularGameplay Plugin"
breadcrumb_path: "UE5"
breadcrumb_name: "Modular Gameplay"
---

# `Modular Gameplay` Plugin Overview

A `Modular Gameplay` Plugin is a plugin whose base classes implement the `Modular Gameplay` pattern,
which allows [Lyra](/UE5/LyraStarterGame/) (and your project!)
to inject components into actors at runtime.

This pattern gives the game support for
[`GameFeature` Plugins](/UE5/GameFeatures/).

The `ModularGameplayActors` Plugin is a specific implementation of `Modular Gameplay`,
distributed in Lyra.

You can either (like [LyraStarterGame](/UE5/LyraStarterGame/))
actually base your classes on the `ModularGameplayActors` classes,
or you can implement the same patterns in your own existing base classes.


<a id="GameFrameworkComponentManager"></a>
## Game Framework Component Manager

`UGameFrameworkComponentManager` « `UGameInstanceSubsystem`

This Game Instance Subsystem is what allows Lyra to inject components into Actors at runtime.

Actors must explicitly opt-in to this behavior.
Epic publishes the `ModularGameplayActors` plugin with `LyraStarterGame` as an easy set of base
classes to automate this opt-in process, but you don't necessarily
have to base your classes on those.
You can duplicate the procedure in your own classes if you prefer.

For example take a look at this code from `LyraStarterGame`:

- `Plugins/ModularGameplayActors/Source/ModularGameplayActors/Public/ModularCharacter.h`
- `Plugins/ModularGameplayActors/Source/ModularGameplayActors/Public/ModularPlayerController.h`
- `Plugins/ModularGameplayActors/Source/ModularGameplayActors/Public/ModularPlayerState.h`
- ... etc ...


<a id="GameFrameworkInitStateInterface"></a>
## Game Framework Init State Interface

`IGameFrameworkInitStateInterface` must be implemented by any Component that needs to initialize
based on dependencies that themselves are other Components with their own dependent initialization steps.

TLDR every component in the Game Framework spams `Init()` until everything has successfully initialized
or has finally failed initialization.


## Implementation in Lyra 5.1: Pawn Extension

To implement the `Modular Gameplay` Plugin, take a look at Lyra as an example.
Lyra implements this module by:

- Defines the `ULyraPawnExtensionComponent` that drives `IGameFrameworkInitStateInterface`
  - Adds this component to every Character in the game (via base class `B_Hero_Default`)
- Implements `IGameFrameworkInitStateInterface` in other components as needed

For more information, see:

- [Lyra Pawn Extension System](/UE5/LyraStarterGame/ShooterMannequin#PawnExtensionSystem)
- [Lyra Pawn Extension Component](/UE5/LyraStarterGame/ShooterMannequin#PawnExtensionComponent)

The above links will hopefully help illustrate how the various components 
in Lyra's ShooterGame Mannequin are able to initialize in an appropriate order
when they have dependencies on one another.
