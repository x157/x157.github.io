---
title: "How to: Duplicate a Vehicle Template Blueprint into a Lyra Project"
description: "Procedure to duplicate a playable Vehicle Blueprint from Epic's Free Vehicle Template into your Lyra Project"
breadcrumb_path: "UE5/LyraStarterGame/Vehicles"
breadcrumb_name: "Duplicate Vehicle Templates"
---


# Duplicate Vehicle Templates

- `OffroadCar_Pawn`
- `SportsCar_Pawn`


# Rebase

- Make a Duplicate of `VehicleTemplate/Blueprints/OffroadCar/OffroadCar_Pawn`
  - Save it for example as `Blueprints/MyCustomOffroadCarPawn`
- "Reparent Blueprint" (rebase) the new custom BP `MyCustomOffroadCarPawn` onto `AXclWheeledVehicle` (your new C++ class)
