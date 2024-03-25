---
title: 'Profiling Web Performance in Browser Dev Tools'
series: 'Know Your Dev Tools'
featured_image: 'media/post-header.jpg'
author: 'Jesse Barkdoll'
authorimage: '../assets/images/jesse.png'
date: 2024-03-24
draft: true
type: posts
tags:
  - Chrome
  - Chromium
  - frontend
  - developer-tools
  - performance
---



## Overview of the Performance Panel in Chromium-based Browsers

The performance tab gives us the ability to record and capture information about the performance when loading or running a page in the browser. We developers can use this in a variety of ways to diganose performance issues related to our apps, find expensive operations that are slowing our sites down, and get an overall picture of what improvements might benefit our front ends to give users a smoother experience.

At first glance, there seems to be a lot going on within it, but it's not as bad as it looks! 
The entire performance panel is organized into a series of horizontal tracks. 
We can parse through the tracks to focus on specific points of time in a recording.

Here are the different areas of the panel:



### Header Bar

![header bar](media/header-bar.png)

The header bar of the panel contains:
- `Record`, `Start profiling and reload page`, and `Clear` buttons: these control the 
entirety of what we record and analyze within the performance panel.
- In recent versions, we have buttons to load/save profiles into JSON format.
- The `Screenshots` and `Memory` checkboxes, which give us the option 
to include these into the recorded performance profile if we want to analyze them.
- And a broom-icon garbage collection button for cleaning up.



### Timeline Track

![timeline track](media/timeline-track.png)

The very first track shows an overall graph of the activity during a recording. 
We can use the handles or simply click and drag to select a segment of the timeline 
to analyze it in more detail.



### Frames Track

![frames track](media/frames-track.png)

Shows frames of the screen when something changes and the browser renders and update. 
You can find where frames drop and look into the surrounding factors to determine 
what is causing the performance to suffer.



### Animations Track

![animation track](media/animation-track.png)

For viewing simple analytics data related to animations performed on the page.



### Main Track

![main track](media/main-track.png)

Displays activity that happens on the main thread. This is the central track and will 
likely be the track you spend the most time reviewing for typical use cases.



### Bottom Panel

![bottom panel](media/bottom-panel.png)

At the bottom (by default), you will see a few tabs that give you in-depth detail 
on whichever part of the recording you are currently analyzing.