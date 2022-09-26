---
title: "Version Control Fundamentals | Unreal Engine Annotations"
description: ""
breadcrumb_path: "UE5/Annotations"
breadcrumb_name: "Version Control Fundamentals"
---


# Version Control Fundamentals | Live from HQ | Inside Unreal

[Full Video](https://youtu.be/JxXydvG4mlI)
|
Published 2020-01-16 by Epic Games
[Inside Unreal](https://www.youtube.com/playlist?list=PLZlv_N0_O1gbggHiwNP2JBXGeD2h12tbB),
guest Arran Langmead, Developer Relations Technical Artist @ Epic Games,
with Victor Brodin, Community Manager @ Epic Games.

[UE Forum Announcement](https://forums.unrealengine.com/t/inside-unreal-version-control-fundamentals-january-16-live-from-hq/136083)
with extra links and references

The intro discussed setting up SVN, but as it is *effectively required* to use Perforce
to work with Epic's UDN source control, SVN is not relevant to me.

Below is the Perforce and general Source Control related info:

## Setting up Perforce

- [Setting up Perforce](https://youtu.be/JxXydvG4mlI?t=1038) on a Digital Ocean Cloud VM
  - You don't HAVE to use Digital Ocean, you can use AWS or GCP or whatever, but this is the example they gave
  - [Commands to Install Perforce Server on the VM](https://youtu.be/JxXydvG4mlI?t=1274)
- [Install Perforce on your Workstation](https://youtu.be/JxXydvG4mlI?t=1430)
- [MAKE SURE YOU ADD *optional?!* SECURITY TO PERFORCE SERVER](https://youtu.be/JxXydvG4mlI?t=1530)
- [How to Add new Depot](https://youtu.be/JxXydvG4mlI?t=1744)
- [How to Add a project to a workspace](https://youtu.be/JxXydvG4mlI?t=1898)

## Version Control Concepts

- [Q: How do we Version Control BPs? They are binary :/](https://youtu.be/JxXydvG4mlI?t=3264)
  - Shelving content
    - For Lead/Manager/Peer review
    - To save for later personal review
- [Check Out FIRST, then Change Content](https://youtu.be/JxXydvG4mlI?t=3720)
- [Ways to Break Up Your Project to Reduce Chances of Checkout Issues](https://youtu.be/JxXydvG4mlI?t=3492)
  - Split Complex Assets into multiple smaller assets
    - Makes it easier for multiple people to work on it
  - Example Ways:
    - Actor Components
    - [Use Blueprint Function Libraries & Blueprint Macro Libraries](https://youtu.be/JxXydvG4mlI?t=3898)
    - [Sub-Animations](https://youtu.be/JxXydvG4mlI?t=3973) split
    - [Behavior Trees](https://youtu.be/JxXydvG4mlI?t=4075) split
    - [Levels](https://youtu.be/JxXydvG4mlI?t=4289) split
- [Blueprint Diff Tool](https://youtu.be/JxXydvG4mlI?t=4557)
  - How to use it
  - Great to use for Code/Peer Reviews
- [Demo: Other Dev Makes a Change](https://youtu.be/JxXydvG4mlI?t=4690)
- [Demo: Make a New Asset in Perforce](https://youtu.be/JxXydvG4mlI?t=5077)
- [Engine/C++ Work is Often done in Git instead of Perforce](https://youtu.be/JxXydvG4mlI?t=5389)
- [Setting up P4IGNORE](https://youtu.be/JxXydvG4mlI?t=5438)
- [Best Practices](https://youtu.be/JxXydvG4mlI?t=5519)
- [Unreal Game Sync (UGS)](https://youtu.be/JxXydvG4mlI?t=5800)
  - Reference: [Unreal Game Sync (UGS) for UE5](https://docs.unrealengine.com/en-US/unreal-game-sync-ugs-for-unreal-engine/)
    Official Epic Documentation

#### Options for your own personal Perforce Server

- [Rent a Cloud Perforce Server](https://youtu.be/JxXydvG4mlI?t=5326)
  - Suggested Googling for YT tutorials, which I did:
    - [Super Easy AWS Perforce Setup Instructions](https://youtu.be/864MNv4vqtI?t=5) (15 minutes)
- [Can also buy a personal Perforce Server](https://youtu.be/JxXydvG4mlI?t=5340)
- Free Option: Set up a local Perforce server on your PC
  - Downside: Cannot easily share with other developers

#### Q&A

- [Q: How to save a project with screwed-up version control?](https://youtu.be/JxXydvG4mlI?t=5963)
- [Q: Is it possible to distribute custom engine builds that tie into the launcher and the marketplace?](https://youtu.be/JxXydvG4mlI?t=6079)
- [Q: Is UDN License custom on Epic side or Perforce side?](https://youtu.be/JxXydvG4mlI?t=6201)
- [Q: Is Perforce centralized like SVN? Yes](https://youtu.be/JxXydvG4mlI?t=6265)
- [Q: How do AAA studios manage source control with Blueprints?](https://youtu.be/JxXydvG4mlI?t=6307)
  - Developers should use C++ and just expose BPs to artists/designers who must work solo on each binary asset
  - Reference: Ben Marsh: video and "Robomerge"
    - [Ben Marsh: Tools and Infrastructure for Large Teams](https://www.youtube.com/watch?v=d6lyAI4Ftkw) (YouTube video)
    - [Ben Marsh: Workflow on Fortnite](https://youtu.be/JxXydvG4mlI?t=6411) (YouTube video)
- [Q: As Tech Artist what sort of Source Control do you tend to do?](https://youtu.be/JxXydvG4mlI?t=6501)
- [Q: Why not use Git LFS for Version Control?](https://youtu.be/JxXydvG4mlI?t=6595)
  - Answer: Binary files REQUIRE the concept of "check out file" to stop people from overwriting each other's work
- [Q: Do I have to keep checking out a file after changing it?](https://youtu.be/JxXydvG4mlI?t=6658)
