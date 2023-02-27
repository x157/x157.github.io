---
title: "Lyra Team Agent Interface"
description: "Overview of the Lyra Team Agent Interface, used by the Lyra Team Subsystem to manage the Team of an Actor"
breadcrumb_path: "UE5/LyraStarterGame/Teams"
breadcrumb_name: "Team Agent Interface"
---

# Lyra Team Agent Interface

C++ Interface: `ILyraTeamAgentInterface`

This interface is used by the 
[Lyra Team Subsystem](./LyraTeamSubsystem)
to manage which Team any given Actor is on.

Actors must implement this interface to participate in the Lyra Team System.

This interface is derived from
`IGenericTeamAgentInterface` *(via the `AI Module` plugin)*,
adding some functionality:

- On Team Changed Event
- Get Team Attitude Towards other Actor
- Get/Set Team Id


## Lyra Classes implementing Lyra Team Agent Interface

- Lyra Character
- Lyra Local Player
- Lyra Player Bot Controller
- Lyra Player Controller
- Lyra Player State
