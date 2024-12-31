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


## Basic Movement and Navigation

In the simplest example, I'll be ignoring Crowd and Zone Graphs, and just looking at what it takes
to have a simple 2D map with Mass Entities moving around toward target locations
and avoiding each other as they move.

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
sync the capsule transform **Both Ways**.
There are likely other functional configurations.


### Getting the Entities to Move

With the setup above, the Entities don't yet exhibit any movement behavior.
There is nothing instructing them where to move.

To get an Entity to move, you need to set its `FMassMoveTargetFragment`
(it is added to the Entity by the `UMassSteeringTrait` trait).

You can safely do this anywhere in your Gameplay code via an asynchronous
command to the World's Entity Manager like this:

```cpp
/**
 * This code snippet issues a deferred (asynchronous) command to the Mass Entity Manager
 * to update the given Entity's `FMassMoveTargetFragment` with a random point to which
 * to navigate.
 */

FMassEntityHandle Entity;  // set this to the Entity you want to move

FMassEntityManager& EntityManager = UE::Mass::Utils::GetEntityManagerChecked(*GetWorld());

EntityManager.Defer().PushCommand<FMassDeferredSetCommand>(
	[Entity](FMassEntityManager& System)
	{
		check(System.IsEntityActive(Entity));  // YOU MUST set it to a valid value above before calling this

		FMassArchetypeHandle Archetype = System.GetArchetypeForEntity(Entity);
		FMassEntityView View(Archetype, Entity);

		FMassMoveTargetFragment& MoveTargetFragment = View.GetFragmentData<FMassMoveTargetFragment>();
		const FTransformFragment& TransformFragment = View.GetFragmentData<FTransformFragment>();
		const FMassMovementParameters& MovementParams = View.GetConstSharedFragmentData<FMassMovementParameters>();

		MoveTargetFragment.CreateNewAction(EMassMovementAction::Move, *System.GetWorld());
		MoveTargetFragment.DesiredSpeed = FMassInt16Real(MovementParams.DefaultDesiredSpeed);
		MoveTargetFragment.IntentAtGoal = EMassMovementAction::Stand;

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
