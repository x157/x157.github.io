---
title: "LAS_ShooterGame_StandardHUD"
description: "A look at the LAS_ShooterGame_StandardHUD Lyra Action Set, which instantiates an AddWidgets Game Feature Action"
breadcrumb_path: "UE5/LyraStarterGame/Input"
breadcrumb_name: "LAS_ShooterGame_StandardHUD"
---

# `LAS_ShooterGame_StandardHUD`

This is an example Game Feature Action
instantiation of a [Lyra HUD Layout](./HUDLayout)
in the `ShooterCore` GFP.

When loading the `ShooterCore` experiences, they list this Lyra Experience Action Set as one
of the Game Feature Actions to execute.

When the `Add Widgets` Game Feature Action executes, it:

- Pushes a new `W_ShooterHUDLayout` widget (a [Lyra HUD Layout](./HUDLayout)) onto the `UI.Layer.Game` UI Layer
- Creates appropriate widgets for each various `HUD.Slot.*` UI Extension Point, including:
  - `W_WeaponReticleHost` for the `HUD.Slot.Reticle` slot

### Lyra 5.2 Screenshot

[![LAS_ShooterGame_StandardHUD](./screenshots/LAS_ShooterGame_StandardHUD.png)](./screenshots/LAS_ShooterGame_StandardHUD.png)

