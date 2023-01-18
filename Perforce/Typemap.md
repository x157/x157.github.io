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

To update the Typemap, save the [example file](https://github.com/XistGG/Perforce-Setup/blob/main/typemap.txt)
as `typemap.txt`.

Then, in Powershell:

```powershell
# Write typemap.txt contents into p4 typemap Input
cat typemap.txt | p4 typemap -i
```

<a id='TypemapOrder'></a>
# Important Note about Typemap Ordering

You must list your entries in order of **least specific** to **most specific**.

For some reason this does not appear to be documented anywhere so I discovered this by trial-and-error.
For example if you have:

```text
# THIS IS THE WRONG ORDER, THIS WILL NOT WORK
Typemap:
    text+w //.../Binaries/....json
    text //....json
```

Then the initial `text+w` setting for `.json` files inside `Binaries` directories **WILL BE IGNORED**.

If you want all `.json` files to be treated as text, except for those inside `Binaries` directories,
you must specify it in this order:

```text
# Correct order:
Typemap:
    text //....json
    text+w //.../Binaries/....json
```


<a id='Example'></a>
# Example P4 Typemap

This is an example `p4 typemap` for a UE 5.1 [Lyra](/UE5/LyraStarterGame/) project with a custom UE 5.1 Engine.

[https://github.com/XistGG/Perforce-Setup/blob/main/typemap.txt](https://github.com/XistGG/Perforce-Setup/blob/main/typemap.txt)

<iframe id="github-iframe" src="" width="1000" height="400"></iframe>
<script>
    fetch('https://api.github.com/repos/XistGG/Perforce-Setup/contents/typemap.txt')
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            var iframe = document.getElementById('github-iframe');
            iframe.src = 'data:text/plain;base64,' + encodeURIComponent(data['content']);
        });
</script>

See also: [Official Perforce typemap Docs](https://www.perforce.com/blog/vcs/perforce-p4-typemap)

