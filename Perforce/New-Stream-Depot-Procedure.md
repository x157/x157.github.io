---
title: "Perforce (P4) New Stream Depot Procedure"
description: "Procedure for creating and initializing a new Stream Depot in Perforce"
breadcrumb_path: "Perforce"
breadcrumb_name: "New Stream Depot Procedure"
---

# New Stream Depot Procedure

There is a ton of info in the
[Official Docs](https://www.perforce.com/manuals/p4guide/Content/P4Guide/tutorial.create-depot.html)
covering this procedure.  Here I've combined many of those articles into a procedure
to create a new `XaiLife` Stream Depot with 2 streams: `main` and `dev`.  We then populate `main`
with some initial (perhaps mostly empty) content, and sync it to `dev`.

The intent is that thereafter you work on the `dev` Stream primarily, and only merge back into `main`
when you have something stable to share with non-technicals.


## Create Depot: `XaiLife`

```powershell
p4 depot -t stream XaiLife
```


## Create Stream: `//XaiLife/main`

```powershell
$env:P4USER = $env:UserName  # change if your P4 username != your Windows username
$env:P4CLIENT = "${env:P4USER}_main"  # P4 workspace name

# cd to the local dir where you want these files to be stored
# (create an empty directory if needed)
cd D:/Dev/xist_main

# Create main Stream
p4 stream -t mainline //XaiLife/main

# create workspace for main stream
p4 client -S //XaiLife/main

# Example: Copy D:/Other/Source recursively
cp -Recurse D:/Other/Source/* D:/Dev/xist_main
# At the very least you want a .p4ignore file

# FIRST: Add .p4ignore to the stream so we don't add stuff we don't care about
p4 add .p4ignore
p4 submit -d "Initialize Stream with .p4ignore"

# SECOND: Recursively add all non-ignored files
p4 add ...
p4 submit -d "Initial Import"
```


## Create Stream: `//XaiLife/dev`

```powershell
$env:P4USER = $env:UserName  # change if your P4 username != your Windows username
$env:P4CLIENT = "${env:P4USER}_dev"  # P4 workspace name

# cd to the local dir where you want these files to be stored
# (create an empty directory if needed)
cd D:/Dev/xist_dev

# Create dev Stream (based on main)
p4 stream -t development -P //XaiLife/main //XaiLife/dev

# create workspace for dev stream
p4 client -S //XaiLife/dev

p4 populate -d "From main" -S //XaiLife/dev -r
p4 sync
```


## Future Merging

`p4 populate` only works to initially populate the `dev` branch.

In the future when you want to pull `main` files into `dev`, you need to use `p4 integ` instead:

```powershell
p4 integ //XaiLife/main/... //XaiLife/dev/...
```
