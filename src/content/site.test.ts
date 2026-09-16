import { describe, expect, it } from "vitest";
import { getSiteHeaderLinks, scrollActs, site } from "./site";

describe("Wilk & Wilk scroll-world content", () => {
  it("builds a six-act journey with a single dominant peak", () => {
    expect(scrollActs).toHaveLength(6);

    const peak = scrollActs.filter((act) => act.peak);
    expect(peak).toHaveLength(1);
    expect(peak[0].span).toBe(Math.max(...scrollActs.map((act) => act.span)));
  });

  it("does not repeat the same motion device in adjacent acts", () => {
    for (let index = 1; index < scrollActs.length; index += 1) {
      expect(scrollActs[index].device).not.toBe(scrollActs[index - 1].device);
    }
  });

  it("uses only recovered interior photography in the scroll acts", () => {
    for (const act of scrollActs) {
      expect(act.image).toMatch(/^\/media\/interiors\//);
    }
  });

  it("keeps the verified consultation and contact destinations", () => {
    expect(site.primaryCta.href).toBe("/request-a-consultation");
    expect(site.phone.href).toBe("tel:519-624-9455");
  });

  it("keeps the original primary navigation on every page", () => {
    expect(getSiteHeaderLinks().map((link) => link.label)).toEqual([
      "Welcome",
      "New Patients",
      "Treatments",
      "Referrals",
      "Contact",
      "Consultation",
    ]);
  });

  it("assigns responsive Omni clips only to scenes with static fallbacks", () => {
    const animatedActs = scrollActs.filter((act) => act.video);
    expect(animatedActs.map((act) => act.id)).toEqual(["arrival", "trust"]);

    for (const act of animatedActs) {
      expect(act.image).toMatch(/^\/media\/interiors\//);
      expect(act.video).toMatch(/^\/media\/animated\/.+\.mp4$/);
    }

    expect(scrollActs[0].mobileVideo).toBe(
      "/media/animated/waiting-room-9x16.mp4",
    );
  });
});
