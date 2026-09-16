"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Phone } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { navLinks, scrollActs, site, treatments } from "@/content/site";
import { getRailDistance } from "@/lib/scroll-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const hero = scrollActs[0];
const trust = scrollActs[1];
const connection = scrollActs[3];
const proof = scrollActs[4];
const commitment = scrollActs[5];

export function ScrollWorld() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".hero-photo",
          { scale: 1.04, yPercent: 0 },
          {
            scale: 1.12,
            yPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.7,
            },
          },
        );

        gsap.from(".hero-word", {
          yPercent: 110,
          rotate: 3,
          stagger: 0.08,
          duration: 1.1,
          ease: "power4.out",
        });

        gsap.fromTo(
          ".smile-path",
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.4,
            },
          },
        );

        gsap.utils.toArray<HTMLElement>(".reveal-copy").forEach((element) => {
          gsap.from(element.children, {
            y: 48,
            opacity: 0,
            stagger: 0.09,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 74%",
              once: true,
            },
          });
        });

        const rail = document.querySelector<HTMLElement>(".treatment-rail");
        const railSection =
          document.querySelector<HTMLElement>(".treatments-section");
        if (rail && railSection) {
          const distance = () =>
            getRailDistance(rail.scrollWidth, window.innerWidth);

          gsap.to(rail, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: railSection,
              start: "top top",
              end: () => `+=${Math.max(distance(), window.innerHeight * 1.5)}`,
              pin: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }

        gsap.fromTo(
          ".doctor-photo",
          { clipPath: "inset(14% 18% 14% 18%)", scale: 1.1 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".doctors-section",
              start: "top 85%",
              end: "bottom 40%",
              scrub: 0.7,
            },
          },
        );

        gsap.utils.toArray<HTMLElement>(".panorama-tile").forEach(
          (tile, index) => {
            gsap.fromTo(
              tile,
              {
                yPercent: index % 2 === 0 ? 14 : -12,
                rotate: index % 2 === 0 ? -1.5 : 1.5,
              },
              {
                yPercent: index % 2 === 0 ? -10 : 8,
                rotate: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: ".panorama-section",
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.8,
                },
              },
            );
          },
        );

        gsap.fromTo(
          ".close-photo",
          { clipPath: "circle(20% at 50% 50%)", scale: 1.12 },
          {
            clipPath: "circle(75% at 50% 50%)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".close-section",
              start: "top 85%",
              end: "top 10%",
              scrub: 0.8,
            },
          },
        );
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".hero-photo, .hero-word, .reveal-copy > *, .doctor-photo, .panorama-tile, .close-photo",
          { clearProps: "all" },
        );
      });

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <main ref={root} className="scroll-world">
      <Header />
      <svg
        className="smile-line"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="smile-path"
          pathLength="1"
          d="M 6 9 C 80 14, 15 31, 88 39 S 18 61, 92 70 S 30 89, 68 94"
        />
      </svg>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-sticky">
          <Image
            className="hero-photo hero-poster"
            src={hero.image}
            alt={hero.imageAlt}
            fill
            priority
            sizes="100vw"
          />
          {hero.video ? (
            <video
              className="hero-photo hero-video scene-video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={hero.image}
              aria-hidden="true"
            >
              {hero.mobileVideo ? (
                <source
                  src={hero.mobileVideo}
                  type="video/mp4"
                  media="(max-width: 800px)"
                />
              ) : null}
              <source src={hero.video} type="video/mp4" />
            </video>
          ) : null}
          <div className="hero-scrim" />
          <div className="hero-copy">
            <p className="section-label">{hero.label}</p>
            <h1 id="hero-title" aria-label={hero.title}>
              <span className="word-mask">
                <span className="hero-word">A place to feel</span>
              </span>
              <span className="word-mask">
                <span className="hero-word hero-word-accent">
                  good about your smile.
                </span>
              </span>
            </h1>
            <p className="hero-intro">{hero.body}</p>
            <Button asChild size="lg">
              <Link href={site.primaryCta.href}>
                {site.primaryCta.label}
                <ArrowDownRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <p className="hero-address">{site.address}</p>
        </div>
      </section>

      <section className="trust-section" aria-labelledby="trust-title">
        <div className="trust-photo">
          <Image
            src={trust.image}
            alt={trust.imageAlt}
            fill
            sizes="(max-width: 800px) 100vw, 52vw"
          />
          {trust.video ? (
            <video
              className="trust-video scene-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={trust.image}
              aria-hidden="true"
            >
              <source src={trust.video} type="video/mp4" />
            </video>
          ) : null}
        </div>
        <div className="trust-copy reveal-copy">
          <p className="section-label">{trust.label}</p>
          <h2 id="trust-title">{trust.title}</h2>
          <p>{trust.body}</p>
          <div className="trust-note">
            <strong>Certified specialists</strong>
            <span>Fellows of the Royal College of Dentists of Canada</span>
          </div>
        </div>
      </section>

      <section className="treatments-section" aria-labelledby="treatments-title">
        <div className="rail-heading">
          <p className="section-label">Care at every age</p>
          <h2 id="treatments-title">Treatment that moves with you.</h2>
        </div>
        <div className="treatment-rail">
          {treatments.map((treatment, index) => (
            <article className="treatment-card" key={treatment.title}>
              <Image
                src={treatment.image}
                alt=""
                fill
                sizes="(max-width: 700px) 84vw, 42vw"
              />
              <div className="card-scrim" />
              <span className="card-index">0{index + 1}</span>
              <div className="card-copy">
                <h3>{treatment.title}</h3>
                <p>{treatment.body}</p>
                <Link href={treatment.href}>
                  Explore treatment <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="doctors-section" aria-labelledby="doctors-title">
        <div className="doctor-photo">
          <Image
            src={connection.image}
            alt={connection.imageAlt}
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
        <div className="doctor-copy reveal-copy">
          <p className="section-label">{connection.label}</p>
          <h2 id="doctors-title">{connection.title}</h2>
          <p>{connection.body}</p>
          <blockquote>
            “Treat people really well while creating beautiful, healthy smiles.”
          </blockquote>
          <Link className="text-link" href="/meet-the-doctors">
            Meet Drs. Brian and Kevin
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="panorama-section" aria-labelledby="panorama-title">
        <div className="panorama-copy reveal-copy">
          <p className="section-label">{proof.label}</p>
          <h2 id="panorama-title">{proof.title}</h2>
          <p>{proof.body}</p>
        </div>
        <div className="panorama-grid" aria-label="A tour through the practice">
          <PhotoTile src="/media/interiors/03.jpg" alt="Practice corridor" />
          <PhotoTile src="/media/interiors/section-photo2.jpg" alt="Orthodontic care detail" />
          <PhotoTile src="/media/interiors/04.jpg" alt="Open treatment studio" />
          <PhotoTile src="/media/interiors/section-photo4.jpg" alt="A confident smile" />
        </div>
        <p className="panorama-caption">
          A practice designed for focus, flow, and a more comfortable visit.
        </p>
      </section>

      <section className="close-section" aria-labelledby="close-title">
        <div className="close-photo">
          <Image
            src={commitment.image}
            alt={commitment.imageAlt}
            fill
            sizes="100vw"
          />
          <div className="close-scrim" />
        </div>
        <div className="close-copy reveal-copy">
          <p className="section-label">{commitment.label}</p>
          <h2 id="close-title">{commitment.title}</h2>
          <p>{commitment.body}</p>
          <div className="close-actions">
            <Button asChild size="lg">
              <Link href={site.primaryCta.href}>
                {site.primaryCta.label}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={site.phone.href}>
                <Phone aria-hidden="true" />
                {site.phone.label}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <footer>
        {/* SVG is served directly to preserve the original brand artwork. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/logo.svg" alt={site.name} width="234" height="70" />
        <p>{site.address}</p>
        <p>© {new Date().getFullYear()} Wilk & Wilk Orthodontics</p>
      </footer>
    </main>
  );
}

function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Wilk & Wilk home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/logo.svg" alt="" width="168" height="50" />
      </Link>
      <nav aria-label="Primary navigation">
        {navLinks.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <Button asChild>
        <Link href={site.primaryCta.href}>Consultation</Link>
      </Button>
    </header>
  );
}

function PhotoTile({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="panorama-tile">
      <Image src={src} alt={alt} fill sizes="(max-width: 700px) 82vw, 35vw" />
    </figure>
  );
}
