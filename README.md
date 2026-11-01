<a id="top"></a>

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

**Skandar · developer · Netherlands**

I build desktop software, deployment tooling and AI tools. I tend to follow a problem past the interface: what owns the state, what breaks when a connection drops, and how do the pieces fit together?

That has taken me from hosting apps on spare phones to voice pipelines, searchable media libraries and visual editors. Here are the parts worth opening up.

<a id="selected-systems"></a>

## Released software

<a href="https://github.com/JPEG111/anydeploy-releases">
<picture>
  <source media="(max-width: 600px)" srcset="assets/profile/system-anydeploy-mobile.svg">
  <img src="assets/profile/system-anydeploy.svg" width="100%" alt="anyDeploy: repository to build, process, proxy and public URL on your own hardware.">
</picture>
</a>

**A deployment platform for hardware you own.** Deploy to Android / Termux, Raspberry Pi, Linux and Windows / WSL2. The app brings framework detection, builds, nginx, PM2, TLS and Cloudflare routing into one workflow.

The interesting part is what happens after the first successful deploy: inspecting services, handling disconnects and resuming interrupted work.

**In the Studio development build:** live websites remain interactive on 3D device screens. Page layout stays fixed while render density changes, and the same occlusion boundary controls both what you see and what you can click.

[Project →](https://github.com/JPEG111/anydeploy-releases) · [Windows / Linux downloads](https://github.com/JPEG111/anydeploy-releases/releases/latest) · [Under the hood](docs/ENGINEERING.md#anydeploy)

<a href="https://github.com/JPEG111/orbs-release">
<picture>
  <source media="(max-width: 600px)" srcset="assets/profile/system-orbs-mobile.svg">
  <img src="assets/profile/system-orbs.svg" width="100%" alt="Orbs: observe client state, recover within bounded deadlines, verify actions and manage the queue.">
</picture>
</a>

**A Windows app for supported Discord Quests.** Orbs combines discovery, queue management, an English / Egyptian Arabic interface, tray controls and updates.

Underneath the UI: semantic control discovery, bounded retries, deadlines that survive interruptions, and checks before repeating an uncertain action.

[Project →](https://github.com/JPEG111/orbs-release) · [Windows download](https://github.com/JPEG111/orbs-release/releases/latest) · [State and recovery](docs/ENGINEERING.md#orbs)

<a href="https://github.com/JPEG111/InstaVault-Releases">
<picture>
  <source media="(max-width: 600px)" srcset="assets/profile/system-instavault-mobile.svg">
  <img src="assets/profile/system-instavault.svg" width="100%" alt="InstaVault: import media, enrich locally, connect it in a graph and search the archive.">
</picture>
</a>

**Saved media becomes a library you can actually search.** InstaVault imports posts and shared media, adds local AI tagging, OCR and embeddings, then exposes the collection through graph, fuzzy and semantic search.

Electron wraps a React / FastAPI app. Optional transcription runs in a separate Python process so its ML dependencies stay apart from the frozen backend.

[Project →](https://github.com/JPEG111/InstaVault-Releases) · [Windows download](https://github.com/JPEG111/InstaVault-Releases/releases/latest) · [Pipeline and packaging](docs/ENGINEERING.md#instavault)

<a id="the-lab"></a>

## Inside the lab

Local builds and experiments, with their own engineering problems.

<picture>
  <source media="(max-width: 600px)" srcset="assets/profile/system-jarvis-mobile.svg">
  <img src="assets/profile/system-jarvis.svg" width="100%" alt="JARVIS: wake word, speech recognition, model and tool routing, streamed text-to-speech.">
</picture>

**JARVIS — voice, vision and tools on a shared GPU.** Wake word → VAD → Whisper → LangGraph routing → streamed Chatterbox speech. The work includes sentence queues, model fallbacks, persistent project state and unloading speech models before heavier vision work.

[Voice pipeline and memory tradeoffs →](docs/ENGINEERING.md#jarvis)

<picture>
  <source media="(max-width: 600px)" srcset="assets/profile/system-lumina-mobile.svg">
  <img src="assets/profile/system-lumina.svg" width="100%" alt="Lumina: one typed document model connects AI edits, pointer layout controls, pagination and print.">
</picture>

**Lumina Resume Architect — document editing beyond a chat box.** Unstructured text becomes typed resume data shared across twelve templates. AI edits, pointer-based layout controls, pagination and native browser printing work from that same document.

[Layout, reflow and print →](docs/ENGINEERING.md#lumina)

<picture>
  <source media="(max-width: 600px)" srcset="assets/profile/system-luminal-mobile.svg">
  <img src="assets/profile/system-luminal.svg" width="100%" alt="Luminal: camera-angle controls route images through single-shot or multi-stage generation.">
</picture>

**Luminal — a visual interface for multi-angle image generation.** Named camera angles and an orbit control feed model routing. Small edits can use a single call; another path separates subject extraction, environment generation, posing, compositing and face refinement, with reusable session caches.

[Spatial controls and generation pipelines →](docs/ENGINEERING.md#luminal)

<details>
<summary><b>Also building: OmniAgent — a local action layer for AI tools</b></summary>

Workspace boundaries, hash-checked edits, durable task state and inspectable receipts. The difficult part is connecting useful actions to explicit access and recovery behavior. It remains a local build; clean-machine acceptance and public distribution are separate work.

[Architecture notes →](docs/ENGINEERING.md#omniagent)

</details>

<a id="tech-stack"></a>

<picture>
  <source media="(max-width: 600px)" srcset="assets/profile/system-stack-mobile.svg">
  <img src="assets/profile/system-stack.svg" width="100%" alt="The toolchain: languages, frameworks, infrastructure and creative tools.">
</picture>

## Languages & tools

The stack I work with across software, infrastructure and creative projects.

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

## GitHub activity

<div align="center">

<img src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=JPEG111&theme=dracula" alt="Languages in my public GitHub repositories">
<img src="https://streak-stats.demolab.com?user=JPEG111&theme=dracula&hide_border=true" alt="GitHub contribution streak">

</div>

<sub>Language and contribution cards reflect public GitHub activity.</sub>

### The contribution arcade

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/JPEG111/JPEG111/output/pacman-contribution-graph-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/JPEG111/JPEG111/output/pacman-contribution-graph.svg">
  <img src="https://raw.githubusercontent.com/JPEG111/JPEG111/output/pacman-contribution-graph.svg" width="100%" alt="Pac-Man eating my GitHub contribution graph.">
</picture>

<p align="center"><img src="https://komarev.com/ghpvc/?username=JPEG111&style=flat-square&color=6366f1&label=profile+views" alt="Profile view counter"></p>

<p align="center"><a href="#user-content-top">↑ Back to top</a></p>
