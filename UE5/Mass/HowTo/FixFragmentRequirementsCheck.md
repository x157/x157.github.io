---
title: "How To Fix: Modifying requirements before initialization is not supported | UE5 Mass"
description: "How to fix the UE Mass fatal error 'Modifying requirements before initialization is not supported'"
breadcrumb_path: "UE5/Mass/HowTo"
breadcrumb_name: "Fix Fragment Requirements Check"
---

# How To Fix: Modifying requirements before initialization is not supported

This is an easy fix as long as you understand what the error is telling you.

TLDR make sure you always initialize your queries in your processor constructor.

I sometimes see this error when I add a new query to an existing processor
and I forget to update the constructor.  Your mileage may vary.


## Solution: Initialize your Query Constructor in your Processor Constructor

```cpp
USampleProcessor::USampleProcessor()
    : Query(*this)  // <-- Add this line
{
    ExecutionFlags = static_cast<int32>(EProcessorExecutionFlags::All);
}
```

### Determine which processor is the problem

In the crash callstack, check which processor's `ConfigureQueries` method
is being executed. This is the problematic processor whose constructor
needs to initialize the query, in the below example it is `USampleProcessor`.

```text
FMassFragmentRequirements::AddRequirement<…>(EMassFragmentAccess, EMassFragmentPresence) MassRequirements.h:235
USampleProcessor::ConfigureQueries(const TSharedRef<…> &) USampleProcessor.cpp:242
UMassProcessor::CallInitialize(TNotNull<…>, const TSharedRef<…> &) MassProcessor.cpp:170
# snip lots of other callstack below here
```



## Problem: Crash with this error

If you crash to this line in `MassRequirements.h` you're experiencing this error.

```cpp
template<typename T>
FMassFragmentRequirements& AddRequirement(const EMassFragmentAccess AccessMode, const EMassFragmentPresence Presence = EMassFragmentPresence::All)
{
    checkf(bInitialized, TEXT("Modifying requirements before initialization is not supported."));

    // [xist] The above line is where it crashes. Removed code below it for brevity.
}
```
