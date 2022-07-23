---
title: "Epic Games: Introduction to Common UI"
description: "Annotation of Epic Games developer video: Introduction to Common UI"
back_links:
  - link: /UE5/
    name: UE5
  - link: /UE5/CommonUI/
    name: CommonUI
  - link: /UE5/CommonUI/#Annotations
    name: Annotations
back_link_title: "Introduction to Common UI"
---


# Epic Games: Introduction to Common UI

Published 2022-07-22 by Epic Games
[Inside Unreal](https://www.youtube.com/playlist?list=PLZlv_N0_O1gbggHiwNP2JBXGeD2h12tbB),
guest Mike Prinke, Technical Writer @ Epic Games

This is basically a brain dump video.  Mike shows us:

- How to create a new UE 5 project and implement `CommonUI`
  - Configure Input
  - Configure Project Settings
- How to configure Common UI Styles
- Create `UI_Base` widget
  - Add to Viewport via custom `PlayerController`
- Create `UI_MainMenu` widget
  - Push onto `UI_Base`.`Menus` stack
- Create `UI_GenericPrompt` widget
  - Push onto `UI_Base`.`Prompts` stack
  - Implement generic Yes/No prompt functionality in Blueprints
- How to manage which Widget gets Input Focus
  - Especially important for Gamepad or Keyboard navigation users
- Demonstrates but does not actually complete display of Controller-specific Gamepad icons on buttons

[Full Video](https://youtu.be/TTB5y-03SnE)
(2h 41m)


# Annotation


## Introduction
- [0:07:13 - Introduction](https://youtu.be/TTB5y-03SnE?t=433)


## Setup New UE5 Project
  - [0:15:42 - Boilerplate Project Setup](https://youtu.be/TTB5y-03SnE?t=942)

### New Data Table: `InputActionTable`
  - [0:20:06 - New Data Table: `InputActionTable`](https://youtu.be/TTB5y-03SnE?t=1206) < `CommonInputActionDataBase`
  - Configure Input Actions that UI will respond to
    - Can have multiple nested data tables if needed
  - Make input action entries:
    - `Confirm` (KB=`Enter`, Gamepad=`Gamepad_FaceButton_Bottom`)
    - `Cancel` (KB=`Escape`, Gamepad=`Gamepad_FaceButton_Right`)
    - `TabLeft` (KB=`Q`, Gamepad=`Gamepad_LeftShoulder`)
    - `TabRight` (KB=`E`, Gamepad=`Gamepad_RightShoulder`)
    - [0:23:52 - How to configure Console-specific Button Overrides](https://youtu.be/TTB5y-03SnE?t=1432)
      - [0:24:38 - Add Gamepad Input Override](https://youtu.be/TTB5y-03SnE?t=1478)
        - Need source-compiled Engine to be able to configure specific consoles

### Create and Configure: `ControllerData`
  - [0:26:09 - Create ControllerData Blueprints](https://youtu.be/TTB5y-03SnE?t=1569)
    - Initially the names of these are erroneously `InputData...` but they are renamed to `ControllerData...` @~ 37 min
    - `ControllerData_PC_Keyboard` < `CommonInputBaseControllerData`
    - `ControllerData_PC_Gamepad` < `CommonInputBaseControllerData`
  - [0:27:00 - `ControllerData_PC_Gamepad` configuration](https://youtu.be/TTB5y-03SnE?t=1620)
    - [0:27:42 - Configure Input Brush Data Map](https://youtu.be/TTB5y-03SnE?t=1662)
      - [0:28:10 - Import Gamepad Icons](https://youtu.be/TTB5y-03SnE?t=1690)
        - [0:28:48 - UI Texture Mass Import Trick](https://youtu.be/TTB5y-03SnE?t=1728)
          - Select all newly imported texture assets
            - Right Click > Asset Actions > Bulk Edit via Property Matrix...
            - In Property Matrix dialog:
              - Search for "group"
              - Change `Texture Group` property to `UI`
      - Configure button textures in `Input Brush Data Map`
    - [0:31:24](https://youtu.be/TTB5y-03SnE?t=1884) - Don't know what `Input Brush Key Sets` is
    - [0:31:58 - Controller Texture](https://youtu.be/TTB5y-03SnE?t=1918) is an optional texture to represent the controller this config is for
  - [0:32:33 - `ControllerData_PC_Keyboard` configuration](https://youtu.be/TTB5y-03SnE?t=1953)
    - [0:32:46 - Configure Input Brush Data Map](https://youtu.be/TTB5y-03SnE?t=1966)

### New Blueprint: `DemoGameInputData`
- Map universal input actions to data table(s)
  - Universal Continue input action
  - Universal Back/Cancel input action
- [0:37:33 - New Blueprint: `DemoGameInputData`](https://youtu.be/TTB5y-03SnE?t=2253) < `CommonUIInputData`
- Default Click Action = `InputActionTable`.`Confirm` 
- Default Back Action = `InputActionTable`.`Cancel`


## Project Settings
  - [0:38:00 - Game / Common Input Settings](https://youtu.be/TTB5y-03SnE?t=2280)
    - InputData = `DemoGameInputData`
    - Platform Input
      - Windows
        - Add Controller Data:
            - `ControllerData_PC_Keyboard`
            - `ControllerData_PC_Gamepad`
      - Configure other platforms as your game requires


## Styling Assets
  - [0:39:02 - Styling Assets](https://youtu.be/TTB5y-03SnE?t=2342)
  - New Style Blueprints:
    - [0:39:31 - `BorderStyle_DemoGameGenericBorder`](https://youtu.be/TTB5y-03SnE?t=2371) < `CommonBorderStyle`
    - [0:39:50 - `ButtonStyle_DemoGameGenericButton`](https://youtu.be/TTB5y-03SnE?t=2390) < `CommonButtonStyle`
    - [0:39:59 - `TextStyle_DemoGameGenericMenuText`](https://youtu.be/TTB5y-03SnE?t=2399) < `CommonTextStyle`

## Create Button: `UI_GenericButton`
  - [0:56:01 - New Blueprint `UI_GenericButton`](https://youtu.be/TTB5y-03SnE?t=3363) < `CommonButtonBase`
    - [0:56:33 - Add Overlay child widget](https://youtu.be/TTB5y-03SnE?t=3392)
    - [0:56:44 - Set Button Style `ButtonStyle_DemoGameGenericButton`](https://youtu.be/TTB5y-03SnE?t=3406)


## Configure Button Style: `ButtonStyle_DemoGameGenericButton`
  - [0:57:02 - Configure Button Style `ButtonStyle_DemoGameGenericButton`](https://youtu.be/TTB5y-03SnE?t=3422)
  - Can configure button sounds, textures, colors
    - [0:58:33 - Consideration for Color-blind friendly UIs](https://youtu.be/TTB5y-03SnE?t=3513)
  - [0:59:44 - Explanation of `Selectable` setting](https://youtu.be/TTB5y-03SnE?t=3584)
    - Used for Radio Buttons & Checkboxes
  - For production, consider using textured images rather than tint colors
  - [1:01:22 - `Single Material` Setting](https://youtu.be/TTB5y-03SnE?t=3682)
    - *Unclear what this setting does*
  - [1:01:37 - Lyra uses transparent button style](https://youtu.be/TTB5y-03SnE?t=3697)
  - [1:02:26 - Size Button](https://youtu.be/TTB5y-03SnE?t=3746)
  - [1:02:44 - Add Common Text Widget](https://youtu.be/TTB5y-03SnE?t=3764)
    - Verify style = `TextStyle_DemoGameGenericMenuText`


## Localization Tangent
  - [1:06:02 - Open: Tools > Localization Dashboard](https://youtu.be/TTB5y-03SnE?t=3962)
  - [1:06:51 - Configure Default Text in Localization DB](https://youtu.be/TTB5y-03SnE?t=4011)


## Edit Button: `UI_GenericButton`
  - [1:07:39 - Add Text Variable: `ButtonText`](https://youtu.be/TTB5y-03SnE?t=4059)
    - On Pre-Construct: Save default button text value
    - Set Button Minimum Width/Height
  - [1:09:31 - Review how we created the default button](https://youtu.be/TTB5y-03SnE?t=4169)


## Create Main Menu: `UI_MainMenu`
  - [1:10:12 - Create Main Menu: `UI_MainMenu`](https://youtu.be/TTB5y-03SnE?t=4212) < `CommonActivatableWidget`
    - Add Overlay
      - Add Vertical Box
        - Add 4x `UI_GenericButton`
        - Add Spacers ...
      - Configure some visual display settings
  - [1:13:03 - Configure Buttons](https://youtu.be/TTB5y-03SnE?t=4383)
    - Set default Button Texts
    - Pad buttons
    - Name Button Widgets
  - [1:14:20 - Wrap Vertical Box with Common Border](https://youtu.be/TTB5y-03SnE?t=4460)
    - Edit Border Style `BorderStyle_DemoGameGenericBorder`


## Create Player Controller: `FrontEndPlayerController`
  - [1:16:21 - New Blueprint: `FrontEndPlayerController`](https://youtu.be/TTB5y-03SnE?t=4581) < `APlayerController`
  - [1:17:49 - Create new Widget of type `UI_Base`](https://youtu.be/TTB5y-03SnE?t=4669)
  - [1:18:10 - Create & Push New `UI_MainMenu` to the `UI_Base` Widget](https://youtu.be/TTB5y-03SnE?t=4690)
  - [1:18:16 - `UI_Base` Review](https://youtu.be/TTB5y-03SnE?t=4696)
    - Suggestion: Base Menu C++ class
      - Demonstration in Blueprint
      - Note: This is probably better done in C++ with more options & control than BP
  - [1:19:38 - Add `UI_Base` to Viewport](https://youtu.be/TTB5y-03SnE?t=4778) (traditional style)
  - [1:19:52 - Configure Game to use `FrontEndPlayerController`](https://youtu.be/TTB5y-03SnE?t=4792)
    - [1:19:59 - Create Game Mode: `FrontEndGameMode`](https://youtu.be/TTB5y-03SnE?t=4799)
      - Set Player Controller = `FrontEndPlayerController`
    - Game Mode Override = `FrontEndGameMode`
      - Or however you do this in your project
  - [1:20:23 - PIE Verify Main Menu loads](https://youtu.be/TTB5y-03SnE?t=4823)


## Add `UI_MainMenu` Functionality
  - [1:21:02 - Add `UI_MainMenu` Functionality](https://youtu.be/TTB5y-03SnE?t=4862)
  - [1:21:08 - Gamepad Focus](https://youtu.be/TTB5y-03SnE?t=4868)
    - `OnActivated`:
      - `SetFocus`(`GetDesiredFocusTarget()`)

### GetDesiredFocusTarget()
  - [1:22:20 - Override `GetDesiredFocusTarget()`](https://youtu.be/TTB5y-03SnE?t=4940)
    - Discussion of different ways you could compute this value
  - [1:24:25 - On Windows, default Input Type = MKB](https://youtu.be/TTB5y-03SnE?t=5065)


## Project Settings: Engine User Interface
  - [1:28:11 - Project Settings: Engine User Interface](https://youtu.be/TTB5y-03SnE?t=5291)


## Edit: `UI_MainMenu`
  - [1:29:25 - Add `UI_MainMenu` Functionality](https://youtu.be/TTB5y-03SnE?t=5365)


## Create Generic Prompt: `UI_GenericPrompt`
  - [1:31:02 - New Blueprint: `UI_GenericPrompt`](https://youtu.be/TTB5y-03SnE?t=5462) < `UCommonActivatableWidget`
  - Visual Layout
    - Add Overlay
    - Add Vertical Box
    - Add Common Border
      - Verify Style = `BorderStyle_DemoGameGenericBorder`
    - Add Common Text: `PromptText`
    - More Steps...  Add Yes/No Button
  - [1:36:06 - Completed Yes/No Generic Prompt Layout](https://youtu.be/TTB5y-03SnE?t=5768)

### Implement `GetDesiredFocusTarget()`
  - [1:36:21 - GetDesiredFocusTarget](https://youtu.be/TTB5y-03SnE?t=5781)
    - `YesButton` button focussed by default
    - Rename buttons `YesButton` & `NoButton`

### Implement `OnActivated` Event
  - [1:36:55 - OnActivated](https://youtu.be/TTB5y-03SnE?t=5815)
    - `SetFocus`(`GetDesiredFocusTarget()`)

### Create Custom Event: `SetPromptInfo`
  - [1:37:27 - New Custom Event: `SetPromptInfo`](https://youtu.be/TTB5y-03SnE?t=5847)
    - Parameters:
      - Prompt Text
      - Widget that owns this prompt
      - Prompt Index


## Edit: `UI_MainMenu`

### Create Custom Event: `OnPromptConfirm`
  - [1:41:55 - Custom Event: On Prompt Confirm](https://youtu.be/TTB5y-03SnE?t=6115)
    - [1:42:21 - Demo BP is using Integers as "Prompt Index"](https://youtu.be/TTB5y-03SnE?t=6141)
    - [1:43:40 - Mike does not like this "Prompt Index" solution](https://youtu.be/TTB5y-03SnE?t=6220) *(suggests using C++ delegates instead)*
      - Mentions this code he produces is more of "prototype" quality and not fit for a shipping game.
      - Good for understanding the flow of events without requiring knowledge of C++.

  - [1:44:15 - Spends time trying to see if he can implement delegates with Blueprint](https://youtu.be/TTB5y-03SnE?t=6285)
    - Not worth watching the "cheat" he spends time trying to find, he ultimately doesn't find it.
    - This tangent goes on for a while, Mike then deletes this work


## Edit: `UI_GenericPrompt`
  - Mike implements the "Prompt Index" solution from above

### Edit: `UI_GenericPrompt`.`SetPromptInfo` Custom Event
  - [1:46:31 - Complete `UI_GenericPrompt`.`SetPromptInfo` implementation](https://youtu.be/TTB5y-03SnE?t=6391)

### Implement `YesButton`.`OnBaseButtonClicked` Event
  - [1:47:26 - YesButton Click Implementation](https://youtu.be/TTB5y-03SnE?t=6446)
  - Mike recommends using Soft Object Pointers


## Edit: `UI_Base`
  - [1:49:17 - Add Parameters](https://youtu.be/TTB5y-03SnE?t=6557)
    - InPromptText - text
    - InPromptOwner - soft `UI_MainMenu` object reference
    - InPromptIndex - int

### Edit: `PushPrompt` Custom Event
  - [1:50:14 - Modify `PushPrompt` Custom Event](https://youtu.be/TTB5y-03SnE?t=6614)
    - Set Event Input: `Activatable Widget Class` = `UI_GenericPrompt`
    - Call `SetPromptInfo()` on the newly added prompt
    - [1:50:40 - Edit Complete - Visual Reference](https://youtu.be/TTB5y-03SnE?t=6640)


## Edit: `FrontEndPlayerController`

### New Custom Event: `PushPrompt`
  - [1:51:05 - New Custom Event: `PushPrompt`](https://youtu.be/TTB5y-03SnE?t=6665)

### New Variable: `UI_Base`
  - [1:51:24 - Save reference to `BeginPlay`-created `UI_Base` Widget]()

### Edit: `PushPrompt` Custom Event
  - [1:51:59 - Proxy `PushPrompt` to `UI_Base` widget](https://youtu.be/TTB5y-03SnE?t=6719)


## Edit: `UI_MainMenu`
  - [1:52:34 - PIE & realize Quit button isn't implemented](https://youtu.be/TTB5y-03SnE?t=6754)

### Implement `QuitGameButton`.`OnButtonBaseClicked` Event
  - [1:52:52 - Implement `QuitGameButton`.`OnButtonBaseClicked`](https://youtu.be/TTB5y-03SnE?t=6772)
  - [1:53:44 - PIE test Quit button functionality](https://youtu.be/TTB5y-03SnE?t=6824)


## Edit: `UI_GenericPrompt`

### Implement `NoButton`.`OnButtonBaseClicked`
  - [1:53:52 - Deactivate Widget `UI_GenericPrompt` when `NoButton` clicked](https://youtu.be/TTB5y-03SnE?t=6832)

### Fix Gamepad Cancel behavior
- [1:54:49 - PIE to test Gamepad, find problem](https://youtu.be/TTB5y-03SnE?t=6889)
- [1:55:06 - Begin try to fix Gamepad focus after Cancel](https://youtu.be/TTB5y-03SnE?t=6906)

### Edit: `UI_MainMenu`
- [1:55:35 - Enable `Auto Restore Focus` in Property Details](https://youtu.be/TTB5y-03SnE?t=6935)
  - This doesn't work, Mike doesn't know why
  - It could be because he didn't enable the `Is Focusable` property

### Edit: `UI_Base`

#### Edit: `PushPrompt` Custom Event
- [1:56:28 - Bind Event to On Widget Deactivated](https://youtu.be/TTB5y-03SnE?t=6988)
  - Create Custom Event: `OnClosePrompt`

#### Edit: `OnClosePrompt` Custom Event
- [1:56:53 - Set Focus to Active Widget's Desired Focus Target](https://youtu.be/TTB5y-03SnE?t=7013)
- [1:58:48 - Fix IsValid check on wrong node](https://youtu.be/TTB5y-03SnE?t=7128)
- PIE Demo
  - [1:59:07 - Controller widget focus bug is now fixed](https://youtu.be/TTB5y-03SnE?t=7147)
  - [1:59:25 - Controller navigation is limited to current focus Widget](https://youtu.be/TTB5y-03SnE?t=7165)


## Another way to do this
- [2:00:52 - Another way to do this](https://youtu.be/TTB5y-03SnE?t=7252)

### Edit: `UI_Base`
- [2:01:00 - What if? Push Prompts onto `Menu` Stack rather than `Prompt` stack](https://youtu.be/TTB5y-03SnE?t=7260)
  - [2:01:12 - PIE Demonstration](https://youtu.be/TTB5y-03SnE?t=7272)
    - When opening a prompt, the main menu fades out of view
    - Only the top-most widget of a stack is displayed
      - Higher priority stacks are displayed on top
      - But only one widget is displayed per stack (the highest priority on that stack)
- [2:01:45 - Set Menu Stack Transition Type](https://youtu.be/TTB5y-03SnE?t=7305)
  - Design Mode: Details: Transition
    - Transition Type
    - Transition Curve Type
    - Transition Duration
- [2:02:33 - View Details Panel for `UI_Base`](https://youtu.be/TTB5y-03SnE?t=7353)


## Back Handler Implementation

### Edit: `UI_GenericPrompt`
- [2:02:44 - `Back`.`Is Back Handler` Property](https://youtu.be/TTB5y-03SnE?t=7364)
- Lots of thinking to self about how to solve problem
- [2:06:10 - Enable `Activation`.`Is Modal` Property](https://youtu.be/TTB5y-03SnE?t=7570)
  - Discuss `Is Modal` behavior

### Edit: `UI_Base`
- [2:07:07 - Switch back to `Prompt` stack rather than `Menu` stack for prompts](https://youtu.be/TTB5y-03SnE?t=7627)

### Unsuccessful PIE Test
- [2:07:18 - PIE](https://youtu.be/TTB5y-03SnE?t=7638)
- This example is still broken, Mike tries to trouble shoot for a while
  - He shows his practise project that works the way he wants

### Edit: `UI_GenericPrompt`

#### Implement: `UI_GenericPrompt`.`OnHandleBackAction` Method
- [2:09:02 - Implement `UI_GenericPrompt`.`OnHandleBackButton`](https://youtu.be/TTB5y-03SnE?t=7742)
  - Exec: `DeactivateWidget`(`self`)
  - Return: `True`

### Successful PIE Test
- [2:09:25 - Successful PIE Test](https://youtu.be/TTB5y-03SnE?t=7765)


## Discussion of `OnHandleBackAction`
- [2:09:30 - Need to explicitly handle `OnHandleBackAction`](https://youtu.be/TTB5y-03SnE?t=7770)
  - Allows for transition systems, etc
  - By default, nothing happens on back action, BP has full control


## How to Bind Gamepad Buttons to on on-screen Widgets
- [2:10:07 - How to Bind Gamepad Buttons to on on-screen Widgets](https://youtu.be/TTB5y-03SnE?t=7807)

### Edit: `UI_MainMenu`
- [2:10:37 - Modify `UI_MainMenu` Widget Hierarchy](https://youtu.be/TTB5y-03SnE?t=7837)
  - Add some `Common Action Widget`
    - `Common Action Widget` is actually a "Button Icon"
    - Configure Input Actions for each of these widgets
  - [2:13:09 - PIE Test](https://youtu.be/TTB5y-03SnE?t=7989)

### Edit: Project Settings: Common Input Settings
- [2:14:00 - Set `Windows`.`Default Gamepad Name` = `Generic`](https://youtu.be/TTB5y-03SnE?t=8040)
- [2:14:38 - Discuss How `Default Gamepad Name` should be configured for each platform](https://youtu.be/TTB5y-03SnE?t=8078)
  - [2:15:00 - Show config for `Windows` `Generic` `Gamepad Name`](https://youtu.be/TTB5y-03SnE?t=8100)
- [2:15:23 - Successful PIE Test](https://youtu.be/TTB5y-03SnE?t=8123)

### There were 2 Editor Crashes @ 2:16:18 & 2:25:00 ish
- Recommend skip ahead to [Q&A during editor restart](#QA_Does_CommonUI_Work_in_VR)
  - or skip ahead to [Create Button: `UI_GenericActionButton`](#UI_GenericActionButton)

### [NOT SAVED] Edit: `UI_MainMenu`
- [2:15:33 - RB+LB Button Changes](https://youtu.be/TTB5y-03SnE?t=8153)

### [NOT SAVED] Create `UI_GenericTabButton`
- [2:16:18 - Create `UI_GenericTabButton`](https://youtu.be/TTB5y-03SnE?t=8178) < `CommonBoundActionButton`
- Unreal Editor crash
  - This button did not get saved

<a id="QA_Does_CommonUI_Work_in_VR"></a>
### Q&A While Editor Restart
- [2:17:55 - Q: Does CommonUI work in VR?](https://youtu.be/TTB5y-03SnE?t=8275)
  - A: Not sure. Answer is probably "Yes, but ..."
    - Not same type of rendering of UI on screen in VR
    - Need 3D world representation of UI
      - Add `WidgetComponent` to world Actor, UI would live on that
- Recommend skip ahead to [Create Button: `UI_GenericActionButton`](#UI_GenericActionButton)
  - The stuff between now and then is not saved due to another UE Editor Crash

### [NOT SAVED] Create Button of wrong type & Delete it
- [2:19:52 - Create Widget: `BoundButtonWidget`](https://youtu.be/TTB5y-03SnE?t=8392) < `CommonActionWidget`
  - DELETE Widget


### [NOT SAVED] Edit: `UI_MainMenu`
- [2:20:45 - RB+LB Button Changes](https://youtu.be/TTB5y-03SnE?t=8445)
  - Add `UI_GenericButton`
- [2:21:59 - Configure `CommonUI` Button class `Triggering Input Action`](https://youtu.be/TTB5y-03SnE?t=8519)
  - Would need to add an Action Widget to show the button icon on this button
  - [2:23:04 - Implement `Button`.`OnBaseButtonClicked` Event](https://youtu.be/TTB5y-03SnE?t=8584)
    - This does not work as Mike hoped
- The changes made in this section do not work, try alternate button type `CommonBoundActionButton`

### [NOT SAVED] Create Button: `UI_BoundActionButton`
- [2:25:00 - Create `UI_BoundActionButton`](https://youtu.be/TTB5y-03SnE?t=8700) < `CommonBoundActionButton`
- Unreal Editor crash


<a id="UI_GenericActionButton"></a>
### [INCOMPLETE] Create Button: `UI_GenericActionButton`
- [2:26:02 - Create `UI_GenericActionButton`](https://youtu.be/TTB5y-03SnE?t=8762) < `CommonBoundActionButton`
  - 3rd time trying to make this button, does not continue


### Q&A
- [2:26:24 - Q: How to create Search Bar in UI?](https://youtu.be/TTB5y-03SnE?t=8784)
  - Seems like Mike misunderstood the question?
  - At least, his explanation for how one might go about this is unclear to me
  - He seems to be thinking the question relates to searching for widgets of a specific type?
    - Recommends adding Gameplay Tags to widgets to facilitate the search
  - Some discussion about Gameplay Tags
  - Inventory example:
    - Search items in inventory for Gameplay Tag
    - Display only widgets for items matching that tag


## End Stream
- [2:37:37 - End Stream](https://youtu.be/TTB5y-03SnE?t=9457)
