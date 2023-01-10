---
title: "Lyra: How to ResaveAssets for Lyra 5.1"
description: "Commands to fix Lyra 5.1 assets and improve Editor startup time"
breadcrumb_path: "UE5/LyraStarterGame"
breadcrumb_name: "Resave Lyra 5.1 Assets"
---

# Resave Lyra 5.1 Assets

There is a bug in Lyra's DDC handling regarding some animation assets and
particle systems.  The fix involves simply re-saving the affected assets.

##### Set up PowerShell variables

```powershell
# Path to your Unreal Editor (the "-Cmd" version)
$UnrealEd = "E:/XUE51/Engine/Binaries/Win64/UnrealEditor-Win64-Debug-Cmd.exe"

# Path to your .uproject file
$UProject = "D:/Dev/Lyra_Xist/XistGame.uproject"
```

##### Run the `ResavePackages` Commandlet on specific Game Content folders

```powershell
& $UnrealEd $UProject -run=ResavePackages `
    -PackageFolder=/Game/Characters/Heroes/Mannequin/Animations/Locomotion/ `
    -PackageFolder=/Game/Effects/Camera/ `
    -PackageFolder=/Game/Effects/NiagaraModules/ `
    -PackageFolder=/Game/Effects/Particles/ `
    -AutoCheckOut -BatchSourceControl `
    -IgnoreChangelist -NoShaderCompile -GCFREQ=1000
```

This will auto check out, but **not IN**, all the files it rewrites.
This will take some time, perhaps up to an hour.

Review the changes and submit them to the server when you're happy with them.

### Note about Source Control

It seems like you need to compile Lyra, start it up and enable Source Control
to hook it up to Perforce.  Otherwise the command will fail with lots of
"could not check out file" warnings.

### Did it work?

You'll know it worked by running this test:

Stop the Editor, start it again.
You will see it compute DDC for all the animations and Niagara systems.
*(The same thing you always see when you start Lyra)*.

After it computes the DDC, stop the Editor again, restart it again.
This time it should start much faster, as it reads the DDC rather than
always writing new DDC for these assets.

For more info, see [Re-save Assets on Engine Update](/UE5/Engine/Resave-Assets).
