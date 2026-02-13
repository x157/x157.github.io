---
title: "Linux"
description: "Developing Unreal Engine on Linux"
breadcrumb_path: "UE5"
breadcrumb_name: "Linux"
---

# Linux UE5 Dev Notes

- [How to use Perforce on Linux](/UE5/Linux/p4) covers installation and basic usage

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

### Install packages required to cook

Games will build without these, but you cannot Cook without these (UE 5.6):

```bash
sudo apt-get -y install \
  libasound2 \
  libgbm-dev
```


### Install media tools

```bash
sudo apt-get -y install \
  libcurl4-openssl-dev \
  libpipewire-0.3-dev \
  libspa-0.2-dev
```

### Install PowerShell for UnrealXistTools

If you're using [UnrealXistTools](/UnrealXistTools/), you need to install PowerShell.

Check this official Microsoft documentation:
[Installing PowerShell on Ubuntu](https://learn.microsoft.com/en-us/powershell/scripting/install/install-ubuntu#installation-via-package-repository-the-package-repository)

TLDR you need to run 8-10 commands, you can mostly cut/paste from that page.


### nVidia Drivers (only needed for Desktop)

You cannot run UEditor on Ubuntu Desktop without Vulkan drivers.
If you have an nVidia card like me, this is an easy way to install
the drivers:

https://www.geeksforgeeks.org/how-to-install-nvidia-driver-on-ubuntu/


## Get Engine Source

Either `git clone` the Engine source, or
[install p4](/UE5/Linux/p4) and sync your Engine stream.

## Run `./Setup.sh`

If you cloned git, then run `./Setup.sh` from the repo clone just as
you would on any other OS.

This is fairly easy and after it completes you can skip to
[Generate Project Files](#GenerateProjectFiles) below.

If your Engine source is derived from UDN P4 rather than Github,
then instead of `./Setup.sh` (which doesn't exist), the process is
slightly more complex.  Keep reading.

### `./Setup.sh` for P4-based Engine source

```bash
# cd into Linux-specific Build BatchFiles
pushd Engine/Build/BatchFiles/Linux

# Run Linux-specific SetupToolchain.sh
./SetupToolchain.sh

# Build third party libs if needed
./BuildThirdParty.sh

popd
```

<a id="GenerateProjectFiles"></a>
## Generate Project Files

However you go about running your `./Setup.sh`, afterward you need to
Generate Project Files.

```bash
# Generate project files (AFTER Setup completed successfully)
./GenerateProjectFiles.sh
```

## Building the Project

In this example we're building the `LyraEditor` target in the `Development` configuration:

```bash
# Change these based on what you want to build
Target="LyraEditor"  # prefix of the "*.Target.cs" to build
Platform="Linux"  # always Linux on Linux
Configuration="Development"  # or "DebugGame" or "Shipping" etc

# cd to your Engine's root dir
./RunUBT.sh $Target $Platform $Configuration
```

Given this is Linux, you probably want to build `LyraServerEOS`, right?  `:)`


## Building UnrealVersionSelector

To rebuild `UnrealVersionSelector` for Linux, run this command:

```bash
# Rebuild UnrealVersionSelector
./Engine/Build/BatchFiles/Linux/Build.sh UnrealVersionSelector Linux Shipping
```

This generates `Engine/Binaries/Linux/UnrealVersionSelector-Linux-Shipping`

### Register your Custom Engine

After building `UnrealVersionSelector`, run:

```bash
# Register this custom UE version on the current host
./Engine/Binaries/Linux/UnrealVersionSelector-Linux-Shipping -register -unattended
```

After running that, you can look in the Linux custom engine registry to find your engine listed:

```bash
cat $HOME/.config/Epic/UnrealEngine/Install.ini
```

The output looks something like this:

```ini
[Installations]
148492FA-37EF-4C22-AA40-9C709BBEB08F=/opt/UE_5.5
```

If you need to coordinate custom engine names with your team, you can add
a custom name for your engine, like:

```ini
[Installations]
148492FA-37EF-4C22-AA40-9C709BBEB08F=/opt/UE_5.5
MyCustomEngine=/opt/UE_5.5
```

This will allow you to use `EngineAssociation = "MyCustomEngine"`
in your `.uproject` file, assuming everyone on your team does this.

See [UEngine.ps1](https://github.com/XistGG/UnrealXistTools?tab=readme-ov-file#uengineps1)
in [UnrealXistTools](https://github.com/XistGG/UnrealXistTools)
for a fully cross-platform PowerShell script to make custom engine management easier.


<a id='see-also'></a>
# See Also

- [Linux Game Development Overview](https://dev.epicgames.com/documentation/en-us/unreal-engine/linux-game-development-in-unreal-engine)
  - [Linux Development Requirements](https://dev.epicgames.com/documentation/en-us/unreal-engine/linux-development-requirements-for-unreal-engine)
- [Download Linux UE Source](https://www.unrealengine.com/en-US/linux)
