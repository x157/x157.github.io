---
title: "Common UI Plugin"
description: "Annotation of tutorial videos relating to the Common UI plugin for Unreal Engine 5"
breadcrumb_path: "UE5"
breadcrumb_name: "CommonUI"
---


# Common UI Plugin

Epic's `CommonUI` plugin is what
[LyraStarterGame](../LyraStarterGame/)
uses to control the flow of user input.

This plugin allows the automation of a lot of platform-specific behavior in the UI.
For example, buttons can be automatically shown/hidden depending on the platform
type, and it is very easy to test different platforms in the Editor.

This documentation is being based heavily on
[How `LyraStarterGame` implements `CommonUI`](/UE5/LyraStarterGame/CommonUI/).
See that link for detailed information on how `LyraStarterGame` configures and uses `CommonUI`.


## Considerations for Usage

You create a Base UI Widget, for example in your `PlayerController`,
which is the one and only widget you explicitly `Add to Viewport`.

**DO NOT add other widgets directly to the viewport**.

Only the Base UI Widget should explicitly be added to the viewport.
All other widgets get pushed onto the appropriate `CommonUI` Layer that you set up in your Base UI Widget.

This setup allows Common UI to manage menu navigation using Gamepad buttons, Keyboard keys, etc.

To support this, your widget must be derived from C++ [`CommonActivatableWidget`](#CommonActivatableWidget).


### Example: Lyra Common UI Layers

In ascending priority order, Lyra defines these Common UI Layers as stacks with associated Gameplay Tags:

- `UI.Layer.Game` - UI relating directly to gameplay
- `UI.Layer.GameMenu` - For example: Inventory UI
- `UI.Layer.Menu` - Main Menu layer
- `UI.Layer.Modal` - Prompt/Confirmation Dialog layer


<a id="CommonActivatableWidget"></a>
## Base Widget Class: `CommonActivatableWidget`

`CommonActivatableWidget` should be used as the base class.
This gives you access to support for many new common C++ events.

<todo-p>
Find/Link to good CommonActivatableWidget documentation
</todo-p>


### Event: `CommonActivatableWidget`.`OnActivated`

This event is provided by Common UI, along with its companion `OnDeactivated`.

These are the events where you should do things like change widget focus based on widgets being made
visible or invisible during game play.

Widgets are not deleted, they're often reused. `OnActivated` and `OnDeactivated` are called often.


### Event: `CommonActivatableWidget`.`GetDesiredFocusTarget`

You likely need to tell Common UI which widget should be focussed when a given widget is activated.
The most likely return value is `self`, e.g. focus the widget that was most recently activated.

If you override this in C++, this BP version of this function will not be called
unless you explicitly call it yourself.

This seems to be particularly important when using non-pointer input devices for menu navigation,
like Gamepad buttons or Keyboard keys.


## Input Handling

Input is directed by Common UI to the Widget that currently has focus
(by default the one at the top of the highest priority visible layer)
at any given time.

Widget inputs are configured via:

- `DataTable` with row type `CommonInputActionDataBase`
- One or more `CommonInputBaseControllerData`-derived `ControllerData` assets
  - These reference the input action `DataTable`
- Custom `CommonUIInputData`-derived BP/Object
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


#### Resources to Better Understand Input & Project Setup for Common UI

- [Epic's Official Common UI Quickstart Guide](https://docs.unrealengine.com/5.0/en-US/common-ui-quickstart-guide-for-unreal-engine/) (text + screenshot doc)
- Volkiller Games: [Common UI Input system in Unreal Engine 5](https://youtu.be/q05jmFyeb0c) (5 minute video)
- Epic's Inside Unreal episode: [Introduction to CommonUI](./Annotations/EpicGames-Introduction-to-CommonUI) (2.5 hour video)


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


## Debugging Common UI

###### Console command: `CommonUI.DumpActivatableTree`

If you enter the above console command you will get an output log dump of debug information
that can be helpful to understand what the current Common UI display stack looks like.


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


## External References

For more insight into Common UI, I recommend:

- [benui's Common UI Intro](https://benui.ca/unreal/common-ui-intro/)
- [benui's Deep Dive into Common UI Buttons](https://benui.ca/unreal/common-ui-button/)
  - Insight into Common UI Buttons, how to design and use them
- [Volkiller Games: Common UI Input system in Unreal Engine 5](https://youtu.be/q05jmFyeb0c) (6m)
  - This video primarily details the initial project setup
  - Also shows off Controller-specific button icons
- [Volkiller Games: Common Button and Common Activatable widget Unreal Engine 5](https://youtu.be/HUGtsOqTIp8) (6m)
