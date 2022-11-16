---
title: "Perforce Sync Procedure | UE5 Custom Engine"
description: "Xist's procedure for syncing from Epic's Perforce 5.1-Release Stream"
breadcrumb_path: "UE5/Engine"
breadcrumb_name: "Perforce Sync Procedure"
---

# Perforce Sync Procedure

This is how I keep my Lyra source updated with Epic's changes.  When they update the Engine
and Lyra, it's very easy for me to use their updates via this procedure.

Note: I get my Engine & Lyra source from Perforce, via UDN.

You can follow the same procedure, but you will get your source from:

- Engine source from GitHub
- Lyra source from a new blank `LyraStarterGame` project you create for your Engine


## Repository Setup

For a detailed description of these branches, see
[Upgrading Lyra Core](/UE5/LyraStarterGame/Upgrading-Lyra-Core/#RepositorySetup).

To follow along in the `Powershell` code, these are the branches and what they mean:

| Branch                  | Type       | Description                                                     |
|-------------------------|------------|-----------------------------------------------------------------|
| `lyra-51-epic`          | Mirror     | Mirror of Epic's Perforce: `UE5/Release-5.1/Samples/Games/Lyra` |
| `lyra-51-xist`          | Lyra Hacks | The hacks Xist is **forced** to make to Lyra C++ (exports, etc) |
| `xai-dev`               | Game       | My GFPs (Game `XAI` building on my plugin `XCL`)                |


Note: `UE5/Release-5.1/Samples/Games/Lyra` is the same thing as a brand new
empty `LyraStarterGame` project created in the Launcher.


# Get Engine Source

- P4V "Get Latest Revision" for workspace
  - to `F:/U_XistGG/UE5/Release-5.1`

(Or GitHub pull)


# Build Engine

- *(Optional)* Copy `Developer` Plugins into Engine
  - e.g. `RiderLink`, etc
- Run `GenerateProjectFiles.bat` in `F:/U_XistGG/UE5/Release-5.1`
- Visual Studio `UE5.sln`
  - Build `UE5` Project
    - Target = `DebugGame Editor`

# Open LyraXist Git repo (Xist Game)

- Stash any/all changes
- Hard Git Reset

# Execute Powershell

*DO NOT COPY/PASTE STUFF INTO YOUR CONSOLE WITHOUT UNDERSTANDING WHAT IT DOES. SECURITY IS A THING.*

If your computer melts after you copy/paste this, you'll know you've messed up.

```powershell
cd "F:/Dev/Lyra-51"  # wherever your game source is

$P4SourceDir = "F:/U_XistGG/UE5/Release-5.1"
$LyraSourceDir = "$P4SourceDir/Samples/Games/Lyra"

$YYYYMMDD = "20221031"  # Set timestamp for snapshot

# select my official epic Lyra 5.1 Dev branch
# this branch is an exact mirror of Perforce snapshots whenever I take a snapshot
git checkout lyra-51-epic

# remove ALL FILES NOT TRACKED by this branch
git clean -xfd

# Remove EVERYTHING except Git itself
$RemoveItems = Get-ChildItem -exclude .git, .gitattributes, .gitignore
$RemoveItems | Remove-Item -Force -Recurse

# Copy Epic P4 Lyra into my Git repo
$P4Items = Get-ChildItem $LyraSourceDir -exclude Binaries, Intermediate

foreach ($Item in $P4Items) {
    Write-Host "Copying $($Item.Name)..."
    Copy-Item $Item.FullName -Destination . -Recurse
}

# Clear read-only bit on copied Config files
$Configs = Get-ChildItem .\Config\ -ReadOnly -Recurse
$Configs | Set-ItemProperty -name IsReadOnly -value $false

# See if anything changed in Lyra
git status

################################################################################
################################################################################
###
###  If there are no changes to Lyra, you're done! Go back to xai-51-dev
###  and continue working on the game.
###
###  If there are changes, then continue the procedure to merge them in:
###

# Commit current P4 snapshot to lyra-51-epic
git add --all
git commit -m "Import Lyra Release-5.1 Stream $YYYYMMDD"

# make snapshot tag, push to server
git tag -a lyra-51-epic.$YYYYMMDD -m "Lyra Release-5.1 snapshot $YYYYMMDD"
git push origin lyra-51-epic.$YYYYMMDD

# push lyra-51-epic to server
git push origin lyra-51-epic

# checkout my modified version of Lyra branch
# merge epic's official changes into my lyra-51-xist branch
git checkout lyra-51-xist
git merge --no-commit lyra-51-epic

################################################################################
################################################################################
###
###  Manually resolve any merge conflicts
###

git commit -m "Merge lyra-51-epic.$YYYYMMDD into lyra-51-xist"
git push origin lyra-51-xist

# checkout my game dev branch
# merge my (now updated) custom lyra into my game dev branch
git checkout xai-dev
git merge --no-commit lyra-51-xist


################################################################################
################################################################################
###
###  Manually resolve any merge conflicts
###

git commit -m "Merge branch lyra-51-xist into xai-dev"
git push origin xai-dev
```

# Build Game

- Clean Unreal Project & Generate Project Files
  - Run `CleanUnrealProject.bat`
    - *This is a Xist Build Tool that I should maybe document and/or maybe release publicly...*
- Rider `LyraXist.uproject`
  - Build `LyraXist` Project
    - Target = `DebugGame Editor`


# Success!

You've just:

- Pulled latest `5.1-Release` Stream from Epic P4
- Recompiled Engine using this source
- Merged the latest Lyra 5.1 source from Epic P4 into LyraXist Git
  - Into the "track Epic P4 *exactly*" branch
    - Into the "Xist's hacks on official Lyra" branch
      - Into Xist Game branch
- Recompiled Xist Game with the latest Lyra 5.1 on the latest Engine 5.1

Now you get to go see all the new stuff, and all the newly broken stuff!  C'est la Dev!  `:-)`

