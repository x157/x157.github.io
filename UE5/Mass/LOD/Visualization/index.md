---
title: "Visualization LOD in Mass Entity | UE5 Mass"
description: "Discussion of Mass Visualization specific LOD fragments and processors."
breadcrumb_path: "UE5/Mass/LOD"
breadcrumb_name: "Visualization"
---

# Mass Visualization LOD


<a id='MassVisualizationLODProcessor'></a>
## `UMassVisualizationLODProcessor`

Note: The default `FilterTag` == `nullptr`, which matches the default
`FMassVisualizationLODSharedFragment.FilterTag`.
The [Crowd](./Crowd#MassCrowdVisualizationLODProcessor) mode (and any
other potential future override) have their own variants that are ignored
by the base class processor.

Regular Execution logic:

- Update viewers info
  - Gather Viewers info from `UMassLODSubsystem`
  - Update each filtered `FMassVisualizationLODSharedFragment` with updated viewers
- For every LOD entity chunk who should be recalculated
  - Calculate LOD
    - For every entity in chunk: Set new visibility status
- When count-based LOD adjustments are enabled *(always, unless you disable it in INI)*:
  - For each `FMassVisualizationLODSharedFragment`:
    - Determine if adjustments are needed
  - For every LOD entity chunk having a shared fragment that requires LOD adjustments:
    - Adjust previously computed LOD settings to reduce LOD as needed
      - The entities that are degraded are... ??? *Probably the ones in later chunks.*

Key differences to
[`UMassSimulationLODProcessor`](../#MassSimulationLODProcessor):

- Does not support variable tick rates
- Does not manage LOD tags on Entities

Bug?

- Only calls `LODCalculator.PrepareExecution` for shared fragments matching the filter
  - However, it then processes **all** Entities regardless of the shared fragment filter


### Important Data Types

- `FMassVisualizationLODParameters`
- `FMassVisualizationLODSharedFragment`
- `FMassRepresentationLODFragment`
- `FMassVisualizationLODProcessorTag`


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

