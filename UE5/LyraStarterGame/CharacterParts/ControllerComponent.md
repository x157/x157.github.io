---
title: "Lyra Character Parts Controller Component"
description: "Details of the Lyra Character Parts Controller-specific Component"
breadcrumb_path: "UE5/LyraStarterGame/CharacterParts"
breadcrumb_name: "Controller Component"
---

# Lyra Character Parts Controller Component

C++ Class: `ULyraControllerComponent_CharacterParts`
( Lyra 5.2
 [header](https://github.com/EpicGames/UnrealEngine/blob/5.2/Samples/Games/Lyra/Source/LyraGame/Cosmetics/LyraControllerComponent_CharacterParts.h)
|
 [cpp](https://github.com/EpicGames/UnrealEngine/blob/5.2/Samples/Games/Lyra/Source/LyraGame/Cosmetics/LyraControllerComponent_CharacterParts.cpp)
)

This is one part of the [Lyra Character Parts](/UE5/LyraStarterGame/CharacterParts/) system,
see that page for an overview.


## How Lyra Sets This Up

- The `B_PickRandomCharacter` asset is a Character Parts Controller Component
  - It gets injected into **all** `Controller` actors by the Experience Definition (thus it affects both Players and Bots)
    - For example see `B_ShooterGame_Elimination`
