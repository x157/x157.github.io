---
title: "Perforce: How to Create the //Lyra/Xist Stream"
description: "Procedure for creating the //Lyra/Xist Stream, to save all LYRAGAME_API and other Lyra hacks for easy reuse by many projects."
breadcrumb_path: "Perforce"
breadcrumb_name: "Lyra Xist Stream"
---

# How to Create the `//Lyra/Xist` Stream

It is impossible to use Lyra without *SOME* amount of hacking.
Ideally I try to keep it to a minimum.

To reduce repetition, I created a custom Lyra stream based on
`//Lyra/Main`, called `//Lyra/Xist`.
This is my custom Lyra, with all my `LYRAGAME_API`, `virtual`
and other hacks applied to it.

I'll base all my future Lyra projects on my own custom `//Lyra/Xist`
version of Lyra.


## Procedure Overview

You must have successfully
[imported `//Lyra/Main`](./How-to-Create-Lyra-Main-Stream).

- Create Stream: `//Lyra/Xist` with Parent: `//Lyra/Main`
- Create Workspace
- Populate Workspace with Parent Data
- Sync Stream

### Summary of Result

- P4 Stream `//Lyra/Xist` will contain a modified [`//Lyra/Main`](./How-to-Create-Lyra-Main-Stream) stream
- P4 Workspace `Lyra_Xist_$(P4USER)` will be mapped to `//Lyra/Xist`
  - Stored locally in `D:/Dev/Lyra_Xist`

[After Setup: Resave Lyra 5.1 Packages](/UE5/LyraStarterGame/How-To-Resave-Assets-v5.1) to speed up Editor load times
in all future projects based on `//Lyra/Xist`.

[After Setup: Derive new `//Lyra/XistGame` stream from `//Lyra/Xist`](./How-to-Create-Lyra-Xist-Game-Stream)


# Create Stream: `//Lyra/Xist`

## Set up Powershell variables & environment

```powershell
$StreamName = "Xist"  # Set to your preference

$WorkspaceName = "Lyra_$StreamName"

# change P4USER if your P4 username != your Windows username
$env:P4USER = $env:UserName
$env:P4CLIENT = "${WorkspaceName}_${env:P4USER}"  # P4 server uses _$P4USER suffix

# Location where you want to store your local Workspace content
$WorkspaceDir = "D:/Dev/$WorkspaceName"
```

## Create Stream: `//Lyra/$StreamName`

```powershell
# Create //Lyra/$StreamName with Parent //Lyra/Main
p4 stream -t development -P //Lyra/Main //Lyra/$StreamName
```

# Create Workspace `Lyra_Xist_$(P4USER)`

Must be in `$WorkspaceDir` current directory when running `p4 workspace`.

```powershell
# make dir $WorkspaceDir if needed
if (!(Test-Path $WorkspaceDir)) {mkdir $WorkspaceDir}

# create workspace ($env:P4CLIENT) for new stream
cd $WorkspaceDir  # set current directory = $WorkspaceDir for `p4 workspace`
p4 workspace -S //Lyra/$StreamName
```

## Populate new stream with Parent files

```powershell
# Populate from parent stream
p4 populate -S //Lyra/$StreamName -r
```

## Sync Stream

```powershell
# Sync newly populated files into local workspace
p4 sync
```


## Ready to create Lyra Xist Games

Now that you have `//Lyra/Xist`, you are ready to start making games!

[How to Create a `//Lyra/XistGame` Stream](./How-to-Create-Lyra-Xist-Game-Stream)
