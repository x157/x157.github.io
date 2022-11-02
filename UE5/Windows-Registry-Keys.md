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


## Registry Key: `HKEY_CURRENT_USER\Software\Epic Games\Unreal Engine\Builds`

This is a list of the Unreal Engine builds you have on your computer.

If you build a custom engine and you want to remove it from the list of installed builds,
open this registry directory and delete the entry representing the build you no longer want.

You can also assign a human-readable name/version number to the build to make it easier
to identify in your `uproject` and standardize across developer machines.

For example my custom 5.1 engine build, when I registered it with Win64, auto-assigned
itself an identifier like `{37223543-40DD-78E6-DAAF-12B79A7B5F1A}` on my system.

To use that, in my `uproject` I needed to have `"EngineAssociation": "{37223543-40DD-78E6-DAAF-12B79A7B5F1A}"`

However this ID was different on different machines.  Thus I modified the name of the registry
key to be `UE_5.1_XistGG` to indicate this is my custom build of 5.1, and then modified the
`uproject` to say `"EngineAssociation": "UE_5.1_XistGG"`

After doing this, I can share the `uproject` with my teammates and as long as they've all also
edited their registry to set this version of the engine with this name, we don't have to worry
about different people having different IDs associated with the custom engine build we need.
