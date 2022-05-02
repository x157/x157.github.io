---
title: Epic Games Developer Discussion References
description: Annotated links to Epic Games developer live streams and videos
back_links:
  - link: /UE5/
    name: UE5
  - link: /UE5/LyraStarterGame/
    name: LyraStarterGame
---


# Epic Games Developer Discussions

This is a collection of some of the more interesting discussions I've reviewed by Epic Games developers that relate to LyraStarterGame.

Not all of these are directly talking about LyraStarterGame, but they do cover relevant technologies that need to be understood to effectively morph LyraStarterGame into a custom game.


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

- [0:08:22 - Begin Discussion](https://www.twitch.tv/videos/1101918638?t=0h8m22s)
- [0:09:06 - Modular Gameplay System Overview](https://www.twitch.tv/videos/1101918638?t=0h9m6s)
- [0:14:42 - AssetManager Integration](https://www.twitch.tv/videos/1101918638?t=0h14m42s)
- [0:15:32 - GameFeature Actions on Activation/Deactivation](https://www.twitch.tv/videos/1101918638?t=0h15m32s)
- [0:18:17 - Add New Pawn Ability via Blueprint in a GameFeature Plugin](https://www.twitch.tv/videos/1101918638?t=0h18m7s)
- [0:29:04 - Q: How Granular should GameFeature Plugins be?](https://www.twitch.tv/videos/1101918638?t=0h29m4s)
- [0:32:27 - Q: Can GameFeature1 affect GameFeature2?](https://www.twitch.tv/videos/1101918638?t=0h32m27s)
- [0:33:42 - Asset Referencing Policy for GameFeature Plugin](https://www.twitch.tv/videos/1101918638?t=0h33m42s)
- [0:36:09 - GameFeature Plugin is really a "Mod" not a "Plugin"](https://www.twitch.tv/videos/1101918638?t=0h36m9s)
- [0:39:47 - How AncientGame uses GameFeature Plugins](https://www.twitch.tv/videos/1101918638?t=0h39m47s)
- [0:41:58 - How to add Animations to base character](https://www.twitch.tv/videos/1101918638?t=0h41m58s)
- [0:48:00 - AncientGame HoverDrone as an example](https://www.twitch.tv/videos/1101918638?t=0h48m0s)
- [0:59:54 - Enhanced Input System](https://www.twitch.tv/videos/1101918638?t=0h59m54s)
- [1:15:41 - DLC delivery methods using GameFeature Plugins](https://www.twitch.tv/videos/1101918638?t=1h15m41s)
- [1:19:39 - Q: Debugging Dynamically Added Components?](https://www.twitch.tv/videos/1101918638?t=1h19m39s)
- [1:23:03 - Q: Can you inherit from GameFeature plugins?](https://www.twitch.tv/videos/1101918638?t=1h23m3s)
- [1:23:42 - Q: Data registries & what are they used for?](https://www.twitch.tv/videos/1101918638?t=1h23m42s)
