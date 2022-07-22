---
title: "Common UI Plugin"
description: "Annotation of tutorial videos relating to the Common UI plugin for Unreal Engine 5"
back_links:
  - link: /UE5/
    name: UE5
---


# Common UI Plugin

Epic's `CommonUI` plugin is what
[LyraStarterGame](../LyraStarterGame/)
uses to control the flow of user input.

## Considerations for Usage

When using `CommonUI`, **DO NOT add widgets directly to the viewport**.

Instead, push them onto UI Layers that you set up in your game
such as these Lyra defaults:

#### Lyra Common UI Layers

In order of ascending priority:

- `Game`
- `GameMenu`
- `Menu`
- `Modal`

Input is directed by Common UI to the Widget that is
at the top of the highest priority visible layer
at any given time.

To support this, your widgets must be derived from `UCommonActivatableWidget`.


<a id="Annotations"></a>
<a id="Annotations_EpicGames"></a>
## Annotations from Epic Games video sources

- [Lyra Cross-Platform UI Development](./Annotations/EpicGames-Lyra-Cross-Platform-UI-Development) (45m)
  - How CommonUI was implemented in LyraStarterGame
  - Good big picture overview of a CommonUI implementation


<a id="Annotations_Other"></a>
