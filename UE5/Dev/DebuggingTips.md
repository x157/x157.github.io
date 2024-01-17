---
title: "Debugging Tips | UE5 Development"
description: "Tips for debugging UE5 C++"
breadcrumb_path: "UE5/Dev"
breadcrumb_name: "Debugging Tips"
---

# C++ Debugging Tips

- [Build Target: `DebugGame Editor`](#BuildTarget_DebugGame_Editor)
- [C++ Coding Style for Easy Debugging](#CppCodingStyleDebugging)
- [Xist Log Format](#XistLogFormat)


<a id="BuildTarget_DebugGame_Editor"></a>
<a id="BuildTarget_Debug_Editor"></a>
## Build Target: `DebugGame Editor`

**You cannot easily debug executables without debugging symbols.**

In general, it's preferred to build your game in `DebugGame Editor`.
This will run your game in Debug mode, and the Editor in non-Debug mode.
Usually that's fine since when you are crashing, you are likely going to be
crashing in your own code rather than in Engine code.

However sometimes you will notice that you're crashing in Engine code,
in which case to debug it you will need to compile a debug
build of **both the Engine AND the Game** using the `Debug Editor` build target.

*NOTE: This is useful (REQUIRED!) for C++ devs, but not for BP devs, artists, etc.
That is why Epic typically doesn't recommend this setting in general.
Most UE5 users are not C++ devs, but we are, and this is how we debug our C++.*

Running in `Debug Editor` can be painfully slow, so in general you want to avoid it,
and instead run in `DebugGame Editor`.
On *extremely large* projects, even `DebugGame Editor` may be slow, in which case
you'll want to run in `Development Editor` unless/until you are specifically trying
to diagnose a crash, and then switch to `DebugGame Editor` or `Debug Editor` depending
on where the crash is occurring.


<a id="CppCodingStyleDebugging"></a>
## C++ Coding Style for Easy Debugging

**TLDR: Resist the urge to write a 1-liner and profit by reduced time spent debugging and explaining code later.**

### Bad: Difficult to Debug
```c++
// Bad: DIFFICULT TO DEBUG
UMyComp* FindMyComp(const AActor* Actor)
{
    return Actor ? Cast<UMyComp>(Actor->GetComponentByType(GetTargetComponentType())) : nullptr;
}
```

In the example Bad code above, yes it's true this is a nice short 1-liner that inexperienced developers
might think looks pretty.

Imagine now that someone else wrote this code, and you are trying to debug it.
`FindMyComp` is returning `nullptr` which you do not expect to happen.

Why is it returning `nullptr`?

- `Actor` may start as `nullptr` (this is the only thing you can easily see)
- `GetTargetComponentType()` may return `nullptr`, but we cannot see if it does
- `Actor` may not have any components of type `GetTargetComponentType()`, but we cannot see if it does
- `UMyComp` may not be compatible with `GetTargetComponentType()`, such that the `Cast` fails, but we cannot tell

There is really no way to know with this code without wasting a lot of time debugging, and ultimately
refactoring the code to something like this:

### Good: Easy to Debug

```c++
// Good: EASY TO DEBUG
UMyComp* FindMyComp(const AActor* Actor)
{
    UMyComp* MyComp {nullptr};
    if (IsValid(Actor))
    {
        UClass* BaseType = GetTargetComponentType();
        UActorComponent* Comp = Actor->GetComponentByType(BaseType);
        MyComp = Cast<UMyComp>(Comp);
    }
    return MyComp;
}
```

Now consider the alternative.  The above Good code is functionally exactly the same as the 
Bad code.  Though it is more lines of code, it is no less efficient than the Bad code above.

However, it is now **extremely easy** to figure out which part of this is responsible for your bug.
This is developer-friendly code.  It may take a few extra seconds to type it out the first time
but it will save you far more seconds in the future - you won't have to refactor it when you
debug it later, you won't have to explain it to any future junior devs who join your team, and when other
related code is inevitably refactored and reworked, the effect it has on your code will be far more
obvious and apparent, and easier to merge in.

You can breakpoint the final line `return MyComp` and then **inspect all the values**
that went into making that final calculation simply by looking at the IDE debugger.

- `BaseType` is the value returned by `GetTargetComponentType()`, you can check it for `nullptr`
- `Comp` is the result of the Actor's `GetComponentByType` search for the `BaseType`
- `MyComp` is the result of casting `Comp`

Which one of those variables contains the incorrect value?  You have found your bug.
It took virtually no time at all to find, and now you're spending your time fixing
bugs rather than searching for them.

#### TODO RIDER DEBUGGER SCREENSHOT

The above code incurs **no additional runtime cost**.  The compiler will optimize this to run just as fast as
the 1-liner.  So the compiler doesn't care either way and **there is NO BENEFIT** to writing 1-liners.

With a modern IDE such as Rider, tab-completion does most of the typing for you, and so the
additional time you spend typing out the few extra lines of code will be **vastly dwarfed** by the
reduced time you spend debugging this in the future.

This code provides the additional benefit of being easier for junior developers to read
and understand, further **saving you time** in the future because you won't have to explain
it to anybody.


<a id="XistLogFormat"></a>
## Xist Log Format

TLDR USE GOOD LOGGING MACROS

Writing quality logs is VITAL to being a healthy developer.  It helps when you are developing,
when you are testing and debugging, and *especially* when your game is hugely popular and you're running
countless instances on servers all over the world.

Here is an example of what my logs currently look like:

```text
time  Log:     LogXCL: [PIE:Server] UXCLGameplayAbilityBase::ActivateAbility:34       [B_XAI_Bot_Humanoid_C_0]->[GA_XAI_Pickup_C_0]   Ability Activated -- [XAI.Interact.Ability.Pickup] Triggered by [XCLPlayerState_0] on [B_XAI_Rock_C_2] +1 TargetData
time  Verbose: LogXCL: [PIE:Server] UXCLGameplayAbilityBase::CommitAbility:136        [B_XAI_Bot_Humanoid_C_0]->[GA_XAI_Pickup_C_0]   Committing ability
time  Log:     LogXCL: [PIE:Server] UXCLBotInteractAbility::ActivateLocalAbility:58   [B_XAI_Bot_Humanoid_C_0]->[GA_XAI_Pickup_C_0]   ---- Bot Interact Ability ---- XAI.Interact.Ability.Pickup ----
time  Verbose: LogXCL: [PIE:Server] UXCLBotInteractAbility::ProcessBotInteractData:91 [B_XAI_Bot_Humanoid_C_0]->[GA_XAI_Pickup_C_0]   [XAI.Interact.Ability.Pickup] [1/1] Target Actor = B_XAI_Rock_C_2 @ Impact Point X=-24.943 Y=-126.217 Z=30.490
time  Log:     LogXCL: [PIE:Server] UXCLInteractTask::Activate:29                     [GA_XAI_Pickup_C_0]->[XCLInteractTask_Pickup_0] Interact Task Activated
time  Log:     LogXCL: [PIE:Server] UXCLInteractTask::Activate:29                     [GA_XAI_Pickup_C_0]->[XCLInteractTask_MoveTo_0] Interact Task Activated
time  Log:     LogXCL: [PIE:Server] UXCLInteractTask_MoveTo::Activate:75              [GA_XAI_Pickup_C_0]->[XCLInteractTask_MoveTo_0] MoveTo Goal Location [X=0.057 Y=-140.300 Z=25.500] Status=2
```

You can immediately tell exactly which module, function and line number created every log message.

**When looking at the UE log in Rider, you can even click for example on
`UXCLGameplayAbilityBase` in the log to open
the `XCLGameplayAbilityBase.h` header file.
It is literally point and click.**

Here is an explanation of the columns in the log:

| Column | Example                                           | Description                                   |
|--------|---------------------------------------------------|-----------------------------------------------|
| 1      | `2022-10-11 14:23:57.235`                         | Timestamp                                     |
| 2      | `Log`                                             | Message Verbosity                             |
| 3      | `LogXCL`                                          | UE Log Object                                 |
| 4      | `[PIE:Server]`                                    | Execution Context (Client? Server? ... )      |
| 5      | `UXCLGameplayAbilityBase`::`ActivateAbility`:`34` | `Module`::`Function`:`Line` C++ Source Marker |
| 6      | [`B_XAI_Bot_Humanoid_C_0`]->[`GA_XAI_Pickup_C_0`] | [`Owner Object Name`]->[`Log Object Name`]    |
| 7+     | ...                                               | Log Message                                   |

To achieve this, I have created macros for each of the different categories of object in Unreal Engine,
like `Actor`, `Object`, `GameplayAbility`, `AbilityTask`, etc.

Inside any `GameplayAbility` for example, I just log like this;

```c++
XIST_GALOG(TEXT("Committing ability"));
```

The resulting log message from the above code looks like:

```
time Log: LogXCL: [Context] Class::Function:Line [OwnerName]->[ThisName] Committing ability
```

Example raw log:

```
2022-10-11 14:23:57.235 Log: LogXCL: [PIE:Server] UXCLGameplayAbilityBase::CommitAbility:136 [B_XAI_Bot_Humanoid_C_0]->[GA_XAI_Pickup_C_0] Committing ability
```

### An example C++ Macro

Under the hood this just uses the `UE_LOG` macro that you probably already know and love.

For example, you could use something like this for any `UObject` or `UObject`-derived class:

```c++
/**
 * XIST_ULOG
 *
 *   You can use this macro in any code where `this` evaluates to a valid UObject.
 *   The log will print with the __FUNCTION__ and __LINE__ where you write the macro,
 *   and will report `this` identity as [OwnerName]->[ThisName] in the log message.
 *   The message that you pass in (fmt, ...) is appended to the rest of the log info.
 *
 *   This gets sent to the `LogXist` log with verbosity level `Log`.
 *   You should make related macros like `XIST_ULOG_WARNING`, `XIST_ULOG_ERROR`,
 *   etc as needed.
 */
#define XIST_ULOG(fmt, ...) \
    UE_LOG(LogXist, Log, \
        TEXT("[%s] %s:%i [%s]->[%s] %s"), \
        *XistGetClientServerContextString(this), \
        *FString(__FUNCTION__), __LINE__, \
        *GetNameSafe(GetOwner()), *GetNameSafe(this), \
        *FString::Printf(fmt, ##__VA_ARGS__) \
    )
```

Gameplay Abilities and Ability Tasks are special, so they require their own macros,
and you may find along the way other related macros that can be helpful.

The really nice thing about making these macros early in your project is that you
can very easily change the format of every single log in your game just by changing
one macro.  If you discover you want more or less info in your logs, you can edit
the macro.

You can also define levels of logging that do not get shipped.  For example if you
want to optimize a game you need to reduce the amount of logging, and so perhaps
you totally compile out all
`XIST_LOG_VERBOSE` and `XIST_LOG_VERY_VERBOSE`
macros and just have them not exist
at all in the shipped game.  It is very easy to do that with a setup like this.
