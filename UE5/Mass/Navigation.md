---
title: "Mass Navigation in UE5"
description: "Overview of Unreal Engine's MassNavigation modules."
breadcrumb_path: "UE5/Mass"
breadcrumb_name: "Navigation"
---

# Mass Navigation in UE 5.4

The [UE5 Mass Entity](/UE5/Mass/) system includes Navigation-specific fragments and processors
you can use in your game without recreating the wheel.
It bundles all of this code into the optional `MassNavigation` module in the `MassAI` plugin.

In general this class is not well documented as of UE 5.4 and is under significant development.
This considered, the code is well written and follows common patterns that you will learn as
you read.

In standard Mass methodology, the Traits/Fragments define the data required to move the Entities.
The Processors execute once per simulation cycle to update the data.


# MassNavigation Traits

- `UMassObstacleAvoidanceTrait`
- `UMassNavigationObstacleTrait`
- `UMassSmoothOrientationTrait`
- `UMassSteeringTrait`

## MassZoneGraphNavigation Traits

- `UMassZoneGraphNavigationTrait`


# MassNavigation Fragments

- `FMassNavigationEdgesFragment`
- `FMassSteeringFragment`
- `FMassStandingSteeringFragment`
- `FMassMoveTargetFragment`
- `FMassGhostLocationFragment`
- `FMassNavigationObstacleGridCellLocationFragment`
- `FMassAvoidanceColliderFragment`

## MassZoneGraphNavigation Fragments

- `FMassZoneGraphPathRequestFragment`
- `FMassZoneGraphLaneLocationFragment`
- `FMassZoneGraphCachedLaneFragment`
- `FMassZoneGraphShortPathFragment`
- `FMassLaneCacheBoundaryFragment`


# MassNavigation Processors

As of 5.4 a search for all Mass Processors (any class derived from `UMassProcessor`)
in the `MassNavigation` module reveals:

- `UMassMovingAvoidanceProcessor`
- `UMassMovingAvoidanceProcessor`
- `UMassSmoothOrientationProcessor`
- `UMassSteerToMoveTargetProcessor`
- `UMassOffLODNavigationProcessor`
- `UMassNavigationSmoothHeightProcessor`
- `UMassNavigationObstacleGridProcessor`

## MassZoneGraphNavigation Processors

- `UMassZoneGraphPathFollowProcessor`
- `UMassZoneGraphPathFollowProcessor`


# MassNavigation Observer Processors

- `UMassMoveTargetFragmentInitializer`
  - Sets the move target to the Entity's current Transform location (e.g. already at goal of current location)
- `UMassNavigationObstacleRemoverProcessor`

## MassZoneGraphNavigation Observer Processors

- `UMassZoneGraphLocationInitializer`

