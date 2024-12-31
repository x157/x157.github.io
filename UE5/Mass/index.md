---
title: "Mass Entities in UE5"
description: "Overview of Unreal Engine's MassAI, MassEntity, MassGameplay and associated modules."
breadcrumb_path: "UE5"
breadcrumb_name: "Mass"
---

# Mass Entities in UE5

Mass is a native C++ simulation processor, introduced experimentally in UE 5.2.

Before you read this, make sure you have watched the official Epic Games Video:
[Large Numbers of Entities with Mass in Unreal Engine 5](https://www.youtube.com/watch?v=f9q8A-9DvPo)
by Mario Palermo.  If you're not really sure what Mass is or why you may want to use it,
Mario explains it very well.

Once you've decided that Mass is for you and you want to learn how to actually build things with it,
this info should help you quickly discover where to look in C++ and how the C++ fits together
in the big picture.
See also [Other Mass Resources](#SeeAlso) that I have found useful.

In late 2024, Epic roughly doubled the size of the Mass development team and there are
rumors internally that the scope of Mass may significantly expand in both scope and importance
to Unreal Engine.

TLDR though it's still early days, there doesn't seem to be much risk of Mass being
shelved in the foreseeable future. Quite to the contrary, Epic is investing in the future of Mass.


## Overview

- [Mass Simulation Instance](#MassSimulationInstance)
  - [Multiple Simulation Instances](#MultipleSimulationInstances)
- [Mass Simulation](#Simulation)
  - [Mass Entity Manager](#EntityManager)
  - [Mass Processing Phase Manager](#PhaseManager)
- [Related Modules](#RelatedModules)
  - [Mass Navigation](/UE5/Mass/Navigation)
- [Important Mass Subsystems](#MassSubsystems)
- [Debugging Tips](#DebuggingTips)
- [Other Mass Resources](#SeeAlso)


<a id='MassSimulationInstance'></a>
## Mass Simulation Instance

The Mass Simulation engine is effectively comprised of two parts.
The combination of these elements makes up a single simulation instance.

### 1. [Mass Entity Manager](#EntityManager)
- Memory container
  - Compact storage of all data related to all entities in a given simulation instance.

### 2. [Mass Processing Phase Manager](#PhaseManager)
- Ticks the simulation
  - Processes Mass Simulation Phases in ascending order each tick.
    - Executes Mass Processors in order of dependencies


<a id='MultipleSimulationInstances'></a>
### Multiple Simulation Instances

As of UE 5.4 there are currently 3 simulation instances:

- `UMassEntityEditorSubsystem` (Editor subsystem)
  - Always exists in Editor (for example it's driving widgets like the Scene Outliner, via TEDS)
  - Editor world has its own:
    - Mass Entity Manager
    - Mass Processing Phase Manager
- `UMassSimulationSubsystem` owned by the `UWorld` loaded in the editor (it's `WorldType == Editor`)
  - this subsystem ticks in the editor mode only if editor's viewport is in "Realtime" mode
  - this is the subsystem receiving the `OnPieBegin` and `OnPieEnd` calls, stopping ticking during PIE and resuming afterward.
- `UMassSimulationSubsystem` owned by the PIE `UWorld` (it's `WorldType == PIE`)
  - this is the runtime/gametime Mass simulation
  - Automatically Creates/destroys simulation instances for each Game world
  - Each Game world automatically gets its own:
    - Mass Entity Manager
    - Mass Processing Phase Manager


<a id='Simulation'></a>
## Mass Simulation

You can start and stop any instance of the simulation, which triggers some events and
manages the ticking of `FMassProcessingPhaseManager`
which does all the actual work of running the simulation.
When you stop a simulation, it performs a full reset and discards all data.

You can disable the simulation entirely by setting the CVar
`mass.SimulationTickingEnabled` to false.

### How/when/where does the Simulation start/stop?

`UMassSimulationSubsystem::StartSimulation` is the method that actually starts the simulation ticking.

By default, it's called in these cases:

1. In Editor during Editor subsystem `PostInitialize` (when Editor starts; starts Editor sim)
2. On World `BeginPlay`
3. When you change CVar `bSimulationTickingEnabled` from `false` to `true`, if the World has begun play.


<a id='EntityManager'></a>
### Mass Entity Manager

This is the set of all entities that exist in the sim.  It's a memory container.

`UMassEntityManager` is responsible for hosting Entities managing Archetypes.
Entities are stored as FEntityData entries in a chunked array.
Each valid entity is assigned to an Archetype that store the fragments associated with a given entity at the moment.

Epic released an excellent
[MassEntity Overview](https://dev.epicgames.com/documentation/en-us/unreal-engine/overview-of-mass-entity-in-unreal-engine)
document that you should absolutely read if you haven't already.


<a id='PhaseManager'></a>
### Mass Processing Phase Manager

`FMassProcessingPhaseManager` is the C++ class that actually handles ticking the simulation
through the defined ordered phases of execution.

The World Sim subsystem owns one and the Editor Sim subsystem owns a second one.

As of 5.5 there isn't much ability to customize or override this without modifying the engine.

#### Initialization

- set `ProcessingExecutionFlags`
- for each `EMassProcessingPhase` in ascending order:
  - create new Phase Processor `UMassCompositeProcessor`

### Mass Processing Phases (UE 5.5)

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


<a id='RelatedModules'></a>
## Related Modules

By default, Mass Entities don't contain any gameplay logic.

Epic released some modules to add various aspects of gameplay, or you can use your own.

For example, you can:

- Make your own movement related fragments and processors (as Mario shows you how to do in the intro video).
- [OR] Use the more complex, feature rich [MassNavigation](/UE5/Mass/Navigation) plugin.


<a id='ExperimentalModules'></a>
### Experimental Modules

Mass is implemented by several different modules,
all of which are under heavy development as of UE 5.5.
Since 5.2 the API has changed, in some cases quite a bit, and it is expected that it
**will change** some more in future versions.


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


<a id='DebuggingTips'></a>
## Debugging Tips

### Visual Logging

Mass uses the `VLog` system which is really nice for debugging.

To use Visual Logger in Editor Menu:

    Tools > Debug > Visual Logger

**NOTICE: ENABLE UNIQUE NAMES IN VISLOG.**
If you don't have unique names enabled in VisLog then
both `UMassSimulationSubsystem` instances will usually end up in the same visual log row
(with names like `MassSimulationSubsystem_0`) which can be confusing.

### Gameplay Debugger

The `MassAI` plugin contains optional debugging code that you can compile into your project
for enhanced debugging capabilities.

For example, see
[GameplayDebuggerCategory_Mass.cpp](https://github.com/EpicGames/UnrealEngine/blob/5.5/Engine/Plugins/AI/MassAI/Source/MassAIDebug/Private/GameplayDebuggerCategory_Mass.cpp)
to see what your options are.
The `FGameplayDebuggerCategory_Mass` constructor defined in that file
contains a lot of `BindKeyPress` function calls to map `Shift+A`, `Shift+O`, `Shift+V`
and many other key combinations to help you gain insight into what Mass is doing.

To use this in your project, you must have compiled your project with
both `WITH_GAMEPLAY_DEBUGGER` and `WITH_MASSGAMEPLAY_DEBUG`
enabled.

For more info see Epic's
[Gameplay Debugger](https://dev.epicgames.com/documentation/en-us/unreal-engine/using-the-gameplay-debugger-in-unreal-engine)
documentation.

### Editor Commands

`mass.debug` in UEditor to debug while running a simulation.
In fact, there are a lot of CVars in the `mass.debug.*` namespace
that affect Mass behavior.  Familiarize yourself with them.

### Disable C++ Optimizations in Mass-related Engine Modules

One thing I have found to be tremendously useful is to specifically disable code optimization
in the Mass-related Engine modules.

This allows me to run the game in `DebugGame` mode and step through everything,
including the Mass internals, to see what is being called and why.

Very highly recommended.

#### Example MassEntity.Build.cs change

For example, I add this code right at the top of the `MassEntity.Build.cs`.
*(Don't commit these kinds of changes to your Engine! These should be for your workspace only).*

Other Engine Build.cs files that I sometimes modify similarly for debugging:
`MassSimulation.Build.cs`, `MassSpawner.Build.cs`, etc.

```c#
// Example MassEntity.Build.cs
namespace UnrealBuildTool.Rules
{
	public class MassEntity : ModuleRules
	{
		public MassEntity(ReadOnlyTargetRules Target) : base(Target)
		{
			// [BEGIN xist debug hack]
			// Allow debugger stepping in this Engine module when built as DebugGame
			if (Target.Configuration == UnrealTargetConfiguration.DebugGame)
			{
				OptimizeCode = CodeOptimization.Never;  // never optimize DebugGame builds even tho it's an Engine module
			}
			// [END xist debug hack]

			// NOTICE: Keep all the rest of this method the same. I omitted it for brevity.
		}
	}
}
```


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
- Open Source Community projects:
  - [Megafunk's Mass Sample Project](https://github.com/Megafunk/MassSample)
  - [Ji-Rath's Mass AI Example Project](https://github.com/Ji-Rath/MassAIExample)
  - [Myxcil's Mass Traffic Test Project](https://github.com/Myxcil/MassTraffic-Test)
