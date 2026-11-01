# Built for the README

This is the source for JPEG111's actual GitHub profile README. It uses GitHub-rendered Markdown and original SVG images stored in this repository.

## Visual language

A working notebook for connected systems: cropped corners, signal traces and project-specific flow diagrams. Deep blue and lime in dark mode; pale paper, ink and green in light mode.

Each project image has its own diagram: repository to deployment to hardware; observation to queue to recovery; sources to archive to map. Signals move along those paths. They are decorative, not live telemetry.

The reading order starts with what visitors can try, then explains how research became tooling, how I approach problems, how the work developed and what comes next. Private conversations inform the examples; raw transcripts and sensitive personal details stay private.

## Native GitHub interactions

- Linked project artwork opens the relevant release repository.
- Picture sources select separate desktop/mobile compositions and light/dark palettes.
- Section navigation uses native links and keyboard-style labels.
- Four nested disclosure sections follow one memory question into deeper design questions.
- A short timeline connects research, visualization, shipping and memory work.
- Roadmap rows define the next milestone for each focus.
- The existing contribution animation and workflow are preserved in an optional disclosure.

The substantive text stays selectable. Artwork has alternative text and embedded descriptions. Custom SVG motion stops when the browser requests reduced motion; unsupported animation leaves a readable static image. The existing Pac-Man animation has its own behavior.

## Rebuild the artwork

Node 22, no package dependencies:

```sh
node tools/render-profile.mjs
```

The README and supporting Markdown are maintained by hand. There is no additional website or hosted app involved.

[GitHub profile README documentation](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme) · [Collapsed sections](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-collapsed-sections)

[The project story](STORY.md) · [Back to the profile](../README.md)
