---
title: "Perforce: How to Create a //Lyra/XistGame Stream"
description: "Procedure for creating a new //Lyra/XistGame Stream"
breadcrumb_path: "Perforce"
breadcrumb_name: "Lyra Xist Game Stream"
---

# How to Create a `//Lyra/XistGame` Stream

Time to create a new Lyra game!  We'll call it `XistGame`.
Call yours whatever you want.


## Procedure Overview

You must have successfully
[created `//Lyra/Xist`](./How-to-Create-Lyra-Xist-Stream).

- Create Stream: `//Lyra/XistGame`
  - Child of `//Lyra/Xist`
- Create Workspace
- Sync with Parent Stream

### Summary of Result

- P4 Stream `//Lyra/XistGame` contains a fresh New Game project
- P4 Workspace `XistGame_$(P4USER)` is mapped to `//Lyra/XistGame`
  - Stored locally in `D:/Dev/XistGame`

**Go work on your game!**


# Create Stream: `//Lyra/XistGame`

##### Set up Powershell variables & environment

```powershell
$WorkspaceName = "XistGame"  # Set to your preference

# change P4USER if your P4 username != your Windows username
$env:P4USER = $env:UserName
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
p4 stream -t development -P //Lyra/Xist //Lyra/XistGame

# create workspace ($env:P4CLIENT) for Main stream
p4 workspace -S //Lyra/XistGame
```

##### Populate new stream with `//Lyra/Xist` files

```powershell
# Populate from parent //Lyra/Xist files
p4 populate -S //Lyra/XistGame -r

# Sync newly populated files into local workspace
p4 sync
```


# Work on your Game

Edit the files in your local workspace `$WorkspaceDir`.

When you make changes to your game that you want to keep, `p4 add` and `p4 submit`
to copy them up to the P4 server `//Lyra/XistGame` stream.

You can use `p4v` as a GUI during your ordinary workflow.
You don't have to use the command-line once you have everything initially set up.
