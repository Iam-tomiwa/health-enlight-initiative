/**
 * Central content source for The Health enLight Initiative site.
 * Text is drawn from the organisation's existing pages; events and blog
 * posts are clearly-marked placeholders that can be swapped for real data.
 */

export const site = {
  name: "The Health enLight Initiative",
  shortName: "HL Initiative",
  tagline: "Enlightening Communities, Transforming Health",
  description:
    "A health-enlightenment NGO building a more informed society through evidence-based education, school health clubs, community outreaches and research.",
  url: "https://www.thehealthenlightinitiative.org",
  email: "thehealthenlightinitiative@gmail.com",
  phone: "+234 903 171 0194",
  phoneHref: "+2349031710194",
  hours: "Mon – Sat, 08:00 – 18:00",
  address: {
    line1: "Fadeke Street, Ikorodu",
    line2: "Lagos, Nigeria",
  },
  socials: [
    {
      label: "Instagram",
      href: "https://instagram.com",
      handle: "@healthenlight",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      handle: "Health enLight Initiative",
    },
    { label: "X", href: "https://x.com", handle: "@healthenlight" },
  ],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Recent Programs", href: "/recent-programs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// Gallery photos hosted on the initiative's live domain.
const IMG = "https://www.thehealthenlightinitiative.org/gallery";
export const galleryImages = {
  schoolClub: Array.from(
    { length: 10 },
    (_, i) => `${IMG}/school_club/school_club_${i + 1}.jpg`,
  ),
  amr: [
    ...Array.from({ length: 10 }, (_, i) => `${IMG}/amr/amr_${i + 1}.jpg`),
    `${IMG}/amr/amr_8b.jpg`,
  ],
};

export const galleryCategories = [
  { id: "all", label: "All" },
  { id: "school", label: "School Health Clubs" },
  { id: "amr", label: "AMR Campaign" },
];

export const gallery = [
  ...galleryImages.schoolClub.map((src, i) => ({
    src,
    category: "school" as const,
    alt: `Students at a Health enLight school club session (${i + 1})`,
  })),
  ...galleryImages.amr.map((src, i) => ({
    src,
    category: "amr" as const,
    alt: `Antimicrobial Resistance awareness campaign (${i + 1})`,
  })),
];

/** PLACEHOLDER events — replace with real programme dates before launch. */
export const events = [
  {
    id: "amr-week",
    tag: "Webinar",
    status: "Registration open",
    title: "World AMR Awareness Week Live",
    blurb:
      "A cross-border panel with medical professionals on slowing antimicrobial resistance in everyday care.",
    date: "18 Nov 2026",
    time: "5:00 PM WAT",
    location: "Online · Zoom",
    image: `${IMG}/amr/amr_4.jpg`,
    accent: "gold" as const,
  },
  {
    id: "school-drive",
    tag: "School Club",
    status: "Now enrolling",
    title: "School Health Ambassadors Cohort",
    blurb:
      "Training a new set of student champions to lead practical health education among their peers.",
    date: "03 Sep 2026",
    time: "10:00 AM WAT",
    location: "Ikorodu, Lagos",
    image: `${IMG}/school_club/school_club_2.jpg`,
    accent: "leaf" as const,
  },
  {
    id: "community-outreach",
    tag: "Outreach",
    status: "Volunteers needed",
    title: "Community Health & Screening Day",
    blurb:
      "Free basic screenings and culturally-relevant health education delivered directly to an underserved community.",
    date: "27 Sep 2026",
    time: "9:00 AM WAT",
    location: "Ikorodu, Lagos",
    image: `${IMG}/school_club/school_club_7.jpg`,
    accent: "leaf" as const,
  },
  {
    id: "career-webinar",
    tag: "Webinar",
    status: "Save the date",
    title: "Careers in Public Health",
    blurb:
      "An interactive session guiding young people toward rewarding, evidence-driven careers in public health.",
    date: "15 Oct 2026",
    time: "6:00 PM WAT",
    location: "Online · Zoom",
    image: `${IMG}/amr/amr_8b.jpg`,
    accent: "gold" as const,
  },
];

export const stats = [
  { value: 44, suffix: "+", label: "School Health Ambassadors" },
  { value: 12, suffix: "+", label: "Webinars organized" },
  { value: 250, suffix: "", label: "Lives Reached" },
  { value: 14, suffix: "", label: "Research Blogs" },
];

export const programs = [
  {
    title: "Research & Advocacy",
    body: "Improving health-seeking behaviour through evidence-based research and advocacy for policies that prioritise health equity and inclusivity.",
    icon: "research",
  },
  {
    title: "School-Based Health Clubs",
    body: "Training students with practical health knowledge to champion positive practices amongst their peers and communities.",
    icon: "school",
  },
  {
    title: "Community Outreaches",
    body: "Delivering culturally-relevant education and basic screenings directly to underserved hearts and homes.",
    icon: "outreach",
  },
  {
    title: "Informative Webinars",
    body: "Connecting a global audience with qualified health professionals for clear, scientific, interactive discussions.",
    icon: "webinar",
  },
  {
    title: "Combating Misinformation",
    body: "Empowering the public with evidence-based knowledge to prevent disease and end the spread of health misinformation.",
    icon: "shield",
  },
];

export const approach = [
  {
    title: "Research-first philosophy",
    body: "Every health claim we share is anchored in rigorous evidence. We study local trends and behavioural data before launching any campaign, so our advocacy is not just loud but accurate.",
  },
  {
    title: "Valuing human health",
    body: "Education is most effective when basic needs are met. Beyond instruction we provide tangible support — essential medications, first-aid supplies and health packages that turn advocacy into a lifeline.",
  },
  {
    title: "Accessible knowledge",
    body: "We strip away intimidating medical jargon and use interactive, peer-led, culturally-sensitive methods, turning complex clinical data into practical steps people can act on immediately.",
  },
  {
    title: "Grassroots engagement",
    body: "We work alongside communities, not just for them — health fairs, town-hall dialogues and door-to-door campaigns that build the trust needed for lasting behavioural change.",
  },
];

export const story = [
  {
    step: "01",
    title: "The Genesis",
    body: "Our journey began with a troubling observation: preventable diseases were claiming lives simply for lack of information. We set out to become a trusted bridge between medical science and the people who need it most.",
  },
  {
    step: "02",
    title: "The Research Shift",
    body: "We recognised early that passion alone cannot cure disease — accuracy saves lives. Before we speak, we study, vetting information against global medical standards.",
  },
  {
    step: "03",
    title: "Scaling into Schools",
    body: "To make health education sustainable, we launched School-Based Health Clubs — permanent hubs of wellness that turn students into active health ambassadors.",
  },
  {
    step: "04",
    title: "Early Wins",
    body: "From our first vibrant school club to global webinars reaching hundreds across borders, every ambassador and every life-saving habit adopted marks a milestone.",
  },
];

export const missionPoints = [
  "Reducing the burden of infectious disease through accessible health education.",
  "Combating health misinformation with clear, evidence-based communication.",
  "Empowering adolescents and youths through school health clubs and webinars.",
  "Advancing public health through advocacy, community engagement and research.",
];

export const testimonials = [
  {
    quote:
      "This initiative boosted my confidence to educate others on the dangers of littering rather than scolding them. I am grateful to the organizers for creating such an interactive, fun, and impactful program.",
    name: "Jumoke Sumaya",
    role: "Ambassador",
  },
  {
    quote:
      "The school health clubs of HLI have been a very good platform for me to build my leadership skills. I was never a fan of teamwork, but they helped me see the good part of teamwork.",
    name: "Dixon Favour",
    role: "Beneficiary",
  },
  {
    quote:
      "“Building a rewarding career in public health” was indeed a great webinar — I was enlightened about my area of interest.",
    name: "Iyebiye",
    role: "Webinar Attendee",
  },
];

/** PLACEHOLDER team — role structure only. Replace with real profiles. */
export const team = [
  {
    name: "Team Member",
    role: "Founder & Executive Lead",
    focus: "Vision & partnerships",
  },
  {
    name: "Team Member",
    role: "Head of Research",
    focus: "Evidence & advocacy",
  },
  {
    name: "Team Member",
    role: "Programs Coordinator",
    focus: "School health clubs",
  },
  {
    name: "Team Member",
    role: "Community Outreach Lead",
    focus: "Screenings & fairs",
  },
  {
    name: "Team Member",
    role: "Communications Lead",
    focus: "Webinars & content",
  },
  {
    name: "Team Member",
    role: "Volunteer Coordinator",
    focus: "Ambassadors network",
  },
];

/** PLACEHOLDER blog posts — replace with the organisation's real research articles. */
export const posts = [
  {
    title: "Antimicrobial Resistance: the quiet pandemic in everyday care",
    excerpt:
      "Why misusing antibiotics undermines treatment for everyone, and the small habits that protect your community.",
    category: "Research",
    readTime: "6 min read",
    date: "Nov 2026",
    image: `${IMG}/amr/amr_1.jpg`,
  },
  {
    title: "How school health clubs turn students into ambassadors",
    excerpt:
      "A look at the peer-led model that weaves life-saving habits into the fabric of daily school life.",
    category: "Programs",
    readTime: "5 min read",
    date: "Oct 2026",
    image: `${IMG}/school_club/school_club_5.jpg`,
  },
  {
    title: "Replacing myths with evidence: our research-first method",
    excerpt:
      "Before we run a campaign, we study. Here is how local data shapes every outreach we deliver.",
    category: "Insight",
    readTime: "4 min read",
    date: "Sep 2026",
    image: `${IMG}/school_club/school_club_9.jpg`,
  },
];
