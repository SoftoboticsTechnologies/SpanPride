# Verification Report

Run on 2026-10-23 against the original site as fetched that day. Automated checks used headless Chrome (puppeteer-core) on the local files.

## 1. Content preservation (automated text comparison)

Every visible text string was extracted from each original page's header, main Elementor content and footer, then checked for an exact match (whitespace-normalised) in the new page.

| Page | Original strings | Missing | Title | Meta description | Form placeholders |
|---|---|---|---|---|---|
| Home | 45 | 0* | identical | identical | – |
| About | 41 | 0* | identical | identical | – |
| Services | 43 | 0 | identical | identical | – |
| Projects | 55 | 0 | identical | identical | – |
| Testimonials | 47 | 0 | identical | identical | – |
| Contact | 34 | 0* | identical | identical | identical |

\* The social network names (Facebook, Twitter, Youtube, Instagram, Linkedin) were screen-reader-only text on the original. Here they are `aria-label` / `title` attributes on the same icons, so screen readers announce the same words.

**Text that is new in the redesign (not content):** a "Skip to content" accessibility link, visually hidden form labels that repeat the original placeholders, and the counters' final values (400 / 100) in the HTML before they animate.

**Kept exactly as published, although they look like errors on the original:** `info@spanride.in` (domain does not exist), "fARROQ saab", "View All Services" in the Projects section, and first-person "About Me", "My Expertise", "Follow Me" and "Send Me a Message" on a company site.

## 2. Responsive layout: 6 pages × 8 widths = 48 checks

Widths tested: 320, 375, 425, 768, 1024, 1280, 1440, 1920 px.

| Check | Result |
|---|---|
| Horizontal overflow (`scrollWidth > innerWidth`) | **0 / 48** after fixing the off-canvas drawer, which used to add 380 px at ≤1024 px |
| JavaScript errors | **0** |
| Broken internal links | **0** |
| Exactly one `<h1>` per page | **6 / 6** |
| Images loaded (naturalWidth > 0) | **All except the 1 known-missing services image**, which shows its fallback panel |

Screenshots at 375 px and 1440 px were reviewed by eye for Home, Projects, Services and Contact. About and Testimonials passed the automated checks above but were not reviewed by eye at every width.

## 3. Functional tests

| Test | Result |
|---|---|
| Mobile nav hidden by default; toggle opens it and sets aria-expanded | PASS |
| Focus moves into the drawer; Esc closes it; a drawer link navigates | PASS |
| Desktop: inline nav, no hamburger | PASS |
| Home carousel autoplays (1/6 → 2/6 after 5 s) | PASS |
| Project carousel: next, previous with wrap-around, dot navigation | PASS |
| Single-image carousel (Hotel Meridian) hides controls | PASS |
| About counters finish at 400 and 100 | PASS |
| Empty form submit shows 3 × "This field is required." | PASS |
| Invalid email shows "Enter a valid email address." | PASS |
| Valid submit with no endpoint opens the mail client | **Not verifiable headless.** The code path runs, but Chrome hands `mailto:` to the OS. Check by hand in a desktop browser |
| Submit to a real `formEndpoint` | **Not tested.** No endpoint is configured yet |
| Google Maps iframe | Loads with no request errors, but it is blank in headless full-page screenshots, so it was not checked by eye |

## 4. Remaining discrepancies and owner actions

1. Confirm the correct email address (`info@spanride.in` vs `info@spanpride.in`).
2. Set `formEndpoint` in `js/config.js` so the form delivers messages.
3. Supply `images/services/gray-dining-table-under-pendant-lamps.jpg`, which is also missing on the live site.
4. Add social profile URLs in `js/config.js`, if the profiles exist.
5. Optional: delete `images/originals/` (~163 MB archive) before deploying.
