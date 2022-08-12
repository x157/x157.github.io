---
title: 'How to: Remove "Runtime" Suffix from GameFeature Plugin Code Names'
description: 'How to rename your GameFeature plugin code names from NAMERUNTIME_API to NAME_API'
breadcrumb_path: "UE5/GameFeatures"
breadcrumb_name: "Remove Runtime Name Suffix"
---


# How to: Remove "Runtime" Suffix from GameFeature Code Names

I found it annoying that my `XistGame` GameFeature plugin was
automatically code-named `XistGameRuntime` by the UE5 Editor,
which gave me cpp tags like `XISTGAMERUNTIME_API`.

And thus I set out to remove `Runtime` from my Plugin's code names.

This procedure is documented in **PowerShell 7**.

If you use PowerShell, you can literally copy/paste
most of this to rename your Plugin.

```text
Make sure you read and understand the code BEFORE you execute it.

I am not responsible for damage you may cause by misuse.

USE AT YOUR OWN RISK.
```

Though PowerShell supposedly works on Mac + Linux, I imagine many of you may not have it.
In your case, PowerShell is very easy to understand and you can use this as procedural
documentation to inspire you to do the same on your system.

**NOTE: THIS DOES NOT WORK ON BINARY `.uasset` FILES**

If you want to do this, you need to do it when you first create your GameFeature plugin,
**BEFORE** you start adding binary assets.

This procedure works on C++, C# and `uplugin` files but NOT on Blueprints.
Binary `.uasset` files are a pain.


# 1) Create New Game Feature Plugin in UE5 Editor

- Start UE5 Editor
- New Plugin: `XistGame`
    - `GameFeatures` Plugin **with C++** (yes we DO want C++)
    - This might take a bit, be patient.
- Shutdown Editor

You'll notice that you now have some files and directories with names like
`XistGameRuntime`,
which is not what you asked for.


# 2) Open PowerShell 7 Terminal

<tip>You MUST modify the following few lines of code to match your system.</tip>

```powershell
# Make sure you start in your project directory,
#  For example:
cd D:/Dev/LyraStarterGame # <-- REPLACE THIS WITH YOUR PROJECT DIRECTORY

# Plugin Code Name (NO SPACES)
$PluginName = "XistGame" # <-- REPLACE THIS WITH YOUR PLUGIN NAME

$RuntimeName = "${PluginName}Runtime" # E.g. "XistGameRuntime", the name we want to replace

# cd into the plugin directory
cd "Plugins/GameFeatures/$PluginName"
```

The rest of this page requires you to be in the above directory as paths are relative to here.


# 2.A) Delete previously generated binaries & project files

```powershell
# Remove any pre-generated binaries + project files that use the wrong names
Remove-Item -Force -Recurse -Path Binaries
Remove-Item -Force -Recurse -Path Intermediate
```

If you get errors that those directories do not exist, you can ignore them.

If you get other errors, investigate before you continue.


## 2.B) Rename Plugin Source Directory

```powershell
Write-Host "Change name:" Source/$RuntimeName "to" Source/$PluginName

Rename-Item -Path "Source/$RuntimeName" -NewName $PluginName
```

- Change name: Source/`XistGameRuntime` to Source/`XistGame`


## 2.C) Rename all `*XistGameRuntime*` Files and Directories

```powershell
# Recursive list all files/dirs with $RuntimeName in their name
$Items = Get-ChildItem -Recurse | Where {$_.Name -match $RuntimeName}

foreach ($I in $Items) {
    $NewName = $I.Name -replace $RuntimeName,$PluginName

    Write-Host "Rename" $I.Name "to" $NewName
    Rename-Item -Path $I.FullName -NewName $NewName
}
```

#### Output:

- Rename `XistGameRuntime.Build.cs` to `XistGame.Build.cs`
- Rename `XistGameRuntimeModule.cpp` to `XistGameModule.cpp`
- Rename `XistGameRuntimeModule.h` to `XistGameModule.h`


# 2.D) Replace String References in Code


## Replace `XistGameRuntime` string references in Source files

```powershell
# Grep output, 1 text match per line, at least 1+ line per matching file
$GrepMatch = Get-ChildItem -Recurse | Select-String $RuntimeName

# Filter grep output to get unique file paths
$Files = $GrepMatch | Select-Object Path | Sort-Object {$_.Path} | Get-Unique -AsString

# Replace all references of $RuntimeName in the affected $Files with $PluginName
foreach ($Item in ($Files | Get-Item)) {
    $old = Get-Content -Path $Item.FullName  # read file
    $new = $old.Replace($RuntimeName, $PluginName)  # replace XistGameRuntime references
    $new = $new.Replace($RuntimeName.ToUpper(), $PluginName.ToUpper())  # replace XISTGAMERUNTIME references
    Write-Host "Replace file:" $Item.Name
    $new | Set-Content -Path $Item.FullName  # write file with new contents
}
```

#### Output:

- Replace file: `XistGameModule.cpp`
- Replace file: `XistGameModule.h`
- Replace file: `XistGame.Build.cs`
- Replace file: `XistGame.uplugin`


# 3) Clean Rebuild Unreal Project

- Full clean `LyraStarterGame` project


- Rebuild Visual Studio Project Files


- Build `LyraStarterGame` project


It's possible you don't NEED to do a full clean and rebuild,
but that's generally what I like do with a change this significant.

You obviously don't need to rebuild your custom engine, if you have one.

To be on the safe side though you probably DO want to completely clean
and nuke all previously-generated assets in your own game project though.

I'm not sure what references there may be in there to old files that no
longer exist after these renames.
