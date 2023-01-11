---
title: "Perforce"
description: "Notes regarding working with Perforce (P4) from a C++ dev perspective."
breadcrumb_name: Perforce
---

# Perforce SCM

When I was working solo on the game, Git was fine.
It would have continued to work for a small technical team.

To best support non-technical members of the Xist.GG team,
I require the binary locking/sharing capabilities of Perforce.


## How I set up my Perforce Server

Initial Setup
1. [Set up Perforce Typemap](./Typemap)
2. [Create `.p4ignore`](./p4ignore)

Import Lyra from Epic, Create custom Xist version of Lyra
1. [Create `//Lyra` Depot](./How-to-Create-Lyra-Depot)
2. [Create `//Lyra/Main` Stream](./How-to-Create-Lyra-Main-Stream) (import from Epic)
3. [Create `//Lyra/Xist` Stream](./How-to-Create-Lyra-Xist-Stream) (apply `LYRAGAME_API` updates, `virtual` overrides, etc)

Each time I want to make a new Game:

- [Create a new `//Lyra/XistGame` Stream](./How-to-Create-Lyra-Xist-Game-Stream) based on `//Lyra/Xist`


# Recommended Reading

- [How to use Perforce Streams 101](https://www.perforce.com/blog/vcs/how-use-perforce-streams-101)
- [Perforce Tutorial](https://www.perforce.com/manuals/p4guide/Content/P4Guide/chapter.tutorial.html)
- [Basic Initial Setup Tasks](https://www.perforce.com/manuals/p4guide/Content/P4Guide/basic-tasks.initial.html)
- [P4 Typemap: How to Set Up Perforce Typemap](https://www.perforce.com/blog/vcs/perforce-p4-typemap)
  - IMPORTANT: get the typemap correct **before** you add your project to Perforce
    - Epic's typemap docs are not great, make sure to read and understand this doc from Perforce


## Specifically Related to Unreal Engine

- [Using Perforce as Source Control](https://docs.unrealengine.com/5.1/en-US/using-perforce-as-source-control-for-unreal-engine/)
- [Perforce Version Control Fundamentals](./Annotations/Inside-Unreal/EpicGames-Version-Control-Fundamentals) (video annotation)
  - [Perforce Workflow: Setting up a Workspace](https://youtu.be/JxXydvG4mlI?t=1898) (Epic video)
- [Community Tutorial: Using and setting up Perforce repository](https://dev.epicgames.com/community/learning/tutorials/Gxoj/unreal-engine-using-and-setting-up-perforce-repository)
