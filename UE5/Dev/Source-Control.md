---
title: "Source Control"
description: "Discussion of Unreal Engine project source control methods"
breadcrumb_path: "UE5/Dev"
breadcrumb_name: "Source Control"
---

## Source Control

If you intend to use a custom engine build, you will need access to UE5 via source control.

If you will only use official engine releases installed via the Epic Games Launcher, you
can skip this step.  In that case you will get packaged engine builds from Epic, and
you won't need to access their source control repositories.


### Community Access

For UE5 Community member developers, Epic makes
[Engine Releases](https://docs.unrealengine.com/5.0/en-US/downloading-unreal-engine-source-code/)
available on
[GitHub](https://github.com/EpicGames/UnrealEngine).

If you don't have a custom license, but you still want to build a custom engine,
then Github is how you will access the engine source.


### UDN Perforce

Epic uses Perforce internally.  They publish the Engine, Game Samples and more to
custom licensees on UDN via a Perforce server.

This section ONLY pertains to custom licenses.  You'll know you are a custom licensee
because you will have had to sign an mNDA with Epic and pay a licensing fee.


#### Install P4V

- [P4V - Perforce Helix Visual Client](https://www.perforce.com/downloads/helix-visual-client-p4v)
    - Windows Users: Download the `MSI` version

Install everything:

- Helix Visual Client (P4V)
- Merge and Diff Tool (P4Merge)
- Administration Tool (P4Admin)
- Command-Line Client (P4)

During setup when it asks you for a server, username, etc, continue to
the Connect to Epic P4 section:


#### Connect to Server

- [Connect to Epic's Perforce Server](https://docs.unrealengine.com/4.26/en-US/ProgrammingAndScripting/UsingPerforce/Basics/)

The link above gives the P4 server and user info.  Use it during installation and during runtime
to connect to Epic's P4 Server.
