---
title: "Custom C++ Base Wheeled Vehicle Class"
description: "Overview of a custom C++ Base class that will support Wheeled Vehicles in a Lyra project"
breadcrumb_path: "UE5/LyraStarterGame/Vehicles"
breadcrumb_name: "Custom Base C++ Wheeled Vehicle Class"
---

# Custom C++ Base Wheeled Vehicle Class

```c++
UCLASS()
class XCL_API AXclWheeledVehicle : public AWheeledVehiclePawn
    , public IAbilitySystemInterface
    , public ILyraTeamAgentInterface
```

### Other Interfaces Supported by `ALyraCharacter`

```c++
    , public IGameplayCueInterface
    , public IGameplayTagAssetInterface
```


# Advanced C++ Tasks

- Add [Modular Gameplay](/UE5/ModularGameplay/) support (duplicate `AModularPawn` C++)
- Add and fully integrate a **Pawn Extension Component** (duplicate C++ from `ALyraCharacter`)

## XCL Interfaces

```c++
    , public IXclInteractableTarget
    , public IXclItem
```
