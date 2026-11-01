# README design

The native GitHub README uses original dark SVG panels, selectable Markdown descriptions, release links and disclosures. It does not embed an executable app. Desktop and mobile have separate compositions.

## Data that changes

The twelve-hour profile workflow publishes 26 SVGs and one summary to the profile-activity branch. GitHub contribution totals, current/best calendar streaks, 56 contribution-day bars, repository-language labels, public commit total and cumulative monthly commit history all come from actual API results. The smaller arcade header also reflects actual contribution days.

The anyDeploy and Orbs cards show their latest public release tag, publication date and attached-file count. The hero's public-release count derives from those featured public release sources, not every release ever published. Repository visibility is checked before release data is used. InstaVault remains a local-build case study, with implementation notes rather than inaccessible download links.

No metric increments just to animate. A value changes when the API snapshot changes. Query failures, incomplete search, mismatched commit-history totals and missing/non-public release sources preserve the previous successful remote publication. GitHub indexing and image caches can delay visible changes. A snapshot date appears on the relevant panels.

## State-driven illustrations

Each project has its own four-state example. All affected objects, text and selection markers change together:

| Panel | Example state sequence | Visual model |
| :--- | :--- | :--- |
| Hero | Source → build → route → service | Exploded orthographic motherboard, memory, storage, I/O and cooling assembly; active component follows the stage |
| anyDeploy | Source → device build → connection loss → recovered route | Shaded device topology, retained-process receipt and endpoint state |
| Orbs | Queue discovered → client lost → uncertain action → confirmation | Client inspector, queue entries, retained deadline and verified advancement |
| InstaVault | Import → enrichment → semantic links → search result | Media tiles become a connected local index and a matching result |
| JARVIS | Audio chunks → transcript → selected tool → speech queue | Ordered input chunks, example utterance, tool route and output sentence |
| Lumina | Document model → block movement → reflow → print | Layout override changes document geometry and creates a second page |
| Luminal | Front → three-quarter → profile → composite | Actual projected subject geometry changes with the named camera angle; source preparation is reused |

These are labelled examples of the documented architecture. They are not live readings from a running application, synthetic performance benchmarks or exact application screenshots. Each cycle lasts sixteen seconds. Reduced-motion mode shows the final state without animation. The old free-running orbits, arbitrary waveform, scan stripes, pulsing dots, moving chart highlight and mechanical digit effects are removed. Headings, tool icons and roadmap goals remain stable labels rather than fabricated progress.

GitHub's Pac-Man remains a game generated from real contribution data. Its existing workflow and output branch are unchanged. The third-party view counter retains its existing service semantics; it is not a unique-person count.

## Rebuild

Node 22 and an authenticated GitHub CLI, without package dependencies:

~~~sh
node tools/render-activity.mjs
node tools/render-profile.mjs
~~~

The first command fetches and validates a complete snapshot, generates all live artwork under .local/generated-activity/, and publishes only with --publish in the profile repository. The second regenerates the checked-in artwork from that validated snapshot. --input accepts an explicit snapshot; --out selects an output directory.

The workflow uses the existing repository token and contents permission. Public commit history uses author:JPEG111 is:public, a before-window baseline and twelve non-overlapping author-date ranges. It covers indexed default-branch matches across all years, excluding private/local-only work. Calendar contributions remain a separate measure. [GitHub commit-search semantics](https://docs.github.com/en/search-github/searching-on-github/searching-commits), [public release API](https://docs.github.com/en/rest/releases/releases#get-the-latest-release).

[Back to profile](../README.md)

## Private commit aggregate and language icon

The commit panel keeps the public and private indexed counts separate. The cumulative curve remains public-only; no deduplicated combined total is claimed. Private commit search has the same default-branch/indexing limits and covers private matches visible to the authenticated owner. Local-only and unindexed work is excluded.

The owner explicitly approved publication of the aggregate private count. A small local collector verifies the signed-in account, asks GitHub CLI for only total_count/incomplete_results, and publishes an allowlisted private-metrics.json containing the count, scope and its own UTC timestamp. Repository names, commit messages, hashes, URLs and credentials are excluded. The public Actions job consumes this aggregate and never receives a private-access credential.

The local refresh runs every twelve hours and at sign-in, then dispatches the existing public refresh. It uses the owner's existing GitHub CLI sign-in and a hash-pinned standalone collector on that computer; it never executes newly changed repository code with that credential. The private count can pause while the computer is off, signed out, offline or needs authentication. Its visible timestamp always shows when it was actually verified. The regular public job continues independently and preserves that original private timestamp.

The in-panel language badge ranks GitHub-classified CODE BYTES across owned, public, non-fork repositories. It is not repository count, commit count, time spent coding or the full toolchain. Name, colour, icon and percentage change with the ranking. Common language symbols have inline vector/text tiles; unknown languages use their initials. Missing/incomplete language data fails without changing the last successful published panels. An account with no classified public code shows an explicit unclassified state.
