---
title: "How To Iterate over Entities in Processors | UE5 Mass"
description: "Mass Entity Iteration"
breadcrumb_path: "UE5/Mass/HowTo"
breadcrumb_name: "Processor Entity Iteration"
---

# How To: Iterate over Entities in Mass Processors

## Use `FEntityIterator`

`FMassExecutionContext::FEntityIterator` is available for use in processors.
This is the preferred way to iterate entities because it provides support for
`WITH_MASSENTITY_DEBUG`, which allows for example in-Editor Entity breakpoints.

If you iterate directly over the integer values and omit the use of `FEntityIterator`,
you will forego the ability to breakpoint in Editor.

### Example code

```cpp
void UMyProcessor::Execute(FMassEntityManager& EntityManager, FMassExecutionContext& Context)
{
    UE_VLOG(this, LogMass, VeryVerbose, TEXT("%hs: Iterating Entities"), __FUNCTION__);

    Query.ForEachEntityChunk(Context, [](FMassExecutionContext& Context)
    {
        // in case you need to know the number of entities in this chunk
        const int32 NumEntities = Context.GetNumEntities();

        for (FMassExecutionContext::FEntityIterator EntityIt = Context.CreateEntityIterator(); EntityIt; ++EntityIt)
        {
            const FEntityHandle& Entity = Context.GetEntity(*EntityIt);

            // if you need the int32 Index value for some reason...
            // it's in the range: [0, NumEntities-1]
            const int32 EntityIndex = *EntityIt;

            // Do whatever with Entity ...
        }
    });
}
```

### Alternative: Iterate over indices explicitly

In general, you should try to avoid explicitly iterating over indices unless
you really need to for some reason.

Old versions of Mass code iterated like this and there may be examples still
out there using this style.

Now that `FEntityIterator` is available, continued use of this style should be discouraged.

### Example Old Style Mass Entity iteration code

```cpp
void UMyNonDebuggableProcessor::Execute(FMassEntityManager& EntityManager, FMassExecutionContext& Context)
{
    UE_VLOG(this, LogMass, VeryVerbose, TEXT("%hs: Old Style Iterating Entities"), __FUNCTION__);

    Query.ForEachEntityChunk(Context, [](FMassExecutionContext& Context)
    {
        // the number of entities in this chunk
        const int32 NumEntities = Context.GetNumEntities();

        // NOTICE: Entity Breakpoints ARE NOT SUPPORTED in this loop:
        for (int32 Index = 0; Index < NumEntities; ++Index)
        {
            const FEntityHandle& Entity = Context.GetEntity(Index);

            // Do whatever with Entity ...
        }
    });
}
```
