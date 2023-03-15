---
title: "UE5 C++ Dev Workflow"
description: "Typical C++ Developer Workflow in UE5"
breadcrumb_path: "UE5/Dev"
breadcrumb_name: "Workflow"
---

# UE5 C++ Developer Workflow

- Update Engine
  - Update Project
    - Modify Project Code
      - Run Editor
        - Crash Editor into a *fully functional* Debugger `:)`

As a C++ game dev, you will be spending most of your time in your IDE writing C++,
or in the Unreal Editor doing play tests.


## Update Engine

- Download, fetch, pull, sync, whatever to get the latest version of your Engine Source
- `GenerateProjectFiles.bat`
- Compile engine: `Debug Editor`

Note that switching branches can be problematic.  If you think funny stuff is happening
when you switch branches, see
[Procedure for Changing Engine Branches](/UE5/Engine/#Procedure_ChangeEngineBranches).


## Update Project

- Download, fetch, pull, sync, whatever to get the latest version of your UProject
- `UnrealVersionSelector -projectfiles`
  - To select the appropriate engine and generate project files


## Modify Project Code

- Make C++ Code Changes
- Compile project: `Debug Editor`


## Run Editor

Now you have the latest engine with the latest project, you run the Editor again each
time it crashes.  `;)`

Iteration on design/art related stuff happens in the Editor.

Hot Reload (in Rider: `CTRL`+`ALT`+`F11`) is good when used appropriately.
If it corrupts your compiled Blueprints, you can fix it by closing the Editor, deleting all
`DerivedDataCache`, `Binaries` and `Intermediates` directories, re-generating project files
and recompiling the project.

In general if you only modify the body of a function, then Hot Reload should work OK.
If you modify header files,
or if you add/remove new functions,
or if you modify constructors, Hot Reload will likely corrupt your BP cache.

You'll know because when you try running those BPs, they'll seem like they're doing
**anything but** what they say they're doing.  That is a corrupt compiled BP,
you need to nuke it and force it to recompile.  (By closing the editor, removing
the directories mentioned above, compiling the project in your C++ IDE and
finally, restarting the editor).


## Crash Editor

The one thing you absolutely don't need to be told how to do.
