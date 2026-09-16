"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { RouteActions } from "@/components/route-actions";
import type { RouteAct, RouteContent } from "@/content/routes";
import { getRailDistance } from "@/lib/scroll-motion";
import { site } from "@/content/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ExperiencePage({ page }: { page: RouteContent }) {
  const root = useRef<HTMLElement>(null);
  const acts = page.acts?.length
    ? page.acts
    : [
        {
          device: page.device ?? "kinetic",
          heading: page.title,
          body: page.intro,
          image: page.image,
        } satisfies RouteAct,
      ];

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".chapter-photo").forEach((element) => {
          gsap.fromTo(
            element,
            { scale: 1.04 },
            {
              scale: 1.1,
              ease: "none",
              scrollTrigger: {
                trigger: element.closest("section"),
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>(".reveal-copy").forEach((element) => {
          gsap.from(element.children, {
            y: 36,
            opacity: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 78%",
              once: true,
            },
          });
        });

        const rail = document.querySelector<HTMLElement>(".smile-rail");
        const railSection = document.querySelector<HTMLElement>(
          ".smile-rail-section",
        );
        if (rail && railSection) {
          const distance = () =>
            getRailDistance(rail.scrollWidth, window.innerWidth);

          gsap.to(rail, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: railSection,
              start: "top top",
              end: () => `+=${Math.max(distance(), window.innerHeight * 2)}`,
              pin: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }

        gsap.fromTo(
          ".smile-close-photo",
          { clipPath: "circle(18% at 50% 50%)", scale: 1.12 },
          {
            clipPath: "circle(78% at 50% 50%)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".smile-close",
              start: "top 85%",
              end: "top 12%",
              scrub: 0.8,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <main className="chapter-page" ref={root}>
      {acts.map((act, index) => (
        <ChapterAct
          key={`${act.heading}-${act.device}`}
          act={act}
          eyebrow={index === 0 ? page.eyebrow : "Continue"}
          title={index === 0 ? page.title : act.heading}
          intro={index === 0 ? page.intro : act.body}
          photos={act.device === "rail" ? page.photos : undefined}
          last={index === acts.length - 1}
        />
      ))}

      {page.sections.length ? (
        <section className="content-body chapter-body">
          <div className="content-sections">
            {page.sections.map((section) => (
              <article key={section.heading} className="reveal-copy">
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </article>
            ))}
          </div>
          <RouteActions links={page.links} />
        </section>
      ) : (
        <section className="content-body chapter-body">
          <RouteActions links={page.links} />
        </section>
      )}

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

function ChapterAct({
  act,
  eyebrow,
  title,
  intro,
  photos,
  last,
}: {
  act: RouteAct;
  eyebrow: string;
  title: string;
  intro: string;
  photos?: RouteContent["photos"];
  last: boolean;
}) {
  if (act.device === "rail" && photos?.length) {
    return (
      <section
        className="treatments-section smile-rail-section chapter-act"
        aria-labelledby={`${slugify(title)}-title`}
      >
        <div className="rail-heading reveal-copy">
          <p className="section-label">{eyebrow}</p>
          <h2 id={`${slugify(title)}-title`}>{title}</h2>
          <p>{intro}</p>
        </div>
        <div className="treatment-rail smile-rail">
          {photos.map((photo, index) => (
            <article className="treatment-card smile-card" key={photo.src}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 700px) 78vw, 28vw"
              />
              <div className="card-scrim" />
              <span className="card-index">
                {String(index + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (act.device === "panorama" || (photos?.length && act.device !== "rail")) {
    return (
      <section
        className="panorama-section chapter-act"
        aria-labelledby={`${slugify(title)}-title`}
      >
        <div className="panorama-copy reveal-copy">
          <p className="section-label">{eyebrow}</p>
          <h2 id={`${slugify(title)}-title`}>{title}</h2>
          <p>{intro}</p>
        </div>
        <div className="panorama-grid" aria-label={title}>
          {(photos ?? [{ src: act.image, alt: title }])
            .slice(0, 4)
            .map((photo) => (
              <figure className="panorama-tile" key={photo.src}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 700px) 82vw, 35vw"
                />
              </figure>
            ))}
        </div>
      </section>
    );
  }

  if (act.device === "rail") {
    return (
      <section
        className="treatments-section chapter-act"
        aria-labelledby={`${slugify(title)}-title`}
      >
        <div className="rail-heading reveal-copy">
          <p className="section-label">{eyebrow}</p>
          <h2 id={`${slugify(title)}-title`}>{title}</h2>
          <p>{intro}</p>
        </div>
        <div className="treatment-rail chapter-rail">
          <article className="treatment-card">
            <Image src={act.image} alt="" fill sizes="(max-width: 700px) 84vw, 42vw" />
            <div className="card-scrim" />
            <div className="card-copy">
              <h3>{act.heading}</h3>
              <p>{act.body}</p>
            </div>
          </article>
        </div>
      </section>
    );
  }

  if (act.device === "iris" || last) {
    return (
      <section
        className="close-section smile-close chapter-act"
        aria-labelledby={`${slugify(title)}-title`}
      >
        <div className="close-photo smile-close-photo">
          <Image src={act.image} alt="" fill sizes="100vw" />
          <div className="close-scrim" />
        </div>
        <div className="close-copy reveal-copy">
          <p className="section-label">{eyebrow}</p>
          <h2 id={`${slugify(title)}-title`}>{title}</h2>
          <p>{intro}</p>
        </div>
      </section>
    );
  }

  const inverted = act.device === "split";

  return (
    <section
      className={`trust-section chapter-act${inverted ? " chapter-act-split" : ""}`}
      aria-labelledby={`${slugify(title)}-title`}
    >
      <div className="trust-photo">
        <Image
          className="chapter-photo"
          src={act.image}
          alt=""
          fill
          sizes="(max-width: 800px) 100vw, 52vw"
        />
      </div>
      <div className="trust-copy reveal-copy">
        <p className="section-label">{eyebrow}</p>
        <h2 id={`${slugify(title)}-title`}>{title}</h2>
        <p>{intro}</p>
      </div>
    </section>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
