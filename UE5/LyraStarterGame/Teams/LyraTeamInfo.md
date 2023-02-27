---
title: "Lyra Team Info"
description: "Overview of Lyra Team Info, the info required to define and register a Team with the Lyra Team Subsystem"
breadcrumb_path: "UE5/LyraStarterGame/Teams"
breadcrumb_name: "Team Info"
---

# Lyra Team Info

Each team has both Public and Private info.


### Public Info

C++ Class: `ALyraTeamPublicInfo`

- Gameplay Tags
- [Team Display Asset](./LyraTeamDisplayAsset)
- *Override C++ Class to add your own additional properties...*

### Private Info

C++ Class: `ALyraTeamPrivateInfo`

- Gameplay Tags
- *Override C++ Class to add your own additional properties...*


## Lyra Team Info Base

C++ Class: `ALyraTeamInfoBase`

Both the Public and Private Info is based on this shared C++ class.

`ALyraTeamInfoBase` implements Replication for:

- Team ID
- Gameplay Tags
