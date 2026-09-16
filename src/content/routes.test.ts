import { describe, expect, it } from "vitest";
import { navLinks, site, treatments } from "./site";
import { getRouteContent } from "./routes";

describe("homepage destinations", () => {
  it("resolves every internal homepage link to a content page", () => {
    const hrefs = [
      site.primaryCta.href,
      ...navLinks.map((link) => link.href),
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
