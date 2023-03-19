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
    , public IGameplayCueInterface
    , public ILyraTeamAgentInterface
```

## Add Abilities

```c++
    , public IAbilitySystemInterface
    , public IGameplayTagAssetInterface  // requires an ability system
```

## Add Health & Death

- HealthComponent
- Health + Combat Attribute Sets


# Advanced C++ Tasks

- Add [Modular Gameplay](/UE5/ModularGameplay/) support (duplicate `AModularPawn` C++)
- Add and fully integrate a **Pawn Extension Component** (duplicate C++ from `ALyraCharacter`)


## Add XCL Interfaces

```c++
    , public IXclInteractableTarget
    , public IXclItem
```
