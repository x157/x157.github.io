---
title: "Unreal Engine 5 Notes"
description: General notes and thoughts about Unreal Engine 5 (UE5)
---


# Unreal Engine 5

At the moment I'm mostly focusing on understanding and extending the UE5
[Lyra Starter Game](./LyraStarterGame/).

As part of that effort I am also learning about UE5's
[Gameplay Ability System](./GameplayAbilitySystem/),
mostly in the context of its LyraStarterGame implementation.


# Windows Tips & Tricks


## Registry Key: `HKEY_CLASSES_ROOT\Unreal.ProjectFile`

This registry key configures the windows right click system menu options when you right-click on `.uproject` files.

![Example uproject Right Click Menu](./screenshots/uproject-right-click-example.png)

### Child Registry Keys

| Registry Key          | Sub-key   | Data                                                |
|-----------------------|-----------|-----------------------------------------------------|
| `shell\open`          |           | `Open`                                              |
| `shell\open`          | `command` | `UnrealVersionSelector.exe` `/editor` `"%1"`        |
|                       |           |                                                     |
| `shell\run`           |           | `Launch Game`                                       |
| `shell\run`           | `command` | `UnrealVersionSelector.exe` `/game` `"%1"`          |
|                       |           |                                                     |
| `shell\rungenproj`    |           | `Generate Visual Studio project files`              |
| `shell\rungenproj`    | `command` | `UnrealVersionSelector.exe` `/projectfiles` `"%1"`  |
|                       |           |                                                     |
| `shell\switchversion` |           | `Switch Unreal Engine version...`                   |
| `shell\switchversion` | `command` | `UnrealVersionSelector.exe` `/switchversion` `"%1"` |


### Default Root Directory

The default root is where you installed the Epic Games Launcher, or you can change this
if you have a custom engine:

    ... / Epic Games / Launcher / Engine / Binaries / ... / UnrealVersionSelector.exe
