<a id="top"></a>

<picture>
  <source media="(max-width: 600px) and (prefers-color-scheme: light)" srcset="assets/profile/intro-mobile-light.svg">
  <source media="(max-width: 600px)" srcset="assets/profile/intro-mobile-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/profile/intro-light.svg">
  <img src="assets/profile/intro-dark.svg" width="100%" alt="JPEG111. I follow the question. Then build the system.">
</picture>

<p align="center">
  <a href="#user-content-selected-systems"><kbd>Projects</kbd></a> &nbsp;
  <a href="#user-content-research-workbench"><kbd>Research</kbd></a> &nbsp;
  <a href="#user-content-follow-a-question"><kbd>How I think</kbd></a> &nbsp;
  <a href="#user-content-build-trail"><kbd>My story</kbd></a> &nbsp;
  <a href="#user-content-next-coordinates"><kbd>What's next</kbd></a>
</p>

**Skandar · self-taught software builder · Netherlands**

I build tools for complicated workflows: deploying software on spare hardware, managing desktop automation, and organizing large collections of source material. My work spans self-hosting, desktop apps and AI-assisted development.

A project usually takes me beyond the first feature. I want to understand its dependencies, the state it needs to remember, and what happens when something breaks. That curiosity has taken me from research archives and visual maps into deployment software and agent workflows.

<a id="selected-systems"></a>

## Software you can try

<a href="https://github.com/JPEG111/anydeploy-releases">
<picture>
  <source media="(max-width: 600px) and (prefers-color-scheme: light)" srcset="assets/profile/anydeploy-mobile-light.svg">
  <source media="(max-width: 600px)" srcset="assets/profile/anydeploy-mobile-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/profile/anydeploy-light.svg">
  <img src="assets/profile/anydeploy-dark.svg" width="100%" alt="anyDeploy: deploy a repository to hardware you own. Open the project.">
</picture>
</a>

**Turn spare hardware into a place to deploy.** anyDeploy is a desktop app for deploying projects to Android phones, Raspberry Pi, Linux and Windows targets. It grew out of phone-hosting experiments.

**Available:** Windows installer and Linux AppImage. **In development:** the next Studio interface and agent workflows.

[Explore anyDeploy →](https://github.com/JPEG111/anydeploy-releases) · [Download](https://github.com/JPEG111/anydeploy-releases/releases/latest)

<a href="https://github.com/JPEG111/orbs-release">
<picture>
  <source media="(max-width: 600px) and (prefers-color-scheme: light)" srcset="assets/profile/orbs-mobile-light.svg">
  <source media="(max-width: 600px)" srcset="assets/profile/orbs-mobile-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/profile/orbs-light.svg">
  <img src="assets/profile/orbs-dark.svg" width="100%" alt="Orbs: observe client state, prepare a queue, and recover from interruptions. Open the project.">
</picture>
</a>

**A Windows tool for supported Discord Quests.** Orbs simulates supported game activity and manages a queue. The work includes an English / Egyptian Arabic interface, client navigation, interruption recovery, installation and updates.

**Available:** Windows installer. Compatibility and usage details are in the project README.

[Explore Orbs →](https://github.com/JPEG111/orbs-release) · [Download](https://github.com/JPEG111/orbs-release/releases/latest) · [Engineering checkpoints](docs/ACHIEVEMENTS.md#orbs--making-the-whole-lifecycle-work)

<a id="research-workbench"></a>

## When a question becomes a tool

<picture>
  <source media="(max-width: 600px) and (prefers-color-scheme: light)" srcset="assets/profile/lab-mobile-light.svg">
  <source media="(max-width: 600px)" srcset="assets/profile/lab-mobile-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/profile/lab-light.svg">
  <img src="assets/profile/lab-dark.svg" width="100%" alt="Research workbench: 98 documentary sources organized into a searchable archive, timelines and connection views.">
</picture>

A long investigation into history and how institutions work became a practical data project: **98 Arabic subtitle files**, a Python merger, and a dashboard for searching transcripts, exploring timelines and mapping connections.

The useful result was a way to examine the material, revisit sources and compare claims. That same interest in connected knowledge led to my **LIFE atlas**, built around linked Markdown notes, Obsidian views and a separate offline 3D map.

<details>
<summary><b>The wider questions behind the tools</b></summary>

My interests cross physics and space, AI memory, history, bureaucracy, institutional incentives and the way information is presented.

The archive includes documentary material from **EFNETWORK / Andoria**, an Arabic-language channel discussed in my research conversations. Those conversations led into questions about sources, alternative explanations and confidence: what is documented, what is inferred, and what remains unknown?

In physics, I'm interested in questions about time, scale and the underlying processes behind what we observe. I treat these as questions to explore and test.

</details>

<a id="follow-a-question"></a>

## How I think

**I look for the relationship causing the problem.**

While building a visual roadmap, I kept finding that the curved line missed the centers of its dots. The useful change was to coordinate the dot positions with the curve. That is the kind of shift I look for in software too: find the shared constraint and make the parts agree.

Another example is AI memory. Saving a decision is only one part of remembering it. **Follow this question one level deeper:**

<details>
<summary><b>Why did the agent forget?</b></summary>

Did it fail to save the decision, fail to retrieve it, or retrieve it and ignore it? Each failure needs a different fix.

<details>
<summary><b>What should the surrounding system keep?</b></summary>

The decision, its source, the alternatives considered, what failed, and the current state of the task.

<details>
<summary><b>What must be true before the next action?</b></summary>

I'm exploring workflows with explicit prerequisites and checks. My Lego-machine analogy is that a missing piece should become visible before the next piece goes in.

<details>
<summary><b>What happens when the memory itself gets too big?</b></summary>

Now the problem is retrieval quality, stale decisions, context growth and the cost of keeping everything. A useful design has to be tested against those tradeoffs.

This is an ongoing architectural investigation.

</details>
</details>
</details>
</details>

<a id="build-trail"></a>

## How the work developed

| Chapter | What it led to |
| :--- | :--- |
| **March 2026 · Follow the source** | Research conversations grew into transcript collection, merging and a searchable archive. |
| **Spring 2026 · Make it visible** | Investigation dashboards, maps and a project portfolio turned large bodies of information into things I could inspect and refine. |
| **October 2026 · Ship and maintain** | Deployment and desktop work expanded into packaging, bilingual interfaces, recovery and update checks. |
| **Ongoing · Keep the thread** | Agent-memory and planning experiments ask how decisions can survive across long tasks and changing context. |

[More of the story](docs/STORY.md) · [Achievements and evidence](docs/ACHIEVEMENTS.md)

<a id="next-coordinates"></a>

## What I'm working toward

| Focus | Next milestone |
| :--- | :--- |
| **Dependable setup** | Complete an agent onboarding journey from first launch to a successful, checked task. |
| **Useful memory** | Test one bounded workflow that retrieves earlier decisions and enforces its prerequisites. |
| **Repeatable experiments** | Preserve source material and candidates, explain the selection, and document how to rebuild the result. |

[Roadmap and completion criteria →](docs/ROADMAP.md) · Updated **1 November 2026**

<details>
<summary><b>More from the workbench</b></summary>

| Project | What I'm exploring | Stage |
| :--- | :--- | :--- |
| **JARVIS** | Local voice/vision assistant and model routing | Prototype |
| **Aura** | Social publishing workflows and easier account/API setup | In development |
| **OmniAgent** | Controlled local tools and companion workflows | Local builds; acceptance work ongoing |
| **Strategy OS** | Connected plans, decisions, evidence and workflow gates | Architecture exploration |
| **Life OS** | Android quests and deterministic progression | Prototype |
| **3D experiments** | Multiview generation and reference-based Blender reconstruction | Experimental work |

Most source repositories are private. The release links above are the public entry points.

**Tools I use:** `TypeScript` `React` `Electron` `Python` `Node.js` `PowerShell` `Linux` `SSH` `Blender` `Markdown` `Obsidian`

</details>

<details>
<summary><b>After the work / the contribution arcade</b></summary>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/JPEG111/JPEG111/output/pacman-contribution-graph-dark.svg">
  <img src="https://raw.githubusercontent.com/JPEG111/JPEG111/output/pacman-contribution-graph.svg" width="100%" alt="Pac-Man moving through my GitHub contributions.">
</picture>

</details>

<p align="center"><sub>Still following the question.</sub><br><a href="#user-content-top">↑ Back to the beginning</a> · <a href="docs/DESIGN.md">About this README</a></p>
