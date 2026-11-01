# From idea to artifact

Software releases, research tools and the decisions behind them. Reviewed 1 November 2026; the checkpoints below distinguish released software, existing artifacts and ongoing design work.

## anyDeploy / hardware you already own

Built a self-hosted deployment desktop app around Android phones, Raspberry Pi, Linux and Windows targets. The project grew from phone-hosting work into a broader deployment interface.

- Public **1.0.92** artifacts include a Windows installer, Linux AppImage and SHA-256 checksums.
- The next Studio and agent workflows have local candidates; they aren't the public release.
- Desktop packaging and local checks don't establish clean-machine or customer acceptance. Those remain separate gates.

[Public release artifacts](https://github.com/JPEG111/anydeploy-releases/releases/tag/v1.0.92) · [Project overview](https://github.com/JPEG111/anydeploy-releases)

## Orbs / making the whole lifecycle work

Built a Windows desktop workflow around Discord Quests, including a visual queue, English/Egyptian Arabic UI, packaging and updates.

The **1.21.14** engineering checkpoint recorded:

| Evidence | Result |
| :--- | :--- |
| Source tests | 657 |
| Exact compiled tests | 657 |
| Simulated timing/state combinations | 288 |
| Simulated interruption boundaries | 12 |
| Owned native provider cases | 31 |
| Owned Chromium provider cases | 30 |
| Selected live client | Navigation from clean channel settings into All Quests, followed by preparation and repeat checks |
| Lifecycle fixtures | Offline upgrade, repair, uninstall/reinstall and retained data checks; old-updater download and hash verification |

The two 657-test runs exercise source and compiled code; they aren't 1,314 distinct tests. Simulations, owned fixtures and a selected real client each establish different things. None proves universal future Discord compatibility or quest credit.

These counts come from the project's local verification records. Public release notes describe the shipped behavior without publishing the complete internal reports.

[Published 1.21.14 checkpoint](https://github.com/JPEG111/orbs-release/releases/tag/v1.21.14)

## Research workbench / from 98 sources to a usable archive

A long-running investigation into history and institutions became a source-processing and visualization project.

- **98 Arabic subtitle files** in the source archive.
- A Python merger that removes subtitle formatting and combines the spoken text into a searchable file of about **1.98 MB**.
- An investigation dashboard with a **98-entry transcript index** and **98 individual text files**, alongside timeline, map and connection views in its source.

The counts and files were checked on 1 November 2026. The dashboard was not rerun end to end during that source review. This checkpoint demonstrates the archive and tooling; claims in documentary material require their own evaluation.

## Visual problem-solving / make the parts share a constraint

While iterating on a project roadmap, the curve and its dot centers repeatedly disagreed. I proposed coordinating the dot positions with the line. The resulting implementation places the dots and constructs a curve through their centers.

This was AI-assisted development: I specified the relationship, reviewed the output, identified failures and directed the correction. It is a useful example of the design and debugging work behind a finished interface.

## Local image-to-3D / knowing when to change methods

Experimented with local multiview generation, then rejected weak results for reference-specific geometry. Deterministic Blender reconstruction produced editable scenes and GLB exports for server, tower, mini-PC and SBC work.

Historical project records include an SBC fan animation with blades and hub moving together while the housing stays fixed. Dimensions and unseen surfaces are inferred. This remains experimental reconstruction work, without a public download or manufacturing-accuracy claim.

## LIFE atlas / making the project history navigable

Built a connected knowledge view using Markdown, native Obsidian Canvas and Bases, plus a separate offline 3D browser artifact. The map preserves links back to the notes and distinguishes kinds of relationships.

It's a dated inventory, not a live measurement of every project or a native Obsidian 3D plugin.

## Agent memory / an ongoing design problem

Long research and design conversations led to a recurring question: how should a system capture decisions, retrieve them at the right moment, and enforce prerequisites before the next action?

Strategy OS explores connected plans, evidence and workflow gates. OmniAgent has local implementation and verification work. A complete autonomous operating system or fully accepted customer workflow isn't claimed here.

[The project story](STORY.md) · [Roadmap](ROADMAP.md) · [Profile](../README.md)
