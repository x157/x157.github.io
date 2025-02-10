---
title: "Mass Navigation in UE5"
description: "Overview of Unreal Engine's MassNavigation modules."
breadcrumb_path: "UE5/Mass"
breadcrumb_name: "Navigation"
---

# Mass Navigation

The [UE5 Mass Entity](/UE5/Mass/) system includes Navigation-specific fragments and processors
you can use in your game without recreating the wheel.
It bundles all of this code into the optional `MassNavigation` module in the `MassAI` plugin.

In general these classes are not well documented as of UE 5.5 and are under significant development.
This considered, the code is well written and follows common patterns that you will learn as
you read.

In standard Mass methodology, the Traits/Fragments define the data required to move the Entities.
The Processors execute once per simulation cycle to update the data.

## Overview

- [Basic Movement and Navigation](#BasicMovement)
  - [Entity and Actor Setup](#Setup)
- [Processors You Need to Enable](#ProcessorsToEnable)
- [Getting the Entities to Move](#EnactingMovement)
  - [Sample C++ Code](#EnactingMovementCpp)
- [Processors You Probably Want to Disable](#ProcessorsToDisable)


<a id='#BasicMovement'></a>
## Basic Movement and Navigation

In the simplest example, I'll be ignoring Crowd and Zone Graphs, and just looking at what it takes
to have a simple 2D map with Mass Entities moving around toward target locations
and avoiding each other as they move.


<a id='#Setup'></a>
###  Entity and Actor Setup

To set this up, create a `DA_MovingEntity` (a `MassEntityConfigAsset` that can be used with a `MassSpawner`)
with the following traits:

- **Avoidance** (`UMassObstacleAvoidanceTrait`)
- **Movement** (`UMassMovementTrait`)
- **Navigation Obstacle** (`UMassNavigationObstacleTrait`)
- **Smooth Orientation** (`UMassSmoothOrientationTrait`)
- **Steering** (`UMassSteeringTrait`)


- **Mass Movable Visualization Trait** (`UMassMovableVisualizationTrait`)


- Assorted Fragments:
  - **Mass Actor Fragment** (`FMassActorFragment`)
- **Agent Capsule Collision Sync** (`UMassAgentCapsuleCollisionSyncTrait`)


- **LODCollector** (`UMassLODCollectorTrait`)
- **SimulationLOD** (`UMassSimulationLODTrait`)

The Actor class that you configure in the Mass Movable Visualization Trait MUST:
- use a capsule as its primitive collision component
  - I set mine to use collision preset `OverlapAllDynamic`, though other settings may work as well
- have a **MassAgent** component (`UMassAgentComponent`)
  - with an **Agent Capsule Collision Sync** trait (`UMassAgentCapsuleCollisionSyncTrait`)

In my case, I configured the `DA_MovingEntity` **and** the `BP_MovingEntityActor`
assets such that they both have their `UMassAgentCapsuleCollisionSyncTrait` set to
sync the capsule transform **From Mass to Actor**, since I want Mass to be the
authority for an Actor's location.
There are likely other functional configurations.


<a id='#ProcessorsToEnable'></a>
## Processors You Need to Enable

In order for the above setup to work, you need to make sure you enable some
Mass processors that are not enabled by default.

- Mass Representation Processor
- Mass Visualization LOD Processor
- Mass LOD Collector Processor

Enable them with these `DefaultMass.ini` settings:

```ini
[/Script/MassRepresentation.MassRepresentationProcessor]
bAutoRegisterWithProcessingPhases=True

[/Script/MassRepresentation.MassVisualizationLODProcessor]
bAutoRegisterWithProcessingPhases=True

[/Script/MassLOD.MassLODCollectorProcessor]
bAutoRegisterWithProcessingPhases=True
```


<a id='#EnactingMovement'></a>
## Getting the Entities to Move

With the setup above, the Entities don't yet exhibit any movement behavior.
There is nothing instructing them where to move.

To get an Entity to move, you need to set its `FMassMoveTargetFragment`
(it is added to the Entity by the `UMassSteeringTrait` trait).

You can safely do this anywhere in your Gameplay code via an asynchronous
command to the World's Entity Manager like this:

<a id='#EnactingMovementCpp'></a>
```cpp
/**
 * This code snippet issues a deferred (asynchronous) command to the Mass Entity Manager
 * to update the given Entity's `FMassMoveTargetFragment` with a random point to which
 * to navigate.
 */

FMassEntityHandle Entity;  // set this to the Entity you want to move

FMassEntityManager& EntityManager = UE::Mass::Utils::GetEntityManagerChecked(*GetWorld());

EntityManager.Defer().PushCommand<FMassDeferredSetCommand>(
	[&Entity](FMassEntityManager& System)
	{
		check(System.IsEntityActive(Entity));  // YOU MUST set it to a valid value above before calling this

		FMassArchetypeHandle Archetype = System.GetArchetypeForEntity(Entity);
		FMassEntityView View(Archetype, Entity);

		const FAgentRadiusFragment& AgentRadius = View.GetFragmentData<FAgentRadiusFragment>();
		FMassMoveTargetFragment& MoveTargetFragment = View.GetFragmentData<FMassMoveTargetFragment>();
		const FTransformFragment& TransformFragment = View.GetFragmentData<FTransformFragment>();
		const FMassMovementParameters& MovementParams = View.GetConstSharedFragmentData<FMassMovementParameters>();

		MoveTargetFragment.CreateNewAction(EMassMovementAction::Move, *System.GetWorld());
		MoveTargetFragment.DesiredSpeed.Set(MovementParams.DefaultDesiredSpeed);
		MoveTargetFragment.IntentAtGoal = EMassMovementAction::Stand;
		MoveTargetFragment.SlackRadius = AgentRadius.Radius;

		// Choose a random point to move to around the World Origin at Z=0
		const FVector2D RandomPoint = FMath::RandPointInCircle(1000.f);
		MoveTargetFragment.Center = FVector(RandomPoint.X, RandomPoint.Y, 0.f);

		const FVector TargetVector = MoveTargetFragment.Center - TransformFragment.GetTransform().GetLocation();
		MoveTargetFragment.DistanceToGoal = TargetVector.Size2D();
		MoveTargetFragment.Forward = TargetVector.GetSafeNormal2D();
	});
```

Whenever you assign the `FMassMoveTargetFragment` as in the above code, the Mass simulation
will automatically begin steering the Entity toward the Move Target and moving in a direct line
toward it, avoiding obstacles along the way, including other Entities that may be moving to other goals.

You can also modify the `FMassMoveTargetFragment` from a custom StateTree Task, if your
entity is set up to use a StateTree.
See [Mass StateTree integration](./StateTree) for more details.


<a id='#ProcessorsToDisable'></a>
## Processors You Probably Want to Disable

### Mass "Off LOD" Navigation Processor

This is fine for the Mass samples where the NPCs far away from you
aren't doing anything you actually care about.  It instantly teleports them
to whatever their Move Target is without any regard for travel time whatsoever.

If your far away NPCs should actually **obey travel times**,
then you absolutely DO NOT WANT this processor running in your game,
and you must replace it with your own version that works how you want.

Disable it with this `DefaultMass.ini` setting:

```ini
[/Script/MassNavigation.MassOffLODNavigationProcessor]
ExecutionFlags=0
```
