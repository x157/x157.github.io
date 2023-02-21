---
title: "Git lyra-xist"
description: "Discussion of the kinds of things I put in my Custom Lyra branch (lyra-xist)"
breadcrumb_path: "Git"
breadcrumb_name: "Branch: lyra-xist"
---

# What is the `lyra-xist` Branch?

- Set your custom Engine Association
- Add your team shared project settings *(if any)*
- Make any `LYRAGAME_API` edits to this branch
- Add any shared Plugins to this branch and integrate them with Lyra
- This is your shared-between-games custom Lyra


# How to Set Up `lyra-xist`

When making a new `lyra-xist` branch, these are the first things I do on it:

- Set Engine Association
  - Run [`UnrealVersionSelector.ps1 -SwitchVersion`](https://github.com/XistGG/UnrealXistTools/blob/main/UnrealVersionSelector.ps1) in your project dir
- Copy Rider `.DotSettings` file from previous project *(if any)*
- Clean Project & Generate Project Files
  - Run [`UProjectClean.ps1`](https://github.com/XistGG/UnrealXistTools/blob/main/UProjectClean.ps1) in your project dir


## Commit

After making these changes, add them all to Git and commit to `lyra-xist`.

Any time you make changes to this branch, merge them into your game branches.

This gives you one place to modify your custom Lyra, and then all of your Lyra games
can benefit from the work you do on this branch.
