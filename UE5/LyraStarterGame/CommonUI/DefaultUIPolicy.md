---
title: "LyraStarterGame Default UI Policy"
description: "Review the UE5 INI setting that sets the Lyra Default UI Policy and the default settings configured there"
breadcrumb_path: "UE5/LyraStarterGame/CommonUI"
breadcrumb_name: Default UI Policy
---


# Lyra Default UI Policy Details

This is part of [How Common UI is Setup in LyraStarterGame](./).
Read that as well for more info.


## Default UI Policy

The Lyra UI Manager Subsystem implements a single global "UI Policy",
which ultimately is just a widget that defines prioritized widget container "layers".

Which widget to use is defined via a Blueprint class, as configured in the INI:

- In `DefaultGame.ini`:
    - Set Default UI Policy = `Content/UI/B_LyraUIPolicy`

### `DefaultGame.ini` Setting:

```ini
[/Script/LyraGame.LyraUIManagerSubsystem]
DefaultUIPolicyClass=/Game/UI/B_LyraUIPolicy.B_LyraUIPolicy_C
```

### Lyra UI Manager Subsystem

#### `LyraUIManagerSubsystem` : public `GameUIManagerSubsystem` from `CommonGame`

This subsystem manages the creation of the UI Layout widget and
adding it to the local player's viewport.
It also supports changing the UI Policy at runtime.
See its C++ code if you need to do that.


## Lyra UI Policy
### `B_LyraUIPolicy` : public `GameUIPolicy` from `CommonGame`

```cpp
UCLASS(Abstract, Blueprintable, Within = GameUIManagerSubsystem)
class COMMONGAME_API UGameUIPolicy : public UObject
```

This BP specifies a single global UI Layout Widget:

- In `B_LyraUIPolicy`:
  - Set `Game UI Policy` / `LayoutClass` = `Content/UI/W_OverallUILayout`

###### Set Overall UI Layout = `W_OverallUILayout`


## Overall UI Layout
### `W_OverallUILayout` : public `PrimaryGameLayout` from `CommonGame`

```cpp
/**
 * The primary game UI layout of your game.  This widget class represents how to layout, push and display all layers
 * of the UI for a single player.  Each player in a split-screen game will receive their own primary game layout.
 */
UCLASS(Abstract, meta = (DisableNativeTick))
class COMMONGAME_API UPrimaryGameLayout : public UCommonUserWidget
```

### Lyra UI Layers

The `W_OverallUILayout` widget defines 4 widget layer stacks:

- `UI.Layer.Game` - Things like the HUD.
- `UI.Layer.GameMenu` - "Menus" specifically related to gameplay, like maybe an in game inventory UI.
- `UI.Layer.Menu` - Things like the settings screen.
- `UI.Layer.Modal` - Confirmation dialogs, error dialogs.

## Common Activatable Widget Containers

`CommonUI` ships with both `Stack` and `Queue` containers,
and Lyra only uses `Stack` by default.

If you need something more complex than a `Stack` or `Queue`, you can derive
your own layer type by deriving from
`CommonUI` `UCommonActivatableWidgetContainerBase`.

### Common Activatable Widget Stack
#### `CommonActivatableWidgetStack` : public `UCommonActivatableWidgetContainerBase` from `CommonUI`
```cpp
/** 
 * A display stack of ActivatableWidget elements. 
 * 
 * - Only the widget at the top of the stack is displayed and activated. All others are deactivated.
 * - When that top-most displayed widget deactivates, it's automatically removed and the preceding entry is displayed/activated.
 * - If RootContent is provided, it can never be removed regardless of activation state
 */
UCLASS()
class COMMONUI_API UCommonActivatableWidgetStack : public UCommonActivatableWidgetContainerBase
```

You can create your own, more complex Layer type by sub-classing
`CommonActivatableWidgetContainerBase`.

All other widgets are `CommonActivatableWidget` derivatives, and rather than getting
added directly to the viewport, they get pushed onto one of the UI layer stacks.

### Common Activatable Widget Queue
#### `CommonActivatableWidgetQueue` : public `UCommonActivatableWidgetContainerBase` from `CommonUI`
```cpp
/** 
 * A display queue of ActivatableWidget elements. 
 *
 * - Only one widget is active/displayed at a time, all others in the queue are deactivated.
 * - When the active widget deactivates, it is automatically removed from the widget, 
 *		released back to the pool, and the next widget in the queue (if any) is displayed
 */
UCLASS()
class COMMONUI_API UCommonActivatableWidgetQueue : public UCommonActivatableWidgetContainerBase
```
