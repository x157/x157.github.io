---
title: Configure AssetManager for GameFeature Plugins
description: Describes necessary AssetManager settings required for your GameFeature Plugin to work
back_links:
  - link: /UE5/
    name: UE5
  - link: /UE5/LyraStarterGame/
    name: LyraStarterGame
---


# Configuring AssetManager

In order for Lyra to be able to load your plugin's files, you need to tell AssetManager where to look for them.

Some files you will hard reference, but others are soft references that require a search path to be found.


## Configure AssetManager in YourGame.uasset

Open `Plugins/YourGame/Content/YourGame.uasset` (your plugin's primary Data Asset file).

Near the bottom there is a section for `AssetManager` and under that for `Primary Asset Types to Scan`

You need to ensure there is an entry for each of the following data types:

In these examples my GameFeature Plugin is named `XistGame`


### LyraExperienceDefinition

<img src="./screenshots/GamePlugin-AssetManager/Index0.png" />


### LyraUserFacingExperienceDefinition

<img src="./screenshots/GamePlugin-AssetManager/Index1.png" />


### LyraExperienceActionSet

<img src="./screenshots/GamePlugin-AssetManager/Index2.png" />


### World

<img src="./screenshots/GamePlugin-AssetManager/Index3.png" />


### PlayerMappableInputConfig

<img src="./screenshots/GamePlugin-AssetManager/Index4.png" />


# AssetManager Configuration Complete

That should be it for now RE AssetManager.

[Continue your Lyra journey](./)
