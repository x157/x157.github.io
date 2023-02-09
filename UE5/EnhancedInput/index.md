---
title: "Enhanced Input | UE5"
description: "Overview of the UE5 Enhanced Input Subsystem and its Input Mapping Contexts"
breadcrumb_path: "UE5"
breadcrumb_name: "Enhanced Input"
---

# Enhanced Input

Enhanced Input is the new recommended standard as of UE 5.1.

It is used by [Common UI](/UE5/CommonUI/) and [Lyra](/UE5/LyraStarterGame/), for example.

## Core Concepts

- Inputs are **Actions**, not *keys*
  - Actions can be the press of a key, or the release of a key, the persistent holding down of a key.
    - These are many potential actions involving a single key.
  - Actions can be combined using `Chord` triggers (e.g. `SHIFT`+`F` versus just `F`)
- [Input Mapping Context](./InputMappingContext) (IMC)
  - An IMC is used to define a set of keys/buttons/etc
    with their respective triggers and effects.
  - You can change if and at what priority any given IMC is active during Game Play.
    - Whenever the IMC is active, its map of inputs to Actions will be in effect.

- [Enhanced Input in UE5 by Epic Games](https://dev.epicgames.com/community/learning/tutorials/eD13/unreal-engine-enhanced-input-in-ue5)
  - This is **must read** material to understand Enhanced Input.


### Understanding the Flow of Input

- [UMG-Slate Compendium](https://github.com/YawLighthouse/UMG-Slate-Compendium)
  *by [YawLighthouse](https://github.com/YawLighthouse)*
  - in particular: [Input Framework of Unreal Engine(relating to UMG/Slate)](https://github.com/YawLighthouse/UMG-Slate-Compendium#input-framework-of-unreal-engine)


## Epic References

- [Enhanced Input in UE5 by Epic Games](https://dev.epicgames.com/community/learning/tutorials/eD13/unreal-engine-enhanced-input-in-ue5)
- [Official UE 5.1 Docs](https://docs.unrealengine.com/5.1/en-US/enhanced-input-in-unreal-engine/)
