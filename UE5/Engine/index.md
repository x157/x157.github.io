---
title: "Unreal Engine 5: The Engine"
description: "Discussion of Unreal Engine 5 and how to use it"
breadcrumb_path: "UE5"
breadcrumb_name: "Engine"
---


# UE5: Using a Custom Engine Build


Before you download the UE5 source, make sure you are familiar with this material:

[Official UE 5 Docs: Downloading Unreal Engine Source Code](https://docs.unrealengine.com/5.0/en-US/downloading-unreal-engine-source-code/)

Unless you know what you are doing, you will probably want the `release` branch, which is the most
recent official release of the engine.


## Install .NET v4.5 for VS 2022

If you are using Visual Studio 2022, you will likely need to manually download
and install .NET v4.5 framework, which is required by UE5 as of 5.0.3, but is
no longer supported by Microsoft.

[How to install .NET v4.5 on Windows](https://thomaslevesque.com/2021/11/12/building-a-project-that-target-net-45-in-visual-studio-2022/)

You'll want to make sure .NET v4.5 is installed BEFORE you try to build the engine.
You will know that you need this if Visual Studio 2022 gives you a warning that .NET v4.5
is missing.  It will ask if you want to upgrade the project to use v4.8.

YOU DO NOT WANT TO UPGRADE TO USE .NET v4.8.  Shit will break.  It will compile mostly OK, and
then your engine/game will crash a lot in places it has no business crashing.

**UE5 requires .NET v4.5.** Install it via the methodology described at the above link.


## Where to put your own project

Assume you checkout the
[UnrealEngine Github repository](https://github.com/EpicGames/UnrealEngine)
to `C:\Dev\UE5` (Windows) or `/Dev/UE5` (Linux/Mac).

You'll end up with a directory structure that looks something like this:

```text
Dev
└── UE5
    └── Engine
        ├── Binaries
        ├── ...
        └── Source
```

Now assume you have your own game project, `MyAwesomeGameProject`.

You need to put it inside the `Dev/UE5` directory, like this:

```text
Dev
└── UE5
    ├── Engine
    └── MyAwesomeGameProject
        └── MyAwesomeGameProject.uproject
```

This seems odd, but it's the UE5 workflow.
Your project must be INSIDE the UE5 repository,

Your `MyAwesomeGameProject` will share the same parent directory as the UE5 `Engine` directory.
