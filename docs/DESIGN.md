# README design

The profile uses GitHub Markdown, original SVG artwork and native links.

- Dark blue and lime artwork, with separate light and narrow-screen variants.
- Animated signal paths illustrate deployment and desktop workflows.
- Original SVG motion respects the browser's reduced-motion preference.
- Languages and tools appear in labeled icon rows.
- Contribution cards and Pac-Man remain visible.
- Release links and project information stay selectable as ordinary text.

Third-party icon and statistics images depend on their providers. The cards describe public GitHub activity.

## Rebuild the artwork

Node 22, without package dependencies:

~~~sh
node tools/render-profile.mjs
~~~

[Back to profile](../README.md)
