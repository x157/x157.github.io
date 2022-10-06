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
