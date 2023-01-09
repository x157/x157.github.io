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

- [Example Lyra Project Perforce Typemap](./Typemap)
- [Example `.p4ignore`](./p4ignore)

Detailed Setup of New Depot using Streams:

- [New Stream Depot Procedure](./New-Stream-Depot-Procedure)
  - First time setup procedure for a new Stream Depot


# Perforce Server Setup

- Perforce: [P4 Typemap: How to Set Up Perforce Typemap](https://www.perforce.com/blog/vcs/perforce-p4-typemap)
  - IMPORTANT: get the typemap correct **before** you add your project to Perforce
    - Epic's typemap docs are not great, make sure to read and understand this doc from Perforce


# Recommended Reading

- [Using Perforce as Source Control](https://docs.unrealengine.com/5.1/en-US/using-perforce-as-source-control-for-unreal-engine/)
- [How to use Perforce Streams 101](https://www.perforce.com/blog/vcs/how-use-perforce-streams-101)
- [Perforce Version Control Fundamentals](./Annotations/Inside-Unreal/EpicGames-Version-Control-Fundamentals) (video annotation)
  - [Perforce Workflow: Setting up a Workspace](https://youtu.be/JxXydvG4mlI?t=1898) (Epic video)
