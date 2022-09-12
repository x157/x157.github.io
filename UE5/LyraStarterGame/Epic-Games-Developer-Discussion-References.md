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


## Lyra Starter Game Overview (Epic Games)

This video was released by Epic near the launch of 5.0 and is a must watch if you want an overview of Lyra and its big picture.

[Full Video](https://youtu.be/Fj1zCsYydD8)

Some interesting points in particular:

- [06:57 - What is an Experience](https://youtu.be/Fj1zCsYydD8?t=417)
- [09:57 - User-Facing Experience](https://youtu.be/Fj1zCsYydD8?t=597)
- [11:58 - Online Features](https://youtu.be/Fj1zCsYydD8?t=718)
- [13:21 - Scalability](https://youtu.be/Fj1zCsYydD8?t=801)
- [14:40 - UE5 Mannequins](https://youtu.be/Fj1zCsYydD8?t=880)
- [16:21 - Cosmetics & Animations](https://youtu.be/Fj1zCsYydD8?t=981)
- [20:41 - Team Colors](https://youtu.be/Fj1zCsYydD8?t=1241)
- [23:48 - Input System](https://youtu.be/Fj1zCsYydD8?t=1428)
- [26:19 - Level Design Greyboxing](https://youtu.be/Fj1zCsYydD8?t=1579)


## Lyra Walkthru Q&A

This was a follow-up to the original video linked above.  The Twitch version is vastly superior to the YouTube version if you're going to watch the whole thing.

[Full Video](https://www.twitch.tv/videos/1469444417)

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


## Modular Game Features

This video was recommended by Michael Noland in the Lyra Walkthru Q&A

[Full Video](https://www.twitch.tv/videos/1101918638?filter=archives&sort=time)

Points of interest:

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


## Analyzing Lyra's Animation

[Full Video](https://youtu.be/5O-nTNMB19Y)

Streamed 2022-09-08 by Inside Unreal with Tina Wisdom

Featuring Kiaran Ritchie (Principal Animation Programmer: IK/Retargeting)
and Jose Villarroel (Gameplay Animation Programmer)

- [0:06:47 - Intro](https://youtu.be/5O-nTNMB19Y?t=407)
- [0:09:56 - Lyra Experience: Elimination](https://youtu.be/5O-nTNMB19Y?t=596)
- [0:10:48 - How to disable the Lyra bots](https://youtu.be/5O-nTNMB19Y?t=648)
- [0:11:58 - Presentation: Retargeting](https://youtu.be/5O-nTNMB19Y?t=718)
- [0:14:01 - What is animation retargeting?](https://youtu.be/5O-nTNMB19Y?t=841)
- [0:14:37 - How can skeletons vary?](https://youtu.be/5O-nTNMB19Y?t=877)
- [0:17:06 - What are my animation sharing options?](https://youtu.be/5O-nTNMB19Y?t=1026)
- [0:18:16 - Retargeting Scenario 1: Same Skeleton+Pose+Proportions](https://youtu.be/5O-nTNMB19Y?t=1096)
- [0:18:51 - Retargeting Scenario 2: Same Skeleton+Pose Different Proportions](https://youtu.be/5O-nTNMB19Y?t=1131)
- [0:21:01 - Retargeting Scenario 3: Same Hierarchy+Pose Different Skeleton, possibly extra bones](https://youtu.be/5O-nTNMB19Y?t=1261)
- [0:22:51 - How does Copy Pose from Mesh work?](https://youtu.be/5O-nTNMB19Y?t=1371)
- [0:25:11 - How does Compatible Skeletons work?](https://youtu.be/5O-nTNMB19Y?t=1511)
- [0:26:43 - Retargeting Scenario 4: Different Hierarchy+Pose+Skeleton with Extra/Missing Bones](https://youtu.be/5O-nTNMB19Y?t=1603)
- [0:27:56 - How does IK Retargeting work?](https://youtu.be/5O-nTNMB19Y?t=1676)
- [0:29:51 - Live Demo: Set up an IK Rig](https://youtu.be/5O-nTNMB19Y?t=1791)
- [0:36:54 - Live Demo: Set up an IK Retargeter](https://youtu.be/5O-nTNMB19Y?t=2214)
- [0:44:25 - Live Demo: Replace Lyra Manny with Lion](https://youtu.be/5O-nTNMB19Y?t=2665)
- [0:45:15 - Live Demo: Create Animation BP for Lion](https://youtu.be/5O-nTNMB19Y?t=2715)
- [0:48:11 - Cost of Runtime Retargeting, consider using it as an Offline tool](https://youtu.be/5O-nTNMB19Y?t=2891)
- [0:49:45 - Question: What effect does Blend to Source have on Lion hands?](https://youtu.be/5O-nTNMB19Y?t=2985)
- [0:51:55 - Consider: Fix crossed arms with Retarget Pose](https://youtu.be/5O-nTNMB19Y?t=3115)
- [0:54:03 - Overview of Thread-safe Animation BPs in Lyra](https://youtu.be/5O-nTNMB19Y?t=3243)
- [0:56:50 - AnimGraph: Locomotion State Machine](https://youtu.be/5O-nTNMB19Y?t=3410)
- [0:58:40 - What is Linked Anim Layer?](https://youtu.be/5O-nTNMB19Y?t=3520)
- [0:59:09 - Animation Interface: How to define Animation Layers](https://youtu.be/5O-nTNMB19Y?t=3549)
- [1:00:20 - What are Animation Layers?](https://youtu.be/5O-nTNMB19Y?t=3620)
- [1:03:53 - Rifle Animation Layers](https://youtu.be/5O-nTNMB19Y?t=3833)
- [1:04:50 - How to make new Lyra Weapon with Animations](https://youtu.be/5O-nTNMB19Y?t=3890)
- [1:05:31 - How switching weapons switches animation layers](https://youtu.be/5O-nTNMB19Y?t=3931)
- [1:07:46 - Orientation Warping Features](https://youtu.be/5O-nTNMB19Y?t=4066)
- [1:12:16 - Stride Warping Features](https://youtu.be/5O-nTNMB19Y?t=4336)
- [1:17:02 - Distance Matching](https://youtu.be/5O-nTNMB19Y?t=4622)
- [1:24:32 - Animation Debug Tools](https://youtu.be/5O-nTNMB19Y?t=5072)
- [1:26:10 - Rewind Debugger](https://youtu.be/5O-nTNMB19Y?t=5170)
- [1:31:28 - Misc Discussion](https://youtu.be/5O-nTNMB19Y?t=5488)
- [1:36:35 - Q: What are twist bones?](https://youtu.be/5O-nTNMB19Y?t=5795)
- [1:40:28 - Q: Is Copy Pose from Mesh superior to Master Pose Component?](https://youtu.be/5O-nTNMB19Y?t=6028)
- [1:43:00 - Q: Is retargeting needed for facial animations?](https://youtu.be/5O-nTNMB19Y?t=6180)
- [1:44:06 - Q: How much does IK retargeting impact performance?](https://youtu.be/5O-nTNMB19Y?t=6246)
- [1:45:32 - Q: Suggested max limit for IK retarget use?](https://youtu.be/5O-nTNMB19Y?t=6332)
- [1:46:44 - Q: How do you add surface reaction?](https://youtu.be/5O-nTNMB19Y?t=6404)
- [1:50:55 - Q: How to transition between canned animations and dynamic animations?](https://youtu.be/5O-nTNMB19Y?t=6655)
- [1:52:59 - Q: Possible to get the Lion to blend back into its natural position in real-time?](https://youtu.be/5O-nTNMB19Y?t=6779)
- [1:55:54 - Q: Control Rig preview doesn't use runtime mesh?](https://youtu.be/5O-nTNMB19Y?t=6954)
- [1:56:42 - Q: Can IK root bone be dynamic rather than static?](https://youtu.be/5O-nTNMB19Y?t=7002)
- [1:58:01 - Q: How does foot locking work?](https://youtu.be/5O-nTNMB19Y?t=7081)
- [2:00:58 - Q: What are pose drivers in post processing Anim BPs?](https://youtu.be/5O-nTNMB19Y?t=7258)
- [2:02:13 - Outro](https://youtu.be/5O-nTNMB19Y?t=7333)
- 