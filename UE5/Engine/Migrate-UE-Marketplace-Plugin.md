---
title: "How to Migrate a UE Marketplace Plugin"
description: "Discussion of high level how to migrate a UE Marketplace plugin from a Release Engine to your own Custom Engine"
breadcrumb_path: "UE5/Engine"
breadcrumb_name: "Migrate UE Marketplace Plugin"
---

# Migrate UE Marketplace Plugin

[MigrateUEMarketplacePlugin.ps1](https://github.com/XistGG/UnrealXistTools#migrateuemarketplacepluginps1)
from my
[Unreal Xist Tools](https://github.com/XistGG/UnrealXistTools)
will help you to more easily use UE Marketplace Engine Plugins in your own Custom Engine.

Commands to migrate some of my favorite Marketplace plugins from UE 5.1 Release to my custom UE 5.2 Engine:

```powershell
MigrateUEMarketplacePlugin.ps1 -Plugin AutoSizeComments -From "E:/EpicLauncher/UE_5.1" -To "E:/MyEngine_5.2" -Debug -Force
MigrateUEMarketplacePlugin.ps1 -Plugin BlueprintAssist -From "E:/EpicLauncher/UE_5.1" -To "E:/MyEngine_5.2" -Debug -Force
MigrateUEMarketplacePlugin.ps1 -Plugin VisualStudioTools -From "E:/EpicLauncher/UE_5.1" -To "E:/MyEngine_5.2" -Debug -Force
```

*The `-Force` flag may look scary,
but it just confirms that we do indeed intend to overwrite any existing `MyEngine_5.2`
plugin content with the newly migrated content.
If you don't use `-Force` then you may get an error requiring you to manually remove some directories to continue.*


## What does this do?

UE Marketplace Plugins are released on the UE Store by Epic for official Engine releases only.

Thus, if you use a custom Engine, to get plugins from the UE Marketplace,
you'll need to migrate them from the Release Engine to your Custom Engine.


### What are these Settings?

| Setting            | Value                    |
|--------------------|--------------------------|
| Release Engine Dir | `E:/EpicLauncher/UE_5.1` |
| Custom Engine Dir | `E:/MyEngine_5.2`        |

I have installed UE 5.1 Release from the Epic Launcher into `E:/EpicLauncher/UE_5.1`

I also have my own custom UE 5.2 in `E:/MyEngine_5.2`


## Why is this needed?

While 5.2 is being developed, no marketplace content is released for it.
Thus all the marketplace content is "old" (for the current 5.1 release).

The solution is to migrate the UE Marketplace plugins from 5.1 to 5.2,
so we effectively keep all the same code, we just compile it using our own engine
rather than the engine it was released with.

This works great as long as the plugin is compatible with the new engine.
If it isn't, you'll need to get the plugin maintainer to update it.

Of course, I had to automate this process, because I have a serious problem. `:)`
