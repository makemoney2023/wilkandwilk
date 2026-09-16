import type { ScrollDevice } from "./site";
import { getSmileGalleryPhotos } from "./smiles";

export type PageGrammar = "experience" | "document";

export type RouteLink = {
  label: string;
  href: string;
};

export type RouteSection = {
  heading: string;
  body: string;
};

export type RouteAct = {
  device: ScrollDevice;
  heading: string;
  body: string;
  image: string;
};

export type RoutePhoto = {
  src: string;
  alt: string;
};

export type OfficeHour = {
  day: string;
  time: string;
};

export type RouteContent = {
  slug: string;
  grammar: PageGrammar;
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  device?: ScrollDevice;
  acts?: RouteAct[];
  photos?: RoutePhoto[];
  hours?: OfficeHour[];
  mapHref?: string;
  sections: RouteSection[];
  links: RouteLink[];
};

const consult = { label: "Request a consultation", href: "/request-a-consultation" };

const routes: RouteContent[] = [
  {
    slug: "request-a-consultation",
    grammar: "document",
    eyebrow: "Start here",
    title: "Request a consultation",
    intro:
      "Choose the path that fits you. New patients can refer themselves, and dental professionals can send a referral directly.",
    image: "/media/interiors/02.jpg",
    sections: [
      {
        heading: "A clear first step",
        body: "A successful practice is the result of a strong commitment to excellence and the relationships we build with patients and colleagues. We appreciate the confidence you place in us.",
      },
    ],
    links: [
      { label: "Dentist referral", href: "/dentist-referral" },
      { label: "Self referral", href: "/self-referral" },
    ],
  },
  {
    slug: "meet-the-doctors",
    grammar: "experience",
    eyebrow: "Two brothers. One practice.",
    title: "Meet Drs. Brian and Kevin Wilk",
    intro:
      "Certified orthodontic specialists who founded Wilk & Wilk in 1997 around shared family values, collaboration, and meticulous care.",
    image: "/media/interiors/section-photo1.jpg",
    device: "split",
    acts: [
      {
        device: "split",
        heading: "Meet Drs. Brian and Kevin Wilk",
        body: "Our long journey to become certified specialists began early. After Ontario universities, we each traveled to Boston and graduated from Tufts University School of Dental Medicine, then completed different postgraduate specialty programs a year apart.",
        image: "/media/interiors/section-photo1.jpg",
      },
      {
        device: "kinetic",
        heading: "Treat people really well",
        body: "We founded Wilk & Wilk in 1997 after returning to Canada. Over 25 years and thousands of smiles later, our focus remains the same: create beautiful, healthy smiles using thoughtful treatment in a warm and professional environment.",
        image: "/media/interiors/04.jpg",
      },
    ],
    sections: [
      {
        heading: "Thank you",
        body: "We are proud that our Cambridge office continues to grow by positive word-of-mouth referrals. For the care families continue to entrust us with, we would simply like to say thank you.",
      },
    ],
    links: [consult],
  },
  {
    slug: "meet-the-team",
    grammar: "experience",
    eyebrow: "Our people",
    title: "Meet the team",
    intro:
      "Ever since Wilk & Wilk opened in 1997, Drs. Brian and Kevin have known that the secret is our people.",
    image: "/media/interiors/05.jpg",
    device: "kinetic",
    acts: [
      {
        device: "kinetic",
        heading: "A talent for finding talented people",
        body: "The doctors have surrounded themselves with a professional, passionate, curious, and caring team. Many staff members are former patients, so they understand what it takes to create a wonderful visit.",
        image: "/media/interiors/05.jpg",
      },
      {
        device: "iris",
        heading: "Looking forward to meeting you",
        body: "Each member of the team has years of experience across metal and clear braces, Invisalign, Invisalign Teen, and surgical orthodontic treatment, and stays current through continuing education.",
        image: "/media/interiors/03.jpg",
      },
    ],
    sections: [],
    links: [consult],
  },
  {
    slug: "our-technology",
    grammar: "experience",
    eyebrow: "A digital practice",
    title: "Our technology",
    intro:
      "Digital scanning, lower-dose X-rays, and Public Health Ontario sterilization standards keep visits precise and comfortable.",
    image: "/media/interiors/03.jpg",
    device: "kinetic",
    acts: [
      {
        device: "kinetic",
        heading: "Sterilization you can trust",
        body: "Our instrument system follows Public Health Ontario PIDAC guidelines, with dedicated sterilization rooms, FDA-cleared autoclaves, daily biological monitoring, and staff certified in community reprocessing.",
        image: "/media/interiors/03.jpg",
      },
      {
        device: "rail",
        heading: "Tools that keep care moving",
        body: "Digital dental X-rays reduce radiation exposure by as much as 80–90 percent. iTero Element scanners replace messy impressions. Computers keep the office on time and patients informed.",
        image: "/media/interiors/04.jpg",
      },
    ],
    sections: [
      {
        heading: "Aligners, TADs, and 3D planning",
        body: "We use Invisalign and Angel aligner systems, Propel vibration to support comfort, CBCT scans when a case needs more than 2D imaging, and temporary anchorage devices placed in office when they can avoid surgery.",
      },
    ],
    links: [consult],
  },
  {
    slug: "our-community",
    grammar: "experience",
    eyebrow: "Cambridge",
    title: "Our community",
    intro:
      "We are grateful to treat people in the community where we live and work, and we give back to the organizations that matter to our patients and staff.",
    image: "/media/interiors/01.jpg",
    device: "split",
    acts: [
      {
        device: "split",
        heading: "A commitment to giving back",
        body: "We support local sport, school, hospital, and shelter organizations so the practice stays connected to Cambridge beyond the treatment chair.",
        image: "/media/interiors/01.jpg",
      },
      {
        device: "iris",
        heading: "Local teams and schools",
        body: "Among the groups we proudly support are Cambridge Winterhawks, Preston Figure Skating Club, Cambridge Memorial Hospital Foundation, Bridges Shelter, Rotary Club of Cambridge Sunrise, and the Cambridge Self-Help Food Bank.",
        image: "/media/interiors/08.jpg",
      },
    ],
    sections: [],
    links: [{ label: "Visit the office", href: "/contact-us" }],
  },
  {
    slug: "our-culture",
    grammar: "experience",
    eyebrow: "How we work",
    title: "Our culture",
    intro:
      "Exceptional orthodontic care, delivered professionally and enthusiastically while we engage and educate our patients.",
    image: "/media/interiors/06.jpg",
    device: "iris",
    acts: [
      {
        device: "iris",
        heading: "Our mission",
        body: "We focus our collective talents on exceptional orthodontic care in a professional and enthusiastic manner while engaging and educating our patients.",
        image: "/media/interiors/06.jpg",
      },
      {
        device: "split",
        heading: "Vision and values",
        body: "We aspire to become a leading authority in orthodontic care, one patient at a time. Our values are honesty, authenticity, integrity, and responsibility.",
        image: "/media/interiors/section-photo1.jpg",
      },
    ],
    sections: [],
    links: [{ label: "Meet the team", href: "/meet-the-team" }],
  },
  {
    slug: "what-sets-us-apart",
    grammar: "experience",
    eyebrow: "New patients",
    title: "What sets us apart",
    intro:
      "Great experience leads to great results. Since 1997, virtually every imaginable orthodontic problem has been encountered and corrected with attention to detail.",
    image: "/media/interiors/02.jpg",
    device: "rail",
    acts: [
      {
        device: "rail",
        heading: "Certified specialists",
        body: "Dr. Brian Wilk and Dr. Kevin Wilk are certified specialists and Fellows of the Royal College of Dentists of Canada. We only recommend treatment we would provide for our own families.",
        image: "/media/interiors/02.jpg",
      },
      {
        device: "kinetic",
        heading: "Fair, transparent fees",
        body: "Convenient 0% financing is available. The professional fee includes consultations, records, X-rays, and comfort visits in our office. There are no extra fees for those visits.",
        image: "/media/interiors/04.jpg",
      },
    ],
    sections: [
      {
        heading: "Word of mouth is the most important social media",
        body: "We sleep well at night because we recommend treatment when you need it, and do not recommend it when you do not. Trust is our most prized asset.",
      },
    ],
    links: [
      { label: "Smile gallery", href: "/smile-gallery" },
      consult,
    ],
  },
  {
    slug: "first-visit",
    grammar: "document",
    eyebrow: "New patients",
    title: "First visit",
    intro:
      "Transforming your smile starts with a conversation. The first appointment is about 60 minutes.",
    image: "/media/interiors/02.jpg",
    sections: [
      {
        heading: "What happens at this visit",
        body: "We take a preliminary digital X-ray and photos, then you meet Drs. Wilk and a treatment coordinator. We listen, discuss any orthodontic issues, explore options, and plan.",
      },
      {
        heading: "Three possible outcomes",
        body: "No treatment is needed. Treatment is needed, but not at this time. Or treatment is needed now. If later is better, we schedule a future visit so growth and eruption can occur first.",
      },
      {
        heading: "After the first visit",
        body: "If you are ready to begin, we schedule records: digital orthodontic X-rays, an intraoral 3D scan, and a bite registration. Treatment may begin the same day or after a second planning visit.",
      },
    ],
    links: [consult],
  },
  {
    slug: "payment-information",
    grammar: "document",
    eyebrow: "New patients",
    title: "Payment information",
    intro:
      "We never want finances to be an obstacle to a healthy smile. A treatment plan, fee, and payment options are presented after the examination.",
    image: "/media/interiors/08.jpg",
    sections: [
      {
        heading: "What your investment includes",
        body: "The fee covers diagnostic records, orthodontic X-rays, 3D scans, appliances, braces, lab costs, regular and emergency visits, the initial retainers, and monitoring after active treatment. Work done in other dental offices is not included.",
      },
      {
        heading: "0% payment plans",
        body: "Interest-free plans typically begin with a flexible initial payment of up to 25 percent, with the balance in equal monthly payments. We accept direct debit, Visa, Mastercard, American Express, certified cheques, and e-transfer.",
      },
      {
        heading: "Insurance and tax receipts",
        body: "We complete a Standard Orthodontic Predetermination Form. Benefits are usually paid over the duration of treatment. We bill the patient directly and provide receipts for reimbursement and income-tax health expenses.",
      },
    ],
    links: [consult],
  },
  {
    slug: "patient-forms",
    grammar: "document",
    eyebrow: "Before you arrive",
    title: "Patient forms",
    intro:
      "Please take a minute to fill out and submit the appropriate patient information form before your first appointment.",
    image: "/media/interiors/07.jpg",
    sections: [
      {
        heading: "Choose the form that fits",
        body: "Adults and children have separate medical history forms. Completing them ahead of time keeps the first visit focused on conversation and planning.",
      },
    ],
    links: [
      {
        label: "Adult medical history form",
        href: "https://form.jotform.com/213145086942052",
      },
      {
        label: "Child medical history form",
        href: "https://form.jotform.com/213145770705049",
      },
    ],
  },
  {
    slug: "office-tour",
    grammar: "experience",
    eyebrow: "Cambridge office",
    title: "Office tour",
    intro:
      "We understand the need to receive treatment where you feel comfortable, safe, and welcome. Stop by for a complete tour of the practice.",
    image: "/media/interiors/03.jpg",
    device: "panorama",
    acts: [
      {
        device: "panorama",
        heading: "Walk through the practice",
        body: "You will meet the team, see the treatment areas, and learn more about the care we provide.",
        image: "/media/interiors/03.jpg",
      },
      {
        device: "rail",
        heading: "Designed around the visit",
        body: "A modern digital practice, an experienced team, and a space made to keep every appointment moving comfortably.",
        image: "/media/interiors/04.jpg",
      },
    ],
    photos: [
      { src: "/media/interiors/02.jpg", alt: "Reception" },
      { src: "/media/interiors/03.jpg", alt: "Treatment studio" },
      { src: "/media/interiors/04.jpg", alt: "Open clinic" },
      { src: "/media/interiors/05.jpg", alt: "Treatment room" },
      { src: "/media/interiors/06.jpg", alt: "Consultation space" },
      { src: "/media/interiors/01.jpg", alt: "Office exterior" },
    ],
    sections: [],
    links: [consult],
  },
  {
    slug: "smile-gallery",
    grammar: "experience",
    eyebrow: "Results",
    title: "Smile gallery",
    intro: "Check out the beautiful Wilk and Wilk smiles below.",
    image: getSmileGalleryPhotos()[0].src,
    device: "rail",
    acts: [
      {
        device: "kinetic",
        heading: "Seeing is believing",
        body: "We are proud of our work and stand by it. These are the same patient smiles from the Cambridge gallery.",
        image: getSmileGalleryPhotos()[0].src,
      },
      {
        device: "rail",
        heading: "A practice built on results",
        body: "Scroll sideways through the lineup. Each portrait is a finished smile from Wilk & Wilk.",
        image: getSmileGalleryPhotos()[1].src,
      },
      {
        device: "iris",
        heading: "Your smile next",
        body: "A consultation is the first conversation about what your result could look like.",
        image: getSmileGalleryPhotos()[2].src,
      },
    ],
    photos: getSmileGalleryPhotos(),
    sections: [],
    links: [consult],
  },
  {
    slug: "early-orthodontic-treatment",
    grammar: "experience",
    eyebrow: "Care for children",
    title: "Early orthodontic treatment",
    intro:
      "Early evaluation helps identify developing concerns and determine whether treatment now, later, or not at all is the right choice.",
    image: "/media/interiors/06.jpg",
    device: "parallax",
    acts: [
      {
        device: "parallax",
        heading: "An ounce of prevention",
        body: "We recommend early treatment only when it is necessary to address pain, prevent a concern from worsening, protect teeth and gums, or support healthy growth.",
        image: "/media/interiors/06.jpg",
      },
      {
        device: "kinetic",
        heading: "The right time to begin",
        body: "The Canadian Association of Orthodontists recommends an initial evaluation by age seven. An evaluation does not mean treatment will be required.",
        image: "/media/interiors/07.jpg",
      },
    ],
    sections: [],
    links: [consult],
  },
  {
    slug: "for-teens",
    grammar: "experience",
    eyebrow: "Care for teens",
    title: "Orthodontics for teens",
    intro:
      "Modern choices designed around school, sports, photos, and the confidence that comes with a healthy smile.",
    image: "/media/interiors/07.jpg",
    device: "kinetic",
    acts: [
      {
        device: "kinetic",
        heading: "How soon is now?",
        body: "Many patients begin between ages 11 and 16, when growth can offer more treatment options. Choices include metal, clear, and white-gold braces plus Invisalign Teen.",
        image: "/media/interiors/07.jpg",
      },
      {
        device: "rail",
        heading: "Options that fit real life",
        body: "We plan around school, activities, and growing confidence so treatment supports the years that matter most.",
        image: "/media/interiors/05.jpg",
      },
    ],
    sections: [],
    links: [consult],
  },
  {
    slug: "for-adults",
    grammar: "experience",
    eyebrow: "Care for adults",
    title: "Adult orthodontic treatment",
    intro:
      "There is no wrong age to improve the health, comfort, and confidence of your smile.",
    image: "/media/interiors/08.jpg",
    device: "split",
    acts: [
      {
        device: "split",
        heading: "Designed for adult life",
        body: "Clear aligners, clear braces, and efficient techniques provide discreet options with fewer interruptions to work and family life.",
        image: "/media/interiors/08.jpg",
      },
      {
        device: "kinetic",
        heading: "Experience that understands",
        body: "Both Dr. Brian and Dr. Kevin had orthodontic treatment as adults and understand the expectations adult patients bring.",
        image: "/media/interiors/section-photo1.jpg",
      },
    ],
    sections: [],
    links: [consult],
  },
  {
    slug: "surgical-orthodontics",
    grammar: "experience",
    eyebrow: "Complex care",
    title: "Surgical orthodontics",
    intro:
      "Orthognathic surgery works with braces or aligners when jaw discrepancies cannot be fully treated with tooth movement alone.",
    image: "/media/interiors/04.jpg",
    device: "kinetic",
    acts: [
      {
        device: "kinetic",
        heading: "What is orthognathic surgery?",
        body: "An oral and maxillofacial surgeon repositions the upper jaw, lower jaw, or both. Braces or aligners are typically used before and after surgery so the teeth fit once the jaws are aligned.",
        image: "/media/interiors/04.jpg",
      },
      {
        device: "split",
        heading: "When it is needed",
        body: "Surgery may help severe overbites and underbites, open bites, crossbites, facial asymmetry, chewing difficulty, jaw strain, and some breathing concerns once growth is complete.",
        image: "/media/interiors/01.jpg",
      },
    ],
    sections: [
      {
        heading: "A planned process",
        body: "Treatment moves through evaluation, pre-surgical orthodontics, digital surgical planning, hospital surgery, recovery, and final detailing with retainers to hold the result.",
      },
    ],
    links: [consult],
  },
  {
    slug: "types-of-braces",
    grammar: "experience",
    eyebrow: "Treatment choices",
    title: "Types of braces",
    intro:
      "One size does not fit all. We offer metal, champagne aesthetic, and clear braces so the plan can match your needs.",
    image: "/media/interiors/04.jpg",
    device: "rail",
    acts: [
      {
        device: "rail",
        heading: "Master Series metal braces",
        body: "Small, comfortable stainless-steel twin braces that provide three-dimensional control and the option of coloured ties.",
        image: "/media/interiors/04.jpg",
      },
      {
        device: "kinetic",
        heading: "Iconix and Radiance Plus",
        body: "Iconix champagne brackets combine stainless-steel durability with a white-gold look. Radiance Plus clear braces blend with the teeth, do not discolour, and can still use coloured ties.",
        image: "/media/interiors/05.jpg",
      },
    ],
    sections: [],
    links: [
      { label: "Explore Invisalign", href: "/invisalign-info" },
      consult,
    ],
  },
  {
    slug: "types-of-appliances",
    grammar: "experience",
    eyebrow: "Supporting treatment",
    title: "Types of appliances",
    intro:
      "Elastics, expanders, habit appliances, and other tools help us correct growth, habits, and bite problems that braces alone cannot.",
    image: "/media/interiors/05.jpg",
    device: "rail",
    acts: [
      {
        device: "rail",
        heading: "Everyday helpers",
        body: "Elastics close spaces and idealize the bite. Space maintainers hold room for adult teeth. Habit appliances help with tongue thrust and thumb sucking. Custom mouth guards protect teeth and appliances during sport.",
        image: "/media/interiors/05.jpg",
      },
      {
        device: "split",
        heading: "Growth and anchorage",
        body: "The Herbst and Crossbow appliances help when the lower jaw is behind. Expanders widen a narrow upper jaw. TADs are titanium mini-screws placed in office to support movements that might otherwise need surgery.",
        image: "/media/interiors/06.jpg",
      },
    ],
    sections: [],
    links: [
      { label: "Patient instructions", href: "/patient-instructions" },
      consult,
    ],
  },
  {
    slug: "invisalign-info",
    grammar: "experience",
    eyebrow: "Clear aligners",
    title: "Invisalign treatment",
    intro:
      "A clear, removable option planned digitally and tailored to the precise movement of your teeth.",
    image: "/media/interiors/03.jpg",
    device: "kinetic",
    acts: [
      {
        device: "kinetic",
        heading: "Your custom treatment plan",
        body: "Digital scanning creates precise 3D images of your teeth. We then map the planned movements and show you a preview of your new smile.",
        image: "/media/interiors/03.jpg",
      },
      {
        device: "rail",
        heading: "Progress with purpose",
        body: "Each set of aligners gradually shifts your teeth. Regular checkups let the team monitor progress and make thoughtful adjustments.",
        image: "/media/interiors/08.jpg",
      },
    ],
    sections: [],
    links: [consult],
  },
  {
    slug: "wisdom-teeth",
    grammar: "document",
    eyebrow: "After braces",
    title: "Wisdom teeth",
    intro:
      "Wisdom teeth are the third molars that most people get in their late teens or early twenties. They often do not have room to grow properly.",
    image: "/media/interiors/07.jpg",
    sections: [
      {
        heading: "Why they often need removal",
        body: "Misaligned or impacted wisdom teeth can crowd or damage adjacent teeth, bone, or nerves. Following retainer placement, we review a recent panoramic X-ray and discuss whether there will be enough space.",
      },
      {
        heading: "Timing that protects your result",
        body: "We advise families in time so these unpredictable teeth do not compromise finished orthodontic work. Extraction, when needed, is coordinated with your dentist.",
      },
    ],
    links: [consult],
  },
  {
    slug: "patient-instructions",
    grammar: "document",
    eyebrow: "At home",
    title: "Patient instructions",
    intro:
      "Short videos from the practice cover brushing, foods to avoid, expanders, the Crossbow appliance, aligner care, retainers, and first aid.",
    image: "/media/interiors/05.jpg",
    sections: [
      {
        heading: "Watch with us",
        body: "These instruction films are the same ones the office has used with families. Open the topic you need and follow along at home.",
      },
    ],
    links: [
      {
        label: "Brushing and flossing",
        href: "https://www.youtube.com/watch?v=vl81rYRcML4",
      },
      {
        label: "Foods and habits to avoid",
        href: "https://www.youtube.com/watch?v=Rwl2FE9acR8",
      },
      {
        label: "Palatal expander",
        href: "https://www.youtube.com/watch?v=58JngOLxG9A",
      },
      {
        label: "Crossbow appliance",
        href: "https://www.youtube.com/watch?v=JzINW9ubkLI",
      },
      {
        label: "Aligner care",
        href: "https://www.youtube.com/watch?v=5uUwK5s1oGs",
      },
      {
        label: "Permanent retainer",
        href: "https://www.youtube.com/watch?v=dDTGvOkSFUA",
      },
      {
        label: "Loose brackets and poking wire",
        href: "https://www.youtube.com/watch?v=A7Ybz1hnzdo",
      },
    ],
  },
  {
    slug: "dentist-referral",
    grammar: "document",
    eyebrow: "For dental professionals",
    title: "Dentist referral",
    intro:
      "Refer a patient to Wilk & Wilk Orthodontics and our team will coordinate the next steps with your office.",
    image: "/media/interiors/03.jpg",
    sections: [
      {
        heading: "Send a referral",
        body: "Call (519) 624-9455 or email the patient details and reason for referral to cambridgeinfo@wilkandwilk.com. Include radiographs if they are available.",
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
    grammar: "document",
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
  {
    slug: "emergency-care",
    grammar: "document",
    eyebrow: "Always available",
    title: "Emergency care",
    intro:
      "True orthodontic emergencies are rare. If you have severe pain or a problem you cannot resolve, call us instead of coming to the office unannounced.",
    image: "/media/interiors/01.jpg",
    sections: [
      {
        heading: "Emergency numbers",
        body: "During office hours call (519) 624-9455. Outside office hours call (519) 716-8866.",
      },
      {
        heading: "Tooth tenderness",
        body: "Pressure is common during the first week of braces or a new aligner. Eat soft foods and use acetaminophen or ibuprofen only if you have no known allergy. Warm salt water can soothe an open sore.",
      },
      {
        heading: "Poking wire or sharp aligner",
        body: "Tuck a poking wire with a cotton swab or cover it with wax. File a sharp aligner edge with an emery board. Call if you cannot resolve the irritation.",
      },
      {
        heading: "Loose brackets, bands, or appliances",
        body: "If a bracket stays on the wire it can usually wait until the next visit. Cover sharp edges with wax and call so we can allow repair time. Save any piece that comes off and bring it with you.",
      },
      {
        heading: "Accidents to the mouth",
        body: "If teeth have been hit or hurt, call the office right away.",
      },
    ],
    links: [
      { label: "Call during office hours", href: "tel:519-624-9455" },
      { label: "Call after hours", href: "tel:519-716-8866" },
    ],
  },
  {
    slug: "contact-us",
    grammar: "document",
    eyebrow: "Cambridge, Ontario",
    title: "Contact Wilk & Wilk",
    intro:
      "Visit us at 350 Conestoga Blvd., Unit A, Cambridge, Ontario N1R 7L7.",
    image: "/media/interiors/01.jpg",
    hours: [
      { day: "Monday", time: "8:00 am to 4:00 pm" },
      { day: "Tuesday", time: "7:30 am to 3:30 pm" },
      { day: "Wednesday", time: "8:00 am to 4:00 pm" },
      { day: "Thursday", time: "7:30 am to 3:30 pm" },
      { day: "Friday", time: "8:00 am to 12:00 pm (admin only)" },
    ],
    mapHref: "https://goo.gl/maps/4UMxCyBH8HQWRz3o6",
    sections: [
      {
        heading: "Let’s talk",
        body: "Call (519) 624-9455 or email cambridgeinfo@wilkandwilk.com. After-hours emergency assistance is available at (519) 716-8866. Drs. Brian Wilk and Kevin Wilk, DMD, Cert. Ortho.",
      },
    ],
    links: [
      { label: "Call the office", href: "tel:519-624-9455" },
      {
        label: "Email the office",
        href: "mailto:cambridgeinfo@wilkandwilk.com",
      },
      { label: "View larger map", href: "https://goo.gl/maps/4UMxCyBH8HQWRz3o6" },
    ],
  },
  {
    slug: "sitemap",
    grammar: "document",
    eyebrow: "Find a page",
    title: "Site map",
    intro:
      "Every restored public page, grouped the way the header is organized.",
    image: "/media/interiors/02.jpg",
    sections: [
      {
        heading: "Welcome",
        body: "Meet the doctors, meet the team, our technology, our community, and our culture.",
      },
      {
        heading: "New patients",
        body: "What sets us apart, first visit, payment information, patient forms, office tour, and smile gallery.",
      },
      {
        heading: "Treatments and referrals",
        body: "Early care, teens, adults, surgical orthodontics, braces, appliances, Invisalign, wisdom teeth, patient instructions, dentist referral, and self referral.",
      },
    ],
    links: [
      { label: "Home", href: "/" },
      { label: "Request a consultation", href: "/request-a-consultation" },
    ],
  },
];

export function getRouteContent(slug: string) {
  return routes.find((route) => route.slug === slug);
}

export function getRouteSlugs() {
  return routes.map((route) => route.slug);
}
