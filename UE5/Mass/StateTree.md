---
title: "UE5 Mass StateTree integration"
description: "How to use StateTrees with Mass Entities"
breadcrumb_path: "UE5/Mass"
breadcrumb_name: "StateTree"
---

# Mass StateTree

You can create custom StateTrees and StateTree Tasks for use with Mass Entities.

- The StateTree must use the **Mass Behavior** schema (`UMassStateTreeSchema`)
  - This allows us to link Mass Fragments as External Data
- StateTree Tasks must derive from `FMassStateTreeTaskBase`


## UE 5.5 StateTree Task Examples

- [Look At](https://github.com/EpicGames/UnrealEngine/blob/5.5/Engine/Plugins/AI/MassAI/Source/MassAIBehavior/Public/Tasks/MassLookAtTask.h)
- Smart Object:
  [Find](https://github.com/EpicGames/UnrealEngine/blob/5.5/Engine/Plugins/AI/MassAI/Source/MassAIBehavior/Public/Tasks/MassFindSmartObjectTask.h),
  [Claim](https://github.com/EpicGames/UnrealEngine/blob/5.5/Engine/Plugins/AI/MassAI/Source/MassAIBehavior/Public/Tasks/MassClaimSmartObjectTask.h),
  [Use](https://github.com/EpicGames/UnrealEngine/blob/5.5/Engine/Plugins/AI/MassAI/Source/MassAIBehavior/Public/Tasks/MassUseSmartObjectTask.h)
- Zone Graph:
  [Path Follow](https://github.com/EpicGames/UnrealEngine/blob/5.5/Engine/Plugins/AI/MassAI/Source/MassAIBehavior/Public/Tasks/MassZoneGraphPathFollowTask.h),
  [Claim Wait Slot](https://github.com/EpicGames/UnrealEngine/blob/5.5/Engine/Plugins/AI/MassCrowd/Source/MassCrowd/Private/Tasks/MassCrowdClaimWaitSlotTask.cpp),
  [Stand](https://github.com/EpicGames/UnrealEngine/blob/5.5/Engine/Plugins/AI/MassAI/Source/MassAIBehavior/Public/Tasks/MassZoneGraphStandTask.h)
  - Find Zone Graph Target:
    [Escape](https://github.com/EpicGames/UnrealEngine/blob/5.5/Engine/Plugins/AI/MassAI/Source/MassAIBehavior/Public/Tasks/MassZoneGraphFindEscapeTarget.h),
    [Smart Object](https://github.com/EpicGames/UnrealEngine/blob/5.5/Engine/Plugins/AI/MassAI/Source/MassAIBehavior/Public/Tasks/MassZoneGraphFindSmartObjectTarget.h),
    [Wander](https://github.com/EpicGames/UnrealEngine/blob/5.5/Engine/Plugins/AI/MassCrowd/Source/MassCrowd/Public/Tasks/MassZoneGraphFindWanderTarget.h)


## Mass Entity Configuration

To configure an entity to use a StateTree:

- Create a new `State Tree` data asset (a `UStateTree`)
  - Choose schema: `MassStateTreeSchema` (aka "Mass Behavior")
  - Example name: `ST_MassEntity`
- Add a `UMassStateTreeTrait` to the entity config data asset
  - Select asset: `ST_MassEntity` *(the one you created for this entity)*


## StateTree Ticking

In general, the Mass StateTree is limited to the Game thread, however
**it does NOT necessarily tick on every frame**.

The Mass StateTree ticks for a given Entity only when it is
**explicitly signaled** by `UMassStateTreeProcessor`, which itself listens for and reacts to
specific `UMassSignalSubsystem` signals.

Thus, in your C++ code you must explicitly manage the ticking of the StateTree
and ensure to signal Mass every time you want a given StateTree to tick.

Due to this CPU-efficient ticking policy, in your StateTree Task `Tick` methods, you will see VERY HIGH
values for `DeltaTime`.  The `DeltaTime` in this case **is not** the game thread `DeltaTime`,
it is instead the full length of time that has elapsed since the last
explicit StateTree tick, which could be **many seconds** ago (or longer).
