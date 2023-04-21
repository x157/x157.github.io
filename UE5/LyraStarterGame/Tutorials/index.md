---
title: LyraStarterGame Tutorials
description: LyraStarterGame Tutorials - Learn how to do cool stuff with LyraStarterGame
back_links:
  - link: /UE5/
    name: UE5
  - link: /UE5/LyraStarterGame/
    name: LyraStarterGame
back_link_title: Tutorials
---


# Getting Started Tutorials

You can't really do much at all with Lyra until you create your own LyraStarterGame project.

- [Getting Started: Set Up a New LyraStarterGame Project](../Getting-Started-Setting-Up-a-New-LyraStarterGame-Project)


# More Advanced Tutorials

Once you're up and running:

- [How to: Fix Unarmed Animation Bugs](./How-To-Fix-Lyra-Unarmed-Animation-Bugs)
- [How to: Create a New Gameplay Ability](./How-To-Create-a-New-Gameplay-Ability)
- [How to: Send Client Gameplay Ability Data to Server in C++](/UE5/GameplayAbilitySystem/How-To-Send-Client-Gameplay-Ability-Data-to-Server-in-C++)
- [How to: Take Control of the Mouse in Lyra](./How-to-Take-Control-of-the-Mouse)

Related material:

- [UE5 Gameplay Ability System Conceptual Overview](/UE5/GameplayAbilitySystem/)


# Source Code Management Tutorials

Git:

- [How to: Create a Lyra Git Repo](./How-to-Create-a-Lyra-Repo)
- [Procedure: Merge Epic Source into Git](./Procedure-Merge-Epic-Source-into-Git)

Perforce:

- [Perforce Server Setup for Lyra](/Perforce/)
- [Procedure: Merge Epic Source into Perforce](./Procedure-Merge-Epic-Source-into-Perforce)


# Interesting but not Particularly Useful

- [Upgrade ALyraPawn to use Gameplay Ability System](https://youtu.be/Y_j3PWhYgk4)
  - Unfortunately because UE5 completely ignores network replication for pawn movement, even if you upgrade the Pawn to support GAS, you still can't **MOVE** it in a networked game without writing 10000 lines of code.
  - It was still interesting to see how to add GAS to a new class so this tutorial is useful mainly for that purpose.


# Works in Progress

- [How to: Customize the Lyra FrontEnd](../How-To-Customize-Lyra-FrontEnd)
