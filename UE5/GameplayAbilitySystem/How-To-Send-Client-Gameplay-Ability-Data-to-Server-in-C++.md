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

Client-Server RPC is a bit different in the Gameplay Ability System than it is in other areas of UE5
because the RPC must be routed through the `UAbilitySystemComponent` attached to the ability's owner.

The concept is the same -- client prepares data and invokes an RPC on the server -- but the mechanics
are specific to the Gameplay Ability System.


# Network Execution = `LocalPredicted`

To generate data on the client and send it to the server, you your ability must use the `LocalPredicted`
network execution mode.  In this mode, abilities will run on both the client and the server.

To correctly implement the ability on a multiplayer network, the local client must act differently than the server,
as illustrated below.


## Local Player Responsibility

1. Make the `TargetData` location known to the server via RPC.
2. Execute the server code (or an approximation of it) to provide local prediction of the server's actions.

`TargetData` can contain vectors, lists of actors, hit results, etc.


## Server Responsibility

1. Wait for `TargetData` to arrive from the client.
2. Validate client `TargetData` -- some clients like to cheat.
3. Execute the server code using validated data.


In the case of a Listen Server, abilities of the player on the server must be treated like a player,
not like the server, so it should perform the Local Player Responsibility above.  Furthermore, abilities
from remote clients will also be run, and the Server Responsibility must be performed in those cases.

My `XCL`_`GameplayAbility` base class handles this distinction, and it is an important one you must consider.

# Implementation Considerations

We create a new virtual method `ActivateAbilityWithTargetData` and call it either as the local player client
or as the server.

In this method, we run both local player and server code.  This is purely the "do the ability now" code in the
larger process of activating a Gameplay Ability.

We expect the client's results will match the server, but the server must validate the data to prevent cheating.


## Client Logic

- Compute required `TargetData` that isn't known to the server (mouse data, etc)
- Send `TargetData` to the server via RPC
- Call `ActivateAbilityWithTargetData`(`TargetData`)

## Server Logic

- Listen for `AbilitySystemComponent` `TargetDataSet` events
- On each `TargetDataSet` event:
  - Call `ActivateAbilityWithTargetData`(`TargetData`)

My specific implementation is `XCL`_`GameplayAbility_ClientToServer`, detailed below.


# `XCL`_`GameplayAbility_ClientToServer`

The solution to the `ClientToServer` ability model is implemented in this class
which is derived from `XCL`_`GameplayAbility`.

This class adds 2 new virtual methods:

#### `ActivateAbilityWithTargetData` *(Abstract)*

- Executed by `NotifyTargetDataReady`
    - As local player
    - As server

#### `NotifyTargetDataReady`

- You must call from `ActivateLocalPlayerAbility` once `TargetData` has been computed.


## `ActivateAbilityWithTargetData`

This method is the key to the `ClientToServer` ability model. 

This is called in multiple contexts in different
[Network Modes](/UE5/GameplayAbilitySystem/#xcl-gameplayability-network-modes).
Make sure you understand this concept.

If you are the server, you must validate the client input because some clients like to cheat.

If you are the local player, you should do the same things as the server to effectively predict
the outcome of the server's calculation.


## `NotifyTargetDataReady`

It is the responsibility of `ActivateLocalPlayerAbility` to call `NotifyTargetDataReady`.

###### On the local player client, calling this does both:

- Send the `TargetData` to the server via RPC.
- Run `ActivateAbilityWithTargetData` as a local client to predict the effect of the ability.

The local changes stay local but the expectation is the server calculations are the same,
and so the updated state replicated out to other clients is the same result as your local prediction.

###### When the `TargetData` RPC is received by the server:

- Run `ActivateAbilityWithTargetData` as the server, replicate result to clients.


### `NotifyTargetDataReady` Logic

This method is fully implemented in `XCL_GameplayAbility_ClientToServer` so derived classes don't need to
do anything with this at all except understand what is happening.

This implementation works both for local players and for remote players connected to the server.

```
if invalid ability:
    CancelAbility()

else if CommitAbility() fails:
    CancelAbility()

else:
    if local player is remote from server:
        AbilitySystemComponent->CallServerSetReplicatedTargetData( TargetData )

    ActivateAbilityWithTargetData( TargetData )  // XCL method

    AbilitySystemComponent->ConsumeClientReplicatedTargetData()
```

The exact [C++ code](#XCL_GameplayAbility_ClientToServer__NotifyTargetDataReady)
for `NotifyTargetDataReady` is listed below for reference.


# `AbilitySystemComponent` : `TargetData` RPC

The `AbilitySystemComponent` (provided by Lyra's GAS implementation) has a delegate we hook into called
`AbilityTargetDataSetDelegate`.

We configure it such that every time the server receives a `TargetData` from a client,
it calls `NotifyTargetDataReady`(`TargetData`).

This also requires us to do some cleanup during `EndAbility`() which we'll accomplish via
the `EndAbilityCleanup`() 


# `UExampleClientToServerAbility`

This example class shows how to implement a `ClientToServer` ability.  Only two methods must be defined to accomplish this:


- `ActivateLocalPlayerAbility` override `XCL`_`GameplayAbility`
  - Gather the `TargetData` info and invoke `NotifyTargetDataReady`


- `ActivateAbilityWithTargetData` override `XCL`_`GameplayAbility_ClientToServer`
  - Runs on both the client and server to execute the ability with the `TargetData`.


```c++
#pragma once

#include "CoreMinimal.h"
#include "Ability/XCL_GameplayAbility_ClientToServer.h"
#include "ExampleClientToServerAbility.generated.h"

UCLASS()
class XISTCORELYRA_API UExampleClientToServerAbility : public UXCL_GameplayAbility_ClientToServer
{
	GENERATED_BODY()

protected:
	//~UXCL_GameplayAbility interface
	virtual void ActivateLocalPlayerAbility(const FGameplayAbilitySpecHandle Handle, const FGameplayAbilityActorInfo* ActorInfo, const FGameplayAbilityActivationInfo ActivationInfo, const FGameplayEventData* TriggerEventData) override;
	//~End of UXCL_GameplayAbility interface

	//~UXCL_GameplayAbility_ClientToServer interface
	virtual void ActivateAbilityWithTargetData(const FGameplayAbilityTargetDataHandle& TargetDataHandle, FGameplayTag ApplicationTag) override;
	//~End of UXCL_GameplayAbility_ClientToServer interface

};
```


## `ActivateLocalPlayerAbility` Implementation

You can add pretty much any value into `TargetData` by deriving from `FGameplayAbilityTargetData`.  That base class
is required by UE5.

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

	TargetData->SourceLocation.LocationType = EGameplayAbilityTargetingLocationType::LiteralTransform;
	TargetData->SourceLocation.LiteralTransform = FTransform(ClientLocation);

	TargetDataHandle.Add(TargetData);

	// Notify self (local client) *AND* server that TargetData is ready to be processed
	NotifyTargetDataReady(TargetDataHandle, FGameplayTag());  // send with a gameplay tag, or empty
}
```


## `ActivateAbilityWithTargetData` Implementation

This runs on the local player client as prediction code.

It also runs on the server as authoritative code after the `TargetData` is received from the client.

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
	const FVector ClientLocation = TargetData->GetOrigin().GetLocation();

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


<a id="XCL_GameplayAbility_ClientToServer__NotifyTargetDataReady"></a>
# `UXCL_GameplayAbility_ClientToServer`

The code below is something you will absolutely want to incoporate into any GameplayAbility class
that needs to send data from the client to the server.

You can choose to put this in the base ability, but I didn't.  Instead, my base ability is general purpose and can
be used for anything.
(I covered the base `XCL_GameplayAbility` in the conceptual overview linked at the top of this tutorial.)

My choice was to derive from the base `XCL_GameplayAbility` using a `ClientToServer` variant,
such that all abilities that require this functionality can get it,
but the base class is open for wildly different and conflicting flows.


## `NotifyTargetDataReady` Implementation


```c++
void UXCL_GameplayAbility_ClientToServer::NotifyTargetDataReady(const FGameplayAbilityTargetDataHandle& InData, FGameplayTag ApplicationTag)
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

`XCL_GameplayAbility_ClientToServer` overrides the default server ability execution.
It does nothing other than listen for
`AbilitySystemComponent`'s `AbilityTargetDataSet` event.

Each time the client invokes the RPC with `TargetData`, the server executes `NotifyTargetDataReady`(`TargetData`)

```c++
void UXCL_GameplayAbility_ClientToServer::ActivateServerAbility(const FGameplayAbilitySpecHandle Handle, const FGameplayAbilityActorInfo* ActorInfo, const FGameplayAbilityActivationInfo ActivationInfo, const FGameplayEventData* TriggerEventData)
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
from `XCL_GameplayAbility` that makes derived
class code much simpler and with far less copy/paste.

```c++
void UXCL_GameplayAbility_ClientToServer::EndAbilityCleanup(const FGameplayAbilitySpecHandle Handle, const FGameplayAbilityActorInfo* ActorInfo, const FGameplayAbilityActivationInfo ActivationInfo, bool bReplicateEndAbility, bool bWasCancelled)
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
