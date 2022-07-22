---
title: "UE5 Windows Registry Keys"
description: ""
back_links:
- link: /UE5/
  name: UE5
---


# Windows Registry Keys

The Epic Games Launcher maintains some registry keys that can be useful to know:


## Registry Key: `HKEY_CLASSES_ROOT\Unreal.ProjectFile`

This registry key configures the windows right click system menu options when you right-click on `.uproject` files.

![Example uproject Right Click Menu](./screenshots/uproject-right-click-example.png)

### Child Registry Keys

| Registry Key                  | Data                                                |
|-------------------------------|-----------------------------------------------------|
| `shell\open`                  | Open                                                |
| `shell\open\command`          | `UnrealVersionSelector.exe` `/editor` `"%1"`        |
| `shell\run`                   | Launch Game                                         |
| `shell\run\command`           | `UnrealVersionSelector.exe` `/game` `"%1"`          |
| `shell\rungenproj`            | Generate Visual Studio project files                |
| `shell\rungenproj\command`    | `UnrealVersionSelector.exe` `/projectfiles` `"%1"`  |
| `shell\switchversion`         | Switch Unreal Engine version...                     |
| `shell\switchversion\command` | `UnrealVersionSelector.exe` `/switchversion` `"%1"` |


### Default Root Directory

The default root is where you installed the Epic Games Launcher, or you can change this
if you have a custom engine:

    ... / Epic Games / Launcher / Engine / Binaries / ... / UnrealVersionSelector.exe
