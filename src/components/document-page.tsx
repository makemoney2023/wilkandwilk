import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RouteActions } from "@/components/route-actions";
import { getPrimaryNav } from "@/content/nav";
import type { RouteContent } from "@/content/routes";
import { site } from "@/content/site";

export function DocumentPage({ page }: { page: RouteContent }) {
  return (
    <main className="content-page">
      <section className="content-hero">
        <div className="content-hero-copy">
          <p className="section-label">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
        </div>
        <div className="content-hero-photo">
          <Image
            src={page.image}
            alt=""
            fill
            priority
            sizes="(max-width: 800px) 100vw, 48vw"
          />
        </div>
      </section>

      <section className="content-body">
        <div className="content-sections">
          {page.slug === "sitemap" ? <SitemapIndex /> : null}
          {page.hours ? (
            <article>
              <h2>Office hours</h2>
              <dl className="office-hours">
                {page.hours.map((entry) => (
                  <div key={entry.day}>
                    <dt>{entry.day}</dt>
                    <dd>{entry.time}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ) : null}
          {page.sections.map((section) => (
            <article key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
        <RouteActions links={page.links} />
      </section>

      <footer className="content-footer">
        <Link href="/">
          <ArrowLeft aria-hidden="true" />
          Back to home
        </Link>
        <p>{site.address}</p>
      </footer>
    </main>
  );
}

function SitemapIndex() {
  const nav = getPrimaryNav();

  return (
    <article>
      <h2>All pages</h2>
      <div className="sitemap-grid">
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
      </div>
    </article>
  );
}
