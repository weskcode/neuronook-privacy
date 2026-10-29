# NeuroNook website

A static Eleventy site for https://neuronook.app. The generated pages use no client-side JavaScript, cookies, analytics, external fonts, embeds, or CDN assets. Eleventy is the only direct dependency.

## Build locally

Use Node.js 22 or later.

```sh
npm ci
npx @11ty/eleventy
npm run check
```

Output is written to `_site/`. `npm start` runs Eleventy's local development server; its development reload script is never part of the production build.

## Cloudflare Pages settings

| Setting | Value |
| --- | --- |
| Repository | `weskcode/neuronook-privacy` |
| Production branch | `main` |
| Framework preset | Eleventy, or None with the values below |
| Root directory | Repository root (leave blank) |
| Build command | `npx @11ty/eleventy` |
| Build output directory | `_site` |
| Environment variable | `NODE_VERSION=22` |
| Functions / bindings / secrets | None |

Leave Cloudflare Web Analytics, Zaraz, Rocket Loader, Email Address Obfuscation, Auto Minify JavaScript (if available), and every other script-injecting feature disabled. Do not enable challenges for ordinary visitors. Serve the static output directly, including `_headers` and `404.html`. No GitHub Actions workflow is needed.

### Connect neuronook.app

1. Confirm the existing `neuronook.app` zone is in the same Cloudflare account as the Pages project. The domain is already registered at Cloudflare. Inspect only this domain and preserve existing DNS records, including mail records.
2. In **Workers & Pages → the Pages project → Custom domains → Set up a domain**, add `neuronook.app`. Cloudflare creates the apex CNAME to the project's assigned `<project>.pages.dev` hostname using CNAME flattening. Associate the domain in Pages before adding DNS records manually.
3. Wait for the domain and HTTPS certificate to become active. Confirm `/`, `/privacy/`, `/support/`, `/blog/`, `/changelog/`, `/feed.xml`, and an unknown URL. Check the response headers and confirm the Network panel shows only same-origin assets with no cookies.
4. Keep GitHub Pages enabled on `main`, root `/`, with no custom domain. This PR preserves the full old privacy and support pages. Their shared Jekyll layout has the canonical URLs and a meta-refresh gated by `redirects_enabled`, initially `false`. Merge the site PR only with owner approval, then let Cloudflare build `main` and verify the custom domain. The old pages keep serving their original content throughout this setup.
5. Only after both new destination pages return successful HTTPS responses, prepare a separate activation PR changing `_config.yml` to `redirects_enabled: true`. Get owner approval to merge that activation PR. This enables meta-refresh redirects at the old GitHub Pages root and `/support/` while retaining the full original content as fallback. Verify both legacy URLs afterward. Do not enable the switch before the new domain is live.
6. Check the visible `weskcode@duck.com` mail link on both new pages and confirm no `/cdn-cgi/` scripts, email-obfuscation markup, analytics, cookies, or third-party requests were injected. A CSP that blocks injected scripts does not replace turning the injection features off.

### Launch gate and account settings

Phase 1 ends with the source PR and a design preview. Do not create or change Cloudflare resources until the owner says `launch`. A merge still needs approval naming the exact PR. Do not touch other domains or projects, enable paid features, change billing, buy anything, or create a broad API token.

After the launch gate, configure only `neuronook.app`: production branch `main`; grant the GitHub app access only to this repository; add both apex and `www`; redirect `www` to apex with a 301 Redirect Rule; use Full (strict), Always Use HTTPS, TLS 1.2 minimum, TLS 1.3, HSTS with subdomains and no preload; enable DNSSEC and Bot Fight Mode without visitor-challenge WAF rules. Confirm that all script-injecting features listed above remain off.

For Email Routing, confirm the existing destination inbox before adding `hello@neuronook.app`. Use the SPF record Cloudflare requires for routing and a single DMARC TXT record of `v=DMARC1; p=reject;`. Never publish two SPF records at one hostname: an SPF of only `v=spf1 -all` conflicts with a routing SPF that authorizes Cloudflare. Confirm whether routing accepts a deny-all sending policy before choosing the final record. Keep the public app support address `weskcode@duck.com` unchanged.

Cloudflare configuration and DNS activation are deployment steps; this repository does not publish or alter DNS by itself. After activation, check every live page, redirects, actual HTTPS headers, third-party requests, cookies, console errors and Lighthouse again. App Store Connect URLs have not been changed.

References: [Eleventy on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-eleventy-site/), [custom domains and apex DNS](https://developers.cloudflare.com/pages/configuration/custom-domains/), [static response headers](https://developers.cloudflare.com/pages/configuration/headers/).

## Edit content

- Landing page: `src/index.njk`; shared styles: `src/assets/site.css`.
- Privacy and support: `src/privacy/index.md`, `src/support/index.md`. Their Markdown bodies match the preserved originals in `legacy/`. The support page's relative privacy link is updated to `/privacy/` during rendering, without changing its words.
- Blog: add Markdown files in `src/blog/posts/` with `title`, `description`, and `date` front matter. The directory data supplies the layout, collection, and URL. The index, RSS summaries, and sitemap update on build. The welcome entry is explicitly a placeholder.
- Changelog: `src/changelog.md`. It has no invented app version history.
- Shared metadata: `src/_includes/base.njk` and `src/_data/site.json`.

Keep all assets local. See `ASSETS.md` for screenshot provenance and Apple's badge source. `npm run check` checks output links, metadata, zero active content, and unchanged policy/support source. Lighthouse and responsive browser checks should also run when changing templates or CSS; their tools are not site dependencies.
