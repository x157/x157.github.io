---
title: "Re-save Assets on Engine Update | UE5 Engine"
description: "Discussion of how and why it is necessary to explicitly re-save many binary assets whenever you update your project's Engine"
breadcrumb_path: "UE5/Engine"
breadcrumb_name: "Re-save Assets"
---

# Re-save Assets on Engine Update

Whenever you update the Engine version that your project is running on,
you likely also need to explicitly re-save many of your project assets.

Many types of asset will have Engine-specific data saved in them.
Though they will technically work if you open the project in an Editor
of a different Engine version, they will have very slow startup times
unless/until you explicitly re-save them using the new Engine.

Skip to [Example Commandlet Execution](#ExampleExecution)


## Problem: UE saves Engine-specific info in Binary Assets

When you open your project in the Editor, if you are using an Engine
version that is different from the version the asset was saved with, it will
recompute a lot of things.

It **does not save** this recomputed data.  It **does not tell you** that
there are things that need to be re-saved, other than to (sometimes?) issue
output log messages telling you that it is doing some computing.

If you close the Editor and re-open it,
it will recompute again, and again, and again...

This can lead to tremendously slow Editor startup times.


## Solution: Re-save Binary Assets

The solution is to explicitly re-save any assets that depend on the Engine
version.

There is a commandlet that will automate this process for you:
[`UResavePackagesCommandlet`](https://docs.unrealengine.com/5.1/en-US/API/Editor/UnrealEd/Commandlets/UResavePackagesCommandlet/)

For a project like
[Lyra](/UE5/LyraStarterGame/),
this commandlet takes a **very long time** to run.
It can potentially rewrite thousands of files.
It literally takes all day to run on a 16-core CPU with M.2 SSDs.

It seems primarily to be CPU-bound, but it never actually goes above 50% CPU usage
and often uses very little CPU, so who knows.  Maybe on a 64-core CPU it would only
take a few hours rather than all day.

Thankfully, you should only have to run it once
each time you change the Engine version your project uses.


<a id='ExampleExecution'></a>
# Example Commandlet Execution

I updated my Lyra 5.0 project to Lyra 5.1.
As it was originally created with UE 5.0, this resulted in many binary assets having
been last saved with UE 5.0 rather than UE 5.1.

```powershell
# Path to your Unreal Editor (the "-Cmd" version)
$UnrealEd = "D:/UE-5.1/Engine/Binaries/Win64/UnrealEditor-Win64-Debug-Cmd.exe"

# Path to your .uproject file
$UProject = "D:/Dev/Lyra-51/Lyra.uproject"

# Execute Unreal Editor Resave Packages Commandlet with arguments
$StartDate = $(date)
& $UnrealEd $UProject -run=ResavePackages -IgnoreChangelist ; $StartDate ; date
```

### Note about `-IgnoreChangelist`

I may have had to do this since I'm using Git?  This may not be required (or even desired)
if you use P4 or Perforce.  Without this flag, no files were being written.

### Note about Read-only files

Since I'm using Git for SCM, it makes zero sense to have read-only source files.
Before running ResavePackages, I forcefully removed the read-only status of all files
in my project dir:

```powershell
Get-ChildItem -Recurse | %{ if($_.IsReadOnly) {$_.IsReadOnly = $false} }
```

If I didn't do this, I'd get lots of errors about files not being saved that
needed to be saved.  You probably don't want to do this if you use P4 or Plastic.


# Thank you!

Special thanks to [Nick Darnell](https://www.nickdarnell.com/) @ Epic Games
and `Ryan.DowlingSoka [BioWare]`
from [benui's Discord](https://discord.benui.ca/)
who helped me figure out why the Editor was loading my project so slowly
and how to fix it.
