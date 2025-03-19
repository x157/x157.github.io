---
title: "Level Of Detail (LOD) in Mass Entity | UE5 Mass"
description: "What is LOD, how is it computed? How to configure LOD in UE Mass."
breadcrumb_path: "UE5/Mass"
breadcrumb_name: "LOD"
---

# Mass LOD

The Mass LOD system consists of several different elements working together.

- [`UMassSimulationLODProcessor`](#MassSimulationLODProcessor)
- [`UMassLODSubsystem`](#MassLODSubsystem)
  - Tracks Viewers: Locations, Rotations, FOV, Aspect Ratio
- TODO
- TODO
- TODO
- TODO


## Terms

### Hysteresis

A multiplier applied to distances to differentiate between
a visible entity moving out of visibility range (where this ratio is applied),
as compared to an invisible entity moving into visibility range.

This helps to prevent visibility oscillation at the edge of visible range.

### VisibleLOD

Settings used when the entity is visible.

### BaseLOD

Settings used when the entity is not visible.


<a id='MassSimulationLODProcessor'></a>
## `UMassSimulationLODProcessor`

Execution logic:

- Update viewers info
  - Gathers Viewers info from `UMassLODSubsystem`
  - Update each `FMassSimulationLODSharedFragment` with updated viewers
- For every LOD entity chunk who should be recalculated
  *(all, unless optional variable tick frequency says otherwise)*,
  calculate LOD
  - For every entity in chunk, set new visibility status
- When count-based LOD adjustments are enabled *(always unless you disable it in INI)*:
  - For each `FMassSimulationLODSharedFragment` determine if adjustments are needed
  - For every LOD entity chunk having a shared fragment that requires LOD adjustments:
    - Adjust previously computed LOD settings to reduce LOD as needed


### Data Types

- `FMassSimulationLODSharedFragment`
  - One of these will exist for each unique value of `FMassSimulationLODParameters`
  - Uses `TMassLODCalculator<FMassSimulationLODLogic>`
- `FMassSimulationLODFragment`
  - Distance to the closest viewer
  - Current & Previous LOD
- `FMassViewerInfoFragment`
  - Distance to the closest viewer


<a id='MassLODSubsystem'></a>
## `UMassLODSubsystem`

The Mass LOD Subsystem is responsible for determining which players or other
actors exist at any given moment.  It standardizes information such as their
Location, Rotation, Field of View and camera aspect ratio to be used by
various Mass processors who need this info.

This hooks into the `UMassSimulationSubsystem` phase processor to receive
callbacks on every `PrePhysics` phase start.  At the start of each `PrePhysics`
phase, the Viewer info is updated.

### Data Types

- `FViewerInfo`
  - Location, Rotation, FOV, AspectRatio for each Player
    - Also in some cases world partition streaming sources are "viewers"
    - Other actors may also be considered "viewers"


## LOD Traits

### `UMassSimulationLODTrait`

Requires:
- `FMassViewerInfoFragment`
- `FTransformFragment`

Adds:
- Fragment: `FMassSimulationLODFragment`
- Shared Fragment: `FMassSimulationLODSharedFragment`
- Const Shared Fragment: `FMassSimulationLODParameters`

Manages Tags: (when `bSetLODTags` is `true`)
- `FMassOffLODTag` (added by default for all Entities)


#### `UMassSimulationLODTrait` with `bEnableVariableTicking`

In addition to the base traits, when you enable `bEnableVariableTicking`,
this trait also adds:

- Fragment: `FMassSimulationVariableTickFragment`
- Chunk Fragment: `FMassSimulationVariableTickChunkFragment`
- Shared Fragment: `FMassSimulationVariableTickSharedFragment`
- Const Shared Fragment: `FMassSimulationVariableTickParameters`
