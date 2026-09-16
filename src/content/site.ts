export type ScrollDevice =
  | "parallax"
  | "kinetic"
  | "rail"
  | "split"
  | "panorama"
  | "iris";

export type ScrollAct = {
  id: string;
  label: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  video?: string;
  mobileVideo?: string;
  device: ScrollDevice;
  span: number;
  peak?: boolean;
};

export const site = {
  name: "Wilk & Wilk Orthodontics",
  description:
    "Certified orthodontic specialists providing braces and Invisalign treatment in Cambridge, Ontario.",
  phone: {
    label: "(519) 624-9455",
    href: "tel:519-624-9455",
  },
  primaryCta: {
    label: "Request a consultation",
    href: "/request-a-consultation",
  },
  address: "350 Conestoga Blvd., Unit A, Cambridge, ON",
} as const;

export const scrollActs: ScrollAct[] = [
  {
    id: "arrival",
    label: "Cambridge, Ontario",
    title: "A place to feel good about your smile.",
    body: "Specialist orthodontic care, shaped around real people and delivered with warmth, precision, and a little fun.",
    image: "/media/interiors/02.jpg",
    imageAlt: "The welcoming reception area at Wilk & Wilk Orthodontics",
    video: "/media/animated/waiting-room-16x9.mp4",
    mobileVideo: "/media/animated/waiting-room-9x16.mp4",
    device: "parallax",
    span: 1.7,
  },
  {
    id: "trust",
    label: "Specialists since 1997",
    title: "Experience you can feel.",
    body: "Drs. Brian and Kevin Wilk recommend the same thoughtful care they would choose for their own families.",
    image: "/media/interiors/04.jpg",
    imageAlt: "The open treatment studio at Wilk & Wilk Orthodontics",
    video: "/media/animated/treatment-studio-16x9.mp4",
    device: "kinetic",
    span: 1.5,
  },
  {
    id: "choice",
    label: "Care at every age",
    title: "Your treatment should fit your life.",
    body: "Early care, braces, and clear aligners for children, teens, and adults. Every plan begins with listening.",
    image: "/media/interiors/05.jpg",
    imageAlt: "A bright treatment room inside the Cambridge practice",
    device: "rail",
    span: 2,
  },
  {
    id: "connection",
    label: "Two brothers. One practice.",
    title: "Built on family values.",
    body: "Brian and Kevin founded Wilk & Wilk to pair specialist skill with a collaborative, personal experience.",
    image: "/media/interiors/section-photo1.jpg",
    imageAlt: "Drs. Brian and Kevin Wilk",
    device: "split",
    span: 1.4,
  },
  {
    id: "proof",
    label: "Step inside",
    title: "Designed around the details.",
    body: "A modern digital practice, an experienced team, and a space made to keep every visit moving comfortably.",
    image: "/media/interiors/03.jpg",
    imageAlt: "A panoramic view through the Wilk & Wilk practice",
    device: "panorama",
    span: 2.8,
    peak: true,
  },
  {
    id: "commitment",
    label: "Your first visit",
    title: "Let’s talk about your smile.",
    body: "Meet the team, ask every question, and leave with a clear understanding of what comes next.",
    image: "/media/interiors/01.jpg",
    imageAlt: "The illuminated Wilk & Wilk Orthodontics office exterior",
    device: "iris",
    span: 1.4,
  },
];

export const treatments = [
  {
    title: "Early care",
    body: "Thoughtful monitoring and treatment when timing can make a meaningful difference.",
    href: "/early-orthodontic-treatment",
    image: "/media/interiors/06.jpg",
  },
  {
    title: "Teen treatment",
    body: "Flexible, modern options designed around school, activities, and growing confidence.",
    href: "/for-teens",
    image: "/media/interiors/07.jpg",
  },
  {
    title: "Adult treatment",
    body: "Discreet choices and specialist planning for a healthy smile at any age.",
    href: "/for-adults",
    image: "/media/interiors/08.jpg",
  },
  {
    title: "Clear aligners",
    body: "Digital planning and Invisalign clear aligners tailored to your smile.",
    href: "/invisalign-info",
    image: "/media/interiors/section-photo3.jpg",
  },
];

export const navLinks = [
  { label: "Our practice", href: "/meet-the-doctors" },
  { label: "Treatments", href: "/types-of-braces" },
  { label: "Contact", href: "/contact-us" },
] as const;
