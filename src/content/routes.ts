export type RouteLink = {
  label: string;
  href: string;
};

export type RouteSection = {
  heading: string;
  body: string;
};

export type RouteContent = {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  sections: RouteSection[];
  links: RouteLink[];
};

const routes: RouteContent[] = [
  {
    slug: "request-a-consultation",
    eyebrow: "Start here",
    title: "Request a consultation",
    intro:
      "Choose the path that fits you. New patients can refer themselves, and dental professionals can send a referral directly.",
    image: "/media/interiors/02.jpg",
    sections: [
      {
        heading: "A clear first step",
        body: "Your first visit is a conversation. We will listen to your concerns, assess your smile, and explain the treatment options and timing that make sense.",
      },
    ],
    links: [
      { label: "Dentist referral", href: "/dentist-referral" },
      { label: "Self referral", href: "/self-referral" },
    ],
  },
  {
    slug: "early-orthodontic-treatment",
    eyebrow: "Care for children",
    title: "Early orthodontic treatment",
    intro:
      "Early evaluation helps identify developing concerns and determine whether treatment now, later, or not at all is the right choice.",
    image: "/media/interiors/06.jpg",
    sections: [
      {
        heading: "An ounce of prevention",
        body: "We recommend early treatment only when it is necessary to address pain, prevent a concern from worsening, protect teeth and gums, or support healthy growth.",
      },
      {
        heading: "The right time to begin",
        body: "The Canadian Association of Orthodontists recommends an initial evaluation by age seven. An evaluation does not mean treatment will be required.",
      },
    ],
    links: [{ label: "Request a consultation", href: "/request-a-consultation" }],
  },
  {
    slug: "for-teens",
    eyebrow: "Care for teens",
    title: "Orthodontics for teens",
    intro:
      "Modern choices designed around school, sports, photos, and the confidence that comes with a healthy smile.",
    image: "/media/interiors/07.jpg",
    sections: [
      {
        heading: "How soon is now?",
        body: "Many patients begin between ages 11 and 16, when growth can offer more treatment options. Choices include metal, clear, and white-gold braces plus Invisalign Teen.",
      },
    ],
    links: [{ label: "Request a consultation", href: "/request-a-consultation" }],
  },
  {
    slug: "for-adults",
    eyebrow: "Care for adults",
    title: "Adult orthodontic treatment",
    intro:
      "There is no wrong age to improve the health, comfort, and confidence of your smile.",
    image: "/media/interiors/08.jpg",
    sections: [
      {
        heading: "Designed for adult life",
        body: "Clear aligners, clear braces, and efficient treatment techniques provide discreet options with fewer interruptions to work and family life.",
      },
      {
        heading: "Experience that understands",
        body: "Both Dr. Brian and Dr. Kevin had orthodontic treatment as adults and understand the expectations and concerns adult patients bring.",
      },
    ],
    links: [{ label: "Request a consultation", href: "/request-a-consultation" }],
  },
  {
    slug: "invisalign-info",
    eyebrow: "Clear aligners",
    title: "Invisalign treatment",
    intro:
      "A clear, removable option planned digitally and tailored to the precise movement of your teeth.",
    image: "/media/interiors/03.jpg",
    sections: [
      {
        heading: "Your custom treatment plan",
        body: "Digital scanning creates precise 3D images of your teeth. We then map the planned movements and show you a preview of your new smile.",
      },
      {
        heading: "Progress with purpose",
        body: "Each set of aligners gradually shifts your teeth. Regular checkups let the team monitor progress and make thoughtful adjustments.",
      },
    ],
    links: [{ label: "Request a consultation", href: "/request-a-consultation" }],
  },
  {
    slug: "meet-the-doctors",
    eyebrow: "Two brothers. One practice.",
    title: "Meet Drs. Brian and Kevin Wilk",
    intro:
      "Certified orthodontic specialists who founded Wilk & Wilk in 1997 around shared family values, collaboration, and meticulous care.",
    image: "/media/interiors/section-photo1.jpg",
    sections: [
      {
        heading: "Treat people really well",
        body: "Their focus remains simple: create beautiful, healthy smiles using thoughtful treatment in a warm and professional environment.",
      },
    ],
    links: [{ label: "Request a consultation", href: "/request-a-consultation" }],
  },
  {
    slug: "types-of-braces",
    eyebrow: "Treatment choices",
    title: "Braces and orthodontic options",
    intro:
      "From proven metal braces to aesthetic choices and clear aligners, your plan is selected for your needs, goals, and lifestyle.",
    image: "/media/interiors/04.jpg",
    sections: [
      {
        heading: "One plan, built for you",
        body: "The right appliance depends on your bite, growth, treatment goals, and preferences. We will explain the benefits and tradeoffs of every suitable option.",
      },
    ],
    links: [
      { label: "Explore Invisalign", href: "/invisalign-info" },
      { label: "Request a consultation", href: "/request-a-consultation" },
    ],
  },
  {
    slug: "contact-us",
    eyebrow: "Cambridge, Ontario",
    title: "Contact Wilk & Wilk",
    intro:
      "Visit us at 350 Conestoga Blvd., Unit A, Cambridge, Ontario N1R 7L7.",
    image: "/media/interiors/01.jpg",
    sections: [
      {
        heading: "Let’s talk",
        body: "Call (519) 624-9455 or email cambridgeinfo@wilkandwilk.com. After-hours emergency assistance is available at (519) 716-8866.",
      },
    ],
    links: [
      { label: "Call the office", href: "tel:519-624-9455" },
      {
        label: "Email the office",
        href: "mailto:cambridgeinfo@wilkandwilk.com",
      },
    ],
  },
  {
    slug: "dentist-referral",
    eyebrow: "For dental professionals",
    title: "Dentist referral",
    intro:
      "Refer a patient to Wilk & Wilk Orthodontics and our team will coordinate the next steps with your office.",
    image: "/media/interiors/03.jpg",
    sections: [
      {
        heading: "Send a referral",
        body: "Call our team at (519) 624-9455 or email the patient details and reason for referral to cambridgeinfo@wilkandwilk.com.",
      },
    ],
    links: [
      {
        label: "Email a referral",
        href: "mailto:cambridgeinfo@wilkandwilk.com?subject=Dentist%20Referral",
      },
      { label: "Call the office", href: "tel:519-624-9455" },
    ],
  },
  {
    slug: "self-referral",
    eyebrow: "For new patients",
    title: "Self referral",
    intro:
      "You do not need a dentist’s referral to start a conversation about orthodontic treatment.",
    image: "/media/interiors/02.jpg",
    sections: [
      {
        heading: "Tell us how we can help",
        body: "Call or email the office with your name, contact details, and what you would like to discuss. Our team will help arrange your consultation.",
      },
    ],
    links: [
      {
        label: "Email the office",
        href: "mailto:cambridgeinfo@wilkandwilk.com?subject=Consultation%20Request",
      },
      { label: "Call the office", href: "tel:519-624-9455" },
    ],
  },
];

export function getRouteContent(slug: string) {
  return routes.find((route) => route.slug === slug);
}

export function getRouteSlugs() {
  return routes.map((route) => route.slug);
}
