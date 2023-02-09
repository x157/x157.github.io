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

1. [Create `lyra-main` Branch](./How-to-Create-Lyra-Main-Branch) (import from Epic `#NoChanges`)
2. [Create `lyra-xist` Branch](./How-to-Create-Lyra-Xist-Branch) based on `lyra-main` (apply `LYRAGAME_API` updates, `virtual` overrides, etc)
3. [Create `lyra-xistgame` Branch](./How-to-Create-Lyra-Xist-Game-Branch) based on `lyra-xist`
   - This is your game branch, do your work here.
   - Repeat as needed fpr each new game.

Click the links for working PowerShell code to take you through each step.

