---
title: Create a UE5 GameFeature Plugin for LyraStarterGame
description: Describes the procedure by which to create a new UE5 GameFeature Plugin for Lyra Starter Game (LyraStarterGame)
back_links:
  - link: /UE5/
    name: UE5
  - link: /UE5/LyraStarterGame/
    name: LyraStarterGame
---


# Create a UE5 GameFeature Plugin

To make a game based on Lyra, you need to create a GameFeature Plugin in your LyraStarterGame project.

There isn't anything particularly special about this plugin except it must go into the `Plugins/GameFeatures` directory.


## How to Create a UE5 GameFeature Plugin for Lyra

With the LyraStarterGame project open in the UE5 editor, follow these steps:

- UE5 Editor Menu: `Edit` > `Plugins`
- Click `+ Add` button
- Choose `Game Feature (with C++)` template
- Name Plugin (I called mine `XistGame`)
- Click `Create Plugin` button

When you create this, it will supply you with an initial, mostly empty `GameFeatures.GameFeatureData` data asset, named after your game.


## Add Dependencies to Other Plugins

*This step is optional*.  You only need to do this if you want to extend your game from the base `ShooterCore`.
If your game will not use any `ShooterCore` content at all, you can skip this step.

- Open your `XistGame` data asset (whatever you named your plugin).
- Change the `Current State` of your plugin to `Registered` (by default it should be `Active`)
- Click the `Edit Plugin` button
- Scroll to the bottom where it lists `Dependencies`
  - Add dependency for `ShooterCore`
  - Add dependency for `LyraExampleContent`
  - `Save` button
- Change plugin `Current State` back to `Active`
- `Save` data asset


## Initial Plugin Contents

Your plugin now contains minimal default content.  There is the uplugin definition, the `GameFeatures.GameFeatureData` uasset config, an icon and
required boilerplate C++ code.

### Plugins/GameFeatures/XistGame directory list
```text
XistGame
├── Content
│   └── XistGame.uasset
├── Resources
│   └── Icon128.png
├── Source
│   ├── XistGameRuntime
│   │   ├── Private
│   │   │   └── XistGameRuntimeModule.cpp
│   │   └── Public
│   │       └── XistGameRuntimeModule.h
│   └── XistGameRuntime.Build.cs
└── XistGame.uplugin
```


## Next Step: Configure Asset Manager

Now that you have a plugin, you need to configure Asset Manager so that it knows where to find your game's components.

[Configure Asset Manager](./How-To-Configure-AssetManager-for-GameFeature-Plugins)
or go back to [Lyra Starter Game](./)


## Want more info?

More information RE creating a GameFeature Plugin can be obtained by watching some of the
[Epic Games developer discussions](./Epic-Games-Developer-Discussion-References)
that I have annotated.
