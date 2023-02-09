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

## How Epic Distributes Source

There are 2 ways to get source from Epic.

1. GitHub + Epic Games Launcher
2. UDN Perforce

UDN is a paid service that is generally only available to larger companies.
You don't necessarily need it - GitHub is free and updated regularly.

Regardless of where you get your upstream Epic Source, the procedures
for integrating it into your project repo is roughly the same.


## Overview

- Copy the latest Lyra source from GitHub into `lyra-main`
  - Copy the latest Lyra Content from Epic Games Launcher into `lyra-main`
- Merge the new `lyra-main` into `lyra-xist`
  - Merge the new `lyra-xist` into `xist-game`
- Build `xist-game` with the latest Lyra 5.1+ on the latest Engine 5.1+

Now you get to go see all the new stuff, and all the newly broken stuff!  C'est la Dev!  `:-)`


# Open Your Game Project Git Repo

- Stash any/all changes
- Hard Git Reset

# Execute Powershell

*DO NOT COPY/PASTE STUFF INTO YOUR CONSOLE WITHOUT UNDERSTANDING WHAT IT DOES. SECURITY IS A THING.*

If your computer melts after you copy/paste this, you'll know you've messed up.

## Set up PowerShell variables

Note: You should set these the same values you used when you created
your Git repo [following these instructions](/UE5/LyraStarterGame/Tutorials/How-to-Create-a-Lyra-Repo).

```powershell
$ProjectDir = "D:/Dev/XistGame"  # your game project dir

# In this example, you've checked out the '5.1' branch on Github into
# the directory "E:/Github/UnrealEngine"
$UE5Root = "E:/Github/UnrealEngine" # engine source dir
$LyraSourceDir = "$UE5Root/Samples/Games/Lyra"

# Whatever directory you saved the new sample "LyraStarterGame" project
# in the Epic Games Launcher
$LyraContentDir = "D:/Dev/LyraStarterGame"

$LyraMainBranch = "lyra-main"
$LyraCustomBranch = "lyra-xist"
$GameBranch = "xist-game"

$YYYYMMDD = Get-Date -Format "yyyyMMdd"  # Set timestamp for snapshot
```

## Synchronize `lyra-main` with Epic Source Control

```powershell
cd $ProjectDir

# select the "main" version of Lyra, e.g. the one Epic updates
# this branch is an exact mirror of Epic's Repository whenever I take a snapshot
git checkout $LyraMainBranch

################################################################################
###
###  BEFORE YOU DO THIS, BACK UP ANY FILES YOU DO NOT WANT TO LOSE
###
################################################################################

# Remove EVERYTHING except Git itself
$RemoveItems = Get-ChildItem $ProjectDir -exclude .git, .gitattributes, .gitignore, .gitmodules
$RemoveItems | Remove-Item -Force -Recurse

# Copy Epic Lyra Source into my Git repo
$EpicSourceItems = Get-ChildItem $LyraSourceDir -exclude Binaries, Intermediate

foreach ($Item in $EpicSourceItems) {
    Write-Host "Copying $($Item.Name)..."
    Copy-Item $Item.FullName -Destination $ProjectDir -Recurse
}

# Get a list of all 'Content' folders in the sample dir
$LyraContentFolders = Get-ChildItem $LyraContentDir -Recurse -Directory `
    | Where-Object {$_.Name -ieq 'Content'}

$DirPrefix = $(Get-Item $LyraContentDir).FullName

foreach ($ContentFolder in $LyraContentFolders)
{
    # Remove the leading $ContentFolder from the name
    $RelativeContentFolder = $ContentFolder.FullName.substring($DirPrefix.length+1)

    # Add leading $WorkspaceDir folder to the name
    $SourceContentFolder = "$WorkspaceDir/$RelativeContentFolder"
    if (!(Test-Path $SourceContentFolder)) {mkdir $SourceContentFolder}
    $SourceContentFolder = Get-Item $SourceContentFolder

    # Copy the entire Content dir into my source folder
    Write-Host "COPY: $($ContentFolder.FullName) => $($SourceContentFolder.FullName)"
    cp -Recurse $ContentFolder/* $SourceContentFolder
}

# Clear read-only bit on all copied files
# (if you copy from Perforce, it sets tons of stuff read-only, it's annoying)
Get-ChildItem $ProjectDir -ReadOnly -Recurse | Set-ItemProperty -name IsReadOnly -value $false

# See if anything changed in Lyra
git status  # This will take a while...

################################################################################
################################################################################
###
###  If there are no changes to Lyra, you're done! Go back to xist-game
###  and continue working on the game.
###
###  If there are changes, then continue the procedure to merge them in:
###

# Commit current Epic Source snapshot to $LyraMainBranch
git add --all
git commit -m "Import Lyra Main $YYYYMMDD"

# make snapshot tag, push to server
git tag -a ${LyraMainBranch}.$YYYYMMDD -m "Lyra Main snapshot $YYYYMMDD"
git push origin ${LyraMainBranch}.$YYYYMMDD

# push $LyraMainBranch to server
git push origin $LyraMainBranch

# checkout my modified version of Lyra branch
# merge epic's official changes into my $LyraMainBranch branch
git checkout $LyraMainBranch
git merge --no-commit $LyraMainBranch

################################################################################
################################################################################
###
###  Manually resolve any merge conflicts
###

git commit -m "Merge ${LyraMainBranch}.$YYYYMMDD into lyra-xist"
git push origin lyra-xist

# checkout my game dev branch
# merge my (now updated) custom lyra into my game dev branch
git checkout xist-game
git merge --no-commit lyra-xist

################################################################################
################################################################################
###
###  Manually resolve any merge conflicts
###

git commit -m "Merge branch lyra-xist into xist-game"
git push origin xist-game
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
