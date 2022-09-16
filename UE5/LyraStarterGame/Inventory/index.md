---
title: "LyraStarterGame Inventory System"
description: "Overview of the Inventory system in UE5 LyraStarterGame"
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: "Inventory System"
---


# LyraStarterGame Inventory System

This is an overview of the Inventory System in [LyraStarterGame](/UE5/LyraStarterGame/).

The Inventory System is the base upon which the
[Lyra Equipment System](/UE5/LyraStarterGame/Equipment/) and
[Lyra Weapon System](/UE5/LyraStarterGame/Weapons/) are built.

There is a lot of code here (including the Equipment and Weapons systems),
and for the most part it seems to work reasonably well for Lyra's
use case.  It is a good starting point that should give you a decent idea what Epic is thinking
with respect to inventory implementation.

Note that in my particular case, some fundamental changes were needed to support my game
requirements, however if your game is similar to Lyra's ShooterGame then you may not need
to do so yourself. My best path forward was to duplicate this code into my Game Feature,
refactor the names (`Lyra`🡒`XCL`) and then modify my version of the code.
It was fairly easy to do, it took about an hour.

Conversely, you could just start hacking the Lyra code itself to do what you want, but then
you will lose the ability to merge future Lyra updates from Epic, so that
is not the path that I will take.  *(If you haven't already read it,
[Lyra Development Considerations](/UE5/LyraStarterGame/Development-Considerations)
explains why I don't want to modify Lyra code/assets directly unless absolutely necessary).*

Note that this code is multiplayer-compatible.  If you aren't super familiar with UE network replication,
definitely read through these classes.  They demonstrate a method to serialize array diffs over the
network in UE methodology that I found interesting.


## Inventory Concepts

- [Item Definition](#ItemDefinition) (constant)
  - Consists of one or more [Item Fragments](#ItemFragments), for example:
    - `EquippableItem` (example of how to make a "category" of item, in this case an item the player can equip)
    - `SetStats` (IMO the most interesting and generally useful example)
    - etc
- [Item Instance](#ItemInstance)
  - A particular instance of a generic Item Definition
- [Inventory Manager](#InventoryManager) (Controller component)
  - Allows adding/removing Item Instances in inventory
  - Keeps track of the Item Instances in inventory
- [`IPickupable` Interface](#IPickupable)
  - Defines what actually goes into inventory when an item is picked up


<a id="ItemDefinition"></a>
## Item Definition

In order to store an item in inventory, the item must have an Item Definition.

This is essentially a simple constant config.  There is virtually no functionality associated with
a `ULyraInventoryItemDefinition`, it's just data.

At the core, an Item Definition is nothing more than a display name for the player, and an
array of Item Fragments that actually define the item.


<a id="ItemFragments"></a>
### Item Fragments

An Item Fragment contains one part of an Item Definition.
This is essentially how the Item Definition attains modularity.

You can create your own fragments by deriving from `ULyraInventoryItemFragment`.

The example code does a good job of illustrating modularity and reusability, but it is definitely not
performant.  There is a lot of searching for components and looping loops that could be optimized,
but again, in general it's a good example of the "what" related to inventory, if not the best "how".


#### Fragment: Equippable Item

`UInventoryFragment_EquippableItem` holds a reference to an
[Equipment Definition](/UE5/LyraStarterGame/Equipment/#EquipmentDefinition)
(`ULyraEquipmentDefinition`).

This fragment allows an Inventory Item to be a part of the
[Equipment System](/UE5/LyraStarterGame/Equipment/).
An item must have a fragment of this type for the player to be able to equip it.
Items that lack this fragment can still be stored in inventory, but cannot be equipped.

Think of this kind of like an interface.  When the user is trying to equip an item,
the C++ searches for an Item Definition Fragment of type `EquippableItem`.  If it exists
then the Equipment Definition reference is retrieved to perform equipment operations on.


<a id="Fragment_SetStats"></a>
#### Fragment: Set Stats

`UInventoryFragment_SetStats` is a numeric attribute set in the form of
a map of Gameplay Tags to integers.

For example in `ShooterCore` there is an `ID_Rifle` Item Definition that defines the Rifle weapon.

The `ID_Rifle` Item Definition includes a `SetStats` fragment with the following mappings:

| GameplayTag                            | Value |
|----------------------------------------|-------|
| `Lyra.ShooterGame.Weapon.MagazineSize` | 30    |
| `Lyra.ShooterGame.Weapon.MagazineAmmo` | 30    |
| `Lyra.ShooterGame.Weapon.SpareAmmo`    | 60    |


#### Fragment: Pickup Icon

`UInventoryFragment_PickupIcon` is specific to the Equipment Spawning Pads, and defines
the mesh to display at the pad, the display name of the item and the color for the pad.


#### Fragment: QuickBar Icon

`UInventoryFragment_QuickBarIcon` is specific to the QuickBar that displays on the bottom
right of the player's screen.

It defines the icons to display in the QuickBar to represent the item and its ammo.


#### Fragment: Reticle Config

`UInventoryFragment_ReticleConfig` is actually a part of the [Lyra Weapon System](/UE5/LyraStarterGame/Weapons/).

It's an array of widgets that comprise the reticle for a given weapon.


<a id="ItemInstance"></a>
## Item Instance

This is an "instance" of an Item Definition.
When a player obtains an item, they really receive an Item Instance.

An Item Instance consists of:

- A reference to the generic const Item Definition
- Gameplay Tag mapped numeric stats specific to this instance of the item
  - *(see the [SetStats Fragment](#Fragment_SetStats) which, if it exists, initializes this map)*


<a id="InventoryManager"></a>
## Inventory Manager

This component is what I consider to be the actual inventory itself.  Lyra expects you to put this
component on an `AController`.

Methods include things like:

- Add Item
- Remove Item
- Find Item
- Get Item Count
- Consume Item


<a id="IPickupable"></a>
## `IPickupable` Interface

In order for an item to be able to be picked up, it must support this pure virtual interface.

`GetPickupInventory` must be implemented by your item, which tells the base code how to add
the item to an inventory.
