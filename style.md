---
sitemap: false
title: Style Visualization
description: See the various html elements all on one page
back_link_title: Style Visualization
---

# Header 1 `code` [link](./) and [`code` link](./)
## Header 2 `code` [link](./) and [`code` link](./)
### Header 3 `code` [link](./) and [`code` link](./)
#### Header 4 `code` [link](./) and [`code` link](./)
##### Header 5 `code` [link](./) and [`code` link](./)
###### Header 6 `code` [link](./) and [`code` link](./)

Paragraph with `code` and [link](./) and [`code` link](./)

| Plain | Code   | Link       | Ymark                            | Nmark                           | Arrows       |
|-------|--------|------------|----------------------------------|---------------------------------|--------------|
| text  | `text` | [text](./) | ![yes](/assets/images/Ymark.png) | ![no](/assets/images/Nmark.png) | 🡐 🡒 🡑 🡓 « » |

- Bullet list
- with `code`
- and [link](./)

1. Ordered list
3. with `code`
4. and [link](./)

paragraph with a <tip>&lt;tip/&gt;</tip> in it

paragraph with a <todo>&lt;todo/&gt;</todo> in it

paragraph with a <problem>&lt;problem/&gt;</problem> in it


------------------------------------------------------------

<todo-p>
Value inside &lt;todo-p/&gt; tag
</todo-p>

------------------------------------------------------------

paragraph between h rules

------------------------------------------------------------

multiple h rules in a row

------------------------------------------------------------
------------------------------------------------------------
------------------------------------------------------------

### C++ Code

```cpp
// Sample UObject class

UCLASS(DisplayName="Unreal Name")
class FOO_API UFoo : public UObject
{
	GENERATED_BODY()

    Foo(const FObjectInitializer& ObjectInitializer = FObjectInitializer::Get());

protected:
    UPROPERTY(BlueprintReadWrite, Category="Xist")
    bool bHopeForSuccess = true;

};
```

### C# Code

```cs
// MassGameTime.Build.cs

using UnrealBuildTool;
using System.Collections.Generic;

public class MassTimeGameTarget : TargetRules
{
	public MassTimeGameTarget(TargetInfo Target) : base(Target)
	{
		Type = TargetType.Game;
		DefaultBuildSettings = BuildSettingsVersion.V5;
		IncludeOrderVersion = EngineIncludeOrderVersion.Unreal5_6;
		ExtraModuleNames.Add("MassTimeGame");
	}
}
```

### INI File

```ini
[CoreRedirects]
+ClassRedirects=(OldName="/Script/XistGame.OldName",NewName="/Script/XistGame.NewName")
```

### Powershell Code

```powershell
#!/usr/bin/env pwsh

$MinPSVersion = 7

if ($MinPSVersion -gt $PSVersionTable.PSVersion.Major) {
    Write-Error "This system is using PowerShell version $($PSVersionTable.PSVersion.Major), which is not adequate to run UnrealXistTools."
    throw "Powershell $($MinPSVersion)+ is required. Install it with 'winget install Microsoft.PowerShell'"
}
```
