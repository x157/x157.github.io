---
title: "Common UI Activatable Widget"
description: "Overview of Common UI Activatable Widgets"
breadcrumb_path: "UE5/CommonUI"
breadcrumb_name: "Activatable Widget"
---

# Common UI Activatable Widget

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

<a id='GetDesiredCameraConfig'></a>
## Get Desired Camera Config

```c++
virtual TOptional<FUICameraConfig> GetDesiredCameraConfig() const;
```
