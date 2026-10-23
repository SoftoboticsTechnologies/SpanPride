# Site Inventory — spanpride.in

Scanned on 2026-10-23. Pages were discovered through the header and footer links, `wp-sitemap.xml` and its 4 child sitemaps, and the WordPress REST API (`/wp-json/wp/v2/pages`, `/posts`).

## 1. Pages

| # | Original URL | Original `<title>` | Recreated as | Status |
|---|---|---|---|---|
| 1 | https://spanpride.in/ | Home - span design and development | `index.html` | Recreated |
| 2 | https://spanpride.in/about/ | About - span design and development | `pages/about.html` | Recreated |
| 3 | https://spanpride.in/services/ | Services - span design and development | `pages/services.html` | Recreated |
| 4 | https://spanpride.in/projects/ | Projects - span design and development | `pages/projects.html` | Recreated |
| 5 | https://spanpride.in/testimonials/ | Testimonials - span design and development | `pages/testimonials.html` | Recreated |
| 6 | https://spanpride.in/contact/ | Contact - span design and development | `pages/contact.html` | Recreated |

**Other URLs found and not recreated:**

| URL | Finding |
|---|---|
| /form/simple-contact-form/, /form/ | In the SureForms sitemap. Both redirect to the homepage, so there is no standalone page. The same form is embedded on Contact. |
| /?elementor_library=default-kit, -2, -2-2 | Elementor theme kits, not content. They redirect to the homepage. |
| /wp-json/wp/v2/posts | Empty, so the site has no blog posts. |
| /feed/, /comments/feed/ | WordPress RSS feeds with no content. Not applicable to a static site. |

Page titles, meta descriptions, `robots`, canonical URLs and all `og:*` tags were copied programmatically from each original page.

## 2. Heading hierarchy and content (per page)

The full text of every section is in the HTML files. The structure below follows the original's order and heading levels.

**Home:** p "span design and development" → **h1** Building Brighter Futures Through Design & Construction Excellence → paragraph → list "400+ Projects Done", "100+ Happy Clients" → [Read More] → hero image · **h3** span design and development + paragraph + 4 social icons · p "what we do" → **h2** Services → [View All Services] → 01./02./03. **h3** Architectural Design & Consultancy / Construction & Project Execution / Material Procurement & Supply · p "Most Recent" → **h2** Projects → paragraph → [View All Services] → 6-image carousel (autoplay 5 s).

**About:** **h1** About Me + paragraph · **h2** Trusted Construction & Development Company · **h3** Follow Me + 5 social icons (includes Instagram) · paragraph · counters "Projects Done" 0→400 "+", "Happy Clients" 0→100 "+" · **h3** Delivering Innovative Construction Solutions Across Commercial, Healthcare, Hospitality & Residential Projects + 2 paragraphs · 3 images · **h4** Comprehensive Construction & Development Solutions + 2 paragraphs.

**Services:** **h1** Services + paragraph · **h2** Comprehensive Architectural Design Services + paragraph + image (missing on the live site) · **h2** My Expertise · 01.–05. **h3** Architectural Design Services / Space Planning / Remodeling / Office Spaces / Custom Furniture, each with a paragraph · 06. **h3** Need a Custom Work? + [Let's Talk].

**Projects:** **h1** Projects + paragraph · six **h2** projects, each with a description, a 4-item feature list and a carousel (no autoplay): Dattatreya (7 images) · DR Basser (4) · fARROQ saab (3) · Hotel Meridian (1) · Modi Apartment (3) · GUDUVANCHARY (6). Spelling and capitalisation are kept as published (e.g. "fARROQ saab").

**Testimonials:** **h1** Testimonials + paragraph · "CLIENT TESTIMONIALS" → **h2** What Our Clients Say + paragraph · five **h3** testimonial cards with ★★★★★, a quote, the client name and role (Rajesh Kumar, Ahmed Shareef, Priya Reddy, Suresh Patil, Naveen Gupta).

**Contact:** **h1** Contact + paragraph · **h2** Contact Info · **h3** SPAN Design & Development Pvt. Ltd. · Phone / Email · **h4** My Location + address · **h4** Follow Me + 4 social icons · **h4** Send Me a Message + form · Google Map (Bangalore).

**Header (all pages):** logo, site title "span design and development", nav Home · About · Services · Projects · Testimonials · Contact, button "Let's Talk".

**Footer (all pages):** logo · "Contact Details": SPAN Design & Development Pvt. Ltd., Phone: +91 99023 29423, +91 93438 26238, Email: info@spanride.in · "Get In Touch" paragraph · "My Location": Span Pride, I Main, VII Cross, / Central Excise Layout, Sanjaynagar Post, / Hebbal, Bengaluru – 560094 · "Copyright © 2026 span design and development | Powered By span design and development" · 4 social icons.

## 3. Navigation and links

| Element | Original href | New href |
|---|---|---|
| Header nav (6 items) | /, /about/, /services/, /projects/, /testimonials/, /contact/ | index.html, pages/*.html |
| Header "Let's Talk" | `#` | pages/contact.html |
| Home "Read More" | `#` | pages/about.html |
| Home "View All Services" (Services section) | `#` | pages/services.html |
| Home "View All Services" (Projects section)¹ | `#` | pages/services.html |
| Services "Let's Talk" | `#` | pages/contact.html |
| Social icons (all pages) | `#`, empty, or none (About › Instagram) | icon only, until URLs are set in `js/config.js` |
| Phone numbers | plain text | `tel:` links (added) |
| Email | plain text | plain text (domain does not resolve) |
| Map | maps.google.com embed, q=Bangalore | same embed |

¹ The label reads "View All Services" even though it sits in the Projects section. The label is kept as published, and the link follows the label.

## 4. Functional components

| Component | Original behaviour | Recreated behaviour |
|---|---|---|
| Mobile menu | Astra toggle | Slide-in drawer: aria-expanded, focus trap, Esc / backdrop / link closes it |
| Home carousel | 1 per view, arrows + dots, autoplay 5000 ms, pause on hover/interaction, infinite | Same, plus swipe and keyboard arrows. Autoplay only runs while visible and respects reduced-motion |
| Project carousels (6) | 1 per view, arrows + dots, no autoplay, infinite | Same, plus swipe, keyboard arrows and a slide counter. A single-image carousel hides its controls |
| About counters | Elementor counter 0→400 / 0→100, delimiter "," | Same, animated when scrolled into view |
| Contact form | SureForms: Name*, Email*, Subject*, Message. Messages: "This field is required.", "Enter a valid email address.", "There was an error trying to submit your form. Please try again." After submit: hide form | Same fields, placeholders and messages. Submits to `formEndpoint` if set, otherwise opens a mailto: email |
| Google map | iframe | Same iframe |

## 5. Assets

All files below were downloaded from `https://spanpride.in/wp-content/uploads/…`. The originals are kept in `images/originals/` and the pages use optimised JPEG copies (max width 1600 px).

| Local file | Original source (under /wp-content/uploads/) | Used on |
|---|---|---|
| logo.png (trimmed from logo-emblem) | 2026/05/ChatGPT-Image-May-28-2026-11_20_34-AM.png | header, footer, About hero background |
| originals/logo.png | 2026/05/ChatGPT-Image-May-28-2026-11_14_06-AM.png (original header logo, 1536×1024 with a lot of empty margin) | archive |
| favicon.ico, favicon-32.png, favicon-192.png, apple-touch-icon.png | 2026/05/cropped-ChatGPT-Image-May-28-2026-11_20_34-AM-{32,192,180}.png | all pages |
| home/hero-building.jpg | 2026/05/ChatGPT-Image-May-29-2026-11_11_30-PM.png | Home hero |
| home/recent-scene-6-1, -scene-3-4, -render-2, -scene-8-4 | 2026/05/Scene-6_1, Scene-3_4, 2, Scene-8_4 (-scaled.png) | Home carousel |
| home/kitchen-and-dining-area.jpg, white-wooden-cupboards.jpg | 2020/06/ (same names) | Home carousel |
| about/about-scene-8-4, -scene-3-4, -render-2 | elementor/thumbs/… (400×400 crops) | About |
| backgrounds/testimonials-woman-sitting-on-sofa.jpg | 2020/06/woman-sitting-on-sofa-while-working-at-home-4050295.jpg | Testimonials hero (was the hero background originally) |
| projects/dattatreya/* (7) | 2026/06/Scene-6_1, WhatsApp-Image-2026-06-02-at-1.46.40-AM (+-1,-2,-3), Scene-5_3, Scene-4_2 | Projects |
| projects/dr-basser/* (4) | 2026/06/9_5, Scene-1_2, 4_3, Scene-5_3-1 | Projects |
| projects/farroq-saab/* (3) | 2026/06/Scene-4_4, Scene-3_4, Scene-1_4 | Projects |
| projects/hotel-meridian/scene-8-4 | 2026/05/Scene-8_4-scaled.png | Projects |
| projects/modi-apartment/* (3) | 2026/06/WhatsApp-Image-2026-04-27-at-1.44.50-PM (+-2, -1) | Projects |
| projects/guduvanchary/* (6) | 2026/06/5, 4, 3, 2, 1, Scene-11_4 | Projects |

**Missing asset:** `2020/06/gray-dining-table-under-pendant-lamps.jpg` (Services page) returns HTTP 404 on the live site at the original size and at every WordPress size suffix, and it is not in the media library. It was not downloaded and no substitute was used.
