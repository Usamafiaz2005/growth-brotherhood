import type { Metadata } from 'next';
import LabScene from '@/components/3d/scenes/LabScene';

export const metadata: Metadata = {
  title: 'Lab — Growth Brotherhood',
  description: 'The Growth Brotherhood creative laboratory. Explore our interactive portfolio projects.',
};

export default function LabPage() {
  return <LabScene />;
}
