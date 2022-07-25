---
title: "Overview of Lyra UI Messaging Subsystem"
description: "Overview of ULyraUIMessagingSubsystem as configured in UE5 LyraStarterGame"
breadcrumb_path: "UE5/LyraStarterGame/CommonUI"
breadcrumb_name: Lyra UI Messaging Subsystem
---


# Lyra UI Messaging Subsystem

This is part of [How Common UI is Setup in LyraStarterGame](./).
Read that as well for more info.


## Lyra UI Messaging Subsystem

### `LyraUIMessagingSubsystem` : public `CommonMessagingSubsystem` from `CommonGame`

The Lyra UI Messaging Subsystem manages the `UI.Layer.Modal` layer of the UI Layout.

This subsystem provides these common capabilities:

- Show Confirmation Dialog
- Show Error Dialog

The widget classes to use are defined by INI settings.
They **must** be derivatives of `CommonGameDialog`, which is itself a `CommonActivatableWidget`.


### `DefaultGame.ini` Settings for Lyra UI Messaging Subsystem
```ini
[/Script/LyraGame.LyraUIMessaging]
ConfirmationDialogClass=/Game/UI/Foundation/Dialogs/W_ConfirmationDefault.W_ConfirmationDefault_C
ErrorDialogClass=/Game/UI/Foundation/Dialogs/W_ConfirmationError.W_ConfirmationError_C
```
