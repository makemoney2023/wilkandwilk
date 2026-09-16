# Final scrape report — wilkandwilk.com

**When:** Wednesday Sep 16, 2026 (America/Toronto)  
**Output root:** `/workspace/wilkandwilk/`  
**Canonical:** https://www.wilkandwilk.com/

## Counts
- **Public HTML pages captured:** 31 raw HTML → 31 markdown copy files (404 blog tag/category snapshots removed)
- **Images downloaded:** 98 ({'brand': 3, 'interiors': 12, 'staff': 6, 'other': 73, 'heroes': 4})
- **Total package size:** ~8.0M on disk

## Deliverables
| File / folder | Purpose |
|---------------|---------|
| `SITE-MAP.md` | Full URL inventory + header/footer nav hierarchy |
| `COPY.md` | Aggregated clean copy |
| `legacy-pages/*.md` | Per-page copy (title, meta, headings, body, CTAs) |
| `CONTACTS-NAP.md` | Phone, email, address, hours, social, portal, forms |
| `ASSETS-MANIFEST.md` | Every image: path, dims, bytes, source URL, suggested use |
| `assets/brand/` | logo.png, logo.svg, favicon.png |
| `assets/staff/` | Doctors duo + team photos (6) |
| `assets/interiors/` | Office tour 01–08 + section photos (12) |
| `assets/heroes/` | Homepage slideshow slide1–4 |
| `assets/exteriors/` | Empty (none found on site) |
| `assets/other/` | Smile gallery, page heroes, treatment graphics, maps (73) |
| `raw/` | HTML snapshots + local.css |

## NAP summary
- **Name:** Wilk & Wilk Orthodontics
- **Address:** 350 Conestoga Blvd., Unit A, Cambridge, ON N1R 7L7
- **Phone:** (519) 624-9455
- **After-hours emergency:** (519) 716-8866
- **Email:** cambridgeinfo@wilkandwilk.com
- **Hours:** Mon/Wed 8–4; Tue/Thu 7:30–3:30; Fri 8–12 admin only
- **Social:** Facebook, Instagram, YouTube (+ Google Maps link)

## Tech (rebuild context)
Sesamehub / Sesame Communications dental CMS — salvage copy & assets only; do not migrate platform.

## Blockers / gaps
- Blog tag & category URLs → 404
- `/meet-dr-kevin-wilk` → 404 (joint doctors page + `/meet-dr-brian-wilk` only)
- No dedicated exterior building photos (footer map images only)
- TLS: scraper used insecure curl (`-k`) due to incomplete CA chain on box; site content OK
- Email obfuscated in HTML (recovered from title/rel)
- Smile gallery / many assets are mid-resolution (e.g. tour 600×450); full originals may live only in practice archives

## Success criteria check
- [x] SITE-MAP lists every public page found (sitemap.xml + crawl extras)
- [x] Copy covers home + all major sections
- [x] Logos + staff + interior photos present
- [x] Manifest complete with counts
- [x] No Mac Desktop folder created (box only)
