<a id="top"></a>

<a href="https://github.com/search?q=author%3AJPEG111+is%3Apublic&amp;type=commits">
<picture>
  <source media="(max-width: 600px)" srcset="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/commit-counter-mobile.svg?v=2">
  <img src="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/commit-counter.svg?v=2" width="100%" alt="Total public commits authored by JPEG111 across all years, as indexed by GitHub on repository default branches. Cumulative monthly public commit history. Open the matching commit search.">
</picture>
</a>

<a href="https://github.com/JPEG111?tab=overview">
<picture>
  <source media="(max-width: 600px)" srcset="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/activity-mobile.svg">
  <img src="https://raw.githubusercontent.com/JPEG111/JPEG111/profile-activity/activity.svg" width="100%" alt="GitHub activity: contributions over the last twelve months, current streak, best streak within that period, recent contribution days and public repository languages.">
</picture>
</a>

<picture>
  <source media="(max-width: 600px)" srcset="assets/profile/system-hero-mobile.svg">
  <img src="assets/profile/system-hero.svg" width="100%" alt="Skandar / JPEG111. Infrastructure, local AI and visual software.">
</picture>

<p align="center">
  <a href="#user-content-selected-systems"><kbd>Released software</kbd></a> &nbsp;
  <a href="#user-content-the-lab"><kbd>Inside the lab</kbd></a> &nbsp;
  <a href="#user-content-tech-stack"><kbd>Languages & tools</kbd></a> &nbsp;
  <a href="#user-content-next-coordinates"><kbd>Roadmap</kbd></a> &nbsp;
  <a href="#user-content-github-activity"><kbd>Arcade</kbd></a>
</p>

### Skandar · Software developer

<sub>Netherlands · Desktop software / infrastructure / AI</sub>

I turn **spare hardware into servers**, **saved media into searchable libraries**, and **AI models into tools you can use**.

I care about **what happens after the demo**: a connection drops, models compete for GPU memory, a document reflows, or a desktop interface changes. That’s where a lot of my work happens.

<a id="selected-systems"></a>

## Released software

<a href="https://github.com/JPEG111/anydeploy-releases">
<picture>
  <source media="(max-width: 600px)" srcset="assets/profile/system-anydeploy-mobile.svg">
  <img src="assets/profile/system-anydeploy.svg" width="100%" alt="anyDeploy: repository to build, process, proxy and public URL on your own hardware.">
</picture>
</a>

### Deploy on hardware you own.

From a repository to a running app on **Android / Termux, Raspberry Pi, Linux or Windows / WSL2**. Framework detection, builds, `nginx`, `PM2`, TLS and Cloudflare routing share one workflow.

**When Wi-Fi drops, the deployment can reconnect and resume.** Services and routes stay inspectable after the first successful build.

> **Studio / development build**
> Live websites stay interactive on 3D device screens. **Fixed page layout, variable render density.** Visual occlusion and click boundaries agree, including where the device hides part of a screen.

[Project →](https://github.com/JPEG111/anydeploy-releases) · [Windows / Linux downloads](https://github.com/JPEG111/anydeploy-releases/releases/latest) · [Under the hood](docs/ENGINEERING.md#anydeploy)

<a href="https://github.com/JPEG111/orbs-release">
<picture>
  <source media="(max-width: 600px)" srcset="assets/profile/system-orbs-mobile.svg">
  <img src="assets/profile/system-orbs.svg" width="100%" alt="Orbs: observe client state, recover within bounded deadlines, verify actions and manage the queue.">
</picture>
</a>

### Automation that checks the state.

A Windows app for supported Discord Quests, with **discovery, queues, tray controls and updates** in English and Egyptian Arabic.

**Observe → act → verify.** Semantic control discovery, bounded retries and retained deadlines keep the workflow tied to what the client actually shows. An uncertain action needs a check before it is repeated.

[Project →](https://github.com/JPEG111/orbs-release) · [Windows download](https://github.com/JPEG111/orbs-release/releases/latest) · [State and recovery](docs/ENGINEERING.md#orbs)

<a href="https://github.com/JPEG111/InstaVault-Releases">
<picture>
  <source media="(max-width: 600px)" srcset="assets/profile/system-instavault-mobile.svg">
  <img src="assets/profile/system-instavault.svg" width="100%" alt="InstaVault: import media, enrich locally, connect it in a graph and search the archive.">
</picture>
</a>

### Find the thing you saved.

Import posts and shared media, enrich them with **local AI tagging, OCR and embeddings**, then explore through **graph, fuzzy and semantic search**.

`Electron` + `React` + `FastAPI`. Optional transcription uses **its own Python process**, keeping its ML dependencies separate from the frozen backend.

[Project →](https://github.com/JPEG111/InstaVault-Releases) · [Windows download](https://github.com/JPEG111/InstaVault-Releases/releases/latest) · [Pipeline and packaging](docs/ENGINEERING.md#instavault)

<a id="the-lab"></a>

## Inside the lab

Working local builds and experiments. Each explores a different constraint.

<picture>
  <source media="(max-width: 600px)" srcset="assets/profile/system-jarvis-mobile.svg">
  <img src="assets/profile/system-jarvis.svg" width="100%" alt="JARVIS: wake word, speech recognition, model and tool routing, streamed text-to-speech.">
</picture>

### JARVIS · Voice, vision and a shared GPU

Wake word → VAD → `Whisper` → `LangGraph` → streamed `Chatterbox` speech.

**Start speaking while the answer is still arriving.** Sentence queues separate generation from playback; model fallbacks and saved project state carry the workflow. Heavier vision work can unload speech models to recover GPU memory.

[Voice pipeline and memory tradeoffs →](docs/ENGINEERING.md#jarvis)

<picture>
  <source media="(max-width: 600px)" srcset="assets/profile/system-lumina-mobile.svg">
  <img src="assets/profile/system-lumina.svg" width="100%" alt="Lumina: one typed document model connects AI edits, pointer layout controls, pagination and print.">
</picture>

### Lumina · Edit the document directly

Unstructured text becomes **one typed document shared across twelve templates**. AI edits and pointer controls operate on the same data.

**A drag can change the page.** Layout overrides, text wrapping, pagination and native browser print have to work together.

[Layout, reflow and print →](docs/ENGINEERING.md#lumina)

<picture>
  <source media="(max-width: 600px)" srcset="assets/profile/system-luminal-mobile.svg">
  <img src="assets/profile/system-luminal.svg" width="100%" alt="Luminal: camera-angle controls route images through single-shot or multi-stage generation.">
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

<a id="tech-stack"></a>

<picture>
  <source media="(max-width: 600px)" srcset="assets/profile/system-stack-mobile.svg">
  <img src="assets/profile/system-stack.svg" width="100%" alt="The toolchain: languages, frameworks, infrastructure and creative tools.">
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
  <source media="(max-width: 600px)" srcset="assets/profile/system-roadmap-mobile.svg">
  <img src="assets/profile/system-roadmap.svg" width="100%" alt="Next: deployment recovery, inspectable AI workflows, visual editing and local archives.">
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
  <source media="(max-width: 600px)" srcset="assets/profile/system-arcade-mobile.svg">
  <img src="assets/profile/system-arcade.svg" width="100%" alt="After the build: GitHub activity and the Pac-Man contribution arcade.">
</picture>

## The contribution arcade

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/JPEG111/JPEG111/output/pacman-contribution-graph-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/JPEG111/JPEG111/output/pacman-contribution-graph.svg">
  <img src="https://raw.githubusercontent.com/JPEG111/JPEG111/output/pacman-contribution-graph.svg" width="100%" alt="Pac-Man eating my GitHub contribution graph.">
</picture>

<p align="center"><img src="https://komarev.com/ghpvc/?username=JPEG111&style=flat-square&color=c5ff5c&label=profile+views" alt="Profile view counter"></p>

<p align="center"><a href="#user-content-top">↑ Back to top</a></p>
