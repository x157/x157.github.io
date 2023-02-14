---
title: "Lyra UI Policy"
description: "How the Lyra UI Policy is configured and how it works"
breadcrumb_path: "UE5/LyraStarterGame/Input"
breadcrumb_name: "UI Policy"
---

# Lyra UI Policy Overview

UI Policy: `B_LyraUIPolicy` *(defined in `DefaultGame.ini`)*

Base C++: Primary Game Layout: `UPrimaryGameLayout`
- based on Common User Widget ([Common UI](/UE5/CommonUI/))

Sets Overall UI Layout Class = `W_OverallUILayout`


<a id='W_OverallUILayout'></a>
## Overall UI Layout: `W_OverallUILayout`

Defines the HUD as being comprised of prioritized, named layers of
[Activatable Widgets](/UE5/CommonUI/ActivatableWidget).

- The highest priority layer with active widgets gets the input
- If no layer claims the input, input flows to the Game via [Enhanced Input](/UE5/EnhancedInput/)

| Priority | Layer Name          | Notes                                         |
|----------|---------------------|-----------------------------------------------|
| 1        | `UI.Layer.Game`     | implement with [Lyra HUD Layout](./HUDLayout) |
| 2        | `UI.Layer.GameMenu` |                                               |
| 3        | `UI.Layer.Menu`     |                                               |
| 4        | `UI.Layer.Modal`    |                                               |


### Note about GameplayTags

The names are GameplayTags defined in `LyraProject:/Source/LyraGame/LyraGameplayTags.h`

In Lyra 5.2 and later, the tags have been refactored into the `LyraGameplayTags` namespace,
and they are now all exported by default.

In Lyra 5.1 and earlier, to be able to use these tags in your own C++ module,
export `FLyraGameplayTags` using `LYRAGAME_API`.


## Detailed Common UI setup details

For more detailed info, see
[Lyra Default UI Policy Details](/UE5/LyraStarterGame/CommonUI/DefaultUIPolicy).

