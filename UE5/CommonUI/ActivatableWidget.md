---
title: "Common UI Activatable Widget"
description: "Overview of Common UI Activatable Widgets"
breadcrumb_path: "UE5/CommonUI"
breadcrumb_name: "Activatable Widget"
---

# Common UI Activatable Widget

`CommonActivatableWidget` should be used as the base class for most of your widgets.

Activatable Widgets are often not deleted, instead they're reused.
`OnActivated` and `OnDeactivated` can be called often in a single lifetime of the widget.

Common use cases for an Activatable Widget are

- Sleep deactivated, listening for Gameplay Events, activating on specific events
- Be active and responsive to in game events, perhaps deactivating at some point
- The [Lyra HUD Layout](/UE5/LyraStarterGame/Input/HUDLayout) is an Activatable Widget


### Is Activated?

```c++
UFUNCTION(BlueprintCallable, Category = ActivatableWidget)
bool IsActivated() const { return bIsActive; }
```


## Activate Widget

```c++
UFUNCTION(BlueprintCallable, Category = ActivatableWidget)
void ActivateWidget();
```

### OnActivated

```c++
UFUNCTION(BlueprintImplementableEvent, Category = ActivatableWidget, meta = (DisplayName = "On Activated"))
void BP_OnActivated();

virtual void NativeOnActivated();
```


## Deactivate Widget

```c++
UFUNCTION(BlueprintCallable, Category = ActivatableWidget)
void DeactivateWidget();
```

### OnDeactivated

```c++
UFUNCTION(BlueprintImplementableEvent, Category = ActivatableWidget, meta = (DisplayName = "On Deactivated"))
void BP_OnDeactivated();

virtual void NativeOnDeactivated();
```


<a id='GetDesiredInputConfig'></a>
## Get Desired Input Config

```c++
/**
 * Gets the desired input configuration to establish when this widget activates
 * and can receive input (i.e. all parents are also active).
 *
 * This configuration will override the existing one established by any previous
 * activatable widget and restore it (if valid) upon deactivation.
 */
virtual TOptional<FUIInputConfig> GetDesiredInputConfig() const;
```

The return value of `GetDesiredInputConfig` is vital to standardize and
coordinate in your project.

Having different widgets return different values for this could potentially
be a difficult situation to debug.

The result of this function is sent to the
[Common UI Action Router](/UE5/CommonUI/ActionRouter)
to explicitly set the game input mode when this widget is activated.


<a id='GetDesiredFocusTarget'></a>
## Get Desired Focus Target

```c++
/**
 * Override to provide the desired widget that should receive focus
 * when this becomes the primary active widget.
 *
 * If bAutoRestoreFocus is true, is only called when there is no
 * valid cached restoration target (to provide the default/fallback).
 */
virtual UWidget* NativeGetDesiredFocusTarget() const;
```

You likely need to tell Common UI which widget should be focussed when a given widget is activated.
The most likely return value is `this` or `self`, e.g. focus the widget that was most recently activated.

If you override this in C++, this BP version of this function will not be called
unless you explicitly call it yourself.

This seems to be particularly important when using non-pointer input devices for menu navigation,
like Gamepad buttons or Keyboard keys.

<a id='GetDesiredCameraConfig'></a>
## Get Desired Camera Config

```c++
virtual TOptional<FUICameraConfig> GetDesiredCameraConfig() const;
```
