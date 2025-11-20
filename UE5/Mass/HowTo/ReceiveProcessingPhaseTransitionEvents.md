---
title: "How To Receive Processing Phase Transition Events | UE5 Mass"
description: "How to hook into processing phase started and finished events to coordinate data flow"
breadcrumb_path: "UE5/Mass/HowTo"
breadcrumb_name: "Receive Processing Phase Transition Events"
---

# How To: Receive Processing Phase Transition Events

Documented Version: **UE 5.7**

Coordinating data across different tick (or processing) phases is a significant
concern for your game.

To facilitate this, the Mass Processing Manager provides event hooks for
`Started` and `Finished` events for each of the Mass Processing Phases
defined by `EMassProcessingPhase`.

### Document Overview

- [Register for Events](#register-for-events)
	- [Example Subsystem Initialization](#example-subsystem-initialization)
- [Unregister from Events](#unregister-from-events)
  - [Example Subsystem Deinitialization](#example-subsystem-deinitialization)
- [Handling Events](#handling-events)
- [Flow of Events](#flow-of-events)

## Register for Events

In your Subsystem `Initialize` for example, hook into
the World's `UMassSimulationSubsystem` Events
`OnProcessingPhaseStarted` and `OnProcessingPhaseFinished`
for whichever processing phases are of interest.

### Example Subsystem Initialization

```cpp
if (auto SimSystem = World->GetSubsystem<UMassSimulationSubsystem>())
{
    SimSystem->GetOnProcessingPhaseStarted(EMassProcessingPhase::PrePhysics).AddUObject(this, &ThisClass::NativeOnStartPrePhysics);
    SimSystem->GetOnProcessingPhaseFinished(EMassProcessingPhase::PrePhysics).AddUObject(this, &ThisClass::NativeOnFinishPrePhysics);
}
```

You may prefer to use `Collection.InitializeDependency` in a Subsystem like:

```cpp
if (auto SimSystem = Collection.InitializeDependency<UMassSimulationSubsystem>())
{ /* ... */ }
```

## Unregister from Events

**Always** unregister from events! In Subsystems, do it in `Deinitialize`, like:

### Example Subsystem Deinitialization

```cpp
if (auto SimSystem = World->GetSubsystem<UMassSimulationSubsystem>())
{
    // Make sure to unregister EVERY event we registered in Initialize()
    SimSystem->GetOnProcessingPhaseStarted(EMassProcessingPhase::PrePhysics).RemoveAll(this);
    SimSystem->GetOnProcessingPhaseFinished(EMassProcessingPhase::PrePhysics).RemoveAll(this);
}
```

## Handling Events

### Example C++ Header

```cpp
void NativeOnStartPrePhysics(const float DeltaSeconds) const;
void NativeOnFinishPrePhysics(const float DeltaSeconds) const;
```

### Example C++ Source

```cpp
void UXmsRepSubsystem::NativeOnStartPrePhysics(const float DeltaSeconds) const
{
    // Do stuff before any PrePhysics processors run
}

void UXmsRepSubsystem::NativeOnFinishPrePhysics(const float DeltaSeconds) const
{
    // Do stuff after all PrePhysics processors have run
}
```

## Flow of Events

During ticks, events will trigger in order, before and after the processors
that run during that phase, in a flow from top to bottom for each Tick:

| Phase           | Transition Event | Processor Execution                     |
|-----------------|------------------|-----------------------------------------|
| `PrePhysics`    | Started          |                                         |
| `PrePhysics`    |                  | Processors Execute                      |
| `PrePhysics`    | Finished         |                                         |
| `StartPhysics`  | Started          |                                         |
| `StartPhysics`  |                  | Processors Execute                      |
| `StartPhysics`  | Finished         |                                         |
| `DuringPhysics` | Started          |                                         |
| `DuringPhysics` |                  | *Not supported for processor execution* |
| `DuringPhysics` | Finished         |                                         |
| `EndPhysics`    | Started          |                                         |
| `EndPhysics`    |                  | Processors Execute                      |
| `EndPhysics`    | Finished         |                                         |
| `PostPhysics`   | Started          |                                         |
| `PostPhysics`   |                  | Processors Execute                      |
| `PostPhysics`   | Finished         |                                         |
| `FrameEnd`      | Started          |                                         |
| `FrameEnd`      |                  | Processors Execute                      |
| `FrameEnd`      | Finished         |                                         |
