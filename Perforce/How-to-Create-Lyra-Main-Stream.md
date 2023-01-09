---
title: "Perforce: How to Create the //Lyra/Main Stream"
description: "Procedure for creating a //Lyra/Main P4 Stream based on a LyraStarterGame project"
breadcrumb_path: "Perforce"
breadcrumb_name: "Lyra Main Stream"
---

# How to Create the `//Lyra/Main` Stream

The `//Lyra/Main` stream is a brand new, empty `LyraStarterGame` project.


## Procedure Overview

- Make sure you already [set up the `//Lyra` Depot](./How-to-Create-Lyra-Depot)
- Create Stream: `//Lyra/Main`
  - Copy New `LyraStarterGame` Project Contents
  - Add `.p4ignore` (see [Example `.p4ignore`](/Perforce/p4ignore))
  - Add all non-ignored Content to P4

### Summary of Result

- P4 Stream `//Lyra/Main` contains a blank [`LyraStarterGame`](/UE5/LyraStarterGame/) project
- P4 Workspace `Lyra_Main_$(P4USER)` is mapped to `//Lyra/Main`
  - Stored locally in `D:/Dev/Lyra_Main_$(P4USER)`

Now you can create any number of projects you want based on `//Lyra/Main`


# Create Stream: `//Lyra/Main`

##### Set up Powershell variables & environment

```powershell
# Set environment variable: P4 Username
$env:P4USER = $env:UserName;  # Change if your P4USER != your PowerShell UserName

# Set environment variable: P4 Workspace Name (P4CLIENT)
#   Each P4USER gets their own workspace
$env:P4CLIENT = "Lyra_Main_${env:P4USER}"

# Location where you want to store your local Workspace content
$WorkspaceDir = "D:/Dev/$env:P4CLIENT"
```

##### CD to `$WorkspaceDir` (create empty dir if needed)

```powershell
if (!(Test-Path $WorkspaceDir)) {mkdir $WorkspaceDir}

cd $WorkspaceDir
```

##### Create Main Stream & Workspace

```powershell
# Create Main Stream
p4 stream -t mainline //Lyra/Main

# create workspace ($env:P4CLIENT) for Main stream
p4 workspace -S //Lyra/Main
```

##### Copy your existing project files (if any) into the workspace
```powershell
# Example: Recursive Copy D:/Dev/LyraStarterGame into Workspace Root
cp -Recurse D:/Dev/LyraStarterGame/* $WorkspaceDir

# UNSET read-only flags on all files we copied
# (P4 will mark them read only if needed when we add the files to P4, based on your typemap)
Get-ChildItem -Recurse | %{ if($_.IsReadOnly) {$_.IsReadOnly = $false} }
```

##### Add initial `.p4ignore` so we don't import anything we don't want to import

See [Example `.p4ignore` file](/Perforce/p4ignore).
You MUST provide a reasonable `.p4ignore`.

```powershell
p4 add .p4ignore
p4 submit -d "Initial .p4ignore"
```

##### Recursively add all non-ignored files
```powershell
p4 add ...
p4 submit -d "Initial Import"
```


# Congratulations! You have Imported Lyra

You now have a fully initialized `//Lyra/Main` stream.

You can either decide to start hacking on this stream directly,
or you can create child streams based on this for your own purposes.

- [Extending Lyra: Development Considerations](/UE5/LyraStarterGame/Development-Considerations)
  - Help to decide whether to hack Lyra directly or via plugins
- [How to: Create the `//Lyra/Xist` Stream](./How-to-Create-Lyra-Xist-Stream)
  - Customize `//Lyra/Main` into my own reusable `//Lyra/Xist`
