---
title: "Procedure: Merge Epic Source into Git | UE5 Lyra"
description: "PowerShell documentation of a recommended procedure for merging Epic upstream source code into your Git project repository."
breadcrumb_path: "UE5/LyraStarterGame/Tutorials"
breadcrumb_name: "Merge Epic into Git"
---

# Merge Epic Source into Git

If you've set up your Git repo in [the same way as me](/Git/) then you can use
this procedure to merge upstream code and asset updates from Epic
into your local project Git repository.

Note: I get my Engine & Lyra source from Perforce, via UDN.

If you do not pay for UDN access, then you will instead get Engine & Lyra source from Github,
and Lyra binary content from the Epic Games Launcher.


## Overview

- Copy the latest Lyra source from Epic into `lyra-main`
  - Merge the new `lyra-main` into `lyra-xist`
    - Merge the new `lyra-xist` into `lyra-xistgame`
- Recompile XistGame with the latest Lyra 5.1+ on the latest Engine 5.1+

Now you get to go see all the new stuff, and all the newly broken stuff!  C'est la Dev!  `:-)`


# Open Your Game Project Git Repo

- Stash any/all changes
- Hard Git Reset

# Execute Powershell

*DO NOT COPY/PASTE STUFF INTO YOUR CONSOLE WITHOUT UNDERSTANDING WHAT IT DOES. SECURITY IS A THING.*

If your computer melts after you copy/paste this, you'll know you've messed up.

```powershell
$ProjectDir = "D:/Dev/MyGame"  # your game project dir
cd $ProjectDir

# In this example, you've checked out the '5.1' branch on Github into
# the directory "D:/UE5/Release-5.1"
$EngineSourceDir = "D:/UE5/Release-5.1" # engine source dir
$LyraSourceDir = "$EngineSourceDir/Samples/Games/Lyra"

$YYYYMMDD = Get-Date -Format "yyyyMMdd"  # Set timestamp for snapshot

# select the "main" version of Lyra, e.g. the one Epic updates
# this branch is an exact mirror of Epic's Repository whenever I take a snapshot
git checkout lyra-main

################################################################################
###
###  BEFORE YOU DO THIS, BACK UP ANY FILES YOU DO NOT WANT TO LOSE
###
################################################################################

# Remove EVERYTHING except Git itself
$RemoveItems = Get-ChildItem $ProjectDir -exclude .git, .gitattributes, .gitignore, .gitmodules
$RemoveItems | Remove-Item -Force -Recurse

# Copy Epic P4 Lyra into my Git repo
$EpicSourceItems = Get-ChildItem $LyraSourceDir -exclude Binaries, Intermediate

foreach ($Item in $EpicSourceItems) {
    Write-Host "Copying $($Item.Name)..."
    Copy-Item $Item.FullName -Destination $ProjectDir -Recurse
}

# Clear read-only bit on all copied files
# (if you copy from Perforce, it sets tons of stuff read-only, it's annoying)
Get-ChildItem $ProjectDir -ReadOnly -Recurse | Set-ItemProperty -name IsReadOnly -value $false

# See if anything changed in Lyra
git status

################################################################################
################################################################################
###
###  If there are no changes to Lyra, you're done! Go back to lyra-xistgame
###  and continue working on the game.
###
###  If there are changes, then continue the procedure to merge them in:
###

# Commit current Epic Source snapshot to lyra-main
git add --all
git commit -m "Import Lyra Main $YYYYMMDD"

# make snapshot tag, push to server
git tag -a lyra-main.$YYYYMMDD -m "Lyra Main snapshot $YYYYMMDD"
git push origin lyra-main.$YYYYMMDD

# push lyra-main to server
git push origin lyra-main

# checkout my modified version of Lyra branch
# merge epic's official changes into my lyra-main branch
git checkout lyra-main
git merge --no-commit lyra-main

################################################################################
################################################################################
###
###  Manually resolve any merge conflicts
###

git commit -m "Merge lyra-main.$YYYYMMDD into lyra-xist"
git push origin lyra-xist

# checkout my game dev branch
# merge my (now updated) custom lyra into my game dev branch
git checkout lyra-xistgame
git merge --no-commit lyra-xist

################################################################################
################################################################################
###
###  Manually resolve any merge conflicts
###

git commit -m "Merge branch lyra-xist into lyra-xistgame"
git push origin lyra-xistgame
```

# Build Game

- Clean Unreal Project & Generate Project Files
    - Run `UProjectClean.ps1` from [UnrealXistTools](https://github.com/XistGG/UnrealXistTools)
        - Remove all `Binaries` directories
        - Remove all `Intermediate` directories
        - Remove `*.sln`
        - Remove `.idea` (optional)
        - Remove `DerivedDataCache` (optional)
        - Exec `GenerateProjectFiles` for the project
- Rider `XistGame.uproject`
    - Build `XistGame` Project
        - Target = `Debug Editor`
