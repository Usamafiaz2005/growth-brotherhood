export type SceneName = 
  | 'entry'
  | 'world'
  | 'lab'
  | 'simulator'
  | 'howweBuild'
  | 'aiEngine'
  | 'services'
  | 'about'
  | 'proof'
  | 'contact';

export type CursorState = 'default' | 'view' | 'explore' | 'enter' | 'drag';

export interface SimulatorInputs {
  industry: string;
  presence: string;
  goal: string;
}

export interface SimulatorResult {
  score: number;
  website: 'HIGH' | 'MEDIUM' | 'LOW';
  seo: 'HIGH' | 'MEDIUM' | 'LOW';
  social: 'HIGH' | 'MEDIUM' | 'LOW';
  automation: 'VERY HIGH' | 'HIGH' | 'MEDIUM' | 'LOW';
  conversion: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface LeadFormData {
  name: string;
  business: string;
  website: string;
  needs: string[];
  budget: string;
  timeline: string;
  message: string;
  email: string;
  phone?: string;
}
