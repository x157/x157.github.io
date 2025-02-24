---
title: "Mass Entity Data Types | UE5 Mass"
description: "Overview of some important Mass Entity data types"
breadcrumb_path: "UE5/Mass"
breadcrumb_name: "DataTypes"
---

# Mass Entity Data Types

This page discusses some of the most important Mass Entity Data Types.

Some of the info here is pulled directly from Mass source code comments.
Other info are my thoughts related to it.

### Entities

- [`FMassEntityHandle`](#FMassEntityHandle)

### Entity Composition

- [`FMassFragment`](#FMassFragment)
- [`FMassTag`](#FMassTag)
- [`FMassChunkFragment`](#FMassChunkFragment)
- [`FMassConstSharedFragment`](#FMassConstSharedFragment)
- [`FMassSharedFragment`](#FMassSharedFragment)

### Templates

- [`FMassEntityTemplate`](#FMassEntityTemplate)
- [`FMassEntityTemplateData`](#FMassEntityTemplateData)
- [`FMassEntityTemplateID`](#FMassEntityTemplateID)
- [`FMassEntityTemplateRegistry`](#FMassEntityTemplateRegistry)

### Configs

- [`FMassEntityConfig`](#FMassEntityConfig)


<a id='FMassEntityHandle'></a>
## `FMassEntityHandle`

Mass Entity Handle is a Unique Entity Identifier.
It is safe to use as a `TMap` hash key.

This is effectively a 64-bit integer.
You can explicitly access the 64-bit value as a `uint64` via `AsNumber()` and `FromNumber()`
as needed.


<a id='FMassFragment'></a>
## `FMassFragment`

The base `UStruct` for all data fragments that will make up your Entity.

Use a fragment when the data will be unique to the entity.

Don't try to cram **all** of your data into 1 fragment.
Ideally you want these to be small, reusable fragments that contain
very specific related data.

For example, Mass supplies a `FTransformFragment` which contains only
the entity's transform, and a `FMassMoveTargetFragment` that contains only
the target to which an Entity should try to move.


<a id='FMassTag'></a>
## `FMassTag`

This is the base class for types that will only be tested for presence/absence, i.e. Tags.

**Subclasses should never contain any member properties.**


<a id='FMassChunkFragment'></a>
## `FMassChunkFragment`

The base `UStruct` for data fragments that are shared among all entities in a given Chunk.

This is similar to `FMassSharedFragment`, but instead of only 1 fragment that is shared
across all Entities, there is 1 fragment **per Chunk**.

To understand Chunks, familiarize yourself with the
[Mass Archetype Model](https://github.com/Megafunk/MassSample?tab=readme-ov-file#mass-arch-mod),
as documented in [MassSample](https://github.com/Megafunk/MassSample).


<a id='FMassConstSharedFragment'></a>
## `FMassConstSharedFragment`

The base `UStruct` for `const` data fragments that are shared amongst multiple Entities.

Just like `FMassSharedFragment`, but this fragment is `const`.


<a id='FMassSharedFragment'></a>
## `FMassSharedFragment`

The base `UStruct` for data fragments that are shared amongst multiple Entities.

Use a shared fragment when you want to have a single small amount of data
that affects many fragments.  Changing the data once immediately affects
ALL of the entities that share it.


<a id='FMassEntityTemplate'></a>
## `FMassEntityTemplate`

A finalized and const wrapper for `FMassEntityTemplateData`,
associated with a Mass archetype and template ID.
This is the type that is stored in the `FMassEntityTemplateRegistry`.

**Designed to never be changed.**

If a change is needed a copy of the hosted `FMassEntityTemplateData`
needs to be made and used to create another finalized `FMassEntityTemplate`
(via `FMassEntityTemplateManager`).


<a id='FMassEntityTemplateData'></a>
## `FMassEntityTemplateData`

Serves as data used to define and build finalized `FMassEntityTemplate` instances.
Describes composition and initial values of fragments for entities created with
this data, and lets users modify and extend the data.
Once finalized as `FMassEntityTemplate` the data will become immutable.

Defines the "Composition" of a template, including:

- BitSets identifying elements that compose the template data:
  - `FMassFragment`, `FMassTag`, `FMassChunkFragment`, `FMassSharedFragment`, `FMassConstSharedFragment`, `USubsystem`
- Shared Fragment values
- Initial Fragment values
- Array of Object Initializers

To see an example of how to create one of these, see `FMassEntityConfig::GetOrCreateEntityTemplate`.


<a id='FMassEntityTemplateID'></a>
## `FMassEntityTemplateID`

Mass Entity TemplateID is used as a 64-bit hash key.
It is safe to use as a `TMap` key.

It is computed using a 128-bit GUID and an optional 32-bit "flavor" hash.

By default, the `FMassEntityConfig` class (a property of `UMassEntityConfigAsset`)
is responsible for managing the uniqueness of the GUID.

**If you dynamically generate your own `FMassEntityConfig` objects,
you *must ensure* to manage the uniqueness of their GUIDs as well,
as this determines the uniqueness of the template keys in `FMassEntityTemplateRegistry`.**

Note that `FMassEntityTemplateID` provides a 32-bit hash key for use by
`FMassEntityTemplateRegistry`. The possibility of collisions due to using
a 32-bit hash key **is not an issue** due to
[how `TMap` manages key collisions](/UE5/Core/TMap),
because `FMassEntityTemplateID` `operator==` compares the entire 64-bit value.


<a id='FMassEntityTemplateRegistry'></a>
## `FMassEntityTemplateRegistry`

Essentially a `TemplateID => Template` map.

Represents a repository storing all the `FMassEntityTemplate` that have been created
and registered as part of `FMassEntityConfig`
processing or via custom code (for example the `InstancedActors` plugin).

Once a template is stored in the registry, it cannot be changed.


<a id='FMassEntityConfig'></a>
## `FMassEntityConfig`

A collection of traits that are combined to make up an Entity's composition.

Supports inheritance via a reference to a parent `UMassEntityConfigAsset`.

Used by `UMassEntityConfigAsset` as the internal storage mechanism for the
trait data described by the asset.
