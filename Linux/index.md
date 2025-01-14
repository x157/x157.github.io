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
```

## Get Engine Source

Either `git clone` the Engine source, or
[install p4](/UE/Linux/p4) and sync your Engine stream.

If you cloned git, then run `./Setup.sh` from the repo clone just as
you would on any other OS.

### p4 stream toolchain setup

If you sync'd from p4, then instead of `./Setup.sh` you need to:

```bash
pushd Engine/Build/BatchFiles/Linux

# Run Linux-specific SetupToolchain.sh
./SetupToolchain.sh

# Build third party libs if needed
./BuildThirdParty.sh

popd
```

## Generate Project Files

```bash
# Generate project files (AFTER Setup.sh)
./GenerateProjectFiles.sh
```

## Building Project

```bash
./Engine/Build/BatchFiles/Linux/Build.sh LyraEditor Linux DebugGame
```

### Fixup executable permissions

I'm probably just bad, but having imported my Engine source from UDN p4, some Linux executables
weren't set as executables in my p4 depot, here are the ones I needed to update:

```bash
p4 edit -t binary+x Engine/Source/ThirdParty/Intel/ISPC/bin/Linux/ispc
p4 edit -t binary+x Engine/Binaries/Linux/BreakpadSymbolEncoder
p4 edit -t binary+x Engine/Binaries/Linux/EpicWebHelper
p4 edit -t binary+x Engine/Binaries/Linux/UnrealTraceServer
p4 edit -t binary+x Engine/Binaries/Linux/UnrealVersionSelector-Linux-Shipping
p4 edit -t binary+x Engine/Binaries/Linux/dump_syms
p4 edit -t binary+x Engine/Binaries/Linux/zen*
```


<a id='see-also'></a>
# See Also

- [Linux Game Development Overview](https://dev.epicgames.com/documentation/en-us/unreal-engine/linux-game-development-in-unreal-engine)
  - [Linux Development Requirements](https://dev.epicgames.com/documentation/en-us/unreal-engine/linux-development-requirements-for-unreal-engine)
- [Download Linux UE Source](https://www.unrealengine.com/en-US/linux)
