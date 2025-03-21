---
title: "Crowd Visualization LOD in Mass Entity | UE5 Mass"
description: "Discussion of Mass Crowd Visualization specific LOD fragments and processors."
breadcrumb_path: "UE5/Mass/LOD/Visualization"
breadcrumb_name: "Crowd"
---

# Mass Crowd Visualization LOD


<a id='MassCrowdVisualizationLODProcessor'></a>
## `UMassCrowdVisualizationLODProcessor`

You can force Crowd entities into Off LOD by setting CVar
`Mass.CrowdTurnOffVisualization = 1`

Crowd Visualization Debugging mode:

- If configured to force Off LOD every tick:
  - Force Off LOD for all entities and STOP processing

Regular Execution logic:

- Execute base processor [`UMassVisualizationLODProcessor`](./#MassVisualizationLODProcessor)
  logic with overrides:
  - All queries add `FMassCrowdTag` Entity requirement
  - Add `FMassVisualizationLODSharedFragment.FilterTag == FMassCrowdTag` requirement
