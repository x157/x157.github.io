---
title: "UE5: The Unreal Engine"
description: "Discussion of Unreal Engine 5, including how to build a Custom Engine and use it for your project."
breadcrumb_path: "UE5"
breadcrumb_name: "Engine"
---

# Unreal Engine 5: Using the Engine

Even if you do not make changes to the engine, a custom UE5 engine is required to support
multiplayer projects.
This page will help you understand the process.

Quick Links:

- [Where to get UE5 Engine Source](#WhereToGetSource)
- [How to Build a Custom Engine](#HowToBuild)
  - [How to Register your Custom Engine with Windows](#HowToRegister)
  - [Procedure for Changing Engine Branches](#Procedure_ChangeEngineBranches)
    - When changing engine branches you MUST also reset all the downloaded Engine data
- [Custom Engine Directory Structure](#CustomEngineDirectoryStructure)
- [How to Generate Project Files](#HowToGenerateProjectFiles)
- [How to Migrate a UE Marketplace Plugin to a Custom Engine](./Migrate-UE-Marketplace-Plugin)


<a id="WhereToGetSource"></a>
## Where to Get Source

The latest official release of Unreal Engine is always the `release` branch of the official
[Epic Games](https://github.com/EpicGames)
GitHub repo:
[Unreal Engine](https://github.com/EpicGames/UnrealEngine)

Epic's official docs:

1. How to: [Accessing Unreal Engine source code on Github](https://www.unrealengine.com/en-US/ue-on-github)
  - The repository is **private**, so you will need to get access from Epic by following the procedure outlined in the link above
2. How to: [Download and Build Unreal Engine Source Code](https://docs.unrealengine.com/5.1/en-US/downloading-unreal-engine-source-code/)

If you are using a Lyra project, make sure to match your Lyra version with the Engine version.
*(Lyra is essentially distributed as an optional add-on for the Engine).*

| Version Description     | UE5                                                               | Lyra                                                                                 |
|-------------------------|-------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| Current Release         | [release](https://github.com/EpicGames/UnrealEngine/tree/release) | [release](https://github.com/EpicGames/UnrealEngine/tree/release/Samples/Games/Lyra) |
| Release Staging for 5.1 | [5.1](https://github.com/EpicGames/UnrealEngine/tree/5.1)         | [5.1](https://github.com/EpicGames/UnrealEngine/tree/5.1/Samples/Games/Lyra)         |
| Release Staging for 5.2 | [5.2](https://github.com/EpicGames/UnrealEngine/tree/5.2)         | [5.2](https://github.com/EpicGames/UnrealEngine/tree/5.2/Samples/Games/Lyra)         |

Note: When the current release is `5.2`, the `5.2` branch may still be **ahead** of the `release` branch.
The `release` branch is for official releases.  The `5.2` branch is for release staging, which means
things get merged into that over time, and when Epic decides it's stable enough for a release,
it gets merged into `release`.  Choose whichever branch is most appropriate for your use case.


<a id="BuildingCustomEngine"></a>
<a id="HowToBuild"></a>
## How to Build a Custom Engine

*Optional pre-build step: [Set up BuildConfiguration.xml](/UE5/Engine/BuildConfiguration)*

1. Get the [Engine Source](#WhereToGetSource)
2. Run `Setup.bat`
3. Run `GenerateProjectFiles.bat`
4. Open `UE5.sln` Visual Studio
  - Update and/or Add required Visual Studio components if needed
  - Build `UE5` as either `Development Editor` *(the default)* or `DebugGame Editor` *(for C++ debugging)*


<a id="HowToRegister"></a>
### How to Register your Custom Engine with Windows

After [building your custom engine](#HowToBuild), you need to register it with Windows.

- Run `Engine/Binaries/Win64/UnrealVersionSelector-Shipping.exe`

You built this EXE when you built the `UE5` project.
Running this will register your custom Engine in your Windows Registry.

By default, this generates a random GUID.
See [UEngine.ps1](https://github.com/XistGG/UnrealXistTools/blob/main/UEngine.ps1)
from [UnrealXistTools](https://github.com/XistGG/UnrealXistTools/)
for an easy way to `-List` engines and change those random GUIDs to a `-NewName`.
If your team coordinates the name used in the registry using this or some similar
tool, you can all easily share a custom `EngineAssociation` in your `.uproject`.




<a id="Procedure_ChangeEngineBranches"></a>
### Procedure for Changing Engine Branches

*NOTE: Engine projects are MASSIVE.  In general, you don't want to change branches often
from say 4.27 to 5.0.  Doing so would literally change 100000s of files.*

When working with Unreal Engine, you generally want to have multiple copies of the repository on
your machine simultaneously.  Each major engine version should have its own copy of
the repository in a dedicated directory on your machine.

While this does consume extra drive space, in general it makes your life much easier.
When you do change branches, from say `5.2` to `5.2-my-patch`, that's super easy.
Only for UE version changes (`5.2` to `5.3`) will this be potentially tricky.

When you change the engine from one branch to another, sometimes the Git repo can get into
a funky state.  To fix issues:

```powershell
# BACK UP ANY FILES YOU DO NOT WISH TO PERMANENTLY LOSE

# DELETE FILES - clean up your existing branch to make it possible to cleanly swap
git reset --hard
git clean -xfd

git checkout release  # checkout whatever engine branch you want

./Setup.bat
./GenerateProjectFiles.bat

# Now Open UE5.sln in Visual Studio and Build UE5
```

Sometimes when changing branches even after executing a `git reset --hard`, Git will still
tell you that there are local changes to UE5.  The  solution is to run `git clean -xfd` which
removes all of the `Setup.bat` downloaded files, so you end up with a truly-clean repository.

Then when you run `Setup.bat` it will download the appropriate version of those files for the
branch you have selected, rather than a perhaps-completely-incompatible set of files for the
old branch.

For my recent test on `5.2`, it's downloading ~ 20 GB.
You won't want to have to do this often.


<a id="CustomEngineDirectoryStructure"></a>
## Custom Engine Directory Structure

Assume you checkout the
[UnrealEngine Github repository](https://github.com/EpicGames/UnrealEngine)
to `D:\Dev\UE5` (Windows) or `/Dev/UE5` (Linux/Mac).

```powershell
git clone https://github.com/EpicGames/UnrealEngine /Dev/UE5
```

You'll end up with a directory structure that looks something like this:

```text
Dev
└── UE5
    └── Engine
        ├── Binaries
        ├── ...
        └── Source
```

## Suggested Project Directory Structure

Now assume you have your own game project, `XistGame`.

You may want to put it inside the `/Dev/UE5` directory, like this:

```text
Dev
└── UE5
    ├── Engine
    └── XistGame
        ├── Content
        ├── Source
        ├── ...
        └── XistGame.uproject
```

In this way, your `XistGame` project will share the same parent directory as the UE5 `Engine` directory.

Though it is **not** strictly required to put your project into this hierarchy, it does make it easier
to automate work flows, for example.  You can very easily (as I have) automate build tools to
auto-select the engine from the relative project location `../Engine/` which reduces configuration
management overhead.

That being said, the Engine works relative to your `.uproject` and so it doesn't actually care
where you put your files.

Ultimately, you can put your project anywhere you want.

For more information about possible locations to store your project files and the implications
of each, see Epic's Official
[Managing Game Code in Unreal](https://docs.unrealengine.com/5.1/en-US/managing-game-code-in-unreal-engine/)
documentation.


<a id="HowToGenerateProjectFiles"></a>
## How to Generate Project Files

No matter your platform or version, you'll need to Generate Project Files for your project
in order to be able to build it.

In these examples, I'm using PowerShell 7.  If you use another shell, you can still figure out
what I'm doing here.


## Launcher Engine Command: `-projectfiles`

When using an Epic Games Launcher Engine, use the `-projectfiles` command instead.

In this case, the Engine will continue to be managed by the Epic Games Launcher tools.
Thus the command is simpler, you only need to tell it the name of your `$UProjectFile`.

```powershell
####  Use the Epic Games Launcher to: Generate Visual Studio project files...
& $UnrealVersionSelector -projectfiles $UProjectFile
```

## Custom Engine Command: `-switchversionsilent`

If you're running a Custom Engine, you should generate your project files using
the `-switchversionsilent` command.

```powershell
####  Assign $EngineRoot as $UProjectFile's custom engine (if it isn't already),
####  and Generate Visual Studio project files...

& $UnrealVersionSelector -switchversionsilent $UProjectFile $EngineRoot
```

You don't need to explicitly execute the `-projectfiles` as well;
`-switchversionsilent` will implicitly also execute `-projectfiles`.

See [How to Compute these PowerShell Variables](#How_to_Compute_these_PowerShell_Variables)
below for specifics.  In particular, `$EngineRoot` must be the `Engine` PARENT directory,
or the `Root` directory in which the `Engine` directory exists.


<a id="How_to_Compute_these_PowerShell_Variables"></a>
## How to Compute these PowerShell Variables

These variables are used both for Custom Engines and for Launcher Engines.

In both cases we need to know the path to `UnrealVersionSelector` on your system.

- You need to compute these variables for your system:

```powershell
# Path to your .uproject (can be relative)
$UProjectFile = "D:/Dev/UE5/XistGame/XistGame.uproject"

#-- For Launcher Engines, you need to find this, it will be like: "C:\Program Files\Epic Games\Launcher"
#-- For Custom Engines, wherever you cloned the UnrealEngine repo
#-- Value as required by UnrealVersionSelector: parent of "D:/Dev/UE5/Engine" is the "root"
$EngineRoot = "D:/Dev/UE5"  ##  e.g. "D:/Dev/UE5"

##  e.g. D:/Dev/UE5/Engine/Binaries/Win64/UnrealVersionSelector.exe
$UnrealVersionSelector = $EngineRoot + "/Engine/Binaries/Win64/UnrealVersionSelector.exe"
```

In the example calculation of `$EngineRoot` above, I've cloned the UnrealEngine source into `D:/Dev/UE5`.

See the discussion below for more info on the expected directory structure for custom engines.

