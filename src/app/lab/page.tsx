import type { Metadata } from 'next';
import LabClient from './LabClient';

export const metadata: Metadata = {
  title: 'Lab — Growth Brotherhood',
  description: 'The Growth Brotherhood creative laboratory. Explore our interactive 3D WebGL prototypes, neural simulation models, and visual R&D experiments.',
};

export default function LabPage() {
  return <LabClient />;
}
