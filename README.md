# Wilk & Wilk Orthodontics

Next.js App Router rebuild with a photographic scroll-world homepage. The
original Sesamehub site was used only to recover verified copy and assets.

## Run

```bash
npm install
npm run dev
npm test
npm run build
```

`predev` and `prebuild` synchronize the original interior photography and logo
from `assets/` to `public/media/`, including approved Omni clips.

## Omni interior animation

Three restrained, silent architectural loops are generated from the original
office photos: landscape and portrait waiting-room heroes plus the treatment
studio. Prompts and provenance live in `assets/animated/`.

```bash
npm run omni:interiors
```

The command uses `GEMINI_API_KEY` or `GOOGLE_API_KEY` from `.env.local`, routes
generation through OpenMontage’s video selector, strips audio, and optimizes the
MP4 files for web playback. Existing clips are skipped unless `--force` is
passed. Static photos remain underneath every clip and replace video when the
visitor prefers reduced motion.

## Layout

- `src/app/` — App Router shell, metadata, and homepage
- `src/app/[slug]/` — statically generated treatment, practice, contact, and
  referral destinations
- `src/components/scroll-world.tsx` — GSAP ScrollTrigger experience
- `src/content/site.ts` — verified practice and scroll-act content
- `src/content/routes.ts` — tested content for every homepage destination
- `src/lib/scroll-motion.ts` — tested motion calculations
- `assets/interiors/` — recovered office-tour photography
- `legacy-pages/` — 31 recovered legacy copy documents
- `docs/scroll-world-brief.md` — grammar, journey, feeling curve, and motion score
- `.cursor/skills/` — scroll-craft, SEO/GEO/AEO, brand, and shadcn toolkit

## Scroll world

The homepage uses six distinct scenes: layered arrival, trust assembly, pinned
treatment rail, doctor portrait reveal, spatial office panorama, and an iris
close. A scroll-drawn smile line connects the scenes. Reduced-motion visitors
receive static compositions and a native horizontal treatment rail.

The original 600 px office photographs are deliberately presented as controlled
crops and layered frames. They are not stretched as unsoftened full-screen
detail. See [`docs/scroll-world-brief.md`](docs/scroll-world-brief.md).
