---
title: "UE5 GameFeature Plugins"
description: "What are GameFeature Plugins? How are they different from regular Plugins?"
breadcrumb_path: "UE5"
breadcrumb_name: "Game Features"
---


# GameFeature Plugins


A `GameFeature` Plugin (GFP) is more like a *Mod* than like a traditional plugin.
Where a regular `Plugin` **cannot** access base game code,
a `GameFeature` plugin **CAN**.

The benefit of using a `GameFeature` plugin is you can bundle together code
and assets that are all related to specific features that you may sometimes
want the player to access, and other times not.

For example, Fortnite uses GFPs to bundle seasonal content.
Alternatively, you can bundle optional DLCs that your player may or may not
have access to.

The code and assets bundled in the GFP are only ever loaded if/when your game
explicitly requests it.


## How to use GameFeaturePlugins in Your Game

To make GameFeaturePlugins easy to use, Lyra introduces the concept of the
[Lyra Experience](https://x157.github.io/UE5/LyraStarterGame/Experience/).

Long story short, when a map is loaded, it automatically loads the Lyra Experience
associated with that map, which then loads and initializes any GameFeaturePlugins
that are required for that Experience.

The GameFeaturePlugin loading procedure includes executing some
GameFeatureActions, which do things like inject components into actors
at runtime, configure input mappings and UI settings, etc.


## How to support GameFeaturePlugins

Implementing the [`Modular Gameplay`](/UE5/ModularGameplay/)
pattern in your game allows you to ship a basic game
that can choose **IF** and **WHEN**
to load custom `GameFeature` components at runtime.

Basing your `APlayerState`, `APlayerController`, `ACharacter`
and other classes on their respective `Modular Gameplay` implementations
is required to get this to work.

(You can implement the [`Modular Gameplay`](/UE5/ModularGameplay/) patterns yourself
into your existing code if you prefer to avoid a rebase onto
the default `ModularGameplayActors` implementation.)


### LyraStarterGame Example

In LyraStarterGame, `ALyraPlayerState`, `ALyraPlayerController`, `ALyraCharacter`
and more are all based on the `ModularGameplayActors` plugin.

At runtime, the game knows all of the `GameFeature` plugins that are available, but
**it does not load or activate these plugins unless/until the game explicitly chooses to do so**.

In Lyra when you **Load an Experience** it will automatically load any `GameFeature` plugins
that experience depends on and then will launch the game into that map with that experience
and all of its runtime-loaded code/assets enabled.

## Debugging Tip

Enable `LogGameFeatures` Verbose logging to gain visibility into when Game Feature Actions
are being run and what they are doing to your game objects.

Console Command: `Log LogGameFeatures Verbose`


## Miscellaneous

By default, when you create a `GameFeature` plugin in the UE5 editor, it will force
some parts of your `XistGame` project to use the name `XistGameRuntime` instead.

I asked for: `XistGame`

I received: `XistGame` (sometimes `XistGameRuntime` and `XISTGAMERUNTIME_API`)

Maybe there are great reasons for explicitly decorating your API name with RUNTIME,
but it was annoying me, so I modified it.

*You can only easily do this when you
first create your GFP. If you have a ton of assets already existing with the RUNTIME
name, you'd need to add some CoreRedirects and explicitly ReSave all of them.*

On a newly created GFP, to remove the RUNTIME name from your API,
follow this procedure:

[How to: Remove "Runtime" Suffix from GameFeature Plugin Code Names](./How-To-Remove-GameFeature-Runtime-Code-Suffix)

Now what I have is: `XistGame` (always `XistGame` and `XISTGAME_API`)
