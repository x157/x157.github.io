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

[https://github.com/XistGG/Perforce-Setup/blob/main/.p4ignore](https://github.com/XistGG/Perforce-Setup/blob/main/.p4ignore)

<iframe id="github-iframe" src="" width="1000" height="400"></iframe>
<script>
    fetch('https://api.github.com/repos/XistGG/Perforce-Setup/contents/.p4ignore')
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            var iframe = document.getElementById('github-iframe');
            iframe.src = 'data:text/plain;base64,' + encodeURIComponent(data['content']);
        });
</script>
