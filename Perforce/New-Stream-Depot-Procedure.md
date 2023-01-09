---
title: "Perforce (P4) New Stream Depot Procedure"
description: "Procedure for creating and initializing a new Stream Depot in Perforce"
breadcrumb_path: "Perforce"
breadcrumb_name: "New Stream Depot Procedure"
---

# New Stream Depot Procedure

There is a ton of info in the
[Official Docs](https://www.perforce.com/manuals/p4guide/Content/P4Guide/tutorial.create-depot.html)
covering related topics, including
[basic initial setup tasks](https://www.perforce.com/manuals/p4guide/Content/P4Guide/basic-tasks.initial.html).

Here I've combined many of those articles into a procedure
to create a new `Lyra` Stream Depot with a single `Main` stream.

Once you have the `Main` stream created and initialized with a `LyraStarterGame` project,
you can then create other streams based on this  as needed.
(See [How to use Perforce Streams 101](https://www.perforce.com/blog/vcs/how-use-perforce-streams-101)
for more info).


## Procedure Overview

- Set up P4 Server [Typemap](./Typemap) **before** you import anything
- Create Stream Depot: `Lyra`
- Create Stream: `//Lyra/Main`
  - Copy New `LyraStarterGame` Project Contents
  - Add `.p4ignore` (see [Example `.p4ignore`](/Perforce/p4ignore))
  - Add all non-ignored Content to P4

Now you can create any number of projects you want based on `//Lyra/Main`


# Create Depot: `Lyra`

```powershell
p4 depot -t stream Lyra
```


# Create Stream: `//Lyra/Main`

##### Set up Powershell variables & environment

```powershell
# change P4USER if your P4 username != your Windows username
$env:P4USER = $env:UserName
$env:P4CLIENT = "Lyra_Main_${env:P4USER}"  # P4 workspace name

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
p4 submit -d "Initialize stream with .p4ignore"
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

For more info RE pros & cons either way, see
[Extending Lyra: Development Considerations](/UE5/LyraStarterGame/Development-Considerations)
