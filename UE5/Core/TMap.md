---
title: "Things to know about TMap | UE5 Core"
description: "Interesting things about TMap"
breadcrumb_path: "UE5/Core"
breadcrumb_name: "TMap"
---

# Things to know about TMap

## TMap supports multiple values per hash key

You may be concerned about collisions due to using 32-bit hash values
for your `TMap` keys. Don't be.

Consider: `TMap<KeyType, ValueType>`

UE5's underlying `TMap` implementation considers not only the underlying
32-bit hash key, but also the result of the `KeyType`'s `operator==`.

This means if you have multiple `ValueType` values that hash to the same
32-bit value, you won't see value collisions as long as the `KeyType`
contains an `operator==` that takes the full value into consideration.

While it's not ideal to have many values use the same hash key, it is also
not catastrophic for infrequent key collisions to occur.

### Sample code

Prove it to yourself using this code:

```cpp
struct FMyKey
{
    uint32 ID;
    
    bool operator==(const FMyKey& Other) const
    {
        return ID == Other.ID;
    }
};

FORCEINLINE uint32 GetTypeHash(const FMyKey& Key)
{
    // Every entry in the map will use the same 32-bit hash value (zero)
    return 0;
}

TMap<FMyKey, int32> Map;

Map.Add(FMyKey(1), 1);  // set FMyKey 1 = value 1
Map.Add(FMyKey(2), 2);  // set FMyKey 2 = value 2
Map.Add(FMyKey(2), 3);  // set FMyKey 2 = value 3  <-- overwrite

for (const auto& Pair : Map)
{
    UE_LOG(LogTemp, Log, TEXT("%d, %d"), Pair.Key.ID, Pair.Value);
}
```

#### Result

```text
1, 1
2, 3
```

As you can see, there are 2 entries in the map, even though the result
of the 32-bit hash value is the same for both entries.
Furthermore, the `FMyKey(2)` value was overwritten with value `3`
as you would expect.

What constitutes a unique entry in the `TMap` is actually the combination of
the hash value AND the `operator==` result for the `KeyType`.

## Thank you!

Thanks to `Brian | PDS` on the `Unreal Source` Discord for the sample code
that illustrates how `TMap` actually works when there are hash collisions.
