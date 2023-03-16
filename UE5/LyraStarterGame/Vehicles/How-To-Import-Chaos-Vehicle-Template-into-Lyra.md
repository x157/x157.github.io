---
title: "How to: Import Chaos Vehicle Template into a Lyra Project"
description: "Procedure to import playable Vehicles from Epic's Free Vehicle Template into your Lyra Project"
breadcrumb_path: "UE5/LyraStarterGame/Vehicles"
breadcrumb_name: "Import Vehicle Content"
---

# Import Vehicle Content

- Start Epic Games Launcher
- New Project for your target Unreal Engine version
    - Choose "Vehicle" template
        - Store in (for example): `D:/Temp/Vehicle`
- `UEdit` the new Vehicle project

## With UEditor open:

"Migrate" these folders into your Lyra project:

- `Vehicles` **Required**
  - Offroad Car (PA, SKM, SM, AnimBP, CtrlRig) + Mats
  - Sports Car (PA, SKM, AnimBP, CtrlRig) + Mats
  - Physics Materials
- `VehicleTemplate` *(Optional Examples)*
  - Optional Example Blueprints:
    - Game Modes
    - Vehicle Controller
    - UI Widget
  - Suggestion: **Exclude** the `Maps` directory
    - It contains **100s** of World Partition actors we don't care about at all


# Move Migrated Vehicle Content into your Lyra Content GFP

- Open your Lyra project in UEditor
- Move the Migrated folders into your GFP:
    - `Vehicles`
    - `VehicleTemplate`
- Add `Plugins` dependency in your GFP's `.uplugin`:
    - `ChaosVehiclesPlugin`
      ```json
      "Plugins": [
          {
              "Name": "ChaosVehiclesPlugin",
              "Enabled": true
          }
      ]
      ```
