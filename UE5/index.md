---
title: "Unreal Engine 5 Notes"
description: General notes and thoughts about Unreal Engine 5 (UE5)
---


# Unreal Engine 5

At the moment I'm mostly focusing on understanding and extending the UE5
[Lyra Starter Game](./LyraStarterGame/).

Ideally I'll add other notes to this page as well but for now, check that out.


# Windows Tricks RE UE5


## `HKEY_CLASSES_ROOT\Unreal.ProjectFile` Registry Key

This registry key configures the windows right click system menu options when you right click on `.uproject` files.

![Example uproject Right Click Menu](./screenshots/uproject-right-click-example.png)

You can configure exactly which version of UnrealVersionSelector is used, or see exactly what the paths and parameters are by inspecting these keys:

- `shell\run` ~ `UnrealVersionSelector.exe`
- `shell\rungenproj` ~ `UnrealVersionSelector.exe /projectfiles "%1"`
- `shell\switchversion` ~ `UnrealVersionSelector.exe`


# Excellent Video References

If you're looking to learn more about UE5, particularly related to LyraStarterGame
and related engine concepts, check out my
[Epic Games Developer Discussions](./LyraStarterGame/Epic-Games-Developer-Discussion-References)
annotations.
