import { describe, expect, it } from "vitest";
import { getPrimaryNav, getRouteAliases, patientLogin } from "./nav";
import { getRouteContent } from "./routes";
import { getSiteHeaderLinks, site } from "./site";

describe("primary navigation", () => {
  it("restores the original parent labels and consultation CTA", () => {
    expect(getPrimaryNav().map((item) => item.label)).toEqual([
      "Welcome",
      "New Patients",
      "Treatments",
      "Referrals",
      "Contact",
    ]);

    expect(getSiteHeaderLinks()).toEqual([
      { label: "Welcome", href: "/meet-the-doctors" },
      { label: "New Patients", href: "/what-sets-us-apart" },
      { label: "Treatments", href: "/early-orthodontic-treatment" },
      { label: "Referrals", href: "/dentist-referral" },
      { label: "Contact", href: "/contact-us" },
      { label: "Consultation", href: site.primaryCta.href },
    ]);
  });

  it("resolves every dropdown child to a content page", () => {
    for (const item of getPrimaryNav()) {
      expect(getRouteContent(item.href.slice(1)), item.href).toBeDefined();

      for (const child of item.children) {
        expect(getRouteContent(child.href.slice(1)), child.href).toBeDefined();
      }
    }
  });

  it("keeps patient login as an external utility", () => {
    expect(patientLogin.href).toBe(
      "https://patient.sesamecommunications.com/wilkcambridge/index.html",
    );
  });

  it("lists SEO aliases instead of duplicating copy", () => {
    expect(getRouteAliases()).toEqual([
      { source: "/home", destination: "/" },
      { source: "/meet-dr-brian-wilk", destination: "/meet-the-doctors" },
      { source: "/cambridge-office", destination: "/contact-us" },
    ]);
  });
});
