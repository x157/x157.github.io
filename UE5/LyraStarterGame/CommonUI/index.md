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

- [Project Settings](./ProjectSettings)
- [Default UI Policy](./DefaultUIPolicy)


## UI Layers (Activatable Widget Stacks)

### `UI.Layer.Game`
- Things like the HUD.
- Layer Root is expected to be assigned by the Lyra Experience
  - Layer Root generally derives from [`LyraHUDLayout`](#LyraHUDLayout)

###### Example: `W_ShooterHUDLayout`
- Load `B_ShooterGame_Elimination` Experience
  - Activate `LAS_ShooterGame_StandardHUD` Action Set
    - Assign `UI.Layer.Game` = `W_ShooterHUDLayout`
    - Assign other widgets to slots defined by this HUD

### `UI.Layer.GameMenu`
- "Menus" specifically related to gameplay, like maybe an in game inventory UI.
- <todo>Find what uses this layer</todo>

### `UI.Layer.Menu`
- Things like the settings screen.
- Widgets get pushed to this layer by the `UI.Layer.Game` base class [`LyraHUDLayout`](#LyraHUDLayout)

### `UI.Layer.Modal`
- Confirmation dialogs, error dialogs.
- Managed by [Lyra UI Messaging Subsystem](./LyraUIMessagingSubsystem)


<a id="LyraHUDLayout"></a>
## Lyra HUD Layout
### `LyraHUDLayout` : public `LyraActivatableWidget` from `CommonUI`
```c++
/**
 * ULyraHUDLayout
 *
 *	Widget used to lay out the player's HUD (typically specified by an Add Widgets action in the experience)
 */
UCLASS(Abstract, BlueprintType, Blueprintable, Meta = (DisplayName = "Lyra HUD Layout", Category = "Lyra|HUD"))
class ULyraHUDLayout : public ULyraActivatableWidget
```

Widgets deriving from `LyraHUDLayout` will get native support to listen for
`UI.Action.Escape`
input tags and on each event push the BP-defined `EscapeMenuClass` to
`UI.Layer.Menu`

The `UI.Action.Escape` event is defined in [Project Settings](./ProjectSettings)


## Debugging

When you're wondering which widgets are currently active, you can use this console command to get
an output log dump from Common UI:

###### Console Debug command: `CommonUI.DumpActivatableTree`


