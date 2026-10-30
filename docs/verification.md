# Website verification, October 29, 2026

Scope: the Eleventy production output on `feature/neuronook-website`. These checks are local website evidence, not deployed Cloudflare evidence or verification of the current iOS app candidate.

- `npm ci`, `npx @11ty/eleventy`, `npm run check`, `git diff --check`, and `npm audit --omit=optional` passed. Eleventy 3.1.7 writes 10 documents; the audit reports zero vulnerabilities.
- Production HTML for 7 pages has unique titles/descriptions, canonicals, Open Graph metadata, smart banners and alt text. All local links and assets resolve. RSS and sitemap XML and robots.txt are present. Only Eleventy is a direct dependency.
- The original privacy and support documents remain archived in `legacy/`. Current copies include the approved privacy disclosure/date correction and the public contact change to `support@neuronook.app`; all other body text is preserved. The rendered support privacy link points to `/privacy/`, with its visible wording unchanged. The site checks compare both current and legacy fallback pages against those narrowly amended originals.
- Playwright with isolated Chromium Headless Shell 156.0.8078.4 checked all 7 pages at widths 320, 375, 414, 768 and 1280: no horizontal overflow, broken images, scripts, cookies, local/session storage writes, or third-party requests. It exercised blog navigation, the support-to-policy link, keyboard skip navigation, and an actual missing URL returning HTTP 404 with a working home link.
- The final HTML was served unchanged from a plain temporary copy with the exact `_headers` response values. No production source was replaced to improve scores. The local test server and browser tools live outside the repository and are not site dependencies.
- Liquid and Kramdown renderer checks passed for both legacy pages, with the redirect switch both false and true. They preserve full original fallback content and canonical links, and enable meta-refresh only when requested. The switch stays false until the new domain is live.
- The local Apple badge matches the original downloaded SVG byte for byte. Pillow inspected all PNG/WebP assets: no EXIF or XMP metadata. Three app screenshots come from October 28 historical test attachments, with synthetic demonstration entries and source hashes recorded in `ASSETS.md`.
- An initial independent review found no code defects and flagged two rollout/documentation issues. Both were addressed: old pages now keep their original content until a deliberate post-launch redirect activation, and the deployment guide explicitly disables Email Obfuscation and other injection features and checks the visible support email. Renderer and output checks passed after those changes. A fresh independent recheck returned clean with no blockers.

## Lighthouse

Lighthouse 13.6.0, isolated Chromium Headless Shell 156.0.8078.4, simulated throttling, mobile and desktop, against the production files and requested security headers. One final run per page and form factor; JSON reports retained with the task evidence.

| Page | Mobile performance | Desktop performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- | --- |
| `/` | 100 | 95 | 100 | 100 | 100 |
| `/privacy/` | 100 | 99 | 100 | 100 | 100 |
| `/support/` | 100 | 99 | 100 | 100 | 100 |
| `/blog/` | 100 | 99 | 100 | 100 | 100 |
| `/blog/welcome/` | 100 | 99 | 100 | 100 | 100 |
| `/changelog/` | 100 | 99 | 100 | 100 | 100 |
| `/404.html` | 100 | 99 | 100 | 100 | 69 |

The 404 template intentionally has `noindex` and is excluded from the sitemap. Lighthouse's SEO score is lower solely because that page is blocked from indexing. Keep that behavior; search engines should not index a missing-page template. All other categories meet 95 on the 404 template, and all four categories meet 95 on every indexable page.

## Pending deployment checks

No Pages project, custom domain, DNS, TLS, email, or zone settings were changed in Phase 1. Live Cloudflare behavior, DNSSEC, HTTPS response headers, injection controls, mail forwarding, www/HTTP redirects, post-launch Lighthouse, and activation of the legacy redirects remain for the authorized launch phase.

The iOS screenshot-build attempt was stopped after a coordinator identified a quarantined simulator conflict. No new screenshot from that attempt is used. Its own hold evidence was copied and hash-verified separately; simulator recovery remains with the owning coordinator. No further iOS build or device action forms part of these website checks.

## Legacy redirect activation follow-up

The Phase 1 results above are historical. The new privacy and support pages are now live on `https://neuronook.app`, and their post-deployment header, script, cookie and request checks pass. This activation branch enables the legacy redirect switch after that verification.

The real GitHub Pages build revealed that excluding `legacy` also excluded `_layouts/legacy.html`, because Jekyll 3.10 uses a prefix match. The exclusion is now `legacy/**`: archived policy files stay excluded while the layout stays available. Source-level reproduction and independent review confirm the fix; a full local Jekyll build is unavailable.

After the owner approves merging this activation PR, verify that the GitHub Pages build has no missing-layout warning and that the old root and `/support/` each contain the expected meta refresh, canonical URL and preserved fallback text.
