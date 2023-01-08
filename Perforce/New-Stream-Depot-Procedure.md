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
to create a new `XaiLife` Stream Depot with 2 streams: `Main` and `Dev`.  We then populate `Main`
with some initial content, and create a `Dev` stream base on `Main`.

The intent is that thereafter you work on the `Dev` Stream primarily, and only merge back into `Main`
when you have something stable to share with non-technicals.


## Create Depot: `XaiLife`

```powershell
p4 depot -t stream XaiLife
```


## Create Stream: `//XaiLife/Main`

```powershell
# change P4USER if your P4 username != your Windows username
$env:P4USER = $env:UserName
$env:P4CLIENT = "XaiLife_Main_${env:P4USER}"  # P4 workspace name

# cd to the local dir where you want these files to be stored
# (create an empty directory if needed)
$WorkspaceDir = "D:/Dev/$env:P4CLIENT"

# Create $WorkspaceDir if it does not exist, then cd into it
if (!(Test-Path $WorkspaceDir)) {mkdir $WorkspaceDir}
cd $WorkspaceDir

# Create Main Stream
p4 stream -t Mainline //XaiLife/Main

# create workspace for Main stream
p4 client -S //XaiLife/Main

# Example: Copy D:/Other/Source recursively
cp -Recurse D:/Other/Source/* $WorkspaceDir
# At the very least you want a .p4ignore file

# UNSET read-only flags on all files we copied
# (P4 will mark them read only after we explicitly add them to the workspace)
Get-ChildItem -Recurse | %{ if($_.IsReadOnly) {$_.IsReadOnly = $false} }

#
# Now is your last chance to make changes to these files before we commit.
# Run a sample build, try it out in Editor, do whatever you need to do.
#

# FIRST: Add .p4ignore to the stream so we don't add stuff we don't care about
p4 add .p4ignore
p4 submit -d "Initialize Stream with .p4ignore"

# SECOND: Recursively add all non-ignored files
p4 add ...
p4 submit -d "Initial Import"
```


## Create Stream: `//XaiLife/Dev`

```powershell
# change P4USER if your P4 username != your Windows username
$env:P4USER = $env:UserName
$env:P4CLIENT = "XaiLife_Dev_${env:P4USER}"  # P4 workspace name

# cd to the local dir where you want these files to be stored
# (create an empty directory if needed)
$WorkspaceDir = "D:/Dev/$env:P4CLIENT"

# Create $WorkspaceDir if it does not exist, then cd into it
if (!(Test-Path $WorkspaceDir)) {mkdir $WorkspaceDir}
cd $WorkspaceDir

# Create Dev Stream (based on Main)
p4 stream -t Development -P //XaiLife/Main //XaiLife/Dev

# create workspace for Dev stream
p4 client -S //XaiLife/Dev

# initially populate the Dev branch based on the current Main branch
p4 populate -d "From Main" -S //XaiLife/Dev -r
p4 sync
```


## Future Merging

`p4 populate` only works to initially populate the `Dev` branch.

In the future when you want to pull `Main` files into `Dev`, you need to use `p4 integ` instead:

```powershell
p4 integ //XaiLife/Main/... //XaiLife/Dev/...
```
