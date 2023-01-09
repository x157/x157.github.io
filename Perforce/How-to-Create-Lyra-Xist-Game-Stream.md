---
title: "Perforce: How to Create a //Lyra/XistGame Stream"
description: "Procedure for creating a new //Lyra/XistGame Stream"
breadcrumb_path: "Perforce"
breadcrumb_name: "Lyra Xist Game Stream"
---

# How to Create a `//Lyra/XistGame` Stream

Time to create a new Lyra game!  We'll call it `XistGame`.
Call yours whatever you want.

This is being based on `//Lyra/Xist`,
you must have completed its [set up](./How-to-Create-Lyra-Xist-Stream)
before you can base any streams on it.


## Procedure Overview

- Create Stream: `//Lyra/XistGame`
  - Child of `//Lyra/Xist`
- Create Workspace
  - Initialize Workspace


# Create Stream: `//Lyra/XistGame`

##### Set up Powershell variables & environment

```powershell
# change P4USER if your P4 username != your Windows username
$env:P4USER = $env:UserName
$env:P4CLIENT = "Lyra_XistGame_${env:P4USER}"  # P4 workspace name

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
