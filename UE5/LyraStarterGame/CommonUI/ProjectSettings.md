---
title: "LyraStarterGame Project Settings for Common UI implementation"
description: "List of Common UI specific Project Settings found in LyraStarterGame"
breadcrumb_path: "UE5/LyraStarterGame/CommonUI"
breadcrumb_name: Project Settings
---


# Lyra Project Settings related to Common UI

This is part of [How Common UI is Setup in LyraStarterGame](./).
Read that as well for more info.


# Project Settings: `Plugins` / `Common UI Input Settings`

`UI.Action.Escape` Action Tag assigned to:

- Keyboard `Escape` key
- Gamepad `Special Right` button


# Project Settings: `Game` / `Common Input Settings`

Assign Project-wide UI Input Mappings:

`Input`.`Input Data` = `B_CommonInputData`

There is a lot of platform-specific input configuration in this section, for
`Android`, `HoloLens`, `IOS`, `Linux`, `LinuxArm64`, `Mac`, `TVOS` and `Windows`,
including both MKB and Gamepad input configs as appropriate.

For more details about how each platform is configured, see the
`Game` / `Common Input Settings`
section in `Project Settings`.


# Common Input Data
### `B_CommonInputData` : public `UCommonUIInputData` from `CommonUI`

| ID                   | Data Table            | Data Key         | Windows Default | Xbox Default | PS Default |
|----------------------|-----------------------|------------------|-----------------|--------------|------------|
| Default Click Action | `DT_UniversalActions` | `DefaultForward` | *None*          | (A)          | (O)        |
| Default Back Action  | `DT_UniversalActions` | `DefaultBack`    | `Escape`        | (B)          | (X)        |


Consider changing Default Click Action for MKB = ENTER key


# Universal Actions Data Table
### `DT_UniversalActions` : public `CommonInputActionDataBase` from `CommonUI`

This Data Table lists input actions that Common UI will react to.

There are some things defined here that I'm not sure why they're here.
Maybe they're used, maybe not.  Need to deep dive Lyra to find out.

The two that are **definitely** used are `DefaultForward` and `DefaultBack`.


# Project Settings: `Plugins` / `Common UI Editor`

There are a few settings here to configure the default Text, Button and Border style for the project.

| Default Style | Asset                                                 |
|---------------|-------------------------------------------------------|
| Text          | `Content/UI/Foundation/Text/TextStyle-Regular`        |
| Border        | *(None)*                                              |
| Button        | `Content/UI/Foundation/Buttons/ButtonStyle-Primary-M` |
