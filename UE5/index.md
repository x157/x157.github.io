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

This registry key configures the windows right click system menu options when you right click on `.uproject` files.

![Example uproject Right Click Menu](./screenshots/uproject-right-click-example.png)

You can configure exactly which version of UnrealVersionSelector is used, or see exactly what the paths and parameters are by inspecting these keys:

- `shell\run` ~ `UnrealVersionSelector.exe`
- `shell\rungenproj` ~ `UnrealVersionSelector.exe /projectfiles "%1"`
- `shell\switchversion` ~ `UnrealVersionSelector.exe`

I used this info to make a shell script to clean my project, rebuild project files and then do a fresh clean build.


# Excellent Video References

If you're looking to learn more about UE5, particularly related to LyraStarterGame
and related engine concepts, check out my
[Epic Games Developer Discussions](./LyraStarterGame/Epic-Games-Developer-Discussion-References)
annotations.
