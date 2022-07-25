---
title: "How Common UI is Setup in LyraStarterGame"
description: "Review of how Epic configured Common UI in LyraStarterGame"
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: CommonUI
---


# How Common UI is Setup in LyraStarterGame

This document describes how the `CommonUI` plugin is set up and used by `LyraStarterGame`.

For general information about `CommonUI`, see my [Common UI Overview](/UE5/CommonUI/).


## Default Game UI Policy / Layout
- In `DefaultGame.ini`:
  - Set Default UI Policy = `Content/UI/B_LyraUIPolicy`:
    - Set Default UI Layout = `Content/UI/W_OverallUILayout`

The Default Game UI Policy defines the base layout to use for all UI.

In Lyra, the UI Layout widget has no logic at all.  Instead of logic, it sets up
prioritized Layer Stacks that other activatable widgets can be pushed onto.

Lyra's `LyraUIManagerSubsystem` automatically instantiates a widget of the class
defined in `DefaultGame.ini` and adds it to the local player viewport.


### `DefaultGame.ini` Setting: `DefaultUIPolicyClass`

```ini
[/Script/LyraGame.LyraUIManagerSubsystem]
DefaultUIPolicyClass=/Game/UI/B_LyraUIPolicy.B_LyraUIPolicy_C
```

The above setting configures `LyraUIManagerSubsystem` to use the blueprint class
`Content/UI/B_LyraUIPolicy`
as the default UI Policy.

`B_LyraUIPolicy` then defines `W_OverallUILayout` as the base UI Layout widget.


## `W_OverallUILayout`: Overall UI Layout Widget

This widget defines 4 widget layer stacks:

- `UI.Layer.Game` - Things like the HUD.
- `UI.Layer.GameMenu` - "Menus" specifically related to gameplay, like maybe an in game inventory UI.
- `UI.Layer.Menu` - Things like the settings screen.
- `UI.Layer.Modal` - Confirmation dialogs, error dialogs.


## Project Settings: `Game` / `Common Input Settings`

Assign Project-wide UI Input Mappings:

`Input`.`Input Data` = `B_CommonInputData`

There is a lot of platform-specific input configuration in this section, for
`Android`, `HoloLens`, `IOS`, `Linux`, `LinuxArm64`, `Mac`, `TVOS` and `Windows`,
including both MKB and Gamepad input configs as appropriate.

For more details about how each platform is configured, see the
`Game` / `Common Input Settings`
section in `Project Settings`.


## `B_CommonInputData`
- Path: `Content/UI/B_CommonUIInputData`
- Base C++ class: `UCommonUIInputData`

#### Actions Defined:

| ID                   | Data Table            | Data Key         | Windows Default | Xbox Default | PS Default |
|----------------------|-----------------------|------------------|-----------------|--------------|------------|
| Default Click Action | `DT_UniversalActions` | `DefaultForward` | *None*          | (A)          | (O)        |
| Default Back Action  | `DT_UniversalActions` | `DefaultBack`    | `Escape`        | (B)          | (X)        |


Consider changing Default Click Action for MKB = ENTER key


## `DT_UniversalActions`
- Path: `Content/UI/DT_UniversalActions`
- Row type: `CommonInputActionDataBase`

This Data Table lists input actions that Common UI will react to.

There are some things defined here that I'm not sure why they're here.
Maybe they're used, maybe not.  Need to deep dive Lyra to find out.

The two that are **definitely** used are `DefaultForward` and `DefaultBack`.


## Project Settings: `Plugins` / `Common UI Editor`

There are a few settings here to configure the default Text, Button and Border style for the project.

| Default Style | Asset                                                 |
|---------------|-------------------------------------------------------|
| Text          | `Content/UI/Foundation/Text/TextStyle-Regular`        |
| Border        | *(None)*                                              |
| Button        | `Content/UI/Foundation/Buttons/ButtonStyle-Primary-M` |



## Project Settings: `Plugins` / `Common UI Input Settings`

`UI.Action.Escape` Action Tag assigned to:

- Keyboard `Escape` key
- Gamepad `Special Right` button


## Lyra HUD Layout Widget

The Experience is responsible for choosing the HUD Layout Widget.
The HUD Layout widget is pushed onto the `UI.Layer.Game` stack of the project's
overall UI layout `W_OverallUILayout`.

For example:

- `B_ShooterGame_Elimination` Experience:
  - Activate Action Set: `LAS_ShooterGame_StandardHUD`
    - Use `W_ShooterHUDLayout` widget as the `UI.Layer.Game` root
      - Assigns other widgets to slots defined on this HUD by Gameplay Tag
