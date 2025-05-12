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

If you're developing on a Mac, [Rider](#Rider) is really your only option.
Xcode is just plain bad for UE coding.

[Rider](#Rider) also works great on Linux.


<a id='VS'></a>
## Option 1. Visual Studio

Microsoft's build environment is distributed with VS.  You don't have to use VS to edit code,
but you need to have it installed for access to its build tools.

- [Install Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) *(Community version works)*
  - Install [Unreal Engine plugin for Visual Studio](https://github.com/microsoft/vc-ue-extensions)
    - Personally I install this into my custom engine, but you can also install it into your game
  - Install [UnrealVS Extension](https://dev.epicgames.com/documentation/en-us/unreal-engine/using-the-unrealvs-extension-for-unreal-engine-cplusplus-projects)
    - Free Visual Studio extension, part of Unreal Engine Binaries, you just have to install it
  - [Epic Options for a New Visual Studio Installation](https://dev.epicgames.com/documentation/en-us/unreal-engine/setting-up-visual-studio-development-environment-for-cplusplus-projects-in-unreal-engine)
  - Install [VsChromium](https://chromium.github.io/vs-chromium/) extension *(Optional)*


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

Especially if you develop on multiple platforms, Rider works on Windows, Mac **and** Linux.

If you use this, it replaces VS as the IDE.  Under the hood it uses VS build tools.
You will also need to have VS installed in order to use Rider.
(On Mac, it uses Xcode under the hood, on Linux it uses gcc).

- [Install JetBrains Toolbox](https://www.jetbrains.com/toolbox-app/)
- Install **Rider 2024.3.6** or later *(via Toolbox)*

If you find that you sometimes work in VS in addition to Rider *(I sometimes do)*, then with your
JetBrains subscription you also get access to ReSharper, so you can also:

- Install **ReSharper Tools**

ReSharper comes with the Rider subscription so you basically get to use Rider
**and** still upgrade your VS to be good at the same time.
