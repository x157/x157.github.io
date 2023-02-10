---
title: "Procedure: Merge Epic Source into Perforce | UE5 Lyra"
description: "PowerShell documentation of a recommended procedure for merging Epic upstream source code into your Perforce project depot."
breadcrumb_path: "UE5/LyraStarterGame/Tutorials"
breadcrumb_name: "Merge Epic into Perforce"
---

# Merge Epic Source into Perforce

If you've set up your Perforce repo in [the same way as me](/Perforce/) then you can use
this procedure to merge upstream code and asset updates from Epic
into your local project Perforce depot.

## How Epic Distributes Source

There are 2 ways to get source from Epic.

1. GitHub + Epic Games Launcher
2. UDN Perforce

UDN is a paid service that is generally only available to larger companies.
You don't necessarily need it - GitHub is free and updated regularly.

Regardless of where you get your upstream Epic Source, the procedures
for integrating it into your project repo is roughly the same.


## Overview

- Get the latest Source from UDN
- Integrate `//Lyra/Main`
- Merge the new `//Lyra/Main` into `//Lyra/Xist`
    - Merge the new `//Lyra/Xist` into `//Lyra/XistGame`
- Build `//Lyra/XistGame` with the latest Lyra 5.1+ on the latest Engine 5.1+

Now you get to go see all the new stuff, and all the newly broken stuff!  C'est la Dev!  `:-)`


# Execute Powershell

*DO NOT COPY/PASTE STUFF INTO YOUR CONSOLE WITHOUT UNDERSTANDING WHAT IT DOES. SECURITY IS A THING.*

If your computer melts after you copy/paste this, you'll know you've messed up.

## Set up PowerShell variables

Note: You should set these the same values you used when you created
your Perforce depot [following these instructions](/Perforce/).

```powershell
$UDN_USER = ""  # enter your UDN username here
$UDN_PORT = ""  # enter your UDN P4PORT here
$UDN_WORKSPACE = ""  # enter the name of your UDN workspace

$LyraMainWorkspaceDir = "D:/UDN/Lyra"
$LyraXistWorkspaceDir = "D:/Dev/Lyra_Xist"
$XistGameWorkspaceDir = "D:/Dev/XistGame"
```


## Get the latest Source from UDN

```powershell
$env:P4USER = $UDN_USER
$env:P4PORT = $UDN_PORT
$env:P4CLIENT = $UDN_WORKSPACE

cd $LyraMainWorkspaceDir

# Sync the latest from UDN
p4 sync ...`#head  # "#" begins a comment in PS, must escape it

# REMEMBER THE CHANGELIST number we synced; We will include this in the merge log message
$P4ChangesWords = $(p4 changes -m1 ...`#have).split(" ")  # Like "Change 123 on 2023/01/02 by user@workspace 'Doing some things'"
$UDNP4_HAVE_CL = $P4ChangesWords[1]  # the second word of output is the CL
```


## Import changes into `//Lyra/Main`

```powershell
$env:P4USER = $env:UserName
$env:P4PORT = "1666"  # your project P4 server
$env:P4CLIENT = "Lyra_Main_${env:P4USER}"

cd $LyraMainWorkspaceDir

p4 reconcile -f -m ...

################################################################################
###
###  Manually inspect the changelist created by reconcile.
###  You must manually resolve any files that cannot be auto-resolved.
###
################################################################################

# We're happy with changes, submit them to our P4
p4 submit -d "Import Lyra Main ...@$UDNP4_HAVE_CL"

# REMEMBER THE CHANGELIST number we synced; We will include this in the merge log message
$P4ChangesWords = $(p4 changes -m1 ...`#have).split(" ")  # Like "Change 123 on 2023/01/02 by user@workspace 'Doing some things'"
$LyraMain_HAVE_CL = $P4ChangesWords[1]  # the second word of output is the CL
```


## Merge `//Lyra/Main` into `//Lyra/Xist`

```powershell
$env:P4USER = $env:UserName
$env:P4PORT = "1666"  # your project P4 server
$env:P4CLIENT = "Lyra_Xist_${env:P4USER}"

cd $LyraXistWorkspaceDir

p4 integrate -b LyraMain_LyraXist //Lyra/Xist/...

################################################################################
###
###  Manually inspect the changelist created by integrate.
###  You must manually resolve any files that cannot be auto-resolved.
###
################################################################################

p4 submit -d "Integrate //Lyra/Main/...@$LyraMain_HAVE_CL"

# REMEMBER THE CHANGELIST number we synced; We will include this in the merge log message
$P4ChangesWords = $(p4 changes -m1 ...`#have).split(" ")  # Like "Change 123 on 2023/01/02 by user@workspace 'Doing some things'"
$LyraXist_HAVE_CL = $P4ChangesWords[1]  # the second word of output is the CL
```


## Merge `//Lyra/Xist` into `//Lyra/XistGame`

```powershell
$env:P4USER = $env:UserName
$env:P4PORT = "1666"  # your project P4 server
$env:P4CLIENT = "XistGame_${env:P4USER}"

cd $XistGameWorkspaceDir

p4 integrate -b LyraXist_XistGame //Lyra/XistGame/...

################################################################################
###
###  Manually inspect the changelist created by integrate.
###  You must manually resolve any files that cannot be auto-resolved.
###
################################################################################

p4 submit -d "Integrate //Lyra/Xist/...@$LyraXist_HAVE_CL"
```


# Build Game

- Clean Unreal Project & Generate Project Files
    - Run `UProjectClean.ps1` from [UnrealXistTools](https://github.com/XistGG/UnrealXistTools)
        - Remove all `Binaries` directories
        - Remove all `Intermediate` directories
        - Remove `*.sln`
        - Remove `.idea` (optional)
        - Remove `DerivedDataCache` (optional)
        - Exec `GenerateProjectFiles` for the project
- Rider `XistGame.uproject`
    - Build `XistGame` Project
        - Target = `Debug Editor`
