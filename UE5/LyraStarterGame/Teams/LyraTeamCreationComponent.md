---
title: "Lyra Team Creation Component"
description: "Overview of the Lyra Team Creation Component, which is responsible for creating and managing Teams for the Game State"
breadcrumb_path: "UE5/LyraStarterGame/Teams"
breadcrumb_name: "Team Creation Component"
---

# Lyra Team Creation Component

C++ Class: `ULyraTeamCreationComponent`
*(Game State Component)*

The [Lyra Team Creation Component](./LyraTeamCreationComponent) handles assigning Teams
to players as they join the Game by hooking into Lyra's custom
`OnGameModePlayerInitialized` event.
By default, Lyra assigns the player to the least populated team.

**Note that Teams are not created until the high priority On Experience Loaded
tasks have completed.**

Any actors that want to be team-aware must also be Experience-aware,
and wait for [On Experience Loaded](/UE5/LyraStarterGame/Experience/#OnExperienceLoaded) before trying to
do anything other than basic Actor initialization.


## High Priority `On Experience Loaded` Tasks

1. Create Teams
2. Assign Players to Teams

**Notice: If you have code that requires Teams, you must wait until *AFTER*
the High Priority `On Experience Loaded` tasks have all fired.**

That is, you cannot have a high priority task yourself that depends on Teams.
The order of high priority callbacks is random, so your task may be called before the teams exist.

If you need to use the Team System, the Normal Priority `On Experience Loaded`
is the earliest time that you can reliably do so.
