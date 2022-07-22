---
title: "Unreal Engine 5 Notes"
description: General notes and thoughts about Unreal Engine 5 (UE5)
---


# Unreal Engine 5

At the moment I'm mostly focusing on understanding and extending the UE5
[Lyra Starter Game](./LyraStarterGame/).

To understand Lyra, you also need an understanding of these UE5 plugins:

- [Common UI](./CommonUI/)
- Enhanced Input System *(todo)*
- [Gameplay Ability System](./GameplayAbilitySystem/)


# Video References

If you're looking to learn more about UE5, particularly related to
[LyraStarterGame](/UE5/LyraStarterGame/)
and related engine concepts, check out my video annotations:

#### Epic Developer Discussions

- [Common UI Annotations](./CommonUI/#Annotations)
- [LyraStarterGame Annotations](./LyraStarterGame/Epic-Games-Developer-Discussion-References)


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
