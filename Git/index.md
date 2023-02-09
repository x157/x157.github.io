---
title: "Git"
description: "How to set up a Git repository for an Epic Games Unreal Engine project, including example branch setup and working PowerShell examples for a UE5 custom engine and a UE5 Lyra game."
breadcrumb_name: Git
---

# Git SCM

As a C++ developer, Git is indisputably the superior source control system.

It works great for small, technical teams, where everyone can compile their own
Project and/or Engine.

When the team size grows large and/or non-technical
people need access to the repository,
and/or simultaneous modifications are being made to Blueprints, for example,
Git ceases to be as good an option
for the larger team, and thus [Perforce](/Perforce/) is used internally at Epic.

If your team uses Git, here is how I recommend to do it.


## How To: Set up a Lyra Project Source Repo

1. Create `lyra-main` Branch (import from Epic `#NoChanges`)
  - This is an exact mirror of Epic's Source Control.
  - Never make any changes directly to this branch.
2. Create `lyra-xist` Branch based on `lyra-main` (apply `LYRAGAME_API` updates, `virtual` overrides, etc)
  - This is your custom Lyra. Base your new games on this branch.
3. Create `xist-game` Branch based on `lyra-xist`
  - This is your game branch. Build your game here.


### Procedure: How to Create a Lyra Git Repo

See [this detailed PowerShell procedure](./How-to-Create-a-Lyra-Repo)
for the exact commands necessary to create and initialize a new
Lyra Project Git repository.
