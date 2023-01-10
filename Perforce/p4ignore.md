---
title: "Perforce .p4ignore"
description: "Sample Perforce (P4) .p4ignore for a UE 5.1 UProject depot"
breadcrumb_path: "Perforce"
breadcrumb_name: ".p4ignore"
---

# Perforce `.p4ignore`

This example is for a UE 5.1
[Lyra](/UE5/LyraStarterGame/) project.

You need to put a file like this in your project root folder, named `.p4ignore`.
Edit as needed.


```text
# Here you can specify files to ignore when adding files to the depot.
#
# The syntax for P4IGNORE files is not the same as Perforce syntax.
# Instead, it is similar to that used by other versioning systems:
#
# - Files are specified in local syntax
# - a # character at the beginning of a line denotes a comment
# - a ! character at the beginning of a line excludes the file specification
# - a * wildcard matches substrings.
#
# For example:
#
# foo.txt    Ignore files called "foo.txt"
# *.exe      Ignore all executables
# !bar.exe   Exclude bar.exe from being ignored
#
###############################################################################
# Epic's P4IGNORE.
# P4IGNORE doesn't work like GITIGNORE:
# http://stackoverflow.com/questions/18240084/how-does-perforce-ignore-file-syntax-differ-from-gitignore-syntax
###############################################################################

# Don't duplicate Git Repository data
.git/

# Ignore root Visual Studio solution files.
# We do check in some sln files in subdirectories, so only ignore the ones found in the root.
/*.sln
/.p4sync.txt

# Ignore all Visual Studio temp files.
.vs/
.vsconfig
*.suo
*.opensdf
*.sdf

# Ignore DerivedDataCache files
DerivedDataCache/

# Ignore all Intermediate and Saved directories
Intermediate/
Saved/

# Ignore UBT files
*.uatbuildrecord
*.tmp

# Ignore built binaries and temporary build files
**/obj/*
*.csprojAssemblyReference.cache

# Ignore Python cached files
*.pyc

# Ignore JetBrain's IDE folders
.idea/
.gradle/

# Ignore files added by Finder on Mac
.DS_Store
```