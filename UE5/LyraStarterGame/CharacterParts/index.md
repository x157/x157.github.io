---
title: "Lyra Character Parts"
description: "Overview of UE5 Modular Character Parts as implemented in Lyra Starter Game"
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: "Character Parts"
---

# Lyra Character Parts

Lyra's Character Parts system is inspired by Fortnite.
The Character Parts are **purely cosmetic**, which allows for some nice efficiencies
in multiplayer games.  For example, the server can mostly ignore the cosmetics, and a local player's
own cosmetics can be much more detailed (and thus expensive) than a remote player's cosmetics.

You don't necessarily have to implement all of this optimization in your early game development,
but using the Lyra Character Parts system will give you the ability to add this later when your
game is a huge success that warrants these optimizations.

In general, the main Lyra Character mesh is invisible.
What you see as the visible Character is a "Character Part", which is purely cosmetic.
You can modify this so a Character is comprised of multiple parts if you prefer,
to easily support fully modular characters.


## Intro: TODO Show Final Working Example



## Conceptual Overview

- [Character Part](./CharacterPart)
  - a single cosmetic part
  - could be the full body mesh
  - could be just the head, or just the torso, etc
  - Character Part [Gameplay Tags drive the Character Animation Style](./CharacterPart#Animation)
- [Controller Component](./ControllerComponent)
  - determines which parts will be added to the controller's pawn
  - only present on the **Server** and the **Local Player** client *(because it's on the Controller)*
  - injected into **all** Controllers on the server, Player and Bot alike
- [Pawn Component](./PawnComponent) (AKA "Pawn Customizer")
  - handles replicating the controller-chosen parts to clients
  - present on **all** clients, including remote clients


## Vanilla Lyra Configuration

By default in Lyra 5.2 there are only 2 cosmetic components: `B_Manny` and `B_Quinn`

Lyra chooses randomly between Manny or Quinn and spawns that part on the server side
after the Controller `BeginPlay`; the part is then replicated to all clients.

The server itself uses an invisible Manny-sized Character mesh regardless of
how many cosmetic parts there are or what they look like.


## Content Used

You can obviously use your own content, but here is the free stuff I used:

- Lyra 5.2+
- [Stylized Character Kit: Casual 01](https://www.unrealengine.com/marketplace/en-US/product/stylized-male-character-kit-casual) from the Epic Games Marketplace


### Free Marketplace Asset: "Stylized Character Kit: Casual 01"

This content pack is currently free on the Epic Games Marketplace (it has been free for quite a while, so I hope
it will always be free).

[![Free Modular Character on Epic Games Marketplace](./screenshots/EGMP-ModularCharacter.png)](https://www.unrealengine.com/marketplace/en-US/product/stylized-male-character-kit-casual)


# References

- [Official Epic Video: Building Modular Characters in Unreal Engine (Unreal Fest 2022)](https://youtu.be/7IUpa3Pxqug)
- [Official Epic Docs: Modular Characters in UE5](https://docs.unrealengine.com/5.0/en-US/modular-characters-in-unreal-engine/)

