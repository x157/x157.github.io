---
title: "ULyraSettingsLocal"
description: ""
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: "ULyraSettingsLocal"
---

# ULyraSettingsLocal


<todo>TODO</todo>


> Once a Game Feature registers an input config, they are stored in the game settings. The settings are aware of all input mappings and which ones are currently active. The ULyraInputComponent uses these registered configs to add the mappings to Enhanced Input when the player is initialized.
>
> The settings have callbacks for when a mapping config is activated or deactivated so that anything with a local player can get access to that information, which can be useful both in gameplay situations and for updating the settings menu.
>
> Along with holding the currently registered input mappings and custom keybinds, the settings provide a place for you to declare any modifications to their experience such as aim sensitivity, inverting the look axis, and more. These settings can then be used by Input Modifiers to implement the desired input behavior.

*from [https://docs.unrealengine.com/5.1/en-US/lyra-input-settings-in-unreal-engine/](https://docs.unrealengine.com/5.1/en-US/lyra-input-settings-in-unreal-engine/)*
