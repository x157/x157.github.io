---
title: "Perforce"
description: "How to set up a Perforce (P4) server for an Epic Games Unreal Engine project, including example Stream setup and working PowerShell examples for a UE5 custom engine and a UE5 Lyra game."
breadcrumb_name: Perforce
---

# Perforce SCM

To best support non-technical members of the Xist.GG team,
I require the binary locking/sharing capabilities of Perforce.


## How To: Set up a UE5 Perforce Server

Before you create any depots on your P4 server, set up the `typemap` and `.p4ignore`.

1. [Set up Perforce Typemap](./Typemap)
2. [Create `.p4ignore`](./p4ignore)

Once you have these, create any depots you need.
For example you could create depots like:

- [Lyra Project Source Depot](#LyraProjectSourceDepot)
- [Custom UE5 Engine Source Depot](#CustomUE5EngineSourceDepot)


<a id='LyraProjectSourceDepot'></a>
## How To: Set up a Lyra Project Source Depot

1. [Create `//Lyra` Depot](./How-to-Create-Lyra-Depot)
2. [Create `//Lyra/Main` Stream](./How-to-Create-Lyra-Main-Stream) (import from Epic `#NoChanges`)
3. [Create `//Lyra/Xist` Stream](./How-to-Create-Lyra-Xist-Stream) (apply `LYRAGAME_API` updates, `virtual` overrides, etc)


## How To: Create a new `//Lyra/Xist`-based Game Project

1. [Create a new `//Lyra/XistGame` Stream](./How-to-Create-Lyra-Xist-Game-Stream) based on `//Lyra/Xist`
   - Repeat as needed with each new stream/project name


<a id='CustomUE5EngineSourceDepot'></a>
## How To: Set up a Custom UE5 Engine Source Depot

1. Create Depot `//UE5`
2. Create Mainline Stream `//UE5/Release-5.1`
  - Import Epic Custom Engine Source from either GitHub or UDN P4
3. Create Task Stream `//UE5/Xist` with parent `//UE5/Release-5.1`
  - Apply Xist hacks/edits to this custom 5.1 engine

For more details see: [How to: Create a Custom UE5 Engine Source Depot & Streams](./How-to-Create-Engine-Source-Depot)


# Recommended Reading

- [How to use Perforce Streams 101](https://www.perforce.com/blog/vcs/how-use-perforce-streams-101)
- [Perforce Tutorial](https://www.perforce.com/manuals/p4guide/Content/P4Guide/chapter.tutorial.html)
- [Basic Initial Setup Tasks](https://www.perforce.com/manuals/p4guide/Content/P4Guide/basic-tasks.initial.html)
- [P4 Typemap: How to Set Up Perforce Typemap](https://www.perforce.com/blog/vcs/perforce-p4-typemap)
  - IMPORTANT: get the typemap correct **before** you add your project to Perforce
- [Setting Up Perforce with Docker for Unreal Engine 4](https://www.froyok.fr/blog/2018-09-setting-up-perforce-with-docker-for-unreal-engine-4/) (conceptually similar to **UE5**)


## Specifically Related to Unreal Engine

- [Using Perforce as Source Control](https://docs.unrealengine.com/5.1/en-US/using-perforce-as-source-control-for-unreal-engine/)
- [Perforce Version Control Fundamentals](./Annotations/Inside-Unreal/EpicGames-Version-Control-Fundamentals) (video annotation)
  - [Perforce Workflow: Setting up a Workspace](https://youtu.be/JxXydvG4mlI?t=1898) (Epic video)
- [Community Tutorial: Using and setting up Perforce repository](https://dev.epicgames.com/community/learning/tutorials/Gxoj/unreal-engine-using-and-setting-up-perforce-repository)
