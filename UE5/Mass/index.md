---
title: "Mass Entities in UE5"
description: "Overview of Unreal Engine's MassAI, MassEntity, MassGameplay and associated modules."
breadcrumb_path: "UE5"
breadcrumb_name: "Mass"
---

# Mass Entities in UE5

Before you read this, make sure you have watched the official Epic Games Video:
[Large Numbers of Entities with Mass in Unreal Engine 5](https://www.youtube.com/watch?v=f9q8A-9DvPo)
by Mario Palermo.  If you're not really sure what Mass is or why you may want to use it,
Mario explains it very well.

Once you've decided that Mass is for you and you want to learn how to actually build things with it,
this info should help you quickly discover where to look in C++ and how the C++ fits together
in the big picture.
See also [Other Mass Resources](#SeeAlso) that I have found useful.

If you are coding UE 5.4 Mass, see my [Recommended PRs](#RecommendedPRs)
for some bug fixes and new Mass features.

## Section Overview

- [Experimental Modules](#ExperimentalModules)
- [Important Mass Subsystems](#MassSubsystems)
- [Mass Entity Manager](#EntityManager)
- [Mass Simulation](#Simulation)
- [Mass Processing Phase Manager](#PhaseManager)
- [Debugging Tips](#DebuggingTips)
- [Recommended PRs for UE 5.4](#RecommendedPRs)
- [Other Mass Resources](#SeeAlso)


<a id='ExperimentalModules'></a>
## Experimental Modules

Mass is implemented by several different modules,
all of which are under heavy development as of UE 5.5.
Since 5.2 the API has changed, and it is expected that it
**will change** some more in future versions.

For example, in 5.5 `MassEntity` is converting from an optional Plugin into a core Engine module,
complicating Engine plugin/source merges for pre-5.5 Engines.
Knowing about this change, you can easily do the necessary manual git merge.
It's not terribly difficult, but it is extra manual future-work to be aware of
if you are already using 5.4 or a previous version.


<a id='MassSubsystems'></a>
## Important Mass Subsystems

Mass requires a lot of subsystems to function.
Explanation of all of them is beyond the scope of this document.
The really important ones you absolutely should know about at a bare minimum are:

- `UMassEntitySubsystem` (World Subsystem in `MassEntity` plugin)
  - hosts the default instance of `FMassEntityManager` for a given world
- `UMassSimulationSubsystem` (World Subsystem in `MassGameplay` plugin)
  - implements `FMassProcessingPhaseManager`
  - uses `UMassEntitySubsystem` current World `FMassEntityManager` instance

### Editor Subsystems

- `UMassEntityEditorSubsystem` (Editor Subsystem in `MassEntity` plugin)
  - In Editor and during PIE this subsystem manages the simulation ticking


<a id='EntityManager'></a>
## Mass Entity Manager

This is the set of all entities that exist in the sim.  It's a memory container.

`UMassEntityManager` is responsible for hosting Entities managing Archetypes.
Entities are stored as FEntityData entries in a chunked array.
Each valid entity is assigned to an Archetype that store the fragments associated with a given entity at the moment.

As of 5.4 there are 2 Entity Managers in Editor:

- Game Entity Manager
  - Owned by `UMassEntitySubsystem`
    - Create/destroy one for each game world
- Editor Module's Entity Manager
  - Owned by `UMassEntityEditorSubsystem`
    - Always exists in Editor

### TODO - IMPORTANT CLASS - DOCUMENT API


<a id='Simulation'></a>
## Mass Simulation

You can start and stop the simulation, which triggers some events and
manages the ticking of `FMassProcessingPhaseManager`
which does all the actual work of running the simulation.
When you stop a simulation, it performs a full reset and discards all data.

You can disable the simulation entirely by setting the CVar
`mass.SimulationTickingEnabled` to false.

### How/when/where does the Simulation start/stop?

`UMassSimulationSubsystem::StartSimulation` is the method that actually starts the simulation ticking.

By default, it's called in these cases:

1. In Editor during Editor subsystem `PostInitialize` (when Editor starts; starts Editor sim)
2. On World `BeginPlay` (starts Game sim)
3. When you change CVar `bSimulationTickingEnabled` from `false` to `true`, if the World has begun play.

#### Editor world simulation

`UMassEntityEditorSubsystem` runs a second simulation for the Editor world.
This simulation runs any time the Editor is running, but not during PIE.
Thus, there is always 1 sim running in Editor, it's either the Editor sim or the Game World sim.

When PIE starts, the Editor sim is stopped. World load auto-starts the Game sim.

When PIE ends, the Editor sim is restarted. World unload auto-stops the Game sim.

Note: In 5.4 this is bugged, see [PR #12249](https://github.com/EpicGames/UnrealEngine/pull/12249) for the fix (which is a 5.5 patch so you'll have to manually merge it into 5.4 if you're still on 5.4).


<a id='PhaseManager'></a>
## Mass Processing Phase Manager

`FMassProcessingPhaseManager` is the C++ class that actually handles ticking the simulation
through the defined ordered phases of execution.

The World Sim subsystem owns one and the Editor Sim subsystem owns a second one.

As of 5.4 there isn't much ability to customize or override this without modifying the engine.

### Initialization

- set `ProcessingExecutionFlags`
- for each `EMassProcessingPhase` in ascending order:
  - create new Phase Processor `UMassCompositeProcessor`

### Mass Processing Phases (UE 5.4)

During each Editor/Game tick, the `PhaseManager` processes these phases in ascending order.

```c++
UENUM()
enum class EMassProcessingPhase : uint8
{
    PrePhysics,
    StartPhysics,
    DuringPhysics,
    EndPhysics,
    PostPhysics,
    FrameEnd,
    MAX,
};
```


<a id='DebuggingTips'></a>
## Debugging Tips

### Visual Logging

Mass uses the `VLog` system which is really nice for debugging.

To use Visual Logger in Editor Menu:

    Tools > Debug > Visual Logger

### Editor Commands

`mass.debug` in UEditor to debug while running a simulation.
In fact, there are a lot of CVars in the `mass.debug.*` namespace
that affect Mass behavior.  Familiarize yourself with them.


<a id='RecommendedPRs'></a>
# Recommended PRs for UE 5.4

Mass is under significant development and undergoing a lot of changes as of UE 5.4.

If you use UE 5.4, consider these PRs for your engine.

Xist Features:

- [#12263 - Add optional Mass Simulation Pause/Resume and Time Dilation capabilities](https://github.com/EpicGames/UnrealEngine/pull/12263)

Editor performance:

- <a id='PR12249'></a>[#12249 - Stop Editor-only Mass Sim from ticking during PIE](https://github.com/EpicGames/UnrealEngine/pull/12249)

Mass-related VLogs for easier debugging:

- [#12250 - Add WITH_MASSENTITY_DEBUG VLog messages](https://github.com/EpicGames/UnrealEngine/pull/12250)


<a id='SeeAlso'></a>
# Other Mass Resources

These are some excellent sources of info related to Mass.

- Official Epic Tutorials and Videos:
  - Introduction Video and high level Overview with UE 5.2 C++ Example: [Large Numbers of Entities with Mass in Unreal Engine 5](https://www.youtube.com/watch?v=f9q8A-9DvPo)
  - Tutorial: [Your First 60 Minutes with Mass](https://dev.epicgames.com/community/learning/tutorials/JXMl/unreal-engine-your-first-60-minutes-with-mass)
- Official Epic Docs: [MassEntity Index](https://dev.epicgames.com/documentation/en-us/unreal-engine/mass-entity-in-unreal-engine)
  - [Mass Avoidance Overview](https://dev.epicgames.com/documentation/en-us/unreal-engine/mass-avoidance-overview-in-unreal-engine)
  - [MassEntity Overview](https://dev.epicgames.com/documentation/en-us/unreal-engine/overview-of-mass-entity-in-unreal-engine)
  - [MassGameplay Overview](https://dev.epicgames.com/documentation/en-us/unreal-engine/overview-of-mass-gameplay-in-unreal-engine)
- [Mass Framework for crowds & traffic simulation in Unreal Engine](https://vrealmatic.com/unreal-engine/mass)
