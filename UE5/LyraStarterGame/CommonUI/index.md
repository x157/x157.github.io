---
title: "How Common UI is Setup in LyraStarterGame"
description: "Review of how Epic configured Common UI in LyraStarterGame"
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: Common UI
---


# How Common UI is Setup in LyraStarterGame

This document describes how the `CommonUI` plugin is set up and used by `LyraStarterGame`.

For general information about `CommonUI`, see my [Common UI Overview](/UE5/CommonUI/).

## Overall UI Layout

### Lyra Specific Settings

- [Project Settings](./ProjectSettings)
- [Default UI Policy](./DefaultUIPolicy)

### UI Layers (Activatable Widget Stacks)

#### `UI.Layer.Game`
- Things like the HUD.
- Layer Root is expected to be assigned by the Lyra Experience

###### Example: `W_ShooterHUDLayout`
- `B_ShooterGame_Elimination` Experience
  - Activate `LAS_ShooterGame_StandardHUD` Action Set
    - Assign `UI.Layer.Game` = `W_ShooterHUDLayout`
    - Assign other widgets to slots defined by this HUD

#### `UI.Layer.GameMenu`
- "Menus" specifically related to gameplay, like maybe an in game inventory UI.

#### `UI.Layer.Menu`
- Things like the settings screen.

#### `UI.Layer.Modal`
- Confirmation dialogs, error dialogs.

###### Managed by `LyraUIMessagingSubsystem`
- [Lyra UI Messaging Subsystem](./LyraUIMessagingSubsystem)
  - Confirmation Dialog
  - Error Dialog
