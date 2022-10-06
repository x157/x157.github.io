---
title: "How to: Send Client Gameplay Ability Data to the Server in C++"
description: 
back_links:
  - link: /UE5/
    name: UE5
  - link: /UE5/GameplayAbilitySystem/
    name: GameplayAbilitySystem
back_link_title: Gameplay Ability Client-Server RPC
---


# Sending Gameplay Ability Data from Client to Server

Before you read this, I recommend quickly reviewing my high level
[Gameplay Ability System Conceptual Overview](/UE5/GameplayAbilitySystem/).

If you  prefer video, see my YouTube video covering this topic:
[UE5 Gameplay Ability: Client to Server Target Data RPC](https://youtu.be/VvkIuUnk05M)

Client-Server RPC is a bit different in the Gameplay Ability System than it is in other areas of UE5
because the RPC must be routed through the `UAbilitySystemComponent` attached to the ability's owner.

The concept is the same -- client prepares data and invokes an RPC on the server -- but the mechanics
are specific to the Gameplay Ability System.


## Some C++ Seems to be Required

An important note for Blueprint users is that **some** C++ does seem to be required to enable the client to
send the TargetData RPC to the server.

This seems to be due to the unique mechanism that the Gameplay Ability System uses for its RPC.

You can still implement MOST of your ability in Blueprints, but you MUST provide some sort of C++
method for the blueprints to call that actually creates and initializes the TargetData in a way
that is compatible with `AbilitySystemComponent`'s expectations.


### C++ Quick Links

If you already know conceptually how all of this works and you just want to jump ahead to the C++
code, here are your links:

- [Create TargetData Struct using C++ new operator](#ExampleClientToServerAbility__ActivateLocalPlayerAbility)
- [Execute AbilitySystemComponent RPC when appropriate](#XCL_GameplayAbility_ClientToServer__NotifyTargetDataReady)

There is more code below explaining how this all fits together, but the above are the things
that you absolutely must implement in C++ to enable Client-Server RPC capability.


# Client-Server Ability Concept

Conceptually, sending data from the client to the server is very easy.  Here is how it works in terms
of a Gameplay Ability:


## Client Responsibility

1. Generate `TargetData` that is known only to the client (e.g. mouse position, etc).
2. Make the `TargetData` known to the server via RPC.
3. Execute the server code (or an approximation of it) to provide local prediction of the server's actions.
    1. If standalone mode, or if player is local to the server, server code is executed with authority.


## Server Responsibility

1. Wait for `TargetData` to arrive from the client.
2. Validate client `TargetData` -- some clients like to cheat!
3. Execute the server code using validated data.




# XCL Solution: ClientToServer Abstraction

My solution to this problem is to extend from my base `XCLGameplayAbility` with a focus on making it very
easy to create `ClientToServer` abilities with minimal duplication of code.

With the setup described here, every new Gameplay Ability I create in the future
that needs to send data from the client to the server will derive from the
`XCLGameplayAbility_ClientToServer` class and will only have to implement 2 methods to be fully functional:

- `ActivateLocalPlayerAbility` = Generate `TargetData` and call `NotifyTargetDataReady`
- `ActivateAbilityWithTargetData` = Run the ability with known `TargetData`


## `XCLGameplayAbility_ClientToServer` Implementation

Derives from base `XCLGameplayAbility`.

New methods:

- [ActivateAbilityWithTargetData](#ExampleClientToServerAbility__ActivateAbilityWithTargetData) (link goes to `UExampleClientToServerAbility` implementation)
  - Abstract - you must implement this
- [NotifyTargetDataReady](#XCLGameplayAbility_ClientToServer__NotifyTargetDataReady)
  - You must call this from `ActivateLocalPlayerAbility` once `TargetData` is known

`XCLGameplayAbility` overrides:

- [ActivateServerAbility](#XCLGameplayAbility_ClientToServer__ActivateServerAbility) : subscribe to `AbilitySystemComponent` events
  - Invoke `NotifyTargetDataReady` on each `ASC.TargetDataSet` event
- [EndAbilityCleanup](#XCLGameplayAbility_ClientToServer__EndAbilityCleanup) : clean up event listener


# `UExampleClientToServerAbility`

This example class shows how to implement a `ClientToServer` ability.
Only two methods must be defined to accomplish this:


##### `ActivateLocalPlayerAbility` (override `XCLGameplayAbility`)
- Client only
  - Gather the `TargetData` info
  - Invoke `NotifyTargetDataReady`


##### `ActivateAbilityWithTargetData` (override `XCLGameplayAbility_ClientToServer`)
- Client + Server
  - Execute the ability with the `TargetData`


## `UExampleClientToServerAbility.h`

```c++
#pragma once

#include "CoreMinimal.h"
#include "Ability/XCLGameplayAbility_ClientToServer.h"
#include "ExampleClientToServerAbility.generated.h"

UCLASS()
class XISTCORELYRA_API UExampleClientToServerAbility : public UXCLGameplayAbility_ClientToServer
{
	GENERATED_BODY()

protected:
	//~UXCLGameplayAbility interface
	virtual void ActivateLocalPlayerAbility(const FGameplayAbilitySpecHandle Handle, const FGameplayAbilityActorInfo* ActorInfo, const FGameplayAbilityActivationInfo ActivationInfo, const FGameplayEventData* TriggerEventData) override;
	//~End of UXCLGameplayAbility interface

	//~UXCLGameplayAbility_ClientToServer interface
	virtual void ActivateAbilityWithTargetData(const FGameplayAbilityTargetDataHandle& TargetDataHandle, FGameplayTag ApplicationTag) override;
	//~End of UXCLGameplayAbility_ClientToServer interface

};
```


<a id="ExampleClientToServerAbility__ActivateLocalPlayerAbility"></a>
## `ActivateLocalPlayerAbility` Implementation

This method demonstrates the required boilerplate C++ code that you must run in order to create a `TargetData`
struct that can be sent to the server via `AbilitySystemComponent`'s RPC mechanism.

You can add pretty much any value into `TargetData` by deriving from `FGameplayAbilityTargetData`.  That base class
is required by UE5.  In the example below I'm using a `FGameplayAbilityTargetData_LocationInfo` struct, which simply
allows for an `FTransform` as the `TargetData`.

In the below example we just send the value `FVector::ZeroVector` as the `TargetData` location.

You **must use the system `new` operator** to instantiate the `TargetData` value or you will get memory
related game crashes.  This is a (Lyra?) Gameplay Ability System requirement.

```c++
void UExampleClientToServerAbility::ActivateLocalPlayerAbility(const FGameplayAbilitySpecHandle Handle, const FGameplayAbilityActorInfo* ActorInfo, const FGameplayAbilityActivationInfo ActivationInfo, const FGameplayEventData* TriggerEventData)
{
	// Compute the TargetData
	FVector ClientLocation = FVector::ZeroVector;  // some value you compute

	// Format the TargetData for GAS RPC

	FGameplayAbilityTargetDataHandle TargetDataHandle;
	FGameplayAbilityTargetData_LocationInfo* TargetData = new FGameplayAbilityTargetData_LocationInfo(); //** USE OF new() IS **REQUIRED** **

	TargetData->TargetLocation.LocationType = EGameplayAbilityTargetingLocationType::LiteralTransform;
	TargetData->TargetLocation.LiteralTransform = FTransform(ClientLocation);

	TargetDataHandle.Add(TargetData);

	// Notify self (local client) *AND* server that TargetData is ready to be processed
	NotifyTargetDataReady(TargetDataHandle, FGameplayTag());  // send with a gameplay tag, or empty
}
```


<a id="ExampleClientToServerAbility__ActivateAbilityWithTargetData"></a>
## `ActivateAbilityWithTargetData` Implementation

This is an example of how you might implement `ActivateAbilityWithTargetData`.

This runs on the local player client as prediction code
AND on the server as authoritative code
after the `TargetData` is received from the client.

In this example all we do is log the `ClientLocation` that we retrieve from the
`TargetData` the client sent, but you could spawn a black hole there and consume the world,
or whatever else you prefer.

```c++
void UExampleClientToServerAbility::ActivateAbilityWithTargetData(const FGameplayAbilityTargetDataHandle& TargetDataHandle, FGameplayTag ApplicationTag)
{
	// retrieve data
	const FGameplayAbilityTargetData* TargetData = TargetDataHandle.Get(0);
	if (!TargetData)
	{
		// client sent us bad data
		CancelAbility(CurrentSpecHandle, CurrentActorInfo, CurrentActivationInfo, true);
		return;
	}

	// decode data
	const FVector ClientLocation = TargetData->GetEndPoint();

	// Server: Validate data
	const bool bIsServer = CurrentActorInfo->IsNetAuthority();
	if (bIsServer)
	{
		if (ClientLocation.X < 0)  // if negative X is prohibited by server for some reason
		{
			CancelAbility(CurrentSpecHandle, CurrentActorInfo, CurrentActivationInfo, true);
			return;
		}
	}

	//////////////////////////////////////////////////////////////////////
	// Client & Server both -- data is valid, activate the ability with it
	//////////////////////////////////////////////////////////////////////

	// in this case we just log a message:
	XCL_GALOG(TEXT("ClientLocation = %s"), *ClientLocation.ToString());

	// this is an instant ability, end it immediately (only replicate if bIsServer)
	EndAbility(CurrentSpecHandle, CurrentActorInfo, CurrentActivationInfo, bIsServer, false);
}
```


<a id="XCL_GameplayAbility_ClientToServer"></a>
# `UXCLGameplayAbility_ClientToServer`

The code below is something you will absolutely want to incorporate into any GameplayAbility class
that needs to send data from the client to the server.

You can choose to put this in your base ability class, but I didn't.
Instead, my base ability is general purpose and can be used for any type of data flow.
(I covered the base `XCLGameplayAbility` in the conceptual overview linked at the top of this tutorial.)

My choice was to derive from the base `XCLGameplayAbility` using a `ClientToServer` variant,
such that all abilities that require this functionality can get it,
but the base class is open for wildly different and conflicting flows.


<a id="XCL_GameplayAbility_ClientToServer__NotifyTargetDataReady"></a>
## `NotifyTargetDataReady` Implementation

This code shows the boilerplate C++ code required to send the client-computed `TargetData` to the server if the
local player is a remote client.

Whether the local player is local to the server or remote from the server, either way the ability
itself gets executed as well via `ActivateAbilityWithTargetData`.

You could potentially move the `CommitAbility` call out of here if you need to for some reason.
Having it here ensures the client doesn't attempt to execute the ability unless it thinks the Commit will
actually succeed on the server.


```c++
void UXCLGameplayAbility_ClientToServer::NotifyTargetDataReady(const FGameplayAbilityTargetDataHandle& InData, FGameplayTag ApplicationTag)
{
	UAbilitySystemComponent* ASC = CurrentActorInfo->AbilitySystemComponent.Get();
	check(ASC);

	// [xist] is this (from Lyra) like an "if is handle valid?" check? seems so, keeping it as such.
	if (!ASC->FindAbilitySpecFromHandle(CurrentSpecHandle))
	{
		CancelAbility(CurrentSpecHandle, CurrentActorInfo, CurrentActivationInfo, false);  // do not replicate
		return;
	}

	// if commit fails, cancel ability
	if (!CommitAbility(CurrentSpecHandle, CurrentActorInfo, CurrentActivationInfo))
	{
		CancelAbility(CurrentSpecHandle, CurrentActorInfo, CurrentActivationInfo, true);  // replicate cancellation
		return;
	}

	// true if we need to replicate this target data to the server
	const bool bShouldNotifyServer = CurrentActorInfo->IsLocallyControlled() && !CurrentActorInfo->IsNetAuthority();

	// Start a scoped prediction window
	FScopedPredictionWindow	ScopedPrediction(ASC);

	// Lyra does this memcopy operation; const cast paranoia is real. We'll keep it.
	// Take ownership of the target data to make sure no callbacks into game code invalidate it out from under us
	const FGameplayAbilityTargetDataHandle LocalTargetDataHandle(MoveTemp(const_cast<FGameplayAbilityTargetDataHandle&>(InData)));

	// if this isn't the local player on the server, then notify the server
	if (bShouldNotifyServer)
		ASC->CallServerSetReplicatedTargetData(CurrentSpecHandle, CurrentActivationInfo.GetActivationPredictionKey(), LocalTargetDataHandle, ApplicationTag, ASC->ScopedPredictionKey);

	// Execute the ability we've now successfully committed
	ActivateAbilityWithTargetData(LocalTargetDataHandle, ApplicationTag);

	// We've processed the data, clear it from the RPC buffer
	ASC->ConsumeClientReplicatedTargetData(CurrentSpecHandle, CurrentActivationInfo.GetActivationPredictionKey());
}
```

## `ActivateServerAbility` Implementation

`XCLGameplayAbility_ClientToServer` overrides the default server ability execution.
It does nothing other than listen for
`AbilitySystemComponent`'s `AbilityTargetDataSet` event.

Each time the client invokes the RPC with `TargetData`, the server executes `NotifyTargetDataReady`(`TargetData`)

```c++
void UXCLGameplayAbility_ClientToServer::ActivateServerAbility(const FGameplayAbilitySpecHandle Handle, const FGameplayAbilityActorInfo* ActorInfo, const FGameplayAbilityActivationInfo ActivationInfo, const FGameplayEventData* TriggerEventData)
{
	UAbilitySystemComponent* ASC = ActorInfo->AbilitySystemComponent.Get();
	check(ASC);

	// plug into AbilitySystemComponent to receive Target Data from client
	NotifyTargetDataReadyDelegateHandle = ASC->AbilityTargetDataSetDelegate(Handle, ActivationInfo.GetActivationPredictionKey()).AddUObject(this, &ThisClass::NotifyTargetDataReady);
}
```


## `EndAbilityCleanup` Implementation

As we hooked into `AbilitySystemComponent`'s delegate on `ActivateServerAbility`,
we must ensure to remove the hook when the ability ends.

You can put this in your `EndAbility`, but I'm using my custom `EndAbilityCleanup` hook
from `XCLGameplayAbility` that makes derived
class code much simpler and with far less copy/paste.

```c++
void UXCLGameplayAbility_ClientToServer::EndAbilityCleanup(const FGameplayAbilitySpecHandle Handle, const FGameplayAbilityActorInfo* ActorInfo, const FGameplayAbilityActivationInfo ActivationInfo, bool bReplicateEndAbility, bool bWasCancelled)
{
	UAbilitySystemComponent* ASC = CurrentActorInfo->AbilitySystemComponent.Get();
	check(ASC);

	// clean up the mess we made in ASC
	ASC->AbilityTargetDataSetDelegate(CurrentSpecHandle, CurrentActivationInfo.GetActivationPredictionKey()).Remove(NotifyTargetDataReadyDelegateHandle);
	ASC->ConsumeClientReplicatedTargetData(CurrentSpecHandle, CurrentActivationInfo.GetActivationPredictionKey());

	// run base class cleanup operations too
	Super::EndAbilityCleanup(Handle, ActorInfo, ActivationInfo, bReplicateEndAbility, bWasCancelled);
}
```
