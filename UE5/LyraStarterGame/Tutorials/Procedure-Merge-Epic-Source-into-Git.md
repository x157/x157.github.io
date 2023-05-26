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

- Get the latest Source from GitHub
- Get the latest `LyraStarterGame` project from Epic Games Launcher
- Integrate `lyra-main`
  - Copy the latest Lyra Source from GitHub
  - Copy the latest Lyra Content from Epic Games Launcher
- Merge the new `lyra-main` into `lyra-xist`
  - Merge the new `lyra-xist` into `xist-game`
- Build `xist-game` with the latest Lyra 5.1+ on the latest Engine 5.1+

Now you get to go see all the new stuff, and all the newly broken stuff!  C'est la Dev!  `:^)`


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
$WorkspaceDir = "D:/Dev/XistGame"  # your game project dir

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
```

## Get the latest Source from GitHub

```powershell
cd $UE5Root

# You must already be on the branch you want to use.
# In the setup example we checked out the "5.1" branch.
git pull origin
```


## Get the latest `LyraStarterGame` project from Epic Games Launcher

- Start Epic Games Launcher, in the Library Vault:
  - Update the **Lyra Starter Game** sample project if needed


## Synchronize `lyra-main` with Epic Upstream Source

```powershell
################################################################################
###
###  BEFORE YOU DO THIS, BACK UP ANY FILES YOU DO NOT WANT TO LOSE
###
###  MAKE SURE YOUR GIT REPO DOES NOT HAVE ANY PENDING CHANGES.
###
###  COMMIT AND/OR STASH EVERYTHING NOW.
###
################################################################################

cd $WorkspaceDir

# select the "main" version of Lyra, e.g. the one Epic updates
# this branch is an exact mirror of Epic's Repository whenever I take a snapshot
git checkout $LyraMainBranch

# Remove EVERYTHING except Git itself
$RemoveItems = Get-ChildItem $WorkspaceDir -exclude .git, .gitattributes, .gitignore, .gitmodules
$RemoveItems | Remove-Item -Force -Recurse

# Copy Epic Lyra Source into my Git repo
$EpicSourceItems = Get-ChildItem $LyraSourceDir -exclude Binaries, Intermediate

foreach ($Item in $EpicSourceItems) {
    Write-Host "Copying $($Item.Name)..."
    Copy-Item $Item.FullName -Destination $WorkspaceDir -Recurse
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
    Write-Host "COPY: $RelativeContentFolder => $($SourceContentFolder.FullName)"
    cp -Recurse $ContentFolder/* $SourceContentFolder
}

# Clear read-only bit on all copied files
# (if you copy from Perforce, it sets tons of stuff read-only, it's annoying)
Get-ChildItem $WorkspaceDir -ReadOnly -Recurse | Set-ItemProperty -name IsReadOnly -value $false

# See if anything changed in Lyra
git status  # This will take a while...

################################################################################
################################################################################
###
###  If there are no changes to Lyra, you're done! Go back to
###  the xist-game branch and continue working on the game.
###  DON'T FORGET TO SWITCH BACK TO THE `xist-game` BRANCH!
###  DON'T EVER WORK IN THE `lyra-main` BRANCH!
###
###  If there are changes, then continue the procedure to merge them in:
###

$YYYYMMDD = Get-Date -Format "yyyyMMdd"  # Set timestamp for snapshot

# Commit current Epic Source snapshot to $LyraMainBranch
git add --all
git commit -m "Import Lyra Main $YYYYMMDD"

# make snapshot tag, push to server
git tag -a "${LyraMainBranch}.$YYYYMMDD" -m "Lyra Main snapshot $YYYYMMDD"
git push origin "${LyraMainBranch}.$YYYYMMDD"

# push $LyraMainBranch to server
git push origin $LyraMainBranch

# checkout my modified version of Lyra branch
# merge epic's official changes into my $LyraCustomBranch branch
git checkout $LyraCustomBranch
git merge --no-commit $LyraMainBranch  # merge main into custom

################################################################################
################################################################################
###
###  Manually resolve any merge conflicts
###

git commit -m "Merge ${LyraMainBranch}.$YYYYMMDD into $LyraCustomBranch"
git push origin $LyraCustomBranch

# checkout my game dev branch
# merge my (now updated) custom lyra into my game dev branch
git checkout $GameBranch
git merge --no-commit $LyraCustomBranch  # merge custom into game

################################################################################
################################################################################
###
###  Manually resolve any merge conflicts
###

git commit -m "Merge branch $LyraCustomBranch into $GameBranch"
git push origin $GameBranch
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
