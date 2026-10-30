# Website work record

Recorded 30 October 2026. This record separates shipped website work from draft design research. It does not approve a new design, app purchase behavior, pricing, or a release.

## Shipped website

| Work | Result | Record |
| --- | --- | --- |
| Static site | Eleventy landing page, privacy, support, Markdown notes and RSS, changelog, 404, local app screenshots and official App Store badge | [PR #1](https://github.com/weskcode/neuronook-privacy/pull/1) |
| Legacy URLs | Canonical links, meta refresh and preserved fallback pages for the original GitHub Pages privacy/support addresses | [PR #2](https://github.com/weskcode/neuronook-privacy/pull/2) |
| App theme and presentation | Website polish while retaining NeuroNook's app identity | [PR #3](https://github.com/weskcode/neuronook-privacy/pull/3) |
| Privacy disclosures | Corrected the external-service disclosure; retained privacy review evidence | [PR #4](https://github.com/weskcode/neuronook-privacy/pull/4), [disclosure map](privacy-disclosures.md) |
| Concise copy and support address | Compacted home, privacy, support, notes, changelog and shared copy; published `support@neuronook.app` on current and legacy pages | [PR #5](https://github.com/weskcode/neuronook-privacy/pull/5) |

PRs #1–#5 are merged. The latest recorded production merge is `bff2bd65f52d1bd6f1341475252a9e5879731fe0` from PR #5. The Cloudflare site and GitHub Pages fallback were verified after that merge. This is dated evidence, not a new deployment check.

The site uses local assets and no client scripts, analytics, cookies, third-party fonts, embeds, or CDNs. Canonicals and metadata point at `https://neuronook.app`; security headers, sitemap, RSS and robots rules are included. See [build and hosting instructions](../README.md) and [verification](verification.md).

### Recorded verification

- Initial local Lighthouse results met 95 in every category on indexable pages. The intentional `noindex` 404 scored 69 for SEO; other 404 categories met 95. These are historical measurements, not current guarantees.
- Post-PR-#5 browser checks passed 28 route/width combinations, keyboard and navigation paths, mail links, real missing-page behavior, and the policy table's accessibility roles and enlarged-text layout.
- The same post-deployment checks found no scripts, cookies, storage writes, or foreign requests. HTTP/header checks and screenshots were retained with the task evidence.
- The harness initially expected the local server's 404 reason phrase. Production returned the expected 404 with a different console format. The harness was corrected to exclude only that known missing URL's expected console event; other console errors still fail.

### Support email

Cloudflare receiving rules were configured for the public support address and a second public alias, with the forwarding destination kept private. The setup receipt records active routing, not a sent test message. Private custom-domain outgoing replies remain unconfigured. No private inbox address belongs in this repository.

## Draft A/B/C website study

Wes requested more visible app screens and a cuter website using app colors, sky and grass. Three directions were explored: sky and meadow, cream with a grass-colored gallery, and peach with a blue closing section. No direction has been selected for production.

[Draft PR #6](https://github.com/weskcode/neuronook-privacy/pull/6) preserves the work outside Eleventy's `src` input. The initial kit commit is `f51dc20151c53968054bca8b3b1fa8a75d3b953b`.

The [feedback kit](../design/website-feedback/README.md) contains:

- The original interactive exploration, including its differing layouts and named directions.
- Matched survey versions with the same pitch, three app screens, captions and privacy text, labeled only A/B/C.
- Eleven PNGs: three standard concepts, three phone layouts, three ordered comparisons, an introduction and poll questions.
- Six-image decks in ABC, BCA and CAB order, neutral online/in-person questions, and a blank response template.
- A [portable ZIP](../design/neuronook-website-feedback-kit.zip), local assets, editable HTML/CSS, regeneration script and [verification record](../design/website-feedback/verification.json).

The image renderer passed bounds, image decoding, matching option content, deck-order checks, and zero scripts or remote requests. ZIP contents were checked byte-for-byte. Eleventy and `node scripts/check-site.mjs` passed with the kit excluded from site output. A fresh independent review found no blockers; the poll image and phone-session instructions were clarified from its notes. Print output and social-platform compression remain untested.

This is a concept preference study, not a live conversion experiment. No poll platform, traffic splitting, analytics, participant collection, or production update was configured. Keep real responses private and out of Git. Review the feedback with Wes before implementing a direction.

## Related app 1.1 research

A separate NeuroNook thread was started to inspect the app and research competitors, onboarding, trial/paywall options, free/paid boundaries, monthly/annual pricing, revenue scenarios and release priorities. That thread owns its research files and publication; website work does not establish the app's billing behavior or release readiness.

The research belongs in `weskcode/NeuroNook`, under `Docs/Research/NeuroNook-1.1-2026-10-30/`. Its report, decision board, calculation script/data and review records are separate from these website drafts. Financial figures are scenario assumptions, not revenue forecasts or price approval.

## Next decisions and ownership

1. Share the kit and collect private feedback, then choose or revise a website direction.
2. Review the app research and decide the 1.1 product, trial, pricing and scope separately.
3. Select a provider and verify a safe custom-domain reply path if outgoing support mail is needed.

Website task owner retains branch `feature/website-feedback-kit` and its checkout. PR #6 remains draft; no merge or cleanup was requested. The research owner controls its own branch and checkout. Existing app documentation work and the earlier website checkout were preserved.
