import { describe, expect, it } from "vitest";
import { getPrimaryNav } from "./nav";
import { getRouteContent, getRouteSlugs, type PageGrammar } from "./routes";
import { site, treatments } from "./site";

const publicSlugs = [
  "request-a-consultation",
  "meet-the-doctors",
  "meet-the-team",
  "our-technology",
  "our-community",
  "our-culture",
  "what-sets-us-apart",
  "first-visit",
  "payment-information",
  "patient-forms",
  "office-tour",
  "smile-gallery",
  "early-orthodontic-treatment",
  "for-teens",
  "for-adults",
  "surgical-orthodontics",
  "types-of-braces",
  "types-of-appliances",
  "invisalign-info",
  "wisdom-teeth",
  "patient-instructions",
  "dentist-referral",
  "self-referral",
  "emergency-care",
  "contact-us",
  "sitemap",
] as const;

const experienceSlugs = [
  "meet-the-doctors",
  "meet-the-team",
  "our-technology",
  "our-community",
  "our-culture",
  "what-sets-us-apart",
  "office-tour",
  "types-of-braces",
  "types-of-appliances",
  "invisalign-info",
  "early-orthodontic-treatment",
  "for-teens",
  "for-adults",
  "surgical-orthodontics",
  "smile-gallery",
] as const;

const documentSlugs = [
  "emergency-care",
  "patient-instructions",
  "payment-information",
  "patient-forms",
  "dentist-referral",
  "self-referral",
  "request-a-consultation",
  "contact-us",
  "sitemap",
  "first-visit",
  "wisdom-teeth",
] as const;

describe("homepage destinations", () => {
  it("resolves every internal homepage link to a content page", () => {
    const hrefs = [
      site.primaryCta.href,
      ...getPrimaryNav().map((item) => item.href),
      ...treatments.map((treatment) => treatment.href),
    ];

    for (const href of hrefs) {
      expect(getRouteContent(href.slice(1)), href).toBeDefined();
    }
  });

  it("offers both referral paths from the consultation page", () => {
    const page = getRouteContent("request-a-consultation");
    expect(page?.links.map((link) => link.href)).toEqual([
      "/dentist-referral",
      "/self-referral",
    ]);
  });
});

describe("legacy page inventory", () => {
  it("publishes every recovered public slug", () => {
    expect(getRouteSlugs()).toEqual([...publicSlugs]);
  });

  it("tags each slug as an experience or a document", () => {
    const grammarBySlug = Object.fromEntries(
      getRouteSlugs().map((slug) => [slug, getRouteContent(slug)?.grammar]),
    ) as Record<string, PageGrammar | undefined>;

    for (const slug of experienceSlugs) {
      expect(grammarBySlug[slug], slug).toBe("experience");
      expect(getRouteContent(slug)?.device, slug).toBeDefined();
    }

    for (const slug of documentSlugs) {
      expect(grammarBySlug[slug], slug).toBe("document");
    }
  });

  it("does not repeat a motion device on adjacent experience acts", () => {
    for (const slug of experienceSlugs) {
      const acts = getRouteContent(slug)?.acts ?? [];
      for (let index = 1; index < acts.length; index += 1) {
        expect(acts[index].device, slug).not.toBe(acts[index - 1].device);
      }
    }
  });

  it("restores the smile gallery as a scroll-craft rail of recovered photos", () => {
    const page = getRouteContent("smile-gallery");
    const photos = page?.photos ?? [];

    expect(page?.device).toBe("rail");
    expect(page?.acts?.map((act) => act.device)).toEqual([
      "kinetic",
      "rail",
      "iris",
    ]);
    expect(photos.length).toBeGreaterThanOrEqual(30);
    expect(photos.every((photo) => photo.src.startsWith("/media/smiles/"))).toBe(
      true,
    );
  });
});
