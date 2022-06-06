---
title: "How to: Send Client Gameplay Ability Data to the Server in C++"
description: 
back_links:
  - link: /UE5/
    name: UE5
  - link: /UE5/LyraStarterGame/
    name: LyraStarterGame
  - link: /UE5/LyraStarterGame/Tutorials/
    name: Tutorials
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

We create a new virtual method `ExecuteAbilityWithTargetData` and call it either as the local player client
or as the server.

In this method, we run both local player and server code.  This is purely the "do the ability now" code in the
larger process of activating a Gameplay Ability.

We expect the client's results will match the server, but the server must validate the data to prevent cheating.


## Client Logic

- Compute required `TargetData` that isn't known to the server (mouse data, etc)
- Send `TargetData` to the server via RPC
- Call `ExecuteAbilityWithTargetData`(`TargetData`)

## Server Logic

- Listen for `AbilitySystemComponent` `TargetDataSet` events
- On each `TargetDataSet` event:
  - Call `ExecuteAbilityWithTargetData`(`TargetData`)

My specific implementation is `XCL`_`GameplayAbility_ClientToServer`, detailed below.


# `XCL`_`GameplayAbility_ClientToServer`

The solution to the `ClientToServer` ability model is implemented in this class
which is derived from `XCL`_`GameplayAbility`.

This class adds 2 new virtual methods:

- `NotifyTargetDataReady`
  - Must be called by `ActivateLocalPlayerAbility` once `TargetData` has been computed.


- `ExecuteAbilityWithTargetData`
  - Executed by `NotifyTargetDataReady`
    - As local player
    - As server


## `ExecuteAbilityWithTargetData`

This method is the key to the `ClientToServer` ability model. 

This is called in multiple contexts in different
[Network Modes](/UE5/GameplayAbilitySystem/#xcl-gameplayability-network-modes).
Make sure you understand this concept.

If you are the server, you must validate the client input because some clients like to cheat.

If you are the local player, you should do the same things as the server to effectively predict
the outcome of the server's calculation.


## `NotifyTargetDataReady`

It is the responsibility of `ActivateLocalPlayerAbility` to call `NotifyTargetDataReady`.

On the local player client, calling this does both:

- Send the `TargetData` to the server via RPC.
- Run `ExecuteAbilityWithTargetData` as a local client to predict the effect of the ability.

The local changes stay local but the expectation is the server calculations are the same,
and so the updated state replicated out to other clients is the same result as your local prediction.

When the `TargetData` RPC is received by the server:

- Run `ExecuteAbilityWithTargetData` as the server, replicate result to clients.


### `XCL`_`GameplayAbility_ClientToServer`::`NotifyTargetDataReady` Implementation

This implementation handles both cases: local player and remote server.

```
if invalid ability:
    CancelAbility()

else if CommitAbility() fails:
    CancelAbility()

else:
    if local player is remote from server:
        AbilitySystemComponent->CallServerSetReplicatedTargetData( TargetData )

    ExecuteAbilityWithTargetData( TargetData )  // XCL method

    ASC->ConsumeClientReplicatedTargetData()
    EndAbility()
```


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


- `ExecuteAbilityWithTargetData` override `XCL`_`GameplayAbility_ClientToServer`
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
	virtual void ExecuteAbilityWithTargetData(const FGameplayAbilityTargetDataHandle& TargetDataHandle, FGameplayTag ApplicationTag) override;
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
	FVector ClientLocation = FVector::ZeroVector;  // some value you compute

	FGameplayAbilityTargetDataHandle TargetDataHandle;
	FGameplayAbilityTargetData_LocationInfo* TargetData = new FGameplayAbilityTargetData_LocationInfo(); //** USE OF new() IS **REQUIRED** **

	TargetData->SourceLocation.LocationType = EGameplayAbilityTargetingLocationType::LiteralTransform;
	TargetData->SourceLocation.LiteralTransform = FTransform(ClientLocation);

	TargetDataHandle.Add(TargetData);

	NotifyTargetDataReady(TargetDataHandle, FGameplayTag());  // send with a gameplay tag, or empty
}
```


## `ExecuteAbilityWithTargetData` Implementation

This runs on the local player client as prediction code.

It also runs on the server as authoritative code after the `TargetData` is received from the client.

```c++
void UExampleClientToServerAbility::ExecuteAbilityWithTargetData(const FGameplayAbilityTargetDataHandle& TargetDataHandle, FGameplayTag ApplicationTag)
{
	if (const FGameplayAbilityTargetData* TargetData = TargetDataHandle.Get(0))
	{
		const FVector ClientLocation = TargetData->GetOrigin().GetLocation();

		if (CurrentActorInfo->IsNetAuthority())
		{
			// Server: do data validation here
			if (ClientLocation.X < 0)  // if negative X is prohibited by server for some reason
			{
				CancelAbility(CurrentSpecHandle, CurrentActorInfo, CurrentActivationInfo, true);
				return;
			}
		}

		//////////////////////////////////////////////////////////////////////
		// Client & Server both -- data is valid, perform the ability with it
		//////////////////////////////////////////////////////////////////////

		// in this case we just log a message:
		XCL_GALOG(TEXT("ClientLocation = %s"), *ClientLocation.ToString());
	}
}
```
