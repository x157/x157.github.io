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

- `UI.Layer.Game` - Things like the HUD.
- `UI.Layer.GameMenu` - "Menus" specifically related to gameplay, like maybe an in game inventory UI.
- `UI.Layer.Menu` - Things like the settings screen.
- `UI.Layer.Modal` - Confirmation dialogs, error dialogs.


## Experience-configured HUD Layout

The `UI.Layer.Game` layer root is expected to be assigned by the Lyra Experience.

For example in the `B_ShooterGame_Elimination` experience:

- Activate Action Set: `LAS_ShooterGame_StandardHUD`
  - Assign `UI.Layer.Game` = `W_ShooterHUDLayout`
    - Also assigns other widgets to slots defined by this HUD
