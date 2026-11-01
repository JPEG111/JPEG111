<a id="top"></a>

<a href="https://github.com/search?q=author%3AJPEG111+is%3Apublic&amp;type=commits">
<picture>
  <source media="(max-width: 600px)" srcset="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/commit-counter-mobile.svg?v=4">
  <img src="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/commit-counter.svg?v=4" width="100%" alt="Public and private indexed commit counts, with a separate private verification timestamp, cumulative public history and a language icon ranked by public code bytes. Open the public commit search.">
</picture>
</a>

<a href="https://github.com/JPEG111?tab=overview">
<picture>
  <source media="(max-width: 600px)" srcset="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/activity-mobile.svg?v=3">
  <img src="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/activity.svg?v=3" width="100%" alt="GitHub activity: contributions over the last twelve months, current streak, best streak within that period, recent contribution days and public repository languages.">
</picture>
</a>

<picture>
  <source media="(max-width: 600px)" srcset="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/system-hero-mobile.svg?v=5">
  <img src="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/system-hero.svg?v=5" width="100%" alt="Skandar / JPEG111. Ask deeper. Build further. A maze explores, backtracks and finds a valid route.">
</picture>

<p align="center">
  <a href="#user-content-selected-systems"><kbd>Selected software</kbd></a> &nbsp;
  <a href="#user-content-the-lab"><kbd>Inside the lab</kbd></a> &nbsp;
  <a href="#user-content-behind-the-builds"><kbd>Behind the builds</kbd></a> &nbsp;
  <a href="#user-content-tech-stack"><kbd>Languages & tools</kbd></a> &nbsp;
  <a href="#user-content-next-coordinates"><kbd>Roadmap</kbd></a> &nbsp;
  <a href="#user-content-github-activity"><kbd>Arcade</kbd></a>
</p>

<sub>GitHub metrics and public releases refresh every 12 hours. Project animations demonstrate example state changes.</sub>

### Skandar · Software developer

<sub>Netherlands · Desktop software / infrastructure / AI</sub>

**I follow questions until they turn into working tools.** A repository becomes an app on a phone. A spoken request becomes a tool call and a streamed reply. A document becomes something I can rearrange and print.

I learn through the details that force a better question: why a webpage reflows when its 3D device rotates, why voice models compete for GPU memory, or how a saved decision becomes useful in a later task.

**Some work I’m proud of:**

- **A usable browser inside a 3D device.** Fixed website layout, variable render density, and click boundaries that follow what is actually visible. [Studio engineering →](docs/ENGINEERING.md#studio-a-browser-inside-a-device-inside-an-interface)
- **A voice loop built around a shared GPU.** Speech recognition, model/tool routing and sentence-by-sentence audio playback, with explicit model loading and unloading. [JARVIS →](docs/ENGINEERING.md#jarvis)
- **A research thread turned into a searchable workbench.** A preserved 98-source subtitle archive, a Python merger, and Arabic search, map and connection views. [How it grew →](docs/STORY.md#andoriaefnetwork-from-a-question-to-a-workbench)

<sub>Studio and JARVIS are development work. The archive count is a checked snapshot. Public downloads are linked below.</sub>

<a id="selected-systems"></a>

## Selected software

<a href="https://github.com/JPEG111/anydeploy-releases">
<picture>
  <source media="(max-width: 600px)" srcset="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/system-anydeploy-mobile.svg?v=5">
  <img src="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/system-anydeploy.svg?v=5" width="100%" alt="anyDeploy: choose a repository or ZIP, select the target device, build, serve for the project type and choose local, temporary or domain routing.">
</picture>
</a>

### Deploy on hardware you own.

Choose **a GitHub repository or ZIP**, select an **Android / Termux, Raspberry Pi, Linux or Windows / WSL2** target, then build on that device. Static files are served by `nginx`; applications use a running process where needed. Reach the result through a **local address, temporary link or configured domain**.

**When Wi-Fi drops, the deployment can reconnect and resume.** Services and routes stay inspectable after the first successful build.

> **Studio / development build**
> Live websites stay interactive on 3D device screens. **Fixed page layout, variable render density.** Visual occlusion and click boundaries agree, including where the device hides part of a screen.

[Project →](https://github.com/JPEG111/anydeploy-releases) · [Windows / Linux downloads](https://github.com/JPEG111/anydeploy-releases/releases/latest) · [Under the hood](docs/ENGINEERING.md#anydeploy)

<a href="https://github.com/JPEG111/orbs-release">
<picture>
  <source media="(max-width: 600px)" srcset="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/system-orbs-mobile.svg?v=3">
  <img src="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/system-orbs.svg?v=3" width="100%" alt="Orbs: observe client state, recover within bounded deadlines, verify actions and manage the queue.">
</picture>
</a>

### Automation that checks the state.

A Windows app for supported Discord Quests, with **discovery, queues, tray controls and updates** in English and Egyptian Arabic.

**Observe → act → verify.** Semantic control discovery, bounded retries and retained deadlines keep the workflow tied to what the client actually shows. An uncertain action needs a check before it is repeated.

[Project →](https://github.com/JPEG111/orbs-release) · [Windows download](https://github.com/JPEG111/orbs-release/releases/latest) · [State and recovery](docs/ENGINEERING.md#orbs)

<a href="https://github.com/JPEG111/JPEG111/blob/main/docs/ENGINEERING.md#instavault">
<picture>
  <source media="(max-width: 600px)" srcset="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/system-instavault-mobile.svg?v=3">
  <img src="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/system-instavault.svg?v=3" width="100%" alt="InstaVault: import media, enrich locally, connect it in a graph and search the archive.">
</picture>
</a>

### Find the thing you saved.

Import posts and shared media, enrich them with **local AI tagging, OCR and embeddings**, then explore through **graph, fuzzy and semantic search**.

`Electron` + `React` + `FastAPI`. Optional transcription uses **its own Python process**, keeping its ML dependencies separate from the frozen backend.

<sub>Local build · Implementation case study</sub>

[Pipeline and packaging →](docs/ENGINEERING.md#instavault)

<a id="the-lab"></a>

## Inside the lab

Working local builds and experiments. Each explores a different constraint.

<picture>
  <source media="(max-width: 600px)" srcset="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/system-jarvis-mobile.svg?v=5">
  <img src="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/system-jarvis.svg?v=5" width="100%" alt="JARVIS: an illustrative audio waveform changes between listening, transcription, request routing and spoken output.">
</picture>

### JARVIS · Voice, vision and a shared GPU

Wake word → VAD → `Whisper` → `LangGraph` → streamed `Chatterbox` speech.

**Start speaking while the answer is still arriving.** Sentence queues separate generation from playback; model fallbacks and saved project state carry the workflow. Heavier vision work can unload speech models to recover GPU memory.

[Voice pipeline and memory tradeoffs →](docs/ENGINEERING.md#jarvis)

<picture>
  <source media="(max-width: 600px)" srcset="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/system-lumina-mobile.svg?v=3">
  <img src="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/system-lumina.svg?v=3" width="100%" alt="Lumina: one typed document model connects AI edits, pointer layout controls, pagination and print.">
</picture>

### Lumina · Edit the document directly

Unstructured text becomes **one typed document shared across twelve templates**. AI edits and pointer controls operate on the same data.

**A drag can change the page.** Layout overrides, text wrapping, pagination and native browser print have to work together.

[Layout, reflow and print →](docs/ENGINEERING.md#lumina)

<picture>
  <source media="(max-width: 600px)" srcset="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/system-luminal-mobile.svg?v=3">
  <img src="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/system-luminal.svg?v=3" width="100%" alt="Luminal: camera-angle controls route images through single-shot or multi-stage generation.">
</picture>

### Luminal · Give the camera a direction

Named angles and an orbit control feed image-model requests. Choose **a single call or a six-stage pipeline** that separates subject, environment, pose, composite and face refinement.

**Reuse the expensive preparation.** Session caches retain source and subject analysis until the input changes.

[Spatial controls and generation pipelines →](docs/ENGINEERING.md#luminal)

<details>
<summary><b>Also building: OmniAgent — a local action layer for AI tools</b></summary>

**Workspace boundaries. Hash-checked edits. Durable task state.** Receipts make local AI actions inspectable, with explicit access and recovery behavior.

Local build; clean-machine acceptance and public distribution remain separate work.

[Architecture notes →](docs/ENGINEERING.md#omniagent)

</details>

<a id="behind-the-builds"></a>

## The questions behind the builds

My interests reach into **physics, space, history and how institutions work**. The pattern is the same: follow the explanation, look for the mechanism, then find a way to inspect it.

<details>
<summary><b>Cube → the system outside the room</b></summary>

The *Cube* conversations started with who built the maze, who operated it, and who understood its purpose. I kept asking about the machinery outside the room. That is what the maze here represents: following a question, reaching a dead end and changing the route.

</details>

<details>
<summary><b>Andoria / EFNETWORK → source material I could search and revisit</b></summary>

I worked through subtitle collection, script errors, text cleanup and merging so I could inspect the source material across videos. The preserved archive contains **98 subtitle files**; the dashboard has **98 indexed transcripts**, with Arabic search, maps, a timeline and connections.

It became a data pipeline and an interface for comparing source material. [The longer story →](docs/STORY.md#andoriaefnetwork-from-a-question-to-a-workbench)

</details>

<details>
<summary><b>AI memory → the next question underneath the answer</b></summary>

Where does an assistant keep a decision after the conversation moves on?

<details>
<summary>Saving it creates another question.</summary>

What retrieves the right decision when a later task needs it? What keeps a workflow from skipping its prerequisites?

<details>
<summary>And when the memory keeps growing?</summary>

Does it become useful context, or a larger pile to search through? How do stale decisions get corrected? Those tradeoffs are part of what interests me about agent memory and durable task state.

</details>
</details>
</details>

[How I learned through the work](docs/STORY.md) · [Build milestones](docs/ACHIEVEMENTS.md)

<a id="tech-stack"></a>

<picture>
  <source media="(max-width: 600px)" srcset="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/system-stack-mobile.svg?v=3">
  <img src="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/system-stack.svg?v=3" width="100%" alt="The toolchain: languages, frameworks, infrastructure and creative tools.">
</picture>

## Languages & tools

Across the desktop apps, services and creative tools.

**Languages**

<img src="https://skillicons.dev/icons?i=ts,js,py,go,rust,html&perline=6" alt="TypeScript, JavaScript, Python, Go, Rust, HTML">

**Frameworks, APIs & infrastructure**

<img src="https://skillicons.dev/icons?i=react,nextjs,tailwind,graphql,nodejs,electron&perline=6" alt="React, Next.js, Tailwind CSS, GraphQL, Node.js, Electron">

<img src="https://skillicons.dev/icons?i=aws,gcp,cloudflare,debian,linux,powershell&perline=6" alt="AWS, Google Cloud, Cloudflare, Debian, Linux, PowerShell">

**Tools & creative**

<img src="https://skillicons.dev/icons?i=vscode,visualstudio,blender,ae,ai&perline=6" alt="VS Code, Visual Studio, Blender, After Effects, Adobe Illustrator">

<a id="next-coordinates"></a>

<picture>
  <source media="(max-width: 600px)" srcset="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/system-roadmap-mobile.svg?v=3">
  <img src="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/system-roadmap.svg?v=3" width="100%" alt="Next: deployment recovery, inspectable AI workflows, visual editing and local archives.">
</picture>

## Where the work is heading

| Area | Next engineering goal |
| :--- | :--- |
| **Deployment** | Exercise setup, recovery and upgrades across more real hardware. |
| **Desktop automation** | Expand client-layout coverage while keeping actions bounded and saved state intact. |
| **AI tooling** | Make model handoffs, remembered decisions and tool results easier to inspect. |
| **Visual editors** | Keep data, direct manipulation and exported output in agreement. |

[Build notes](docs/ENGINEERING.md) · [Roadmap details](docs/ROADMAP.md)

<a id="github-activity"></a>

<picture>
  <source media="(max-width: 600px)" srcset="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/system-arcade-mobile.svg?v=3">
  <img src="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/system-arcade.svg?v=3" width="100%" alt="After the build: GitHub activity and the Pac-Man contribution arcade.">
</picture>

## The contribution arcade

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/JPEG111/JPEG111/output/pacman-contribution-graph-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/JPEG111/JPEG111/output/pacman-contribution-graph.svg">
  <img src="https://raw.githubusercontent.com/JPEG111/JPEG111/output/pacman-contribution-graph.svg" width="100%" alt="Pac-Man eating my GitHub contribution graph.">
</picture>

<p align="center"><img src="https://komarev.com/ghpvc/?username=JPEG111&style=flat-square&color=c5ff5c&label=profile+views" alt="Profile view counter"></p>

<p align="center"><a href="#user-content-top">↑ Back to top</a></p>
