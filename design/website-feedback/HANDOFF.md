# Website feedback kit handoff

- Owner: current NeuroNook website task, parent T3 thread bf8ff20d-065c-40f1-a12a-6ab3a22baa0d.
- Branch: `feature/website-feedback-kit`, based on `origin/main` at `bff2bd6`.
- Worktree: `/Users/Shared/neuronook-website-feedback-20261030`.
- State: draft feedback materials; no production design selected. Source exploration, poll versions, PNG exports, decks, poll text, blank response template, and regeneration script retained in Git.
- Verification: renderer passes 11 image exports and three deck orders; matched text and screenshot content; no clipping, broken images, page errors, scripts, or remote requests. Eleventy build and `node scripts/check-site.mjs` pass. See `verification.json`.
- Independent review: Claude Sonnet 5.5 at medium effort returned clean with no blockers. The poll slide now includes familiarity and the privacy note; README clarifies manual phone-layout sessions. Fixed-height difference in C remains a disclosed concept difference. Parent verified the game capture byte-for-byte against the app source.
- Limits: no participant responses collected; no live A/B/C experiment, poll service, publish, or merge. Print and social-platform compression not tested.
- PR and final SHA: recorded in the parent task's final response and GitHub draft PR; this file is committed with the kit.
- Checkout retained; owner has not relinquished it. Original website checkout and app documentation changes were preserved.
