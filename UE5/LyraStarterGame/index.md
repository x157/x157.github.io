Epic suggests using this massive starter game framework for new dev projects, and seeing all of the things that they've already done for us, it's not hard to imagine why.

This thing is PACKED full of things that every game NEEDS but that isn't the least bit fun for devs, especially hobbyists like myself, to implement.

The cost to us is simply to learn how they've put things together, and furthermore how to extend the framework they've built.

# Step 1: Create a GameFeature Plugin

It seems Epic intends for us to create a plugin and contain all of our own source and content there, such that they can eventually (how!?) update the LyraStarterGame code and content they've provided with additions, bug fixes, etc.

There isn't anything particularly special about this plugin except apparently it must go into the `Plugins/GameFeatures` directory.

- UE5 Menu: `Edit` > `Plugins`
- Click `+ Add` button
- Choose `Game Feature (with C++)` template
- Name Plugin (I called mine `XistGame`)
- Click `Create Plugin` button

When you create this, it will supply you with an initial, mostly empty `GameFeatures.GameFeatureData` data asset, named after your game.

Currently your plugin is broken.  In order to explore Lyra and extend from it, you need to explicitly declare some project dependencies.

## Adding Dependencies

- Open your `XistGame` data asset (whatever you named your plugin).
- Change the `Current State` of your plugin to `Registered` (by default it should be `Active`)
- Click the `Edit Plugin` button
- Scroll to the bottom where it lists `Dependencies`
  - Add dependency for `ShooterCore`
  - Add dependency for `LyraExampleContent`
  - `Save` button
- Change plugin `Current State` back to `Active`
- `Save` data asset

If you prefer a video tutorial [How to Create a LyraStarterGame Plugin and specify dependencies](https://youtu.be/Y67z-k0DkLY?t=163)
