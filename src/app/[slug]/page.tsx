import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getRouteContent,
  getRouteSlugs,
  type RouteLink,
} from "@/content/routes";
import { site } from "@/content/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getRouteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getRouteContent(slug);
  if (!page) return {};

  return {
    title: `${page.title} | Wilk & Wilk Orthodontics`,
    description: page.intro,
    alternates: { canonical: `/${slug}` },
  };
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getRouteContent(slug);
  if (!page) notFound();

  return (
    <main className="content-page">
      <header className="content-header">
        <Link href="/" aria-label="Wilk & Wilk home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/logo.svg" alt="" width="168" height="50" />
        </Link>
        <Button asChild>
          <a href={site.phone.href}>
            <Phone aria-hidden="true" />
            {site.phone.label}
          </a>
        </Button>
      </header>

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
          {page.sections.map((section) => (
            <article key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
        <aside className="content-actions" aria-label="Next steps">
          {page.links.map((link, index) => (
            <RouteButton key={link.href} link={link} primary={index === 0} />
          ))}
        </aside>
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

function RouteButton({
  link,
  primary,
}: {
  link: RouteLink;
  primary: boolean;
}) {
  const isExternalAction =
    link.href.startsWith("mailto:") || link.href.startsWith("tel:");
  const content = (
    <>
      {link.label}
      <ArrowUpRight aria-hidden="true" />
    </>
  );

  return (
    <Button asChild size="lg" variant={primary ? "default" : "outline"}>
      {isExternalAction ? (
        <a href={link.href}>{content}</a>
      ) : (
        <Link href={link.href}>{content}</Link>
      )}
    </Button>
  );
}
