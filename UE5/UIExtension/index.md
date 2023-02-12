---
title: "UI Extension | UE5"
description: "Overview of the UE5 UI Extension Subsystem"
breadcrumb_path: "UE5"
breadcrumb_name: "UI Extension"
---

# UI Extension

The UI Extension Plugin is one of the [plugins distributed with Lyra](/UE5/LyraStarterGame/Plugins/).


## Core Concept

- UI Extension Points are abstract widget IDs
  - can be implemented by different Activatable Widget classes during Gameplay
  - allows definition of generic HUD Layouts that don't depend on specific widget assets


### Description

The UI Extension Plugin provides a Subsystem
to map `Extension Point` Gameplay Tags to Common UI `Activatable Widget`.

In this way you can access any widget you want/need via its `Extension Point`,
and it is organized into your HUD as defined by the parent layout.

For example, you can load in different Widget classes depending on the type of
`Lyra Experience` you load in a Game Feature Plugin.

Multiple game score widgets might share a HUD Slot ID `HUD.Slot.Score`,
but be a different widget depending on the Experience.


## Examples

Documented examples:

- [Lyra HUD Layout](/UE5/LyraStarterGame/Input/HUDLayout) in the `ShooterCore` GFP

See also:

- Front End HUD Layout
- Top Down Arena HUD Layout in the `TopDownArena` GFP
