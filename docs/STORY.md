# Following the next question

I learn by trying to make something work, then following the part I still cannot explain. My projects move between deployment, local AI, desktop interfaces and visual editing because those are places where several different systems have to agree.

AI is part of that process. I use it to explore, implement and iterate, and keep checking the result against the source, the interface and the behavior I actually need.

## Cube: the system outside the room

The *Cube* conversations began with a film question: who built the maze, who runs it, and who really understands its purpose? I kept asking about the people and rules behind the visible machinery.

That is why the profile has a maze. It represents following a question far enough to find a dead end, reconsidering the route, and carrying what I learned into the next attempt.

My interests include physics, space, history and institutions. I like questions that cross those boundaries, especially when they expose another assumption I need to examine.

## Andoria/EFNETWORK: from a question to a workbench

I wanted the source material in one place, with a way to return to individual videos. That meant working through Python setup, bulk subtitle collection, a script error, SRT cleanup and merging. The early conversations move from asking how to install the tools to asking how a large archive could be read, remembered and connected.

The preserved project contains **98 Arabic subtitle files**. The Python merger removes cue numbers and timestamps and keeps a source heading for each video. Its combined text is about **1.98 MB**. The investigation dashboard has **98 index entries and 98 transcript files**, with Arabic search, a map, a timeline and a connection graph.

The useful result is a workbench for inspecting and comparing source material. Questions about what those sources claim remain questions to investigate.

<sub>Archive snapshot checked 1 November 2026. These are artifact counts, not a claim that every assertion in the source material has been independently established. The local dashboard is a case study, not a public software release.</sub>

## A visual bug changed the question

A curve kept missing the centers of its dots. After repeated attempts to adjust the curve, I redirected the solution toward repositioning the dots on it.

It was a small interface problem, but the change mattered: the two objects needed to agree on the same relationship. I was asking for more corrections to one object when changing the relationship gave us another way forward.

I return to that kind of question in larger interfaces. In anyDeploy Studio, the visible screen boundary and the area that receives a click also have to agree.

## The work became more demanding at the boundaries

**anyDeploy Studio:** a website on a 3D phone or laptop still needs to behave like a website. Its logical layout stays fixed while render density changes. The device can hide part of the screen, so the same geometry has to constrain both painting and input. This is development-build work alongside the public deployment app.

**JARVIS:** voice quality, responsiveness and model memory share the same machine. The source separates arriving tokens, complete sentences, audio generation and playback into queues. Heavier computer-use work can unload speech models to recover GPU memory. The interesting problem is how those stages cooperate under the same resource budget.

**Lumina:** moving a document block can change line wrapping and the number of pages. One typed document model connects templates, direct manipulation and browser print. A visual change has consequences beyond the object being dragged.

[Engineering details](ENGINEERING.md) · [Build milestones](ACHIEVEMENTS.md)

## Saving a decision was another beginning

The later memory discussions ask how an assistant can carry decisions and connected plans across tasks, and how prerequisites can be enforced. Then the question turns back on the proposal: does a growing memory system create clutter and more context pressure?

I want decisions to survive and become useful at the right moment. Retrieval, corrections and the cost of growing context are part of that problem. This is an area of ongoing exploration, with local agent work described separately from released software.

[Back to the profile](../README.md#the-questions-behind-the-builds)
