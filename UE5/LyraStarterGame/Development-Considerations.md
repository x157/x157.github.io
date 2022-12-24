---
title: "Extending LyraStarterGame: Development Considerations"
description: "Considerations for developing a game based on Lyra, including BP & UAsset duplication and native C++ extension and duplication"
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: "Development Considerations"
---


# Extending Lyra: Development Considerations

For my purposes, my goal is to **NEVER MODIFY** base Lyra code or
assets unless it's strictly required (which is rare).

The more closely I achieve this goal, the easier it will be to merge Epic's
future Lyra releases into my code.  If they make bug fixes to code I'm
using, I want those.  If they add new features, I'd like to be able to
implement them as easily as possible.

- [Extend Lyra C++ Code](#ExtendCPP)
  - [Fill in Some Gaps in Lyra C++ Code](#FillInCPPGaps)
  - [Duplicate Lyra Prototype C++ Code](#DuplicatePrototypeCpp)
- [Duplicate Lyra Binary Assets](#DuplicateAssets)
- [Xist Project Structure: XCL Plugin + XaiLife GFP](#Structure)


<a id='ExtendCPP'></a>
## Extend Lyra C++ Code

My strategy in general is to derive from Lyra C++ code whenever possible,
customizing the behavior of Lyra classes and extending it
in typical C++ fashion.

This requires forcefully exporting many Lyra classes with `LYRAGAME_API` tags
in the Lyra C++ source, but I expect Epic will eventually do that themselves,
and if not, it's very easy to merge in any case.

### Prefer Extension to Duplication

Whenever possible, you should **extend** Lyra code rather than duplicate it.
Only duplicate when it's not practical to extend Lyra
(for example, prototype code).

When you need to do so much work to the code
that it becomes a challenge to merge, that's when you duplicate.

If you're only making minor changes to Lyra, just modify Lyra itself and commit to
merging future Lyra updates into your code when Lyra is updated
(for example `LYRAGAME_API` exports).

<a id='FillInCPPGaps'></a>
### Fill in Some Gaps in Lyra C++ Code

There are some gaps in Lyra's C++ code coverage for game modes different from `ShooterCore`.

You may need to fill in some of these yourself.  Some examples:

#### Generic Modular AI Controller

Lyra does not ship a generic Modular AI Controller.
I copied the
**Lyra Player Bot Controller** `ALyraPlayerBotController`
to my own
**XCL AI Controller** `AXCLAIController`
and removed the player-specific code to make a nice generic base
Modular AI Controller for all of my future Lyra projects.

Hopefully Epic will add a generic AI Controller in the future,
at which time I can either rebase my XCL AI Controller onto the new
Lyra AI Controller, or not, depending on what they do with it.

#### Generic Actor with Ability System

Lyra also does not include a generic Actor with an Ability System.
I created a generic base
[XCL Actor with Abilities](https://github.com/x157/Lyra-ActorWithAbilities)
class as part of my
[Lyra Health and Damage](https://x157.github.io/UE5/LyraStarterGame/Health-and-Damage/)
tutorial based on the Lyra Character with Abilities.

<a id='DuplicatePrototypeCpp'></a>
### Duplicate Lyra Prototype C++ Code

In some cases (Interaction, Inventory, Equipment, Weapons) the Lyra code
is a great jump-off point to build your own systems.  Even if it is not a good
set of base classes in these cases, it **is** a good, functional multiplayer prototype
that you can build out yourself.

For example, I documented the
[Process of Duplicating some Lyra Prototype Code](http://localhost:4000/UE5/LyraStarterGame/Inventory/#DuplicateToExtend)
in some detail.

Again, it's important to stress that in general extending code is preferable
to duplicating it.


<a id='DuplicateAssets'></a>
## Duplicate Lyra Binary Assets

###### Problem: It is not possible to merge multiple branches of a binary file

Because of this,
**you should not modify Lyra assets**
if you want future Lyra updates from Epic
that don't completely break your game.

###### Solution: Duplicate the Lyra asset into your own GFP and modify your duplicated asset

When you find yourself needing to save a Lyra uasset
(Blueprint, Data Asset, Widget, anything),
**DO NOT** modify the Lyra asset.
Instead, duplicate it into your own GFP and modify your duplicate.

This way Epic can update the Lyra binary assets as much as they want,
and it will not affect your game.  The only Lyra assets you will be using
are the ones you haven't changed at all.

You will be able to choose **if and when**
to copy Epic's future Lyra changes (if and when they make them).
`:-)`

###### Alternative: Hack Lyra Directly

This is by far the easiest option to get started with Lyra.
Just hack the files how you want and save them immediately.

In the long run, by choosing this option you are choosing to
**not be able to get** future Lyra updates from Epic.

If you're just messing around with Lyra to learn, then by all means,
hack Lyra all you want.
If you intend to build an actual game product on Lyra then
I personally don't recommend hacking it, but you're not me,
so you do you.


#### Digression: Binary Assets SUCK

I'm honestly not sure why Epic decided to use binary files for things such
as blueprints and data assets.  There does not seem to be any benefit to a
binary format, and there are many pains in the asses of developers all around
the world.

I digress.  Binary assets suck.  Don't try to reuse or extend them, just
duplicate them and use your own.


<a id='Structure'></a>
## XCL Plugin + XaiLife GFP

I am developing a Lyra game via 2 plugins:

- `XCL` Plugin (Xist Core Lyra)
  - Foundational C++ code (derived from Lyra)
- `XaiLife` GameFeature Plugin (GFP)
  - Configs
  - Content

When you see references to `XCL` anywhere in my documentation, I'm referring
to this plugin and the Lyra-derived code within it.

In the long term my intent is that any/all Lyra projects I develop will
also include my Xist Core Lyra plugin (`XCL`) to fix and extend Lyra to be as reusable
as I require.

When I first started this project, `XCL` was originally a GFP.  However, I modified
it such that `XCL` is now considered foundational C++ code that will always exist
in my Lyra, and so it doesn't need to be a GFP.

The `XaiLife` Plugin is a GFP and contains all of my project's content so far.
