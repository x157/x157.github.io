---
title: "Perforce Sync Procedure | UE5 Custom Engine"
description: "Xist's procedure for syncing from Epic's Perforce 5.1-Release Stream"
breadcrumb_path: "UE5/Engine"
breadcrumb_name: "Perforce Sync Procedure"
---

# Maintaining a UE 5.1-Release Perforce Stream Subscription

If you pay for a custom UE license (not the free one; the custom one requires signing a mDNA),
one of the nice benefits you receive is access to Epic's internal Perforce server.

I am using this for example to see the changes on the `5.1-Release` branch months before it is
actually available for release.

Because `5.1-Release` is currently under active development, every day there are many changes
to the Perforce stream.

I don't want to have to merge stuff *too* often, but at the same time it is nice to get regular
updates.  Following is my procedure for syncing code from Epic into my own Git repo.

To follow along in the `Powershell` code, these are the branches and what they mean:

| Branch                      | Type       | Description                                                     |
|-----------------------------|------------|-----------------------------------------------------------------|
| `lyra-epic-51-dev`          | Mirror     | Mirror of Epic's Perforce: `UE5/Release-5.1/Samples/Games/Lyra` |
| `lyra-epic-51-dev-YYYYMMDD` | Snapshot   | Snapshot of `lyra-epic-51-dev` on any given sync day            |
| `lyra-xist-51`              | Lyra Hacks | The hacks Xist is **forced** to make to Lyra C++ (exports, etc) |
| `xai-51-dev`                | Game       | My GFPs (Game `XAI` building on GFP lib `XCL`)                  |

# Sync from Epic P4

- P4V Get Latest for workspace
  - to `D:\Dev\EpicP4_XistGG\UE5\Release-5.1`

# Build Engine

- Run `GenerateProjectFiles.bat`
- Visual Studio `UE5.sln`
  - Build `UE5` Project
    - Target = `DebugGame Editor`

# Open LyraXist Git repo

- Stash any/all changes
- Hard Git Reset

### Powershell code

*DO NOT COPY/PASTE STUFF INTO YOUR CONSOLE WITHOUT UNDERSTANDING WHAT IT DOES. SECURITY IS A THING.*

If your computer melts after you copy/paste this, you'll know you've messed up.

```powershell
cd "D:\Dev\LyraXist-51"  # wherever your game source is

$YYYYMMDD = "20221001"  # Set timestamp for snapshot

# select my official epic Lyra 5.1 Dev branch
# this branch is an exact mirror of Perforce snapshots whenever I take a snapshot
git checkout lyra-epic-51-dev

# Remove EVERYTHING except Git and other things that ARE NOT stored in Epic's P4
Get-ChildItem -exclude .git, .gitattributes, .gitignore, Saved, LyraXist.uproject | Remove-Item -Force

# Copy Epic P4 Lyra into my Git repo
$P4Items = Get-ChildItem "D:\Dev\EpicP4_XistGG\UE5\Release-5.1\Samples\Games\Lyra\" -exclude Binaries, Intermediate

foreach ($Item in $P4Items) {
    Write-Host "Copying $($Item.Name)..."
    Copy-Item $Item.FullName -Destination . -Recurse
}

# Commit current Perforce snapshot to lyra-epic-51-dev
git add --all
git commit -m "Import Lyra 5.1 Stream $YYYYMMDD"

# make snapshot branch/tag, push to server
git branch      lyra-epic-51-dev-$YYYYMMDD
git push origin lyra-epic-51-dev-$YYYYMMDD

# push lyra-epic-51-dev to server
git push origin lyra-epic-51-dev

# checkout my modified version of Lyra branch
# merge epic's official changes into my lyra-xist-51 branch
git checkout lyra-xist-51
git merge --no-commit lyra-epic-51-dev-$YYYYMMDD

###
###  Manually resolve any merge conflicts
###

git commit -m "Merge branch lyra-epic-51-dev-$YYYYMMDD into lyra-xist-51"

# checkout my game dev branch
# merge my (now updated) custom lyra into my game dev branch
git checkout xai-51-dev
git merge --no-commit lyra-xist-51
git push origin lyra-xist-51

###
###  Manually resolve any merge conflicts
###

git commit -m "Merge branch lyra-xist-51 into xai-51-dev"
git push origin xai-51-dev
```

# Success!

You've just:

- Pulled latest `5.1-Release` Stream from Epic's Perforce
- Recompiled Engine using this source
- Merged latest Lyra 5.1 source from Epic's Perforce into Xist's Git
  - Into the "track Epic P4 *exactly*" branch
    - Into the "Xist's changes to official Lyra" branch
      - Into Xist's Game (XAI) branch

Now you get to go see all the new stuff, and all the newly broken stuff!  C'est la Dev!  `:-)`
