export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
  children: NavChild[];
};

export type RouteAlias = {
  source: string;
  destination: string;
};

export const patientLogin = {
  label: "Patient Login",
  href: "https://patient.sesamecommunications.com/wilkcambridge/index.html",
} as const;

const primaryNav: NavItem[] = [
  {
    label: "Welcome",
    href: "/meet-the-doctors",
    children: [
      { label: "Meet the doctors", href: "/meet-the-doctors" },
      { label: "Meet the team", href: "/meet-the-team" },
      { label: "Our technology", href: "/our-technology" },
      { label: "Our community", href: "/our-community" },
      { label: "Our culture", href: "/our-culture" },
    ],
  },
  {
    label: "New Patients",
    href: "/what-sets-us-apart",
    children: [
      { label: "What sets us apart", href: "/what-sets-us-apart" },
      { label: "First visit", href: "/first-visit" },
      { label: "Payment information", href: "/payment-information" },
      { label: "Patient forms", href: "/patient-forms" },
      { label: "Office tour", href: "/office-tour" },
      { label: "Smile gallery", href: "/smile-gallery" },
    ],
  },
  {
    label: "Treatments",
    href: "/early-orthodontic-treatment",
    children: [
      { label: "Early orthodontic treatment", href: "/early-orthodontic-treatment" },
      { label: "For teens", href: "/for-teens" },
      { label: "For adults", href: "/for-adults" },
      { label: "Surgical orthodontics", href: "/surgical-orthodontics" },
      { label: "Types of braces", href: "/types-of-braces" },
      { label: "Types of appliances", href: "/types-of-appliances" },
      { label: "Invisalign info", href: "/invisalign-info" },
      { label: "Wisdom teeth", href: "/wisdom-teeth" },
      { label: "Patient instructions", href: "/patient-instructions" },
    ],
  },
  {
    label: "Referrals",
    href: "/dentist-referral",
    children: [
      { label: "Dentist referral", href: "/dentist-referral" },
      { label: "Self referral", href: "/self-referral" },
    ],
  },
  {
    label: "Contact",
    href: "/contact-us",
    children: [
      { label: "Contact us", href: "/contact-us" },
      { label: "Emergency care", href: "/emergency-care" },
    ],
  },
];

const routeAliases: RouteAlias[] = [
  { source: "/home", destination: "/" },
  { source: "/meet-dr-brian-wilk", destination: "/meet-the-doctors" },
  { source: "/cambridge-office", destination: "/contact-us" },
];

export function getPrimaryNav() {
  return primaryNav;
}

export function getRouteAliases() {
  return routeAliases;
}
