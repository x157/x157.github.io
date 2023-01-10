---
title: "Perforce: How to Create the //Lyra/Main Stream"
description: "Procedure for creating a //Lyra/Main P4 Stream based on a LyraStarterGame project"
breadcrumb_path: "Perforce"
breadcrumb_name: "Lyra Main Stream"
---

# How to Create the `//Lyra/Main` Stream

The `//Lyra/Main` stream is a brand new, empty `LyraStarterGame` project.


## Procedure Overview

You must have successfully [set up the `//Lyra` Depot](./How-to-Create-Lyra-Depot).

- Create Stream: `//Lyra/Main`
  - Copy New `LyraStarterGame` Project Contents
  - Add `.p4ignore` (see [Example `.p4ignore`](/Perforce/p4ignore))
  - Add all non-ignored Content to P4

### Summary of Result

- P4 Stream `//Lyra/Main` contains a blank [`LyraStarterGame`](/UE5/LyraStarterGame/) project
- P4 Workspace `Lyra_Main_$(P4USER)` is mapped to `//Lyra/Main`
  - Stored locally in `D:/Dev/Lyra_Main`

[After Setup: Derive new `//Lyra/Xist` stream from `//Lyra/Main`](./How-to-Create-Lyra-Xist-Stream)


# Create Stream: `//Lyra/Main`

##### Set up Powershell variables & environment

```powershell
$WorkspaceName = "Lyra_Main"  # Set to your preference

# Set environment variable: P4 Username
$env:P4USER = $env:UserName;  # Change if your P4USER != your PowerShell UserName

# Set environment variable: P4 Workspace Name (P4CLIENT)
#   Each P4USER gets their own workspace on the server
$env:P4CLIENT = "${WorkspaceName}_${env:P4USER}"  # P4 server uses _$P4USER suffix

# Location where you want to store your local Workspace content
$WorkspaceDir = "D:/Dev/$WorkspaceName"
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

## Copy `LyraStarterGame` Project Contents

```powershell
# Example: Recursive Copy D:/Dev/LyraStarterGame into Workspace dir
cp -Recurse D:/Dev/LyraStarterGame/* $WorkspaceDir
```

From where you copy your Lyra project source is up to you.
Copy it from wherever it is into the `$WorkspaceDir`.

##### Unset read-only attribute for all newly copied files

```powershell
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

- [How to: Create the `//Lyra/Xist` Stream](./How-to-Create-Lyra-Xist-Stream)
  - Customize `//Lyra/Main` into my own reusable `//Lyra/Xist`

You may or may not want to start hacking away at Lyra.
Sometimes that is a good idea.
Other times it is not.

To determine what makes sense for you, see
[Extending Lyra: Development Considerations](/UE5/LyraStarterGame/Development-Considerations)
