---
title: "LyraStarterGame Equipment System"
description: "Overview of the Equipment system in UE5 LyraStarterGame"
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: "Equipment System"
---


# LyraStarterGame Equipment System

This is an overview of the Equipment System in [LyraStarterGame](/UE5/LyraStarterGame/).

A piece of Equipment in Lyra is an Inventory Item
that has a particular Item Definition Fragment that identifies it as
being Equipment. Thus, this system is based on the
[Lyra Inventory System](/UE5/LyraStarterGame/Inventory/),
so make sure you're familiar with that as well.

The Lyra Equipment System is the base for the [Lyra Weapon System](/UE5/LyraStarterGame/Weapons/).

Note that although the Equipment Definition and Equipment Instance share a naming
convention with the Inventory Definition and Inventory Instance,
**the relationship between the objects is different**.
This is potentially confusing, so be aware of it.


## Equipment Concepts

- [Equipment Definition](#EquipmentDefinition) (constant)
  - Correlates an Equipment Instance with the abilities it grants
  - Determines how and where the equipment attaches to a Pawn
- [Equipment Instance](#EquipmentInstance)
  - A piece of equipment spawned and applied to a Pawn
  - The specific subclass is part of the Equipment Definition
- [Equipment Manager](#EquipmentManager) (Pawn Component)
  - Allows equipping/unequipping items
  - Keeps track of equipment in use
- [Pickup Definition](#PickupDefinition) (constant)
  - Defines a Weapon/Item in the world that can be picked up
- [QuickBar Component](#QuickBarComponent) (Controller Component)
  - The player's only interface to the Equipment Manager
  - Controls which piece of Equipment the Pawn has equipped at any given time

## Related Gameplay Abilities

- [Equipment Ability](#EquipmentAbility)
  - The base Gameplay Ability for Equipment-related abilities


<a id="EquipmentDefinition"></a>
## Equipment Definition

This is a simple constant config.  There is no functionality associated with
a `ULyraEquipmentDefinition`, it's just data.

An Equipment Definition consists of:

- Type of Equipment (subclass of `ULyraEquipmentInstance`)
- Array of Ability Sets to grant on equip
  - The abilities don't necessarily have to be based on `ULyraGameplayAbility_FromEquipment`
- Array of Actors to spawn on equip, including:
  - Which socket to attach each to
  - Attachment transform


<a id="EquipmentInstance"></a>
## Equipment Instance

`ULyraEquipmentInstance` handles spawning and destroying the equipment actors as needed
for a given piece of equipment.

Note that unlike the Item Instance, an Equipment Instance subclass is actually a required
part of the Equipment Definition.  Thus it is not only an instance of the Equipment
Definition, but it is also a dependency of it, which is kind of weird.


<a id="EquipmentManager"></a>
## Equipment Manager

`ULyraEquipmentManagerComponent` is a Pawn Component.  It must be attached to a Pawn.

The Equipment Manager keeps track of the equipment this Pawn currently has
available and allows for the Pawn to equip or unequip any given piece of equipment.
It uses `FLyraEquipmentList` to achieve this.  The owner of the `FLyraEquipmentList`
is the Equipment Manager itself.

It invokes Equipment Instance -> `OnEquipped()` and `OnUnequipped()` as appropriate.

The core functionality is implemented in the [`EquipItem`](#EquipmentManagerComponent) method.


<a id="PickupDefinition"></a>
## Pickup Definition

This is kind of weird because they implemented base Inventory Item Pickup in the
same place as Weapon Pickup.

In any case, the Pickup Definitions define things like:

- Inventory Item Definition to spawn on pickup
- Display Mesh
- Pickup cooldowns, effects, etc


<a id="QuickBarComponent"></a>
## QuickBar Component

Controls which item the Pawn has equipped.

- Limits the number of usable Equippable Items in inventory based on the number of slots
- Manages which item is equipped via Equipment Manager

Note that in Lyra the QuickBar Component is **required** to be able to use equipment.
While this works fine in Lyra's simple ShooterGame concept,
I can't say I'm a huge fan of this design choice.

The key to Lyra's QuickBar-based Equipment System is
`ULyraQuickBarComponent`::`SetActiveSlotIndex_Implementation`,
which is the only piece of code in Lyra that causes equipment to be equipped or unequipped.

`SetActiveSlotIndex_Implementation` calls `UnequipItemInSlot` (unequip item in old slot, if any)
followed by `EquipItemInSlot` (equip item in new slot, if any).
In both cases the under-the-hood work is performed by the
[Equipment Manager](#EquipmentManager).

The QuickBar Component has virtually no utility for AI Bots and yet every Bot is forced
to have one.  In my game, there are WAAAAAY more Bots than there are players, and so
having to put components that are only useful for players on every Bot is fairly
inefficient in my case.
It seems rather easy to remove this dependency, and so in my own Equipment System
implementation, that is what I plan to do.


<a id="EquipmentAbility"></a>
## Equipment Ability

`ULyraGameplayAbility_FromEquipment` is provided as a new Base Ability class for
Equipment-related abilities.

The key functionality provided here includes:

- Get **Associated Equipment**
  - Current Ability Spec `SourceObject` cast to Equipment Instance (`ULyraEquipmentInstance`)
- Get **Associated Item**
  - Associated Equipment Instigator cast to Item Instance (`ULyraInventoryItemInstance`)

The Associated Equipment `SourceObject` value is assigned by
[`FLyraEquipmentList`::`AddEntry`](#EquipmentList_AddEntry)
during the construction of the Equipment Instance.

Thus any Ability deriving from this base (or implementing similar functionality)
can easily access the underlying Weapon Instance and its base Item Instance.

The Associated Equipment `Instigator` value is assigned by
`ULyraQuickBarComponent`::`EquipItemInSlot` whenever a piece of equipment is chosen
to be equipped by the Pawn to be the underlying Inventory Item Instance.


# Important Code to Consider

Particularly if you are going to be implementing a system similar to this yourself, the following
is some important code that helps to support the equipment/weapon abilities.

You should consider this to understand how it helps support the system overall.


<a id="EquipmentManagerComponent"></a>
### `ULyraEquipmentManagerComponent`::`EquipItem`

```c++
ULyraEquipmentInstance* EquipItem (TSubclassOf<ULyraEquipmentDefinition> EquipmentDefinition);
```

Called whenever a new piece of equipment should be equipped.
An Equipment Instance is spawned based on the Equipment Definition.

The Equipment Instance is created via a call to:

<a id="EquipmentList_AddEntry"></a>
### `FLyraEquipmentList`::`AddEntry`

```c++
ULyraEquipmentInstance* AddEntry (TSubclassOf<ULyraEquipmentDefinition> EquipmentDefinition);
```

- Creates a new Equipment Instance (`ULyraEquipmentInstance`)
  based on the Equipment Definition (`ULyraEquipmentDefinition`)
  - Equipment Instance Owner = The Equipment Manager's Owner Actor
- Adds the equipment's ability sets to the Equipment Manager Owner's ASC
  - Sets `SourceObject` for each ability to the Equipment Instance
- Spawns the equipment actors

