export interface Service {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  capabilities: string[];
  color: string;
  accentColor: string;
  icon: string;
  angle: number; // degrees around radial
}

export const services: Service[] = [
  {
    id: 'web',
    slug: 'web-development',
    title: 'Web Development',
    shortTitle: 'WEB',
    tagline: 'HIGH-PERFORMANCE DIGITAL EXPERIENCES',
    description: 'Websites engineered around conversion, performance, and brand. Not templates — systems.',
    capabilities: ['UX Strategy', 'Visual Design', 'Engineering', 'Animation', 'Performance', 'SEO Architecture'],
    color: '#C97B3A',
    accentColor: '#E8893A',
    icon: 'browser',
    angle: 0,
  },
  {
    id: 'ai',
    slug: 'ai-automation',
    title: 'AI & Automation',
    shortTitle: 'AI',
    tagline: 'INTELLIGENCE THAT WORKS WHILE YOU SLEEP',
    description: 'Custom AI systems that analyse, decide and act. Reduce manual work. Increase precision.',
    capabilities: ['AI Development', 'Workflow Automation', 'Lead Intelligence', 'Data Pipelines', 'CRM Integration', 'Reporting'],
    color: '#2DD4BF',
    accentColor: '#0D9488',
    icon: 'neural',
    angle: 60,
  },
  {
    id: 'marketing',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    shortTitle: 'MARKETING',
    tagline: 'CAMPAIGNS THAT CONVERT',
    description: 'Data-driven marketing strategies that generate qualified leads and measurable ROI.',
    capabilities: ['Paid Media', 'SEO', 'Content Strategy', 'Social Media', 'Analytics', 'Funnel Optimisation'],
    color: '#C97B3A',
    accentColor: '#E8893A',
    icon: 'screens',
    angle: 120,
  },
  {
    id: 'branding',
    slug: 'branding',
    title: 'Brand Identity',
    shortTitle: 'BRAND',
    tagline: 'IDENTITY THAT COMMANDS ATTENTION',
    description: 'Brand systems that position you as the premium choice in your market.',
    capabilities: ['Strategy', 'Visual Identity', 'Typography', 'Brand Guidelines', 'Packaging', 'Digital Application'],
    color: '#E8893A',
    accentColor: '#C97B3A',
    icon: 'cube',
    angle: 180,
  },
  {
    id: 'automation',
    slug: 'automation',
    title: 'Growth Automation',
    shortTitle: 'AUTOMATION',
    tagline: 'SYSTEMS THAT SCALE WITHOUT YOU',
    description: 'End-to-end automation of your growth systems. From lead capture to close.',
    capabilities: ['CRM Automation', 'Email Sequences', 'Lead Scoring', 'Workflow Design', 'Integrations', 'Reporting'],
    color: '#2DD4BF',
    accentColor: '#0D9488',
    icon: 'nodes',
    angle: 240,
  },
  {
    id: 'strategy',
    slug: 'strategy',
    title: 'Growth Strategy',
    shortTitle: 'STRATEGY',
    tagline: 'CLARITY BEFORE EXECUTION',
    description: 'Strategic frameworks that align your digital activity with real business outcomes.',
    capabilities: ['Market Analysis', 'Competitor Intelligence', 'Positioning', 'Roadmapping', 'KPI Framework', 'Growth Planning'],
    color: '#C97B3A',
    accentColor: '#E8893A',
    icon: 'map',
    angle: 300,
  },
];
