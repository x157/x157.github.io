---
title: "UE5 Core Redirects"
description: "Overview of C++ Core Redirects in Unreal Engine 5: what they are and how to use them"
breadcrumb_path: "UE5/Engine"
breadcrumb_name: "Core Redirects"
---


# UE5 Core Redirects

Skip ahead to:

- [How to use Core Redirects](#HowToUse)
- [Core Redirect Documentation](#CoreRedirects_Documentation)
- [Game Feature Plugin Workaround](#GameFeaturePluginWorkaround)
  - if you know how this works but Game Feature Plugins are still bugged


<a id="HowToUse"></a>
# How to use Core Redirects

To replace an old C++ class with a new one, or to refactor a C++ class, you need to take
additional steps to update Blueprint assets, since (brace for it) assets are stored as binaries.

Because of this, you must take these additional steps during development any time a C++ name changes:

1. Create `[CoreRedirects]` INI
2. Run `-fixupredirects` command
3. Remove `[CoreRedirects]` INI
4. Commit Redirected Binaries

*Epic **!!** Please give us TEXT BASED SOURCE and
(radical new software idea) generate the binaries from it.
Binary source is an inefficient waste of every developer's time
and the bane of every merge reviewer. Free us from binary source!
Please! Thanks.*
`:D`


## 1) Create `[CoreRedirects]` INI

To change the name of the `OldName` class to `NewName` in the `XistGame` plugin,
you need a redirect INI such as this:

```ini
[CoreRedirects]
+ClassRedirects=(OldName="/Script/XistGame.OldName",NewName="/Script/XistGame.NewName")
```


## 2) Run `-fixupredirects` command

With the redirect in the appropriate INI, run this command in your terminal:

```powershell
UnrealEditor.exe MyProject.uproject -run=ResavePackages -fixupredirects -autocheckout -projectonly -unattended
```

The above command will redirect all the binary assets that refer to `OldName` to instead refer to `NewName`.


## 3) Remove `[CoreRedirects]` INI

###### DO NOT COMMIT CORE REDIRECTS TO SOURCE CONTROL IN GENERAL

The purpose of these is to effectively atomically update all binaries from `OldName` 🡒 `NewName`
so there is no continuation of the usage of the name `OldName`.

## 4) Commit Redirected Binaries

Commit the new, updated binaries to source control and then remove the `CoreRedirects`
section of your `Default.ini` without it ever having entered source control.


---

<a id="CoreRedirects_Documentation"></a>
# `[CoreRedirects]` Documentation

These two examples both redirect `OldClass` to `NewClass`, assuming `OldClass` is in `Module`:

```ini
+ClassRedirects=(OldName="OldClass", NewName="/Script/Module.NewClass")
+ClassRedirects=(OldName="/Script/Module.OldClass", NewName="/Script/Module.NewClass")
```

You can also add options or add a value change map:

```ini
+ClassRedirects=(OldName="OldClass", NewName="/Script/GameName.GameSpecificClass", bInstanceOnly=true)
+PackageRedirects=(OldName="/OldPlugin/", NewName="/NewPlugin/", MatchSubstring=true)
+PackageRedirects=(OldName="/Game/DeletedContentPackage", Removed=true)
+EnumRedirects=(OldName="/Script/Core.EEnumType", NewName="/Script/NewModule.ENewEnumType", ValueChanges=(("OldValue", "NewValue"), ("OldValue2", "NewValue2")) )
```

### Which INI path to use?

- Engine = `Engine/Config/BaseEngine.ini`
- Game = `Game/Config/DefaultEngine.ini`
- `PLUGIN` Plugin = `Game/Plugins/PLUGIN/Config/DefaultPLUGIN.ini`
- `FEATURE` Game Feature Plugin = `Game/Plugins/GameFeatures/FEATURE/Config/DefaultFEATURE.ini` *(see [note](#Note_GameFeaturesRedirectsBroken))*


# Renaming a Plugin

There may be a bit more to it than this, I haven't tested this yet, but these are the notes I collected
regarding how to rename an entire Plugin.

The public documentation on this is scarce.  If you can offer insight,
[open an issue](https://github.com/x157/x157.github.io/issues)
on GitHub and I'll update as needed.

```ini
[CoreRedirects]
+PackageRedirects=(OldName="/OldModuleName/",NewName="/NewModuleName/",MatchSubstring=true)
+ClassRedirects=(OldName="/Script/OldModuleName.",NewName="/Script/NewModuleName.",MatchSubstring=true)
+StructRedirects=(OldName="/Script/OldModuleName.",NewName="/Script/NewModuleName.",MatchSubstring=true)
+PropertyRedirects=(OldName="/Script/OldModuleName.",NewName="/Script/NewModuleName.",MatchSubstring=true)
```


<a id="Note_GameFeaturesRedirectsBroken"></a>
<a id="GameFeaturePluginWorkaround"></a>
## Redirects for Game Feature Plugins

###### NOTE: C++ Core Redirects are bugged for Game Feature Plugins as of 5.0.3

I submitted a bug report to Epic, hopefully they fix it soon.  Assuming they've fixed it,
the above is how it is *supposed to work* once it gets fixed.

If it's still not working as of your version of Unreal Engine, Epic has provided the following
workaround, which is what they use in their internal Game Feature Plugins:

1. Use INI file name `Plugin.ini` rather than `DefaultPlugin.ini`
   - Example: `Game/Plugins/GameFeatures/FEATURE/Config/FEATURE.ini`
2. Due to differences in how Game Feature INIs are processed, you cannot use the `+` operator in the INI
   - Thus you can only redirect one thing at a time

So for example to redirect `XistGame.OldName` to `XistGame.NewName`, where `XistGame` is the name
of my Game Feature Plugin:

```ini
[CoreRedirects]
ClassRedirects=(OldName="/Script/XistGame.OldName",NewName="/Script/XistGame.NewName")
```

And if you also want to redirect `OldName2` to `NewName2`, you have to run the redirect command
multiple times, once for each name.

Note that in the future the use of this non-standard filename may cause warnings or errors.  If you see
that, it means the bug has been fixed and you don't need to use this workaround any longer.

Special thanks to Ben Zeigler @ Epic
for confirming the bug and providing the workaround.


# Reference

For more information see the official docs:

- [Official UE5 Core Redirects Documentation](https://docs.unrealengine.com/5.0/en-US/core-redirects/)
- [Fixup Redirector From Editor](https://docs.unrealengine.com/5.0/en-US/redirectors/)
- [UE Forum Post: How to Rename a Plugin?](https://forums.unrealengine.com/t/how-can-i-rename-a-plugin-and-not-break-all-blueprints/343240)
- [Engine Bug UE-163425](https://issues.unrealengine.com/issue/UE-163425)
