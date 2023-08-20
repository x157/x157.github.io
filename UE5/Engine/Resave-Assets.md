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
[Resave Packages Commandlet](https://docs.unrealengine.com/5.1/en-US/API/Editor/UnrealEd/Commandlets/UResavePackagesCommandlet/)

*(If you are using World Partition, consider also the
[World Partition Resave Actors Commandlet](https://docs.unrealengine.com/5.0/en-US/world-partition-in-unreal-engine/#worldpartitionresaveactorsbuilder).
This doc discusses only the Resave Packges Commandlet.)*

For a project like
[Lyra](/UE5/LyraStarterGame/),
the `ResavePackages` commandlet takes a **very long time** to run.
It can potentially rewrite thousands of files.
If you run it on the entire Engine plus your Project,
it literally takes all day to run on a 16-core CPU with 64 GB DDR5 and M.2 SSDs.

After experimenting with some switches to limit what it was doing, I was able to cut
this runtime down to only a few hours.

`-NoShaderCompile` and `-ProjectOnly` worked great for my use case.
`-GCFREQ=1000` has also been reported to significantly decrease runtime.

Thankfully, you should only have to run Resave Packages once
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

# Execute Unreal Editor ResavePackages Commandlet
& $UnrealEd $UProject -run=ResavePackages -NoShaderCompile -IgnoreChangelist -ProjectOnly
```

You can also run it only for specific game-mounted folder paths, like this:

```powershell
& $UnrealEd $UProject -run=ResavePackages -NoShaderCompile -IgnoreChangelist `
    -PackageFolder=/Game/ `
    -PackageFolder=/ShooterCore/ `
    -PackageFolder=/XistGame/Subdir1/ `
    -PackageFolder=/XistGame/Subdir2/
```

*Line continuation in Powershell is done via backtick `` ` ``
because Windows folders are delimited by `\`?
Looks funky...*

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

- `-ProjectOnly`
  - Exclude Engine packages
- `-SkipDeveloperFolders`
  - Exclude Developer Packages
- `-OnlyDeveloperFolders`
  - Only Include Developer Packages
- `-Package=PackageName`
  - Can list multiple packages with multiple arguments
- `-PackageFolder=/Package/`
  - Only re-save packages in `/Package/` folder hierarchy, e.g. for Lyra try:
    - `-PackageFolder=/Game/` (Lyra dir `/Content/`)
    - `-PackageFolder=/Game/Characters/Heroes/Mannequin/Animations/` (a specific Content folder)
    - `-PackageFolder=/ShooterCore/` (Lyra dir `/Plugins/GameFeatures/ShooterCore/Content/`)
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
- `-GCFREQ=1000` has been reported to significantly improve performance
  - In the example setting of 1000 it causes Garbage Collection to occur every 1000 packages
  - You can experiment with increasing/decreasing this number to see the effect on your hardware
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


# See Also

- [2016 Coconut Lizard blog post](https://www.coconutlizard.co.uk/blog/the-cook-the-resave-his-garbage-and-her-optimization/)
  - *Especially insightful regarding `-GCFREQ` value tuning for **your specific** use case*

If you have a UDN subscription, there is a discussion about the performance
of `ResavePackages` as well as when you may want to use
World Partition Resave Actors Builder Commandlet instead
(e.g. when you have 10000s of `__ExternalActors__` assets).

[UDN Thread: Resave Packages Commandlet Performance with One File Per Actor](https://udn.unrealengine.com/s/question/0D54z00007upQWQCA2/resave-packages-commandlet-performance-with-one-file-per-actor)


# Thank you!

Special thanks to [Nick Darnell](https://www.nickdarnell.com/)
and [Ryan DowlingSoka](https://ryandowlingsoka.com/)
from [benui's Discord](https://discord.benui.ca/)
who helped me figure out why the Editor was loading my project so slowly
and how to fix it.

Also thanks to `VesCodes` and `Anders Ljundberg` for providing additional useful info
that has been added to this doc.
