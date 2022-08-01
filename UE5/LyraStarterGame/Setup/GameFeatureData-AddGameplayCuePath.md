---
title: "Configure AssetManager for GameFeature Plugins"
description: "Describes necessary AssetManager settings required for your GameFeature Plugin to work"
breadcrumb_path: "UE5/LyraStarterGame/Setup"
breadcrumb_name: "Add GameplayCue Path"
---


# Add GameplayCue Path

In order to use your own GameplayCues, you need to tell Lyra where to find them.


## Configure paths in YourGame.uasset

Open `Plugins/YourGame/Content/YourGame.uasset` (your plugin's primary Data Asset file).

In the `Actions` section, add a new element `Add Gameplay Cue Path` and add the path(s)
where you'd like to store your GameplayCues.

For example in my `XistGame` project, I'm using `/XistGame/GameplayCues` as the path.


### Example

<img src="../screenshots/GamePlugin-Actions/AddGameplayCuePath.png" />


# Next Step: Create Dev Experience

Now that Asset Manager can find your stuff, it's time to actually make stuff!

[Create Dev Experience](/UE5/LyraStarterGame/How-To-Create-New-GameFeature-Dev-Experience)
or go back to [Lyra Starter Game](/UE5/LyraStarterGame/)


### Thank you

Shout-out to `braheem`@github who pointed out that
[this step was missing](https://github.com/x157/x157.github.io/issues/2)
from the GameFeature plugin setup process.  Thank you `braheem`!
