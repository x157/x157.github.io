---
title: "Pros and Cons of using UE5 LyraStarterGame"
description: "Discussions of the various benefits and costs associated with game dev using Unreal Engine (UE5) LyraStarterGame"
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: "Pros and Cons"
---

# Pros and Cons of using Lyra

There are legitimate reasons to use Lyra and legitimate reasons **not** to use Lyra.

It's not that one is better than the other.  It depends entirely on your circumstance.

Both using and not using Lyra are valid choices.  You must decide which is best for you.

```text
    To Lyra, or Not to Lyra?

      -- He-Who-Shakes-Spears
```

*alter ego Native American poet*  `;-)`


## Pros

- Lyra uses UE 5.1 Standards for New Game Development
  - [Enhanced Input](https://dev.epicgames.com/community/learning/tutorials/eD13/unreal-engine-enhanced-input-in-ue5)
  - [Gameplay Ability System](/UE5/GameplayAbilitySystem/)
  - Implements [`ModularGameplay`](/UE5/ModularGameplay/) Plugin *(adds support for GFP)*
    - [GameFeature Plugins](/UE5/GameFeatures/) (GFP) support for optional seasonal and/or DLC content
  - [Multi-threaded Animations]() remove a major CPU bottleneck from UE4-style animations, which should no longer ever be used.
- Lyra is **already** a multiplayer game
  - You can add multiplayer features by copying Epic's examples
  - Great learning experience for people new to Unreal Networking
- Epic has done **weeks** or **months** of work for you
  - Stuff that **is not fun** to do, but **must be done** for every game.
    - Boilerplate code
      - Gameplay Message Subsystem (basically a message bus)
      - C++ system to support multi-threaded animations
      - Other fundamental game system functionality
- Lyra Games can be played in these configurations on Day 1:
  - Standalone
  - Listen Server (e.g. LAN or IP hosting from a client PC)
  - Dedicated Server
  - Remote Client


## Cons

- For a **New** game:
    - You're going to be forced to use:
      - the new UE 5.1 standard [Enhanced Input](https://dev.epicgames.com/community/learning/tutorials/eD13/unreal-engine-enhanced-input-in-ue5) *(new standard... you should probably do this...)*
      - `CommonUI` is the player input system
          - `CommonUI` is still kind of buggy/prototypey, is not well documented, and literally has CONTROL over player input.
          - If you do a shooter game like Lyra, this is no problem.
            - For a game where you want the player to actually use the mouse, you will need a custom engine to fix some `CommonUI` issues you will have.
            - The changes are minor, but you're forced to build and maintain a Custom Engine.
            - There are improvements coming in UE/Lyra 5.1, but it will still require you to maintain a Custom Engine.
      - Gameplay Ability System (GAS)
        - GAS is very complex. It is also THE UE STANDARD for how to execute abilities over the network.
        - The only reason I can think of you may **not** want to use GAS, is if you were wanting to explicitly build your own GAS as an experiment or learning opportunity.  I could be wrong.

- For an **Existing** game:
  - Replacing the input system may be a non-starter
    - Lyra forces use of [Enhanced Input](https://dev.epicgames.com/community/learning/tutorials/eD13/unreal-engine-enhanced-input-in-ue5)
    - Lyra forces you to use `CommonUI` as the player input system
  - Requires either implementing the `ModularGameplay` pattern in all of your base classes, or rebasing onto `ModularGameplayActors`
  - Thread-safe Animations are not compatible with UE4 animations.  You'll need to update every animation blueprint to be thread-safe, which honestly you should be doing anyway, because **Multi-threaded** Animations.
