export interface ProjectResult {
  label: string;
  value: string;
  isPositive: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  services: string[];
  heroColor: string;
  model: 'building' | 'product' | 'neural' | 'cube' | 'sphere';
  challenge: string;
  strategy: string;
  solution: string;
  results: ProjectResult[];
  isConceptBuild?: boolean; // true = demo/capability build, not a paid client engagement
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

// NOTE (see audit): the entries below were previously presented as completed
// client engagements with fabricated named executives and fabricated metrics.
// They are now explicitly labeled as concept/capability builds with results
// removed. Do not add a `results` array or `testimonial` to any entry here
// unless you can produce the real client, the real number, and you'd be
// comfortable with that client verifying it publicly.

export const projects: Project[] = [
  {
    id: '1',
    slug: 'asset-care-london',
    title: 'Asset Care London',
    client: 'Concept Build',
    category: 'Web Architecture & Brand',
    description:
      'A capability build demonstrating a full local-trade-business web system: instant quote calculators, service-area SEO pages, and a booking flow. Not a live client engagement.',
    services: ['Web Design', 'Brand Identity', 'SEO Architecture', 'Conversion Optimisation'],
    heroColor: '#C97B3A',
    model: 'building',
    isConceptBuild: true,
    challenge:
      'Local trade businesses typically run on generic templates that don\u2019t communicate trust or handle instant pricing.',
    strategy:
      'Design a system around instant, itemized quoting and structured local SEO instead of a static brochure site.',
    solution:
      'Built a custom React web experience featuring interactive service calculators, a booking flow, and per-area SEO pages with schema markup.',
    results: [],
  },
  {
    id: '2',
    slug: 'ai-lead-qualification-engine',
    title: 'AI Lead Qualification Engine',
    client: 'In-house tool (in development)',
    category: 'AI & Workflow Automation',
    description:
      'An in-progress internal tool that scores inbound leads against an ICP and drafts a personalized first-touch message using a server-side LLM pipeline.',
    services: ['AI Engineering', 'Workflow Automation', 'Lead Scoring'],
    heroColor: '#E8893A',
    model: 'neural',
    isConceptBuild: true,
    challenge: 'Manual lead research and outreach drafting is slow and inconsistent.',
    strategy: 'Score and enrich leads server-side, then generate a draft outreach message for human review.',
    solution: 'A small pipeline: CSV/lead input \u2192 server-side LLM scoring \u2192 review dashboard.',
    results: [],
  },
];
