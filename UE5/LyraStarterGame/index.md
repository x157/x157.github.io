---
title: LyraStarterGame Overview
description: Learn how to make a new game based on UE5's Lyra Starter Game (LyraStarterGame)
back_links:
  - link: /UE5/
    name: UE5
back_link_title: LyraStarterGame
---


# Make Your UE5 Game from Lyra

Don't start from scratch!  Start from Lyra.

Epic suggests using this massive starter game framework for new games, and seeing all of the things that they've already done for us, it's not hard to imagine why.

This thing is PACKED full of things that every game NEEDS but that isn't the least bit fun for devs, especially hobbyists like myself, to implement.

The cost to us is simply to learn how they've put things together, and furthermore how to extend the framework they've built.


# Module Dissections

In an effort to understand the material Epic has provided us to start with, I am dissecting the GameFeature plugins they shipped to understand what they do, how they're similar and how they differ from one another.

- Logic Dissection:

| [ShooterCore](./ShooterCore/) | Base framework for a shooter game |
| ShooterMaps | *(coming soon)* |
| TopDownArena | *(coming soon)* |


# How to Make a Game with LyraStarterGame

The procedure documented below was used to create [Lyra-Mod-XistGame](https://github.com/x157/Lyra-Mod-XistGame) which is open source on Github to serve as an example empty plugin.


# Step 1: Create a GameFeature Plugin

UE5+Lyra is set up such that you should never touch the base code.  Michael Noland says "think of Lyra like it's engine code."

What we do then to create a new game is we make a "GameFeature Plugin" for Lyra.  It's less of a plugin in the traditional sense and more like a mod.

By containing all of our work in our own plugin, we ensure it will be as easy as possible to integrate future upgrades, bug fixes, etc that Epic produces on the base Lyra framework.

[How To Create a GameFeature Plugin](./How-To-Create-a-GameFeature-Plugin)


# Step 2: Configure Asset Manager for Plugin

Once you have a plugin, you need to tell Lyra's Asset Manager where to find files for your plugin.

[How to Configure Asset Manager for GameFeature Plugins](./How-To-Configure-AssetManager-for-GameFeature-Plugins)


# Step 3: Create Your Dev Experience

An "Experience" in Lyra is essentially some form of user interaction.  It's a map along with a set of inputs and controls that may or may not be shared with other maps or other experiences.

The first experience you set up is the hardest, there is some boilerplate stuff that needs to be done for your mod.

For that reason we'll set up a purely development focussed experience so we'll have a basic starting point.

[How to Create Your Dev Experience](./How-To-Create-New-GameFeature-Dev-Experience)


# Step 4: Customize the FrontEnd

Time to make the game look and feel more like you and less like stock Lyra.

Here we'll cover how to customize the look and feel of the front-end user experience, namely the menu.

[Customize the Lyra FrontEnd](./How-To-Customize-Lyra-FrontEnd) *Work in progress*


# Step N: Your guess is as good as mine! :D

Currently working toward this.  Will update more as I learn more.

*... work in progress ...*


# Tutorials

- [How to: Create a New Gameplay Ability](./Tutorials/How-To-Create-a-New-Gameplay-Ability)


# References

As I learn more about LyraStarterGame I'm keeping a list of references.

- [Epic Games Developer Discussion References](./Epic-Games-Developer-Discussion-References)

