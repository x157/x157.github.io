---
title: "Level Of Detail (LOD) in Mass Entity | UE5 Mass"
description: "What is LOD, how is it computed? How to configure LOD in UE Mass."
breadcrumb_path: "UE5/Mass"
breadcrumb_name: "LOD"
---

# Mass LOD

The Mass LOD system consists of several different elements working together.

- [`UMassLODDistanceCollectorProcessor`](#MassLODDistanceCollectorProcessor)
  - Determines closest distance to any viewer for relevant Entities
- [`UMassLODCollectorProcessor`](#MassLODCollectorProcessor)
  - Determines closest distance to any **visible** viewer for relevant Entities
- [`UMassSimulationLODProcessor`](#MassSimulationLODProcessor)
  - Computes and updates LOD settings for Entities
    - Every tick unless you enable variable ticking per LOD
- [`UMassLODSubsystem`](#MassLODSubsystem)
  - Tracks Viewers: Locations, Rotations, FOV, Aspect Ratio
- [LOD Traits](#LODTraits)
  - [`UMassDistanceLODCollectorTrait`](#MassDistanceLODCollectorTrait)
  - [`UMassLODCollectorTrait`](#MassLODCollectorTrait)
  - [`UMassSimulationLODTrait`](#MassSimulationLODTrait)
    - [with `bEnableVariableTicking`](#MassSimulationLODTrait_EnableVariableTicking)


## Different Ways to Compute LOD

1. Proximity to Viewers *(regardless of Viewer perspective)*
   - Add `UMassDistanceLODCollectorTrait` to Entity
2. Visible by Viewers
   - Add `UMassLODCollectorTrait` to Entity

For any given Entity, choose which type of LOD calculation you want it to use,
and add the appropriate LOD Collector Trait.

DO NOT add both traits to a single Entity.


## LOD Terms

### Hysteresis

A multiplier applied to distances to differentiate between
a visible entity moving out of visibility range (where this ratio is applied),
as compared to an invisible entity moving into visibility range.

This helps to prevent visibility oscillation at the edge of visible range.

### VisibleLOD

Settings used when the entity is visible.

### BaseLOD

Settings used when the entity is not visible.


<a id='MassLODDistanceCollectorProcessor'></a>
## `UMassLODDistanceCollectorProcessor`

This variant of the LODCollector sets Entity LOD purely based on distance
from the Entity to the nearest viewer.  It doesn't care which direction
the viewer is looking.

Server Execution logic:

- Update `FMassViewerInfoFragment` for each Entity
  *(determine if **in range** of any viewer)*

Client Execution logic:

- *Same as server, but only tests Local Player visibility*


<a id='MassLODCollectorProcessor'></a>
## `UMassLODCollectorProcessor`

This variant of the LODCollector sets Entity LOD based on both distance
from the Entity to the nearest viewer **and** based on the direction the
viewer is looking (if the Entity behind the player, even if it's nearby,
it's Off LOD).

Server Execution logic:

- Update `FMassViewerInfoFragment` for each Entity
  *(determine if **visible** by any viewer)*

Client Execution logic:

- *Same as server, but only tests Local Player visibility*


<a id='MassSimulationLODProcessor'></a>
## `UMassSimulationLODProcessor`

Execution logic:

- Update viewers info
  - Gather Viewers info from `UMassLODSubsystem`
  - Update each `FMassSimulationLODSharedFragment` with updated viewers
- For every LOD entity chunk who should be recalculated
  *(all, unless optional variable tick frequency says otherwise)*:
  - Calculate LOD
    - For every entity in chunk: Set new visibility status
- When count-based LOD adjustments are enabled *(always, unless you disable it in INI)*:
  - For each `FMassSimulationLODSharedFragment`:
    - Determine if adjustments are needed
  - For every LOD entity chunk having a shared fragment that requires LOD adjustments:
    - Adjust previously computed LOD settings to reduce LOD as needed
      - The entities that are degraded are... ??? *Probably the ones in later chunks.*
- When variable tick rates are enabled:
  - For each chunk that was updated this frame:
    - Compute a randomish time until the next compute frame for this chunk,
      based on the `FMassSimulationVariableTickParameters.TickRates` setting
      for the chunk's LOD.
- Change LOD tags on any entities that require it


### Important Data Types

- `FMassSimulationLODSharedFragment`
  - One of these will exist for each unique value of `FMassSimulationLODParameters`
  - Uses `TMassLODCalculator<FMassSimulationLODLogic>`
- `FMassSimulationLODFragment`
  - Distance to the closest viewer
  - Current & Previous LOD
- `FMassViewerInfoFragment`
  - Distance to the closest viewer
- `FMassSimulationVariableTickSharedFragment`
  - `TMassLODTickRateController`
    - `TickRate` is not really a rate, it's a time in seconds.
      - Unless running in deterministic mode, randomness is applied to this "rate" in
        an attempt to spread updates over multiple frames at approximately the time
        interval specified.
      - This comes from `FMassSimulationVariableTickParameters.TickRates`


<a id='MassLODSubsystem'></a>
## `UMassLODSubsystem`

The Mass LOD Subsystem is responsible for determining which players or other
actors exist at any given moment.  It standardizes information such as their
Location, Rotation, Field of View and camera aspect ratio to be used by
various Mass processors who need this info.

This hooks into the `UMassSimulationSubsystem` phase processor to receive
callbacks on every `PrePhysics` phase start.  At the start of each `PrePhysics`
phase, the Viewer info is updated.

### Important Data Types

- `FViewerInfo`
  - Location, Rotation, FOV, AspectRatio for each Player
    - Also in some cases world partition streaming sources are "viewers"
    - Other actors may also be considered "viewers"


<a id='LODTraits'></a>
## LOD Traits


<a id='MassDistanceLODCollectorTrait'></a>
### `UMassDistanceLODCollectorTrait`

This trait marks an Entity to have its LOD computed based
ONLY on whether it is in range of any viewer, regardless of
whether it is visible.

Requires:
- Fragment: `FTransformFragment`

Adds:
- Fragment: `FMassViewerInfoFragment`
- AddTag: `FMassCollectDistanceLODViewerInfoTag`


<a id='MassLODCollectorTrait'></a>
### `UMassLODCollectorTrait`

This trait marks an Entity to have its LOD computed based on
whether it is visible by any viewer.

Requires:
- Fragment: `FTransformFragment`

Adds:
- Fragment: `FMassViewerInfoFragment`
- AddTag: `FMassCollectLODViewerInfoTag`


<a id='MassSimulationLODTrait'></a>
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


<a id='MassSimulationLODTrait_EnableVariableTicking'></a>
#### `UMassSimulationLODTrait` with `bEnableVariableTicking`

In addition to the base fragments, when you enable `bEnableVariableTicking`,
this trait also adds:

- Fragment: `FMassSimulationVariableTickFragment`
- Chunk Fragment: `FMassSimulationVariableTickChunkFragment`
- Shared Fragment: `FMassSimulationVariableTickSharedFragment`
- Const Shared Fragment: `FMassSimulationVariableTickParameters`
