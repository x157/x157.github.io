---
title: "UE5 IDEs"
description: "Discussion of Unreal Engine IDEs"
breadcrumb_path: "UE5/Dev"
breadcrumb_name: "IDE"
---

## Choosing an IDE for UE5 Development

Visual Studio Community 2022 is fine, and it's free.

Personally I prefer to use
[Rider](https://www.jetbrains.com/rider/)
rather than Visual Studio as an IDE.  Rider has built-in UE5 integration
that really is a **must-have** for any serious UE5 C++ developer.

If you prefer to use Visual Studio, you should seriously consider purchasing the
[ReSharper](https://www.jetbrains.com/lp/resharper-cpp-unreal-engine/)
plugin for Visual Studio to get UE5 integration similar to Rider.

These tools aren't free, but they aren't prohibitively expensive either.
Given that `time == $`, IMO it's worthwhile to
spend some $ now to save yourself a lot of time later.
Personally I tend to lean toward `time >= $`,
assuming one has the luxury of discretionary spending.

Check for student discounts if applicable, I believe they are sometimes (always?) offered.


### Visual Studio

Microsoft's build environment is distributed with VS.  You don't have to use VS to edit code,
but you need to have it installed for access to its build tools.

- [Install Visual Studio 2022](https://visualstudio.microsoft.com/downloads/)
    - Set up Visual Studio Options
        - Epic recommended setup: [Options for a New Visual Studio Installation](https://docs.unrealengine.com/5.0/en-US/setting-up-visual-studio-development-environment-for-cplusplus-projects-in-unreal-engine/)
    - Version notes:
        - Community version is fine


### Rider

Rider is optional, though **highly recommended**.  You have to pay for a license unless
you can get a trial or student license.  It's *well worth the cost* IMO.

If you use this, it replaces VS as the IDE.  Under the hood it uses VS build tools.
You will also need to have VS installed in order to use Rider.

- [Install JetBrains Toolbox](https://www.jetbrains.com/toolbox-app/)
- **Install Rider 2022.3** *(via Toolbox)*
    - Options:
        - [YES] Create native images of Rider assemblies with Ngen.exe
        - [YES] Install JetBrains ETW Host Service
    - First time setup: "Customize JetBrains Rider"
        - Environment:
            - Install `.NET` SDK and Runtime
        - Featured plugins:
            - Install `Heap Allocations Viewer`
