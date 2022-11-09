---
title: "LyraStarterGame Overview"
description: "Learn how to make a new game based on UE5's Lyra Starter Game (LyraStarterGame)"
breadcrumb_path: "UE5"
breadcrumb_name: "LyraStarterGame"
---


# Make Your UE5 Game from Lyra

Don't start from scratch!  Start from Lyra.

Epic suggests that you **start your new game based on Lyra**.

Michael Noland, an architect of Lyra, says the intent is for us to think of Lyra like engine code.
That is, use it as a base, try to **not modify it** as much as possible, and build our new games on top of it.

The cost to us is simply to learn how they've put things together, and how to extend the framework
Epic has given us.

[Pros and Cons](./Pros-and-Cons) discusses why you may or may not want to use Lyra yourself.
There are legitimate reasons both to use and to not use Lyra depending on your circumstances.

There are multiple viable ways to base your game on Lyra.  Several viable options,
including my preferred option, are documented here:
[Extending Lyra: Development Considerations](./Development-Considerations)



# Getting Started

Ready to create your own LyraStarterGame project?

- [Epic official tutorial: How to create a new Game Feature Plugin and Experience in Lyra](https://dev.epicgames.com/community/learning/tutorials/rdW2/unreal-engine-how-to-create-a-new-game-feature-plugin-and-experience-in-lyra)

I made this How-To before an official one was available, I leave it here for posterity:

- [Set Up a New LyraStarterGame Project](./Getting-Started-Setting-Up-a-New-LyraStarterGame-Project)


# Lyra Concepts

## Project Organization

IMO you should try to not modify the base Lyra game unless you **really must**.
The entire namespace of the base game should be considered to be reserved by Lyra.

- Content goes into GameFeature Plugins (GFPs)
- Core C++ can go into a regular Plugin
  - Practically speaking this is ideal, though it is optional

At the very least you need to create one GFP for your Content.


## Player Input

Common UI "owns" player input

  - [High Level Overview of Common UI in General](/UE5/CommonUI/)
  - [How Common UI is Setup in Lyra](./CommonUI/)


## Gameplay Ability System (GAS)

  - [How to: Create a New Gameplay Ability](./Tutorials/How-To-Create-a-New-Gameplay-Ability)
  - GAS Learning Resources:
    - [UE5 Gameplay Ability System Conceptual Overview](/UE5/GameplayAbilitySystem/)
    - [How to: Send Client Gameplay Ability Data to Server in C++](/UE5/GameplayAbilitySystem/How-To-Send-Client-Gameplay-Ability-Data-to-Server-in-C++)
    - [UE5 Enhanced Input Gameplay Abilities -- Pressed Trigger vs Down Trigger](https://youtu.be/P-dyHJhoqxA)

# Lyra Gameplay Systems

[Health and Damage System](./Health-and-Damage/) (implemented via GAS Attributes + Effects)
answers questions like:

  - How do I give an actor/pawn health?
  - How to I heal, damage and kill an actor/pawn?


# Lyra Character

- [Shooter Mannequin Character](./ShooterMannequin)
  - `B_Hero_ShooterMannequin` is the base Character class in Lyra, you will definitely want to understand it well
  - Demonstrates key concept: Asynchronous, inter-dependent `ModularGameplay` Initialization of Pawn components
- Lyra provides a great `Character` base, but *does not provide* a useful `Pawn`.
  - This seems to be typical in UE5; Characters are first class, Pawns are completely up to you.


# Lyra Prototype Systems

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

