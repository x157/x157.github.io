---
title: "Common UI Action Router"
description: "Description of the Common UI Action Router and how to use it to manage Input Modes in your Common UI based Game."
breadcrumb_path: "UE5/CommonUI"
breadcrumb_name: "Action Router"
---

# Common UI Action Router

The Common UI Action Router is the place to route all requests to set the input mode.

**DO NOT** try to circumvent this in your own code.
Instead, have your code create Common UI `FUIInputConfig` settings and
send them to Common UI to actually do the input mode changes.


## Set Active UI Input Config

```c++
void SetActiveUIInputConfig(const FUIInputConfig& NewConfig);
```

This method is Public.

Call this from Game code to change the Common UI Input Config to your preferred value.


## Apply UI Input Config

```c++
virtual void ApplyUIInputConfig(const FUIInputConfig& NewConfig, bool bForceRefresh);
```

To change how input works in the game, 
you must override this method.  This is effectively the setter for
the `ActiveInputConfig` member variable.

Your override **must not** call the base class.  Instead, completely override it.

That being done, you can then set up the inputs any way you want them to work in your game.
