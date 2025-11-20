---
title: "Mass Representation | UE5 Mass"
description: "How UE Mass Entities come to be represented in the Game World"
breadcrumb_path: "UE5/Mass"
breadcrumb_name: "Representation"
---

# Mass Representation

Version Documented: **UE 5.7**

Mass Entities don't necessarily exist in the Game World in the traditional sense that `AActor` and `UObject` do.
Instead, they sometimes exist in the World and sometimes exist only in Mass.

The default system that determines if, when and how to represent Mass Entities in the Game World is
Mass Representation. It is primarily driven by the
[Mass Representation Subsystem](#mass-representation-subsystem),
which integrates a few other subsystems and some Mass Processors.

Note that Mass Representation works in conjunction with the
[Mass LOD System](/UE5/Mass/LOD).
The presence of various LOD Tags on Mass Entities affects how the Representation system
represents the Entity in the world.

## Overview

- [Mass Representation Subsystem](#mass-representation-subsystem)
- [Mass Visualization Component](#mass-visualization-component)
- [Mass Actor Spawner Subsystem](#mass-actor-spawner-subsystem)
- [Mass Representation Processor](#mass-representation-processor)
- [Mass Update ISM Processor](#mass-update-ism-processor)

## Mass Representation Subsystem

`UMassRepresentationSubsystem`
[ [h](https://github.com/EpicGames/UnrealEngine/blob/5.7/Engine/Plugins/Runtime/MassGameplay/Source/MassRepresentation/Public/MassRepresentationSubsystem.h)
| [cpp](https://github.com/EpicGames/UnrealEngine/blob/5.7/Engine/Plugins/Runtime/MassGameplay/Source/MassRepresentation/Private/MassRepresentationSubsystem.cpp)
]

- Hooks into `UMassSimulationSubsystem` processing phases: `PrePhysics` and `PostPhysics`
    - `PrePhysics` = "Prepare" phase
	    - Prepare for and accept incoming information
    - `PostPhysics` = "Commit" phase
        - No new info is accepted; process all the info we got during `PrePhysics`

#### Per-Instance ISM Data Iterator: `FMassISMCSharedDataMap::FDirtyIterator`

I'm calling this out specifically in case you're interested in making your own Representation system.
This iterator manages per-instance ISM data including whether the data is "dirty" or not.

An important efficiency optimization is to only process Entities whose data has actually changed.
This class demonstrates a possible solution to the problem.

## Mass Visualization Component

`UMassVisualizationComponent`
[ [h](https://github.com/EpicGames/UnrealEngine/blob/5.7/Engine/Plugins/Runtime/MassGameplay/Source/MassRepresentation/Public/MassVisualizationComponent.h)
| [cpp](https://github.com/EpicGames/UnrealEngine/blob/5.7/Engine/Plugins/Runtime/MassGameplay/Source/MassRepresentation/Private/MassVisualizationComponent.cpp)
]

## Mass Actor Spawner Subsystem

`UMassActorSpawnerSubsystem`
[ [h](https://github.com/EpicGames/UnrealEngine/blob/5.7/Engine/Plugins/Runtime/MassGameplay/Source/MassActors/Public/MassActorSpawnerSubsystem.h)
| [cpp](https://github.com/EpicGames/UnrealEngine/blob/5.7/Engine/Plugins/Runtime/MassGameplay/Source/MassActors/Private/MassActorSpawnerSubsystem.cpp)
]

## Mass Representation Processor

`UMassRepresentationProcessor`
[ [h](https://github.com/EpicGames/UnrealEngine/blob/5.7/Engine/Plugins/Runtime/MassGameplay/Source/MassRepresentation/Public/MassRepresentationProcessor.h)
| [cpp](https://github.com/EpicGames/UnrealEngine/blob/5.7/Engine/Plugins/Runtime/MassGameplay/Source/MassRepresentation/Private/MassRepresentationProcessor.cpp)
]

### Mass Update ISM Processor
`UMassUpdateISMProcessor`
[ [h](https://github.com/EpicGames/UnrealEngine/blob/5.7/Engine/Plugins/Runtime/MassGameplay/Source/MassRepresentation/Public/MassUpdateISMProcessor.h)
| [cpp](https://github.com/EpicGames/UnrealEngine/blob/5.7/Engine/Plugins/Runtime/MassGameplay/Source/MassRepresentation/Private/MassUpdateISMProcessor.cpp)
]
