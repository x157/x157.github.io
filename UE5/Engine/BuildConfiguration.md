---
title: "BuildConfiguration.xml for UnrealBuildTool | UE5 Engine"
description: "Example BuildConfiguration.xml setup for C++ developers working on a UE5 project to maximize the ease of debugging."
breadcrumb_path: "UE5/Engine"
breadcrumb_name: "BuildConfiguration.xml"
---

# UE5 BuildConfiguration.xml

You have quite a bit of control over how `UnrealBuildTool` builds Unreal Engine
and its projects.

In the [Example BuildConfiguration.xml](#ExampleBuildConfigurationXml)
below, I have configured `UnrealBuildTool` as follows:

- When I'm working on C++ files, make it *very easy* to debug them.
  - When I check a file out in Perforce, *only for files I explicitly check out*:
    - Automatically **disable code optimization**
    - Automatically **disable Unity builds**
    - Automatically **disable PCH usage**
- Consume MOST, but **not all** of my available CPU
    - I reserve 6 (of 30) hyper threads for my own use so Windows isn't unresponsive during builds


### Where to Save Your BuildConfiguration.xml

Store this file locally in your own personal user settings:

| Platform  | File Location |
|---|---|
| Linux, Mac | `~/.config/Unreal Engine/UnrealBuildTool/BuildConfiguration.xml`
| Windows    | `%APPDATA%\Unreal Engine\UnrealBuildTool\BuildConfiguration.xml`


<a id='ExampleBuildConfigurationXml'></a>
### Example BuildConfiguration.xml Content

```xml
<?xml version="1.0" encoding="utf-8" ?>
<Configuration xmlns="https://www.unrealengine.com/BuildConfiguration">
    <BuildConfiguration>
        <bUseAdaptiveUnityBuild>true</bUseAdaptiveUnityBuild>
        <bAdaptiveUnityDisablesOptimizations>true</bAdaptiveUnityDisablesOptimizations>
        <bAdaptiveUnityDisablesPCH>true</bAdaptiveUnityDisablesPCH>
    </BuildConfiguration>
    <ParallelExecutor>
        <!-- (reserve some cores for my use during builds) -->
        <!-- 1.09 * 24 = 26.16 of 32 == 6 free logical cores on my 14th gen i9 (24 physical, 32 logical cores) -->
        <ProcessorCountMultiplier>1.09</ProcessorCountMultiplier>
    </ParallelExecutor>
</Configuration>
```

The settings above mean that all you have to do is check a file out in P4 to disable
optimizations and PCH for that file.

This is ideal for debugging and great for iteration and dev in general.

### NOTICE: Set your own ProcessorCountMultiplier

The `<ProcessorCountMultiplier>` set here works for a 14th gen i9.
That machine has 24 physical cores, with 32 logical cores
due to hyper-threading.
With this configuration I'm reserving 6 logical cores to be available
for me to *barely* use Windows while compiling.

You can turn this value up or down based on your own machine specs
and how responsive you want your machine to be while you're building
the project.

Lower values mean more cores are reserved for you,
and compile times will take longer.  Higher values mean your system
can be *completely consumed* by the building process,
and essentially unusable by you until it completes.

### DO NOT COMMIT THIS TO SOURCE CONTROL

Different people and different types of machines or services require different
build settings.

**Do not commit `BuildConfiguration.xml` to source control.**


## See Also

- Official Epic Docs: [Build Configuration](https://dev.epicgames.com/documentation/en-us/unreal-engine/build-configuration-for-unreal-engine)
  - UBT supports additional options, maybe some you want! Read the doc.
