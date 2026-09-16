import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentPage } from "@/components/document-page";
import { ExperiencePage } from "@/components/experience-page";
import { getRouteContent, getRouteSlugs } from "@/content/routes";

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

  if (page.grammar === "experience") {
    return <ExperiencePage page={page} />;
  }

  return <DocumentPage page={page} />;
}
