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
