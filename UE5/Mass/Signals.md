---
title: "Mass Signals | UE5 Mass"
description: "Overview of Mass Signals, aka How Mass Entities implement Events"
breadcrumb_path: "UE5/Mass"
breadcrumb_name: "Signals"
---

# Mass Signals

Mass implements a form of signal handling to simulate Events for Entities.

Important code:

- [`UMassSignalSubsystem`](#UMassSignalSubsystem)
- [`UMassSignalProcessorBase`](#UMassSignalProcessorBase)
  - [Subscribe to signals](#UMassSignalProcessorBase_Subscribe)
  - [`SignalEntities` virtual processor](#UMassSignalProcessorBase_SignalEntities)
  - [`FMassSignalNameLookup` helper](#FMassSignalNameLookup)

<a id='UMassSignalSubsystem'></a>
## `UMassSignalSubsystem`

The Mass Signal Subsystem is a "Named Signal" Manager.

- Allows you to explicitly define signals, each identified by a unique `FName` ...
  - ... and then broadcast Signal Events to specific Entities at will during Gameplay

Signals do not contain any Event or other context data.

### How to Send a Signal

```cpp
SignalSubsystem.SignalEntity(SignalName, Entity);
```

There are other ways including `SignalEntities` *(multiple entities)*, `DelaySignalEntity`,
`DelaySignalEntities`, and others.

Read [MassSignalSubsystem.h](https://github.com/EpicGames/UnrealEngine/blob/5.7/Engine/Plugins/Runtime/MassGameplay/Source/MassSignals/Public/MassSignalSubsystem.h)
for more.

### How to Register for Signals

```cpp
FName SignalName ("MySignalName");
SignalSubsystem.GetSignalDelegateByName(SignalName).AddUObject(this, &ThisClass::OnSignalReceived);
```

### How to Unregister for Signals

```cpp
FName SignalName ("MySignalName");
SignalSubsystem.GetSignalDelegateByName(SignalName).RemoveAll(this);
```

### How to Process Signal Events

To process signals in a processor, derive your class from [`UMassSignalProcessorBase`](#UMassSignalProcessorBase).
Do not override its signal handling, just implement the `SignalEntities` method.

If you need to receive signals in Gameplay or other code, do it like:

```cpp
void UMyClass::OnSignalReceived(FName SignalName, TConstArrayView<FMassEntityHandle> Entities)
{
    // For each Entity in Entities, process the signal SignalName.
    // Do whatever you need to do for this signal.
}
```

<a id='UMassSignalProcessorBase'></a>
## `UMassSignalProcessorBase`

A Mass Processor abstract base class that:

- Subscribes to one or more Signals
  - Adds them to the current Frame-specific queue as they are received
- During Execution:
  - Redirects all future received signals to the next frame queue
  - Processes all Frame-specific signals previously received in order of receipt
    - This executes the custom virtual `SignalEntities` methods from derived classes

Interesting example implementations in UE 5.7:

- Mass StateTree Processors
  [ [h](https://github.com/EpicGames/UnrealEngine/blob/5.7/Engine/Plugins/AI/MassAI/Source/MassAIBehavior/Public/MassStateTreeProcessors.h)
  | [cpp](https://github.com/EpicGames/UnrealEngine/blob/5.7/Engine/Plugins/AI/MassAI/Source/MassAIBehavior/Private/MassStateTreeProcessors.cpp)
  ]
- Mass Smart Object Registration
  [ [h](https://github.com/EpicGames/UnrealEngine/blob/5.7/Engine/Plugins/Runtime/MassGameplay/Source/MassSmartObjects/Public/MassSmartObjectRegistration.h)
  | [cpp](https://github.com/EpicGames/UnrealEngine/blob/5.7/Engine/Plugins/Runtime/MassGameplay/Source/MassSmartObjects/Private/MassSmartObjectRegistration.cpp)
  ]

Mass Crowd also has some ZoneGraph Signal processors.

<a id='UMassSignalProcessorBase_Subscribe'></a>
### Subscribing to signals

In your derived processor, you will need to subscribe to whatever signals you want your processor to receive.

`UMassStateTreeProcessor` overrides `UMassProcessor::InitializeInternal` to achieve this, for your own
custom `UMySignalProcessor` it would look for example like:

```cpp
void UMySignalProcessor::InitializeInternal(UObject& Owner, const TSharedRef<FMassEntityManager>& EntityManager)
{
	Super::InitializeInternal(Owner, EntityManager);

	UMassSignalSubsystem* SignalSubsystem = UWorld::GetSubsystem<UMassSignalSubsystem>(Owner.GetWorld());

	SubscribeToSignal(*SignalSubsystem, FName("MySignalName1"));
	SubscribeToSignal(*SignalSubsystem, FName("MySignalName2"));
	SubscribeToSignal(*SignalSubsystem, FName("MySignalNameN"));

	// ... [snip] ...
}
```

<a id='UMassSignalProcessorBase_SignalEntities'></a>
### Pure virtual `SignalEntities`

You must implement this method to do whatever you want to do when Signals are received.

```cpp
/**
 * Actual method that derived class needs to implement to act on a signal that is raised for that frame
 * @param EntitySubsystem is the system to execute the lambdas on each entity chunk
 * @param Context is the execution context to be passed when executing the lambdas
 * @param EntitySignals Look up to retrieve for each entities their raised signal via GetSignalsForEntity
 */
 virtual void SignalEntities(FMassEntityManager& EntityManager, FMassExecutionContext& Context, FMassSignalNameLookup& EntitySignals)
    PURE_VIRTUAL(UMassSignalProcessorBase::SignalEntities, );
```

<a id='FMassSignalNameLookup'></a>
### `FMassSignalNameLookup`

Used internally by [`UMassSignalProcessorBase`](#UMassSignalProcessorBase)

An efficient mapping of up to 64 signals per Entity.

The 64 signal limit can be worked around by using multiple instances of
`FMassSignalNameLookup` together.

See [MassSignalProcessorBase.cpp:85](https://github.com/EpicGames/UnrealEngine/blob/5.7/Engine/Plugins/Runtime/MassGameplay/Source/MassSignals/Private/MassSignalProcessorBase.cpp#L85)
for how `UMassSignalProcessorBase` circumvents the 64 signal limit.
