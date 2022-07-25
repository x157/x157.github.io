---
title: "How Common UI is Setup in LyraStarterGame"
description: "Review of how Epic configured Common UI in LyraStarterGame"
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: CommonUI
---


# How Common UI is Setup in LyraStarterGame


## Project Settings: Common Input Settings

Assign Project-wide UI Input Mappings:

`Input Data` = `B_CommonInputData`


## B_CommonInputData
- Path: `Content/UI/B_CommonUIInputData`
- Base C++ class: `UCommonUIInputData`

#### Actions Defined:

| ID                   | Data Table            | Data Key         | Windows Default | Xbox Default | PS Default |
|----------------------|-----------------------|------------------|-----------------|--------------|------------|
| Default Click Action | `DT_UniversalActions` | `DefaultForward` | *None*          | (A)          | (O)        |
| Default Back Action  | `DT_UniversalActions` | `DefaultBack`    | `Escape`        | (B)          | (X)        |


Consider changing Default Click Action for MKB = ENTER key


## DT_UniversalActions
- Path: `Content/UI/DT_UniversalActions`
- Row type: `CommonInputActionDataBase`

This Data Table lists input actions that Common UI will react to.

There are some things defined here that I'm not sure why they're here.
Maybe they're used, maybe not.  Need to deep dive Lyra to find out.

The two that are **definitely** used are `DefaultForward` and `DefaultBack`.


## Lyra HUD Layout Widget

The Experience is responsible for choosing the HUD Layout Widget.
For example:

- `B_ShooterGame_Elimination` Experience:
  - Activate Action Set: `LAS_ShooterGame_StandardHUD`
    - Use `W_ShooterHUDLayout` widget as the `UI.Layer.Game` root
    - Assigns other widgets to slots by Gameplay Tag
