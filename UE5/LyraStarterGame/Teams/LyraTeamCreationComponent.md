---
title: ""
description: ""
breadcrumb_path: "UE5/LyraStarterGame/Teams"
breadcrumb_name: "Team Creation Component"
---

# Lyra Team Creation Component

Game State Component

C++ Class: `ULyraTeamCreationComponent`

The [Lyra Team Creation Component](./LyraTeamCreationComponent) handles assigning Teams
to players as they join the Game by hooking into `On GameMode Player Initialized`.
By default, Lyra assigns the player to the least populated team.

Note that Teams do not exist until the high priority On Experience Loaded
tasks have completed.

- High Priority `On Experience Loaded` Tasks:
  1. Create Teams
  2. Assign Players to Teams
