---
title: ""
description: ""
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: "Teams"
---

# Lyra Team System

### Components of the Lyra Team System

- [Lyra Team Agent Interface](./LyraTeamAgentInterface)
- [Lyra Team Creation Component](./LyraTeamCreationComponent) *(Game State Component)*
- [Lyra Team Display Asset](./LyraTeamDisplayAsset)
- [Lyra Team Info](./LyraTeamInfo)
- [Lyra Team Subsystem](./LyraTeamSubsystem)


## Conceptual Overview

Team-based Actors in your game must implement
[Lyra Team Agent Interface](./LyraTeamAgentInterface)
to be team-aware.  Lyra Characters, Player Controllers and Player States
all implement this interface, for example.

The Team Subsystem is typically initialized in Lyra via a Game Feature Action
(instantiated in the [Experience Definition](/UE5/LyraStarterGame/Experience/#LyraExperienceDefinition))
by injecting a [Lyra Team Creation Component](./LyraTeamCreationComponent) into the Game State.
For example, the quintessential Lyra Red vs Blue `B_TeamSetup_TwoTeams` in the example `ShooterCore` GFP.

The [Lyra Team Creation Component](./LyraTeamCreationComponent) handles assigning Teams
to players as they join the Game by hooking into `On GameMode Player Initialized`.
By default, Lyra assigns the player to the least populated team.

