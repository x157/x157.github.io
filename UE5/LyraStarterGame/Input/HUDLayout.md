---
title: "Lyra HUD Layout"
description: "How the Lyra HUD Layout is configured and how it works"
breadcrumb_path: "UE5/LyraStarterGame/Input"
breadcrumb_name: "HUD Layout"
---

# Lyra HUD Layout

The Lyra HUD Layout Widget is intended to implement the root widget of an
[Activatable Widget](/UE5/CommonUI/ActivatableWidget) Container Layer
as defined by the
[Lyra UI Policy](./UIPolicy).

- This widget is **purely for Layout** purposes
  - There should be **no Blueprint Logic**, no events, no functions handled by Blueprints.
- Is a [Activatable Widget](/UE5/CommonUI/ActivatableWidget)
- Handles `Escape` key presses opening the Game Menu
  - Input mode seemingly must be in either `Game+UI` or `Menu` for this to work
- Allows big-picture placement and coordination of HUD elements
  - **Does** define what the UI widget spots are and how they relate to one another, visually and hierarchically
  - **Does not** define which widget classes implement each spot
    - Widgets can register to handle slots at runtime via the [UI Extension](/UE5/UIExtension/) plugin


## Example Lyra HUD Layouts

In Lyra:

- `W_DefaultHUDLayout`
- `W_FrontEndHUDLayout`

In Lyra Game Feature Plugins:

- `ShooterCore`/`W_ShooterHUDLayout`
- `TopDownArena`/`W_TopDownArenaHUDLayout`

