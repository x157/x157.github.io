---
title: "Perforce"
description: "Notes regarding working with Perforce (P4) from a C++ dev perspective."
breadcrumb_name: Perforce
---

# Perforce

To support non-technical members of the Xist.GG team, I set up a Perforce (P4) server.

With this system, I keep all `Binaries` and `UAssets` in a P4 stream depot.
All C++ and INI are kept in a Git repo.

An automated process syncs a specific Git branch into the P4 depot.


  - [New Stream Depot Procedure](./New-Stream-Depot-Procedure)
    - First time setup procedure for a new Stream Depot

See Also:

  - [How to use Perforce Streams 101](https://www.perforce.com/blog/vcs/how-use-perforce-streams-101)
  - [Perforce Version Control Fundamentals](./Annotations/Inside-Unreal/EpicGames-Version-Control-Fundamentals) (video annotation)
    - [Perforce Workflow: Setting up a Workspace](https://youtu.be/JxXydvG4mlI?t=1898) (official Epic video)
