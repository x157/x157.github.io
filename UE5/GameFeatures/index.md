---
title: "UE5 GameFeature Plugins"
description: "What are GameFeature Plugins? How are they different from regular Plugins?"
breadcrumb_path: "UE5"
breadcrumb_name: "Game Features"
---


# GameFeature Plugins


A `GameFeature` Plugin is more like a *Mod* than like a traditional plugin.
Where a regular `Plugin` cannot access base game code,
a `GameFeature` plugin **CAN**.

Implementing the `ModulerGameplay` pattern in your game allows you to ship a basic game
that can choose **IF** and **WHEN**
to load custom `GameFeature` components at runtime.

Basing your `APlayerState`, `APlayerController`, `ACharacter`
and other classes on their respective `ModularGameplay` implementations
is required to get this to work.

(You can implement the `ModularGameplay` patterns yourself
into your existing code if you prefer to avoid a rebase onto `ModularGameplay` itself.)


## There is a default "Runtime" suffix that you can remove

By default when you create a `GameFeature` plugin in the UE5 editor, it will force
some parts of your `XistGame` project to use the name `XistGameRuntime` instead.

I asked for: `XistGame`

I received: `XistGame` (sometimes `XistGameRuntime` and `XISTGAMERUNTIME_API`)

#### How to: Remove the "Runtime" suffix

Follow this procedure:
[How to: Remove "Runtime" Suffix from GameFeature Plugin Code Names](./How-To-Remove-GameFeature-Runtime-Code-Suffix)

Now what I have is: `XistGame` (always `XistGame` and `XISTGAME_API`)



## LyraStarterGame Example

In LyraStarterGame, `ALyraPlayerState`, `ALyraPlayerController`, `ALyraCharacter`
and more are all based on the `ModularGameplay` plugin.

Take a look to see how it was done.

At runtime, the game knows all of the `GameFeature` plugins that are available, but
**it does not load or activate these plugins unless/until the game explicitly chooses to do so**.

In Lyra when you **Load an Experience** it will automatically load any `GameFeature` plugins
that experience depends on and then will launch the game into that map with that experience
and all of its runtime-loaded code/assets enabled.
