---
title: "How to Create a Lyra-based Project in Git | UE5 Lyra"
description: "How to Create a lyra-main Branch in Git"
breadcrumb_path: "UE5/LyraStarterGame/Tutorials"
breadcrumb_name: "Create a Lyra Git Repo"
---

# How to Create a Lyra-based Project in Git


## Procedure Overview

- Clone [UnrealEngine](https://github.com/EpicGames/UnrealEngine) from GitHub
  - Checkout the desired branch, e.g. `5.1`
- Create a `LyraStarterGame` project from Epic Games Launcher
- Initialize Project Git Repo
- Create `lyra-main` branch
  - Copy Source & Configs from GitHub
  - Copy Content from Epic Games Launcher
- Create `lyra-xist` branch based on `lyra-main`
- Create `xist-game` branch based on `lyra-xist`

## Summary of Result

- The `lyra-main` branch will be a brand new, empty `LyraStarterGame` project
  - with the latest Source/Configs from GitHub
  - with the latest Content from the Epic Games Launcher
- The `lyra-xist` branch will be our custom version of Lyra with upgrades.
- The `xist-game` branch will contain our Game code and content.

You will want to periodically
[Merge Epic Source into Git](./Procedure-Merge-Epic-Source-into-Git)
to get updates from Epic.


# Set up PowerShell variables

```powershell
$DevCode = "Xist"
$GameCode = "XistGame"

# The directory where you keep your Game Code
$WorkspaceDir = "D:/Dev/$GameCode"

# The directory where you keep your Github UE5 clone
#   - must be checked out to the Engine/Lyra branch of your choice
$UE5Root = "E:/GitHub/UnrealEngine"
$LyraSourceDir = "$UE5Root/Samples/Games/Lyra"

# Whatever directory you saved the new sample "LyraStarterGame" project
# in the Epic Games Launcher
$LyraContentDir = "D:/Dev/LyraStarterGame"

$LyraMainBranch = "lyra-main"
$LyraCustomBranch = "lyra-$($DevCode.ToLower())"  # e.g. "lyra-xist"
$GameBranch = $GameCode.ToLower()  # e.g. "xistgame"
```


# Create a `LyraStarterGame` project from Launcher

Store the sample project in `$LyraContentDir`, for example `D:/Dev/LyraStarterGame`


# Clone UnrealEngine from GitHub

```powershell
# This example clones the UE 5.1 + Lyra 5.1 branch
# Choose the appropriate branch for your project
#   - if you are not sure, use the 'release' branch
git clone --branch "5.1" https://github.com/EpicGames/UnrealEngine $UE5Root
```

# Initialize Project Git Repo

```powershell
# make dir $WorkspaceDir if needed
if (!(Test-Path $WorkspaceDir)) {mkdir $WorkspaceDir}

cd $WorkspaceDir

git init
git add .gitignore .gitattributes  # YOU MUST PROVIDE THESE FILES
git commit -m "Initialize Git"
```

<todo>Need to add examples for `.gitignore` and `.gitattributes`</todo>


# Create `lyra-main` branch

```powershell
cd $WorkspaceDir

git branch $LyraMainBranch
```

## Copy Source from Epic to `lyra-main` branch

```powershell
cd $WorkspaceDir

git checkout $LyraMainBranch

# Example: Recursive Copy E:/GitHub/UnrealEngine/Samples/Games/Lyra into Workspace dir
cp -Recurse $LyraSourceDir/* $WorkspaceDir

git add --all
git commit -m "Initial Import of Lyra from Epic"
```

### Copy Content from Lyra Sample into `lyra-main` branch

```powershell
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

    Write-Host "COPY: $($ContentFolder.FullName) => $($SourceContentFolder.FullName)"
    cp -Recurse $ContentFolder/* $SourceContentFolder
}

git add --all  # This might take a while...
git commit -m "Initial Import of Lyra Launcher Content"
```

# Create `lyra-xist` branch based on `lyra-main`

```powershell
cd $WorkspaceDir

git checkout $LyraMainBranch    # Start on lyra-main
git branch $LyraCustomBranch    # Create lyra-xist
git checkout $LyraCustomBranch  # Checkout lyra-xist
```

- Make any `LYRAGAME_API` edits to this branch
- Add any shared Plugins to this branch and integrate them with Lyra
- This is your shared-between-games custom Lyra


# Create `xist-game` branch based on `lyra-xist`

```powershell
cd $WorkspaceDir

git checkout $LyraCustomBranch  # Start on lyra-xist
git branch $GameBranch          # Create xist-game
git checkout $GameBranch        # Checkout xist-game
```

- This is the branch where your Game Feature Plugin goes
  - Any/all content and configs that are game-specific go here


# Periodically: Merge Updates from Epic

You will want to periodically merge upstream source updates from Epic
into your Project.

The procedure for doing so is similar to what we just did, but it
updates an existing repository rather than creating a new one.

[Procedure: Merge Epic Source into Git](./Procedure-Merge-Epic-Source-into-Git)

For more details see the dedicated docs for the procedure, above.
