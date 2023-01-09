---
title: "Perforce: How to Create a Lyra Depot"
description: "Procedure for creating the //Lyra/ P4 Depot, to save all LYRAGAME_API and other Lyra hacks for easy reuse by many projects."
breadcrumb_path: "Perforce"
breadcrumb_name: "Create a Lyra Depot"
---

# How to Create a Lyra Depot


##### Set up Powershell environment

```powershell
# Set environment variable: P4 Username
$env:P4USER = $env:UserName;  # Change if your P4USER != your PowerShell UserName
```

##### Create Depot: `//Lyra`

```powershell
p4 depot -t stream Lyra
```

##### Set up Typemap

```powershell
cat typemap.txt | p4 typemap -i
```

See [Typemap](./Typemap) to figure out what to use as the `typemap.txt` contents.

Make sure you set up the typemap before you import any content into the depot.


## Import LyraStarterGame from Epic as `//Lyra/Main`

See [How to Create the `//Lyra/Main` Stream](./How-to-Create-Lyra-Main-Stream)
