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
to create a new `Lyra` Stream Depot with 2 streams: `Main` and `Dev`.  We then populate `Main`
with some initial content, and create a `Dev` stream based on `Main`.

The intent is that thereafter you work on the `Dev` Stream primarily, and only merge back into `Main`
when you have something stable to share with non-technicals.


## Before you Proceed

Make sure your P4 server is set up, including its [typemap](./Typemap).

This procedure will have you submitting files to P4, they will be stored incorrectly if you have
not correctly configured your typemap.


# Procedure Overview

- Set up P4 Server [Typemap](./Typemap)
- Create Stream Depot: `Lyra`
- Create Stream: `//Lyra/Main`
  - Setup Contents of Initial Import (new `LyraStarterGame` project)
  - Add `.p4ignore` ([Example `.p4ignore`](/Perforce/p4ignore))
  - Add all non-ignored Content to P4
- Create Stream: `//Lyra/Dev` (based on `//Lyra/Main`)
  - Copy contents of `//Lyra/Main`


# Create Depot: `Lyra`

```powershell
p4 depot -t stream Lyra
```

---
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
p4 workspace -s -S //Lyra/Main
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


---
# Create Stream: `//Lyra/Dev`

##### Set up PowerShell variables & environment

```powershell
# change P4USER if your P4 username != your Windows username
$env:P4USER = $env:UserName
$env:P4CLIENT = "Lyra_Dev_${env:P4USER}"  # P4 workspace name

# cd to the local dir where you want these files to be stored
# (create an empty directory if needed)
$WorkspaceDir = "D:/Dev/$env:P4CLIENT"
```

##### CD to `$WorkspaceDir` (create empty dir if needed)
```powershell
if (!(Test-Path $WorkspaceDir)) {mkdir $WorkspaceDir}

cd $WorkspaceDir
```

##### Create Dev Stream + Workspace
```powershell
# Create Dev Stream (based on Main)
p4 stream -t development -P //Lyra/Main //Lyra/Dev

# create workspace ($env:P4CLIENT) for Dev stream
p4 workspace -s -S //Lyra/Dev
```

##### Populate the Dev branch based on the Main branch
```powershell
p4 populate -d "From Main" -S //Lyra/Dev -r
p4 sync
```


---
# Future Merging

`p4 populate` only works to initially populate the `Dev` branch.

In the future when you want to pull `Main` files into `Dev`, you need to use `p4 integ` instead:

```powershell
p4 integ //Lyra/Main/... //Lyra/Dev/...
```
