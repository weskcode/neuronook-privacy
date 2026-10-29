# Asset sources

## Real app screenshots

The three screenshot sets in `src/assets/` are resized WebP copies of actual NeuroNook UI test attachments. No app controls, text, scores, or device frames were drawn or replaced. The example entries are synthetic fixtures; the detail screen visibly says “Mock entry for Oct 27, 2026.” Inspection found no personal journal content or identifying user information in these selected screens.

Source: `weskcode/NeuroNook`, historical source SHA `1614043f1d29e95d384e20c25b4b44c6ab0ca446`, U5 generation 8, `g8-en-light-default`. The test attachment manifest timestamps are **October 28, 2026 UTC**, as also documented in `reports/U5.md` section 19 of the October 26 program's evidence. These are recent historical captures, not a verification of the current app candidate. Device: iPhone 17e, iOS 27.0, English, light appearance, default text size; the neighborhood itself shows its nighttime sky.

| Website asset | Original attachment | SHA-256 of original PNG |
| --- | --- | --- |
| `neighborhood*.webp` | `9D6A544B-312F-415C-95C9-BEACD20F80E0.png` | `33581e74c6dc8a9e853fd347ebddb6bac8cd8fe5a8cd76e36009bd352e0a5afa` |
| `day-detail*.webp` | `915A5C9A-3EF2-492A-84AF-E484ADF21498.png` | `69c0d934f2f8eedbc01d5e392dfecbb2ba3fb9c87711fb056f551a15e0c6aac2` |
| `calendar*.webp` | `7F79206B-5D23-4A5B-B3AC-8ED10AE7C2F4.png` | `779d8343a46797399b5cf920f46b290799c4232b168f0beb4e2b35c9dab06ec8` |

The original 1170 × 2532 PNGs remain in the app's preserved evidence. The website copies were resized proportionally to 480 and 960 pixels wide with Pillow's Lanczos resampling, then encoded as WebP at quality 88. This is an offline asset preparation step, not part of the Eleventy build. `screenshots.json` records provenance alongside the assets. `social.png` uses a crop of the same real neighborhood screenshot with website copy.

`favicon.png` is a resized copy of NeuroNook's existing `Assets.xcassets/AppIcon.appiconset/appicon.png` at app source SHA `cb8f10abd7b33488d07da7bfbab413fab77ac974`.

## Official App Store badge

`app-store-badge.svg` is Apple's unmodified English black “Download on the App Store” SVG, downloaded October 29, 2026 from:

https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1710288000

It is served locally and links directly to https://apps.apple.com/us/app/neuronook/id6745560129. Its accessible name comes from the image alt text. The displayed badge preserves its aspect ratio and has surrounding clear space.

Usage: [Apple's marketing resources and identity guidelines](https://developer.apple.com/app-store/marketing/guidelines/). Apple owns its badge and trademarks; the site footer includes the attribution.
