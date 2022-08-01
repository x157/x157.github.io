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

Ready to create your own LyraStarterGame project?

- [Getting Started: Set Up a New LyraStarterGame Project](./Getting-Started-Setting-Up-a-New-LyraStarterGame-Project)
- [Extending Lyra: Development Considerations](./Development-Considerations)


# Lyra Concepts

- Common UI "owns" player input
  - [How Common UI is Setup in Lyra](./CommonUI/)
  - [High Level Overview of Common UI in General](/UE5/CommonUI/)
- Gameplay Ability System
  - [How to: Create a New Gameplay Ability](./Tutorials/How-To-Create-a-New-Gameplay-Ability)
  - GAS Learning Resources:
    - [UE5 Gameplay Ability System Conceptual Overview](/UE5/GameplayAbilitySystem/)
    - [How to: Send Client Gameplay Ability Data to Server in C++](/UE5/GameplayAbilitySystem/How-To-Send-Client-Gameplay-Ability-Data-to-Server-in-C++)
    - [UE5 Enhanced Input Gameplay Abilities -- Pressed Trigger vs Down Trigger](https://youtu.be/P-dyHJhoqxA)
- [LyraStarterGame Interaction System](./Interactions/)
  - Epic's example interaction system to get you started building your own


Bug fixes:

- [How to: Fix Lyra's Unarmed Animation Bugs](./Tutorials/How-To-Fix-Lyra-Unarmed-Animation-Bugs)

Works in progress:

- [How to: Customize the Lyra FrontEnd](./How-To-Customize-Lyra-FrontEnd) (incomplete)


# Module Dissections

In an effort to understand the material Epic has provided us to start with, I am dissecting the GameFeature plugins they shipped to understand what they do, how they're similar and how they differ from one another.

| Module                        | Description                       |
|-------------------------------|-----------------------------------|
| [ShooterCore](./ShooterCore/) | Base framework for a shooter game |
| [ShooterMaps](./ShooterMaps/) | Implementation of ShooterCore     |
| TopDownArena                  | *(coming soon)*                   |


# References

As I learn more about LyraStarterGame I'm keeping a list of references.

- [Epic Games Developer Discussion References](./Epic-Games-Developer-Discussion-References)

