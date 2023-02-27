---
title: "LyraStarterGame Overview"
description: "Learn how to make a new game based on UE5 LyraStarterGame (Lyra)"
breadcrumb_path: "UE5"
breadcrumb_name: "LyraStarterGame"
---


# Build your Game on Lyra

Don't start from scratch!  Start from Lyra.

Epic suggests that you **start your new game based on Lyra**.
They say the intent is for us to think of Lyra like engine code.
That is, use it as a base and build our new games on top of it.

The cost to us is simply to learn how they configured the game
and how to extend the framework they have built.

[Pros and Cons](./Pros-and-Cons) discusses why you may or may not want to use Lyra yourself.
There are legitimate reasons both to use and to not use Lyra depending on your circumstances.

There are multiple viable ways to base your game on Lyra.
Some options are discussed here:

[Extending Lyra: Development Considerations](./Development-Considerations)



# Unofficial Lyra Dev Network Community Discord

<div style="float:left; margin-right: 1em; margin-bottom: 1em">
<a href="https://discord.gg/RS99Jcur6q" target="_blank"><img
  src="https://discord.com/api/guilds/911050282996228217/embed.png?style=banner3"/></a>
</div>

We have a community Discord for discussing Lyra game development.

Open to C++ devs, BP devs and enthusiasts.

Please be respectful of others.

Dev talk only.  No politics, religion or hate.

<div style="clear:both"></div>


# Getting Started

Ready to create your own LyraStarterGame project?

- [Epic official tutorial: How to create a new Game Feature Plugin and Experience in Lyra](https://dev.epicgames.com/community/learning/tutorials/rdW2/unreal-engine-how-to-create-a-new-game-feature-plugin-and-experience-in-lyra)

I made this How-To before an official one was available, I leave it here for posterity: [Set Up a New LyraStarterGame Project](./Getting-Started-Setting-Up-a-New-LyraStarterGame-Project)


# Lyra Concepts

## Project Organization

IMO you should try to not modify the base Lyra game unless you **really must**.
The entire namespace of the base game should be considered to be reserved by Lyra.

- Content goes into GameFeature Plugins (GFPs)
- Core C++ can go into a regular Plugin
  - Practically speaking this is ideal, though it is optional

At the very least you need to create one GFP for your Content.

## Upgrading Lyra Core

Epic will sometimes upgrade the Engine and/or Lyra Core.

[Upgrading Lyra Core](./Upgrading-Lyra-Core/)
discusses how I try to make this process as easy on myself as possible.

[Re-save Assets on Engine Update](/UE5/Engine/Resave-Assets)
discusses the need to explicitly re-save many binary project assets any time you
update the Engine version.  This is a UE requirement that significantly affects
Editor startup time.


## Player Input

Common UI "owns" player input

  - [Lyra Input Overview](./Input/)
  - [How Common UI is Setup in Lyra](./CommonUI/)
  - [High Level Overview of Common UI in General](/UE5/CommonUI/)


## Lyra Game Mode

- [Lyra Experience](./Experience/)
  - How & Why Lyra loads itself and your GFPs the way it does
- [Lyra Game Initialization](./InitGame/)
  - Debug Tracing to illustrate how a Lyra World starts up and initializes itself
- [Lyra Game Phase Subsystem](./GamePhaseSubsystem/)
  - Once a game is playing, how to manage different phases of game play
- [Lyra Plugins](./Plugins/)
  - Overview of the Plugins Epic distributes via the Lyra project


## Lyra Gameplay Systems

- [Equipment System](./Equipment/) *(prototype)*
  - Inventory extension: Inventory Items that are pieces of Equipment usable by Pawns
- [Health and Damage System](./Health-and-Damage/)
  - Based on Gameplay Ability System Attributes & Effects
- [Interaction System](./Interactions/) *(prototype)*
  - Allows the player to interact with Actors in the World
- [Inventory System](./Inventory/) *(prototype)*
  - Allows pawns to keep items in inventory
- [Team System](./Teams/)
  - Organize Players, Pawns, etc into Teams
- [Weapon System](./Weapons/) *(prototype)*
  - Equipment extension: Equipment Items that are Weapons usable by Pawns


## Lyra Character

- [Shooter Mannequin Character](./ShooterMannequin)
  - `B_Hero_ShooterMannequin` is the base Character class in Lyra, you will definitely want to understand it well
  - Demonstrates key concept: Asynchronous, inter-dependent `ModularGameplay` Initialization of Pawn components
- Lyra provides a great `Character` base, but *does not provide* a useful `Pawn`.
  - This seems to be typical in UE5; Characters are first class, Pawns are completely up to you.


## Gameplay Ability System (GAS)

#### Lyra-Specific GAS Resources

- [How to: Create a New Gameplay Ability](./Tutorials/How-To-Create-a-New-Gameplay-Ability)
- Lyra Ability Tag Relationship Maps
  - [Tutorial courtesy of ScaleSculptor](https://www.artstation.com/blogs/scalesculptor/ZgqV/ability-tag-relationship-maps-in-lyra)
- C++ Examples:
  - [How to: Send Client Gameplay Ability Data to Server in C++](/UE5/GameplayAbilitySystem/How-To-Send-Client-Gameplay-Ability-Data-to-Server-in-C++)
  - [Target Dummy Actor Full C++ Example](https://github.com/x157/Lyra-ActorWithAbilities) (Github)

#### General GAS Resources

- [UE5 Gameplay Ability System Conceptual Overview](/UE5/GameplayAbilitySystem/)
- Gameplay Attributes:
    - [Attributes and Attribute Sets](https://docs.unrealengine.com/5.0/en-US/gameplay-attributes-and-attribute-sets-for-the-gameplay-ability-system-in-unreal-engine/) (Epic Documentation)
    - [Attributes and Gameplay Effects](https://docs.unrealengine.com/5.0/en-US/gameplay-attributes-and-gameplay-effects-for-the-gameplay-ability-system-in-unreal-engine/) (Epic Documentation)


# Misc Lyra Stuff

In an effort to understand the material Epic has provided us to start with, I am dissecting the GameFeature plugins they shipped to understand what they do, how they're similar and how they differ from one another.

| Module                        | Description                       |
|-------------------------------|-----------------------------------|
| [ShooterCore](./ShooterCore/) | Base framework for a shooter game |
| [ShooterMaps](./ShooterMaps/) | Implementation of ShooterCore     |
| TopDownArena                  | *(will probably skip this)*       |

Bug fixes:

- [How to: Resave Lyra 5.1 Assets for faster Editor Load Times](./How-To-Resave-Assets-v5.1)
- [How to: Fix Lyra's Unarmed Animation Bugs](./Tutorials/How-To-Fix-Lyra-Unarmed-Animation-Bugs)

Works in progress:

- [How to: Customize the Lyra FrontEnd](./How-To-Customize-Lyra-FrontEnd) *(incomplete; coming eventually)*


# References

As I learn more about LyraStarterGame I'm keeping a list of references.

- [Epic Games Developer Discussion References](./Epic-Games-Developer-Discussion-References)

