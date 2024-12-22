---
title: "Perforce: How to Delete a (deleted) Stream"
description: "Command to actually force p4 to obliterate a previously deleted stream"
breadcrumb_path: "Perforce"
breadcrumb_name: "Delete a (deleted) Stream"
---

# How to Delete a (deleted) Stream

As a P4 administrator, I'm learning the hard way how to do things that really should be easy,
but let's face it...  Perforce.

For example, I created a stream with some settings to mess around, and then decided I didn't
like those, so I wanted to delete it and remake it with different settings.

First I obliterated the files with
`p4 obliterate -y //My/Stream/...`, then I ran
`p4 stream -f -d //My/Stream`
and p4 reported that the stream was successfully deleted.

When I then tried to recreate `//My/Stream` with different settings, it kept giving me errors that
the stream already existed.

Running `p4 streams -a` revealed that the stream did in fact still exist in a `(deleted)` state:

```text
PS> p4 streams -a
Stream //My/Stream mainline none 'Stream' (deleted)
```

## How to REALLY delete a stream

The command below actually deletes the stream in such a way that it doesn't stay around in a `(deleted)`
*(and therefore non-reusable)* state in the depot:

```powershell
p4 stream -f -d --obliterate -y //My/Stream
```

This will nuke all changes and files associated with the stream, and then delete the stream itself.

Perhaps my Google Fu is sub-par, but I couldn't find this, and our AI overlords were completely
oblivious to this situation as well, so after arbitrarily executing enough random combinations
of commands and arguments, I finally found this that works.

Happy deleting.  `:-)`
