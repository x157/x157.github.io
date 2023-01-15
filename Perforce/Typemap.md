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

