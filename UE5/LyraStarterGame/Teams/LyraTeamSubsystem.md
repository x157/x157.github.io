---
title: "Lyra Team Subsystem"
description: "Overview of the Lyra Team Subsystem, a World subsystem that manages which Teams exist, and which Actors are on which Teams"
breadcrumb_path: "UE5/LyraStarterGame/Teams"
breadcrumb_name: "Team Subsystem"
---

# Lyra Team Subsystem

World Subsystem, brought up/down with each World.

Thus, Teams are not defined outside the context of a specific World.
If you want persistent Teams across multiple worlds, need to take this
into consideration.

- Register Teams
- Set Team for an Actor
- Compare Teams
- Manage Team Tag Stacks
- Get Display Assets


## Compare Teams

The `ELyraTeamComparison` enum contains 2 states:

1. Same team
2. Different team

You may want to extend this with more advanced concepts such as:

- Allied Team
- Enemy Team
- Neutral Team

... and perhaps also some meta concepts:

- Distrusted Team
- Untrusted Team *(not enough data to determine trust or distrust)*
- Trusted Team

By default, Lyra recognizes only the **Same Team** and **Different Team** concepts.


## Can Cause Damage?

The Lyra Team Subsystem has a `CanCauseDamage` method that is used by default to
prevent inflicting damage on actors of the same team.

You can choose to use this or not, or perhaps to modify it as you like.

