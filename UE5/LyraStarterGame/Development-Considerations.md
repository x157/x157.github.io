---
title: Extending LyraStarterGame: Development Considerations
description: Considerations for developing a game based on LyraStarterGame
back_links:
  - link: /UE5/
    name: UE5
  - link: /UE5/LyraStarterGame/
    name: LyraStarterGame
back_link_title: Development Considerations
---


# Extending Lyra: Development Considerations

For my purposes, my goal is to **NEVER MODIFY** base Lyra code or
assets unless it's strictly required (which is rare).

The more closely I achieve this goal, the easier it will be to merge Epic's
future Lyra releases into my code.  If they make bug fixes to code I'm
using, I want those.  If they add new features, I'd like to be able to
implement them as easily as possible.

The problem here is that **it is impossible to merge binary files**,
and so if I make any changes at all to binary assets then if Epic ever
updates them it will be a nightmarish set of days/weeks for me to manually
inspect the state of every binary file before and after the change and try
to incorporate changes I want while ignoring changes I don't.

The mere thought of having to do that once for a small code base is
enough to make me need to puke.  Having to do it multiple times for a
large code base?  I'd rather change professions.  Honestly I'd probably
rather delete my entire project and pretend it never existed.
It's just not something I'm ever going to do.  Ever.


## Extend Lyra C++ Code

My strategy in general is to derive from Lyra C++ code whenever possible,
customizing the behavior of Lyra classes and extending it
in typical C++ fashion.

This requires forcefully exporting many Lyra classes with `LYRAGAME_API` tags
in the Lyra C++ source, but I expect Epic will eventually do that themselves,
and if not, it's very easy to merge in any case.

In some (thankfully rare) cases, Epic made questionable decisions in some
aspects of Lyra's implementation, and in those cases I simply copy/paste
their code into my own code base and modify it as necessary. (The lack of
a generic AIController is an example).

Code duplication sucks, but it's better than trying to merge out their
updates (if/when they make them) to code I didn't want in the first place.


## Duplicate Lyra Binary Assets

In cases where the code cannot be practically sub-classed, I copy the assets and
modify my copy rather than the Lyra-shipped assets themselves. This
includes Blueprints and other binary assets that only a fool would try to
reuse, having no control and virtually no insight into its future state.

#### Digression: Binary Assets SUCK

I'm honestly not sure why Epic decided to use binary files for things such
as blueprints and data assets.  There does not seem to be any benefit to a
binary format, and there are many pains in the asses of developers all around
the world.

Indeed, in their own source control diffs, they present the assets in text
so you can see whether anything has actually changed!  For fuck's sake, just
keep it in text anyway Epic!!  What the actual fuck?

I digress.  Binary assets suck.  Don't try to reuse or extend them, just
duplicate them and use your own.


## XCL GameFeature Plugin

I am developing a GameFeature plugin called `XistCoreLyra` (`XCL`) and that
is where I put all of my Lyra overrides and customizations.

When you see references to `XCL` anywhere in my documentation, I'm referring
to this plugin and the Lyra-derived code within it.

In the long term my intent is that any/all Lyra projects I develop will
also include my `XCL` plugin to fix and extend Lyra to be as reusable
as I require.
