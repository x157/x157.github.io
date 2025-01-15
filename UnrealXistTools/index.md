---
title: "UnrealXistTools"
description: "PowerShell 7 scripts useful for UE5 developers, including Build/Clean, Edit, Migrate and more."
breadcrumb_name: UnrealXistTools
---

# UnrealXistTools

Source: [https://github.com/XistGG/UnrealXistTools](https://github.com/XistGG/UnrealXistTools)

[UnrealXistTools](https://github.com/XistGG/UnrealXistTools)
is a set of PowerShell 7 scripts for UE5 developers.

We use these scripts on Windows, Mac and Linux.


## Example Uses

[UAT.ps1]()
-- Simplified interface to `RunUAT.(bat|sh)`

```powershell
UAT.ps1 Lyra.uproject -Target LyraGameEOS -Build -Cook -Stage -Run
```

[UProjectClean.ps1](https://github.com/XistGG/UnrealXistTools#uprojectcleanps1)
-- Completely Clean & Reset Project to Current Source

[MigrateUEMarketplacePlugin.ps1](https://github.com/XistGG/UnrealXistTools#migrateuemarketplacepluginps1)
-- Migrate a UE Marketplace C++ plugin from one Engine version to another

For more scripts, see the
[README](https://github.com/XistGG/UnrealXistTools/blob/main/README.md)
