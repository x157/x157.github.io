---
title: "LyraStarterGame Plugins"
description: "Plugins distributed in LyraStarterGame"
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: "Plugins"
---

# LyraStarterGame Plugins

Epic distributes several plugins via the `LyraStarterGame` sample project.
One way to use them is to base your new project on Lyra.

Another way is to export one or more of these modules to your existing project.

## `Async Mixin`

C++ utility class for managing asynchronous operations like loading.

For more info, see the comments in the C++ header `AsyncMixin.h`.

## `Common Game`

Adds a system for utilizing `CommonUI`'s `Activatable Widget Containers` as "Layers",
and providing functions to push widgets to certain layers.

This is help for having your HUD on one layer and pushing a setting or pause menu to a layer above it.

This also makes it easy to use Gamepads to navigate your UI Menus,
as they are all constructed using `CommonUI` `Activatable Widgets`
in various `Container` layers.

## `Common Loading Screen`

Adds base classes and settings for handling a loading screen.

I haven't looked into this plugin much, but from what I can remember you can also add an interface
(`ILoadingProcessInterface`) to any class to show the loading screen when something needs to be loaded.

## `Common User`

The Common User plugin provides a common interface between C++,
Blueprint Scripting, and the 
[Online Subsystem](https://docs.unrealengine.com/5.1/en-US/online-subsystem-in-unreal-engine/)
(OSS) or other online backends.
It is a standalone plugin that can be used in any project.

[Official Epic Docs: Common User Plugin](https://docs.unrealengine.com/5.1/en-US/common-user-plugin-in-unreal-engine-for-lyra-sample-game/)

Provides `Common User Subsystem`, `Common Session Subsystem` and a `Common User Initialize` async action.

## `Gameplay Message Router`

Adds a system for you to broadcast and receive events across the game by Gameplay Tag,
optionally including a custom struct with event data.

An example is if you kill someone it could broadcast an event under a specific tag
that provides the name of the person you killed, and a UI widget could receive that
event to display the kill.

These events are local-player-only, a nice compliment to Gameplay Ability System's
`Gameplay Event` which is replicated over the network.
The two systems are roughly analogous,
`Gameplay Message Subsystem` being local-client only scope
and `Gameplay Event` with network client scope.

## `Game Settings`

Adds base classes for handling a settings screen in your project.

It builds off of `CommonUI`'s `ActivatableWidgets`,
so it will be using that system for its base screen classes.

Something to note is all the settings data is declared in C++,
meaning designers won't be able to expand upon it without engineering help. 

## `Game Subtitles`

Provides `Subtitle Display Subsystem`

## `Lyra Example Content`

Content-only plugin with some Lyra assets.

## `Lyra Ext Tool`

Adds `EUW_MaterialTool`, an editor widget seemingly useful in the Lyra Material editor.

Also adds a BP function `Change Mesh Materials`, which
explicitly invokes `PostEditChange` when meshes change.

## `Modular Gameplay Actors`

Base classes that allow for Game Feature Plugins to have the ability to load
components, widgets, etc at runtime.

All of Lyra's base classes are themselves based on `Modular Gameplay Actors`.

[Overview of a `ModularGameplay` Plugin](/UE5/ModularGameplay/) 

## `Pocket Worlds`

This plugin allows for easy streaming of levels.

It is designed as a cleaner, compact solution for the classic way to render 3D characters in menus,
which usually implies loading a map outside the normal gameplay boundaries.

Excellent `Pocket Worlds` Example and documentation:

[https://gitlab.com/IsmaFilo/pocketworldexample](https://gitlab.com/IsmaFilo/pocketworldexample)

## `UIExtension`

Provides a map of `Extension Point` Gameplay Tag to `Activatable Widget`.

In this way you can access any widget you want/need via its `Extension Point`,
and it is organized into your HUD as defined by the parent layout.

For example, you can load in different Widget classes depending on the type of
`Lyra Experience` you load in a Game Feature Plugin.
The score might go into the same location on the HUD, but be a different
widget depending on the Experience.

# Thank you!

Special thanks to [Cade](https://twitter.com/CadeEvs) on
[benui's Discord](https://discord.benui.ca/)
who provided some excellent descriptions of many of these modules.
