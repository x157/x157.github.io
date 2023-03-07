---
title: ""
description: ""
breadcrumb_path: "UE5/Dev"
breadcrumb_name: "HUD: ShowDebug"
---

# Summary

- [`ShowDebug`](#ShowDebug)
- [`GetDebugActorList`](#GetDebugActorList)
- [`DisplayDebug`](#DisplayDebug)


<a id='ShowDebug'></a>
# Console Command: `ShowDebug`

    ShowDebug

Toggles all Debugging On/Off.

    ShowDebug HitBox

Toggles HitBox Debugging On/Off

    ShowDebug Reset

Resets all Debugging info


### Pre-defined Debug Categories

Defined and used by `AHUD` and/or `AActor`:

- Animation
- Bones
- Collision
- HitBox
- Movement
- Net
- Physics

Defined and used by `APlayerController`:

- Camera
- Input
- ForceFeedback


<a id='GetDebugActorList'></a>
## HUD::`GetDebugActorList`

```c++
/** Get list of considered targets for 'showdebug'
 * This list is built contextually based on which 'showdebug' flags have been enabled. */
virtual void GetDebugActorList(TArray<AActor*>& InOutList);
```

Adds these Actors to the Debug List:

- Add all Pawns
- If `Animation` Debug is Enabled:
  - Add all Actors with a Skeletal Mesh Component that has an Anim Instance
- If `Movement` Debug is Enabled:
  - Add all Actors with a Movement Component


### Lyra Override: `ALyraHUD`

Also adds to Debug Actor List:

- All Actors with an Ability System Component


<a id='DisplayDebug'></a>
# Actor::`DisplayDebug`

`AHUD` will call `DisplayDebug` on the current ViewTarget when the `ShowDebug` exec is used.

```c++
/**
 * Draw important Actor variables on canvas.
 * HUD will call DisplayDebug() on the current ViewTarget when the ShowDebug exec is used.
 *
 * @param Canvas           Canvas to draw on
 *
 * @param DebugDisplay     Contains information about what debug data to display
 *
 * @param YL               [in]   Height of the previously drawn line.
 *                         [out]  Height of the last line drawn by this function.
 *
 * @param YPos             [in]   Y position on Canvas for the previously drawn line. YPos += YL, gives position to draw text for next debug line.
 *                         [out]  Y position on Canvas for the last line drawn by this function.
 */
virtual void DisplayDebug(class UCanvas* Canvas, const class FDebugDisplayInfo& DebugDisplay, float& YL, float& YPos);
```
