---
title: "Things to know about FName | UE5 Core"
description: "Interesting things about FName"
breadcrumb_path: "UE5/Core"
breadcrumb_name: "FName"
---

# Things to know about FName

## FName includes an optional instance number

Most `FName` in UE don't contain numbers, but an optional number IS
supported as a part of the `FName`.

Significantly, notice that the internal Number is always `1` greater
than the number represented in the string.
This allows for `FName("Foo")` to be distinctly different
to `FName("Foo_0")`.

The `operator==` considers both the `PlainString` part of the
`FName` **and** the `Number` part of the name, such that
`FName("Foo_1") != FName("Foo_2")`

If you want to compare **only** the `PlainString` part of the name,
such that `Foo_1` will be considered equivalent to `Foo_2`,
the most efficient way to do so is to use `GetComparisonIndex()`, like:

```cpp
if (FName("Foo_1").ComparisonIndex() == FName("Foo_2").ComparisonIndex())
{
    // This is true.
    // "Foo" == "Foo"; the "_1" and "_2" are ignored by ComparisonIndex()
}
```

### Sample code

Run this code to help understand how `FName` handles the optional Number data:

```cpp
FName Foo  ("Foo");     // same as FName("Foo", 0)
FName Foo1 ("Foo", 1);  // same as FName("Foo_0")
FName Foo2 ("Foo_1");   // same as FName("Foo", 2)

UE_LOG(LogTemp, Log, TEXT("Foo  PlainString=\"%s\", Number=%d, ToString=\"%s\""), *Foo.GetPlainNameString(), Foo.GetNumber(), *Foo.ToString());
UE_LOG(LogTemp, Log, TEXT("Foo1 PlainString=\"%s\", Number=%d, ToString=\"%s\""), *Foo1.GetPlainNameString(), Foo1.GetNumber(), *Foo1.ToString());
UE_LOG(LogTemp, Log, TEXT("Foo2 PlainString=\"%s\", Number=%d, ToString=\"%s\""), *Foo2.GetPlainNameString(), Foo2.GetNumber(), *Foo2.ToString());

// All these comparison methods include both the PlainString AND the Number
UE_LOG(LogTemp, Log, TEXT("Foo == Foo1 ? %s"), Foo == Foo1 ? TEXT("true") : TEXT("false"));

// Optimal way to compare JUST the PlainString part, ignoring the Number part
UE_LOG(LogTemp, Log, TEXT("Foo.GetComparisonIndex() == Foo1.GetComparisonIndex() ? %s"), Foo.GetComparisonIndex() == Foo1.GetComparisonIndex() ? TEXT("true") : TEXT("false"));
```

### Result

```text
LogTemp: Foo  PlainString="Foo", Number=0, ToString="Foo"
LogTemp: Foo1 PlainString="Foo", Number=1, ToString="Foo_0"
LogTemp: Foo2 PlainString="Foo", Number=2, ToString="Foo_1"

LogTemp: Foo == Foo1 ? false

LogTemp: Foo.GetComparisonIndex() == Foo1.GetComparisonIndex() ? true
```


## Thanks!

Thanks to `Dirtsleeper` on the `Unreal Source` Discord for bringing this
non-obvious behavior to my attention.
