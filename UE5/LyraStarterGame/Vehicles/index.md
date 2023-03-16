---
title: "Adding Vehicles to Lyra"
description: "Discussion of various ways to add Chaos Vehicles to a LyraStarterGame project"
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: "Vehicles"
---

# Adding Vehicles to Lyra

There are multiple ways to add Vehicles to Lyra.

For our purposes, I will be fully implementing Chaos Vehicles in C++.
For a Blueprint-only solution, see
[this tutorial](https://dev.epicgames.com/community/learning/tutorials/mJ27/unreal-engine-lyra-chaos-vehicles),
courtesy of [Astaraa](https://dev.epicgames.com/community/profile/Aldo/Astaraa).
I used that tutorial as a starting point to understand Chaos Vehicles in Lyra.
Thanks Astaraa!  `:)`


## Procedure Overview

1. [Import Chaos Vehicle Template into your Lyra project](./How-To-Import-Chaos-Vehicle-Template-into-Lyra)
2. [Create Project Base Vehicle C++ Class](./Base-C++-Class)
3. [Duplicate Blueprint from Template](./How-To-Duplicate-Vehicle-Template-Blueprint-into-Lyra)


# Basic C++ Solution

- Add Ability System support (Lyra uses GAS)
  - Add Abilities
    - Death
  - Add Health
- Add Lyra Team support


# Advanced C++ Solution

- `AXclWheeledVehicle` Upgrades:
  - Add [Modular Gameplay](/UE5/ModularGameplay/) support
  - Add + Implement PawnExtensionComponent
