---
title: "Threads in UE5"
description: "Overview of Unreal Engine Threads"
breadcrumb_path: "UE5"
breadcrumb_name: "Threads"
---

# UE5 Threads: `FRunnable`

I made a simple example project to demonstrate `FRunnable` thread usage:

[https://github.com/XistGG/UE5-FRunnable-ThreadTest](https://github.com/XistGG/UE5-FRunnable-ThreadTest)

The README in that repository contains a good description of it.
It is definitely worth reading that, and taking a look at the few C++
methods described therein.

In general the primary takeaways for using `FRunnable` are:

- When you create the thread with `FRunnableThread::Create`
  *(as I do in the example in the `FRunnableNonsense::Start` method)*,
  UE5 will automatically execute code similar to the following
  in the context of the new thread:

    ```cpp
    if (Runnable->Init())
    {
        Runnable->Run();
        Runnable->Exit();
    }
    ```

- In your `FRunnable` destructor when you `Thread->Kill()`, it will
  automatically call `Runnable->Stop()`

- In your main game thread (or whatever thread is managing your `FRunnable` threads):
  - You can explicitly call `Runnable->Stop()` to schedule the thread to exit, but
    then you must wait for it to actually decide to stop, which **will not be immediate**.
  - When you are killing mass numbers of threads simultaneously, it can block your main thread
    for noticable time.
    - Whenever possible, wait for threads to fully exit before trying to rejoin them.