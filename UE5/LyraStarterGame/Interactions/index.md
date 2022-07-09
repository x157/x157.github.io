---
title: LyraStarterGame Interaction System
description: Overview of the interaction system in LyraStarterGame
back_links:
    - link: /UE5/
      name: UE5
    - link: /UE5/LyraStarterGame/
      name: LyraStarterGame
back_link_title: Interactions
---

# LyraStarterGame Interaction System

The [Official UE5 Lyra Interaction Docs](https://docs.unrealengine.com/5.0/en-US/lyra-sample-game-interaction-system-in-unreal-engine/)
are definitely worth reading.  However, IMO they were clearly written by someone
who has far more knowledge about Lyra and Unreal Engine than I have,
and thus they omitted a ton of information that I had to figure out
myself to truly understand how the Lyra Interaction System works.

Lyra ships with a partially implemented, prototype inventory system.
This inventory system is based on the Lyra Interaction System and is
presented in a `PROTO` directory to highlight the fact it is not
ready to use without some work from you.

This seemed like a good place to do a deep dive into Lyra Interactions
to see how they put it together.  My findings from this exercise
are presented below.

To skip ahead and play with Epic's inventory prototype yourself,
check out the section
[How to Experience Epic's Inventory Prototype](#How_to_Experience_Epics_Inventory_Prototype).


### Fully Implemented: Automatic Proximity Interaction

As of UE 5.0.2 the only type of interaction that Epic has fully implemented
is such that there is only one possible interaction between the player
and an object, and that interaction is automatically triggered based on the player's
proximity to the object.

For example, the object gives you a weapon, or teleports you to another
part of the map, or damages or heals you while you stand near it.

If you do not require the ability to interact in other ways with your
objects then Lyra is fully functional as far as you are concerned.


### Partially Implemented: Player-Initiated Single Interaction

This is the subject of the inventory prototype that we're discussing here.

The difference between this and the automatic interaction is that in
this case the ability isn't activated automatically, but instead waits
for the player to optionally activate it.

For example, the player could selectively toggle a switch, or as in
the case Epic shipped for us to examine, pick up a rock.


### NOT Implemented: Multiple Interaction Options

If you want to give your player options, like *either* opening
a door *or* locking it *or* booby-trapping it *or* insert-your-idea-here,
then you will need to extend Lyra to add this functionality.

There is currently no code in Lyra that will allow you to do this, but there
is a good starting point that should hopefully not be too difficult to extend.


# Key Concepts

The key concepts you must understand to implement an interaction system
that your player chooses when to activate:

- [Gameplay Ability: `GA_Interact`](#GA_Interact)
  - Constantly scans the area around the player for Interactable objects
  - Grants the player other abilities based on the interactables nearby
- [Interactable Object: `B_InteractableRock`](#B_InteractableRock)
  - Example of an interactable object;
    an inert rock the player can interact with to pick it up
- [Gameplay Ability: `GA_Interaction_Collect`](#GA_Interaction_Collect)
  - The ability granted to the player when they are near a rock
  - When the user interacts with the rock, this ability removes the rock
    from the world and places it in the player's inventory


<a id="#GA_Interact"></a>
## Gameplay Ability: GA_Interact

Path: `ShooterMaps`/`PROTO`/`InventoryTest`/`Input`/`Abilities`/`GA_Interact`

This ability is granted to the `PlayerState`.  This is what allows the
player to interact with objects in the game.

You'll need to grant this ability to your player.  Lyra's prototype
does this as follows:

- `B_TestInventoryExperience` add action set:
    - `LAS_InventoryTest` add ability set to `ALyraPlayerState`:
        - `AbilitySet_InventoryTest` add ability:
            - `GA_Interact`

The `ActivateAbility` implementation for this Gameplay Ability:

- Start a [`UAbilityTask_GrantNearbyInteraction`](#UAbilityTask_GrantNearbyInteraction) Gameplay Task *(via the base C++ class, see below)*
- Start a [`UAbilityTask_WaitForInteractableTargets_SingleLineTrace`](#UAbilityTask_WaitForInteractableTargets_SingleLineTrace) Gameplay Task
- Start async loop listening for interaction input key presses

These 3 asynchronous tasks work together to allow interactions to occur.
Any time the player gets near an interactable object, the player is granted
whatever abilities that interactable object provides (such as "pick me up")
by [`UAbilityTask_GrantNearbyInteraction`](#UAbilityTask_GrantNearbyInteraction).

If the player looks at an object and presses the input key while near enough
to it, the granted ability is activated (for example the item is removed from the
world and placed into the player's inventory)
by [`UAbilityTask_WaitForInteractableTargets_SingleLineTrace`](#UAbilityTask_WaitForInteractableTargets_SingleLineTrace).

The key press is detected in the `GA_Interact` event graph.


<a id="#ULyraGameplayAbility_Interact"></a>
### Base C++ Class: `ULyraGameplayAbility_Interact`

`GA_Interact` uses `ULyraGameplayAbility_Interact` as its base C++ class.

The base class sets itself to activate on spawn, meaning that this ability
automatically activates as soon as it is granted to the player.  It also
uses the `LocalPredicted` `NetExecutionPolicy`, so it runs on both the client
and the server.

A [`UAbilityTask_GrantNearbyInteraction`](#UAbilityTask_GrantNearbyInteraction)
Gameplay Task is immediately created
on the server and replicates to the client.


<a id="#UAbilityTask_GrantNearbyInteraction"></a>
### Gameplay Task: `UAbilityTask_GrantNearbyInteraction`

This task sets a recurring timer to scan for interactable objects in front
of the player every X interval (configurable; default 0.1 seconds).

Each time it scans, it looks for objects that implement the
`IInteractableTarget` interface.  This interface may be implemented
by either the actor itself or by one of its components that was
hit by the `OverlapMultiByChannel` sphere trace.

The sphere trace uses the `Lyra_TraceChannel_Interaction` channel,
which is an alias to `ECC_GameTraceChannel1`.

Thus for an object to be interactable, it or one of its components
must implement `IInteractableTarget` AND it must overlap with ray
traces on `Lyra_TraceChannel_Interaction`.

The task constructs a list of all `FInteractionOption` for all
interactable objects detected in each sphere trace.
For every `FInteractionOption` detected, it then grants the `PlayerState`
whatever Gameplay Ability is defined by that option.


<a id="#UAbilityTask_WaitForInteractableTargets_SingleLineTrace"></a>
### Gameplay Task: `UAbilityTask_WaitForInteractableTargets_SingleLineTrace`

This task sets a recurring timer to scan for the first interactable
object in front of the player within interaction range.
It executes by default every 0.1 seconds on a timer.

This is configured in `GA_Interact` on construction to use
the `Interactable_BlockDynamic` line trace profile, which is
defined in `DefaultEngine.ini` to overlap `WorldDynamic` objects with
`Lyra_TraceChannel_Interaction`.

Any time the interactable object changes (either to or from a valid value),
the base Gameplay Task class
`UAbilityTask_WaitForInteractableTargets`
broadcasts the `InteractableObjectsChanged` delegate, which
`GA_Interact` uses to determine which interaction
option is currently available to the player, if any.


<a id="#B_InteractableRock"></a>
## Interactable Object: `B_InteractableRock`

Path: `ShooterMaps`/`PROTO`/`InventoryTest`/`B_InteractableRock`

This is a simple object that the user can pick up and add
to their inventory.

### Rock Collection Gameplay Ability

`B_InteractableRock` defines the following settings:

- Interaction Ability to Grant = [`GA_Interaction_Collect`](#GA_Interaction_Collect)
- Item Definition = `TestID_Rock`

This sets up the rock such that when a player gets near it,
the `PlayerState` will be automatically granted the
[`GA_Interaction_Collect`](#GA_Interaction_Collect)
Gameplay Ability.

`TestID_Rock` is a `ALyraInventoryItemDefinition`.  It determines what
will be placed in the player's inventory if the rock is picked up. In
this case, 1 rock.

This doesn't actually give the rock to the player, it just makes it
possible for the player to collect the rock if the player interacts
with it.

### Mesh Collision

The rock's static mesh has a custom collision profile such that it is
set to overlap with `Lyra_TraceChannel_Interaction`.

This is required so that the rock will be visible to the
<a href="#UAbilityTask_GrantNearbyInteraction">interaction detection trace</a>.


### Base C++ Class: `ALyraWorldCollectable`

`ALyraWorldCollectable` implements the `IInteractableTarget`
and `IPickupable` interfaces.

This is a very simple C++ class, all it does is define
a Gameplay Ability and an Item ID that are intended to be assigned
in Blueprints for each type of item that the user should be able to
pick up and put in their inventory.


<a id="#GA_Interaction_Collect"></a>
## Gameplay Ability: `GA_Interaction_Collect`

This Gameplay Ability is granted to the `PlayerState` by an interactable
object, for example [`B_InteractableRock`](#B_InteractableRock).
It is granted the player via
[`UAbilityTask_GrantNearbyInteraction`](#UAbilityTask_GrantNearbyInteraction).

This ability is invoked from a Gameplay Event by the `GA_Interact` base class
`TriggerInteraction` C++ method.  As such, it only implements the
`ActivateAbilityFromEvent` Gameplay Ability event.  The event data
contains the `Instigator` (the player's pawn) and `Target`
(the actor the player interacted with).

When activated, this Gameplay Ability:

- Deletes the `Target` (the rock)
    - Disable collision
    - Set lifespan = 3 seconds, after which deletion occurs
- Executes Gameplay Cue: `GameplayCue.ShooterGame.Interact.Collect`
- On Server only:
    - Add a rock to `Instigator` (player) inventory via `ULyraInventoryManagerComponent`
        - Which item to add is defined by [`B_InteractableRock`](#B_InteractableRock)
- On Client only:
    - Broadcast Gameplay Message: `Ability.Interaction.Duration.Message`
        - Duration = 0.5
- Plays a pickup animation


<a id="#How_to_Experience_Epics_Inventory_Prototype"></a>
# How to Experience Epic's Inventory Prototype

Path: `ShooterMaps`/`PROTO`/`InventoryTest`/`L_InventoryTestMap`

Epic has bundled the interaction and inventory systems into a single prototype
map.  The inventory system is built on top of the interaction system.

In their example, you will see the possibility for a single type of
interaction: pick up an item, adding it to your inventory. Unlike the other
interactions in Lyra, in addition to being in close proximity to the object,
this also requires the player to click an interaction button while looking
at the object.

There are numerous problems with the setup of this map, the assets it
uses, etc.  Hopefully Epic fixes this in a future version.  (As of 5.0.2
it is still broken).

### How to: Quick Hack without any real work

The main problem is that there are many assets that the `AssetManager` cannot
locate at run time.  A quick way to get around this, purely for testing within
the editor, is to simply open all of the files that are needed by the example.

Open these files in the Editor, and leave them open:

- `ShooterMaps`/`PROTO`/`InventoryTest`/`LAS_InventoryTest`
- `ShooterMaps`/`PROTO`/`InventoryTest`/`Input`/`Abilities`/`AbilitySet_InventoryTest`
- `ShooterMaps`/`PROTO`/`InventoryTest`/`Input`/`Actions`/`InputData_InventoryTest`
- `ShooterMaps`/`PROTO`/`InventoryTest`/`Input`/`Mappings`/`IMC_InventoryTest`

While you have `IMC_InventoryTest` open, you must change the default key binding
for the `IA_Interact` input action.
Epic set this default as `E`, but that is also used for melee attack,
so there is a conflict.
I changed it to `T` for demo purposes, which works.
Save this change.

With these 4 files open, and the `IA_Interact` input action bound to a unique
key, open the `L_InventoryTestMap` and press PIE.  Walk up to one of the big
black squares (those are "rocks"), and push `T` or whatever key you mapped to
`IA_Interact`.  You should see it hover over your head and disappear as it
was picked up and added to your inventory.

Open Map to PIE:
`ShooterMaps`/`PROTO`/`InventoryTest`/`L_InventoryTestMap`



### How to: Actually Fix the Inventory Prototype

UE Forum user
[aFlashyRhino](https://forums.unrealengine.com/u/aFlashyRhino)
revealed a detailed account of how to
fix this map and its assets to be functional.  If it's still broken in the
current version of Unreal Engine when you're reading this, check out
Garashka's [Fixing Lyra’s Inventory System](https://garashka.github.io/LyraDocs/lyra/fixing-inventory-system)
and
[this related forum post](https://forums.unrealengine.com/t/lyra-proto-inventory-system-world-collectable-item-issues/569301/5?u=xi57)
for more details.

If you follow that blog you should be able to get the inventory system into
a functional state so you can play with it to see how Epic intended for it
to be used.

Note that the prototype is nowhere near ready for you to extend and build
upon, so you will absolutely want to make your own system and NOT try to
use this at all.  It is quite clear that Epic does not intend for anyone to
actually use this part of Lyra in its current state.
It is only an example.
