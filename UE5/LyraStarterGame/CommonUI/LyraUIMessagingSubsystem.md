---
title: "Overview of Lyra UI Messaging Subsystem"
description: "Overview of ULyraUIMessagingSubsystem as configured in UE5 LyraStarterGame"
breadcrumb_path: "UE5/LyraStarterGame/CommonUI"
breadcrumb_name: Lyra UI Messaging Subsystem
---


# Lyra UI Messaging Subsystem

This is part of [How Common UI is Setup in LyraStarterGame](./).
Read that as well for more info.


## What is: Lyra UI Messaging Subsystem

The `LyraUIMessaging` subsystem is a derivative of `CommonMessagingSubsystem`,
a Local Player Subsystem provided by the `CommonGame` plugin.

The Lyra UI Messaging Subsystem provides these common capabilities:

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
