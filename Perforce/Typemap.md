---
title: "Perforce Typemap"
description: "Sample Perforce (P4) typemap for a UE 5.1 UProject depot"
breadcrumb_path: "Perforce"
breadcrumb_name: "typemap"
---

# Perforce Typemap

This is an example `p4 typemap` for a UE 5.1 [Lyra](/UE5/LyraStarterGame/) project.

This will configure the P4 server such that **every depot** on the server will use this typemap.
Maybe that's what you want, maybe it isn't.

If you only want this to affect a single depot on your server,
replace all `//...` (the first 3 dots only)
with `//YourDepot/...`, where `YourDepot` is whatever your depot is named.

See also: [Official Perforce typemap Docs](https://www.perforce.com/blog/vcs/perforce-p4-typemap)

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
    binary+w //....exe
    binary+w //....dll
    binary+w //....lib
    binary+w //....app
    binary+w //....dylib
    binary+w //....stub
    binary+w //....ipa
    ######################################################################
    # Binary assets that must be checked out to be modified
    ######################################################################
    binary+l //....bmp
    binary+l //....ico
    binary+lF //....gif
    binary+lF //....jpg
    binary+lF //....jpeg
    binary+lF //....png
    binary+l //....svg
    binary+l //....tps
    binary+l //....ttf
    binary+l //....uasset
    binary+l //....ubulk
    binary+l //....udk
    binary+l //....umap
    binary+l //....upk
    ######################################################################
    # Text files
    ######################################################################
    text //....bat
    text //....c
    text //....cmd
    text //....collection
    text //....config
    text //....cpp
    text //....cs
    text //....csv
    text //....gitattributes
    text //....gitignore
    text //....h
    text //....ini
    text //....m
    text //....md
    text //....mm
    text //....p4ignore
    text //....py
    text //....txt
    text //....uplugin
    text //....uproject
    text //....xml
    text //....yml
    ######################################################################
    # Localization files
    ######################################################################
    binary+l //.../Localization/....locmeta
    binary+l //.../Localization/....locres
    binary+l //.../Localization/....po
    text //.../Localization/....archive
    text //.../Localization/....manifest
```
