---
title: How to make a game with UE5 LyraStarterGame
description: Learn how to make a new game based on UE5's Lyra Starter Game (LyraStarterGame)
back_links:
  - link: /UE5/
    name: UE5
---


# Make Your UE5 Game from Lyra

Don't start from scratch!  Start from Lyra.

Epic suggests using this massive starter game framework for new dev projects, and seeing all of the things that they've already done for us, it's not hard to imagine why.

This thing is PACKED full of things that every game NEEDS but that isn't the least bit fun for devs, especially hobbyists like myself, to implement.

The cost to us is simply to learn how they've put things together, and furthermore how to extend the framework they've built.


# Step 1: Create a GameFeature Plugin

It seems Epic intends for us to create a plugin and contain all of our own source and content there, such that they can eventually (how!?) update the LyraStarterGame code and content they've provided with additions, bug fixes, etc.

[How To Create a GameFeature Plugin](./How-To-Create-a-GameFeature-Plugin)


# Step 2: Create New Map


# Step 3: Create New Experience

Set this as the default experience to load in your new map.


# Step 4: Change Front-end to show this new experience

Create user-facing experience to accomplish this (?)


# Step 5: Your guess is as good as mine! :D

Currently working toward this.  Will update more as I learn more.


# References

As I learn more about Lyra I'll try to document what and from where:


## [Lyra Starter Game Overview (Epic Games)](https://youtu.be/Fj1zCsYydD8)

This video was released by Epic near the launch of 5.0 and is a must watch if you want an overview of Lyra and its big picture.

Some interesting points in particular:

- [06:57 - What is an Experience](https://youtu.be/Fj1zCsYydD8?t=417)
- [09:57 - User-Facing Experience](https://youtu.be/Fj1zCsYydD8?t=597)
- [11:58 - Online Features](https://youtu.be/Fj1zCsYydD8?t=718)
- [13:21 - Scalability](https://youtu.be/Fj1zCsYydD8?t=801)
- [14:40 - UE5 Mannequins](https://youtu.be/Fj1zCsYydD8?t=880)
- [16:21 - Cosmetics & Team Colors](https://youtu.be/Fj1zCsYydD8?t=981)
- [23:48 - Input System](https://youtu.be/Fj1zCsYydD8?t=1428)
- [26:19 - Level Design Greyboxing](https://youtu.be/Fj1zCsYydD8?t=1579)


## [Lyra Walkthru Q&A](https://www.twitch.tv/videos/1469444417)

Twitch version:
- [0:11:14 - Creating a New Experience](https://www.twitch.tv/videos/1469444417?t=0h11m14s)
  - [0:22:54 - Create GameFeature Plugin](https://www.twitch.tv/videos/1469444417?t=0h22m54s)
  - [0:23:52 - ? TOTO ?](https://www.twitch.tv/videos/1469444417?t=0h22m54s)
  - [Modular Gameplay Video he references](https://www.twitch.tv/videos/1101918638?filter=archives&sort=time)
- [0:26:08 - Reference Viewer](https://www.twitch.tv/videos/1469444417?t=0h26m08s)
  - [Reference Viewer Screenshot](https://twitter.com/joatski/status/1453130573380206601/photo/1)

YouTube version (glitchy):
- [0:24:13 - How to Set Game Executable Name](https://youtu.be/N1X7BgIQ4QY?t=1453) 
- [0:26:28 - How to get EOS (Epic Online Subsystem) Working](https://youtu.be/N1X7BgIQ4QY?t=1588)
- [0:29:47 - Overview of Lyra Inventory System](https://youtu.be/N1X7BgIQ4QY?t=1787)
- [0:35:30 - Common Loading Screen](https://youtu.be/N1X7BgIQ4QY?t=2130)
- [0:45:33 - Unreal Editor Network Latency Tools](https://youtu.be/N1X7BgIQ4QY?t=2733)
- [0:50:04 - Developer Cheats & Tricks](https://youtu.be/N1X7BgIQ4QY?t=3004)
- [0:51:14 - Team Colors](https://youtu.be/N1X7BgIQ4QY?t=3074)
- [0:52:05 - Hero/Pawn Data Asset](https://youtu.be/N1X7BgIQ4QY?t=3125)
- [1:00:27 - TIP: CTRL+B & CTRL+E Editor Shortcuts](https://youtu.be/N1X7BgIQ4QY?t=3627)
- [1:01:57 - TIP: Viewport Favorites](https://youtu.be/N1X7BgIQ4QY?t=3757)
- [1:03:12 - TIP: Menu: Tools > Search](https://youtu.be/N1X7BgIQ4QY?t=3792)


## [Modular Game Features](https://www.twitch.tv/videos/1101918638?filter=archives&sort=time)

This video was recommended by Michael Noland in the Lyra Walkthru Q&A

