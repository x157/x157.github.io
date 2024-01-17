---
is_site_index: true
---


# UE5 + Lyra = GG

[LyraStarterGame](/UE5/LyraStarterGame/)
integrates a number of UE5 systems, some are new in UE5;
some are completely different and incompatible with UE4 methodologies
*(especially CommonUI)*.

### Big Picture Starting Points

- [Common UI](/UE5/CommonUI/) + CommonGame
  - `CommonGame` is distributed in Lyra, it's amazing, someone should document it! `:-)`
- [Enhanced Input Subsystem](/UE5/EnhancedInput/)
- [Gameplay Ability System](/UE5/GameplayAbilitySystem/)
- [GameFeature Plugins](/UE5/GameFeatures/)
- [`ModularGameplay` Plugin](/UE5/ModularGameplay/)
- [UE5 Overview](/UE5/)

### Source Control Management

- [Git SCM](/Git/) for a Lyra UProject *(for small teams where everyone compiles their own stuff)*
- [Perforce SCM](/Perforce/) for a Lyra UProject *(for non-small teams, or teams with non-developer members)*
  - Typically used with [UnrealGameSync](https://docs.unrealengine.com/4.26/en-US/ProductionPipelines/DeployingTheEngine/UnrealGameSync/)

### Unreal Developer Topics

- [Overview of Development in UE5](/UE5/Dev/)
- [Software Development as a Windows user](/Windows/)
- [UnrealXistTools](/UnrealXistTools/) -- tools to help UE5 devs
- [github.com/XistGG](https://github.com/XistGG) -- sample projects and other MIT licensed public code and examples


# About Me

For the two years or so I've been working my way through UE5's Lyra Starter Game,
learning both Unreal Engine and Lyra simultaneously.

In an attempt to save fellow simulants some discovery time,
I'm hosting some notes here that I hope will be useful.

I'm an expert C++ developer who has mentored developers and team leaders,
but I had ZERO experience with game dev or UE5 going into this.


## Tutorials & Videos

I'm mainly interested in written documentation because IMO it's far easier to find
what you're looking for, rather than watching a 30 minute video for that 10 seconds
that you actually need.

Even still, I find that videos are good supplements to written documentation,
so I try to create *(hopefully useful, hopefully short)* videos
on my [YouTube Channel: XistGG](https://youtube.com/c/XistGG).
I'm afraid they aren't very entertaining, but then again they are intended as
supplementary material to this written documentation, so it is what it is.

If you have ideas for tutorials you'd like me to research and document, feel free to
create a [New Issue](https://github.com/x157/x157.github.io/labels/tutorial%20request)
and tag it as a `tutorial request`.  I don't promise to cover it, but
I'll definitely consider doing so if
it's a common question and is relevant to my dev efforts.
