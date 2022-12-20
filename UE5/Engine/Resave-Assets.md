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
& $UnrealEd $UProject -run=ResavePackages -NoShaderCompile -IgnoreChangelist
```

In reality, you probably want to constrain it to a sub-set of the project, and not include
the entire project (which also includes the entire Engine by default,
and will add many hours of runtime).

Example:

```powershell
& $UnrealEd $UProject -run=ResavePackages -NoShaderCompile -IgnoreChangelist -PackageFolder=/Game/
& $UnrealEd $UProject -run=ResavePackages -NoShaderCompile -IgnoreChangelist -PackageFolder=/ShooterCore/
& $UnrealEd $UProject -run=ResavePackages -NoShaderCompile -IgnoreChangelist -PackageFolder=/XistGame/
# ... etc ...
```

### Note about `-IgnoreChangelist`

I may have had to do this since I'm using Git?  This may not be required (or even desired)
if you use P4 or Perforce.  Without this flag, no files were being written.

### Note about Read-only files

Since I'm using Git for SCM, it makes zero sense to have read-only source files.
Before running ResavePackages, I forcefully removed the read-only status of all files
in my project dir:

```powershell
# Print a recursive list of all read only files under the current directory
Get-ChildItem -Recurse | %{ if($_.IsReadOnly) {Write-Host $_.FullName} }

# cd to your project dir before you run this!
# Remove the read only flag from all read only files under the current directory
Get-ChildItem -Recurse | %{ if($_.IsReadOnly) {$_.IsReadOnly = $false} }
```

If I didn't do this, I'd get lots of errors about files not being saved that
needed to be saved.  You probably don't want to do this if you use P4 or Plastic.
Instead, you'd want to use the `-AutoCheckOut` and possibly the `-AutoCheckIn` switches.


## Limit which Packages are Re-saved

There are a few ways you can limit which packages get re-saved:

- `-Package=PackageName`
  - Can list multiple packages with multiple arguments
- `-PackageFolder=/Package/`
  - Only re-save packages in `/Package/` folder hierarchy, e.g. for Lyra try:
    - `-PackageFolder=/Game/`
    - `-PackageFolder=/Game/Characters/Heroes/Mannequin/Animations/`
    - `-PackageFolder=/ShooterCore/`
    - etc
  - Can list multiple folders with multiple arguments
- `-Map=Map1+Map2+Map3`
  - Only re-save packages used by this `+` delimited list of Maps
- `-File=Filename`
  - Reads a newline-delimited list of Package Files from the text file `Filename`
- `-FilterByCollection=CollectionName`
  - Only saves packages in the named collection


## Other Switches

Other useful switches that you may wish to study:

- `-NoShaderCompile` will disable shader compiling, maybe that's what you want, maybe it isn't
  - It seems like this switch significantly speeds up the process...
- `-OnlySaveDirtyPackages` will not actually save the file unless it really changed
  - If you don't use this, *every* asset will be rewritten, even those with no changes at all
  - Unfortunately, using this may mean that some files are *not* rewritten that **should be** rewritten.
    - For example, apparently Animations in UE 5.1 use a DDC key that involves the UE version
      **that the animation was saved with**,
      and NOT the UE version that is actually running at the time. (Bug? Seems like it.)
    - Thus, you must rewrite all animations every time you update the engine, or the DDC will never be used for them. (Must be a bug)
- `-Verify` gives insight into when files aren't being written because they're read-only

### Build Switches

- `-BuildLighting` (requires `-AllowCommandletRendering`)
- `-BuildNavigationData`
- `-BuildHLOD`

## Switches only for use with P4 or Plastic

These switches are meaningless if you use Git.

- `-AutoCheckOut` automatically check out files before saving
- `-AutoCheckIn` automatically check in files after saving
- `-BatchSourceControl` presumably helps not clobber your P4/Plastic server


# Thank you!

Special thanks to [Nick Darnell](https://www.nickdarnell.com/)
and [Ryan DowlingSoka](https://ryandowlingsoka.com/)
from [benui's Discord](https://discord.benui.ca/)
who helped me figure out why the Editor was loading my project so slowly
and how to fix it.
