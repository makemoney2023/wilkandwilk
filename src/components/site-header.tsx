import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPrimaryNav, patientLogin } from "@/content/nav";
import { site } from "@/content/site";

export function SiteHeader() {
  const nav = getPrimaryNav();

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Wilk & Wilk home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/logo.svg" alt="" width="168" height="50" />
      </Link>
      <nav className="site-nav" aria-label="Primary navigation">
        {nav.map((item) => (
          <div className="nav-item" key={item.href}>
            <Link href={item.href}>{item.label}</Link>
            <div className="nav-panel" role="group" aria-label={item.label}>
              {item.children.map((child) => (
                <Link href={child.href} key={child.href}>
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="site-actions">
        <a className="patient-login" href={patientLogin.href} rel="noreferrer">
          {patientLogin.label}
        </a>
        <Button asChild>
          <Link href={site.primaryCta.href}>Consultation</Link>
        </Button>
      </div>
      <details className="site-menu">
        <summary aria-label="Open navigation">
          <Menu aria-hidden="true" />
        </summary>
        <nav aria-label="Mobile navigation">
          {nav.map((item) => (
            <div className="menu-group" key={`mobile-${item.href}`}>
              <Link className="menu-parent" href={item.href}>
                {item.label}
              </Link>
              {item.children.map((child) => (
                <Link href={child.href} key={`mobile-${child.href}`}>
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <a href={patientLogin.href} rel="noreferrer">
            {patientLogin.label}
          </a>
          <Link href={site.primaryCta.href}>Consultation</Link>
        </nav>
      </details>
    </header>
  );
}
