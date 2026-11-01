# Engineering notes

The projects share an interest in systems with several moving parts: infrastructure, model runtimes, stateful desktop interfaces and document geometry.

## anyDeploy

**Released desktop app · [project and downloads](https://github.com/JPEG111/anydeploy-releases)**

A deployment goes beyond running a build command. Source detection, the build directory, the running process, reverse-proxy configuration and the public route need to agree. anyDeploy brings nginx, PM2, TLS and optional Cloudflare Tunnel / DNS into the desktop workflow across supported hardware.

The Android path adds another layer: Termux and its Linux environment have different filesystem, service and shell assumptions from a conventional server. Earlier work had to distinguish a source checkout from the live application path and ensure service checks saw the right runtime environment.

The public v1.0.92 release adds reconnect-and-resume behavior when Wi-Fi interrupts a build.

### Studio: a browser inside a device inside an interface

The Studio development build maps isolated, interactive Electron browser guests onto 3D phone and laptop screens. The page keeps a fixed logical viewport while the raster resolution changes, so orbiting the device does not reflow or reload the website.

Occlusion has to govern input as well as pixels. A projected device footprint clips the screen and its click targets together; otherwise a hidden part of the website can still receive a click. The footprint is a conservative approximation rather than per-triangle hit testing.

Phone mirroring uses a shared loopback ADB path alongside an existing scrcpy session. Video and control were checked on a Samsung device; broader hardware, audio, file transfer and reconnect coverage remain separate acceptance work. These Studio features belong to development builds.

## Orbs

**Released Windows app · [project and downloads](https://github.com/JPEG111/orbs-release)**

The scanner uses observed client state to prepare supported tasks and manage the queue. Control text alone is insufficient: the target needs the expected scope, identity, capabilities and arrival state.

A retry also needs an owner. Re-entering a stage must not silently reset its deadline. An uncertain action must not be replayed simply because the next read is stale. These are the reasons for bounded observation, retained deadlines and separate handling of acknowledged and uncertain actions.

The desktop work includes a custom native interface, asynchronous artwork, English / Egyptian Arabic switching and saved queues/preferences across updates. Current compatibility and supported behavior are described in the public project. Local timers and RPC acknowledgements do not by themselves establish quest credit.

## InstaVault

**Released Windows app · [project and downloads](https://github.com/JPEG111/InstaVault-Releases)**

The pipeline turns imported media into local records that can be enriched with OCR, tagging and embeddings. React presents both a D3 force graph and Fuse-based search; a FastAPI backend handles the work, with Ollama as the default local AI runtime.

The packaged Electron app loads its interface from the backend, keeping API requests on the same origin. The large transcription dependency stack is optional. It runs in a separate Python interpreter recorded at installation, avoiding a mix of the frozen backend's NumPy and the transcription pack's ML dependencies inside one process.

The v1.2.5 release fixes two useful lifecycle cases: an update displaying cached old UI, and an import wizard discarding selections when a drag ended outside the panel. Slow actions also run away from the main event-loop path.

## JARVIS

**Local build · Python / LangGraph / FastAPI / React**

The voice path connects wake-word detection, voice activity detection, faster-whisper, model/tool routing and Chatterbox speech. Sentence accumulation, TTS work and audio playback use separate queues so the system can start speaking while a longer answer is still arriving.

Routing separates lightweight local conversation from tool use and more complex model requests. A project tracker stores plans and progress beyond one interaction; semantic memory uses a local vector store.

A practical constraint is GPU residency. Speech recognition, synthesis and vision compete for memory. The source has explicit unload/reload paths for speech models around heavier computer-use work. This exposes a real tradeoff between responsiveness and available GPU memory; it is not a claim of general autonomous intelligence.

## Lumina

**Local build · React / TypeScript / Express / SQLite**

A typed ResumeData object connects generated content, conversational edits and twelve templates. Template-specific layout overrides keep a change to one design from accidentally becoming a universal document offset.

The direct manipulation layer distinguishes movement that affects document flow from free movement, and includes width and scale controls. Pagination measures a separate document copy. Export currently uses native browser print.

The engineering question is how manual overrides, text reflow and page boundaries interact. A layout change can alter line wrapping, page count and the space available to another block. Those interactions are the focus of the editor work.

## Luminal

**Experimental local creative tool · React / Three.js / Gemini APIs**

Named camera positions and an orbit interface provide spatial controls over image-model requests. The generation layer chooses between a single-shot path and a six-stage path: normalize the source, extract the subject, generate the environment, repose the subject, composite and refine the face.

Session caches reuse the source preparation and extracted subject. Source changes invalidate the relevant intermediate images. The current batch helper uses seven key angles with bounded retries.

The tool orchestrates existing image models. View consistency remains model-dependent, and it does not reconstruct a verified 3D scene.

## OmniAgent

**Local build · Windows tooling / MCP**

An action layer connecting AI clients to selected local workspaces. Its design includes workspace boundaries, hash-checked file edits, task state, recovery and receipts that make actions inspectable.

Connection checks, access selection, an installed update and clean-machine distribution are different acceptance steps. The useful architectural question is how an assistant can keep working while the owner can still understand and control its reach.
