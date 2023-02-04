---
title: "Perforce: How to Create a New Engine Source Depot"
description: "Procedure for creating an Unreal Engine Source Depot, downstream from Epic Games GitHub/Perforce"
breadcrumb_path: "Perforce"
breadcrumb_name: "Create a New Engine Source Depot"
---

# How to Create a New Engine Source Depot

1. Create Depot `//UE5`
2. Create Mainline Stream `//UE5/Release`
  - Import Epic Custom Engine Source from either GitHub or UDN P4
3. Create Task Stream `//UE5/Xist` with parent `//UE5/Release`
  - Apply Xist hacks/edits to this custom 5.1 engine


# Set up Powershell variables

The following variables must be set for these PowerShell commands to work.

You can set them to the values you prefer.

```powershell
$DepotName = "UE5"  # Set to your preference, e.g. "//UE5/..."
$TaskName = "Xist"  # The code name of your Custom Engine

# Computed based on above: Stream Names:
$UE5ReleaseStream = "//$DepotName/Release"  # e.g. //UE5/Release
$TaskStream = "//$DepotName/$TaskName"      # e.g. //UE5/Xist

# Computed based on above: Workspace Names:
$EpicWorkspaceName = "${DepotName}_Release"      # e.g. UE5_Release
$TaskWorkspaceName = "${DepotName}_${TaskName}"  # e.g. UE5_Xist

# Computed based on above: Local Workspace Directories:
$EpicWorkspaceDir = "D:/$EpicWorkspaceName"  # e.g. D:/UE5_Release
$TaskWorkspaceDir = "D:/$TaskWorkspaceName"  # e.g. D:/UE5_Xist

# Read your p4 username, either as set in ENV, or read from $(p4 info)
$P4USER = $env:P4USER ? $env:P4USER `
    : (p4 info | where {$_ -imatch '^User\s+name:'} | %{$_ -ireplace '^User\s+name:\s*',''})
```

## Create Depot: `$DepotName`

```powershell
# Create a Stream depot
p4 depot -t stream $DepotName
```

### Set up Typemap

```powershell
cat typemap.txt | p4 typemap -i
```

See [Typemap](./Typemap) to figure out what to use as the `typemap.txt` contents.

Make sure you set up the typemap before you import any content into the depot.


## Create Stream: `$UE5ReleaseStream`

```powershell
# Create stream $UE5ReleaseStream (aka //$DepotName/Release)
p4 stream -t mainline $UE5ReleaseStream
```

### Import UE 5.1 Source from Epic

#### Create Workspace Local Directory and Server Client

```powershell
# make dir $EpicWorkspaceDir if needed and cd to $EpicWorkspaceDir
# this will cause this dir to be the default when we next create the client on the server
if (!(Test-Path $EpicWorkspaceDir)) {mkdir $EpicWorkspaceDir}
cd $EpicWorkspaceDir  # set current directory = $EpicWorkspaceDir for `p4 workspace`

# create server workspace for $UE5ReleaseStream (unique to user)
$env:P4CLIENT = "${EpicWorkspaceName}_$P4USER"  # set ENV P4CLIENT override
p4 workspace -S $UE5ReleaseStream
$env:P4CLIENT = $null  # unset ENV P4CLIENT override
```


## Copy `UnrealEngine` Source into `$UE5ReleaseStream` workspace

In this example we're copying from a cloned GitHub repository.
If you have UDN access, you could instead use your UDN P4 workspace folder.

```powershell
# Example: Recursive Copy D:/GitHub/UnrealEngine into Workspace dir
cp -Recurse D:/GitHub/UnrealEngine/* $EpicWorkspaceDir
```

From where you copy your UE5 Engine source is up to you.
Copy it from wherever it is into the `$EpicWorkspaceDir`.

You may or may not want to try clearing the read-only attributes
of the files you are importing.  I was having some permissions issues
copying files from UDN's P4 server, but it may not be necessary for Git sources.
It won't hurt Git though, as no files need to be read only in a Git repo.

```powershell
# UNSET read-only flags on all files we copied
# (P4 will mark them read only if needed when we add the files to P4, based on your typemap)
Get-ChildItem -Path $EpicWorkspaceDir -Recurse | %{ if($_.IsReadOnly) {$_.IsReadOnly = $false} }
```

## Add initial `.p4ignore` so we don't import anything we don't want to import

For example something like the **Engine Source** specific version of
[`engine.p4ignore` example on GitHub](https://github.com/XistGG/Perforce-Setup/blob/main/engine.p4ignore)

```powershell
cd $EpicWorkspaceDir

p4 add .p4ignore
p4 submit -d "Initial .p4ignore"
```

## Recursively add all non-ignored files

The `-f` flag causes files with special characters in their filenames (`@`, `#`, *etc.*)
to be added as well.

```powershell
cd $EpicWorkspaceDir

p4 add -f ...
p4 submit -d "Initial Import"
```

### This might crash

If you, like me, need to import 800K+ files, you may find that P4 isn't up to the task.
It will crash and trying to figure out where/how it crashed and how to fix it is a real pain.

I was able to import 800K+ files by splitting the `p4 add -f -n ...` output (800K+ lines of output)
into batches of 50K files at a time.

If that affects you, check out my helpful
[UnrealXistTools](https://github.com/XistGG/UnrealXistTools)
utility
[P4ImportBulk.ps1](https://github.com/XistGG/UnrealXistTools/blob/main/P4ImportBulk.ps1)
which will handle the batching for you.


## Create Task Stream: `$TaskStream`

```powershell
# Create stream $TaskStream (aka //UE5/Xist) based on $UE5ReleaseStream
p4 stream -t task -P $UE5ReleaseStream $TaskStream
```

## Create Custom Engine Workspace: `$TaskWorkspaceName`

```powershell
# make dir $TaskWorkspaceDir if needed and cd to $TaskWorkspaceDir
# this will cause this dir to be the default when we next create the client on the server
if (!(Test-Path $TaskWorkspaceDir)) {mkdir $TaskWorkspaceDir}
cd $TaskWorkspaceDir  # set current directory = $TaskWorkspaceDir for `p4 workspace`

# Set P4CLIENT env var for p4 workspace
$env:P4CLIENT = "${TaskWorkspaceName}_$P4USER"  # set ENV P4CLIENT override

# create server client for $TaskStream (unique to user)
p4 workspace -S $TaskStream
```

### Populate new stream with Parent files

```powershell
# Populate from parent stream
p4 populate -S $TaskStream -r
```

### Sync Stream

```powershell
# Set P4CLIENT env var for p4 sync
$env:P4CLIENT = "${TaskWorkspaceName}_$P4USER"  # set ENV P4CLIENT override

# Sync newly populated files into local workspace
p4 sync
```


## Apply Engine Hacks

You now have a custom engine.  Do whatever you need to do with your custom engine.
Your work should be saved in `$TaskStream`.

