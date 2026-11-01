# Build milestones

## anyDeploy

A self-hosted deployment desktop app for Android phones, Raspberry Pi, Linux and Windows targets.

- Public Windows installer and Linux AppImage.
- Release artifacts and SHA-256 checksums.
- Version **1.0.92** is a published release checkpoint.

[Project overview](https://github.com/JPEG111/anydeploy-releases) · [Release checkpoint](https://github.com/JPEG111/anydeploy-releases/releases/tag/v1.0.92) · [Latest downloads](https://github.com/JPEG111/anydeploy-releases/releases/latest)

## Orbs

A Windows desktop app for supported Discord Quests, with queue management and an English / Egyptian Arabic interface.

- Windows installer and in-app updates.
- Saved preferences and queue handling.
- The **1.21.14** engineering checkpoint recorded a **657-test suite** run against both source and compiled builds, with additional recovery and installer checks.

Those two runs use the same suite. The checkpoint is dated; it does not establish compatibility with every future Discord version.

[Project overview](https://github.com/JPEG111/orbs-release) · [Release checkpoint](https://github.com/JPEG111/orbs-release/releases/tag/v1.21.14) · [Latest downloads](https://github.com/JPEG111/orbs-release/releases/latest)

## InstaVault

A local Windows build for a searchable media library.

- Local AI enrichment, OCR, embeddings and graph exploration.
- Optional transcription isolated in its own Python process.
- Desktop packaging work includes update-cache and import-wizard fixes.

[Pipeline and packaging](ENGINEERING.md#instavault)



## Work across rendering, input and local models

### anyDeploy Studio: the same geometry for pixels and clicks

A live website remains interactive on a 3D phone or laptop screen. Logical layout and raster density are separate, so moving the device does not force the page to reflow. Occlusion constrains both the visible page and its input boundary. Shared ADB mirroring can coexist with an external scrcpy session.

**Stage:** development build. This is separate from the public deployment release and does not imply completed acceptance on every device.

### JARVIS: generation and playback overlap

Sentence and audio queues separate streamed text, speech synthesis and playback. Explicit speech-model unload/reload paths recover GPU memory for heavier vision/computer-use work. The design addresses a resource constraint as well as the voice interface.

**Stage:** local build. This profile revision inspects existing source; it does not claim a new end-to-end latency benchmark.

### A research archive with source boundaries

A preserved snapshot contains 98 SRT inputs, a 1,980,513-byte merged transcript, and a dashboard with 98 index entries and 98 text files. The collection and processing work grew out of the Andoria/EFNETWORK research conversations.

**Stage:** local research tooling; counts checked 1 November 2026. These are software/data artifacts, not validation of the documentary claims. [How the work developed](STORY.md).

[Project roadmap](ROADMAP.md) · [Back to profile](../README.md)
