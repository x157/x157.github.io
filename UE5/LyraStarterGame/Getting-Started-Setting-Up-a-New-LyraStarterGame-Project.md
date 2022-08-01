---
title: How to Set Up a New LyraStarterGame Project
description: Get your LyraStarterGame Project set up and ready to work in
back_links:
- link: /UE5/
  name: UE5
- link: /UE5/LyraStarterGame/
  name: LyraStarterGame
back_link_title: Create New LyraStarterGame Project
---


# Getting Started: Setting Up a New LyraStarterGame Project

Before you can do much with LyraStarterGame, you first need to create a new UE5 LyraStarterGame project and customize
it for yourself.


# Step 1: Create a GameFeature Plugin

UE5+Lyra is set up such that you should never touch the base code.  Michael Noland says "think of Lyra like it's engine code."

What we do then to create a new game is we make a "GameFeature Plugin" for Lyra.  It's less of a plugin in the
traditional sense and more like a mod.

By containing all of our work in our own plugin, we ensure it will be as easy as possible to integrate future upgrades,
bug fixes, etc that Epic produces on the base Lyra framework.

[How To Create a GameFeature Plugin](./How-To-Create-a-GameFeature-Plugin)


# Step 2: Configure Game Feature Data

Once you have a plugin, you need to tell Lyra's Asset Manager where to find files for your plugin.

[How to Configure Asset Manager for GameFeature Plugins](./How-To-Configure-AssetManager-for-GameFeature-Plugins)

You'll also need to add a Gameplay Cue path so you can make custom Cues:

[Add GameplayCue Path to GameFeatureData](./Setup/GameFeatureData-AddGameplayCuePath)


# Step 3: Create Your Dev Experience

An "Experience" in Lyra is essentially some form of user interaction.  It's a map along with a set of inputs and
controls that may or may not be shared with other maps or other experiences.

The first experience you set up is the hardest, there is some boilerplate stuff that needs to be done for your mod.

For that reason we'll set up a purely development focussed experience so we'll have a basic starting point.

[How to Create Your Dev Experience](./How-To-Create-New-GameFeature-Dev-Experience)


# Congratulations

You now have a LyraStarterGame project that is your very own!

Time to [learn more about LyraStarterGame](/UE5/LyraStarterGame/) and build your game!
