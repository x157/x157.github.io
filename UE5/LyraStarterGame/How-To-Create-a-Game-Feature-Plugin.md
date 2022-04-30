# How to Create a GameFeature Plugin

There isn't anything particularly special about this plugin except apparently it must go into the `Plugins/GameFeatures` directory.

## Create New Plugin

- UE5 Menu: `Edit` > `Plugins`
- Click `+ Add` button
- Choose `Game Feature (with C++)` template
- Name Plugin (I called mine `XistGame`)
- Click `Create Plugin` button

When you create this, it will supply you with an initial, mostly empty `GameFeatures.GameFeatureData` data asset, named after your game.

Currently your plugin is broken.  In order to explore Lyra and extend from it, you need to explicitly declare some project dependencies.

## Add Dependencies

- Open your `XistGame` data asset (whatever you named your plugin).
- Change the `Current State` of your plugin to `Registered` (by default it should be `Active`)
- Click the `Edit Plugin` button
- Scroll to the bottom where it lists `Dependencies`
  - Add dependency for `ShooterCore`
  - Add dependency for `LyraExampleContent`
  - `Save` button
- Change plugin `Current State` back to `Active`
- `Save` data asset

## Next Steps

Your Plugin is now ready for you to add your own content.  It is organized just like any other UE5 Plugin.

```text
Content
  ﹂ XistGame.uasset
Resources
  ﹂ Icon128.png
Source
  ﹂ XistGameRuntime
    ﹂ Private
      ﹂ XistGameRuntimeModule.cpp
    ﹂ Public
      ﹂ XistGameRuntimeModule.h
  ﹂ XistGameRuntime.Build.cs
XistGame.uplugin
```

## Video Tutorial

If you prefer a video, I found this to be helpful:

[How to Create a LyraStarterGame Plugin and specify dependencies](https://youtu.be/Y67z-k0DkLY?t=163)
