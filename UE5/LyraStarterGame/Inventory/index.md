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
with respect to inventory implementation.  There is also some room for improvement,
which I address below.

- [Constructive Criticism](#ConstructiveCriticism) - reasons you may not be able to use this system as-is
- [Duplicate to Extend](#DuplicateToExtend) - how to duplicate this code to implement it yourself *(takes ~ 2 hours, saves many more)*

Note that this code supports multiplayer games.  If you aren't super familiar with UE network replication,
definitely read through these classes.  They demonstrate a method to serialize array diffs over the
network in UE methodology that I am quite sure will be useful in the future.


## Inventory Concepts

- [Item Definition](#ItemDefinition) (constant)
  - Consists of one or more [Item Fragments](#ItemFragments), for example:
    - `EquippableItem` (example of how to make a "category" of item, in this case an item the player can equip)
    - `SetStats` (IMO the most interesting and generally useful example)
    - etc
- [Item Instance](#ItemInstance)
  - A particular instance of a generic Item Definition
- [Inventory Manager](#InventoryManager) (Controller component)
  - Keeps track of the Item Instances in a Pawn's Inventory
- [`IPickupable` Interface](#IPickupable)
  - Defines what actually goes into Inventory when an item is picked up


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


<a id="ConstructiveCriticism"></a>
# Constructive Criticism

In my case, some fundamental changes were needed to the base Lyra Inventory System
to support my game requirements.

If your game is similar enough to Lyra's ShooterGame then this may not affect you at all, but
in case it does, I figured I'd shed some light on what I had to do to make this work for me.

Here are some of the issues with Lyra's Inventory System that I am modifying in my derivative implementation:

- Inconsistent, inadequate handling of item stack counts
  - There is code to allow for item stack counts, but it is ultimately non-functional and all stacks are effectively limited to size = `1`
    - *This doesn't really affect Lyra's ShooterGame, since all Item stack sizes == `1` in Lyra*
      - Ammo in Lyra isn't an inventory item, it is instead an attribute of the weapon, so it is not affected by this limitation
- Lyra does not support the concept of "filling stacks"
  *(not surprising since stack sizes are not functionally implemented)*
  - Lyra assumes you will ALWAYS create a new item instance when adding something to the inventory;
    it does not allow for updating of existing items
  - If I can stack up to 200x Things in a slot, then when I pick up 10x Things, I don't want a new stack
    with 10x Things; I want to add Things to my existing stacks until they hit the max 200x AND THEN add
    new stacks with the remainder as needed
    - I'd also like to know how many Things I successfully added; `0/10`? `3/10`? `10/10`?
- Lyra does not support the concept of "Inventory is Full" or otherwise "Failed to add to Inventory" conditions
  - The underlying Inventory code will never fail to add things
  - The only way Lyra puts things into Inventory is via the QuickBar, which is how they limit the inventory size
- Lyra puts the Inventory Manager on the Controller, so it is only available on the server
  and on the client that locally controls the Pawn
  - In my game, players need to be able to view/modify the inventory of AI Bots on their team, which required
    moving this component to the Pawn itself rather than its Controller
- See [Garashka: Fixing Lyra's Inventory System](https://garashka.github.io/LyraDocs/lyra/fixing-inventory-system)
  doc for a discussion of more issues specific to Lyra 5.0.3's prototype demo

I could go on...

Again, this is not to say the Lyra code is bad.  It's NOT bad.  It just doesn't implement inventories in the way
that I want to implement them in my game.

Given that the Lyra Inventory System isn't bad, it also is not a particularly good base inventory system.
What I mean is that it handles Lyra's ShooterGame inventory just fine, and the code is easy to follow.
However it also makes some significant assumptions (see above)
which result in it being **difficult to extend** the Lyra Inventory system.
It is not a good base implementation, it is instead a good example implementation.

Given that it is not very extensible, I adopted the "Duplicate to Extend" methodology for my own Inventory System.


<a id="DuplicateToExtend"></a>
# XCL Method: Duplicate to Extend

For XCL I decided the best path forward was to duplicate Lyra's Inventory+Equipment+Weapon Systems
into my Game Feature Plugin,
refactor the names and then modify my version of the code.
It was fairly easy to do, it took about 2 hours.  Most of the heavy lifting was done by Rider's
Refactor features.

It would have taken **far longer** to type this all out myself, so overall
it has been a clear net time savings to go this route.

Conversely, you could just start hacking the Lyra code itself to do what you want, but then
you will lose the ability to merge future Lyra updates from Epic, so that
is not the path that I took.  *(If you haven't already read it,
[Lyra Development Considerations](/UE5/LyraStarterGame/Development-Considerations)
explains why I don't want to modify Lyra code/assets directly unless absolutely necessary).*

## XCL Duplication Procedure

1. Duplicate Code as in the table below
2. Refactor all `Lyra` names to `XCL`
   - class names
   - method names
   - variable names
   - file names
   - etc
3. Rename files with inconsistent naming convention
4. Modify native Gameplay Tag names in the newly imported files: `Lyra` 🡒 `XCL`

I duplicated Public headers:

| Lyra C++ Path                  | XCL GameFeature Plugin Source          | Scope   | Relative Path  |
|--------------------------------|----------------------------------------|---------|----------------|
| `_LYRA_/Equipment/*.h`         | `Plugins/GameFeatures/XCL/Source/XCL/` | Public  | `/Equipment/`  |
| `_LYRA_/Inventory/*.h`         | `Plugins/GameFeatures/XCL/Source/XCL/` | Public  | `/Inventory/`  |
| `_LYRA_/Weapons/*.h`           | `Plugins/GameFeatures/XCL/Source/XCL/` | Public  | `/Weapons/`    |
| `_LYRA_/UI/Weapons/_WIDGET_.h` | `Plugins/GameFeatures/XCL/Source/XCL/` | Public  | `/UI/Weapons/` |

and Private implementation:

| Lyra C++ Path                    | XCL GameFeature Plugin Source          | Scope   | Relative Path  |
|----------------------------------|----------------------------------------|---------|----------------|
| `_LYRA_/Equipment/*.cpp`         | `Plugins/GameFeatures/XCL/Source/XCL/` | Private | `/Equipment/`  |
| `_LYRA_/Inventory/*.cpp`         | `Plugins/GameFeatures/XCL/Source/XCL/` | Private | `/Inventory/`  |
| `_LYRA_/Weapons/*.cpp`           | `Plugins/GameFeatures/XCL/Source/XCL/` | Private | `/Weapons/`    |
| `_LYRA_/UI/Weapons/_WIDGET_.cpp` | `Plugins/GameFeatures/XCL/Source/XCL/` | Private | `/UI/Weapons/` |

Template Variables:

- `_LYRA_` == `Source/LyraGame`
- `_WIDGET_` == `LyraReticleWidgetBase`
  - I only duplicated one widget: `LyraReticleWidgetBase`
    - This one is required by the base Weapon code
  - If you need others, duplicate them in the same way
