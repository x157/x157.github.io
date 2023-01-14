---
title: "Perforce Typemap"
description: "Sample Perforce (P4) typemap for a UE 5.1 UProject depot"
breadcrumb_path: "Perforce"
breadcrumb_name: "Typemap"
---

# Perforce Typemap

The typemap tells the server how to store and manage availability for files of various types.

You **must** configure it **before** you try to import any data into Perforce.


## Updating P4 Typemap

To update the Typemap, save the [example file](#Example)
as `typemap.txt`.

Then, in Powershell:

```powershell
# Write typemap.txt contents into p4 Input
cat typemap.txt | p4 typemap -i
```

<a id='Example'></a>
# Example P4 Typemap

This is an example `p4 typemap` for a UE 5.1 [Lyra](/UE5/LyraStarterGame/) project.

This example will configure the P4 server such that the `//Lyra` depot
on the server will use this typemap.

If you named your depot something other than `Lyra`, search+replace `Lyra` for your name
in the example file below.

For example if you named your depot `MyDepot`:

```text
    binary+w //MyDepot/....exe
```

If you prefer this to affect **every depot** on the server,
replace all `//Lyra/` with `//` like this:

```text
    binary+w //....exe
```

See also: [Official Perforce typemap Docs](https://www.perforce.com/blog/vcs/perforce-p4-typemap)

## Lyra 5.1 Project P4 Typemap

```text
# Perforce File Type Mapping Specifications.
#
#  TypeMap:    a list of filetype mappings; one per line.
#              Each line has two elements:
#
#              Filetype: The filetype to use on 'p4 add'.
#
#              Path:     File pattern which will use this filetype.
#
# See 'p4 help typemap' for more information.

TypeMap:
    ######################################################################
    # Generated Binary files writable by everyone all the time
    ######################################################################
    binary+w //Lyra/....exe
    binary+w //Lyra/....dll
    binary+w //Lyra/....lib
    binary+w //Lyra/....app
    binary+w //Lyra/....dylib
    binary+w //Lyra/....stub
    binary+w //Lyra/....ipa
    ######################################################################
    # Generated Binaries writable by everyone (keep only latest revision)
    ######################################################################
    binary+Sw //Lyra/....pdb
    ######################################################################
    # Binary assets that must be checked out to be modified
    ######################################################################
    binary+l //Lyra/....bmp
    binary+l //Lyra/....ico
    binary+lF //Lyra/....gif
    binary+lF //Lyra/....jpg
    binary+lF //Lyra/....jpeg
    binary+lF //Lyra/....mp3
    binary+lF //Lyra/....mp4
    binary+lF //Lyra/....ogg
    binary+lF //Lyra/....png
    binary+l //Lyra/....svg
    binary+l //Lyra/....tga
    binary+l //Lyra/....tif
    binary+l //Lyra/....tiff
    binary+l //Lyra/....tps
    binary+l //Lyra/....ttf
    binary+l //Lyra/....uasset
    binary+l //Lyra/....ubulk
    binary+l //Lyra/....udk
    binary+l //Lyra/....umap
    binary+l //Lyra/....upk
    binary+l //Lyra/....wmv
    binary+l //Lyra/....wav
    ######################################################################
    # Text files
    ######################################################################
    text //Lyra/....bat
    text //Lyra/....c
    text //Lyra/....cmd
    text //Lyra/....collection
    text //Lyra/....config
    text //Lyra/....cpp
    text //Lyra/....cs
    text //Lyra/....csv
    text //Lyra/....gitattributes
    text //Lyra/....gitignore
    text //Lyra/....h
    text //Lyra/....ini
    text //Lyra/....json
    text //Lyra/....m
    text //Lyra/....md
    text //Lyra/....mm
    text //Lyra/....p4ignore
    text //Lyra/....py
    text //Lyra/....txt
    text //Lyra/....uplugin
    text //Lyra/....uproject
    text //Lyra/....xml
    text //Lyra/....yml
    ######################################################################
    # Text files always writable by anyone
    ######################################################################
    text+w //Lyra/....DotSettings
    text+w //Lyra/....modules
    text+w //Lyra/....target
    text+w //Lyra/....version
    ######################################################################
    # Localization files
    ######################################################################
    binary+l //Lyra/.../Localization/....locmeta
    binary+l //Lyra/.../Localization/....locres
    binary+l //Lyra/.../Localization/....po
    text //Lyra/.../Localization/....archive
    text //Lyra/.../Localization/....manifest
```
