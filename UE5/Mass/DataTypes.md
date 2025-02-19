---
title: "Mass Entity Data Types in UE5"
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

TODO: THIS SECTION IS WIP

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

