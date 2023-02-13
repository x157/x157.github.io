---
title: "How to Create a Lyra-based Project in Git | UE5 Lyra"
description: "How to Create a lyra-main Branch in Git"
breadcrumb_path: "UE5/LyraStarterGame/Tutorials"
breadcrumb_name: "Create a Lyra Git Repo"
---

# How to Create a Lyra-based Project in Git

This details the procedure used to implement my [Git](/Git/)
branching strategy for a Lyra-based project.

How to choose the correct Engine/Lyra version for your project:

- To use Lyra `release`, checkout Engine branch `release`
- To use Lyra `5.2`, checkout Engine branch `5.2`

**When in doubt, use the `release` branch**, the latest stable Engine+Lyra release.

## Procedure Overview

- Clone [UnrealEngine](https://github.com/EpicGames/UnrealEngine) from GitHub
- Create a `LyraStarterGame` project from Epic Games Launcher
- Initialize New Git Repo
- Create `lyra-main` branch
  - Copy Source & Configs from GitHub
  - Copy Content from Epic Games Launcher
- Create `lyra-xist` branch based on `lyra-main`
- Create `xist-game` branch based on `lyra-xist`

## Summary of Result

- The `lyra-main` branch will be an exact mirror of Epic's source repository
  - with the latest Source/Configs from GitHub
  - with the latest Content from the Epic Games Launcher
- The `lyra-xist` branch will be our custom version of Lyra with upgrades.
- The `xist-game` branch will contain our Game code and content.

You will want to periodically
[Merge Epic Source into Git](./Procedure-Merge-Epic-Source-into-Git)
to get updates from Epic.


# Set up PowerShell variables

```powershell
# If you forked the engine to make your own custom engine,
# change this to be the URL to your fork
$EngineRepositoryUrl = "https://github.com/EpicGames/UnrealEngine"

# Which branch of the Engine and Lyra do we want to import?
$EngineBranch = "release"

# The directory where you keep your Game Code
$WorkspaceDir = "D:/Dev/XistGame"  # set this

# The directory where you want to clone UnrealEngine
$UE5Root = "E:/GitHub/UnrealEngine"  # set this
$LyraSourceDir = "$UE5Root/Samples/Games/Lyra"  # don't change this line

# This is the directory where we will save a new sample
# LyraStarterGame project from the Launcher.
$LyraContentDir = "D:/Dev/LyraStarterGame"  # set this

$LyraMainBranch   = "lyra-main"
$LyraCustomBranch = "lyra-xist"  # "lyra-yourname"
$GameBranch       = "xist-game"
```


# Create a `LyraStarterGame` project from Launcher

Store the sample project in `$LyraContentDir`, for example `D:/Dev/LyraStarterGame`


# Clone UnrealEngine from GitHub

```powershell
if (Test-Path $UE5Root)
{
  # $UERoot already exists; you already cloned the Engine
  cd $UE5Root

  # Switch branches if engine is not on $EngineBranch
  $branch = git branch
  if (!($EngineBranch -ieq $branch))
  {
    git fetch origin
    git checkout $EngineBranch
  }

  # pull latest from origin
  git pull origin
}
else
{
  # $UE5Root does not exist; clone $EngineRepositoryUrl into $UE5Root
  git clone --branch $EngineBranch $EngineRepositoryUrl $UE5Root
}
```

# Initialize Project Git Repo

Before you do this part, prepare the files you will use for `.gitignore` and `.gitattributes`.

See [Xist's UE5 Git Init](https://github.com/XistGG/UE5-Git-Init)
for some reasonable defaults.

```powershell
# make dir $WorkspaceDir if needed
if (!(Test-Path $WorkspaceDir)) {mkdir $WorkspaceDir}

cd $WorkspaceDir

git init
git add .gitignore .gitattributes  # YOU MUST PROVIDE THESE FILES
git commit -m "Initialize Git"
```


# Create `lyra-main` branch

```powershell
cd $WorkspaceDir

# Create lyra-main branch
git branch $LyraMainBranch
```

## Copy Source from Epic to `lyra-main` branch

```powershell
cd $WorkspaceDir

# Checkout lyra-main
git checkout $LyraMainBranch

# Example: Recursive Copy E:/GitHub/UnrealEngine/Samples/Games/Lyra/* into Workspace dir
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

cd $WorkspaceDir

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


# Clean up as Desired

You no longer need the `$LyraContentDir` (`D:/Dev/LyraStarterGame`),
as we copied all the interesting parts from it into our Git repo.


# Periodically: Merge Updates from Epic

You will want to periodically merge upstream source updates from Epic
into your Project.

The procedure for doing so is similar to what we just did, but it
updates an existing repository rather than creating a new one.

[Procedure: Merge Epic Source into Git](./Procedure-Merge-Epic-Source-into-Git)

For more details see the dedicated docs for the procedure, above.
