---
title: "UE5 IDEs"
description: "Discussion of Unreal Engine IDEs"
breadcrumb_path: "UE5/Dev"
breadcrumb_name: "IDE"
---

# Choosing an IDE for UE5 Development

Personally I use [Rider](#Rider) as my IDE.
Visual Studio 2022 also works.

If you prefer to use [Visual Studio](#VS), you should seriously consider purchasing
some paid plugins to save yourself insane amounts of time.

Technically you **can** use VS for free, but doing so
is like trying to dig a hole with a wet noodle.
It can be done, but it will waste a significant amount of your time.
VS really needs paid plugins to be a competitive IDE,
which makes it priced similarly to Rider for professional users.


<a id='VS'></a>
## Option 1. Visual Studio

Microsoft's build environment is distributed with VS.  You don't have to use VS to edit code,
but you need to have it installed for access to its build tools.

- [Install Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) *(Community version works)*
  - Install [Unreal Engine IDE Support for VS 2022 17.5+](https://devblogs.microsoft.com/cppblog/unreal-engine-integrations-now-available-in-visual-studio-2022/)
    - Upgrade to VS 2022 17.5+ for this IDE support!  Very useful!
  - Install [UnrealVS Extension](https://docs.unrealengine.com/5.1/en-US/using-the-unrealvs-extension-for-unreal-engine-cplusplus-projects/)
    - Free extension, part of Unreal Engine Binaries, you just have to install it
  - [Epic Options for a New Visual Studio Installation](https://docs.unrealengine.com/5.0/en-US/setting-up-visual-studio-development-environment-for-cplusplus-projects-in-unreal-engine/)
      - Epic recommended setup: [Options for a New Visual Studio Installation](https://docs.unrealengine.com/5.0/en-US/setting-up-visual-studio-development-environment-for-cplusplus-projects-in-unreal-engine/)


<a id='VSPlugins'></a>
### VS Plugins (required for pro devs)

You don't need **both** of these, but **you do need one** if you value your time at all.

Choose which you prefer:

*Either:* [ReSharper](https://www.jetbrains.com/lp/resharper-cpp-unreal-engine/)
for VS by JetBrains (gives UE support) *(works like Rider)*

*OR:* [Visual Assist](https://www.wholetomato.com/visual-assist-ue4-unreal-engine)
for VS by Whole Tomato (gives UE support)


<a id='Rider'></a>
## Option 2. Rider

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
