---
title: "Debugging Tips | UE5 Development"
description: "Tips for debugging UE5 C++"
breadcrumb_path: "UE5/Dev"
breadcrumb_name: "Debugging Tips"
---

# C++ Debugging Tips

- [Build Target: `DebugGame Editor`](#BuildTarget_DebugGame_Editor)
- [C++ Coding Style for Easy Debugging](#CppCodingStyleDebugging)


<a id="BuildTarget_DebugGame_Editor"></a>
## Build Target: `DebugGame Editor`

Build **both the Engine AND the Game** using the `DebugGame Editor` build target.

If your Game is built with `DebugGame Editor`, then IDE Debugging will work well
**until** your Game code causes an Engine crash *(which **will** sometimes happen)*.

At that point, your debugger is in Engine code, and either:

- Your Engine **was** compiled using `DebugGame Editor`, in which case:
  - You can easily debug to see what you broke
    - Fixing this kind of bug is usually fairly easy when you can see what you did wrong
- [OR] Your Engine **was NOT** compiled using `DebugGame Editor`, in which case:
  - You will have no idea what the Engine is doing or what you did to crash it
  - The IDE debugger will jump around seemingly at random
    - It will be impossible to follow the code execution
    - It will be impossible to inspect the value of variables

**You cannot easily debug executables without debugging symbols.**

`DebugGame Editor` is what adds the Debug symbols to make debugging much easier.

*NOTE: This is useful (REQUIRED!) for C++ devs, but not for BP devs, artists, etc.
That is why Epic typically doesn't recommend this setting themselves.
Most UE5 users are not C++ devs, but we are, and this is how we debug our C++.*


<a id="CppCodingStyleDebugging"></a>
## C++ Coding Style for Easy Debugging

**TLDR: Resist the urge to write a 1-liner and profit by reduced time spent debugging and explaining code later.**

### Bad: Difficult to Debug
```c++
// Bad: DIFFICULT TO DEBUG
```

In the example Bad code above, yes it's true this is a nice short 1-liner that inexperienced developers
might think looks pretty.

If you look closely, there are several things that might fail in that 1 line of code, and it's
really annoying to try to debug what it is.

- a
- b
- c

There is really no way to know with this code without wasting a lot of time debugging.

### Good: Easy to Debug

```c++
// Good: EASY TO DEBUG
```

Now consider the alternative.  The above Good code is functionally exactly the same as the 
Bad code.  However, it is now **extremely easy** to figure out which part
of this is responsible for your bug.

You can breakpoint the final line `TODO HERE` and then **inspect all the values**
that went into making that final calculation simply by looking at the IDE debugger.

- a
- b
- c

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

Writing quality logs is VITAL to being a truly great developer.  It helps when you are developing,
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

When looking at the UE log in Rider, you can even click for example on
`UXCLGameplayAbilityBase`::`ActrivateAbility`:`34` to open
the `XCLGameplayAbilityBase.h` header file at the `ActivateAbility` declaration.
It is literally point and click.

If you want to dig even deeper, you can then click on the declaration to go into the
function definition itself, and then just look at line `34` which wrote the log message.

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

To achieve this, I created some C++ log macros:

```c++
#include "Logging/LogMacros.h"

#define XCL_LOG(fmt, ...)          XCL_MODULE_LEVEL_FORMAT_LOG(LogXCL, Log,     fmt, ##__VA_ARGS__)
#define XCL_LOG_VERBOSE(fmt, ...)  XCL_MODULE_LEVEL_FORMAT_LOG(LogXCL, Verbose, fmt, ##__VA_ARGS__)
#define XCL_LOG_WARNING(fmt, ...)  XCL_MODULE_LEVEL_FORMAT_LOG(LogXCL, Warning, fmt, ##__VA_ARGS__)
#define XCL_LOG_ERROR(fmt, ...)    XCL_MODULE_LEVEL_FORMAT_LOG(LogXCL, Error,   fmt, ##__VA_ARGS__)

// ... etc ...
```

Under the hood this just uses the `UE_LOG` macro that you probably already know and love.

I have different macros for each of the different categories of object in Unreal Engine,
like `Actor`, `Object`, `GameplayAbility`, `AbilityTask`, etc.

Inside any `GameplayAbility` for example, I just log like this;

```c++
XCL_GALOG(TEXT("Committing ability"));  // GALOG = GameplayAbility Log
```

This will create a log message like the `Committing ability` log message that you see in the
example above.
