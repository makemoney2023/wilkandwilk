# Wilk & Wilk — project skills

Copied from Strong Foam’s rebuild toolkit (`strongfoam/.cursor/skills`) so this
practice site can follow the same craft + SEO + lead-capture stack.

Wilk & Wilk is still a **scrape pack** (`pages/`, `assets/`, NAP). The Next.js
app has not been scaffolded yet. Use these skills when that rebuild starts.

| Skill | Role |
|-------|------|
| `scroll-craft` | Premium scroll-world grammar, fingerprint gate, GSAP engine |
| `gemini-omni` + `ai-video-gen` | Animate still backgrounds → short loops via Gemini Omni |
| `img2threejs` | Photo → Three.js craft moments |
| `seo-geo-aeo` + `notfair-seo/*` + `schema-markup-generator` | AEO/SEO/GEO + JSON-LD (Dentist / LocalBusiness / FAQPage) |
| `blog-writing` + `content-planner` | Answer-first MDX / content calendar |
| `brand` / `design` / `design-system` / `ui-styling` / `ui-ux-pro-max` | Visual system |
| `natural-human-voice` | Copy tone (practice voice, not industrial) |
| `shadcn-ui` | Component adapter |
| `obsidian-secrets` | Resolve API keys from vault / `.env.local` |
| `marketingskills/*` | Copy, psychology, SEO audit |
| `figma-implement-design` | Figma → code when a file exists |
| `banner-design` / `slides` | Campaign / deck assets if needed |

## Strong Foam pattern to reuse

1. Salvage copy + assets only — do **not** migrate Sesamehub.
2. Next.js App Router + TypeScript + Tailwind + shadcn/ui + Vitest (TDD).
3. Content in `src/content/` (NAP, nav, FAQ, survey). Schema in `src/lib/site-schema.ts`.
4. Home as a chaptered scroll-world (GSAP ScrollTrigger; Three.js only where it earns it).
5. Primary CTA → consultation / estimate route with qualification + booking handoff.
6. `prefers-reduced-motion` fallbacks; never block content behind WebGL.
7. Secrets via `obsidian-secrets` then `.env.local` — never commit keys.

## Bind this project (seo-geo-aeo Step 0)

- **Canonical host:** `https://www.wilkandwilk.com`
- **Primary conversion:** `/request-a-consultation`
- **Entity:** Wilk & Wilk Orthodontics — Cambridge, ON family orthodontic practice
- **NAP:** see `CONTACTS-NAP.md` (350 Conestoga Blvd., Unit A, Cambridge ON N1R 7L7)

## Omni background animation (after Next.js exists)

```bash
# Priority heroes only
node scripts/omni-animate-backgrounds.mjs --priority
```

Requires `GEMINI_API_KEY` in `.env.local` (never commit). Source stills live in
`assets/heroes/` and `assets/interiors/`.
