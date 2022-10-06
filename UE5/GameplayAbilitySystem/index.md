---
title: Gameplay Ability System Conceptual Overview
description: High level overview of UE5's Gameplay Ability System as implemented in LyraStarterGame
back_links:
  - link: /UE5/
    name: UE5
back_link_title: Gameplay Ability System
---


# UE5 Gameplay Ability System Conceptual Overview

If you prefer video, see my YouTube video covering this topic: [Gameplay Ability System Conceptual Overview](https://youtu.be/hx5NjvH64ug)

[LyraStarterGame](/UE5/LyraStarterGame/)
implements UE5's Gameplay Ability System.  In general it's quite easy to use once you understand
its concepts.

In this guide I'll introduce you to big picture Gameplay Ability concepts so hopefully the entire system makes
more sense to you and you'll be able to understand it in less time than I had to spend deducing this.

The information here specifically relates to the Gameplay Ability System as implemented in UE5's LyraStarterGame.
That is my use case and the only context in which I've used UE5 GAS.


# Ability Lifecycle

- `OnGiveAbility`
- Owner now has this ability
  - possible to call `ActivateAbility` many times
- `OnRemoveAbility`

The `OnGiveAbility` and `OnRemoveAbility` events are good places to set up pointers that you'll use a lot while
your ability is firing.  For example I like to make `ULyraPlayerController` and/or `ULyraPlayerState` references
so I don't have to keep computing them every time an ability activates.

`ActivateAbility` will only be called once an ability has been granted to an owner.  It may be called many times.


# Abilities While Granted to Owners

Whenever an ability is granted to an owner, any time there is an Ability activation event (user input or other)
Lyra effectively does this:

```
if CanActivateAbility() then
      ActivateAbility()
```

You must implement `ActivateAbility` at the very least.

Once `ActivateAbility` is called, this ability will not be able to be used again until `EndAbility` is called.

**It is your responsibility** to call `EndAbility` whenever your ability has ended.

Instant abilities end on the same tick, while other abilities persist to the future.  It's up to you.

## DO NOT CALL `ULyraGameplayAbility::ActivateAbility`

As of UE 5.0.2, `ULyraGameplayAbility`'s default `ActivateAbility` method looks essentially like this:

```
if have blueprint event:
    use blueprint event
else
    CommitAbility()  // you probably don't want to do this
```

It is expected that Epic does not intend for this automatic, unconditional `CommitAbility` to run, which means treat
their implementation only as an example, and not as something to derive from.

Indeed, in the code they shipped with UE 5.0.2, every single Gameplay Ability was implemented in Blueprints, such
that this auto-`CommitAbility` never actually runs in their example code.  It is not intended to be run.

The useful part of their example is how they allow for blueprint compatibility, which is something you should look
at if that's of interest to you.


<a id="XCL_GameplayAbility"></a>
# `XCLGameplayAbility`: Base Ability Class

I have created my own Gameplay Ability `XCLGameplayAbility` that derives from
`ULyraGameplayAbility` and adds some quality of life improvements.

In addition to providing more suitable `ActivateAbility` base class behavior, it also significantly reduces the
boilerplate and duplicate code required to implement an event.

`XCLGameplayAbility` allows for two implementations for the same ability - one for local
players and one for the server.

`ActivateAbility` implementation:

```
if server for remote client:
    ActivateServerAbility()       // server variant, always with authority
else:
    ActivateLocalPlayerAbility()  // local player variant, sometimes with authority, sometimes without
```

It automatically invokes either the local player variant or the server variant depending on the context.


<a id="xcl-gameplayability-network-modes"></a>
### `XCLGameplayAbility` Network Mode Variants

| Network Mode     | Variant      | Authority? | Note                     | Method Invoked               |
|------------------|--------------|------------|--------------------------|------------------------------|
| Standalone       | local player | Yes        | client is local player   | `ActivateLocalPlayerAbility` |
| Client           | local player | NO         | remote client            | `ActivateLocalPlayerAbility` |
| Listen Server    | local player | Yes        | client is local player   | `ActivateLocalPlayerAbility` |
| Listen Server    | server       | Yes        | server for remote client | `ActivateServerAbility`      |
| Dedicated Server | server       | Yes        | server for remote client | `ActivateServerAbility`      |

### Default implementation

By default in `XCLGameplayAbility` no native action is taken at all.  Blueprint events are called, if they exist, but
otherwise nothing happens.

Thus it's very easy to implement blueprint support for either the local player or server ability variants, you have a
reasonable default to begin with.

For any events that should run on a local player's machine, implement the local player hook `ActivateLocalPlayerAbility`.

Any event that requires server authority must implement the server hook `ActivateServerAbility`.

**In the case of a Listen Server both variants will be called.**
Whenever the local player is performing actions, the
local player variant is used.  The server variant is used to support the remote players.

### `EndAbility` update

I found a nice `EndAbility` implementation somewhere that seems better than Lyra's default.

Its code looks something like this:

```
if IsEndAbilityValid():
    if ScopeLockCount == 0:
        EndAbilityCleanup()  // XCL extension method
        Super::EndAbility()
    else:
        wait for locks; try to EndAbility() again later
```

`XCL` adds a new method `EndAbilityCleanup` that is actually executed when it's really time to `EndAbility`.  This may
not necessarily be the first time `EndAbility` is called, especially if there are local prediction scope locks still
in place.

When the scope locks are cleared then `EndAbilityCleanup` will be invoked and then finally the `Super::EndAbility`
will be called to actually and finally end the ability.

The nice part about this is it means you don't have to have repeated "is it time to end yet?" code in every single
class derived from `ULyraGameplayAbility`.  Instead, this `EndAbility` does that and calls a much simpler
"it's actually time to free your resources now" event so you only have to care about stuff that's actually relevant
to your ability rather than boilerplate GAS mechanics.


# Net Execution Policy

An ability's `NetExecutionPolicy` determines whether it will run on the client and/or server and also whether it
is initiated on the client or the server.

| Policy            | Client                           | Server                           | Note                                     |
|-------------------|----------------------------------|----------------------------------|------------------------------------------|
| `LocalPredicted`  | ![yes](/assets/images/Ymark.png) | ![yes](/assets/images/Ymark.png) | Default. Requires GAS Client->Server RPC |
| `LocalOnly`       | ![yes](/assets/images/Ymark.png) | ![no](/assets/images/Nmark.png)  | Use this for UI abilities                |
| `ServerOnly`      | ![no](/assets/images/Nmark.png)  | ![yes](/assets/images/Ymark.png) |                                          |
| `ServerInitiated` | ![yes](/assets/images/Ymark.png) | ![yes](/assets/images/Ymark.png) |                                          |

See `EGameplayAbilityNetExecutionPolicy` in [GameplayAbilityTypes.h](https://github.com/EpicGames/UnrealEngine/blob/release/Engine/Plugins/Runtime/GameplayAbilities/Source/GameplayAbilities/Public/Abilities/GameplayAbilityTypes.h)


### Net Execution Policy: `LocalPredicted`

This is the default setting for `ULyraGameplayAbility`.

An ability with net execution policy `LocalPredicted` will run on both the client and the server.
If it is necessary for the server to have `TargetData` (as UE5 calls it), the client must produce the
data and send it to the server via RPC.

As a C++ developer it was challenging to deduce how exactly to do this since Lyra's examples are all
in blueprint, which exclusively use
Gameplay Ability Tasks (an advanced Gameplay Ability concept that I may cover later)
which obscure the actual underlying mechanics.

Having studied the available blueprints and their underlying C++, I put together a tutorial
for fellow C++ developers:

[How To: Send Client Gameplay Ability Data to Server in C++](./How-To-Send-Client-Gameplay-Ability-Data-to-Server-in-C++)


### Net Execution Policy: `LocalOnly`

An ability with this execution policy will only run on the client.

Any processing you do or changes you make to the game will ONLY take effect for the local client who runs the ability.

This is the easiest type of ability to implement.  It's great for UI abilities or other abilities that have
no impact on the network at all.


### Net Execution Policy: `ServerInitiated`

This ability is initiated by the server and runs on both the client and the server.


### Net Execution Policy: `ServerOnly`

Abilities marked as `ServerOnly` will not run at all on the client.  Instead, they run only on the server, and
any changes the server makes are replicated out to the clients.

This is also very easy to implement as the server does whatever you want and then the results
replicate out to the clients.


# Related Resources

I highly recommend thoroughly reading through these if you want a deep understanding of the Gameplay Ability System:

- [tranek's GASDocumentation](https://github.com/tranek/GASDocumentation)
- [Engine Source: GameplayAbilities Plugin](https://github.com/EpicGames/UnrealEngine/tree/release/Engine/Plugins/Runtime/GameplayAbilities)
- [UE4 Gameplay Ability System Wiki Archive](https://unreal.gg-labs.com/wiki-archives/networking/gameplay-abilities-and-you)
