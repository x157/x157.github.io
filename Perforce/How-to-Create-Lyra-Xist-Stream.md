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

Make sure you have already
[imported `//Lyra/Main`](./How-to-Create-Lyra-Main-Stream)
before you proceed.


## Procedure Overview

- Create Stream: `//Lyra/Xist`
  - Child of `//Lyra/Main`
- Create Workspace
  - Initialize Workspace


# Create Stream: `//Lyra/Xist`

##### Set up Powershell variables & environment

```powershell
$WorkspaceName = "Lyra_Xist"  # Set to your preference

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
p4 stream -t development -P //Lyra/Main //Lyra/Xist

# create workspace ($env:P4CLIENT) for Main stream
p4 workspace -S //Lyra/Xist
```

##### Populate new stream with `//Lyra/Main` files

```powershell
# Populate from parent //Lyra/Main files
p4 populate -S //Lyra/Xist -r

# Sync newly populated files into local workspace
p4 sync
```


## Ready to create Lyra Xist Games

Now that you have `//Lyra/Xist`, you are ready to start making games!

[How to Create a `//Lyra/XistGame` Stream](./How-to-Create-Lyra-Xist-Game-Stream)
