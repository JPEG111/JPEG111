# README design

Original dark SVGs form a connected set of project panels: orbiting signals in the hero, animated deployment stages, voice waveforms, editable document layers and camera-angle controls. Each panel has a separate narrow-screen composition. Dark backgrounds remain dark in both GitHub themes.

The profile uses GitHub Markdown, picture sources, linked images and native disclosures. Project descriptions, release links and engineering notes remain selectable text. The diagrams illustrate workflows; they are not application screenshots or live telemetry.

Motion uses SVG-contained CSS and includes a reduced-motion preference. GitHub does not support arbitrary JavaScript or page CSS in a README. Icon and activity cards depend on third-party services. The existing Pac-Man workflow remains unchanged.

## Rebuild the artwork

Node 22, no package dependencies:

~~~sh
node tools/render-profile.mjs
~~~

[Back to profile](../README.md)

## Typography and activity strip

Project purpose lines use native third-level headings; key constraints use selective bold, implementation names use inline code, and platform/status context uses smaller text. GitHub controls the body font. Artwork uses a consistent sans-serif headline and monospaced labels.

A compact custom activity strip sits above the hero. The dark/lime/cyan SVG replaces the third-party donut and streak cards. Desktop and mobile have separate compositions, with a moving baseline and reduced-motion support.

The activity workflow refreshes every twelve hours and publishes only to the profile-activity branch. The existing Pac-Man output branch and workflow stay separate. Data comes from GitHub GraphQL: the contribution calendar, current streak (allowing today to remain empty), best streak within the returned twelve-month period, and primary languages of original public repositories. Repository languages are explicitly distinguished from the full toolchain. The graph shows the latest 56 calendar days. A failed query leaves the previous successful image intact.

Rebuild with Node 22 and an authenticated GitHub CLI: node tools/render-activity.mjs. Generated files stay under .local/generated-activity/. The workflow uses the existing repository token, without a personal secret.
