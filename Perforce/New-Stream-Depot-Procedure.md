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


# Create Depot: `Lyra`

```powershell
p4 depot -t stream Lyra
```


# Create Stream: `//Lyra/Main`

```powershell
###
### Set up Powershell variables & environment
###

# change P4USER if your P4 username != your Windows username
$env:P4USER = $env:UserName
$env:P4CLIENT = "Lyra_Main_${env:P4USER}"  # P4 workspace name

# cd to the local dir where you want these files to be stored
# (create an empty directory if needed)
$WorkspaceDir = "D:/Dev/$env:P4CLIENT"

# Create $WorkspaceDir if it does not exist, and cd to it
if (!(Test-Path $WorkspaceDir)) {mkdir $WorkspaceDir}
cd $WorkspaceDir

###
### Create Main Stream + Workspace
###

# Create Main Stream
p4 stream -t mainline //Lyra/Main

# create workspace ($env:P4CLIENT) for Main stream
p4 client -S //Lyra/Main

###
### Copy your existing project files (if any) into the workspace
###

# Example: Copy D:/Other/Source recursively
cp -Recurse D:/Other/Source/* $WorkspaceDir
# At the very least you want a .p4ignore file

# UNSET read-only flags on all files we copied
# (P4 will mark them read only if needed when we add the files to P4, based on your typemap)
Get-ChildItem -Recurse | %{ if($_.IsReadOnly) {$_.IsReadOnly = $false} }

###
### Now is your last chance to make changes to these files before we commit.
### Run a sample build, try it out in Editor, do whatever you need to do.
###

# FIRST: Add .p4ignore to the stream so we don't add stuff we don't care about
p4 add .p4ignore
p4 submit -d "Initialize stream with .p4ignore"

# SECOND: Recursively add all non-ignored files
p4 add ...
p4 submit -d "Initial Import"
```


# Create Stream: `//Lyra/Dev`

```powershell
###
### Set up Powershell variables & environment
###

# change P4USER if your P4 username != your Windows username
$env:P4USER = $env:UserName
$env:P4CLIENT = "Lyra_Dev_${env:P4USER}"  # P4 workspace name

# cd to the local dir where you want these files to be stored
# (create an empty directory if needed)
$WorkspaceDir = "D:/Dev/$env:P4CLIENT"

# Create $WorkspaceDir if it does not exist, then cd into it
if (!(Test-Path $WorkspaceDir)) {mkdir $WorkspaceDir}
cd $WorkspaceDir

###
### Create Dev Stream + Workspace
###

# Create Dev Stream (based on Main)
p4 stream -t development -P //Lyra/Main //Lyra/Dev

# create workspace ($env:P4CLIENT) for Dev stream
p4 client -S //Lyra/Dev

# initially populate the Dev branch based on the Main branch
p4 populate -d "From Main" -S //Lyra/Dev -r
p4 sync
```


# Future Merging

`p4 populate` only works to initially populate the `Dev` branch.

In the future when you want to pull `Main` files into `Dev`, you need to use `p4 integ` instead:

```powershell
p4 integ //Lyra/Main/... //Lyra/Dev/...
```
