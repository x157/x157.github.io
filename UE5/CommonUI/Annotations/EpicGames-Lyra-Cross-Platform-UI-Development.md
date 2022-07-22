---
title: "Epic Games: Lyra Cross-Platform UI Development"
description: "Annotation of Epic Games developer video: Lyra Cross-Platform UI Development"
back_links:
  - link: /UE5/
    name: UE5
  - link: /UE5/CommonUI/
    name: CommonUI
  - link: /UE5/CommonUI/#Annotations
    name: Annotations
back_link_title: "Lyra Cross-Platform UI Development"
---


# Epic Games: Lyra Cross-Platform UI Development

Published 2022-04-21 by Nick Darnell, Principal Programmer @ Epic Games.

Unfortunately this was published on Epic's dev site, which does not support
annotated links, so you'll have to fast-forward to the interesting spots
on your own.

This deals with Lyra, but focuses on the CommonUI plugin since that is what
Epic used in Lyra.

[Full Video](https://dev.epicgames.com/community/learning/talks-and-demos/k88P/lyra-cross-platform-ui-development)
(45m)


## Annotation


### 00:27 - Overview of Lyra User Interface
  - 01:05 - Lyra "Pretend Platforms" for easy cross-platform UI development
  - 02:11 - How Lyra Front-end is set up to support cross-platform UI
  - 03:13 - Review Platform-specific INIs

#### 05:24 - Overview of how CommonUI + Lyra interact
  - 06:01 - C++: Lyra Setting Screen (`ULyraSettingScreen`)
  - 07:00 - C++: Lyra Game Viewport Client (`ULyraGameViewportClient`)
    - Mainly showcases base C++ class `UCommonGameViewportClient`
  - 07:55 - Data Table: Universal Input Actions (`DT_UniversalActions`)
  - 08:29 - How CommonUI directs inputs in Lyra
    - 08:43 - C++ `ULyraSettingScreen` < `UGameSettingScreen` < `UCommonActivatableWidget`
    - 09:22 - Activatable widget hierarchy
      - Important to get input: You must be the root-most activated widget

##### 09:52 - **How to debug Activatable widget hierarchy**
  - Console command: `CommonUI.DumpActivatableTree`

##### 11:01 - How to add Activatable Widgets to the Viewport
  - 11:40 - Lyra Game UI Manager
  - 12:41 - Example what happens when a player joins

### 13:20 - Primary Game Layout
  - 13:33 - `B_LyraUIPolicy` Game Policy
    - 13:39 - `W_OverallUILayout` Game Layout
      - Register layers:
        - `UI.Layer.Game` Stack
        - `UI.Layer.GameMenu` Stack
        - `UI.Layer.Menu` Stack
        - `UI.Layer.Modal` Stack
      - 14:37 - **Not implemented**: Disconnected Controller UI
        - Will be required for a shipping game *(only for console support?)*
      - 15:34 - Stacks are `UCommonActivatableWidgetStack`
        - Queues also supported
        - Derive your own for other functionality


### 16:46 - `W_LyraFrontEnd` Lyra Front-end
  - Added to `UI.Layer.Menu`
  - 17:35 - Important: Use **Soft Class** References in `Push Content to Layer for Player`
    - This is a Load time optimization
  - 19:02 - Lyra Front-end visual example of content swapping on layers


### 19:21 - How it works in Native C++
  - 19:33 - *(example)* Enable PS5 Platform Emulation mode
  - 20:10 - Inject `B_LyraFrontEndStateComponent` into `LyraGameState` (client only)
  - 20:42 - C++ `ULyraFrontEndStateComponent` < `UGameStateComponent`
    - Implements `ILoadingProcessInterface`
      - Loading Screen Manager compatibility
    - 21:22 - `OnExperienceLoaded` callback *(setup in `BeginPlay`)*
    - 21:57 - `FlowStep_TryShowPressStartScreen`
      - If showing screen:
        - Get `UPrimaryGameLayout`
          - Push Widget to Layer Stack `UI.Layer.Menu`
            - Suspend player input


### 24:40 Art Discussion
  - Intro: Art Discussion w/ Rhys Harwell, Principal UI Artist

*I haven't annotated the Art discussion, I suck at art.* `:)`
