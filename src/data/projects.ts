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
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'asset-care-london',
    title: 'Asset Care London',
    client: 'Asset Care London',
    category: 'Web Architecture & Brand',
    description: 'A complete digital transformation for a premium property maintenance company in London. Repositioning from a local contractor to a trusted luxury service provider.',
    services: ['Web Design', 'Brand Identity', 'SEO Architecture', 'Conversion Optimisation'],
    heroColor: '#C97B3A',
    model: 'building',
    challenge: 'Asset Care London faced high ad costs and low digital trust. Their legacy website failed to communicate their premium market position, leading high-value commercial accounts to choose established competitors.',
    strategy: 'Reposition the brand around craftsmanship, rapid SLA compliance, and luxury property standards. Engineer a high-converting web system with structured schema markup targeting high-intent commercial queries.',
    solution: 'Built a custom Next.js digital experience featuring interactive service calculators, automated booking workflows, and instant account onboarding for property managers.',
    results: [
      { label: 'Organic Commercial Inquiries', value: '+142%', isPositive: true },
      { label: 'Form Conversion Rate', value: '4.8%', isPositive: true },
      { label: 'Average Deal Size', value: '+65%', isPositive: true },
      { label: 'Lighthouse Performance', value: '97/100', isPositive: true },
    ],
    testimonial: {
      quote: 'The system completely transformed our inbound channel. Commercial clients now reach out with full project specs already prepared.',
      author: 'Marcus Vance',
      role: 'Managing Director, Asset Care London',
    },
  },
  {
    id: '2',
    slug: 'ai-client-hunter',
    title: 'AI Client Hunter System',
    client: 'Proprietary Growth Infrastructure',
    category: 'AI & Workflow Automation',
    description: 'An autonomous lead intelligence system that aggregates web signals, scores decision-maker intent, and initiates personalized outreach.',
    services: ['AI Engineering', 'Workflow Automation', 'CRM Architecture', 'Lead Scoring'],
    heroColor: '#E8893A',
    model: 'neural',
    challenge: 'Manual prospecting caused high business development overhead. SDR teams spent over 25 hours per week manually researching company hiring signals and technology stacks.',
    strategy: 'Deploy a multi-model LLM data pipeline that continuously monitors regulatory filings, job boards, and tech stack upgrades to identify buying intent in real time.',
    solution: 'Engineered an autonomous workflow connected directly to CRM platforms, automatically surfacing fully enriched lead dossiers to account executives.',
    results: [
      { label: 'Weekly Research Time Saved', value: '-75%', isPositive: true },
      { label: 'Outreach Acceptance Rate', value: '28.4%', isPositive: true },
      { label: 'Qualified Pipeline Acceleration', value: '+110%', isPositive: true },
      { label: 'Cost Per Prospect Acquisition', value: '-52%', isPositive: true },
    ],
    testimonial: {
      quote: 'Our sales team stopped spending hours on manual research. The AI surfacing system delivers pre-qualified opportunities directly into our CRM daily.',
      author: 'Elena Rostova',
      role: 'Head of Sales Operations',
    },
  },
  {
    id: '3',
    slug: 'ecommerce-transformation',
    title: 'Precision D2C E-Commerce Engine',
    client: 'Apex Apparel Co.',
    category: 'E-Commerce & Funnel Architecture',
    description: 'Full-funnel e-commerce rebuild for a premium D2C brand. Focused on streamlined checkout friction, high-converting product pages, and automated lifecycle retention.',
    services: ['Headless E-Commerce', 'UX Strategy', 'Lifecycle Automation', 'Analytics'],
    heroColor: '#C97B3A',
    model: 'product',
    challenge: 'High paid ad spend yielded low lifetime customer value due to checkout friction, mobile latency, and a fragmented post-purchase email sequence.',
    strategy: 'Audit and rebuild the entire customer journey around sub-second page loads, single-step mobile checkout, and behavioral trigger campaigns based on browsing intent.',
    solution: 'Re-platformed the store onto a performant headless architecture integrated with automated SMS/email flow engines and dynamic product bundling.',
    results: [
      { label: 'Storefront Conversion Rate', value: '+68%', isPositive: true },
      { label: 'Cart Abandonment Drop', value: '-34%', isPositive: true },
      { label: 'Average Order Value (AOV)', value: '+26%', isPositive: true },
      { label: '90-Day Customer Repeat Rate', value: '+45%', isPositive: true },
    ],
    testimonial: {
      quote: 'The team rebuilt our storefront into a conversion powerhouse. Page load speed dropped below 1 second and revenue per visitor surged immediately.',
      author: 'David Sterling',
      role: 'Founder & CEO',
    },
  },
];
