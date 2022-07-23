---
title: "Common UI Plugin"
description: "Annotation of tutorial videos relating to the Common UI plugin for Unreal Engine 5"
back_links:
  - link: /UE5/
    name: UE5
---


# Common UI Plugin

Epic's `CommonUI` plugin is what
[LyraStarterGame](../LyraStarterGame/)
uses to control the flow of user input.

This plugin allows the automation of a lot of platform-specific behavior in the UI.
For example, buttons can be automatically shown/hidden depending on the platform
type, and it is very easy to test different platforms in the Editor.

This documentation is being based heavily on the setup of `CommonUI` in `LyraStarterGame`.


## Considerations for Usage

You create a Base UI Widget, for example in your `PlayerController`,
which is the one and only widget you explicitly `Add to Viewport`.
All other widgets then get pushed onto different layers of the Base UI.

**DO NOT add other widgets directly to the viewport**.

Only the Base UI Widget should explicitly be added to the viewport.
All other widgets get pushed onto the appropriate `CommonUI` Layer that you set up in your Base UI Widget.

This setup allows Common UI to manage menu navigation using Gamepad buttons, Keyboard keys, etc.


### `CommonActivatableWidget` Event: `OnActivated`

This event is provided by Common UI, along with its companion `OnDeactivated`.

These are the events to use to do things like change widget focus based on widgets being made
visible or invisible during game play.

Widgets are not deleted, they're often reused, and `OnActivated` and `OnDeactivated` are called often.


### `CommonActivatableWidget` Event: `GetDesiredFocusTarget`

You likely need to tell Common UI which widget should be focussed when a given widget is activated.
The most likely return value is `self`, e.g. focus the widget that was most recently activated.

If you override this in C++, this BP version of this function will not be called
unless you explicitly call it yourself.


## Input Handling

Input is directed by Common UI to the Widget that currently has focus
(by default the one at the top of the highest priority visible layer)
at any given time.

To support this, your widgets must be derived from C++ `CommonActivatableWidget`
and likely must implement `GetDesiredFocusTarget`.

Widget inputs are configured via:

- `DataTable` with row type `CommonInputActionDataBase`
- One or more `ControllerData` assets derived from `CommonInputBaseControllerData`
  - These reference the input action `DataTable`
- Custom BP/Object derived from `CommonUIInputData`
  - This references the input action `DataTable`
  - Configures Universal Input Actions, like:
    - Continue
    - Back/Cancel
    - possibly others


### Project Settings: Common Input

- Assign your custom `CommonUIInputData` object to `Input`.`Input Data` dropdown
- Configure Platform & Input Device Settings as needed
  - Windows
    - MKB
    - Gamepad
  - Etc


### Example: Lyra Common UI Layers

In ascending priority order, Lyra defines these Common UI Layers as stacks with associated Gameplay Tags:

- `UI.Layer.Game`
- `UI.Layer.GameMenu`
- `UI.Layer.Menu`
- `UI.Layer.Modal`


## Shared Style Assets

Common UI allows you to create style assets that are then easily applied to widgets,
buttons, etc.

In this way you only need to update the one style and all widgets in the game will be
updated based on that style change.

To accomplish this, derive from the base style classes as needed and configure your
widgets to use the appropriate style.

### Base Style C++ Classes:
- `CommonBorderStyle`
- `CommonButtonStyle`
- `CommonTextStyle`
- others?


<a id="Annotations"></a>
<a id="Annotations_EpicGames"></a>
## Annotations from Epic Games video sources

- [Lyra Cross-Platform UI Development](./Annotations/EpicGames-Lyra-Cross-Platform-UI-Development) (45m)
  - How CommonUI was implemented in LyraStarterGame
  - Good big picture overview of a CommonUI implementation
- [Introduction to CommonUI](./Annotations/EpicGames-Introduction-to-CommonUI) (2h 41m)
  - Effectively a 2.5 hour brain dump
  - How to add CommonUI to a new project
  - Show off some common styling options
  - Full Blueprint implementation, with numerous notes to "do not actually do it this way"
    - Intended really only as an example


<a id="Annotations_Other"></a>
