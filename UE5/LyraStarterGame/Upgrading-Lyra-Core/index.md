---
title: "Upgrading the Lyra Core in your Existing Lyra Game"
description: "Xist's procedure for upgrading Lyra Core C++ and Content in an existing Lyra Game Project"
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: "Upgrading Lyra Core"
---

# Upgrading Lyra Core

Epic is planning to update Lyra from time to time.
Sometimes to show off new Unreal Engine features,
sometimes because the Engine itself is updated and
changes are needed to this code to keep it functional,
etc.

- [Procedure: How to Update Lyra Core](#Procedure)
- [Repository Setup](#RepositorySetup)
  - [What goes into `lyra-main`](#AboutLyra51Epic)
  - [What goes into `lyra-xist`](#AboutLyra51Xist)
  - [What goes into `xist-game`](#AboutXistGame)
- [Making Changes to Lyra C++](#MakingChangesToLyraCPP)
  - [Commit Lyra C++ Changes to `lyra-xist`](#CommitLyraCPPtoLyra51Xist)


<a id='Procedure'></a>
## Procedure: How to Update Lyra Core

- Update your Engine
- Update `LyraStarterGame`
- Update `lyra-main` to mirror your Engine version's Lyra source
  - Merge `lyra-main` into `lyra-xist`
    - Merge `lyra-xist` into `xist-game`

I fully documented the exact commands I'm running in my
[Procedure: Merge Epic Source into Git](/UE5/LyraStarterGame/Tutorials/Procedure-Merge-Epic-Source-into-Git)
(and the related [Perforce](/UE5/LyraStarterGame/Tutorials/Procedure-Merge-Epic-Source-into-Perforce) version),
if you are interested.


<a id='RepositorySetup'></a>
# Repository Setup

To make this easy on yourself, I recommend having at least 3 branches in your
project repository:

- `lyra-main` = **BLANK** `LyraStarterGame` project with **NO CHANGES**.
- `lyra-xist` = Based on `lyra-main`, contains minimal, **required** changes like `LYRAGAME_API` exports.
- `xist-game` = Based on `lyra-xist`, contains `Lyra.uproject` changes and all of my game Plugins & GFPs.

You can of course name these however you like.  This is my convention as of UE 5.1.

For more details how exactly to set up these branches, see the [Git SCM](/Git/) overview.


<a id='AboutLyra51Epic'></a>
## What goes into `lyra-main`

This branch always represents the latest version of a BLANK `LyraStarterGame` project, with
**NO CHANGES AT ALL**.

Nothing goes into this branch, ever, except official Epic `LyraStarterGame` releases.

The only time you ever want to update this branch is when Epic releases a new version of
Lyra Core (e.g. with a new Engine version).

To update this branch, you run
[Procedure: Merge Epic Source into Git](/UE5/LyraStarterGame/Tutorials/Procedure-Merge-Epic-Source-into-Git)
(or the related [Perforce](/UE5/LyraStarterGame/Tutorials/Procedure-Merge-Epic-Source-into-Perforce) version
if you use Perforce),
which essentially involves deleting everything in your project directory (*except for Git!*) and
then creating a new empty `LyraStarterGame` project on top of your project directory.  This way
all files that should be removed are removed in addition to adding/updating any existing files.


<a id='AboutLyra51Xist'></a>
## What goes into `lyra-xist`

This is your Custom Lyra that you use for your games.

This branch contains the base Lyra from Epic `lyra-main` and adds all of the things that
you are **required** to do in order to use Lyra.

Examples:

- `LYRAGAME_API` exporting Lyra C++ classes
- `virtual` specifier on some Lyra C++ methods
- Any Lyra Core C++ hacks you care to maintain

In general, I recommend that you try to change Lyra Core *as little* as possible.
Each time you update `lyra-main` you are going to need to merge it into the changes
that you make here.

Less changes here is easier to maintain.  Too many changes here can turn into a nightmare.

[Lyra Development Considerations](/UE5/LyraStarterGame/Development-Considerations)
helps illustrate why I recommend in general not hacking Lyra more than is
absolutely necessary.


<a id='AboutXistGame'></a>
## What goes into `xist-game`

This is your game. 99.9999% of the time, this is the base branch you are working on.

All active game development should be based on the `xist-game` branch, which contains the latest
version of Lyra Core at any given time.

The dev, feature and virtually all other branches should be based on this.

This is the version of Lyra that you're currently using, with all of your hacks and
configuration changes applied, and your game plugins and GFPs.


<a id='MakingChangesToLyraCPP'></a>
# Making Changes to Lyra C++

Sometimes it is **absolutely necessary** to make changes to Lyra C++ code.

When you do need to change Lyra itself, that is what the `lyra-xist` branch is for.


<a id='CommitLyraCPPtoLyra51Xist'></a>
## Commit Lyra C++ Changes to `lyra-xist`

Ordinarily you will be working in your `xist-game` dev branch, or some branch based on that.

When you find that you need to change **Lyra C++ itself**, such as a `LYRAGAME_API`,
go ahead and make the change, but **DO NOT COMMIT** the change to your dev branch.

When you are happy with your *(hopefully very minimal)* edits,
**commit them to the `lyra-xist` branch**.

Then, merge `lyra-xist`
into your feature branch `xist-game`
so that your feature branch also gets the updated Lyra code.

Finally, go back to the `xist-game` branch and continue developing.

Conversely you could commit to your game branch and cherry pick it to your `lyra-xist`
branch, but in the long term that can increase merge overhead; it's less work overall
if you just make these commits directly to `lyra-xist`.
If you decide to go the cherry pick route, **make sure** your commits are very small,
exactly targeted to `LYRAGAME_API` changes **and no other changes** so it will be
easy to cherry pick later into `lyra-xist`.
