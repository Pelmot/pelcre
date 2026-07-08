import type {
  Award,
  FAQItem,
  Service,
  Skill,
  SoftwareItem,
  Testimonial,
  TimelineItem,
} from "./types";

export const architect = {
  name: "Pelmot Creativity",
  studio: "Pelmot Creativity",
  title: "Principal Architect",
  tagline: "Architecture that listens to its site before it speaks.",
  location: "Based in Gaziantep, Turkey — working worldwide",
  email: "pelmot.creativity@gmail.com",
  phone: "0530 449 94 00",
  address: "Ibrahimli Mah. Sehitkamil, Gaziantep, Turkey",
  social: {
    instagram:
      "https://www.instagram.com/pelmot_creativity?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    linkedin: "https://www.linkedin.com/in/abdurrazzak-jazmati-b63ba1331/",
    behance: "https://www.behance.net/abdurrajazmati",
    x: "https://x.com/pelmot_crtvty?s=20",
  },
};

export const bio = {
  paragraphs: [
    "Pelmot Creativity was founded in 2011 after nearly a decade practicing at Herzog & de Meuron in Basel and SANAA in Tokyo, leading detailing on two award-winning cultural projects.",
    "Pelmot Creativity now works across residential, commercial, and public landscape commissions on four continents, guided by a single conviction: that the best buildings feel less designed than discovered — as though they were always meant to be exactly where they stand.",
    "The studio keeps a deliberately small roster of active commissions at any time, typically no more than six, so that every project receives the studio's direct, hands-on involvement from first sketch to final punch list.",
  ],
  philosophy: [
    {
      title: "Site before form",
      text: "No design decision precedes a full understanding of light, wind, topography, and history. The site is the client we answer to first.",
    },
    {
      title: "Material honesty",
      text: "Materials are chosen for how they age, not how they photograph on day one. Nothing is finished to hide what it is made of.",
    },
    {
      title: "Restraint as luxury",
      text: "The studio's signature is what's left out. A quiet room, well-proportioned and beautifully lit, outlasts any ornament.",
    },
  ],
};

export const timeline: TimelineItem[] = [
  {
    year: "2011 — Present",
    title: "Founder & Principal Architect",
    place: "Pelmot Creativity, Gaziantep",
    description:
      "Leading a 14-person studio across residential, commercial, and landscape commissions in North America, Europe, and Asia.",
  },
  {
    year: "2007 — 2011",
    title: "Senior Associate",
    place: "SANAA, Tokyo",
    description:
      "Led detailing and construction administration for two museum commissions, including a 2010 international design award winner.",
  },
  {
    year: "2003 — 2007",
    title: "Project Architect",
    place: "Herzog & de Meuron, Basel",
    description:
      "Developed façade systems and material studies for cultural and civic projects across Switzerland and Germany.",
  },
  {
    year: "2001 — 2003",
    title: "Master of Architecture",
    place: "Harvard Graduate School of Design",
    description:
      "Thesis on adaptive reuse of post-industrial waterfront infrastructure, awarded the Faculty Design Medal.",
  },
  {
    year: "1997 — 2001",
    title: "Bachelor of Architecture",
    place: "Cornell University College of Architecture, Art and Planning",
    description: "Graduated with distinction; exchange year at ETH Zürich.",
  },
];

export const skills: Skill[] = [
  { name: "Concept & Massing Design", level: 98 },
  { name: "Material & Detail Development", level: 95 },
  { name: "Sustainable & Passive Design", level: 88 },
  { name: "Construction Administration", level: 90 },
  { name: "Client & Stakeholder Direction", level: 93 },
  { name: "Landscape Integration", level: 85 },
];

export const software: SoftwareItem[] = [
  { name: "AutoCAD", category: "Drafting" },
  { name: "Revit", category: "BIM" },
  { name: "SketchUp", category: "Modeling" },
  { name: "Rhino + Grasshopper", category: "Modeling" },
  { name: "Lumion", category: "Visualization" },
  { name: "Enscape", category: "Visualization" },
  { name: "V-Ray", category: "Rendering" },
  { name: "Adobe Photoshop", category: "Post-Production" },
  { name: "Adobe InDesign", category: "Presentation" },
  { name: "Climate Studio", category: "Analysis" },
];

export const awards: Award[] = [
  { year: "2024", title: "AIA National Housing Award — Meridian House", organization: "American Institute of Architects" },
  { year: "2023", title: "World Architecture Festival — Commercial Interior, Shortlist", organization: "WAF" },
  { year: "2023", title: "Dezeen Awards — Sustainable Landscape of the Year", organization: "Dezeen" },
  { year: "2022", title: "RIBA International Award — Cassia Gardens", organization: "Royal Institute of British Architects" },
  { year: "2021", title: "Architizer A+ Award — Adaptive Reuse", organization: "Architizer" },
  { year: "2019", title: "40 Under 40 in Design", organization: "Architectural Digest" },
];

export const services: Service[] = [
  {
    icon: "Compass",
    title: "Architectural Design",
    description:
      "Full architectural services from first site analysis through construction documentation, for private residences, commercial buildings, and civic work.",
    points: [
      "Site & feasibility analysis",
      "Concept design & massing studies",
      "Design development & detailing",
      "Construction documentation & permitting",
      "Construction administration",
    ],
  },
  {
    icon: "Sofa",
    title: "Interior Design",
    description:
      "Interiors developed in parallel with architecture, or as standalone commissions for existing spaces — spatial planning through to final furnishing.",
    points: [
      "Spatial planning & joinery design",
      "Material & finish palettes",
      "Custom furniture & lighting specification",
      "Art & object curation",
      "Procurement & installation oversight",
    ],
  },
  {
    icon: "Trees",
    title: "Landscape Design",
    description:
      "Site-specific landscape design that treats planting, water, and hardscape as inseparable from the building's architecture.",
    points: [
      "Master planning & grading",
      "Planting design & irrigation strategy",
      "Water features & hardscape detailing",
      "Outdoor lighting design",
    ],
  },
  {
    icon: "Hammer",
    title: "Renovation",
    description:
      "Careful renovation and adaptive reuse of existing structures, balancing preservation with the demands of contemporary living.",
    points: [
      "Conditions assessment & survey",
      "Historic & preservation consulting",
      "Structural & systems upgrades",
      "Phased renovation planning",
    ],
  },
  {
    icon: "Box",
    title: "Visualization",
    description:
      "Photorealistic renders, walkthroughs, and physical models to communicate design intent to clients, consultants, and approval boards.",
    points: [
      "Photorealistic still renders",
      "Animated walkthroughs",
      "Physical & 3D-printed models",
      "VR client presentations",
    ],
  },
  {
    icon: "MessageCircle",
    title: "Consultation",
    description:
      "Independent design consultation for clients, developers, or fellow architects seeking a second perspective at any project stage.",
    points: [
      "Design review & critique",
      "Feasibility & budget consultation",
      "Expert witness & design arbitration",
      "Studio & practice mentorship",
    ],
  },
];

export const faqs: FAQItem[] = [
  {
    question: "What is the typical process for a new residential commission?",
    answer:
      "Every project begins with a site visit and a series of conversations to understand how you actually want to live, followed by concept design, design development, construction documentation, and construction administration. Most residential projects take 8–14 months from first meeting to permit-ready drawings, and 12–24 months to build.",
  },
  {
    question: "Do you take on projects outside the United States?",
    answer:
      "Yes. Pelmot Creativity currently has completed or active work in the United States, Denmark, Portugal, Morocco, Japan, and Singapore. We typically partner with a local executive architect of record for projects outside North America.",
  },
  {
    question: "What is your fee structure?",
    answer:
      "Fees are proposed as a percentage of construction cost for full architectural services, or as a fixed fee for interior design, consultation, and visualization work. A detailed proposal follows our initial feasibility conversation, tailored to project scope.",
  },
  {
    question: "How many projects does the studio take on at once?",
    answer:
      "We intentionally limit the studio to six active commissions at a time, so that our team remains closely and personally involved in every project from concept through construction administration.",
  },
  {
    question: "Can you work with our existing contractor or builder?",
    answer:
      "Absolutely. We regularly collaborate with clients' preferred contractors and can also recommend trusted builders from our own network if helpful.",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "James & Priya Rao",
    role: "Meridian House, Montecito",
    quote:
      "The team listened more than they talked for the first two months — and it shows in every room. The house feels like it was excavated from the site, not built on top of it.",
  },
  {
    name: "Marcus Lindqvist",
    role: "Director, Aurelia Holdings",
    quote:
      "We asked for a lobby that would make tenants proud to give their address. Pelmot Creativity delivered a space that stops people mid-step. Worth every conversation about the budget.",
  },
  {
    name: "Amara Diallo",
    role: "Município do Porto, Terra Nova",
    quote:
      "A public project delivered on time, under budget, and — rarest of all — genuinely loved by the neighbourhood it serves. We would build with this studio again without hesitation.",
  },
];
