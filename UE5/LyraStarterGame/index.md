---
title: "LyraStarterGame Overview"
description: "Learn how to make a new game based on UE5's Lyra Starter Game (LyraStarterGame)"
breadcrumb_path: "UE5"
breadcrumb_name: "LyraStarterGame"
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

- Your game code must be organized into one or more Lyra [GameFeature Plugins](/UE5/GameFeatures/)
  - Try to only modify your own GameFeature plugins.
    - In general you don't want to modify Lyra itself much, if at all.
- Common UI "owns" player input
  - [How Common UI is Setup in Lyra](./CommonUI/)
  - [High Level Overview of Common UI in General](/UE5/CommonUI/)
- Gameplay Ability System
  - [How to: Create a New Gameplay Ability](./Tutorials/How-To-Create-a-New-Gameplay-Ability)
  - GAS Learning Resources:
    - [UE5 Gameplay Ability System Conceptual Overview](/UE5/GameplayAbilitySystem/)
    - [How to: Send Client Gameplay Ability Data to Server in C++](/UE5/GameplayAbilitySystem/How-To-Send-Client-Gameplay-Ability-Data-to-Server-in-C++)
    - [UE5 Enhanced Input Gameplay Abilities -- Pressed Trigger vs Down Trigger](https://youtu.be/P-dyHJhoqxA)

# Lyra Gameplay Systems

- [Shooter Mannequin Character](./ShooterMannequin)
  - `B_Hero_ShooterMannequin` is the base Character class in Lyra, you will definitely want to understand it well
  - Demonstrates key concept: Asynchronous, inter-dependent `ModularGameplay` Initialization of Pawn components
- [Interaction System](./Interactions/)
  - Epic's prototype interaction system
  - Not ready for you to use yourself, but a great resource to teach you to build your own Interaction System
- [Inventory System](./Inventory/)
  - The base system of items that can be stored in a Pawn's inventory
- [Equipment System](./Equipment/)
  - Inventory extension: Inventory Items that are pieces of equipment usable by Pawns
- [Weapon System](./Weapons/)
  - Equipment extension: Equipment Items that are weapons usable by Pawns


Bug fixes:

- [How to: Fix Lyra's Unarmed Animation Bugs](./Tutorials/How-To-Fix-Lyra-Unarmed-Animation-Bugs)

Works in progress:

- [How to: Customize the Lyra FrontEnd](./How-To-Customize-Lyra-FrontEnd) *(incomplete; coming eventually)*


# Module Dissections

In an effort to understand the material Epic has provided us to start with, I am dissecting the GameFeature plugins they shipped to understand what they do, how they're similar and how they differ from one another.

| Module                        | Description                       |
|-------------------------------|-----------------------------------|
| [ShooterCore](./ShooterCore/) | Base framework for a shooter game |
| [ShooterMaps](./ShooterMaps/) | Implementation of ShooterCore     |
| TopDownArena                  | *(coming eventually)*             |


# References

As I learn more about LyraStarterGame I'm keeping a list of references.

- [Epic Games Developer Discussion References](./Epic-Games-Developer-Discussion-References)

