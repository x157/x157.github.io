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


## Procedure: How to Update Lyra Core

- Update your Engine
- Update `LyraStarterGame`
- Merge new Lyra into Existing Project

I fully documented the exact commands I'm running in my
[Perforce Sync Procedure](/UE5/Engine/Perforce-Sync-Procedure),
if you are interested.


<a id='RepositorySetup'></a>
# Repository Setup

To make this easy on yourself, I recommend having at least 3 branches in your
project repository:

- `lyra-51-epic` = **BLANK** `LyraStarterGame` project with **NO CHANGES**.
- `lyra-51-xist` = Sits on top of `lyra-51-epic`, contains minimal, **required** changes like `LYRAGAME_API` exports.
- `xist-game` = Sits on top of `lyra-51-xist`, contains `Lyra.uproject` changes and all of my game Plugins & GFPs.

You can of course name these however you like.  This is my convention as of UE 5.1.


## What goes into `lyra-51-epic`

This branch always represents the latest version of a BLANK `LyraStarterGame` project, with
**NO CHANGES AT ALL**.

Nothing goes into this branch, ever, except official Epic `LyraStarterGame` releases.

To initialize this branch, simply use Epic Games Launcher to create a new `LyraStarterGame`
project.  When it finishes, add the directory to your repository as the initial import
of the `lyra-51-epic` branch.

The only time you ever want to update this branch is when Epic releases a new version of
Lyra Core (e.g. with a new Engine version).

To update this branch, you run
[a procedure like this](/UE5/Engine/Perforce-Sync-Procedure),
which essentially involves deleting everything in your project directory (*except for Git!*) and
then creating a new empty `LyraStarterGame` project on top of your project directory.  This way
all files that should be removed are removed in addition to adding/updating any existing files.


## What goes into `lyra-51-xist`

This branch contains the base Lyra from Epic `lyra-51-epic` and adds all of the things that
you are **required** to do in order to use Lyra.

Examples:

- `LYRAGAME_API` exporting Lyra C++ classes
- `virtual` specifier on some Lyra C++ methods
- Any Lyra Core C++ hacks you care to maintain

In general, I recommend that you try to change Lyra Core *as little* as possible.
Each time you update `lyra-51-epic` you are going to need to merge it into the changes
that you make here.

Less changes here is easier to maintain.  Too many changes here can turn into a nightmare.


## What goes into `xist-game`

This is your game. 99.9999% of the time, this is the base branch you are working on.

All active game development should be based on the `xist-game` branch, which contains the latest
version of Lyra Core at any given time.

The dev, feature and virtually all other branches should be based on this.

This is the version of Lyra that you're currently using, with all of your hacks and
configuration changes applied, and your game plugins and GFPs.

