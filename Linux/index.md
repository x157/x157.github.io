---
title: "Linux"
description: "Developing Unreal Engine on Linux"
breadcrumb_name: "Linux"
---

# Linux Dev Notes

- [How to use p4 on Linux](/UE5/Linux/p4)

## Setting up a build machine

- Create a `Ubuntu 22.04 LTS Minimal` VM on Google Compute
  - Need at least 200 GB disk
  - Ideally at least 16 physical cores (more builds faster but is more expensive)

### Install prerequisite packages

```bash
# You need some Ubuntu packages installed before you do anything else
sudo apt-get -y update
sudo apt-get -y install \
  autoconf \
  binutils \
  bison \
  build-essential \
  bzip2 \
  cmake \
  flex \
  gettext \
  gcc \
  git \
  help2man \
  libncurses-dev \
  libtool libtool-bin libtool-doc \
  lsb-core \
  texinfo \
  zip
# These packages seem to be needed for UnrealVersionSelector at least
sudo apt-get -y install xdg-user-dirs xdg-utils
```

### Install PowerShell for UnrealXistTools

If you're using [UnrealXistTools](/UnrealXistTools/), you need to install PowerShell:

```bash
# Install PowerShell
sudo snap install powershell --classic
```

If you don't have or want to use `snap`, see this
[Microsoft Documentation](https://learn.microsoft.com/en-us/powershell/scripting/install/install-ubuntu?view=powershell-7.4)
regarding how else to install Powershell on Ubuntu 22.04.

## Get Engine Source

Either `git clone` the Engine source, or
[install p4](/UE/Linux/p4) and sync your Engine stream.

If you cloned git, then run `./Setup.sh` from the repo clone just as
you would on any other OS.

### `./Setup.sh` for P4-based Engine source

If your Engine source is derived from UDN P4 rather than Github,
then instead of `./Setup.sh` (which doesn't exist), you need to:

```bash
# cd into Linux-specific Build BatchFiles
pushd Engine/Build/BatchFiles/Linux

# Run Linux-specific SetupToolchain.sh
./SetupToolchain.sh

# Build third party libs if needed
./BuildThirdParty.sh

popd
```

## Generate Project Files

```bash
# Generate project files (AFTER Setup completed successfully)
./GenerateProjectFiles.sh
```

## Building Project

In this example we're building the `LyraEditor` target in the `Development` configuration:

```bash
# Change these based on what you want to build
$Target = "LyraEditor"  # prefix of the "*.Target.cs" to build
$Platform = "Linux"  # always Linux on Linux
$Configuration = "Development"  # or "DebugGame" or "Shipping" etc

# cd to your Engine's root dir
./runUBT.sh $Target $Platform $Configuration
```


### Fixup executable permissions

Since I imported my Engine source from UDN p4 using a Windows machine as the intermediary,
all the Linux executables in my p4 depot had lost their execute bits.

To fix this, I had to:

```bash
p4 edit -t binary+x Engine/Source/ThirdParty/Intel/ISPC/bin/Linux/ispc
p4 edit -t binary+x Engine/Binaries/Linux/BreakpadSymbolEncoder
p4 edit -t binary+x Engine/Binaries/Linux/EpicWebHelper
p4 edit -t binary+x Engine/Binaries/Linux/UnrealTraceServer
p4 edit -t binary+x Engine/Binaries/Linux/UnrealVersionSelector-Linux-Shipping
p4 edit -t binary+x Engine/Binaries/Linux/dump_syms
p4 edit -t binary+x Engine/Binaries/Linux/zen*

p4 submit -m "Add executable bits to Linux executables"
```


<a id='see-also'></a>
# See Also

- [Linux Game Development Overview](https://dev.epicgames.com/documentation/en-us/unreal-engine/linux-game-development-in-unreal-engine)
  - [Linux Development Requirements](https://dev.epicgames.com/documentation/en-us/unreal-engine/linux-development-requirements-for-unreal-engine)
- [Download Linux UE Source](https://www.unrealengine.com/en-US/linux)
