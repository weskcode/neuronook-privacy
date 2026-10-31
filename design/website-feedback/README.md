# NeuroNook website feedback kit

Draft concepts for feedback before a website update. These files sit outside Eleventy's `src` directory and are not included in the site build. No production routes, dependencies, hosting settings, or live experiments change.

## Share the images

- `exports/A.png`, `B.png`, `C.png`: matched 1080 × 1350 images for posts, messages, slides, or printing.
- `exports/A-mobile.png`, `B-mobile.png`, `C-mobile.png`: the phone layout at a 390px viewport, on the same image canvas.
- `exports/04-comparison.png`: a 1920 × 1080 comparison. Use the individual images first so people can inspect them at a larger size.
- `exports/01-intro.png` and `05-poll.png`: introduction and feedback questions.
- `deck-ABC.html`, `deck-BCA.html`, `deck-CAB.html`: six-image decks. Open locally with the assets and exports folders alongside them. These can also be printed from a browser. Each comparison follows the deck's presentation order.

Use the ZIP alongside this folder for a portable copy of the complete kit. The PNGs are ordinary images; paste or attach them directly. Nothing has been posted to a polling service. The HTML decks have no response collection or remote requests.

## Run the concept test

This is a preference study, not a live conversion experiment. It can tell us what people prefer and understand. It cannot establish a change in downloads or conversion rate.

1. Recruit people who might use a wellness journal. Include people unfamiliar with NeuroNook. Keep existing users identifiable as a separate group, without collecting their names.
2. Rotate deck orders ABC, BCA, CAB across participants or online groups. Keep the letters tied to their designs. For an online post, attach the individual images in that order, then the corresponding comparison.
3. Use one image set per session: standard or mobile. Keep the display size and zoom the same for all three. Allow zooming on individual images. Do not mix mobile A with standard B and C. The ready-made decks and comparisons use the standard set. For a phone-layout session, show the three mobile PNGs individually in the assigned order, then the poll image; omit the standard comparison.
4. Ask the questions in `poll-copy.md`. Do not describe an option as cuter, calmer, better, or recommended. For an in-person group, collect each person's answer before discussion.
5. Record one response per participant in a private copy of `responses-template.csv`. Do not commit actual responses, usernames, contact details, or personal wellness information. The checked-in CSV is a blank header only.
6. Summarize the number of responses and raw choice counts, including ties and none. Keep online and in-person results separate first; also check presentation order and prior familiarity. Report missing answers. Do not label a small convenience sample statistically conclusive.
7. Review the reasons, app understanding, and readability issues alongside the votes. Choose a direction only after Wes reviews the feedback. No option is approved for production by this kit.

ABC/BCA/CAB rotate first position. If order effects matter, add the reverse orders ACB/CBA/BAC in a later round. Public poll results can influence later votes; private responses are preferable when the chosen platform supports them. No online platform or paid service has been configured.

## What is held constant

The poll versions use the same pitch, screenshot order, screenshots, labels, and privacy text. A uses sky and a curved grass horizon; B uses cream and a flat pale-green gallery; C uses peach and a blue closing section. C retains its original warmer screenshot borders. The palette, landscape treatment, and small spacing differences are tested together as a concept, not as isolated color variables.

The original exploration is saved as `original-directions.html`, including B's extra day-detail crop and the named directions. Do not use it as the survey stimulus: its content differs and its names can prime responses.

## Sources

- Neighborhood and calendar: existing website `src/assets/*-large.webp`, captured October 28, 2026 per the site. Demonstration entries.
- Game: NeuroNook `AppStore/Screenshots/Source/05-checkin-game.png`, copied without editing. This is an existing capture, not evidence of a new app run.
- Day detail in the original exploration: existing website `day-detail-large.webp`.
- App Store badge: existing local official SVG.
- Typography: installed system rounded font with system fallbacks; no remote fonts.

## Regenerate the images

`render.mjs` uses an existing `playwright-core` installation and Chromium browser. It installs nothing and is separate from the website dependencies. Set paths for your machine:

```sh
PLAYWRIGHT_MODULE=/absolute/path/to/playwright-core \
CHROME_PATH=/absolute/path/to/chromium \
node design/website-feedback/render.mjs
```

The script exports the PNGs, checks the slide bounds, decodes images, confirms matched option content and image order, checks each six-image deck, and rejects remote requests and page errors. `verification.json` records the results. Actual print output and social-platform compression still depend on the device or platform used.
