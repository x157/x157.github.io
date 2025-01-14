---
title: "Linux"
description: "Developing Unreal Engine on Linux"
breadcrumb_name: "Linux"
---

# Linux Dev Notes

- [How to use p4 on Linux](/UE5/Linux/p4)

## Setting up the toolchain

```bash
# You need some Ubuntu packages installed before you do anything else
sudo apt-get -y install \
  autoconf \
  binutils \
  bison \
  bzip2 \
  cmake \
  flex \
  gettext \
  gcc \
  help2man \
  libncurses-dev \
  libtool libtool-bin libtool-doc \
  texinfo \
  zip
```

Surely somewhere Epic links to this in a more obvious place (?), but I found it in this obscure
["Version History"](https://dev.epicgames.com/documentation/en-us/unreal-engine/linux-development-requirements-for-unreal-engine#versionhistory)
table at the bottom of
[Linux Development Requirements](https://dev.epicgames.com/documentation/en-us/unreal-engine/linux-development-requirements-for-unreal-engine).

Download:
[Linux toolchain clang-18.1.0 for Ubuntu 22.04](https://cdn.unrealengine.com/Toolchain_Linux/native-linux-v23_clang-18.1.0-rockylinux8.tar.gz)
(~ 1.5 GB)

```bash
# Install scripts into expected /src location:
sudo mkdir /src

sudo cp -r v23_clang-18.1.0-rockylinux8/build/scripts/* /src
```

After you extract that archive, look in the `build/scripts` directory.

## `build_linux_toolchain.sh`

The main file we need to run is `./build_linux_toolchain.sh` from `build/scripts`
in the toolchain zip we downloaded from Epic (above).

Note that they're expecting this to run inside a Docker container and it doesn't necessarily
recover from failures (especially Github cloning failures, which are rampant).

Ideally you'll step through this manually so you can fix any errors that occur as they occur.
This is Linux, after all.  `:-)`



# See Also

- [Linux Game Development Overview](https://dev.epicgames.com/documentation/en-us/unreal-engine/linux-game-development-in-unreal-engine)
  - [Linux Development Requirements](https://dev.epicgames.com/documentation/en-us/unreal-engine/linux-development-requirements-for-unreal-engine)
- [Download Linux UE Source](https://www.unrealengine.com/en-US/linux)
