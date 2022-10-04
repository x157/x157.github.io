---
title: "Development in UE5"
description: "Thoughts regarding general software development in Unreal Engine 5"
breadcrumb_path: "UE5"
breadcrumb_name: "Dev"
---

# Development in UE5

Coming from a traditional Unix systems C++ background and now learning UE5 development,
some things are Windows, some things are GameDev,
some things are just plain new and/or different.

Following are some ideas I hope will help new UE5 C++ devs have an easier time.


## Build Target: `DebugGame Editor`

Build **both the Engine AND the Game** using the `DebugGame Editor` build target.

If your Game is built with `DebugGame Editor`, then IDE Debugging will work
UNTIL your Game code causes an Engine crash *(which **will** sometimes happen)*.

At that point, your debugger is in Engine code, and either:

- Your Engine was compiled using `DebugGame Editor`, in which case:
  - You can still debug to see what you broke
    - Fixing these bugs are usually fairly easy once you know what you did wrong
- [OR] Your Engine was NOT compiled using `DebugGame Editor`, in which case:
  - You will have no idea what the Engine is doing or what you did to crash it
  - The IDE debugger will jump around seemingly at random
    - It will be impossible to follow the code execution
    - It will be impossible to inspect the value of variables
    - You cannot debug code that does not have debugging symbols compiled into it

*NOTE: This is useful (REQUIRED!) for C++ devs, but not for BP devs, artists, etc.
That is why Epic typically doesn't recommend this setting themselves.
Most UE5 users are not C++ devs, but we are, and this is how we debug our C++.*


## IDE: Rider, or VS+ReSharper

Personally I prefer to use
[Rider](https://www.jetbrains.com/rider/)
rather than Visual Studio as an IDE.  Rider has built-in UE5 integration
that really is a **must-have** for any serious UE5 C++ developer.

If you prefer to use Visual Studio, you should seriously consider purchasing the
[ReSharper](https://www.jetbrains.com/lp/resharper-cpp-unreal-engine/)
plugin for Visual Studio to get UE5 integration similar to Rider.

These tools aren't free, but they aren't prohibitively expensive either.
Given that `time == $`, IMO it's worthwhile to
spend some $ now to save yourself a lot of time later.
Personally I tend to lean toward `time >= $`,
assuming one has the luxury of discretionary spending.

Check for student discounts if applicable, I believe they are sometimes (always?) offered.
