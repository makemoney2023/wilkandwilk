import Link from "next/link";
import { getPrimaryNav, patientLogin } from "@/content/nav";
import { site } from "@/content/site";

export function SiteFooter({ compact = false }: { compact?: boolean }) {
  const nav = getPrimaryNav();

  return (
    <footer className={compact ? "content-footer" : undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/logo.svg" alt={site.name} width="234" height="70" />
      {compact ? null : (
        <nav className="footer-nav" aria-label="Footer">
          {nav.map((item) => (
            <div key={item.href}>
              <Link href={item.href}>{item.label}</Link>
              {item.children.map((child) => (
                <Link href={child.href} key={child.href}>
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <div>
            <Link href="/sitemap">Site map</Link>
            <Link href={site.primaryCta.href}>Consultation</Link>
            <a href={patientLogin.href} rel="noreferrer">
              {patientLogin.label}
            </a>
          </div>
        </nav>
      )}
      <p>{site.address}</p>
      <p>© {new Date().getFullYear()} Wilk & Wilk Orthodontics</p>
    </footer>
  );
}
