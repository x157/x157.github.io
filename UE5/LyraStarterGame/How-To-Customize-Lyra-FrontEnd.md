---
title: Customizing the Lyra Front-end
description: Detailed description of all the steps necessary to customize the LyraStarterGame front-end experience
back_links:
  - link: /UE5/
    name: UE5
  - link: /UE5/LyraStarterGame/
    name: LyraStarterGame
---


# Customizing the Lyra Front-end

## Asset Manager update

Before we go to far in this process, we need to modify AssetManager so it knows where to find the new stuff we're going to add.

Here I'm assuming you've been following along in my tutorial so your settings are the same as mine.

### `XistGame.uasset` Asset Manager deltas

- Modify existing:
  - `Map` add dir `/XistGame/FrontEnd/Maps`
- Add new:
  - `LyraLobbyBackground` add dir `/XistGame/FrontEnd`

Here is the entire `Primary Asset Types to Scan` setup for `XistGame` if you just want to replace what you have with this:

```text
((PrimaryAssetType="LyraExperienceDefinition",AssetBaseClass="/Script/LyraGame.LyraExperienceDefinition",bHasBlueprintClasses=True,Directories=((Path="/XistGame/Experiences"))),(PrimaryAssetType="LyraExperienceActionSet",AssetBaseClass="/Script/LyraGame.LyraExperienceActionSet",Directories=((Path="/XistGame/Experiences"))),(PrimaryAssetType="Map",AssetBaseClass="/Script/Engine.World",Directories=((Path="/XistGame/Maps"),(Path="/XistGame/FrontEnd/Maps"))),(PrimaryAssetType="PlayerMappableInputConfig",AssetBaseClass="/Script/EnhancedInput.PlayerMappableInputConfig",Directories=((Path="/XistGame/Input/Configs"),(Path="/Game/Input/Configs"))),(PrimaryAssetType="LyraLobbyBackground",AssetBaseClass="/Script/LyraGame.LyraLobbyBackground",Directories=((Path="/XistGame/FrontEnd"))),(PrimaryAssetType="LyraUserFacingExperienceDefinition",AssetBaseClass="/Script/LyraGame.LyraUserFacingExperienceDefinition",Directories=((Path="/XistGame/Experiences/Playlists"))))
```


#### MUST RESTART EDITOR for Asset Manager changes to take effect !!

After making the above changes, you **must** restart the UE5 editor for these changes to take effect.


## Create a Lobby Background

### Script to randomly load one of our own background maps

The default Lyra code will randomly load *ANY* background map that might be *anywhere* in the code, which is not what we want.  We only want our own backgrounds to be loaded.

Here we copy the Lyra implementation and change it to only select our own backgrounds:

- Duplicate `Lyra.Environments/B_LoadRandomLobbyBackground`
  - `XistGame.FrontEnd/B_XG_LoadRandomLobbyBackground`
    - Modify `BeginPlay` event such that it filters out lobby backgrounds whose names start with anything other than `DA_XG_`
      - In my version I added new function `IsRelevantLobbyBackground` that returns boolean

### Create LobbyBackground1, the first of potentially more

This is the map that you'll see as the background of your menu.

- Create `XistGame.FrontEnd/Maps/L_XG_LobbyBackground1`
  - This is the map that will show in the background on the menu pages
  - Bare minimum setup:
    - Something to look at
    - Cinematic Camera
    - LevelSequence actor that forces the view to to the cinematic camera
  - My setup is just a small green-lit arena with 3 balls rolling around

- Create `LyraLobbyBackground` data asset `XistGame.FrontEnd/DA_XG_LobbyBackground1`
  - Set reference to `L_XG_LobbyBackground1`


### Create more if you want!

You can create more lobby backgrounds if you want.  The solution above will search for any/all lobby backgrounds named `DA_XG_*` and will randomly display one of those as your background menu.

Creating more to cycle through is much easier than the work you did above.  Just make a new `L_XG_LobbyBackgroundN` map (increment N!) and then create a `DA_XG_LobbyBackgroundN` asset to point to it.


## Create a Lobby Experience

Create the experience definition:

- Duplicate `Lyra.System/FrontEnd/B_LyraFrontEnd_Experience`
  - `XistGame.Experiences/B_XG_Experience_FrontEnd`

Create the map that will activate the experience:

- Duplicate `Lyra.System/FrontEnd/Maps/L_LyraFrontEnd`
  - `XistGame.FrontEnd/Maps/L_XG_FrontEnd`
    - Replace random lobby background logic
      - Delete the vanilla Lyra `B_LoadRandomLobbyBackground` actor
      - Add a `B_XG_LoadRandomLobbyBackground` actor
    - Set `WorldSettings`.`Game Mode`.`Default Gameplay Experience` = `B_XG_Experience_FrontEnd`

Change project settings to load this experience by default:

- Maps & Modes > Default Maps > Game Default Map = `L_XG_FrontEnd`


## Customize the menu itself

TODO

Also there is quite a lot more TODO here, but the above will hopefully
help get you started.  If you've followed along so far, you should
have enough insight to continue on your own from here.

I hope to come back to this at some point once I've actually built a
game that requires a menu for players to use.  `:)`
