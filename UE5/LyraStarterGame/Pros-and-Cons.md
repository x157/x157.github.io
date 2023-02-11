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
  - [Multi-threaded Animations]()
  - [Enhanced Input](https://dev.epicgames.com/community/learning/tutorials/eD13/unreal-engine-enhanced-input-in-ue5)
  - [Gameplay Ability System](/UE5/GameplayAbilitySystem/)
  - Implements [`ModularGameplay`](/UE5/ModularGameplay/) Plugin
    - Adds support for [GameFeature Plugins](/UE5/GameFeatures/) for optional seasonal and/or DLC content, etc
- Lyra is **already** a multiplayer game
  - You can add multiplayer features by copying Epic's examples
  - Great learning experience for people new to Unreal Networking
- Epic has done **weeks** or **months** of work for you
  - Stuff that **is not fun** to do, but **must be done** for every game.
    - Gameplay Message Subsystem
    - C++ system to support multi-threaded animations
    - Other Fundamental Game System Functionality
    - Lots of Boilerplate Code
- Lyra Games can be played in these configurations on Day 1:
  - Standalone
  - Listen Server (e.g. LAN or IP hosting from a client PC)
  - Dedicated Server
  - Remote Client


## Cons

- For a **New** game:
    - You're going to be forced to use:
      - the new UE 5.1 standard [Enhanced Input](https://dev.epicgames.com/community/learning/tutorials/eD13/unreal-engine-enhanced-input-in-ue5) *(you should probably use this anyway...)*
      - `CommonUI` is the player input system
          - `CommonUI` is still in the experimental development phase, meaning it is changing A LOT
            with each release, is not particularly well documented,
            and literally has CONTROL over player input.
            - I have attempted to demystify [CommonUI](/UE5/CommonUI/), but it's a beast.
          - Non-shooter Inputs will require some setup
            - Lyra supports shooter style input controls out of the box.
            - For an RTS or MOBA game where you want the player to actually use the mouse,
              you will need to do some cusomization of `CommonUI` to get it to work.
              - In Engines 5.1 and before this required a custom Engine.
              - Engine 5.2+ supports this by default, see [this GitHub issue](https://github.com/x157/x157.github.io/issues/14) for more info.
      - Gameplay Ability System (GAS)
        - GAS is very complex. It is also THE UE STANDARD for how to execute abilities over the network.
        - The only reason I can think of you may **not** want to use GAS, is if you were wanting to explicitly build your own GAS as an experiment or learning opportunity.  I could be wrong.

- For an **Existing** game:
  - Replacing the input system may be a non-starter
    - Lyra forces use of [Enhanced Input](https://dev.epicgames.com/community/learning/tutorials/eD13/unreal-engine-enhanced-input-in-ue5)
    - Lyra forces you to use `CommonUI` as the player input system
  - Requires either implementing the `ModularGameplay` pattern in all of your base classes, or rebasing onto `ModularGameplayActors`
  - Thread-safe Animations are not compatible with UE4 animations.
    You'll need to update every animation blueprint to be thread-safe,
    which honestly you should be doing anyway, because **Multi-Threaded Animations**.

- For any game:
  - Lyra is complex and will take time to learn
    - The core of Lyra is intended to allow for things like
      - more than 1 style of game play (a Lyra "Experience")
      - 1st class support for gamepads, touchscreen and MKB inputs
      - high performance, multi-threaded animations
      - expansion packs and seasonal content packs
    - Supporting all of these things is far more difficult and complex than **not** supporting these things
      - Is Lyra "too" complex, or "overly" complicated?
        - If you **do not want** the above features in your game, then yes. Lyra is probably overkill for you in that case.
        - If you **DO WANT** the features listed above, then Lyra isn't overkill, it's an example implementation with a pretty good base.

# To Lyra, or not to Lyra?

At the end of the day, the question you need to pose to yourself is this:

- Would I rather spend time trying to plug all these systems together myself, and try to get it all working on my own?
  - Keep in mind many of these systems are new and not well documented. *A shocker, I know.*

[OR]

- Would I rather spend time learning how Epic actually DID plug all these systems together and get it all working?

Either way it is a time investment and a learning experience.  There is no wrong choice.
It's up to you.
