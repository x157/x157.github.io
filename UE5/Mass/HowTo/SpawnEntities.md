---
title: "How To Spawn Entities | UE5 Mass"
description: "Various ways to spawn Mass Entities"
breadcrumb_path: "UE5/Mass/HowTo"
breadcrumb_name: "SpawnEntities"
---

# How To: Spawn Entities

Personally I use a combination of all of these methods.
There isn't really a "right way" per se, there are instead different ways
that are good for different situations.

- [Mass Spawner in Level](#MassSpawnerInLevel) (UE 5.2+)
  - Place a Mass Spawner actor in Level
  - Auto spawns entities when the Level loads
- [Mass Entity Builder](#MassEntityBuilder) (UE 5.6+)
  - Excellent for procedural entity generation
  - Code Examples:
    [ [Add](#MassEntityBuilder_Add)
    | [Add_GetRef](#MassEntityBuilder_AddGetRef)
    | [GetOrCreate](#MassEntityBuilder_GetOrCreate)
    | [Chaining](#MassEntityBuilder_Chaining)
    ]
- [Mass Spawner in Gameplay code](#MassSpawnerInCode) (UE 5.4+)
  - Use the Mass Spawner subsystem
  - Defer Spawn entities on demand from Gameplay code
- [Entity Manager Reservation](#EntityManagerReservation) (UE 5.4+)
  - Batch Reserve Entities using Entity Manager
    - Their Entity Handles are immediately available
  - Defer Spawn Reserved Entities using Entity Manager


<a id='MassSpawnerInLevel'></a>
## Mass Spawner in Level

This is the example you see in most of the Mass videos, where you add
a `AMassSpawner` actor directly to your Level and you configure it with
a static config of all the things you want it to immediately spawn
when the level loads.

Because this is so simple, and it's covered in many videos, I won't
reiterate it here, other than to say this is a perfectly valid way
of spawning a static set of entities when your Level loads.

### Pros
- Very easy to implement

### Cons
- Difficult to do much customization
- Only spawns entities on level load, doesn't help you spawn entities at Runtime


<a id='MassEntityBuilder'></a>
## Mass Entity Builder

*I copied most of this `UE::Mass::FEntityBuilder` info from UE 5.6 `MassEntityBuilder.h` header docs.*

`FEntityBuilder` is a utility struct that provides a convenient way to create and configure entities
in the Mass framework. It bridges multiple APIs from
[`FMassEntityManager`](../#EntityManager),
`UMassSpawnerSubsystem`,
[`FMassEntityTemplate`](../DataTypes#FMassEntityTemplate)
and other related components, allowing for streamlined entity creation and configuration.

#### Key Features
- Can be seamlessly used in place of `FMassEntityHandle`, allowing for consistent and intuitive usage.
- An entity only gets created once `Commit()` is called.
- Copyable, but copied instances represent new entities without carrying over the reserved entity handle.

#### Current Limitations
- Committing entities while Mass's processing is in progress is not yet supported;
  this functionality will be implemented in the near future.
  - For now, use `EntityManager.Defer().PushCommand` to execute `Commit()`
- No support for entity grouping.

#### Example Usages

<a id='MassEntityBuilder_Add'></a>
##### Add fragments with known values

```cpp
FEntityBuilder Builder(EntityManager);
Builder.Add<FTransformFragment>(FTransform(FVector(100, 200, 300)))
    .Commit();  // the entity gets reserved and built by this call
``` 

<a id='MassEntityBuilder_AddGetRef'></a>
##### Get references to added fragments for additional configuration

```cpp
FEntityBuilder Builder(EntityManager);
FMassEntityHandle ReservedEntity = Builder; // Entity handle reserved, can be used for commands.
Builder.Add_GetRef<FTransformFragment>().GetMutableTransform().SetTranslation(FVector(100, 200, 300));
Builder.Commit(); // Entity creation is finalized at this point.
```

<a id='MassEntityBuilder_GetOrCreate'></a>
##### Change a previously added fragment, if it exists, or add it

```cpp
// initially:
FEntityBuilder Builder(EntityManager);
Builder.Add<FTransformFragment>(FTransform(FVector(100, 200, 300)));
// then sometime later, elsewhere in code:
Builder.GetOrCreate<FTransformFragment>().GetMutableTransform().SetTranslation(FVector(111, 222, 333));
// and finally:
Builder.Commit();
```

<a id='MassEntityBuilder_Chaining'></a>
##### Chaining with `FMassEntityManager::MakeEntityBuilder`:

```cpp
FMassEntityHandle NewEntity = EntityManager.MakeEntityBuilder()
    .Add<FMassStaticRepresentationTag>()
    .Add<FTransformFragment>()
    .Add<FAgentRadiusFragment>(FAgentRadiusFragment{ .Radius = 35.f })
    .Add<FMassVelocityFragment>()
    .Commit();
```


<a id='MassSpawnerInCode'></a>
## Mass Spawner from Gameplay code

We can use the Mass Spawner Subsystem (`UMassSpawnerSubsystem`)
directly from Gameplay code to spawn entities on demand.

You can do this anywhere you want, in any thread.
There are a few key points here:

- Use `EntityManager.Defer()` to ensure that we don't attempt to spawn entities
  while processors are executing.
- `FMassEntityConfig` struct **must remain valid** until after async spawning completes
  - This is typically wrapped in a `UObject` or `UDataAsset` to assist with this

### Sample Gameplay Code

```cpp
// Use UMassSpawnerSubsystem to async spawn entities based on a static
// UMassEntityConfigAsset configuration.
//
// You can call this on anywhere in your Gameplay code.

UWorld* World = GetWorld();
check(World);

FMassEntityManager& EntityManager = UE::Mass::Utils::GetEntityManagerChecked(*World);

// Load `this.EntityConfig` soft object pointer UPROPERTY
const UMassEntityConfigAsset* EntityConfigAsset = EntityConfig.LoadSynchronous();
checkf(EntityConfigAsset, TEXT("Failed to load asset: %s"), *EntityConfig->GetFullName());

// Compute a random spawn point near the world origin
const FVector2D SpawnPoint = FMath::RandPointInCircle(500.f);

// See below for the `FSpawnedEntities` struct definition.
// `this.AllSpawnedEntities` is a TArray that keeps the configs and the Entities spawned
// to provide access to the EntityHandle resulting from the spawn.

FSpawnedEntities& SpawnConf = AllSpawnedEntities.AddDefaulted_GetRef();
SpawnConf.ConfigAsset = EntityConfigAsset;
SpawnConf.NumToSpawn = 1;
SpawnConf.SpawnLocation = FVector(SpawnPoint.X, SpawnPoint.Y, 0.);  // Z == 0

// INITIATE ASYNC SPAWN:
EntityManager.Defer().PushCommand<FMassDeferredSetCommand>(
    [&SpawnConf](FMassEntityManager& EntityManager)
    {
        const UWorld* World = EntityManager.GetWorld();
        checkf(World, TEXT("EntityManager must have a valid World"));

        UMassSpawnerSubsystem* SpawnerSystem = World->GetSubsystem<UMassSpawnerSubsystem>();
        checkf(SpawnerSystem, TEXT("EntityManager World must have a UMassSpawnerSubsystem"));

        const FMassEntityTemplate& EntityTemplate = SpawnConf.ConfigAsset->GetOrCreateEntityTemplate(*World);
        checkf(EntityTemplate.IsValid(), TEXT("Failed to GetOrCreateEntityTemplate"));

        // We'll use this spawn initializer processor: UMassSpawnLocationProcessor
        TSubclassOf<UMassProcessor> InitializerClass = UMassSpawnLocationProcessor::StaticClass();

        // The spawn initializer processor we're using requires AuxData type FMassTransformsSpawnData
        // Initialize the SpawnData with this type
        FInstancedStruct SpawnData;
        SpawnData.InitializeAs<FMassTransformsSpawnData>();

        // Add a single transform to the SpawnData (we computed it above in SpawnConf)
        FMassTransformsSpawnData& SpawnDataTransforms = SpawnData.GetMutable<FMassTransformsSpawnData>();
        FTransform& Transform = SpawnDataTransforms.Transforms.AddDefaulted_GetRef();
        Transform.SetLocation(SpawnConf.SpawnLocation);

        // Call SpawnEntities directly to allow the subsystem to spawn the entities
        // and execute the initializer processor
        SpawnerSystem->SpawnEntities(EntityTemplate.GetTemplateID(), SpawnConf.NumToSpawn, SpawnData, InitializerClass, OUT SpawnConf.Entities);

        // Alternatively you could call your own OnSpawnComplete() callback
        SpawnConf.bSpawnComplete = true;
    });
```

#### Supporting Struct

```cpp
struct FSpawnedEntities
{
    TObjectPtr<const UMassEntityConfigAsset> ConfigAsset;
    int32 NumToSpawn = 1;
    FVector SpawnLocation = FVector::ZeroVector;
    TArray<FMassEntityHandle> Entities;
    bool bSpawnComplete = false;
};
```

#### Gameplay Properties

Whatever object executes the gameplay code needs to keep some extra data.

```cpp
UPROPERTY(EditAnywhere)
TSoftObjectPtr<UMassEntityConfigAsset> EntityConfig;

TArray<FSpawnedEntities> AllSpawnedEntities;
```

### Pros
- Allows you to spawn entities whenever you want
- You can very easily specify an initializer processor and feed it AuxData

### Cons
- You don't know the EntityHandle values for the Entities until after the
  async spawn completes, which is at least 1 frame in the future.


<a id='EntityManagerReservation'></a>
## Entity Manager Reservation

In order to get access to the EntityHandle **before** waiting for the async
spawning to occur, we will use the `EntityManager` directly to spawn entities.

Again, some key points:

- Use `EntityManager.Defer()` to ensure that we don't attempt to spawn entities
  while processors are executing.
- `FMassEntityConfig` struct **must remain valid** until after async spawning completes
    - This is typically wrapped in a `UObject` or `UDataAsset` to assist with this

### Sample Gameplay Code

```cpp
// Use UMassSpawnerSubsystem to async spawn entities based on a static
// UMassEntityConfigAsset configuration.
//
// You can call this on anywhere in your Gameplay code.

UWorld* World = GetWorld();
check(World);

FMassEntityManager& EntityManager = UE::Mass::Utils::GetEntityManagerChecked(*World);

// You should create and initialize this however you want.
// I dynamically generate my configs which is way behind the scope of this snippet
// so I leave that as an exercise for you.
UMyEntityConfig* Config = TODO();

// Reserve Entities
EntityManager.BatchReserveEntities(Config->NumToSpawn, OUT Config->Entities);
check(Config->NumToSpawn == Config->Entities.Num());

// Note: Config->Entities now contains all the EntityHandle that will be spawned,
// you can use those to configure other Configs NOW, without waiting for the
// async spawn below.
DoStuffWith(Config->Entities);

// NOTICE: YOU MUST MAKE SURE Config DOES NOT GET GC'D BEFORE THE LAMBDA EXECUTES!
// (Keep a reference to it somewhere, clean it up in NativeOnEntitiesCreated)

// INITIATE ASYNC SPAWN:
EntityManager.Defer().PushCommand<FMassDeferredSetCommand>(
    [Config](FMassEntityManager& EntityManager)
    {
        const UWorld* World = EntityManager.GetWorld();
        checkf(World, TEXT("EntityManager must have a valid World"));

        const FMassEntityTemplate& EntityTemplate = Config->GetOrCreateEntityTemplate(*World);
        checkf(EntityTemplate.IsValid(), TEXT("Failed to GetOrCreateEntityTemplate"));

        {
            // Observers will execute when this EntityCreationContext goes out of scope
            TSharedRef<FMassEntityManager::FEntityCreationContext> CreationContext
                = EntityManager.BatchCreateReservedEntities(EntityTemplate.GetArchetype(), EntityTemplate.GetSharedFragmentValues(), IN Config->Entities);

            TConstArrayView<FInstancedStruct> FragmentInstances = EntityTemplate.GetInitialFragmentValues();
            EntityManager.BatchSetEntityFragmentValues(CreationContext->GetEntityCollections(), FragmentInstances);
        }

        // You should implement a method like this:
        NativeOnEntitiesCreated(Config);
    });
```

#### Supporting Class

Note that this derives from `UMassEntityConfigAsset` which is highly
recommended so your spawning code can handle either static configs or
dynamically generated configs in the same code.

These properties shouldn't be public, I just did it this way to simplify
this for demonstration purposes.

```cpp
UCLASS()
class UMyEntityConfig : public UMassEntityConfigAsset
{
    GENERATED_BODY()

public:
    UPROPERTY(EditAnywhere)
    TArray<FMassEntityHandle> Entities;

    UPROPERTY(EditAnywhere)
    int32 NumToSpawn = 1;
};
```

### Pros
- Allows you to spawn entities whenever you want
- You know all the EntityHandle that will be created without having to wait
  for the async spawn to complete.

### Cons
- If you want to use an initializer processor, you need to add some more code,
  but it's not difficult or much code.
  - See `UMassSpawnerSubsystem::DoSpawning` for the initializer processor
    execution code if you require this functionality.
